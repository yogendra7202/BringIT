import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';

// const uid = auth().currentUser.uid;
let uid;
const wishlistRef = firestore().collection('wishlist').doc(uid);

export async function updateFSWishlist(data) {
    const { user } = useContext(AuthContext)
    uid = user.uid;

    await wishlistRef.set(data).then(() => {
        console.log('Wishlist Updated!');
    }).catch((error) => {
        console.log("Failed to update Wishlist", error);
    });
}

export function removeFromFSWishlist(key) {
    wishlistRef.update({
        [key]: firebase.firestore.FieldValue.delete()
    }).then(() => {
        console.log("Sucessfully Removed from Wishlist");
    }).catch((error) => {
        console.log("Failed to Remove from Wishlist", error);
    });

}

export function addToFSWishlist(data) {
    wishlistRef.set({
        [data.productID]: data.item
    }, { merge: true }
    ).then(() => {
        console.log('Item added to Wishlist!');
    }).catch((error) => {
        console.log("Failed to add to Wishlist", error);
    });

}