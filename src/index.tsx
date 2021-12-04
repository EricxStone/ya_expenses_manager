/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {store, persistor} from "./store/store"
import {Category, Transaction} from 'models'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from 'scenes/home';
import DetailScreen from 'scenes/detail';
import InputCategoryScreen from "scenes/inputCategory";
import InputTransactionScreen from "scenes/inputTransaction";
import ManageCategoryScreen from "scenes/manageCategory";
import SettingsScreen from 'scenes/settings';
import { PersistGate } from 'redux-persist/integration/react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

declare const global: {HermesInternal: null | {}};

export type RootStackParamList = {
    Home: undefined;
    Detail: {category: Category};
    InputCategory: {category?: Category};
    InputTransaction: {transaction?: Transaction};
    ManageCategory: undefined;
    Settings: undefined;
}

export type RootDrawerParamList = {

}

const MainStack = createStackNavigator();
const ManageCategoryStack = createStackNavigator();
const SettingsStack = createStackNavigator();
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

function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator initialRouteName="Settings" headerMode="none">
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        </SettingsStack.Navigator>
    )
}

const App = () => {

    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                        <Drawer.Navigator edgeWidth={0}>
                            <Drawer.Screen name="Home" component={MainStackScreen} />
                            <Drawer.Screen name="Manage Category" component={ManageCategoryStackScreen} />
                            <Drawer.Screen name="Settings" component={SettingsStackScreen} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        </NativeBaseProvider>
    )
}

export default App;
