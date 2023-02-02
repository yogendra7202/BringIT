import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'

const uid = auth().currentUser.uid;
const userRef = firestore().collection('users').doc(uid);

export async function updateFAUserPhone(phone) {
    await userRef.set({
        phoneNumber: phone
    }, { merge: true }
    ).then(() => {
        console.log('Phone no. Updated!');
    }).catch((error) => {
        console.log("Failed to add no to User", error);
    });

}

export async function updateFAUserAddress(addresses) {
    await userRef.set({
        addresses: addresses
    }, { merge: true }
    ).then(() => {
        console.log('Addresses Updated!');
    }).catch((error) => {
        console.log("Failed to update addresses", error);
    });

}