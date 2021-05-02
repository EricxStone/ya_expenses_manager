import {Transaction} from '_models' 
import {transactionState, TransactionActionType, ADD_TRANSACTION, EDIT_TRANSACTION, DELETE_TRANSACTION} from './type'

const initialState: transactionState = {
    transactionList: []
}

const transactionsReducer = (state = initialState, action: TransactionActionType) => {
    switch (action.type){
        case ADD_TRANSACTION:
            const {transactionList} = state
            transactionList.push(action.payload)
            const addNewState = {transactionList}
            return addNewState
        
        case EDIT_TRANSACTION:
            const filteredTransactions = state.transactionList.filter(
                transaction => transaction.id != action.payload.id
            )
            const newState = filteredTransactions.push(action.payload)
            return newState

        case DELETE_TRANSACTION:
            return state.transactionList.filter(
                transaction => transaction.id != action.payload
            )

        default:
            return state
    }
}

export default transactionsReducer
