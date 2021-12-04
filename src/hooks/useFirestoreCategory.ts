import {Category} from 'models';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import useFirestoreUserDoc from "./useFirestoreUserDoc";

export default function useFirestoreCategory(): {
    addCategoryToFirestore: (user: FirebaseAuthTypes.User, category: Category ) => void
    editCategoryOnFirestore: (user: FirebaseAuthTypes.User, oldCategory: Category, newCategory: Category ) => void
    removeCategoryFromFirestore: (user: FirebaseAuthTypes.User, category: Category ) => void
    getCategoriesFromFirestore: (user: FirebaseAuthTypes.User) => Promise<Category[]>
} {
    const {getUserDocumentId, checkDocExist} = useFirestoreUserDoc()
    
    const addCategoryToFirestore = async (user: FirebaseAuthTypes.User, category: Category) => {
        const userDocId = await getUserDocumentId(user);
        if (await checkDocExist("Category", userDocId)){
            await firestore().collection("Category").doc(userDocId).update({
                categories: firestore.FieldValue.arrayUnion(category)
            });
        } else {
            await firestore().collection("Category").doc(userDocId).set({
                categories: firestore.FieldValue.arrayUnion(category)
            });
        }
    } 

    const editCategoryOnFirestore = async (user: FirebaseAuthTypes.User, oldCategory: Category, newCategory: Category) => {
        const userDocId = await getUserDocumentId(user);
        await firestore().collection("Category").doc(userDocId).update({
            categories: firestore.FieldValue.arrayRemove(oldCategory)
        });
        await firestore().collection("Category").doc(userDocId).update({
            categories: firestore.FieldValue.arrayUnion(newCategory)
        });
    }

    const removeCategoryFromFirestore = async (user: FirebaseAuthTypes.User, category: Category) => {
        const userDocId = await getUserDocumentId(user);
        await firestore().collection("Category").doc(userDocId).update({
            categories: firestore.FieldValue.arrayRemove(category)
        });
    }

    const getCategoriesFromFirestore = async (user: FirebaseAuthTypes.User): Promise<Category[]> => {
        const userDocId = await getUserDocumentId(user);
        const documentSnapshot = await firestore().collection("Category").doc(userDocId).get();
        if (documentSnapshot.exists){
            const documentData = documentSnapshot.data();
            console.log(documentData)
            if (documentData !== undefined){
                if (documentData.categories !== undefined) {
                    const categories = documentData.categories;
                    console.log(categories);
                    return categories
                }
            }
        }
        return []
    }

    return {
        addCategoryToFirestore,
        editCategoryOnFirestore,
        removeCategoryFromFirestore,
        getCategoriesFromFirestore
    }
}