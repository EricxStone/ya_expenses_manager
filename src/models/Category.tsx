import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

enum CategoryType{
    Income,
    Expense
}

class Category {
    id: string;
    icon: string;
    categoryName: string;
    categoryType: CategoryType;
    spending: number;
    budget: number;
    remaining: number;
    constructor(icon: string, categoryName: string, categoryType: CategoryType){
        this.id = uuidv4()
        this.icon = icon
        this.categoryName = categoryName
        this.categoryType = categoryType
        this.spending = 0.0
        this.budget = 0.0
        this.remaining = 0.0
    }
}

export default Category