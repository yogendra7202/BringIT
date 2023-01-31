import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { midtxtSz, themeColor, txtSz, xlgtxtSz } from '../theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../../Authentication/AuthProvider';

class EditPassword extends Component {
    static contextType = AuthContext;

    render() {
        return (
            <View>
                {/* <View style={styles.inputBox}>
                    <Icon name="envelope" size={xlgtxtSz} style={styles.inputIcon} />
                    <Text>Choose Image</Text>
                </View> */}
                <View style={styles.inputBox}>
                    <Icon name="user" size={xlgtxtSz} style={styles.inputIcon} />
                    <Text style={[styles.inputField, { paddingVertical: 13 }]}>{this.context.user.displayName}</Text>
                </View>
                <View style={styles.inputBox}>
                    <Icon name="key" size={xlgtxtSz} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter your Old Password'
                        style={styles.inputField}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="key" size={xlgtxtSz} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter your New Password'
                        style={styles.inputField}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="key" size={xlgtxtSz} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Confirm your New Password'
                        style={styles.inputField}
                    />
                </View>
                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitBtnTxt}>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default EditPassword

const styles = StyleSheet.create({
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 12,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
    },
    inputIcon: {
        marginHorizontal: 8
    },
    inputField: {
        fontSize: txtSz,
        fontWeight: '700',
        letterSpacing: 1,
        width: '90%',
        color: '#666',
    },
    submitBtn: {
        marginHorizontal: 35,
        padding: 18,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
        backgroundColor: themeColor,
        marginBottom: 100
    },
    submitBtnTxt: {
        fontSize: midtxtSz,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase'
    },
})