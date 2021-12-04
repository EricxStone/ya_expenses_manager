import React, {FunctionComponent} from 'react'
import {Text, Center} from 'native-base'
import {TransactionLine} from 'components/molecules'
import {Transaction} from 'models'

export interface Props{
    transactions: Transaction[];
    onTransactionEdit: (transaction: Transaction) => void;
}

const TransactionList: FunctionComponent<Props> = ({transactions, onTransactionEdit}: Props) => {
    const transactionList: JSX.Element[] | JSX.Element = transactions.length > 0 ? transactions.map((transaction: Transaction) => 
        <TransactionLine key={transaction.id} transaction={transaction} onTransactionEdit={onTransactionEdit}></TransactionLine>
    ) : <Center flex={1}><Text fontSize="lg" bold={true}>No Transactions</Text></Center>
    return(
        <>
            {transactionList}
        </>
    )
}

export default TransactionList;
