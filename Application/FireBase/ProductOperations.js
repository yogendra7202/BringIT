import firestore from '@react-native-firebase/firestore'

const productsRef = firestore().collection('products')
let data = null

export async function fetchFSProducts(keyword) {

    if (!data) {
        await fetchAllFSProducts()
    }

    return (data.filter(item => {
        if (item.product.productName.toLowerCase().includes(keyword.toLowerCase())
            || item.product.category.toLowerCase().includes(keyword.toLowerCase())
            || item.product.description.toLowerCase().includes(keyword.toLowerCase())
        ) {
            return item
        }
    }))

}

export async function fetchAllFSProducts() {

    if (!data) {
        await productsRef.get()
            .then(querySnapshot => {
                console.log("Products Fetched",)
                data = querySnapshot.docs.map((doc) => ({ 'productId': doc.id, 'product': doc.data() }));
            })
            .catch((error) => {
                console.log(`Error while getting Products: `, error);
            });
    }

    return data;

}