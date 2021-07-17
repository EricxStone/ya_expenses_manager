/**
 * 
 */

import React, {FunctionComponent} from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Text } from 'native-base';
import {Category} from '_models'

interface Props{
    category: Category;
    onInputChange: (category: Category) => void;
}

enum CategoryType{
    Income,
    Expense
}

const CategoryInputForm: FunctionComponent<Props> = ({category, onInputChange}) => {

    // const newCategory = new Category("wallet", "", CategoryType.Expense)
    const [categoryState, setCategoryState] = React.useState(category);
    
    React.useEffect(() => {
        if (category !== undefined) setCategoryState(category)
    }, [])

    const onTypeSelected = (e: any) => {
        categoryState.categoryType = e == 1 ? CategoryType.Expense : CategoryType.Income;
        updateCategory(categoryState);
    }

    const onNameInput = (e: any) => {
        categoryState.categoryName = e.nativeEvent.text;
        updateCategory(categoryState);
    }

    const onBudgetInput = (e: any) => {
        console.log(e.nativeEvent.text);
        const inputBudget = isNaN(parseFloat(e.nativeEvent.text)) ? 0 : parseFloat(e.nativeEvent.text)
        categoryState.budget = inputBudget
        updateCategory(categoryState);
    }

    const updateCategory = (category: Category) => {
        setCategoryState(category);
        onInputChange(category);
    }

    // if (category !== undefined) setCategoryState(category)
    return(
        <React.Fragment>
            <Form>
                <Item stackedLabel>
                    <Label>Name</Label>
                    <Input onEndEditing={onNameInput} defaultValue={categoryState.categoryName} />
                </Item>
                <Item picker >
                    <Label>Type</Label>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="chevron-down" />}
                        style={{ height: 100 }}
                        placeholder="Type"
                        placeholderStyle={{ height: 50, color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={categoryState.categoryType.toString()}
                        onValueChange={onTypeSelected}
                    >
                        <Picker.Item label="Expenses" value="1" />
                        <Picker.Item label="Income" value="0" />
                    </Picker>
                </Item>
                <Item stackedLabel>
                    <Label>Budget</Label>
                    <Input keyboardType="number-pad" clearButtonMode="while-editing" defaultValue={categoryState.budget.toString()} onEndEditing={onBudgetInput}  />
                </Item>
          </Form>
        </React.Fragment>
    )
}

export default CategoryInputForm
