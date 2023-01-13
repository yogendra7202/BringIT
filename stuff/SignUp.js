import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthProvider';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.form}>

      <Text style={styles.label}>Enter Email </Text>
      <TextInput style={styles.textInput} autoCapitalize='none'
        autoCorrect={false} onChangeText={(text) => { setEmail(text) }} />

      <Text style={styles.label}>Enter password </Text>
      <TextInput style={styles.textInput} autoCapitalize='none'
        autoCorrect={false} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />
      <TouchableOpacity
        style={[
          styles.signupBtn,
          { backgroundColor: '#34b2a0' }
        ]}
        activeOpacity={0.6}
        onPress={() => register(email, password)}
      >
        <Text style={styles.signupBtnTxt}>SignUp</Text>
      </TouchableOpacity>
      <Text>I read and accept all the Terms & Conditions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 40,
  },
  label: {
    paddingTop: 20,
  },
  textInput: {
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#7d7d7d'
  },
  signupBtn: {
    marginHorizontal: 25,
    padding: 20,
    borderRadius: 10,
    marginTop: 70,
    alignItems: 'center'
  },
  signupBtnTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase'
  }
})

export default SignUp