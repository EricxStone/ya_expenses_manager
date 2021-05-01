import React, { Component } from 'react'

import {ListItem, Left, Right, Text} from 'native-base'

export interface Props{
    item: string;
    amount: number;
    source: string;
    transactionDate: string;
}

class TransactionLine extends Component<Props> {
    render() {
        const {item, amount, source, transactionDate} = this.props;

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
}

export default TransactionLine