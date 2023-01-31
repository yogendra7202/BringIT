import { Text, View } from 'react-native'
import React, { Component } from 'react'
import BlankItem from '../Components/BlankItem';

export class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: null
        }
    }
    render() {
        return (
            <View>
                {
                    this.state.orders
                        ? <Text>My Orders</Text>
                        : <BlankItem />
                }
            </View>
        )
    }
}

export default Order