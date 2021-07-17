/**
 * 
 * 
 * @format
 */

 import React from 'react';
 import {Transaction} from '_models'
 import {Category} from '_models'
 import {TransactionList} from '_organisms'
 import {
     Container,
     Header,
     Title, 
     Content,
     Body,
     Text,
 } from 'native-base'
 import { useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 import { RouteProp } from '@react-navigation/native';
 import {RootStackParamList} from '../../index'

type DetailScreenRouteProp = RouteProp<
    RootStackParamList,
    'Detail'
>;

export interface Props{
    route: DetailScreenRouteProp
}

enum CategoryType{
    Income,
    Expense
}
 
 const DetailScreen = ({route}: Props) => {
    const category = route.params.category;
    const {transactionList} = useSelector((state: RootState) => state.transactions);
    let transactions: Transaction[] = [...transactionList];
    transactions = transactions.filter((transaction:Transaction) => transaction.categoryId == category.id);
    let transactionListComp: JSX.Element;
    if (transactions.length > 0){
        transactionListComp = <TransactionList transactions={transactions}></TransactionList>
    } else{
        transactionListComp = <Text>No Transactions</Text>
    }
    return (
        <Container>
            <Header>
                <Body>
                    <Title>{category.categoryType == 0 ? "Income" : "Expense"} - {category.categoryName}</Title>
                </Body>
            </Header>
                <Content>
                    {transactionListComp}
                </Content>
        </Container>
    )
 }
 
 export default DetailScreen;
 