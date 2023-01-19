import firestore from '@react-native-firebase/firestore'

const productsRef = firestore().collection('products')

export async function fetchFSProducts(keyword) {

    let data;

    await productsRef.where('productName', '==', keyword)
        .get()
        .then(querySnapshot => {
            console.log(`Product ${keyword} Fetched`);
            data = querySnapshot.docs.map((doc) => doc.data());
        })
        .catch((error) => {
            console.log(`Error ${keyword} Product: `, error);
        });

    return data;

}

export async function fetchAllFSProducts() {

    let data;
    let ids;

    await productsRef.get()
        .then(querySnapshot => {
            console.log("Products Fetched")
            ids = querySnapshot.docs.map((doc) => doc.id);
            data = querySnapshot.docs.map((doc) => doc.data());
        })
        .catch((error) => {
            console.log(`Error while getting Products: `, error);
        });

    return { ids, data };

}