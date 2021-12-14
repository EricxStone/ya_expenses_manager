import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {DateTime} from 'luxon';

class Transaction {
    id: string;
    item: string;
    amount: number;
    source: string;
    transactionDate: number;
    categoryId: string;
    createDate: number;
    updatedDate: number;
    isDeleted: boolean;
    owner: string;
    
    constructor(item: string, amount: number, source: string, transactionDate: number, categoryId: string){
        this.id = uuidv4()
        this.item = item;
        this.amount = isNaN(amount) ? 0 : amount;
        this.transactionDate = transactionDate == 0 ? DateTime.now().toMillis() : transactionDate;
        this.source = source;
        this.categoryId = categoryId;
        this.createDate = 0;
        this.updatedDate = 0;
        this.isDeleted = false;
        this.owner = "";
    }
}

export default Transaction
