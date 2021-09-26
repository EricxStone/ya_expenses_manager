/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {store} from "./store/store"
import {Category, Transaction} from '_models'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from '_scenes/home';
import DetailScreen from '_scenes/detail';
import InputCategoryScreen from "_scenes/inputCategory";
import InputTransactionScreen from "_scenes/inputTransaction";
import ManageCategoryScreen from "_scenes/manageCategory";
import { exp } from 'react-native-reanimated';

declare const global: {HermesInternal: null | {}};

enum CategoryType{
    Income,
    Expense
}

/***
 * Show default category if not found from storage
 */
//  let foodCategory: Category = new Category("bone", "Food", CategoryType.Expense)
// let transportCategory: Category = new Category("person", "Transportation", CategoryType.Expense)
// let salaryCategory: Category = new Category("person", "Salary", CategoryType.Income)
// store.dispatch({
//     type: 'ADD_CATEGORY', 
//     payload: foodCategory
// })
// store.dispatch({
//     type: 'ADD_CATEGORY', 
//     payload: transportCategory
// })
// store.dispatch({
//     type: 'ADD_CATEGORY', 
//     payload: salaryCategory
// })

export type RootStackParamList = {
    Home: undefined;
    Detail: {category: Category};
    InputCategory: {category?: Category};
    InputTransaction: {transaction?: Transaction};
    ManageCategory: undefined;
}

export type RootDrawerParamList = {

}

const MainStack = createStackNavigator();
const ManageCategoryStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStackScreen() {
    return (
        <MainStack.Navigator initialRouteName="Home" headerMode="none">
            <MainStack.Screen name="Home" component={HomeScreen} />
            <MainStack.Screen name="Detail" component={DetailScreen} />
            <MainStack.Screen name="InputCategory" component={InputCategoryScreen} />
            <MainStack.Screen name="InputTransaction" component={InputTransactionScreen} />
        </MainStack.Navigator>
    )
}

function ManageCategoryStackScreen() {
    return (
        <ManageCategoryStack.Navigator initialRouteName="ManageCategory" headerMode="none">
            <ManageCategoryStack.Screen name="ManageCategory" component={ManageCategoryScreen} />
            <ManageCategoryStack.Screen name="InputCategory" component={InputCategoryScreen} />
        </ManageCategoryStack.Navigator>
    )
}

export default class App extends React.Component {
    render() {
        return (
            <NativeBaseProvider>
                <Provider store={store}>
                    <NavigationContainer>
                        <Drawer.Navigator edgeWidth={0}>
                            <Drawer.Screen name="Home" component={MainStackScreen} />
                            <Drawer.Screen name="Manage Category" component={ManageCategoryStackScreen} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </Provider>
            </NativeBaseProvider>
        )
    }
}
