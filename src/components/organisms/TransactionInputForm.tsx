/**
 * TransactionInputForm.tsx
 * The organisms for trasnaction input form
 */

 import React, {FunctionComponent} from 'react'
 import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Text, Button } from 'native-base';
 import {Transaction, Category} from '_models'
 import DateTimePickerModal from "react-native-modal-datetime-picker";
 import { useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 import {DateTime} from "luxon";
 
 interface Props{
     transaction: Transaction;
     onInputChange: (transaction: Transaction) => void;
 }
 
 const TransactionInputForm: FunctionComponent<Props> = ({transaction, onInputChange}) => {
 
     const [transactionState, setTransactionState] = React.useState(transaction);
     const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
     
     React.useEffect(() => {
         if (transaction !== undefined) setTransactionState(transaction)
     }, [])
 
     const onCategorySelected = (e: any) => {
        transactionState.categoryId = e;
        updateTransaction(transactionState);
     }

     const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
 
      const handleConfirm = (date: Date) => {
        console.log("A date has been picked: ", date);
        transaction.transactionDate = DateTime.fromJSDate(date).toMillis();
        hideDatePicker();
        updateTransaction(transactionState);
      };

     const onItemInput = (e: any) => {
         transactionState.item = e.nativeEvent.text;
         updateTransaction(transactionState);
     }

     const onSourceInput = (e: any) => {
        transactionState.source = e.nativeEvent.text;
        updateTransaction(transactionState);
    }
 
     const onAmountInput = (e: any) => {
         console.log(e.nativeEvent.text);
         const inputAmount = isNaN(parseFloat(e.nativeEvent.text)) ? 0 : parseFloat(e.nativeEvent.text);
         transactionState.amount = inputAmount;
         updateTransaction(transactionState);
     }
 
     const updateTransaction = (transaction: Transaction) => {
         if (transaction.categoryId == "") transaction.categoryId = categories[0].id;
         setTransactionState(transaction);
         onInputChange(transaction);
     }

     const categories = useSelector((state: RootState) => state.categories.categoryList);
     const categoryList: JSX.Element[] = categories.map((item: Category, index: number) => {
        return <Picker.Item label={item.categoryName} value={item.id} key={item.id} />
    })
 
     // if (category !== undefined) setTransactionState(category)
     return(
         <React.Fragment>
             <Form>
                <Item stackedLabel>
                     <Label>Type</Label>
                     <Picker
                         mode="dropdown"
                         iosIcon={<Icon name="chevron-down" />}
                         style={{ height: 50, width: "90%" }}
                         placeholder="Type"
                         placeholderStyle={{ height: 50, color: "#bfc6ea" }}
                         placeholderIconColor="#007aff"
                         selectedValue={transactionState.categoryId.toString()}
                         onValueChange={onCategorySelected}
                     >
                         {categoryList}
                     </Picker>
                </Item>
                <Item stackedLabel>
                     <Label>Date</Label>
                     <Button transparent light onPress={showDatePicker}>
                        <Text>{DateTime.fromMillis(transactionState.transactionDate).setLocale('hk').toFormat("yyyy-MM-dd")}</Text>
                     </Button>
                     <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        date={DateTime.fromMillis(transactionState.transactionDate).toJSDate()}
                    />
                </Item>
                <Item stackedLabel>
                    <Label>Item</Label>
                    <Input onEndEditing={onItemInput} defaultValue={transactionState.item} />
                </Item>
                <Item stackedLabel>
                    <Label>Notes</Label>
                    <Input onEndEditing={onSourceInput} defaultValue={transactionState.source} />
                </Item>
                <Item stackedLabel>
                     <Label>Amount</Label>
                     <Input keyboardType="number-pad" clearButtonMode="while-editing" defaultValue={transactionState.amount.toString()} onEndEditing={onAmountInput}  />
                </Item>
                
                 
           </Form>
         </React.Fragment>
     )
 }
 
 export default TransactionInputForm
 