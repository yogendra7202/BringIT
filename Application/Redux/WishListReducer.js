import { Add_To_Wishlist, Fetch_Wishlist, Remove_From_Wishlist } from './ActionType'
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { toastAlert } from '../custom'

const initialState = {
    Wishlist: {},
    // fetched: false
}

async function fetchFSWishlist() {
    const uid = auth().currentUser.uid;
    const docRef = firestore().collection('wishlist').doc(uid);

    await docRef.get().then(documentSnapshot => {

        if (documentSnapshot.exists) {
            initialState.Wishlist = Object.assign(documentSnapshot.data(), {});
        }
        console.log("Wishlist Fetched.");

    }).catch(error => {
        console.log('Wishlist Error (R)')
    });
}

export default (state = initialState, action) => {

    switch (action.type) {
        case Add_To_Wishlist:
            if (action.payload.productID in state.Wishlist) {
                toastAlert("Already Added to Wishlist.");
                return state;
            }
            const updatedState = { Wishlist: { ...state.Wishlist, [action.payload.productID]: action.payload.item } };
            toastAlert("Item Added to Wishlist.");
            return updatedState;

        case Remove_From_Wishlist:
            // console.log("second");d
            const { [action.payload]: _, ...newList } = state.Wishlist;
            toastAlert("Item Removed from Wishlist.");
            return { Wishlist: newList };

        case Fetch_Wishlist: return state;

        default:
            // if (!state.fetched) {
            // try {
            fetchFSWishlist();
            // } catch (error) {
            //     console.log('Wishlist Error (R)')
            // }
            //     return { ...state, fetched: true };
            // }
            return state;
    }

}