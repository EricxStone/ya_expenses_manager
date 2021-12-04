import {Category} from 'models' 

export interface categoriesState{
    categoryList: Category[]
}

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const EDIT_CATEGORY = 'EDIT_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const SYNC_CATEGORIES = 'SYNC_CATEGORIES'

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

interface SyncCategoriesAction {
    type: typeof SYNC_CATEGORIES
    payload: Category[]
}


export type CategoryActionType = AddCategoryAction | EditCategoryAction | DeleteCategoryAction | SyncCategoriesAction
