/**
 * 
 * 
 * @format
 */

 import React from 'react';
 import {Transaction} from 'models'
 import {TransactionList} from 'components/organisms'
 import {
    VStack, HStack, Text, Center, Box, StatusBar,
    Fab, Icon, ScrollView
 } from 'native-base'
 import { useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 import { RouteProp } from '@react-navigation/native';
 import {RootStackParamList} from '../../index'
 import {StackNavigationProp} from '@react-navigation/stack'
 import FontAwesome from 'react-native-vector-icons/FontAwesome5';
 import {Alert} from 'react-native'

type DetailScreenRouteProp = RouteProp<
    RootStackParamList,
    'Detail'
>;

type DetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Detail'
>;

export interface Props{
    route: DetailScreenRouteProp,
    navigation: DetailScreenNavigationProp;
}

enum CategoryType{
    Income,
    Expense
}
 
 const DetailScreen = ({route, navigation}: Props) => {
    const category = route.params.category;
    const transactionList = useSelector((state: RootState) => state.transactions.transactionList);
    let displayTransactions: Transaction[] = []
    const [displayTransactionState, setDisplayTransactionState] = React.useState(displayTransactions);
    
    React.useEffect(() => {
        console.log("Use select reload")
        let transactions: Transaction[] = [...transactionList];
        console.log("Transaction: ", transactions);
        console.log("Existing cat", category.id);
        transactions = transactions.filter((transaction:Transaction) => transaction.categoryId == category.id);
        transactions = transactions.sort(function(a,b){
            return b.transactionDate - a.transactionDate
        })
        console.log("Filtered Transaction: ", transactions);
        if (transactions.length > 0){
            setDisplayTransactionState(transactions);
        } 

        return () => {
            setDisplayTransactionState([])
        }
    }, [transactionList])

    const transactionItemEdit = (transaction: Transaction) => {
        Alert.alert(
            "Edit Transaction?",
            "",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Edit", onPress: () => navigation.navigate("InputTransaction", {transaction}) }
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
                        <Text color="blue.800" fontSize="xl" fontWeight='bold'>{category.categoryType == 0 ? "Income" : "Expense"} - {category.categoryName}</Text>
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
                        <TransactionList onTransactionEdit={transactionItemEdit} transactions={displayTransactionState}></TransactionList>
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
 
 export default DetailScreen;
 