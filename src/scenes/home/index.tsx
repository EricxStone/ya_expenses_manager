/**
 * 
 * 
 * @format
 */

import React from 'react';
import {Category} from '_models'
import {CategoryList} from '_organisms'
import {
    VStack, HStack, Text, Center, Box, StatusBar,
    Fab, useToken, Icon, ScrollView
} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
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
    
    const [lightText] = useToken('colors', [
        'lightText',
    ]);

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
        console.log(category);
        navigation.navigate("Detail", {category});
    }

    const categoryItemEdit = (category: Category) => {
        Alert.alert(
            "Edit Category - " + category.categoryName + "?",
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
        <>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop backgroundColor="white" />
            <Box>
                <HStack bg='white' px={1} py={3} justifyContent='space-between' alignItems='center'>
                    <HStack space={4} px={3} alignItems='center'>
                        <Text color="blue.800" fontSize="xl" fontWeight='bold'>Expense Manager</Text>
                    </HStack>
                </HStack>
            </Box>
            <ScrollView
                _contentContainerStyle={{
                    bg: "white",
                    w: "100%",
                }}
                height="100%"
                bg="white"
                >
                <Center pr={5} pl={5} w="100%" bg='white'>
                    <VStack alignItems="center" w="100%">
                        <CategoryList categories={incomeCategoriesState} listHeader="Total Income" onCategoryClick={categoryItemClick} onCategoryEdit={categoryItemEdit}></CategoryList>
                        <CategoryList categories={expenseCategoriesState} listHeader="Total Expenses" onCategoryClick={categoryItemClick} onCategoryEdit={categoryItemEdit}></CategoryList>
                    </VStack>
                </Center>
            </ScrollView>
            <Box position="relative" h={100} w="100%" bg="white">
                <Fab
                    position="absolute"
                    size="xs"
                    icon={<Icon color="lightText" as={<FontAwesome name="plus" />} size="xs" />}
                    onPress={() => navigation.navigate("InputTransaction", {})}
                    backgroundColor="blue.800"
                />
            </Box>
        </>
    )
}

export default HomeScreen;
