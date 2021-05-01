import React from 'react';

import {
    Container,
    Header,
    Title, 
    Content,
    Body,
} from 'native-base'
import {CategoryList} from '_organisms'
import {Category} from '_models'
import { exp } from 'react-native-reanimated';

export interface Props{
    categories: Category[],
}

class HomeScreenView extends React.Component <Props> {
    render(){
        return (
            <React.Fragment>
                <Container>
                    <Header>
                        <Body>
                            <Title>Expense Manager</Title>
                        </Body>
                    </Header>
                        <Content>
                            <CategoryList Categories={this.props.categories} listHeader="Total Income"></CategoryList>
                            <CategoryList Categories={this.props.categories} listHeader="Total Expenses"></CategoryList>
                        </Content>
                </Container>
            </React.Fragment>
        )
    }
}

export default HomeScreenView;