import { Fetch_Category, Fetch_Products } from './ActionType'
import firestore from '@react-native-firebase/firestore'

const firebaseRef = firestore().collection('products');

const initialState = {
    allProduct: [],
    categoryProduct: [],
}

export default async (state = initialState, action) => {
    switch (action) {
        case Fetch_Products:
            console.log("first");
            await firebaseRef.get()
                .then(querySnapshot => {
                    //   setCategoryData(querySnapshot.docs.map((doc) => doc.data()));
                    console.log(querySnapshot.docs);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            return { ...state, data: action.payload };

        case Fetch_Category:
            console.log("second");
            await firebaseRef
                .where('category', '==', category)
                .get()
                .then(querySnapshot => {
                    //   setCategoryData(querySnapshot.docs.map((doc) => doc.data()));
                    console.log(querySnapshot.docs);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            return { ...state, data: action.payload };

        default:
            return state;
    }

}