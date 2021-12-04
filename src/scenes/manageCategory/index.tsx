import React from 'react';
import {Category} from 'models'
import {ManageCateogry} from 'components/organisms'
import {
    VStack, HStack, Text, Center, Box, StatusBar,
    Fab, useToken, Icon, ScrollView, Pressable
} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {RootDrawerParamList, RootStackParamList} from '../../index'
import {Alert} from 'react-native'

type ManageCategoryScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<
        RootStackParamList,
        'ManageCategory'
    >,
    DrawerNavigationProp<RootDrawerParamList>
>

export interface Props{
    navigation: ManageCategoryScreenNavigationProp;
}

enum CategoryType{
    Income,
    Expense
}

const ManageCategoryScreen = ({navigation}: Props) => {

    const categoryList = useSelector((state: RootState) => state.categories.categoryList);
    let displayCategories: Category[] = [];
    const [displayCategoryState, setDisplayCategoryState] = React.useState(displayCategories);

    React.useEffect(() => {
        let categories: Category[] = [...categoryList];
        categories = categories.sort(function(a,b){
            if (a.categoryType == b.categoryType) {
                return (a.categoryName.localeCompare(b.categoryName))
            }
            else if (a.categoryType == CategoryType.Income) return -1;
            else return 1;
        })
        if (categories.length > 0){
            setDisplayCategoryState(categories);
        }

        return () => {
            setDisplayCategoryState([])
        }
    }, [categoryList])

    const onCategoryEditPressed = (category: Category) => {
        Alert.alert(
            "Edit Category - " + category.categoryName + "?",
            "",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Edit", onPress: () => navigation.navigate("InputCategory", {category}) }
            ]
        );
    }

    const onMenuPressed = () => {
        navigation.toggleDrawer();
    }

    const onAddCategoryPressed = () => {
        navigation.navigate("InputCategory", {})
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop backgroundColor="white" />
            <Box width="100%">
                <HStack bg='gray.100' px={2} py={3} justifyContent='space-between' alignItems='center' bgColor='white'>
                    <HStack width="28%"px={2}>
                        <Pressable onPress={onMenuPressed} bgColor="white">
                            <Center>
                                <Icon as={<FontAwesome name="bars" />} size="sm" />
                            </Center>
                        </Pressable>
                    </HStack>
                    <HStack space={4} px={3} alignItems='center' width="65%">
                        <Text color="blue.800" fontSize="xl" fontWeight='bold'>Manage Category</Text>
                    </HStack>
                    <HStack width="28%"px={2}>
                        <Pressable onPress={onAddCategoryPressed} bgColor="white">
                            <Center>
                                <Icon as={<FontAwesome name="plus" />} size="sm" />
                            </Center>
                        </Pressable>
                    </HStack>
                </HStack>
            </Box>
            <ScrollView
                _contentContainerStyle={{
                    bg: "white",
                    w: "100%",
                }}
                height="80%"
                bg="white"
                >
                <Center pr={5} pl={5} w="100%" bg='white'>
                    <ManageCateogry categories={displayCategoryState} onCategoryEdit={onCategoryEditPressed}></ManageCateogry>
                </Center>
            </ScrollView>
        </>
    )
}

export default ManageCategoryScreen;

