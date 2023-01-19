import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { midtxtSz, themeColor, txtSz } from '../theme';
import { Icon } from 'react-native-vector-icons/FontAwesome';

export class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addAddress: true
        }
    }
    render() {
        const addresses = []
        return (
            <ScrollView>
                {
                    this.state.addAddress
                        ? <View>
                            {/* <Icon  /> */}
                            <TextInput placeholder='Your Street' />
                        </View>
                        : null
                }
                <TouchableOpacity style={styles.addAddressBtn}
                    onPress={() => {
                        this.setState({ addAddress: !this.state.addAddress })
                    }}>
                    <Text style={styles.addAddressBtnTxt}>
                        {this.state.addAddress ? 'Submit Address' : 'Add New Address'}
                    </Text>
                </TouchableOpacity>
                {
                    addresses.map((item, index) => (
                        <View>
                            <Text>{item}</Text>
                            <TouchableOpacity>
                                <Text>Select</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}

export default Address

const styles = StyleSheet.create({
    addAddressBtn: {
        width: '90%',
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: themeColor,
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 150
    },
    addAddressBtnTxt: {
        fontSize: txtSz,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: themeColor
    }
})