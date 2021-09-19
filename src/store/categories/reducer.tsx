import {Category} from '_models' 
import {categoriesState, CategoryActionType, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, ADD_SPENDING, REDUCE_SPENDING} from './type'

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

        case ADD_SPENDING:
            if (action.payload !== undefined){
                console.log("Category List:", state.categoryList);
                let unchangedCategories: Category[] = state.categoryList.filter(
                    (cate: Category) => cate.id != action.payload.id
                )
                const updateCategories: Category[] = state.categoryList.filter(
                    (cate: Category) => cate.id == action.payload.id
                )
                let updateCategory = updateCategories[0];
                if (action.payload.amount !== undefined) updateCategory.spending += action.payload.amount
                if (updateCategory.budget > 0) updateCategory.remaining = updateCategory.budget - updateCategory.spending;
                unchangedCategories.push(updateCategory);
                return {categoryList: unchangedCategories}
            }
            return state

        case REDUCE_SPENDING:
            if (action.payload !== undefined){
                console.log("Category List:", state.categoryList);
                let unchangedCategories: Category[] = state.categoryList.filter(
                    (cate: Category) => cate.id != action.payload.id
                )
                const updateCategories: Category[] = state.categoryList.filter(
                    (cate: Category) => cate.id == action.payload.id
                )
                let updateCategory = updateCategories[0];
                if (action.payload.amount !== undefined) 
                    updateCategory.spending = Math.max(updateCategory.spending - action.payload.amount, 0)
                if (updateCategory.budget > 0) updateCategory.remaining = updateCategory.budget - updateCategory.spending;
                unchangedCategories.push(updateCategory);
                return {categoryList: unchangedCategories}
            }
            return state

        default:
            return state
    }
}

export default categoriesReducer
