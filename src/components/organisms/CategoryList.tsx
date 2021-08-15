import React, {FunctionComponent} from 'react'
import {List, Center, VStack, HStack, Text, Button, Heading, useToken, Box} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CategoryLine} from '_molecules'
import {Category} from '_models'

export interface Props{
    categories: Category[];
    listHeader: string;
    onCategoryClick: (category: Category) => void;
    onCategoryEdit: (category: Category) => void;
}

const CategoryList: FunctionComponent<Props> = ({categories, listHeader, onCategoryClick, onCategoryEdit}: Props) => {
    const categoryList: JSX.Element[] | JSX.Element = categories.length > 0 ? categories.map((item: Category) => {
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

