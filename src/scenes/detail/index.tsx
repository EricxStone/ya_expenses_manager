/**
 * 
 * 
 * @format
 */

 import React from 'react';
 import {Transaction} from '_models'
 import {} from '_organisms'
 import {
     Container,
     Header,
     Title, 
     Content,
     Body,
 } from 'native-base'
 import { useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 
 const DetailScreen = () => {
     //let foodCategory: Category = new Category("nutrition", "Food", CategoryType.Expense)
     //let transportCategory: Category = new Category("train", "Transportation", CategoryType.Expense)
     //let salaryCategory: Category = new Category("person", "Salary", CategoryType.Income)
     const {categoryList} = useSelector((state: RootState) => state.categories);
     const categories = [...categoryList];
     return (
         <Container>
             <Header>
                 <Body>
                     <Title>Expense Manager</Title>
                 </Body>
             </Header>
                 <Content>
                     
                 </Content>
         </Container>
     )
 }
 
 export default DetailScreen;
 