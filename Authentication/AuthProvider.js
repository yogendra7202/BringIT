import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {

                        if (e.code === 'auth/invalid-email') {
                            Alert.alert("Please enter a valid email.");
                        }

                        if (e.code === 'auth/user-not-found') {
                            Alert.alert("No account exist with this email.\nCreate an Account.");
                        }

                        if (e.code === 'auth/wrong-password') {
                            Alert.alert("Incorrect Password.");
                        }

                        console.error(e);
                    }
                },
                register: async (email, password, name, phone, imageUri) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).then(
                            // async (res) => {
                            //     const userInfo = {
                            //         phoneNumber: phone,
                            //         displayName: name,
                            //         photoURL: imageUri,
                            //     };
                            //     // Add user account information in Firestore to be retrieved later.
                            //     await firestore().collection("users").doc(res.user.uid).set(userInfo);
                            // });
                            async (res) => {

                                const update = {
                                    displayName: name,
                                    photoURL: imageUri,
                                    phoneNumber: phone,
                                };
                                await auth().currentUser.updateProfile(update);

                            });
                    } catch (e) {

                        if (e.code === 'auth/email-already-in-use') {
                            Alert.alert("User Already Exist.")
                        }

                        console.error(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.error(e);
                    }
                },
                updateProfile: async ({ name, email, password }) => {
                    try {
                        // const credential = promptForCredentials();

                        await user.reauthenticateWithCredential(password);

                        const update = {
                            // phoneNumber: "7291866738",
                            displayName: name
                        };
                        await auth().currentUser.updateProfile(update);
                        await auth().currentUser.updateEmail(email)
                        setUser(auth().currentUser)
                    } catch (e) {
                        console.error(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider