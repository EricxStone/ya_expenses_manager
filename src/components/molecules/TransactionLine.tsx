import React, { FunctionComponent } from 'react'
import {Transaction} from '_models'

import {ListItem, Left, Right, Text} from 'native-base'

export interface Props{
    transaction: Transaction;
}

const TransactionLine: FunctionComponent<Props> = ({transaction}: Props) => {
    return (
        <ListItem noIndent>
            <Left>
                <Text>{transaction.item}</Text>
            </Left>
            <Right>
                <Text>${transaction.amount}</Text>
            </Right>
            <Left>
                <Text>${transaction.source}</Text>
            </Left>
            <Right>
                <Text>{transaction.transactionDate}</Text>
            </Right>
        </ListItem>
    )
}

export default TransactionLine
