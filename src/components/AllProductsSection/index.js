import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    activeRatingId: '',
    titleSearch: '',
    isSuccess: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  clearFilter = () => {
    this.setState(
      {titleSearch: '', activeCategoryId: '', activeRatingId: ''},
      this.getProducts,
    )
  }

  submitForm = event => {
    event.preventDefault()
    this.getProducts()
  }

  changeSearchInput = text => {
    this.setState({titleSearch: text})
  }

  changeActiveCategory = id => {
    this.setState({activeCategoryId: id}, this.getProducts)
  }

  changeActiveRating = id => {
    this.setState({activeRatingId: id}, this.getProducts)
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, titleSearch, activeCategoryId, activeRatingId} =
      this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${titleSearch}&category=${activeCategoryId}&rating=${activeRatingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        isSuccess: true,
      })
    } else {
      this.setState({
        isLoading: false,
        isSuccess: false,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    if (productsList.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
          />
          <h1>No Products Found</h1>
          <p>We could not find any products. Try other filters.</p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  renderFailure = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
        />
        <h1>OOPS! Something Went Wrong</h1>
        <p>We are having trouble processing your request. Please try again</p>
      </div>
    )
  }

  render() {
    const {isLoading, activeCategoryId, activeRatingId, titleSearch, isSuccess} =
      this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          activeCategoryId={activeCategoryId}
          changeActiveCategory={this.changeActiveCategory}
          activeRatingId={activeRatingId}
          changeActiveRating={this.changeActiveRating}
          titleSearch={titleSearch}
          changeSearchInput={this.changeSearchInput}
          submitForm={this.submitForm}
          clearFilter={this.clearFilter}
        />

        {isLoading ? this.renderLoader() : (isSuccess ? this.renderProductsList(): this.renderFailure())}
      </div>
    )
  }
}

export default AllProductsSection
