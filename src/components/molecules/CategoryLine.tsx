import React, {Component} from 'react'

import {ListItem, Left, Right, Icon, Body, Text} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

enum CategoryType{
    Income,
    Expense
};

export interface Props{
    icon: string;
    categoryName: string;
    categoryType: CategoryType
    spending: number;
    budget: number;
    remaining: number;
}

class CategoryLine extends Component<Props>{
    render() {
        const {icon, categoryName, categoryType, spending, budget, remaining} = this.props

        return (
            <ListItem>
                <Grid>
                    <Col size={1}>
                        <Body>
                            <Icon active name={icon} />
                        </Body>
                    </Col>
                    <Col size={4}>
                        <Row>
                            <Left>
                                <Text>{categoryName}</Text>
                            </Left>
                            <Right>
                                <Text>{categoryType == CategoryType.Income? "Income" : "Expense"}</Text>
                            </Right>
                        </Row>
                        <Row>
                            <Grid>
                                <Col>
                                    <Row>
                                        <Text>Spending</Text>
                                    </Row>
                                    <Row>
                                        <Text>{spending}</Text>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Text>Budget</Text>
                                    </Row>
                                    <Row>
                                        <Text>{budget}</Text>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Text>Remain</Text>
                                    </Row>
                                    <Row>
                                        <Text>{remaining}</Text>
                                    </Row>
                                </Col>
                            </Grid>
                        </Row>
                    </Col>
                </Grid>
            </ListItem>
        )
    }
}

export default CategoryLine
