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
    View, Button, Fab
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, shallowEqual } from 'react-redux';
import {RootState} from '../../store/store';
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../index'
import {Alert} from 'react-native'

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
    let incomeCategories: Category[] = []
    let expenseCategories: Category[] = []

    const [incomeCategoriesState, setIncomeCategoriesState] = React.useState(incomeCategories);
    const [expenseCategoriesState, setExpenseCategoriesState] = React.useState(expenseCategories);

    const categoryList = useSelector((state: RootState) => state.categories.categoryList);

    React.useEffect(() => {
        console.log("Use select reload")
        const categories = [...categoryList];
        let incomeCategories = categories.filter((item: Category) => item.categoryType == 0)
        let expenseCategories = categories.filter((item: Category) => item.categoryType == 1)
        if (incomeCategories.length > 0) setIncomeCategoriesState(incomeCategories);
        if (expenseCategories.length > 0) setExpenseCategoriesState(expenseCategories);

        return () => {
            setIncomeCategoriesState([])
            setExpenseCategoriesState([])
        }
    }, [categoryList])

    console.log("Re-render");

    const categoryItemClick = (category: Category) => {
        navigation.navigate("Detail", {category});
    }

    const categoryItemEdit = (category: Category) => {
        Alert.alert(
            "Edit Category - " + category.categoryName,
            "",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Edit", onPress: () => navigation.navigate("InputCategory", {category}) }
            ]
        );
        
    }

    return (
        <Container>
            <Header>
                <Body>
                    <Title>Expense Manager</Title>
                </Body>
            </Header>
                <Content>
                    <CategoryList categories={incomeCategoriesState} listHeader="Total Income" onCategoryClick={categoryItemClick} onCategoryEdit={categoryItemEdit}></CategoryList>
                    <CategoryList categories={expenseCategoriesState} listHeader="Total Expenses" onCategoryClick={categoryItemClick} onCategoryEdit={categoryItemEdit}></CategoryList>
                </Content>
                <View style={{ flex: 1 }}>
                    <Fab
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => navigation.navigate("InputCategory", {})}>
                        <Icon name="plus" />
                    </Fab>
                </View>
        </Container>
    )
}

export default HomeScreen;
