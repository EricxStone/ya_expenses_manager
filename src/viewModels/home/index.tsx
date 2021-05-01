import {Category} from "_models"

class HomeViewModel {
    expenseCategoryStore: Category[]
    incomeCategoryStore: Category[]
    constructor(){
        this.expenseCategoryStore = []
        this.incomeCategoryStore = []
    }

    getExpenseCategory = ():Category[] => {
        return this.expenseCategoryStore
    }

    getIncomeCategory = ():Category[] => {
        return this.incomeCategoryStore
    }

    addExpenseCategory = (newExpenseCategory: Category) => {
        this.expenseCategoryStore.push(newExpenseCategory)
    }

    addIncomeCategory = (newIncomeCategory: Category) => {
        this.incomeCategoryStore.push(newIncomeCategory)
    }
}

export default HomeViewModel