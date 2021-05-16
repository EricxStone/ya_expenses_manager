import React, {FunctionComponent} from 'react'

import {ListItem, Left, Right, Body, Text} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Col, Row, Grid } from 'react-native-easy-grid'
import {Category} from '_models'

enum CategoryType{
    Income,
    Expense
};

export interface Props{
    // catId: string;
    // icon: string;
    // categoryName: string;
    // categoryType: CategoryType
    // spending: number;
    // budget: number;
    // remaining: number;
    category: Category;
    onCategoryClick: (category: Category) => void;
}

const CategoryLine: FunctionComponent<Props> = ({category, onCategoryClick}: Props) => {
    return (
        <ListItem button onPress={()=>onCategoryClick(category)} >
            <Grid>
                <Col size={1}>
                    <Body>
                        <Icon name={category.icon} />
                    </Body>
                </Col>
                <Col size={4}>
                    <Row>
                        <Left>
                            <Text>{category.categoryName}</Text>
                        </Left>
                        <Right>
                            <Text>{category.categoryType == CategoryType.Income? "Income" : "Expense"}</Text>
                        </Right>
                    </Row>
                    <Row>
                        <Grid>
                            <Col>
                                <Row>
                                    <Text>Spending</Text>
                                </Row>
                                <Row>
                                    <Text>{category.spending}</Text>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Text>Budget</Text>
                                </Row>
                                <Row>
                                    <Text>{category.budget}</Text>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Text>Remain</Text>
                                </Row>
                                <Row>
                                    <Text>{category.remaining}</Text>
                                </Row>
                            </Col>
                        </Grid>
                    </Row>
                </Col>
            </Grid>
        </ListItem>
    )
}

export default CategoryLine
