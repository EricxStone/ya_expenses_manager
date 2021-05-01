import { combineReducers } from 'redux'
import categoriesReducer from '_store/categories/reducer'

const rootReducer = combineReducers({
    categories: categoriesReducer
})

export default rootReducer