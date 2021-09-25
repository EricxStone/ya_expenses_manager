/**
 * 
 */

 import React from 'react';
 import {Transaction} from '_models'
 import {TransactionInputForm} from '_organisms'
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
 import { RouteProp, NavigationProp } from '@react-navigation/native';
 import {StackNavigationProp} from '@react-navigation/stack';
 import {RootStackParamList} from '../../index';
 import FontAwesome from 'react-native-vector-icons/FontAwesome5';
 import {Alert} from "react-native";

 type InputTransactionScreenRouteProp = RouteProp<
    RootStackParamList,
    'InputTransaction'
>;

type InputTransactionScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'InputTransaction'
>;

export interface Props{
    route: InputTransactionScreenRouteProp;
    navigation: InputTransactionScreenNavigationProp;
}

 const InputTransactionScreen = ({route, navigation}: Props) => {

    const newTransaction = route.params.transaction === undefined ? new Transaction("", 0, "", 0, "") : Object.assign({}, route.params.transaction);
    const headingName = route.params.transaction === undefined ? "Add a Transaction" : "Edit Transaction";
    const dispatch = useDispatch();

    let deleteTransactionButton: JSX.Element = (
        <></>
    )

    const onInputSubmit = (transaction: Transaction) => {
        console.log("transaction submit:", transaction);
        if (route.params.transaction === undefined && transaction !== undefined){
            console.log("Add", transaction);
            dispatch({type: 'ADD_TRANSACTION', payload: transaction})
        } else if (route.params.transaction !== undefined && transaction !== undefined) {
            console.log("Edit", transaction);
            dispatch({type: 'EDIT_TRANSACTION', payload: transaction});
        }
        navigation.goBack();
    }

    const onInputDelete = () => {
        if (route.params.transaction !== undefined) {
            const transaction = route.params.transaction;
            Alert.alert(
                "Delete Transaction?",
                "",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { text: "Delete", onPress: () => {
                    dispatch({type: 'DELETE_TRANSACTION', payload: transaction.id});
                    navigation.goBack();
                  } }
                ]
            );
        }
    }

    if (route.params.transaction !== undefined) 
        deleteTransactionButton = (
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
                        {deleteTransactionButton}
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
                        <TransactionInputForm onInputSubmit={onInputSubmit} transaction={newTransaction} ></TransactionInputForm>
                    </VStack>
                </Center>
            </ScrollView>
        </>
    )
 }

 export default InputTransactionScreen;

