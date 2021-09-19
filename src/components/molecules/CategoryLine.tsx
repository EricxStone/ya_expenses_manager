import React, {FunctionComponent} from 'react'

import {VStack, HStack, Text, Pressable, Icon, Box, Center, Heading} from 'native-base'
import {Category} from '_models'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export interface Props{
    category: Category;
    onCategoryClick: (category: Category) => void;
    onCategoryEdit: (category: Category) => void;
}

enum CategoryType{
    Income,
    Expense
}

const CategoryLine: FunctionComponent<Props> = ({category, onCategoryClick, onCategoryEdit}: Props) => {
    let categoryProgress = 0;
    if (category.budget == 0 || category.spending == 0) {
        categoryProgress = 0;
    } else{
        categoryProgress = Math.floor(category.spending/category.budget*100);
    }

    let dataDisplay: JSX.Element, titleDisplay: JSX.Element;
    if (category.categoryType == CategoryType.Expense){
        // expense
        titleDisplay = (
            <HStack space={3}>
                <Center pl={3} pr={3} pb={1} w="30%">
                    <Text>Spending</Text>
                </Center>
                <Center pl={3} pr={3} pb={1} w="30%">
                    <Text>Budget</Text>
                </Center>
                <Center pl={3} pr={3} pb={1} w="30%">
                    <Text>Remain</Text>
                </Center>
            </HStack>
        );
        dataDisplay = (
            <HStack space={3}>
                <Center w="30%" pb={1}>
                    <Text>$ {category.spending}</Text>
                </Center>
                <Center w="30%" pb={1}>
                    <Text>$ {category.budget}</Text>
                </Center>
                <Center w="30%" pb={1}>
                    <Text 
                        color={category.remaining < 0 ? "red.500" : "darkText"}
                    >$ {category.remaining}</Text>
                </Center>
            </HStack>
        )
    } else{
        // income
        titleDisplay = (
            <HStack space={3}>
                <Center pl={3} pr={3} pb={1} w="50%">
                    <Text>Balance</Text>
                </Center>
                <Center pl={3} pr={3} pb={1} w="50%">
                    <Text>Target</Text>
                </Center>
            </HStack>
        )
        dataDisplay = (
            <HStack space={3}>
                <Center w="50%" pb={1}>
                    <Text>$ {category.spending}</Text>
                </Center>
                <Center w="50%" pb={1}>
                    <Text>$ {category.budget}</Text>
                </Center>
            </HStack>
        )
    }

    return (
        <Pressable onPress={()=>onCategoryClick(category)} onLongPress={()=>onCategoryEdit(category)} w="100%">
            <Box w="100%" h={105} borderColor="gray.500" borderWidth={1} rounded="md" _text={{color: "white",}} p={2}>
                <HStack w="100%" h="100%">
                    <Center h="100%" w="13%" alignContent="center" p={2}>
                        <AnimatedCircularProgress
                            size={55}
                            width={6}
                            fill={categoryProgress}
                            rotation={0}
                            tintColor="#2563eb"
                            backgroundColor="#d4d4d8">
                            {
                                (fill) => (
                                <Text>
                                    { Math.min(categoryProgress, 100) + "%" }
                                </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                    </Center>
                    <VStack w="87%"  h="100%" size="3">
                        <Box pl={4} pt={1} pb={1} w="100%">
                            <Heading size="md" bold={true}>{category.categoryName}</Heading>
                        </Box>
                        {titleDisplay}
                        {dataDisplay}
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
    )
}

export default CategoryLine
