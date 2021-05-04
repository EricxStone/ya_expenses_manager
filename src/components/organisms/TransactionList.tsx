import React, {FunctionComponent} from 'react'
import {List, ListItem, Left, Right, Text} from 'native-base'
import {TransactionLine} from '_molecules'
import {Transaction} from '_models'

export interface Props{
    transactions: Transaction[];
}

const TransactionList: FunctionComponent<Props> = ({transactions}: Props) => {
    const transactionList: JSX.Element[] = transactions.map((transaction: Transaction) => 
        <TransactionLine key={transaction.id} transaction={transaction}></TransactionLine>
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
