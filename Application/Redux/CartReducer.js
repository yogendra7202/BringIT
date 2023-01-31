import { Add_To_Cart, Remove_From_Cart } from "./ActionType"
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { toastAlert } from "../custom";

const initialState = {
    Cart: {},
    // fetched: false,
}

async function fetchFSCart() {
    const uid = auth().currentUser.uid;
    const docRef = firestore().collection('cart').doc(uid);

    await docRef.get().then(documentSnapshot => {

        if (documentSnapshot.exists) {
            initialState.Cart = Object.assign(documentSnapshot.data(), {});
        }
        console.log("Cart Fetched.");

    }).catch(error => {
        console.log('Cart Error (R)')
    });
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Add_To_Cart:
            // let qtyState = { qty: 1 };
            // if (action.payload.productID in state.Cart) {
            //     qtyState = { qty: state.Cart[action.payload.productID].qty + 1 };
            // }
            const updatedState = { Cart: { ...state.Cart, [action.payload.productID]: { ...action.payload.item, qty: action.payload.itemQty } } };

            toastAlert("Item Added to Cart.");
            return updatedState;

        case Remove_From_Cart:
            const { [action.payload]: _, ...newList } = state.Cart;

            toastAlert("Item Removed from Cart.");
            return { Cart: newList };

        default:
            // if (!state.fetched) {
            // try {
            fetchFSCart();
            // } catch (error) {
            //     console.log('Cart Error (R)')
            // }
            //     return { ...state, fetched: true };
            // }
            return state;
    }
}