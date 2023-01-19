import { Add_To_Wishlist, Fetch_Wishlist, Remove_From_Wishlist } from './ActionType'
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { toastAlert } from '../custom'

const initialState = {
    Wishlist: {}
}

async function fetchFSWishlist() {
    const uid = auth().currentUser.uid;
    const docRef = firestore().collection('wishlist').doc(uid);

    await docRef.get().then(documentSnapshot => {

        initialState.Wishlist = Object.assign(documentSnapshot.data(), {});
        console.log("Wishlist Fetched.");
    }
    );
}

export default (state = initialState, action) => {

    switch (action.type) {
        case Add_To_Wishlist:
            if (action.payload.productID in state.Wishlist) {
                toastAlert("Already Added to Wishlist.");
            }
            const updatedState = { Wishlist: { ...state.Wishlist, [action.payload.productID]: action.payload.item } };
            return updatedState;

        case Remove_From_Wishlist:
            // console.log("second");d
            const { [action.payload]: _, ...newList } = state.Wishlist;

            return { Wishlist: newList };

        case Fetch_Wishlist: return state;

        default:
            fetchFSWishlist();
            return state;
    }

}