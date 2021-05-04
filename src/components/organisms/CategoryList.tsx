import React, {FunctionComponent} from 'react'
import {List, ListItem, Left, Right, Text} from 'native-base'
import {CategoryLine} from '_molecules'
import {Category} from '_models'

export interface Props{
    categories: Category[];
    listHeader: string;
    onCategoryClick: (category: Category) => void;
}

const CategoryList: FunctionComponent<Props> = ({categories, listHeader, onCategoryClick}: Props) => {
    const categoryList: JSX.Element[] = categories.map((item: Category) => {
        return <CategoryLine key={item.id} category={item} onCategoryClick={onCategoryClick}></CategoryLine>
    })
    return(
        <React.Fragment>
            <List>
                <ListItem itemHeader first>
                    <Left>
                        <Text>{listHeader}</Text>
                    </Left>
                </ListItem>
                {categoryList}
            </List>
        </React.Fragment>
    )
}

export default CategoryList

