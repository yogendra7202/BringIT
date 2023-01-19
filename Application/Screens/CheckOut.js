import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableNativeFeedback, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { lgtxtSz, midtxtSz, smtxtSz, themeColor, txtSz } from '../theme';
import RazorpayCheckout from 'react-native-razorpay';
import { fetchFSCoupon } from '../FireBase/CouponOperations';

// function payment() {
//     var options = {
//         description: 'Credits towards consultation',
//         image: 'https://i.imgur.com/3g7nmJC.jpg',
//         currency: 'INR',
//         key: '<YOUR_KEY_ID>',
//         amount: '5000',
//         name: 'Acme Corp',
//         order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
//         prefill: {
//             email: 'gaurav.kumar@example.com',
//             contact: '9191919191',
//             name: 'Gaurav Kumar'
//         },
//         theme: { color: '#53a20e' }
//     }
//     RazorpayCheckout.open(options).then((data) => {
//         // handle success
//         alert(`Success: ${data.razorpay_payment_id}`);
//     }).catch((error) => {
//         // handle failure
//         alert(`Error: ${error.code} | ${error.description}`);
//     });
// }
function payment() {
    console.log('Hii');
}

const CheckOut = ({ navigation, route }) => {
    const cartItems = route.params.cart;
    const [couponCode, setCouponCode] = useState(null);
    let total = 0;
    let extraCharges = 0;
    let discount = 0;

    Object.values(cartItems).map((item) => {
        total += (item.qty * item.price);
    });

    console.log('coupon ', fetchFSCoupon(couponCode))

    if (total < 500) {
        extraCharges = 40;
    }


    return (
        <ScrollView>
            <View style={styles.innerContainer}>
                <View style={styles.inlineBox}>
                    <Text style={styles.title}>Delivery Address</Text>
                    {/* <TouchableOpacity style={styles.addressBtn} onPress={() => { navigation.navigate('Profile', { screen: 'Address' }) }}> */}
                    <Text style={styles.addressBtnTxt}>Select Address</Text>
                    {/* </TouchableOpacity> */}
                </View>
                <Text style={styles.address}>{'Rohit - 7291866738\nSector-101, Noida\n201301'}</Text>
            </View>
            <View style={[styles.innerContainer, { maxHeight: 450 }]}>
                <Text style={styles.title}>Your Products</Text>
                {/* <FlatList
                    data={Object.values(cartItems)}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.productCard}>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <View style={styles.productDetails}>
                                    <Text style={styles.productName}>{item.productName}</Text>
                                    <View style={styles.inlineBox}>
                                        <Text>Price: Rs.{item.price}</Text>
                                        <Text>Qty: {item.qty}</Text>
                                    </View>
                                    <Text style={{ fontWeight: 'bold' }}>Total: Rs.{item.price * item.qty}</Text>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                /> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        Object.values(cartItems).map((item) => (

                            <View style={styles.productCard}>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <View style={styles.productDetails}>
                                    <Text style={styles.productName}>{item.productName}</Text>
                                    <View style={styles.inlineBox}>
                                        <Text>Price: Rs.{item.price}</Text>
                                        <Text>Qty: {item.qty}</Text>
                                    </View>
                                    <Text style={{ fontWeight: 'bold' }}>Total: Rs.{item.price * item.qty}</Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.innerContainer}>
                {/* <Text style={{ flex: .6 }}></Text> */}
                <Text style={styles.title}>Apply Coupon</Text>
                <TextInput placeholder='Enter your Coupon Code Here.' style={styles.couponBox} />
            </View>
            <View style={[styles.innerContainer, { padding: 20 }]}>
                <View style={styles.inlineBox}>
                    <Text style={{ flex: .7, fontSize: midtxtSz }}>Total Amount: </Text>
                    <Text style={{ flex: .3, fontSize: midtxtSz }}>Rs. {total}</Text>
                </View>
                <View style={styles.inlineBox}>
                    <Text style={{ flex: .7, fontSize: midtxtSz }}>Delivery Charges: </Text>
                    <Text style={{ flex: .3, fontSize: midtxtSz, textDecorationLine: extraCharges == 0 ? 'line-through' : 'none' }}>Rs. 40</Text>
                </View>
                {
                    discount
                        ? <View style={styles.inlineBox}>
                            <Text style={{ flex: .7, fontSize: midtxtSz }}>Delivery Charges: </Text>
                            <Text style={{ flex: .3, fontSize: midtxtSz, textDecorationLine: extraCharges == 0 ? 'line-through' : 'none' }}>Rs. 40</Text>
                        </View>
                        : null
                }
                <View style={[styles.inlineBox, { borderTopWidth: 2, marginTop: 5, paddingTop: 5 }]}>
                    <Text style={{ flex: .7, fontSize: midtxtSz }}>Payable Amount: </Text>
                    <Text style={{ flex: .3, fontSize: midtxtSz, fontWeight: 'bold' }}>Rs. {total + extraCharges}</Text>
                </View>
            </View>
            <TouchableNativeFeedback onPress={() => { payment() }}
                background={TouchableNativeFeedback.Ripple(
                    themeColor,
                    false,
                )}>
                <View style={styles.buyBtn}>
                    <Text style={styles.btnTxt}>Pay ₹{total + extraCharges}</Text>
                </View>
            </TouchableNativeFeedback>

        </ScrollView >
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        backgroundColor: '#fff',
        margin: 15,
        marginBottom: 0,
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
    },
    title: {
        marginHorizontal: 10,
        fontSize: lgtxtSz,
        fontWeight: 'bold'
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        margin: 10,
        borderRadius: 30,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 30
    },
    productDetails: {
        margin: 8,
        justifyContent: 'space-between',
        width: '65%'
    },
    productName: {
        fontSize: midtxtSz,
        color: '#666'
    },
    inlineBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    couponBox: {
        backgroundColor: '#eee',
        padding: 8,
        borderRadius: 10,
        margin: 5,
        marginTop: 10,
        fontSize: txtSz
    },
    addressBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: themeColor,
        backgroundColor: '#fff',
        // marginTop: 5,
        marginRight: 10
    },
    addressBtnTxt: {
        fontSize: smtxtSz,
        fontWeight: 'bold',
        color: themeColor
    },
    address: {
        fontSize: txtSz,
        margin: 10
    },
    buyBtn: {
        // position: 'absolute',
        paddingHorizontal: 60,
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: themeColor,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 150
    },
    btnTxt: {
        fontSize: midtxtSz,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: themeColor
    }

})

export default CheckOut