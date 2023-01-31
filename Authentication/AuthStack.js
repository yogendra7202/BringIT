import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login';
import SignUp from './SignUp';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push'
      }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

export default AuthStack