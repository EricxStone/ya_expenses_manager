import {Transaction} from 'models';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import useFirestoreUserDoc from "./useFirestoreUserDoc";
import { DateTime } from 'luxon';

export default function useFirestoreTransaction(): {
    addTransactionToFirestore: (user: FirebaseAuthTypes.User, transaction: Transaction ) => void
    editTransactionOnFirestore: (user: FirebaseAuthTypes.User, transaction: Transaction ) => void
    getTransactionsFromFirestore: (user: FirebaseAuthTypes.User) => Promise<Transaction[]>
} {
    const {getUserDocumentId, checkDocExist} = useFirestoreUserDoc()
    
    const addTransactionToFirestore = async (user: FirebaseAuthTypes.User, transaction: Transaction) => {
        if (await checkDocExist("Transaction", transaction.id)){
            console.error("Transaction already exist, failed to add to firestore")
        } else {
            const userDocId = await getUserDocumentId(user);
            transaction.owner = userDocId;
            await firestore().collection("Transaction").doc(transaction.id).set(
                transaction
            );
        }
    } 

    const editTransactionOnFirestore = async (user: FirebaseAuthTypes.User, transaction: Transaction) => {
        if (await checkDocExist("Transaction", transaction.id)){
            const userDocId = await getUserDocumentId(user);
            transaction.owner = userDocId;
            await firestore().collection("Transaction").doc(transaction.id).update(
                transaction
            );
        } else {
            console.error("Transaction doesn't exist, failed to update in firestore")
        }
    }

    const getTransactionsFromFirestore = async (user: FirebaseAuthTypes.User): Promise<Transaction[]> => {
        const userDocId = await getUserDocumentId(user);
        const querySnapshot = await firestore().collection("Transaction").where("owner", "==", userDocId).where("updatedDate", ">=", DateTime.now().toMillis()).get();
        if (querySnapshot.size == 0){
            return [];
        } else{
            let transactions: Transaction[] = [];
            querySnapshot.forEach(documentSnapshot => {
                let transaction = new Transaction(
                    documentSnapshot.get("item"),
                    documentSnapshot.get("amount"),
                    documentSnapshot.get("source"),
                    documentSnapshot.get("transactionDate"),
                    documentSnapshot.get("categoryId")
                );
                transaction.id = documentSnapshot.get("id");
                transaction.createDate = documentSnapshot.get("createDate");
                transaction.updatedDate = documentSnapshot.get("updatedDate");
                transaction.isDeleted = documentSnapshot.get("isDeleted");
            });
            return transactions;
        }
    }

    return {
        addTransactionToFirestore,
        editTransactionOnFirestore,
        getTransactionsFromFirestore
    }
}