import { combineReducers } from 'redux'
import categoriesReducer from '_store/categories/reducer'
import transactionsReducer from '_store/categories/reducer'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    transactions: transactionsReducer,
})

export default rootReducer