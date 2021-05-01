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
    constructor(item: string, amount: number, source: string, transactionDate: string, categoryId: string){
        this.id = uuidv4()
        this.item = item;
        this.amount = isNaN(amount) ? 0 : amount;
        this.transactionDate = DateTime.fromFormat(transactionDate, "YYYY MM DD").toMillis();
        this.source = source;
        this.categoryId = categoryId;
    }
}

export default Transaction
