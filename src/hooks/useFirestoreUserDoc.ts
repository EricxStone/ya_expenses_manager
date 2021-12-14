import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function useFirestoreUserDoc(): {
    getUserDocumentId: (user: FirebaseAuthTypes.User) => Promise<string> 
    checkDocExist: (collection: string, documentId: string) => Promise<boolean>
} {
    const getUserDocumentId = async (user: FirebaseAuthTypes.User): Promise<string> => {
        const querySnapshot = await firestore().collection("Users").where("userID", "==", user.providerId + user.email).get();
        if (querySnapshot.size == 0){
            const userDocId = await addUserCollection(user);
            return userDocId;
        } else{
            let userDocId = "";
            querySnapshot.forEach(documentSnapshot => {
                userDocId = documentSnapshot.get('docID');
            });
            return userDocId;
        }
    }

    const addUserCollection = async (user: FirebaseAuthTypes.User): Promise<string> => {
        const userCollection: string = uuidv4();
        await firestore().collection("Users").add({
            userID: user.providerId + user.email,
            docID: userCollection,
        });
        return userCollection;
    }

    const checkDocExist = async (collection: string, documentId: string): Promise<boolean> => {
        const documentSnapshot = await firestore().collection(collection).doc(documentId).get()
        return documentSnapshot.exists;
    }

    return {
        getUserDocumentId,
        checkDocExist
    }
}