import {Category} from '_models' 
import {CategoryActionType, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, ADD_SPENDING, REDUCE_SPENDING} from './type'

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

export const addSpending = (categoryId: string, amount: number): CategoryActionType => {
    return {
        type: ADD_SPENDING,
        payload: {
            id: categoryId,
            amount
        }
    }
}

export const reduceSpending = (categoryId: string, amount: number): CategoryActionType => {
    return {
        type: REDUCE_SPENDING,
        payload: {
            id: categoryId,
            amount
        }
    }
}
