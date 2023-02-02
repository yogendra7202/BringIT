import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Image } from 'react-native'
import { midtxtSz, themeColor, xlgtxtSz } from '../../theme'
import { device_height } from '../../AppData'

class Payment extends Component {
    render() {
        let imageUrl
        if (this.props.route.params.success) {
            imageUrl = 'https://cdni.iconscout.com/illustration/premium/thumb/successful-payment-7355751-6019595.png'
        } else {
            imageUrl = 'https://cdni.iconscout.com/illustration/premium/thumb/payment-failed-6771639-5639820.png'
        }
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: '700', fontSize: xlgtxtSz, color: themeColor }}>
                    {
                        this.props.route.params.success
                            ? "Payment SucessFul"
                            : "Payment Failed"
                    }
                </Text>
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('CartScreen')}>
                    <Text style={styles.btnTxt}>Go to Cart</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Payment

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    image: {
        height: device_height * .4,
        width: "100%",
        resizeMode: 'contain'
    },
    btn: {
        marginTop: 20,
        paddingHorizontal: 45,
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: themeColor,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    btnTxt: {
        fontSize: midtxtSz,
        fontWeight: 'bold',
        color: themeColor
    }
})