/**
 * 
 */

 import React from 'react';
 import {Category} from '_models'
 import {CategoryInputForm} from '_organisms'
 import {
    StatusBar,
    Box,
    HStack,
    VStack,
    Center,
    Text,
    ScrollView,
    Button,
    Icon,
 } from 'native-base'
 import { useDispatch, useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 import { RouteProp, NavigationProp } from '@react-navigation/native';
 import {StackNavigationProp} from '@react-navigation/stack'
 import FontAwesome from 'react-native-vector-icons/FontAwesome5';
 import {RootStackParamList} from '../../index'
 import {Alert} from "react-native"

 type InputCategoryScreenRouteProp = RouteProp<
    RootStackParamList,
    'InputCategory'
>;

type InputCategoryScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'InputCategory'
>;

export interface Props{
    route: InputCategoryScreenRouteProp;
    navigation: InputCategoryScreenNavigationProp;
}

enum CategoryType{
    Income,
    Expense
}

 const InputCategoryScreen = ({route, navigation}: Props) => {

    console.log(route.params.category)
    const newCategory = route.params.category === undefined ? new Category("wallet", "", CategoryType.Expense) : Object.assign({}, route.params.category);
    const headingName = route.params.category === undefined ? "Add a Category" : "Edit Category"
    const isEditMode = route.params.category === undefined ? false : true;
    const dispatch = useDispatch()

    let deleteCategoryButton: JSX.Element = (
        <></>
    )

    const onInputSubmit = (category: Category) => {
        console.log("category submit:", category);
        console.log("Category param", route.params.category);
        if (route.params.category === undefined && category !== undefined){
            console.log("Add", category);
            dispatch({type: 'ADD_CATEGORY', payload: category})
        } else if (route.params.category !== undefined && category !== undefined) {
            console.log("Edit", category);
            category.remaining = category.budget - category.spending;
            dispatch({type: 'EDIT_CATEGORY', payload: category})
        }
        navigation.goBack();
    }

    const onInputDelete = () => {
        if (route.params.category !== undefined) {
            const category = route.params.category;
            Alert.alert(
                "Delete Category?",
                "Warning! Deleting this category will also delete all related transactions.",
                [
                    {
                    text: "Cancel",
                    style: "cancel"
                    },
                    { text: "Delete", onPress: () => {
                    dispatch({type: 'DELETE_TRANSACTION_BY_CAT', payload: category.id})
                    dispatch({type: 'DELETE_CATEGORY', payload: category.id});
                    navigation.goBack();
                    } }
                ]
            );
        }
    }

    if (route.params.category !== undefined) 
        deleteCategoryButton = (
            <Button bgColor="white" onPress={onInputDelete}>
                <Icon color="darkText" as={<FontAwesome name="trash-alt" />} size="sm" />
            </Button>
        );

    React.useEffect(() => {
        return () => {
            
        }
    }, [])
    
    return (
        <>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop backgroundColor="white" />
            <Box>
                <HStack bg='white' px={1} py={3} justifyContent='space-between' alignItems='center'>
                    <HStack space={4} px={3} alignItems='center'>
                        <Text color="blue.800" fontSize="xl" fontWeight='bold' w="85%">{headingName}</Text>
                        {deleteCategoryButton}
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
                        <CategoryInputForm onInputSubmit={onInputSubmit} category={newCategory} isEditMode={isEditMode}></CategoryInputForm>
                    </VStack>
                </Center>
            </ScrollView>
        </>
    )
 }

 export default InputCategoryScreen;

