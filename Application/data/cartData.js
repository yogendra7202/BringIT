import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export async function fetchCartData() {
    const uid = auth().currentUser.uid;
    const docRef = firestore().collection('cart').doc(uid);

    // if (!cart) {
    await docRef.onSnapshot((doc) => {
        if (doc.exists) {
            // console.log("Cart Changed.");
            // setCart(doc.data());
            // console.log(doc.data())
            //Hey
            return doc.data();
        }
    });
    // }
    return null;
}