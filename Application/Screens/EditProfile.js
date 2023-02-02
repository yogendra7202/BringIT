import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { Component } from 'react'
import { midtxtSz, themeColor, txtSz, xlgtxtSz } from '../theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../../Authentication/AuthProvider'
import { launchImageLibrary } from 'react-native-image-picker'
import { toastAlert } from '../custom'



class EditProfile extends Component {

    static contextType = AuthContext;

    constructor(props, context) {
        super(props);
        this.state = {
            name: context.user.displayName,
            email: context.user.email,
            image: context.user.photoURL,
            password: '',
        };
    }

    // const submit = () => {
    //     if (email === null || password === null || name === null || phoneNumber === null) {
    //         Alert.alert("Please Fill all the fields.");
    //     } else {

    //         if (password.length < 8) {
    //             Alert.alert("Password must contain 8 characters.");
    //         } else {

    //             const uploadTask = storage().ref(`/profilePics/${Date.now()}`).putFile(image);
    //             uploadTask.then(() => {
    //                 alert("Uploaded Succesfully");
    //                 console.log(uploadTask);
    //                 uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //                     console.log('File available at', downloadURL);
    //                     register(email, password, name, phoneNumber, downloadURL);
    //                 });
    //             });

    //         }

    //     }
    // }

    onSubmit = async () => {
        if (this.state.name == '' || this.state.email == '' || this.state.password == '' || this.state.image == '') {
            Alert.alert('', 'Please Fill all Details.')
        } else {
            await this.context.relogin(this.state.password).then(async () => {
                await this.context.updateProfile(this.state);
                toastAlert('Profile Updated Successfully.');
                this.props.navigation.goBack();
            }).catch(e => {
                console.log(e)
                Alert.alert('', 'Please Enter valid Password.')
            })
        }
    }

    getPic = async () => {

        await launchImageLibrary({ mediaType: 'photo', quality: .5 }, (response) => {

            if (response.didCancel) {
                // setImage(null);
                alert('User cancelled camera picker');

            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');

            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');

            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);

            } else {
                this.setState({ image: response.assets[0].uri });
            }

        });
    }


    render() {
        return (
            <View>


                {/* <View style={styles.inputBox}>
                    <Icon name="user" size={xlgtxtSz} style={styles.inputIcon} />
                    <Text style={[styles.inputField, { paddingVertical: 13 }]}>{this.state.image}</Text>
                    <TouchableOpacity style={styles.uploadBtn} onPress={this.getPic} >
                        <Text style={{ fontWeight: '700', color: '#fff' }}>Upload</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Image style={styles.profilePic}
                        source={
                            {
                                uri: this.state.image
                                    ? this.state.image
                                    : 'https://firebasestorage.googleapis.com/v0/b/bringit-839a4.appspot.com/o/profilePics%2Fguest.png?alt=media&token=a8eebd76-f4c1-4761-9873-ce676857193f'
                            }
                        } />
                    <TouchableOpacity style={styles.uploadBtn} onPress={this.getPic}>
                        <Icon name="upload" size={xlgtxtSz} color={themeColor} />
                        <Text style={{ color: themeColor, fontWeight: '700' }}>Choose Image</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputBox}>
                    <Icon name="user" size={xlgtxtSz} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter your Name'
                        value={this.state.name}
                        style={styles.inputField}
                        onChangeText={(txt) => {
                            this.setState({ name: txt })
                        }}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="envelope" size={xlgtxtSz} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter your Email'
                        value={this.state.email}
                        style={styles.inputField}
                        onChangeText={(txt) => {
                            this.setState({ email: txt })
                        }}
                    />
                    {/* <Text style={[styles.inputField, { paddingVertical: 13 }]}>{this.context.user.email}</Text> */}
                </View>
                <View style={styles.inputBox}>
                    <Icon name="key" size={xlgtxtSz} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter Confirm Password'
                        style={styles.inputField}
                        onChangeText={(txt) => {
                            this.setState({ password: txt })
                        }}
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputBox}>
                    <Icon name="phone" size={xlgtxtSz} style={styles.inputIcon} />
                    <TextInput
                        placeholder='Enter your Phone Number'
                        style={styles.inputField}
                    />
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={() => this.onSubmit()}>
                    <Text style={styles.submitBtnTxt}>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default EditProfile

const styles = StyleSheet.create({
    profilePic: {
        width: 120,
        height: 120,
        marginVertical: 12,
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 150,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: themeColor,
        padding: 10,
    },
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