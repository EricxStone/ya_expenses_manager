/**
 * 
 */

import React, {FunctionComponent} from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Text } from 'native-base';
import {Category} from '_models'

interface Props{
    category?: Category;
    onSubmitClick: (category: Category) => void;
}

const CategoryInputForm: FunctionComponent<Props> = ({category, onSubmitClick}) => {
    
    const [selectedState, setSelectedState] = React.useState("1");

    const onTypeSelected = (e: React.FormEvent) => {
        console.log(e);
    }

    if (category !== undefined){

    }
    return(
        <React.Fragment>
            <Form>
                <Item stackedLabel>
                    <Label>Name</Label>
                    <Input />
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
                        selectedValue={selectedState}
                        // onValueChange={onTypeSelected}
                    >
                        <Picker.Item label="Expenses" value="1" />
                        <Picker.Item label="Income" value="2" />
                    </Picker>
                </Item>
                <Item stackedLabel>
                    <Label>Test</Label>
                    <Input />
                </Item>
          </Form>
        </React.Fragment>
    )
}

export default CategoryInputForm
