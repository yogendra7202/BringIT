import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AirbnbRating, Icon } from '@rneui/themed'
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Counter from '../Components/Counter'


const uid = auth().currentUser.uid;
const docRef = firestore().collection('cart').doc(uid);
const increment = firebase.firestore.FieldValue.increment(1);

async function addToCart(productID, item) {


    await docRef.get()
        .then(querySnapshot => {
            // console.log('Total users: ', querySnapshot.data());
            // console.log(Object.keys(querySnapshot.data()).some(item => productID === item));
            // console.log(Object.keys(querySnapshot.data()).indexOf(productID) > -1)

            const data = querySnapshot.data();
            if (Object.keys(data).includes(productID)) {
                // console.log([data.productID + '.qty'] + 1);
                docRef.update({
                    [productID + '.qty']: increment,
                });
            } else {
                docRef.set({
                    [productID]: { product: item, qty: 1 },
                }, { merge: true });
            }
            console.log();

        }).catch((error) => {
            console.log("Error...", error);
        });
    // .then(() => {
    //     console.log('Item added to Cart!');
    // }).catch((error) => {
    //     console.log("Error...", error);
    // });

}

const Product = ({ route, navigation }) => {
    const item = route.params.item;
    const productID = route.params.productID;
    const [count, setCount] = useState(1);

    return (
        <View>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 300 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.productName}</Text>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>${item.price}</Text>
            </View>

            <Counter count={count} setCount={setCount} />

            <TouchableOpacity style={{
                borderWidth: 1, borderRadius: 20, width: 120,
                padding: 10, alignItems: 'center', alignSelf: 'flex-end'
            }}
                onPress={() => addToCart(productID, item)}
            >
                <Text>Add to Cart</Text>
            </TouchableOpacity>
            <Text style={{ margin: 10 }}>{item.description}</Text>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Rate the Product</Text>
                <AirbnbRating />
            </View>
            <Icon name='chevron-left' type='font-awesome' containerStyle={{ position: 'absolute' }} onPress={() => navigation.goBack()} reverse />
        </View>
    )
}

export default Product