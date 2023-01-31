import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { midtxtSz, themeColor, txtSz, xlgtxtSz } from '../theme';
import { connect } from 'react-redux';
import { addAnAddress, removeAnAddress } from '../Redux/Actions';
import BlankItem from '../Components/BlankItem';
import { FAB, Icon } from '@rneui/base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { toastAlert } from '../custom'
import { updateFAUserAddress } from '../FireBase/UserOperations';
import AddressItem from '../Components/AddressItem';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingAddress: false,
            addresses: [],
            address: { name: null, house: null, city: null, pincode: null, phone: null }
        }
    }

    componentDidMount() {
        this.setState({ addresses: this.props.addressState });
    }
    componentDidUpdate() {
        // console.log(this.props)
        if (this.props.addressState.length != this.state.addresses.length) {
            this.setState({ addresses: this.props.addressState })
        }
    }

    onSubmit = () => {
        if (Object.values(this.state.address).includes('') || Object.values(this.state.address).includes(null)) {
            Alert.alert('', 'Please Enter All Details.', null);
        } else {
            this.props.addAnAddress(this.state.address);
            this.setState({ addingAddress: false });
        }
    }

    // onRemove = () => {
    // if (Object.values(this.state.address).includes('') || Object.values(this.state.address).includes(null)) {
    //     Alert.alert('', 'Please Enter All Details.', null);
    // } else {
    // this.props.removeAnAddress();
    // this.setState({ addingAddress: false });
    // }
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.addingAddress
                        ? <ScrollView>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <Text style={styles.title}>Enter your Details</Text>
                                <Icon name={'close'} type={'Material-Icon'}
                                    onPress={() => { this.setState({ addingAddress: false }) }} size={xlgtxtSz} raised />
                            </View>
                            <View style={styles.inputBox}>
                                <MaterialIcon name="person" size={xlgtxtSz} style={styles.inputIcon} />
                                <TextInput
                                    placeholder='Your Name'
                                    style={styles.inputField}
                                    onChangeText={(txt) => {
                                        this.setState(prevState => (
                                            { address: { ...prevState.address, name: txt } }
                                        ))
                                    }}
                                />
                            </View>

                            <View style={styles.inputBox}>
                                <MaterialIcon name="home" size={xlgtxtSz} style={styles.inputIcon} />
                                <TextInput
                                    placeholder='Your House or Lane No.'
                                    style={styles.inputField}
                                    onChangeText={(txt) => {
                                        this.setState(prevState => (
                                            { address: { ...prevState.address, house: txt } }
                                        ))
                                    }}
                                    on />
                            </View>

                            <View style={styles.inputBox}>
                                <MaterialIcon name="location-city" size={xlgtxtSz} style={styles.inputIcon} />
                                <TextInput
                                    placeholder='Your City & State'
                                    style={styles.inputField}
                                    onChangeText={(txt) => {
                                        this.setState(prevState => (
                                            { address: { ...prevState.address, city: txt } }
                                        ))
                                    }} />
                            </View>

                            <View style={styles.inputBox}>
                                <MaterialIcon name="location-on" size={xlgtxtSz} style={styles.inputIcon} />
                                <TextInput
                                    placeholder='Your Pincode'
                                    keyboardType="numeric"
                                    style={styles.inputField}
                                    onChangeText={(txt) => {
                                        this.setState(prevState => (
                                            { address: { ...prevState.address, pincode: txt } }
                                        ))
                                    }} />
                            </View>

                            <View style={styles.inputBox}>
                                <MaterialIcon name="phone" size={xlgtxtSz} style={styles.inputIcon} />
                                <TextInput
                                    placeholder='Your Phone No.'
                                    keyboardType="numeric"
                                    style={styles.inputField}
                                    onChangeText={(txt) => {
                                        this.setState(prevState => (
                                            { address: { ...prevState.address, phone: txt } }
                                        ))
                                    }} />
                            </View>
                            <TouchableOpacity style={styles.submitBtn}
                                onPress={() => {
                                    this.onSubmit();
                                }}
                            >
                                <Text style={styles.submitBtnTxt}>Submit Address</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        : this.state.addresses.length == 0
                            ? <BlankItem onclick={() => { this.setState({ addingAddress: !this.state.addingAddress }) }}
                                type={'address'} />
                            : <FlatList
                                data={this.state.addresses}
                                // style={styles.modalView}
                                ListHeaderComponent={<Text style={styles.title}>Your Addresses</Text>}
                                renderItem={({ item, index }) => (
                                    <AddressItem item={item} onBtn={() => { this.props.removeAnAddress(index) }} />
                                )}
                                keyExtractor={(item, index) => index}
                                contentContainerStyle={{ paddingBottom: 135 }}
                            />
                }

                <FAB
                    visible={!this.state.addingAddress}
                    onPress={() => {
                        this.setState({ addingAddress: !this.state.addingAddress })
                    }}
                    placement="right"
                    title="Add Address"
                    icon={{ name: 'plus-circle', type: 'font-awesome', color: 'white' }}
                    color={themeColor}
                    style={{ bottom: 100 }}
                />
            </View>
        )
    }
}
function mapStateToProps(state) {
    // console.log(state.AddressReducer)
    return { addressState: state.AddressReducer.addresses }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAnAddress: (data) => dispatch(addAnAddress(data)),
        removeAnAddress: (data) => dispatch(removeAnAddress(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Address)

const styles = StyleSheet.create({
    title: {
        fontSize: xlgtxtSz,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
        borderColor: themeColor,
        borderBottomWidth: 2,
        borderRadius: 5
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 12,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
    },
    inputIcon: {
        marginHorizontal: 8
    },
    inputField: {
        fontSize: txtSz,
        fontWeight: '700',
        letterSpacing: 1,
        width: '90%',
        color: '#666',
    },
    submitBtn: {
        marginVertical: 30,
        paddingHorizontal: 45,
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: themeColor,
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
    },
    submitBtnTxt: {
        fontSize: midtxtSz,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: themeColor
    }
})