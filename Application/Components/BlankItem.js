import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { device_width } from '../AppData'
import { lgtxtSz, midtxtSz } from '../theme'

const BlankItem = ({ navigation, type }) => {
    return (
        <View style={styles.atCenter}>
            <Image style={styles.image}
                source={{
                    uri: type == 'cart'
                        ? 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3428238-2902697.png'
                        : 'https://cdni.iconscout.com/illustration/premium/thumb/wishlist-4487152-3726302.png'
                }} />
            <Text style={styles.msg}>There is no item here</Text>
            <Text style={styles.txtBtn} onPress={() => { navigation.navigate('Home') }}>
                Go to Home...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    atCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    image: {
        height: device_width * .8,
        width: "100%",
        resizeMode: 'contain'
    },
    msg: {
        fontSize: lgtxtSz
    },
    txtBtn: {
        fontSize: midtxtSz,
        color: 'purple',
        fontWeight: '800',
        marginVertical: 5,
    }
})

export default BlankItem