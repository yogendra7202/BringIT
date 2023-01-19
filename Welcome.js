import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { AuthContext } from './Authentication/AuthProvider';
import AppStack from './Application/AppStack';
import AuthStack from './Authentication/AuthStack';
import { Provider } from 'react-redux';
import store from './Application/Redux/Store';
import { Alert, BackHandler } from 'react-native';

const Welcome = () => {
    const { user, setUser } = useContext(AuthContext);

    // to check intializing the connection with firebase.
    const [initializing, setInitializing] = useState(true);

    // To set the user
    function onAuthStateChanged(user) {
        // console.log(user);
        setUser(user);
        if (initializing) setInitializing(false);
    }
    const handleBackButton = () => {
        Alert.alert(
            null,
            'Do you want to close.', [{
                text: 'Yes',
                onPress: () => BackHandler.exitApp()
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },], {
            cancelable: false
        }
        )
        return true;
    }

    // componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // }


    // While this component is mounting...
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {
                user ?
                    <Provider store={store}>
                        <AppStack />
                    </Provider>
                    : <AuthStack />
            }
        </NavigationContainer>
    );
}

export default Welcome