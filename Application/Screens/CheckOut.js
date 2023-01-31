import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableNativeFeedback, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { lgtxtSz, midtxtSz, smtxtSz, themeColor, txtSz } from '../theme';
import RazorpayCheckout from 'react-native-razorpay';
import { fetchFSCoupon } from '../FireBase/CouponOperations';
import { useSelector } from 'react-redux';
import AddressItem from '../Components/AddressItem';
import PushNotification from 'react-native-push-notification';

// function payment() {
//     var isAddressVisible = {
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
//     RazorpayCheckout.open(isAddressVisible).then((data) => {
//         // handle success
//         alert(`Success: ${data.razorpay_payment_id}`);
//     }).catch((error) => {
//         // handle failure
//         alert(`Error: ${error.code} | ${error.description}`);
//     });
// }
function sendNotification() {
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "bring-it", // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ticker: "My Notification Ticker", // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
        subText: "This is a subText", // (optional) default: none
        bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        bigLargeIcon: "ic_launcher", // (optional) default: undefined
        bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
        color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: "some_tag", // (optional) add tag to message
        group: "group", // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

        // when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        // usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        // timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

        messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

        actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        // invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

        /* iOS only properties */
        // category: "", // (optional) default: empty string
        // subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

        /* iOS and Android properties */
        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: "My Notification Title", // (optional)
        message: "My Notification Message", // (required)
        picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
        userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
}
function payment() {
    console.log('Hii');
    sendNotification();

}
// function applycoupon() {
//     setTimeout(() => { }, 1000)
// }

const CheckOut = ({ navigation, route }) => {
    const cartItems = route.params.cart;
    const [coupons, setCoupons] = useState();

    const [isAddressVisible, setIsAddressVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [isCouponVisible, setIsCouponVisible] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const addresses = useSelector(state => state.AddressReducer.addresses)
    // console.log(addresses)

    async function requestCoupon() {
        setCoupons(await fetchFSCoupon());
        setIsCouponVisible(true);
    }

    let total = 0;
    let extraCharges = 0;
    let discount = 0;

    Object.values(cartItems).map((item) => {
        total += (item.qty * item.price);
    });

    if (total < 1000) {
        extraCharges = 40;
    }

    if (selectedCoupon) {
        if (coupons[selectedCoupon].discountType == 'flat') {
            discount = coupons[selectedCoupon].discount;
        } else {
            discount = (total * coupons[selectedCoupon].discount) / 100;
        }
    }
    // console.log(coupons[selectedCoupon].discountType)


    return (
        <ScrollView style={{ marginBottom: 100 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isAddressVisible}
                onRequestClose={() => {
                    setIsAddressVisible(!isAddressVisible)
                }}>
                <View style={styles.centeredView}>
                    <FlatList
                        data={addresses}
                        ListHeaderComponent={<Text style={styles.title}>Select an Address</Text>}
                        renderItem={({ item }) => (
                            <AddressItem item={item} onBtn={() => {
                                setSelectedAddress(`${item.name} - ${item.phone}\n${item.house}, ${item.city}\n${item.pincode}`);
                                setIsAddressVisible(false);
                            }} isCheckOut />
                        )}
                        keyExtractor={(item, index) => index}
                        style={styles.modalView}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCouponVisible}
                onRequestClose={() => {
                    setIsCouponVisible(!isCouponVisible)
                }}>
                <View style={styles.centeredView}>
                    {coupons ?
                        <FlatList
                            data={Object.keys(coupons)}
                            ListHeaderComponent={<Text style={styles.title}>Select an Coupon</Text>}
                            ItemSeparatorComponent={<View
                                style={{
                                    height: 1,
                                    width: "100%",
                                    backgroundColor: "#000",
                                }}
                            />}
                            renderItem={({ item }) => {
                                return (
                                    <Text style={{
                                        marginHorizontal: 12,
                                        fontSize: txtSz,
                                        paddingVertical: 8,
                                        color: '#666'
                                    }}
                                        onPress={() => {
                                            setSelectedCoupon(item);
                                            setIsCouponVisible(false)
                                        }}>{item}</Text>
                                )
                            }}
                            keyExtractor={(item, index) => index}
                            style={styles.modalView}
                            showsVerticalScrollIndicator={false}
                        />
                        : null}
                </View>
            </Modal>
            <View style={styles.innerContainer}>
                <View style={styles.inlineBox}>
                    <Text style={styles.title}>Delivery Address</Text>
                    {/* <TouchableOpacity style={styles.addressBtn} onPress={() => { navigation.navigate('Profile', { screen: 'Address' }) }}> */}
                    <Text style={styles.txtBtnTxt} onPress={() => { setIsAddressVisible(!isAddressVisible) }}>Select Address</Text>
                    {/* </TouchableOpacity> */}
                </View>
                {selectedAddress ? <Text style={styles.address}>{selectedAddress}</Text> : null}
            </View>
            <View style={[styles.innerContainer, { maxHeight: 450 }]}>
                <Text style={styles.title}>Your Products</Text>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                    {
                        Object.values(cartItems).map((item, index) => (

                            <View style={styles.productCard} key={index}>
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
                <View style={styles.inlineBox}>
                    <Text style={styles.title}>Apply Coupon</Text>
                    {
                        selectedCoupon
                            ? <Text style={styles.txtBtnTxt} onPress={() => { setSelectedCoupon(null) }}>{selectedCoupon} Applied! ⨯</Text>
                            : <Text style={styles.txtBtnTxt} onPress={() => { requestCoupon() }}>Choose Coupon</Text>
                    }
                </View>
                {/* <TextInput placeholder='Enter your Coupon Code Here.' style={styles.couponBox} /> */}
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
                            <Text style={{ flex: .7, fontSize: midtxtSz }}>Discount: </Text>
                            <Text style={{ flex: .3, fontSize: midtxtSz }}>Rs. {discount}</Text>
                        </View>
                        : null
                }
                <View style={[styles.inlineBox, { borderTopWidth: 2, marginTop: 5, paddingTop: 5 }]}>
                    <Text style={{ flex: .7, fontSize: midtxtSz }}>Payable Amount: </Text>
                    <Text style={{ flex: .3, fontSize: midtxtSz, fontWeight: 'bold' }}>Rs. {total + extraCharges - discount}</Text>
                </View>
            </View>
            <TouchableNativeFeedback onPress={() => { payment() }}
                background={TouchableNativeFeedback.Ripple(
                    themeColor,
                    false,
                )}>
                <View style={styles.buyBtn}>
                    <Text style={styles.btnTxt}>Pay ₹{total + extraCharges - discount}</Text>
                </View>
            </TouchableNativeFeedback>

        </ScrollView >
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    modalView: {
        flexGrow: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: '90%',
        maxHeight: '65%',
        padding: 5
    },
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
        alignItems: 'stretch',
        alignItems: 'center',
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
    txtBtnTxt: {
        fontWeight: 'bold',
        color: themeColor,
        marginRight: 10,
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
        marginVertical: 20,
    },
    btnTxt: {
        fontSize: midtxtSz,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: themeColor
    }

})

export default CheckOut