/**
 * 
 */

 import React from 'react';
 import {Category} from '_models'
import {CategoryInputForm} from '_organisms'
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
 import {StackNavigationProp} from '@react-navigation/stack'
 import {RootStackParamList} from '../../index'

 type InputCategoryScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'InputCategory'
>;

export interface Props{
    navigation: InputCategoryScreenNavigationProp;
}

 const InputCategoryScreen = ({navigation}: Props) => {

    const onInputSubmit = () => {

    }

    return (
        <Container>
            <Header>
                <Body>
                    <Title>Add a Category</Title>
                </Body>
            </Header>
                <Content>
                    <CategoryInputForm onSubmitClick={onInputSubmit}></CategoryInputForm>
                </Content>
        </Container>
    )
 }

 export default InputCategoryScreen;

