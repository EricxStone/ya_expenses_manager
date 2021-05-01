import React, {Component} from 'react'

import {FlatList} from 'react-native'
import {List, ListItem, Left, Right, Text} from 'native-base'
import {CategoryLine} from '_molecules'
import {Category} from '_models'

export interface Props{
    Categories: Category[],
    listHeader: string,
}

class CategoryList extends Component<Props>{
    render(){
        const {Categories, listHeader} = this.props
        const CategoryList: JSX.Element[] = Categories.map((item: Category) => 
            <CategoryLine key={item.id} icon={item.icon} categoryName={item.categoryName} categoryType={item.categoryType} spending={item.spending} budget={item.budget} remaining={item.remaining}></CategoryLine>
        )
        return(
            <React.Fragment>
                <List>
                    <ListItem itemHeader first>
                        <Left>
                            <Text>{listHeader}</Text>
                        </Left>
                    </ListItem>
                    {CategoryList}
                </List>
            </React.Fragment>
        )
    }
}

export default CategoryList

