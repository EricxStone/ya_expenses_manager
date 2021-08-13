/**
 * 
 * 
 * @format
 */

 import React from 'react';
 import {Transaction} from '_models'
 import {TransactionList} from '_organisms'
 import {
     Container,
     Header,
     Title, 
     Content,
     Body,
     Text,
     View,
     Fab,
 } from 'native-base'
 import { useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 import { RouteProp } from '@react-navigation/native';
 import {RootStackParamList} from '../../index'
 import {StackNavigationProp} from '@react-navigation/stack'
 import Icon from 'react-native-vector-icons/FontAwesome5';

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
    let displayTransactions: Category[] = []
    const [displayTransactionState, setDisplayTransactionState] = React.useState(displayTransactions);
    
    React.useEffect(() => {
        console.log("Use select reload")
        let transactions: Transaction[] = [...transactionList];
        console.log("Transaction: ", transactions);
        console.log("Existing cat", category.id);
        transactions = transactions.filter((transaction:Transaction) => transaction.categoryId == category.id);
        console.log("Filtered Transaction: ", transactions);
        if (transactions.length > 0){
            setDisplayTransactionState(transactions);
        } 
    }, [transactionList])
    
    return (
        <Container>
            <Header>
                <Body>
                    <Title>{category.categoryType == 0 ? "Income" : "Expense"} - {category.categoryName}</Title>
                </Body>
            </Header>
                <Content>
                    <TransactionList transactions={displayTransactionState}></TransactionList>
                </Content>
                <View style={{ flex: 1 }}>
                    <Fab
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => navigation.navigate("InputTransaction", {})}>
                        <Icon name="plus" />
                    </Fab>
                </View>
        </Container>
    )
 }
 
 export default DetailScreen;
 