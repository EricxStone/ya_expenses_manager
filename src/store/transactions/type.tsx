import {Transaction} from "_models"

export interface transactionState{
    transactionList: Transaction[]
}

export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const DELETE_TRANSACTION_BY_CAT = 'DELETE_TRANSACTION_BY_CAT'

interface AddTransactionAction {
    type: typeof ADD_TRANSACTION
    payload: Transaction
}

interface EditTransactionAction {
    type: typeof EDIT_TRANSACTION
    payload: Transaction
}

interface DeleteTransactionAction {
    type: typeof DELETE_TRANSACTION
    payload: string
}

interface DeleteTransactionByCategoryAction {
    type: typeof DELETE_TRANSACTION_BY_CAT
    payload: string
}

export type TransactionActionType = AddTransactionAction | EditTransactionAction | DeleteTransactionAction | DeleteTransactionByCategoryAction

