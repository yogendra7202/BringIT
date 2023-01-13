import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'

const uid = auth().currentUser.uid;
const wishlistRef = firestore().collection('wishlist').doc(uid);

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