import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthProvider';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { login } = useContext(AuthContext);

    const submit = () => {
        if (email === null || password === null) {
            Alert.alert("Please Enter both Email and Password.");
        } else {
            login(email, password);

        }
    }

    return (
        <ImageBackground source={require('../src/loginBackground.png')}
            style={styles.maincontainer}>
            {/* <Image source={require('../src/loginUser.png')} style={styles.userImage} /> */}
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>

                <Text style={styles.label}>Enter Email </Text>
                <TextInput style={styles.textInput} autoCapitalize='none'
                    autoCorrect={false} onChangeText={(text) => { setEmail(text); }} />

                <Text style={styles.label}>Enter password </Text>
                <TextInput style={styles.textInput} autoCapitalize='none'
                    autoCorrect={false} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />
                <TouchableOpacity
                    style={[
                        styles.loginBtn,
                        { backgroundColor: '#34b2a0' }
                    ]}
                    activeOpacity={0.6}
                    onPress={submit}
                >
                    <Text style={styles.loginTxt}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('SignUp') }}>
                <Text style={styles.newAccountLink}>Don't have an account? Create Here</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        paddingHorizontal: '12%',
        justifyContent: 'center'
    },
    // userImage: {
    //     width: 150,
    //     height: 150,
    //     alignSelf: 'center',
    // },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    form: {
        paddingVertical: 40
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
    loginBtn: {
        marginHorizontal: 35,
        padding: 20,
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center'
    },
    loginTxt: {
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

export default Login