import { useDispatch } from 'react-redux';
import {Category} from 'models'
import useGoogleSignIn from "hooks/useGoogleSignIn";
import useFirestoreCategory from "hooks/useFirestoreCategory";
import { useSelector } from 'react-redux';
import {RootState} from '../store/store';

export default function useCategory(): {
    addNewCategory: (category: Category) => void
    editCategory: (oldCategory: Category, newCategory: Category) => void
    removeCategory: (category: Category) => void
    getCategories: () => void
} {
    const dispatch = useDispatch()
    const {onGoogleSignInPressed, onGoogleSignOutPressed, userState, isSigninInProgress} = useGoogleSignIn();
    const {addCategoryToFirestore, editCategoryOnFirestore, removeCategoryFromFirestore, getCategoriesFromFirestore} = useFirestoreCategory();

    const addNewCategory = (category: Category) => {
        dispatch({type: 'ADD_CATEGORY', payload: category})
        if (userState != null){
            try{
                addCategoryToFirestore(userState, category);
            } catch(e){
                console.error(e);
            }
        }
    }

    const editCategory = (oldCategory: Category, newCategory: Category) => {
        dispatch({type: 'EDIT_CATEGORY', payload: newCategory})
        if (userState != null){
            try{
                editCategoryOnFirestore(userState, oldCategory, newCategory);
            } catch(e){
                console.error(e);
            }
        }
    }

    const removeCategory = (category: Category) => {
        dispatch({type: 'DELETE_TRANSACTION_BY_CAT', payload: category.id})
        dispatch({type: 'DELETE_CATEGORY', payload: category.id});
        if (userState != null){
            try{
                removeCategoryFromFirestore(userState, category);
            } catch(e){
                console.error(e);
            }
        }
    }

    const getCategories = async () =>  {
        if (userState != null){
            const result = await getCategoriesFromFirestore(userState);
            console.log(result);
            dispatch({type: 'SYNC_CATEGORIES', payload: result})
        }  
    }


    return{
        addNewCategory,
        editCategory,
        removeCategory,
        getCategories
    }
}