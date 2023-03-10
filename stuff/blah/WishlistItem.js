import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'

const txtSz = 20, midTxtSz = 22, lgTxtSz = 26;
const themecolor = '#006699';

async function removeFromWishlist(key) {

    const uid = auth().currentUser.uid;

    await firestore().collection('wishlist').doc(uid).update(
        { [key]: firebase.firestore.FieldValue.delete() }
    ).then(() => {
        console.log('Item removed from wishlist!');
    }).catch((error) => {
        console.log("Error...", error);
    });

}

const WishlistItem = (item, key) => {
    return (
        <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.card} elevation={2}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.details}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>{item.productName}</Text>
                        <Text style={styles.priceDetail}>${item.price}</Text>
                    </View>
                    <Text>Size: {item.size}</Text>
                    <Icon name='circle' color={item.color} ></Icon>
                    <Button title='Remove' onPress={() => { removeFromWishlist(key) }} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    card: {
        padding: 12,
        margin: 12,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    image: {
        borderRadius: 10,
        resizeMode: 'cover',
        height: 120,
        width: '30%',
    },
    details: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        width: '70%',
    },
    title: {
        fontSize: txtSz,
        fontWeight: 'bold',

        // fontSize: 16,
        // fontWeight: 'bold',
        // paddingVertical: 11,
        // paddingHorizontal: 20,
        // color: '#fff',
        // backgroundColor: '#006699',
    },
})

export default WishlistItem