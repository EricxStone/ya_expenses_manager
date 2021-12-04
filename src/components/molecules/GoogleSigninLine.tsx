import React, { FunctionComponent, useEffect } from 'react'
import {Button, Center, HStack, Image, Text, Box} from 'native-base'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useGoogleSignIn from "hooks/useGoogleSignIn";

const GoogleSigninLine: FunctionComponent = () => {
    const {onGoogleSignInPressed, onGoogleSignOutPressed, userState, isSigninInProgress} = useGoogleSignIn();

    let signInLine: JSX.Element;
    if (userState != null){
        signInLine = (
            <HStack space={4}>
                <Box w="80%">
                    <HStack space={4}>
                        <Center>
                            <Image source={{uri: userState.photoURL!}} alt="Icon" size="xs" borderRadius={10}></Image>
                        </Center>
                        <Center >
                            <Text fontSize="lg">{userState.displayName}</Text>
                        </Center>
                    </HStack>
                </Box>
                <Center>
                    <Button size="sm" bgColor="blue.800" onPress={onGoogleSignOutPressed}>Signout</Button>
                </Center>
            </HStack>
        )
    } else {
        signInLine = (
            <GoogleSigninButton
                style={{ width: 192, height: 60 }}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Light}
                onPress={onGoogleSignInPressed}
                disabled={isSigninInProgress}
            />
        )
    }

    return(
        <>
            <Center m={5}>
                {signInLine}
            </Center>
        </>
    )
}

export default GoogleSigninLine;
