import firestore from '@react-native-firebase/firestore'

const couponsRef = firestore().collection('coupons')

export async function fetchFSCoupon(keyword) {

    let data = null;

    await couponsRef.doc(keyword)
        .get()
        .then(docSnapshot => {
            console.log(`Coupon ${keyword} Fetched`, docSnapshot);
            // data = docSnapshot.data()
        })
        .catch((error) => {
            console.log(`Error ${keyword} Coupon: `, error);
        });

    return data;

}