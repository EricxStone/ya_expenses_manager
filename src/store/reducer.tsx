import { combineReducers } from 'redux'
import categoriesReducer from 'store/categories/reducer'
import transactionsReducer from 'store/transactions/reducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { RootState } from './store';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['categories', 'transactions']
};


const rootReducer = combineReducers({
    categories: categoriesReducer,
    transactions: transactionsReducer,
})

const persistedRootReducer = persistReducer<any, any>(persistConfig, rootReducer);


export default persistedRootReducer