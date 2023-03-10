import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProductItem from '../Components/ProductItem';
import { removeFromCart } from '../Redux/Actions';
import { themeColor, txtSz, } from '../theme';
import BlankItem from '../Components/BlankItem';
import { updateFSCart } from '../FireBase/CartOperations';

export class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: null,
            qty: 0
        };
    }

    componentDidMount() {
        this.setState({ cart: this.props.cartState })
        this.props.setCartCount(this.props.totalQty)
    }
    componentDidUpdate() {
        if (this.props.cartState != this.state.cart) {
            this.setState({ cart: this.props.cartState })
            this.props.setCartCount(this.props.totalQty)
        }
    }
    componentWillUnmount() {
        updateFSCart(this.props.cartState);
    }

    render() {
        return (
            <View>
                {this.state.cart
                    ? Object.keys(this.state.cart).length === 0
                        ? <BlankItem onclick={() => { this.props.navigation.navigate('Home') }} type={'cart'} />
                        : <FlatList
                            data={Object.values(this.state.cart)}
                            // ListHeaderComponent={}
                            ListFooterComponent={() => (

                                <TouchableOpacity
                                    style={styles.checkoutBtn}
                                    onPress={() => { this.props.navigation.navigate('CheckOut', { cart: this.state.cart }) }}
                                >
                                    <Text style={styles.checkoutBtnTxt}>Check Out</Text>
                                </TouchableOpacity>
                            )}
                            renderItem={
                                ({ item, index }) =>
                                    <ProductItem
                                        card={false}
                                        type={'cart'}
                                        item={item}
                                        productID={Object.keys(this.state.cart)[index]}
                                        onCard={(data) => {
                                            this.props.navigation.navigate('Product', { data })
                                        }}
                                        onIcon={(data) => {
                                            this.props.removeFromCart(data);
                                        }}
                                        onBtn={(data) => {
                                            alert("Hii Icon")
                                        }}
                                    />
                            }
                            keyExtractor={(item, index) => index}
                            style={{ marginBottom: 100 }}
                        // contentContainerStyle={{  }}
                        />

                    : <View style={styles.atCenter}><ActivityIndicator /></View>
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    // console.log('state', state.CartReducer.Cart)
    let tQty = null;
    Object.values(state.CartReducer.Cart).forEach((item) => {
        tQty += item.qty;
    });

    return { cartState: state.CartReducer.Cart, totalQty: tQty }
}

export default connect(mapStateToProps, { removeFromCart })(Cart)

const styles = StyleSheet.create({
    atCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    checkoutBtn: {
        borderWidth: 2,
        borderColor: themeColor,
        paddingHorizontal: 60,
        paddingVertical: 16,
        alignSelf: 'center',
        alignItems: 'center',
        margin: 10,
    },
    checkoutBtnTxt: {
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: txtSz,
        color: themeColor,
        textTransform: 'uppercase',
    }
});