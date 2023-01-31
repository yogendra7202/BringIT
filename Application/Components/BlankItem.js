import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { device_width } from '../AppData'
import { lgtxtSz, midtxtSz } from '../theme'

const BlankItem = ({ onclick, type }) => {
    let imageUrl
    switch (type) {
        case 'cart':
            imageUrl = 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3428238-2902697.png'
            break;

        case 'wishlist':
            imageUrl = 'https://cdni.iconscout.com/illustration/premium/thumb/wishlist-4487152-3726302.png'
            break;

        case 'address':
            imageUrl = 'https://cdni.iconscout.com/illustration/free/thumb/empty-box-4085812-3385481.png'
            break;

        case 'search':
            imageUrl = 'https://cdni.iconscout.com/illustration/free/thumb/searching-data-4085824-3385493.png'
            break;

        default:
            imageUrl = 'https://cdni.iconscout.com/illustration/premium/thumb/empty-page-3936848-3277288.png'
            break;
    }

    return (
        <View style={styles.atCenter}>
            <Image style={styles.image}
                source={{ uri: imageUrl }} />
            <Text style={styles.msg}>There is no item here</Text>
            {
                onclick
                    ? <Text style={styles.txtBtn} onPress={() => { onclick() }}>
                        {type == 'address' ? 'Add an address' : 'Go to Home...'}
                    </Text>
                    : null
            }
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