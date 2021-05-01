import {Category} from '_models' 
import {categoriesState, CategoryActionType, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY} from './type'

const initialState: categoriesState = {
    categoryList: []
}

const categoriesReducer = (state = initialState, action: CategoryActionType) => {
    switch (action.type){
        case ADD_CATEGORY:
            const {categoryList} = state
            categoryList.push(action.payload)
            const addNewState = {categoryList}
            return addNewState
        
        case EDIT_CATEGORY:
            const filteredCategories = state.categoryList.filter(
                cate => cate.id != action.payload.id
            )
            const newState = filteredCategories.push(action.payload)
            return newState

        case DELETE_CATEGORY:
            return state.categoryList.filter(
                cate => cate.id != action.payload
            )

        default:
            return state
    }
}

export default categoriesReducer