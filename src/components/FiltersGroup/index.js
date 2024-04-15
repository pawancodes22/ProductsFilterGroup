import {Component} from 'react'

import './index.css'

import {FaSearch} from 'react-icons/fa'

const RatingItem = props => {
  const {item, activeRatingId, changeActiveRating} = props
  const {ratingId, imageUrl} = item
  const addClassName = activeRatingId === ratingId ? 'blue-text' : ''
  const callChangeActiveRating = () => {
    changeActiveRating(ratingId)
  }
  return (
    <li>
      <button
        type="button"
        className="fg-button regular-text-size star-rating-container"
        onClick={callChangeActiveRating}
      >
        <img
          src={imageUrl}
          alt={`rating ${ratingId}`}
          className="star-image-sizing"
        />
        <p className={addClassName}>&up</p>
      </button>
    </li>
  )
}

const CategoryItem = props => {
  const {item, activeCategoryId, changeActiveCategory} = props
  const {categoryId, name} = item
  const addClassName = activeCategoryId === categoryId ? 'blue-text' : ''
  const callChangeActiveCategory = () => {
    changeActiveCategory(categoryId)
  }
  return (
    <li className="margin-provider">
      <button
        type="button"
        className={`fg-button regular-text-size ${addClassName}`}
        onClick={callChangeActiveCategory}
      >
        <p className="category-para">{name}</p>
      </button>
    </li>
  )
}

class FiltersGroup extends Component {
  callChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  callClearFilter = () => {
    const {clearFilter} = this.props
    clearFilter()
  }

  render() {
    const {
      categoryOptions,
      ratingsList,
      activeCategoryId,
      changeActiveCategory,
      activeRatingId,
      changeActiveRating,
      titleSearch,
      submitForm,
    } = this.props

    return (
      <div className="filters-group-container">
        <form className="fg-input-container" onSubmit={submitForm}>
          <input
            type="search"
            placeholder="Search"
            value={titleSearch}
            className="fg-search-input-box"
            onChange={this.callChangeSearchInput}
          />
          <FaSearch />
        </form>
        <h1 className="fg-heading">Category</h1>
        <ul>
          {categoryOptions.map(item => (
            <CategoryItem
              activeCategoryId={activeCategoryId}
              key={item.categoryId}
              item={item}
              changeActiveCategory={changeActiveCategory}
            />
          ))}
        </ul>
        <h1 className="fg-heading">Rating</h1>
        <ul>
          {ratingsList.map(item => (
            <RatingItem
              activeRatingId={activeRatingId}
              changeActiveRating={changeActiveRating}
              key={item.ratingId}
              item={item}
            />
          ))}
        </ul>
        <button
          type="button"
          className="clear-filters-button"
          onClick={this.callClearFilter}
        >
          Clear Filters
        </button>
      </div>
    )
  }
}

export default FiltersGroup
