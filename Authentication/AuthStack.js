import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login';
import SignUp from './SignUp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
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