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
import Navigator from '_navigations';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '_store/index';
import {Category} from '_models'

declare const global: {HermesInternal: null | {}};

enum CategoryType{
    Income,
    Expense
}

const store = createStore(reducer)

/***
 * Show default category if not found from storage
 */
let foodCategory: Category = new Category("nutrition", "Food", CategoryType.Expense)
let transportCategory: Category = new Category("train", "Transportation", CategoryType.Expense)
let salaryCategory: Category = new Category("paper", "Salary", CategoryType.Income)
store.dispatch({
    type: 'ADD_CATEGORY', 
    payload: foodCategory
})
store.dispatch({
    type: 'ADD_CATEGORY', 
    payload: transportCategory
})
store.dispatch({
    type: 'ADD_CATEGORY', 
    payload: salaryCategory
})

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        )
    }
}
