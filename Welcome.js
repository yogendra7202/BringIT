import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { AuthContext } from './Authentication/AuthProvider';
import AppStack from './Application/AppStack';
import AuthStack from './Authentication/AuthStack';
import { Provider } from 'react-redux';
import store from './Application/Redux/Store';

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