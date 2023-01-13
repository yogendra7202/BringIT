import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed';

const themeColor = '#006699';
const themegrey = '#666';

const mostSearched = ["Puma", "Levi's", "Zara", "Puma", "Levi's", "Zara", "Puma", "Levi's", "Zara", "Puma", "Levi's", "Zara"]

function filter(filterName, index) {
    return (
        // <Switch value={filterName} />
        // <Icon name='add' style={styles.filters}>{filterName}</Icon>
        <TouchableOpacity style={styles.filter} key={index} onPress={() => fetchProducts(filterName)}>
            <Text style={styles.filterTxt}>{filterName}</Text>
        </TouchableOpacity>
    );
}

const Search = ({ navigation }) => {
    const [search, setSearch] = useState(null);

    function fetchProducts(keyword) {
        navigation.navigate('ProductList', { keyword })
        // console.log("Keyword ", keyword);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}
            // source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0yQXkF9Fts73EvqVBMOsz4pRrxMhcQ85pVMNY8gLmHuRs-THuLmzKcFntXLbeQCudvTU&usqp=CAU' }}
            >
                <Text style={styles.title}>Search</Text>
                <View style={styles.searchBarContainer}>
                    <TextInput style={styles.searchBar} onChangeText={(text) => { setSearch(text) }} />
                    <Icon name="search" style={styles.searchIcon} onPress={() => fetchProducts(search)} />
                </View>
            </View>
            <View style={styles.extra}>
                <Text style={styles.extraTxt}>Most Searched</Text>
                {/* <FlatList
                    contentContainerStyle={styles.filters}
                    data={mostSearched}
                    renderItem={({ item }) => (filter(item))}
                horizontal
                // flat
                // numColumns={3}
                /> */}
                <ScrollView contentContainerStyle={styles.filters}>
                    {mostSearched.map((item, index) => filter(item, index))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    header: {
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: themeColor,
        marginHorizontal: 35,
        height: 250,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#8099a4',
        marginVertical: 40
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        paddingBottom: 2,
        // marginTop: 20,
    },
    searchBar: {
        width: '90%',
        // backgroundColor: '#ddd',
        height: 50,
        height: 40,
        fontSize: 20,
    },
    searchIcon: {
        padding: 10
    },
    extra: {
    },
    extraTxt: {
        fontSize: 20,
        marginVertical: 15,
    },
    filters: {
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    filter: {
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

export default Search