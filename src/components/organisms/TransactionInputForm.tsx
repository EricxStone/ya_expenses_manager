/**
 * TransactionInputForm.tsx
 * The organisms for trasnaction input form
 */

 import React, {FunctionComponent} from 'react'
 import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Text } from 'native-base';
 import {Transaction, Category} from '_models'
 import DatePicker from 'react-native-date-picker'
 import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';
 
 interface Props{
     transaction: Transaction;
     onInputChange: (transaction: Transaction) => void;
 }
 
 const TransactionInputForm: FunctionComponent<Props> = ({transaction, onInputChange}) => {
 
     const [transactionState, setTransactionState] = React.useState(transaction);
     
     React.useEffect(() => {
         if (transaction !== undefined) setTransactionState(transaction)
     }, [])
 
     const onTypeSelected = (e: any) => {
        //  transactionState.categoryType = e == 1 ? CategoryType.Expense : CategoryType.Income;
        //  updateTransaction(categoryState);
     }
 
     const onDateInput = (e: any) => {
        //  transactionState = e.nativeEvent.text;
        //  updateTransaction(categoryState);
     }

     const onItemInput = (e: any) => {
         
     }
 
     const onAmountInput = (e: any) => {
         console.log(e.nativeEvent.text);
         const inputAmount = isNaN(parseFloat(e.nativeEvent.text)) ? 0 : parseFloat(e.nativeEvent.text);
         transactionState.amount = inputAmount;
         updateTransaction(transactionState);
     }
 
     const updateTransaction = (transaction: Transaction) => {
         setTransactionState(transaction);
         onInputChange(transaction);
     }

     const categories = useSelector((state: RootState) => state.categories.categoryList);

     const categoryList: JSX.Element[] = categories.map((item: Category) => {
        return <Picker.Item label={item.categoryName} value={item.id} />
    })
 
     // if (category !== undefined) setTransactionState(category)
     return(
         <React.Fragment>
             <Form>
                <Item picker >
                     <Label>Type</Label>
                     <Picker
                         mode="dropdown"
                         iosIcon={<Icon name="chevron-down" />}
                         style={{ height: 100 }}
                         placeholder="Type"
                         placeholderStyle={{ height: 50, color: "#bfc6ea" }}
                         placeholderIconColor="#007aff"
                         selectedValue={transactionState.categoryId.toString()}
                         onValueChange={onTypeSelected}
                     >
                         {categoryList}
                     </Picker>
                </Item>
                <Item stackedLabel>
                     <Label>Date</Label>
                     <DatePicker date={new Date(transactionState.transactionDate)} onDateChange={onDateInput} androidVariant='nativeAndroid' mode='date' />
                </Item>
                <Item stackedLabel>
                    <Label>Item</Label>
                    <Input onEndEditing={onNameInput} defaultValue={categoryState.categoryName} />
                </Item>
                <Item stackedLabel>
                     <Label>Amount</Label>
                     <Input keyboardType="number-pad" clearButtonMode="while-editing" defaultValue={transactionState.amount.toString()} onEndEditing={onAmountInput}  />
                </Item>
                
                 
           </Form>
         </React.Fragment>
     )
 }
 
 export default CategoryInputForm
 