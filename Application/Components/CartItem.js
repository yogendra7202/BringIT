import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const CartItem = (item, key) => {
    return (
        <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.card} elevation={2}>
                <Text>{item.productName}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    card: {
        padding: 12,
        margin: 12,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
})

export default CartItem