import { Add_To_Wishlist, Fetch_Wishlist, Remove_From_Wishlist } from './ActionType'
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'

const initialState = {
    Wishlist: {}
}

// async function fetchFSWishlist() {
//     const uid = auth().currentUser.uid;
//     const docRef = firestore().collection('wishlist').doc(uid);

//     await docRef.get().then(documentSnapshot => {

//         initialState.Wishlist = Object.assign(documentSnapshot.data(), {});
//         console.log("Wishlist Fetched.");
//     }
//     );
// }

export default (state = initialState, action) => {
    switch (action.type) {
        case Add_To_Wishlist:
            console.log("first", Object.assign(state.Wishlist, { [action.payload.productID]: action.payload.item }));
            // state.Wishlist[action.payload.productID] = action.payload.item;

            // return Object.assign(state.Wishlist, { [action.payload.productID]: action.payload.item });
            const id = String(action.payload.productID);
            return state.Wishlist[id] = action.payload.item;

        case Remove_From_Wishlist:
            console.log("second");
            return state;

        case Fetch_Wishlist: return state;

        default:
            // fetchFSWishlist();
            return state;
    }

}