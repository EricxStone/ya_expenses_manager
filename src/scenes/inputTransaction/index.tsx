/**
 * 
 */

 import React from 'react';
 import {Transaction} from '_models'
import {TransactionInputForm} from '_organisms'
 import {
     Container,
     Header,
     Title, 
     Content,
     Body,
     Text,
     Fab,
     View,
     Grid,
     Row
 } from 'native-base'
 import Icon from 'react-native-vector-icons/FontAwesome5';
 import { useDispatch, useSelector } from 'react-redux';
 import { RouteProp, NavigationProp } from '@react-navigation/native';
 import {StackNavigationProp} from '@react-navigation/stack'
 import {RootStackParamList} from '../../index'

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

enum CategoryType{
    Income,
    Expense
}

 const InputTransactionScreen = ({route, navigation}: Props) => {

    const newTransaction = route.params.transaction === undefined ? new Transaction("", 0, "", 0, "") : route.params.transaction;
    const [transactionState, setTransactionState] = React.useState(newTransaction)
    const dispatch = useDispatch()

    const onInputSubmit = () => {
        navigation.goBack();
    }

    const onInputChange = (transaction: Transaction) => {
        console.log("Input changed", transaction);
        setTransactionState(transaction);
        setTransactionState((transactionState) => {
            console.log("Updated State:", transactionState);
            return transactionState;
        });
    }

    React.useEffect(() => {
        return () => {
            console.log("Category param", route.params.transaction);
            console.log("Category state", transactionState);
            if (route.params.transaction === undefined && transactionState !== undefined){
                console.log("Add", transactionState);
                dispatch({type: 'ADD_TRANSACTION', payload: transactionState})
            } else if (route.params.transaction !== undefined && transactionState !== undefined) {
                console.log("Edit", transactionState);
                dispatch({type: 'EDIT_TRANSACTION', payload: transactionState});
            }
        }
    }, [])
    
    return (
        <Container>
            <Header>
                <Body>
                    <Title>Add a Transaction</Title>
                </Body>
            </Header>
            <Grid>
                <Row style={{ height: "100%"}}>
                    <Content >
                        <TransactionInputForm onInputChange={onInputChange} transaction={newTransaction} ></TransactionInputForm>
                    </Content>
                </Row>
                <Row>
                    <View style={{ flex: 1 }}>
                        <Fab
                            direction="up"
                            containerStyle={{ }}
                            style={{ backgroundColor: '#5067FF' }}
                            position="bottomRight"
                            onPress={onInputSubmit}>
                            <Icon name="check" />
                        </Fab>
                    </View>
                </Row>
            </Grid>
        </Container>
    )
 }

 export default InputTransactionScreen;

