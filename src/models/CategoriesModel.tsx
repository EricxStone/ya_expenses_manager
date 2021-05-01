import {Category} from '_models/index'

class CategoriesModel{
    categories: Category[] = []

    addCategory = (newCategory: Category) => {
        this.categories.push(newCategory)
    }

    removeCategory = (removeCat: Category) => {
        this.categories = this.categories.filter(x => {
            return removeCat.id != x.id
        })
    }

    getCategories = (): Category[] => {
        return this.categories
    }
}

export default CategoriesModel