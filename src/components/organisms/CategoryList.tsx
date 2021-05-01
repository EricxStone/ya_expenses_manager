import React, {FunctionComponent} from 'react'
import {List, ListItem, Left, Right, Text} from 'native-base'
import {CategoryLine} from '_molecules'
import {Category} from '_models'

export interface Props{
    categories: Category[],
    listHeader: string,
}

const CategoryList: FunctionComponent<Props> = ({categories, listHeader}: Props) => {
    const CategoryList: JSX.Element[] = categories.map((item: Category) => 
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

export default CategoryList

