import {Category} from '_models' 
import {categoriesState, CategoryActionType, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY} from './type'

const initialState: categoriesState = {
    categoryList: []
}

const categoriesReducer = (state: categoriesState = initialState, action: CategoryActionType): categoriesState => {
    switch (action.type){
        case ADD_CATEGORY:
            const categoryList = state.categoryList
            console.log("Category List:", categoryList);
            if (action.payload !== undefined) categoryList.push(action.payload)
            return {categoryList: [...categoryList]}
        
        case EDIT_CATEGORY:
            if (action.payload.id !== undefined){
                console.log("Category List:", state.categoryList);
                let filteredCategories: Category[] = state.categoryList.filter(
                    (cate: Category) => cate.id != action.payload.id
                )
                filteredCategories.push(action.payload);
                return {categoryList: filteredCategories}
            } 
            return state

        case DELETE_CATEGORY:
            if (action.payload !== undefined){
                const removedCategories: Category[] = state.categoryList.filter(
                    (cate: Category) => cate.id != action.payload
                )
                return {categoryList: removedCategories}
            } 
            return state

        default:
            return state
    }
}

export default categoriesReducer
