/**
 * 
 */

import React, {FunctionComponent} from 'react'
import { Box, Select, FormControl, Input, Icon, Text, Fab, CheckIcon, VStack } from 'native-base';
import {Category} from '_models'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Keyboard} from "react-native";

interface Props{
    category: Category;
    onInputSubmit: (category: Category) => void;
    isEditMode: boolean;
}

enum CategoryType{
    Income,
    Expense
}

const CategoryInputForm: FunctionComponent<Props> = ({category, onInputSubmit, isEditMode}) => {

    const [categoryState, setCategoryState] = React.useState(category);
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    const [fabIcon, setFabIcon] = React.useState("check");
    const isCategoryTypeReadOnly = isEditMode;
    const [isNameInvalid, setNameInputInvalid] = React.useState(false);
    const [isTypeInvalid, setTypeSelectInvalid] = React.useState(false);
    const [isAmountInvalid, setAmountInputInvalid] = React.useState(false);
    
    React.useEffect(() => {
        if (category !== undefined) setCategoryState(category)

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
              setKeyboardVisible(true); // or some other action
              setFabIcon("chevron-down")
            }
         );
         const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
              setKeyboardVisible(false); // or some other action
              setFabIcon("check")
            }
         );

         return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
          };
    }, [])

    const onTypeSelected = (e: any) => {
        setTypeSelectInvalid(false);
        categoryState.categoryType = e == 1 ? CategoryType.Expense : CategoryType.Income;
        updateCategory(categoryState);
    }

    const onNameInput = (e: any) => {
        if (e.nativeEvent.text == ""){
            setNameInputInvalid(true);
        } else{
            setNameInputInvalid(false);
        }
        categoryState.categoryName = e.nativeEvent.text;
        updateCategory(categoryState);
    }

    const onBudgetInput = (e: any) => {
        console.log(e.nativeEvent.text);
        if (isNaN(parseFloat(e.nativeEvent.text)) || parseFloat(e.nativeEvent.text) < 0){
            setAmountInputInvalid(true);
            categoryState.budget = -1;
        } else{
            setAmountInputInvalid(false);
            categoryState.budget = parseFloat(e.nativeEvent.text)
        }
        updateCategory(categoryState);
    }

    const updateCategory = (category: Category) => {
        setCategoryState({
            categoryName: category.categoryName,
            categoryType: category.categoryType,
            id: category.id,
            icon: category.icon,
            spending: category.spending,
            remaining: category.remaining,
            budget: category.budget
        });
    }

    const onSubmitPressed = () => {
        if(!isKeyboardVisible) validateForm();
        else Keyboard.dismiss();
    }

    //  Form validation 
    const validateForm = () => {
        let isFormValid = (
            categoryState.categoryName === "" ||
            categoryState.categoryType === undefined ||
            isNaN(categoryState.budget) || 
            categoryState.budget < 0
        ) ? false : true;

        setNameInputInvalid((categoryState.categoryName === ""))
        setTypeSelectInvalid((categoryState.categoryType === undefined))
        setAmountInputInvalid((isNaN(categoryState.budget)) || categoryState.budget < 0)
        
        if (isFormValid)
            onInputSubmit(categoryState);
    }

    return(
        <>
            <VStack space={4} w="100%">
                <FormControl isRequired isInvalid={isNameInvalid}>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input
                        my={2}
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        defaultValue={categoryState.categoryName}
                        onEndEditing={onNameInput}
                        fontSize="lg"
                    />
                    <FormControl.ErrorMessage>Name is required</FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isDisabled={isCategoryTypeReadOnly} isInvalid={isTypeInvalid}>
                    <FormControl.Label>Type</FormControl.Label>
                    <Select
                        selectedValue={categoryState.categoryType.toString()}
                        minWidth={200}
                        onValueChange={onTypeSelected}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />,
                        }}
                        mt={1}
                    >
                        <Select.Item label="Expenses" value="1" />
                        <Select.Item label="Income" value="0" />
                    </Select>
                    <FormControl.HelperText>You cannot change category type on edit</FormControl.HelperText>
                    <FormControl.ErrorMessage>Type is required</FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={isAmountInvalid}>
                    <FormControl.Label>{categoryState.categoryType == CategoryType.Expense ? "Monthly Budget" : "Monthly Target Income"}</FormControl.Label>
                    <Input
                        InputLeftElement={
                            <Text pl={5} fontSize="lg" color="gray.500">$</Text>
                        }
                        keyboardType="number-pad" clearButtonMode="while-editing"
                        my={2}
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        defaultValue={categoryState.budget.toString()}
                        onEndEditing={onBudgetInput}
                        fontSize="xl"
                    />
                    <FormControl.ErrorMessage>Budget must be greater than or equal than 0</FormControl.ErrorMessage>
                </FormControl>
            </VStack>
            <Box position="relative" h={100} w="100%" bg="white">
                <Fab
                    position="absolute"
                    size="xs"
                    icon={<Icon color="lightText" as={<FontAwesome name={fabIcon} />} size="xs" />}
                    onPress={onSubmitPressed}
                    backgroundColor="blue.800"
                />
            </Box>
        </>
    )
}

export default CategoryInputForm
