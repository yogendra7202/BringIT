import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed';
import firestore, { firebase } from '@react-native-firebase/firestore'

const ProductList = ({ route, navigation }) => {
    const keyword = route.params.keyword;
    // console.log(keyword)
    const [product, setProduct] = useState(null);

    firestore()
        .collection('products')
        .where('productName', '==', keyword)
        .get()
        .then(querySnapshot => {
            setProduct(querySnapshot.docs.map((doc) => doc.data()));
            // console.log(querySnapshot.docs.map((doc) => doc.data()))
            // querySnapshot.forEach((doc) => {
            //   // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.data());
            // });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    // const tofetch = firebase.firestore().collection('items').where('data', '!=', 'null');
    // tofetch.contains

    // if (!product) {
    //     <View style={styles.atCenter}><ActivityIndicator /></View>
    // }

    return (
        <View>
            <Text>ProductList</Text>
            <Icon name='arrow-left' onPress={() => { navigation.goBack() }} />
        </View>
    )
}

const styles = StyleSheet.create({
    atCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
})

export default ProductList