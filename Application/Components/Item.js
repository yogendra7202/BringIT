import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed'

const Item = ({ item }) => (
    <TouchableOpacity onPress={() => { console.log(item) }} activeOpacity={0.8}>
        <Card containerStyle={styles.container}>
            <Card.Image source={{ uri: item.image }} style={{ resizeMode: 'cover' }} />
            <Card.Title>{item.productName}</Card.Title>
            <View style={styles.details}>
                <Text style={styles.priceDetail}>${item.price}</Text>
                <Text style={styles.extraDetail}>Color: {item.color + "\n"} Size: {item.size}</Text>
            </View>
        </Card>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 10,
        borderRadius: 10,
        width: 150
    },
    details: {
        color: '#222',
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    priceDetail: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    extraDetail: {
        fontSize: 9
    }
});

export default Item