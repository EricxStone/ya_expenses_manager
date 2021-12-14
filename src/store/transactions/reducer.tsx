import {Transaction} from 'models' 
import {transactionState, TransactionActionType, ADD_TRANSACTION, EDIT_TRANSACTION, DELETE_TRANSACTION, DELETE_TRANSACTION_BY_CAT} from './type'
import { DateTime } from 'luxon'

const initialState: transactionState = {
    transactionList: []
}

const transactionsReducer = (state = initialState, action: TransactionActionType) => {
    switch (action.type){
        case ADD_TRANSACTION:
            const transactionList = state.transactionList;
            console.log("Existing list:", transactionList);
            console.log("payload", action.payload);
            if (action.payload !== undefined) transactionList.push(action.payload)
            return {transactionList: [...transactionList]}
        
        case EDIT_TRANSACTION:
            if (action.payload.id !== undefined){
                let filteredTransactions: Transaction[] = state.transactionList.filter(
                    (transaction: Transaction) => transaction.id != action.payload.id
                )
                filteredTransactions.push(action.payload);
                return {transactionList: filteredTransactions}
            } 
            return state

        case DELETE_TRANSACTION:
            if (action.payload !== undefined){
                const removedTransactions: Transaction[] = state.transactionList.filter(
                    (transaction: Transaction) => transaction.id != action.payload
                )
                return {transactionList: removedTransactions}
            } 
            return state

        case DELETE_TRANSACTION_BY_CAT:
            if (action.payload !== undefined){
                const removedTransactions: Transaction[] = state.transactionList.filter(
                    (transaction: Transaction) => transaction.categoryId != action.payload
                )
                return {transactionList: removedTransactions}
            } 
            return state

        default:
            return state
    }
}

export default transactionsReducer
