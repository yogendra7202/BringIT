import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { midtxtSz, themeColor, txtSz } from '../theme'
import { TouchableOpacity } from 'react-native'

const AddressItem = ({ item, onBtn, isCheckOut }) => {
    return (
        <View style={styles.addressBox}>
            <View style={{ width: '70%' }}>
                <Text style={styles.addressTxt}>
                    {item.name} - Ph no: {item.phone}
                </Text>
                <Text style={styles.addressTxt}>
                    {item.house}, {item.city}
                </Text>
                {/* <Text style={styles.addressTxt}>
                    
                </Text> */}
                <Text style={styles.addressTxt}>
                    {item.pincode}
                </Text>
            </View>
            <TouchableOpacity style={styles.btn}
                onPress={() => { onBtn() }}>
                <Text style={styles.btnTxt}>{isCheckOut ? 'Select' : 'Remove'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddressItem

const styles = StyleSheet.create({

    btn: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: themeColor,
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        fontWeight: 'bold',
        letterSpacing: 1,
        color: themeColor
    },
    addressBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderWidth: 1,
        borderColor: '#888',
    },
    addressTxt: {
        fontSize: midtxtSz
    }
})