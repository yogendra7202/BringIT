import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Button, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { AuthContext } from './AuthProvider'


const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState(null);
  const [image, setImage] = useState(null);

  const { register } = useContext(AuthContext);

  const submit = () => {
    if (email === null || password === null || name === null) {
      Alert.alert("Please Fill all the fields.");
    } else {

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        Alert.alert('', "Invalid Email.")
      } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(password)) {
        Alert.alert('', "Password must contain:\n> 8 to 12 characters.\n> 1 Special character.\n> 1 Numeric Value.");
      } else {

        const uploadTask = storage().ref(`/profilePics/${Date.now()}`).putFile(image);
        uploadTask.then(() => {
          alert("Uploaded Succesfully");
          console.log(uploadTask);
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            register(email, password, name, downloadURL);
          });
        });

      }

    }
  }

  const getPic = async () => {

    await launchImageLibrary({ mediaType: 'photo', quality: .5 }, (response) => {

      if (response.didCancel) {
        setImage(null);
        alert('User cancelled camera picker');

      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');

      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');

      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);

      } else {
        setImage(response.assets[0].uri);
      }

    });
  }

  return (
    <ImageBackground source={require('../src/loginBackground.png')}
      style={styles.maincontainer} >
      <View style={styles.container}>
        <Text style={styles.title}>SignUp</Text>
        <View style={styles.form}>

          <Text style={styles.label}>Profile Picture</Text>
          <Image style={styles.profilePic}
            source={
              {
                uri: image
                  ? image
                  : 'https://firebasestorage.googleapis.com/v0/b/bringit-839a4.appspot.com/o/profilePics%2Fguest.png?alt=media&token=a8eebd76-f4c1-4761-9873-ce676857193f'
              }} />

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={getPic} style={styles.uploadBtn} >
              <Text style={{ color: '#fff' }}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn} onPress={() => { setImage(null) }}>
              <Text style={{ color: '#fff' }}>Remove</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Enter Name </Text>
          <TextInput style={styles.textInput} autoCapitalize='none'
            autoCorrect={false} onChangeText={(text) => { setName(text) }} />

          <Text style={styles.label}>Enter Email </Text>
          <TextInput style={styles.textInput} autoCapitalize='none'
            autoCorrect={false} onChangeText={(text) => { setEmail(text) }} />

          {/* <Text style={styles.label}>Enter Phone Number </Text>
          <TextInput style={styles.textInput} autoCapitalize='none'
            autoCorrect={false} onChangeText={(text) => { setPhoneNumber(text) }} /> */}

          <Text style={styles.label}>Enter password </Text>
          <TextInput style={styles.textInput} autoCapitalize='none'
            autoCorrect={false} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />

          <Text>I read and accept all the Terms & Conditions</Text>

          <TouchableOpacity
            style={[
              styles.signupBtn,
              { backgroundColor: '#34b2a0' }
            ]}
            activeOpacity={0.6}
            onPress={submit}
          >
            <Text style={styles.signupBtnTxt}>SignUp</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('Login') }}>
          <Text style={styles.newAccountLink}>Already have an account? Login Here</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    backgroundColor: '#ffffffb0'
  },
  profilePic: {
    height: 120,
    width: 120,
    position: 'absolute',
    right: 0,
    borderRadius: 100,
    borderColor: '#888',
    borderWidth: 2
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  form: {
    paddingVertical: 40
  },
  uploadBtn: {
    marginVertical: 10,
    marginRight: 8,
    padding: 10,
    backgroundColor: '#888',
    width: 100,
    alignItems: 'center',
    borderRadius: 100
  },
  label: {
    paddingTop: 10,
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
    marginHorizontal: 35,
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center'
  },
  signupBtnTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase'
  },
  newAccountLink: {
    alignSelf: 'center',
    fontSize: 16
  }
})

export default SignUp