import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login';
import SignUp from './SignUp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [existUser, setExistUser] = useState(true)
  return (
    // <Stack.Navigator initialRouteName='Login'
    //   screenOptions={{
    //     headerShown: false,
    //     animationTypeForReplace: 'push'
    //   }}>
    //   <Stack.Screen name='Login' component={Login} />
    //   <Stack.Screen name='SignUp' component={SignUp} />
    // </Stack.Navigator>

    <ImageBackground source={require('../src/loginBackground.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '12%',
      }}>

      <Text style={styles.title}>{existUser? "Login" : "SignUP"}</Text>

      {existUser ? <Login /> : <SignUp />}

      <TouchableOpacity onPress={() => { setExistUser(!existUser) }}>
        <Text style={styles.newAccountLink}>
          {existUser
            ? "Already have an account? Login Here"
            : "Don't have an account? Create Here"}
        </Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  title: {
      fontSize: 40,
      fontWeight: 'bold'
  },
  newAccountLink: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 35
  }
})

export default AuthStack