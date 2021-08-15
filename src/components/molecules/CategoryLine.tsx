import React, {FunctionComponent} from 'react'

import {VStack, HStack, Text, Pressable, Icon, Box, Center, Heading} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Category} from '_models'
import { Alert } from "react-native"

enum CategoryType{
    Income,
    Expense
};

export interface Props{
    // catId: string;
    // icon: string;
    // categoryName: string;
    // categoryType: CategoryType
    // spending: number;
    // budget: number;
    // remaining: number;
    category: Category;
    onCategoryClick: (category: Category) => void;
    onCategoryEdit: (category: Category) => void;
}

const CategoryLine: FunctionComponent<Props> = ({category, onCategoryClick, onCategoryEdit}: Props) => {
    return ( // ()=>onCategoryClick(category)
        <Pressable onPress={() => Alert.alert("hello")} w="100%">
            <Box w="100%" h={105} borderColor="blue.600" borderWidth={1} rounded="md" _text={{color: "white",}} p={2}>
                <HStack w="100%" h="100%">
                    <Center h="100%" w="13%" alignContent="center" p={2}>
                        <Icon color="darkText" as={<FontAwesome name={category.icon} />} size="sm" w="100%" />
                    </Center>
                    <VStack w="87%"  h="100%" size="3">
                        <Box p={1} w="100%">
                            <Heading size="md" bold={true}>{category.categoryName}</Heading>
                        </Box>
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
                        <HStack space={3}>
                            <Center w="30%" pb={1}>
                                <Text>{category.spending}</Text>
                            </Center>
                            <Center w="30%" pb={1}>
                                <Text>{category.budget}</Text>
                            </Center>
                            <Center w="30%" pb={1}>
                                <Text>{category.remaining}</Text>
                            </Center>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
        /* <ListItem button onPress={()=>onCategoryClick(category)} onLongPress={()=>onCategoryEdit(category)}>
            <Grid>
                <Col size={1}>
                    <Body>
                        
                    </Body>
                </Col>
                <Col size={4}>
                    <Row>
                        <Left>
                            
                        </Left>
                        <Right>
                            <Text>{category.categoryType == CategoryType.Income? "Income" : "Expense"}</Text>
                        </Right>
                    </Row>
                    <Row>
                        <Grid>
                            <Col>
                                <Row>
                                    
                                </Row>
                                <Row>
                                    <Text>{category.spending}</Text>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Text>Budget</Text>
                                </Row>
                                <Row>
                                    <Text>{category.budget}</Text>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Text>Remain</Text>
                                </Row>
                                <Row>
                                    <Text>{category.remaining}</Text>
                                </Row>
                            </Col>
                        </Grid>
                    </Row>
                </Col>
            </Grid>
        </ListItem> */
    )
}

export default CategoryLine
