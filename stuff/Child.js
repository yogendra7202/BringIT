import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'

export default Child = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>

            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#b282e8',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});