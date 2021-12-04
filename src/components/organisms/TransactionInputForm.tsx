/**
 * TransactionInputForm.tsx
 * The organisms for trasnaction input form
 */

 import React, {FunctionComponent} from 'react'
 import { Box, Select, FormControl, Input, Icon, Text, Fab, CheckIcon, VStack } from 'native-base';
 import {Transaction, Category} from 'models'
 import DateTimePickerModal from "react-native-modal-datetime-picker";
 import { useSelector } from 'react-redux';
 import {RootState} from 'store/store';
 import {DateTime} from "luxon";
import { Pressable, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

 
 interface Props{
     transaction: Transaction;
     onInputSubmit: (transaction: Transaction) => void;
 }
 
 const TransactionInputForm: FunctionComponent<Props> = ({transaction, onInputSubmit}) => {
 
     const [transactionState, setTransactionState] = React.useState(transaction);
     const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
     const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
     const [fabIcon, setFabIcon] = React.useState("check");
     const [isTypeSelectInvalid, setTypeSelectInvalid] = React.useState(false);
     const [isDatePickedInvalid, setDatePickedInvalid] = React.useState(false);
     const [isItemInvalid, setItemInputInvalid] = React.useState(false);
     const [isAmountInvalid, setAmountInputInvalid] = React.useState(false);
    
    //  retrieve categroy list from state
     const categories = useSelector((state: RootState) => state.categories.categoryList);
     const categoryList: JSX.Element[] = categories.map((item: Category) => {
        return <Select.Item label={item.categoryName} value={item.id.toString()} key={item.id}  />
    })
     
     React.useEffect(() => {
         console.log("transaction reload");
         if (transaction !== undefined) setTransactionState(transaction)
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
     
    //  Input event handler
     const onCategorySelected = (e: any) => {
        console.log("original state", transactionState);
        setTypeSelectInvalid(false);
        transactionState.categoryId = e;
        updateTransaction(transactionState);
     }

     const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleDateConfirm = (date: Date) => {
        console.log("A date has been picked: ", date);
        const selectedDate: DateTime = DateTime.fromJSDate(date);
        hideDatePicker();
        setDatePickedInvalid(isInvalidDate(selectedDate.toMillis()));
        transactionState.transactionDate = selectedDate.toMillis();
        updateTransaction(transactionState);
      };

     const onItemInput = (e: any) => {
        if (e.nativeEvent.text == ""){
            setItemInputInvalid(true);
        } else{
            setItemInputInvalid(false);
        }
        transactionState.item = e.nativeEvent.text;
        updateTransaction(transactionState);
     }

     const onSourceInput = (e: any) => {
        transactionState.source = e.nativeEvent.text;
        updateTransaction(transactionState);
    }
 
     const onAmountInput = (e: any) => {
         console.log(e.nativeEvent.text);
         if (isNaN(parseFloat(e.nativeEvent.text)) || parseFloat(e.nativeEvent.text) <= 0){
            setAmountInputInvalid(true);
            transactionState.amount = 0;
         } else{
            setAmountInputInvalid(false);
            transactionState.amount = parseFloat(e.nativeEvent.text);; 
         }
         updateTransaction(transactionState);
     }
 
     const updateTransaction = (transaction: Transaction) => {
         setTransactionState({
             source: transaction.source,
             amount: transaction.amount,
             id: transaction.id,
             categoryId: transaction.categoryId,
             item: transaction.item,
             transactionDate: transaction.transactionDate
         });
     }

     //  Submit button event handler
     const onSubmitPressed = () => {
         if(!isKeyboardVisible) {
            validateForm();
         }
         else Keyboard.dismiss();
     }

    //  Form validation 
    const validateForm = () => {
        let isFormValid = (
            transactionState.categoryId === "" || 
            isInvalidDate(transactionState.transactionDate) ||
            transactionState.item === "" ||
            isNaN(transactionState.amount) || 
            transactionState.amount <= 0 ) ? false : true;
        setTypeSelectInvalid((transactionState.categoryId === ""));
        setDatePickedInvalid(isInvalidDate(transactionState.transactionDate));
        setItemInputInvalid((transactionState.item === ""));
        setAmountInputInvalid((isNaN(transactionState.amount)) || transactionState.amount <= 0);
        
        if (isFormValid)
            onInputSubmit(transactionState);
    }

    // Date validation
    const isInvalidDate = (inputDate: number) => {
        return DateTime.fromMillis(inputDate) > DateTime.now();
    }
 
     return(
         <>
            <VStack space={4} w="100%">
                <FormControl isRequired isInvalid={isTypeSelectInvalid}>
                    <FormControl.Label>Type</FormControl.Label>
                    <Select
                        selectedValue={transactionState.categoryId}
                        minWidth={200}
                        onValueChange={onCategorySelected}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />,
                        }}
                        mt={1}
                    >
                        {categoryList}
                    </Select>
                    <FormControl.ErrorMessage>Type is required</FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={isDatePickedInvalid}>
                    <FormControl.Label>Date</FormControl.Label>
                    <Pressable onPress={showDatePicker}>
                        <Text fontSize="2xl" bold>{DateTime.fromMillis(transactionState.transactionDate).setLocale('hk').toFormat("yyyy-MM-dd")}</Text>
                    </Pressable>
                    <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                            date={DateTime.fromMillis(transactionState.transactionDate).toJSDate()}
                        />
                    <FormControl.HelperText>
                        Press date to edit
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage>Date cannot be future date</FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={isItemInvalid}>
                    <FormControl.Label>Item</FormControl.Label>
                    <Input
                        my={2}
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        defaultValue={transactionState.item}
                        onEndEditing={onItemInput}
                        fontSize="lg"
                    />
                    <FormControl.ErrorMessage>Item is required</FormControl.ErrorMessage>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Notes</FormControl.Label>
                    <Input
                        my={2}
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        defaultValue={transactionState.source}
                        onEndEditing={onSourceInput}
                        fontSize="lg"
                    />
                </FormControl>
                <FormControl isRequired isInvalid={isAmountInvalid}>
                    <FormControl.Label>Amount</FormControl.Label>
                    <Input
                        InputLeftElement={
                            <Text pl={5} fontSize="lg" color="gray.500">$</Text>
                        }
                        my={2}
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                        defaultValue={transactionState.amount.toString()}
                        onEndEditing={onAmountInput}
                        keyboardType="number-pad"
                        clearButtonMode="while-editing"
                        fontSize="xl"
                    />
                    <FormControl.ErrorMessage>Amount must be &gt; 0</FormControl.ErrorMessage>
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
 
 export default TransactionInputForm
 