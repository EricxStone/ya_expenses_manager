import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';

export default function useGoogleSignIn(): {
    onGoogleSignInPressed: () => void
    onGoogleSignOutPressed: () => void
    userState: FirebaseAuthTypes.User | undefined
    isSigninInProgress: boolean
} {
    const [userState, setUserState] = useState<FirebaseAuthTypes.User | undefined>();
    const [isSigninInProgress, setSigninInProgress] = useState(false);
    
    GoogleSignin.configure({
        webClientId: '734042630184-mnho5fbn1n6u4m3q7vf8nu5b8nvc7muq.apps.googleusercontent.com',
    });

    const onGoogleSignInPressed = async () => {
        setSigninInProgress(true);
        try {
            await GoogleSignin.hasPlayServices();
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            
            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch(error: any){
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            } else {
            // some other error happened
            }
        } finally {
            setSigninInProgress(false);
        }
    }

    const onGoogleSignOutPressed = async() => {
        try {
            await GoogleSignin.signOut();
            return auth().signOut();
        } catch(error: any){
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            } else {
            // some other error happened
            }
        } 
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(userState => {
            console.log("useGoogleSignIn.ts - ", userState);
            setUserState(userState!)
        });
        return subscriber;
    }, [])

    return {
        onGoogleSignInPressed,
        onGoogleSignOutPressed,
        userState,
        isSigninInProgress
    }
}
