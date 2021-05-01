import React, { FunctionComponent } from 'react'

import {ListItem, Left, Right, Text} from 'native-base'

export interface Props{
    item: string;
    amount: number;
    source: string;
    transactionDate: string;
}

const TransactionLine: FunctionComponent<Props> = ({item, amount, source, transactionDate}: Props) => {
    return (
        <ListItem noIndent>
            <Left>
                <Text>{item}</Text>
            </Left>
            <Right>
                <Text>${amount}</Text>
            </Right>
            <Left>
                <Text>${source}</Text>
            </Left>
            <Right>
                <Text>{transactionDate}</Text>
            </Right>
        </ListItem>
    )
}

export default TransactionLine
