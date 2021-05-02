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
 } from 'native-base'
 import { useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 import {StackNavigationProp} from '@react-navigation/stack'
 import {RootStackParamList} from '../../index'
import { Transition } from 'react-native-reanimated';

type DetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Detail'
>;

export interface Props{
    navigation: DetailScreenNavigationProp;
    categoryId: string;
    categoryName: string;
}
 
 const DetailScreen = ({navigation, categoryId, categoryName}: Props) => {
    const {transactionList} = useSelector((state: RootState) => state.transactions);
    let transactions = [...transactionList];
    transactions = transactions.filter((transaction:Transaction) => transaction.categoryId == categoryId);
    return (
        <Container>
            <Header>
                <Body>
                    <Title>Expense Manager</Title>
                </Body>
            </Header>
                <Content>
                    <TransactionList transactions={transactions} categoryId={categoryId} categoryName={categoryName}></TransactionList>
                </Content>
        </Container>
    )
 }
 
 export default DetailScreen;
 