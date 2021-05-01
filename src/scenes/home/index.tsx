/**
 * 
 * 
 * @format
 */

import React from 'react';
import {Category} from '_models'
import {CategoryList} from '_organisms'
import {
    Container,
    Header,
    Title, 
    Content,
    Body,
} from 'native-base'
import { connect, ConnectedProps } from 'react-redux';

enum CategoryType{
    Income,
    Expense
}

export interface State {
    categoryList: Category[],
}

export interface Props{
    categoryList: Category[],
}

class HomeScreen extends React.Component <Props> {
    
    render() {
        //let foodCategory: Category = new Category("nutrition", "Food", CategoryType.Expense)
        //let transportCategory: Category = new Category("train", "Transportation", CategoryType.Expense)
        //let salaryCategory: Category = new Category("person", "Salary", CategoryType.Income)
        const {categoryList} = this.props
        console.log(categoryList)
        let incomeCategories: Category[] = Object.values(categoryList).filter((item: Category) => {
            //item.categoryType == 0
            console.log(item.categoryName)
            item.categoryName == "Salary"
        })
        let expenseCategories: Category[] = Object.values(categoryList).filter((item: Category) => 
            //item.categoryType == 1
            item.categoryName == "Food"
        )
        console.log(incomeCategories)
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Expense Manager</Title>
                    </Body>
                </Header>
                    <Content>
                        <CategoryList Categories={incomeCategories} listHeader="Total Income"></CategoryList>
                        <CategoryList Categories={expenseCategories} listHeader="Total Expenses"></CategoryList>
                    </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state:State) => {
    const {categoryList} = state
    return {categoryList}
}

export default connect(mapStateToProps)(HomeScreen);
