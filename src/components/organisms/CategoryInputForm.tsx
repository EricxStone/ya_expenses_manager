/**
 * 
 */

import React, {FunctionComponent} from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import {Category} from '_models'

interface Props{
    category?: Category;
    onSubmitClick: (category: Category) => void;
}

const CategoryInputForm: FunctionComponent<Props> = ({category, onSubmitClick}) => {
    const [selectedState, setSelectedState] = React.useState(1);
    if (category === undefined)
    return(
        <React.Fragment>
            <Form>
                <Item floatingLabel>
                    <Label>Name</Label>
                    <Input />
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={selectedState}
                        onValueChange={this.onValueChange2.bind(this)}
                    >
                        <Picker.Item label="Wallet" value="key0" />
                        <Picker.Item label="ATM Card" value="key1" />
                        <Picker.Item label="Debit Card" value="key2" />
                        <Picker.Item label="Credit Card" value="key3" />
                        <Picker.Item label="Net Banking" value="key4" />
                    </Picker>
                </Item>
          </Form>
        </React.Fragment>
    )
}

export default CategoryInputForm
