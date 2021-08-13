import React, { FunctionComponent } from 'react'
import {Transaction} from '_models'
import { DateTime } from 'luxon'

import {ListItem, Left, Right, Text, Grid, Row, Col, View, List} from 'native-base'

export interface Props{
    transaction: Transaction;
}

const TransactionLine: FunctionComponent<Props> = ({transaction}: Props) => {
    return (
        <ListItem button >
            <Grid>
                <Row>
                    <Col size={3}>
                        <Left>
                            <Text>{transaction.item}</Text>
                        </Left>
                    </Col>
                    <Col size={1}>
                        <Right>
                            <Text>${transaction.amount}</Text>
                        </Right>
                    </Col>
                </Row>
                <Row>
                    <Col size={2}>
                        <Left>
                            <Text>{transaction.source}</Text>
                        </Left>
                    </Col>
                    <Col size={1}>
                        <Right> 
                            <Text>${DateTime.fromMillis(transaction.transactionDate).setLocale('hk').toFormat("yyyy-MM-dd")}</Text>
                        </Right>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    )
}

export default TransactionLine
