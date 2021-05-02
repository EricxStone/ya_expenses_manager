import React, {FunctionComponent} from 'react'
import {List, ListItem, Left, Right, Text} from 'native-base'
import {CategoryLine} from '_molecules'
import {Category} from '_models'

export interface Props{
    categories: Category[];
    listHeader: string;
    onCategoryClick: (categoryId: string, categoryName: string) => void;
}

const CategoryList: FunctionComponent<Props> = ({categories, listHeader, onCategoryClick}: Props) => {
    const categoryList: JSX.Element[] = categories.map((item: Category) => {
        const onItemClick = () => {
            onCategoryClick(item.id, item.categoryName);
        }
        return <CategoryLine key={item.id} icon={item.icon} categoryName={item.categoryName} categoryType={item.categoryType} spending={item.spending} budget={item.budget} remaining={item.remaining} onclick={onItemClick}></CategoryLine>
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

