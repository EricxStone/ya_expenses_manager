import {Category} from '_models' 
import {CategoryActionType, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY} from './type'

export const addCategory = (newCategory: Category): CategoryActionType => {
    return {
        type: ADD_CATEGORY,
        payload: newCategory
    }
}

export const editCategory = (updatedCategory: Category): CategoryActionType => {
    return {
        type: EDIT_CATEGORY,
        payload: updatedCategory
    }
}

export const deleteCategory = (deleteCategoryId: string): CategoryActionType => {
    return {
        type: DELETE_CATEGORY,
        payload: deleteCategoryId
    }
}
