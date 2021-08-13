/**
 * 
 */

 import React from 'react';
 import {Category} from '_models'
import {CategoryInputForm} from '_organisms'
 import {
     Container,
     Header,
     Title, 
     Content,
     Body,
     Text,
     Fab,
     View,
     Grid,
     Row,
 } from 'native-base'
 import Icon from 'react-native-vector-icons/FontAwesome5';
 import { useDispatch, useSelector } from 'react-redux';
 import {RootState} from '../../store/store';
 import { RouteProp, NavigationProp } from '@react-navigation/native';
 import {StackNavigationProp} from '@react-navigation/stack'
 import {RootStackParamList} from '../../index'

 type InputCategoryScreenRouteProp = RouteProp<
    RootStackParamList,
    'InputCategory'
>;

type InputCategoryScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'InputCategory'
>;

export interface Props{
    route: InputCategoryScreenRouteProp;
    navigation: InputCategoryScreenNavigationProp;
}

enum CategoryType{
    Income,
    Expense
}

 const InputCategoryScreen = ({route, navigation}: Props) => {

    const newCategory = route.params.category === undefined ? new Category("wallet", "", CategoryType.Expense) : route.params.category;
    const [categoryState, setCategoryState] = React.useState(newCategory)
    const dispatch = useDispatch()

    const onInputSubmit = () => {
        navigation.goBack();
    }

    const onInputChange = (category: Category) => {
        console.log("Input changed", category);
        setCategoryState(category);
        setCategoryState((categoryState) => {
            console.log("Updated State:", categoryState);
            return categoryState;
        });
    }

    React.useEffect(() => {
        return () => {
            console.log("Category param", route.params.category);
            console.log("Category state", categoryState);
            if (route.params.category === undefined && categoryState !== undefined){
                console.log("Add", categoryState);
                dispatch({type: 'ADD_CATEGORY', payload: categoryState})
            } else if (route.params.category !== undefined && categoryState !== undefined) {
                console.log("Edit", categoryState);
                dispatch({type: 'EDIT_CATEGORY', payload: categoryState})
            }
        }
    }, [])
    
    return (
        <Container>
            <Header>
                <Body>
                    <Title>Add a Category</Title>
                </Body>
            </Header>
            <Grid>
                <Row style={{height: "100%"}}>
                    <Content>
                        <CategoryInputForm onInputChange={onInputChange} category={newCategory}></CategoryInputForm>
                    </Content>
                </Row>
                <Row>
                    <View style={{ flex: 1 }}>
                        <Fab
                            direction="up"
                            containerStyle={{ }}
                            style={{ backgroundColor: '#5067FF' }}
                            position="bottomRight"
                            onPress={onInputSubmit}>
                            <Icon name="check" />
                        </Fab>
                    </View>
                </Row>
            </Grid>
        </Container>
    )
 }

 export default InputCategoryScreen;

