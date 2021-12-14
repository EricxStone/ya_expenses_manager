import { useDispatch } from 'react-redux';
import {Transaction} from 'models'
import useGoogleSignIn from "hooks/useGoogleSignIn";
import { DateTime } from 'luxon';
import useFirestoreTransaction from './useFirestoreTransaction';

export default function useTransaction(): {
    addNewTransaction: (transaction: Transaction) => void
    editTransaction: (updatedTransaction: Transaction) => void
    removeTransaction: (transaction: Transaction) => void
    getTransactions: () => void
} {
    const dispatch = useDispatch()
    const {userState} = useGoogleSignIn();
    const {addTransactionToFirestore, editTransactionOnFirestore, getTransactionsFromFirestore} = useFirestoreTransaction();

    const addNewTransaction = (transaction: Transaction) => {
        if (transaction !== null){
            transaction.createDate = DateTime.now().toMillis();
            transaction.updatedDate = transaction.createDate;
            dispatch({type: 'ADD_TRANSACTION', payload: transaction})
            if (userState != null){
                try{
                    addTransactionToFirestore(userState, transaction);
                } catch(e){
                    console.error(e);
                }
            }
        }
    }

    const editTransaction = (updatedTransaction: Transaction) => {
        if (updatedTransaction !== null){
            updatedTransaction.updatedDate = DateTime.now().toMillis();
            dispatch({type: 'EDIT_TRANSACTION', payload: updatedTransaction})
            if (userState != null){
                try{
                    editTransactionOnFirestore(userState, updatedTransaction);
                } catch(e){
                    console.error(e);
                }
            }
        }
        
    }

    const removeTransaction = (transaction: Transaction) => {
        transaction.isDeleted = true;
        transaction.updatedDate = DateTime.now().toMillis();
        dispatch({type: 'DELETE_TRANSACTION', payload: transaction.id});
        if (userState != null){
            try{
                editTransactionOnFirestore(userState, transaction);
            } catch(e){
                console.error(e);
            }
        }
    }

    const getTransactions = async () =>  {
        if (userState != null){
            const transactions: Transaction[] = await getTransactionsFromFirestore(userState);
            transactions.forEach((transaction: Transaction) => {
                if (transaction.createDate == transaction.updatedDate && !transaction.isDeleted){
                    dispatch({type: 'ADD_TRANSACTION', payload: transaction});
                } else if (!transaction.isDeleted) {
                    dispatch({type: 'EDIT_TRANSACTION', payload: transaction})
                } else {
                    dispatch({type: 'DELETE_TRANSACTION', payload: transaction.id});
                }
            })
        }
    }

    return{
        addNewTransaction,
        editTransaction,
        removeTransaction,
        getTransactions
    }
}