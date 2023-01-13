import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: null
        };
    }

    // componentDidMount() {

    //     const uid = auth().currentUser.uid;
    //     const docRef = firestore().collection('cart').doc(uid);

    //     docRef.onSnapshot((doc) => {
    //         if (doc.exists) {
    //             console.log("Cart Changed.");
    //             setCart(doc.data());
    //             setCartCount(Object.keys(doc.data()).length);
    //         }
    //     });
    // }

    // componentWillUnmount(){

    // }

    render() {
        return (
            <View>
                {this.state.cart
                    ? <FlatList
                        data={Object.values(this.state.cart)}
                        renderItem={({ item, index }) => CartItem(item.product, Object.keys(this.state.cart)[index])}
                        keyExtractor={(item, index) => index}
                    />
                    : <View style={styles.atCenter}><ActivityIndicator /></View>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    atCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});

export default Cart