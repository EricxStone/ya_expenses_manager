import { combineReducers } from 'redux'
import categoriesReducer from '_store/categories/reducer'

export default combineReducers({
    categories: categoriesReducer
})
