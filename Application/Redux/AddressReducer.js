import { Add_An_Address, Remove_An_Address } from "./ActionType"
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { toastAlert } from "../custom";

const initialState = {
    addresses: [],
    // fetched: false
}

async function fetchFSAddress() {
    const uid = auth().currentUser.uid;
    const docRef = firestore().collection('users').doc(uid);

    await docRef.get().then(documentSnapshot => {
        // console.log(documentSnapshot.exists)
        if (documentSnapshot.exists) {
            initialState.addresses = documentSnapshot.data().addresses;
        }
        console.log("Address Fetched");

    }).catch(error => {
        console.log('Address Error (R)')
    });
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Add_An_Address:
            toastAlert("Address added.")
            return { addresses: [...state.addresses, action.payload] }

        case Remove_An_Address:
            const deletedArray = state.addresses.filter((item, index) => {
                return index !== action.payload
            })
            toastAlert("Address removed.")
            return { addresses: deletedArray }

        default:
            // if (!state.fetched) {
            fetchFSAddress();

            //     return { ...state, fetched: true };
            // }
            return state
    }
}