/**
 * 
 */

import React, {FunctionComponent} from 'react'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import {Category} from '_models'

export interface Props{
    category: Category;
    onSubmitClick: (category: Category) => void;
}

const CategoryInputForm: FunctionComponent<Props>

