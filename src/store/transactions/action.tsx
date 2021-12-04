import {Transaction} from 'models' 
import {TransactionActionType, ADD_TRANSACTION, EDIT_TRANSACTION, DELETE_TRANSACTION, DELETE_TRANSACTION_BY_CAT} from './type'

export const addTransaction = (newTransaction: Transaction): TransactionActionType => {
    return {
        type: ADD_TRANSACTION,
        payload: newTransaction
    }
}

export const editTransaction = (updatedTransaction: Transaction): TransactionActionType => {
    return {
        type: EDIT_TRANSACTION,
        payload: updatedTransaction
    }
}

export const deleteTransaction = (deleteTransactionId: string): TransactionActionType => {
    return {
        type: DELETE_TRANSACTION,
        payload: deleteTransactionId
    }
}

export const deleteTransactionByCategory = (deleteCategoryId: string): TransactionActionType => {
    return {
        type: DELETE_TRANSACTION_BY_CAT,
        payload: deleteCategoryId
    }
}
