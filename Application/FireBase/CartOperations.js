import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';

// const uid = auth().currentUser.uid;
let uid;
const cartRef = firestore().collection('cart').doc(uid);

export async function updateFSCart(data) {
    const { user } = useContext(AuthContext)
    uid = user.uid;

    await cartRef.set(data).then(() => {
        console.log('Cart Updated!');
    }).catch((error) => {
        console.log("Failed to update Cart", error);
    });
}

export const fetchCart = async () => {
    await cartRef.get()
        .then(documentSnapshot => {
            console.log('Cart exists: ', documentSnapshot.exists);

            return documentSnapshot.data();

        }).catch(error => {
            console.log("Error in Cart Process: " + error);
            return null;
        });

}

export function removeFromFSCart(key) {
    cartRef.update({
        [key]: firebase.firestore.FieldValue.delete()
    }).then(() => {
        console.log("Sucessfully Removed from Cart");
    }).catch((error) => {
        console.log("Failed to Remove from Cart", error);
    });

}

export function addToFSCart(data) {
    cartRef.set({
        [data.productID]: { ...data.item, qty: data.itemQty }
    }, { merge: true }
    ).then(() => {
        console.log('Item added to Cart!');
    }).catch((error) => {
        console.log("Failed to add to Cart", error);
    });
}