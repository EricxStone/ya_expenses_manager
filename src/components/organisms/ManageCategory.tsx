import React, {FunctionComponent} from 'react'
import {List, Center, VStack, HStack, Text, Button, Heading, useToken, Box, Pressable} from 'native-base'
import {CategoryLine} from 'components/molecules'
import {Category, Transaction} from 'models'

export interface Props{
    categories: Category[];
    onCategoryEdit: (category: Category) => void;
}

const ManageCategory: FunctionComponent<Props> = ({categories, onCategoryEdit}: Props) => {

    const categoryList: JSX.Element[] | JSX.Element = categories.length > 0 ? categories.map((item: Category) => {
        return (
            <Pressable onLongPress={()=>onCategoryEdit(item)} w="100%" py={2} key={item.id} borderBottomWidth={1} borderBottomColor="gray.400">
                <VStack py={1}>
                    <Box w="100%">
                        <Text fontSize="xl">{item.categoryName} - <Text fontSize="lg" color="gray.500">{(item.categoryType == 0) ? "Income" : "Expense"}</Text></Text>
                    </Box>
                </VStack>
            </Pressable>
        );
    }) : <Center flex={1} py={2} h="20%"><Text fontSize="md" bold={true} color="gray.500">There are no categories. Press + to add one.</Text></Center>
    return(
        <>
            {categoryList}
        </>
    )
}

export default ManageCategory

