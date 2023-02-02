import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { Component, useState } from 'react'
import { Icon } from '@rneui/themed';
import { fetchFSProducts } from '../FireBase/ProductOperations';
import BlankItem from '../Components/BlankItem';
import ProductItem from '../Components/ProductItem';
import { midtxtSz, themeColor } from '../theme';
import { connect } from 'react-redux';
import { addToCart, addToWishlist } from '../Redux/Actions';

const mostSearched = ["Bata", "Levi's", "Zara", "T-Shirt", "Bags"]

function searchFilter(filterName, index, onfilter) {
    return (
        <TouchableOpacity style={styles.searchFilter} key={index} onPress={() => onfilter()}>
            <Text style={styles.filterTxt}>{filterName}</Text>
        </TouchableOpacity>
    );
}

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchList: null,
            search: null
        };
        // this.myTextInput = React.createRef();
    }

    fetchProductList(keyword) {
        if (keyword == '') {
            this.setState({ searchList: null })
        } else {
            fetchFSProducts(keyword).then(data => {
                // console.log(data)
                this.setState({ searchList: data })
            }).catch(error => {
                console.log("Error in " + keyword, error)
            })
        }
    }

    // reset() {
    //     this.setState({ searchList: null })
    // }

    render() {

        return (
            <View>
                <View style={styles.searchBarContainer}>
                    <TextInput style={styles.searchBar}
                        // ref={this.myTextInput}
                        placeholder={'Search for product here...'}
                        value={this.state.search}
                        onChangeText={(text) => this.setState({ search: text })}
                        onSubmitEditing={() => this.fetchProductList(this.state.search)} />
                    <Icon
                        name={this.state.search ? 'close' : 'search'}
                        style={styles.searchIcon}
                        onPress={() => this.setState({ search: null })} />
                </View>
                {
                    this.state.searchList
                        ? this.state.searchList.length == 0
                            ? <BlankItem type={'search'} />
                            : <FlatList
                                data={this.state.searchList}
                                ListHeaderComponent={
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2' }}>
                                        <Text style={styles.subtitle}>
                                            Results for {this.state.search}
                                        </Text>
                                        <Icon name='close' onPress={() => this.setState({ searchList: null })} />
                                    </View>
                                }
                                renderItem={({ item }, index) => (
                                    <ProductItem
                                        type='search'
                                        key={index}
                                        item={item.product}
                                        productID={item.productId}
                                        onCard={(data) => {
                                            this.props.navigation.navigate('Product', { data })
                                            // console.log('first')
                                        }}
                                        onIcon={(data) => {
                                            this.props.addToWishlist(data);
                                        }}
                                        onBtn={(data) => {
                                            this.props.addToCart(data);
                                        }}
                                    />
                                )}
                                stickyHeaderIndices={[0]}
                                contentContainerStyle={[styles.extraMargin, { paddingBottom: 100 }]}
                                showsVerticalScrollIndicator={false}
                            />
                        : <View style={styles.extraMargin}>
                            <Text style={styles.subtitle}>Most Searched</Text>
                            <ScrollView contentContainerStyle={styles.filters}>
                                {
                                    mostSearched.map((item, index) =>
                                        searchFilter(item, index, () => {
                                            this.setState({ search: item })
                                            this.fetchProductList(item);
                                        })
                                    )}
                            </ScrollView>
                        </View>
                }
            </View>
        )
    }
}

export default connect(null, { addToCart, addToWishlist })(Search)

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: themeColor,
        marginVertical: 30,
        fontSize: 36,
    },
    searchBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        paddingBottom: 2,
        margin: 15,
        position: 'absolute',
        alignItems: 'center'
    },
    searchBar: {
        width: '90%',
        height: 50,
        height: 40,
    },
    searchIcon: {
        padding: 10,
        paddingLeft: 5
    },
    extraMargin: {
        marginTop: 80
    },
    subtitle: {
        fontSize: midtxtSz,
        fontWeight: '500',
        margin: 10,
    },
    filters: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    searchFilter: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 7,
        borderRadius: 25,
        alignItems: 'center'
    },
    filterTxt: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})