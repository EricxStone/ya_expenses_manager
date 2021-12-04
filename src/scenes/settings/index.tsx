import React, { useState } from 'react';
import {
    VStack, HStack, Text, Center, Box, StatusBar,
    Fab, useToken, Icon, ScrollView, Pressable
} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {RootDrawerParamList, RootStackParamList} from '../../index'
import { SettingList } from 'components/organisms';
import {Alert} from 'react-native'

type SettingsScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<
        RootStackParamList,
        'Settings'
    >,
    DrawerNavigationProp<RootDrawerParamList>
>

export interface Props{
    navigation: SettingsScreenNavigationProp;
}

const SettingsScreen = ({navigation}: Props) => {

    const onMenuPressed = () => {
        navigation.toggleDrawer();
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop backgroundColor="white" />
            <Box width="100%">
                <HStack bg='gray.100' px={2} py={3} justifyContent='space-between' alignItems='center' bgColor='white'>
                    <HStack width="28%"px={2}>
                        <Pressable onPress={onMenuPressed} bgColor="white">
                            <Center>
                                <Icon as={<FontAwesome name="bars" />} size="sm" />
                            </Center>
                        </Pressable>
                    </HStack>
                    <HStack space={4} px={3} alignItems='center' width="65%">
                        <Text color="blue.800" fontSize="xl" fontWeight='bold'>Settings</Text>
                    </HStack>
                </HStack>
            </Box>
            <ScrollView
                _contentContainerStyle={{
                    bg: "white",
                    w: "100%",
                }}
                height="80%"
                bg="white"
                >
                <Center pr={5} pl={5} w="100%" bg='white'>
                    <SettingList />
                </Center>
            </ScrollView>
        </>
    )
}

export default SettingsScreen;

