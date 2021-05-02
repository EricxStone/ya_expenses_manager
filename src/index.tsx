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
import {Category} from '_models'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '_scenes/home';
import DetailScreen from '_scenes/detail';

declare const global: {HermesInternal: null | {}};

enum CategoryType{
    Income,
    Expense
}

/***
 * Show default category if not found from storage
 */
// let foodCategory: Category = new Category("person", "Food", CategoryType.Expense)
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
    Detail: {categoryId: string, categoryName: string}
}

const Stack = createStackNavigator();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" headerMode="none">
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Detail" component={DetailScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}
