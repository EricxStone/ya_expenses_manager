import {Category} from '_models' 

export interface categoriesState{
    categoryList: Category[]
}

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const EDIT_CATEGORY = 'EDIT_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const ADD_SPENDING = 'ADD_SPENDING'
export const REDUCE_SPENDING = 'REDUCE_SPENDING'

interface AddCategoryAction {
    type: typeof ADD_CATEGORY
    payload: Category
}

interface EditCategoryAction {
    type: typeof EDIT_CATEGORY
    payload: Category
}

interface DeleteCategoryAction {
    type: typeof DELETE_CATEGORY
    payload: string
}

interface AddSpendingAction {
    type: typeof ADD_SPENDING
    payload: {
        id: string,
        amount: number
    }
}

interface ReduceSpendingAction {
    type: typeof REDUCE_SPENDING
    payload: {
        id: string,
        amount: number
    }
}

export type CategoryActionType = AddCategoryAction | EditCategoryAction | DeleteCategoryAction | AddSpendingAction | ReduceSpendingAction
