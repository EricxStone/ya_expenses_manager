import React, {FunctionComponent} from 'react'
import {List, Center, VStack, HStack, Text, Button, Heading, useToken, Box} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';
import {CategoryLine} from '_molecules'
import {Category, Transaction} from '_models'
import { DateTime } from 'luxon';

export interface Props{
    categories: Category[];
    listHeader: string;
    onCategoryClick: (category: Category) => void;
    onCategoryEdit: (category: Category) => void;
}

const startOfMonth: number = DateTime.local().startOf("month").toMillis();
const endOfMonth: number = DateTime.local().endOf("month").toMillis();

const CategoryList: FunctionComponent<Props> = ({categories, listHeader, onCategoryClick, onCategoryEdit}: Props) => {
    const transactionList: Transaction[] = useSelector((state: RootState) => state.transactions.transactionList);

    const calculateSpending = (categoryId: string) => {
        let spending: number = 0;
        transactionList.map((item: Transaction) => {
            if (item.categoryId == categoryId && item.transactionDate > startOfMonth && item.transactionDate < endOfMonth)
                spending += item.amount;
        })
        return spending;
    }


    const categoryList: JSX.Element[] | JSX.Element = categories.length > 0 ? categories.map((item: Category) => {
        item.spending = calculateSpending(item.id);
        if (item.budget > 0) item.remaining = item.budget - item.spending;
        return <CategoryLine key={item.id} category={item} onCategoryClick={onCategoryClick} onCategoryEdit={onCategoryEdit}></CategoryLine>
    }) : <Center flex={1}><Text fontSize="lg" bold={true}>-</Text></Center>
    const [darkText] = useToken('colors', [
        'darkText',
    ]);
    return(
        <>
            <Heading fontSize="lg" pb={1} size="md" w="100%" m={1} color={darkText}>{listHeader}</Heading>
            {categoryList}
        </>
    )
}

export default CategoryList

