import React, {FunctionComponent} from 'react'
import {List, ListItem, Left, Right, Text} from 'native-base'
import {TransactionLine} from '_molecules'
import {Transaction} from '_models'

export interface Props{
    transactions: Transaction[];
    categoryId: string;
    categoryName: string;
}

const TransactionList: FunctionComponent<Props> = ({transactions, categoryId, categoryName}: Props) => {
    const transactionList: JSX.Element[] = transactions.map((transaction: Transaction) => 
        <TransactionLine key={transaction.id} item={transaction.item} amount={transaction.amount} source={transaction.source} transactionDate={transaction.transactionDate} categoryId={transaction.categoryId}></TransactionLine>
    )
    return(
        <React.Fragment>
            <List>
                {transactionList}
            </List>
        </React.Fragment>
    )
}

export default TransactionList;
