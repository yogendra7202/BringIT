import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthProvider';

const Login = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const {login} = useContext(AuthContext);

    return (
        <View style={styles.maincontainer}>
            {/* <Image source={require('../src/loginUser.png')} style={styles.userImage} /> */}
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>

                <Text style={styles.label}>Enter Email </Text>
                <TextInput style={styles.textInput} autoCapitalize='none'
                    autoCorrect={false} onChangeText={(text) => { setEmail(text) }}/>

                <Text style={styles.label}>Enter password </Text>
                <TextInput style={styles.textInput} autoCapitalize='none'
                    autoCorrect={false} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }}/>
                <TouchableOpacity
                    style={[
                        styles.loginBtn,
                        { backgroundColor: '#34b2a0' }
                    ]}
                    activeOpacity={0.6}
                    onPress={() => login(email, password)}
                >
                    <Text style={styles.loginTxt}>Login</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity activeOpacity={0.6} onPress={() => {navigation.navigate('SignUp')}}>
                <Text style={styles.newAccountLink}>Don't have an account? Create Here</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        padding: '8%',
    },
    userImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 15,
        fontFamily: "regular",
    },
    form: {
        paddingHorizontal: 20,
        marginVertical: 30,
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
        marginTop: 70,
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
        fontSize: 20
    }
})

export default Login