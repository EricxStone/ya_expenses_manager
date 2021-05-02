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
import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../index'

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
>;

export interface Props{
    navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({navigation}: Props) => {
    //let foodCategory: Category = new Category("nutrition", "Food", CategoryType.Expense)
    //let transportCategory: Category = new Category("train", "Transportation", CategoryType.Expense)
    //let salaryCategory: Category = new Category("person", "Salary", CategoryType.Income)
    const {categoryList} = useSelector((state: RootState) => state.categories);
    const categories = [...categoryList];
    let incomeCategories: Category[] = categories.filter((item: Category) => item.categoryType == 0)
    let expenseCategories: Category[] = categories.filter((item: Category) => item.categoryType == 1)

    const categoryItemClick = (categoryId: string, categoryName: string) => {
        navigation.navigate("Detail", {categoryId, categoryName});
    }

    return (
        <Container>
            <Header>
                <Body>
                    <Title>Expense Manager</Title>
                </Body>
            </Header>
                <Content>
                    <CategoryList categories={incomeCategories} listHeader="Total Income"></CategoryList>
                    <CategoryList categories={expenseCategories} listHeader="Total Expenses"></CategoryList>
                </Content>
        </Container>
    )
}

export default HomeScreen;
