/**
 * 
 * 
 * @format
 */

import React from 'react';
import {Category} from 'models'
import {CategoryList} from 'components/organisms'
import {
    VStack, HStack, Text, Center, Box, StatusBar,
    Fab, useToken, Icon, ScrollView, Button
} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {RootStackParamList, RootDrawerParamList} from '../../index'
import {Alert, Pressable} from 'react-native'
import useCategory from "../../hooks/useCategory"
import useTransaction from "../../hooks/useTransaction"

type HomeScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<
        RootStackParamList,
        'Home'
    >,
    DrawerNavigationProp<RootDrawerParamList>
>


export interface Props{
    navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({navigation}: Props) => {
    
    const [lightText] = useToken('colors', [
        'lightText',
    ]);

    let incomeCategories: Category[] = []
    let expenseCategories: Category[] = []

    const {getCategories} = useCategory();
    const {getTransactions} = useTransaction();

    const [incomeCategoriesState, setIncomeCategoriesState] = React.useState(incomeCategories);
    const [expenseCategoriesState, setExpenseCategoriesState] = React.useState(expenseCategories);

    const categoryList = useSelector((state: RootState) => state.categories.categoryList);

    React.useEffect(() => {
        getCategories();
        getTransactions();
    }, [])

    React.useEffect(() => {
        console.log("Use select reload")
        const categories = [...categoryList];
        let incomeCategories = categories.filter((item: Category) => item.categoryType == 0);
        let expenseCategories = categories.filter((item: Category) => item.categoryType == 1);
        incomeCategories = incomeCategories.sort((a,b) => a.categoryName.localeCompare(b.categoryName));
        expenseCategories = expenseCategories.sort((a,b) => a.categoryName.localeCompare(b.categoryName));
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

    const onMenuPressed = () => {
        navigation.toggleDrawer();
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop backgroundColor="white" />
            <Box bg='white' width="100%">
                <Center my={3}>
                    <HStack bg='gray.200' px={2} py={3} justifyContent='space-between' borderRadius={20} alignItems='center' width="88%" shadow={0}>
                        <HStack width="25%"px={2}>
                            <Pressable onPress={onMenuPressed}>
                                <Center>
                                    <Icon as={<FontAwesome name="bars" />} size="sm" />
                                </Center>
                            </Pressable>
                        </HStack>
                        <HStack space={4} px={3} alignItems='center' width="75%">
                            <Text color="blue.800" fontSize="xl" fontWeight='bold'>Expense Manager</Text>
                        </HStack>
                    </HStack>
                </Center>
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
                        <CategoryList categories={incomeCategoriesState} listHeader="Total Income (Current Month)" onCategoryClick={categoryItemClick} onCategoryEdit={categoryItemEdit}></CategoryList>
                        <CategoryList categories={expenseCategoriesState} listHeader="Total Expenses (Current Month)" onCategoryClick={categoryItemClick} onCategoryEdit={categoryItemEdit}></CategoryList>
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
                    renderInPortal={false}
                />
            </Box>
        </>
    )
}

export default HomeScreen;
