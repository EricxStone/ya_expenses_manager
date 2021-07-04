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
     View
 } from 'native-base'
 import {ScrollView} from 'react-native'
 import Icon from 'react-native-vector-icons/FontAwesome5';
 import { useDispatch } from 'react-redux';
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

 const InputCategoryScreen = ({route, navigation}: Props) => {

    const [categoryState, setCategoryState] = React.useState(route.params.category)
    const dispatch = useDispatch()

    const onInputSubmit = () => {
        navigation.goBack();
    }

    const onInputChange = (category: Category) => {
        console.log("Input changed", category);
        setCategoryState(category)
    }

    React.useEffect(() => {
        return () => {
            console.log("Category param", route.params.category);
            if (route.params.category === undefined){
                console.log("Add", categoryState);
                dispatch({type: 'ADD_CATEGORY', payload: categoryState})
            } else {
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
                <Content>
                    <CategoryInputForm onInputChange={onInputChange} category={route.params.category}></CategoryInputForm>
                </Content>
                <ScrollView contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'
                >
                    <Fab
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={onInputSubmit}>
                        <Icon name="check" />
                    </Fab>
                </ScrollView>
        </Container>
    )
 }

 export default InputCategoryScreen;

