import firestore from '@react-native-firebase/firestore'

const couponsRef = firestore().collection('coupons')

export async function fetchFSCoupon() {

    let data = {};

    // await couponsRef.doc(keyword)
    await couponsRef
        .get()
        .then(querySnapshot => {
            console.log(`Coupon Fetched`);
            querySnapshot.forEach((doc) => {
                data[doc.id] = doc.data();
            });
        })
        .catch((error) => {
            console.log(`Error Coupon: `, error);
        });

    return data;

}