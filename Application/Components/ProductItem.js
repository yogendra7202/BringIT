import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Card, Icon } from '@rneui/base'
import { midtxtSz, smtxtSz, themeColor, txtSz } from '../theme'
import { addToFSCart } from '../FireBase/CartOperations'
import { device_width } from '../AppData'
import Counter from './Counter'

// function addBtn({ name }) {
//     return (
//         <TouchableOpacity>{name}</TouchableOpacity>
//     )
// }
const productBtn = (title, onBtnPress) => (
    <TouchableOpacity
        style={styles.addToCartBtn}
        onPress={() => { onBtnPress() }}
    >
        <Text style={{ fontWeight: '700', color: themeColor }}>{title}</Text>
    </TouchableOpacity>
)

const ProductItem = ({ card, type, item, productID, onCard, onIcon, onBtn }) => {
    // console.log(item.qty)
    const [itemQty, setItemQty] = useState(1);

    return (
        <View style={[styles.card, card ? { width: device_width / 2 - 16 } : {}]}>
            {/* <TouchableOpacity style={{ flex: 0.5 }}> */}
            <TouchableOpacity style={card ? {} : { flexDirection: 'row' }}
                onPress={() => onCard(item)} >
                <Image source={{ uri: item.image }} style={card ? styles.topImage : styles.leftImage} />
                <View style={card ? {} : { width: '63%', paddingHorizontal: 8 }}>
                    <Text numberOfLines={1} style={styles.title}>{item.productName}</Text>
                    <View style={styles.inlineflex}>
                        <Text style={styles.price}>Rs.{item.price}</Text>
                        {type == 'cart'
                            ? <Text style={{ fontWeight: '700', alignSelf: 'center', fontSize: txtSz }}>Qty: {item.qty}</Text>
                            : <Counter count={itemQty} setCount={setItemQty} />}
                    </View>

                    <TouchableOpacity
                        style={styles.addToCartBtn}
                        onPress={() => { onBtn({ productID, item, itemQty }) }}
                    >
                        <Text style={{ fontWeight: '700', color: themeColor }}>{type == 'cart' ? 'Buy Now' : 'Add to Cart'}</Text>
                    </TouchableOpacity>
                </View>
                {/* {() => addBtn({ name: 'Add to Cart' })} */}
                {/* </View> */}
            </TouchableOpacity >
            {
                <TouchableOpacity
                    style={styles.itemIcon}
                    onPress={() => { card ? onIcon({ productID, item }) : onIcon(productID) }}
                >
                    <Icon name={card ? 'heart-o' : 'trash'} type='font-awesome' size={txtSz} color={themeColor} raised />
                </TouchableOpacity>
                // : <Text style={{ fontWeight: '700', alignSelf: 'flex-end' }}>Qty: {item.qty}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        margin: 8,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        elevation: 1,
    },
    topImage: {
        borderRadius: 10,
        width: '100%',
        height: 180,
    },
    leftImage: {
        borderRadius: 10,
        width: '30%',
        height: 120
    },
    title: {
        fontSize: txtSz,
        fontWeight: 'bold',
        marginVertical: 6
    },
    inlineflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        marginBottom: 10,
    },
    price: {
        fontSize: midtxtSz,
        fontWeight: 'bold',
        color: '#333'
    },
    addToCartBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'flex-start',
        borderColor: themeColor,
        // elevation: 2
    },
    itemIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        overflow: 'hidden',
    },
})

export default ProductItem