import {Category} from '_models' 
import {categoriesState, CategoryActionType, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY} from './type'

const initialState: categoriesState = {
    categoryList: []
}

const categoriesReducer = (state = initialState, action: CategoryActionType): categoriesState => {
    switch (action.type){
        case ADD_CATEGORY:
            const {categoryList} = state
            categoryList.push(action.payload)
            const addNewState = {categoryList}
            return addNewState
        
        case EDIT_CATEGORY:
            let filteredCategories = state.categoryList.filter(
                cate => cate.id != action.payload.id
            )
            filteredCategories.push(action.payload);
            return {categoryList: filteredCategories}

        case DELETE_CATEGORY:
            const removedCategories = state.categoryList.filter(
                cate => cate.id != action.payload
            )
            return {categoryList: removedCategories}

        default:
            return state
    }
}

export default categoriesReducer
