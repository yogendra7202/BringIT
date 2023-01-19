import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ButtonGroup, color } from '@rneui/base';
import { categories } from '../AppData';
import { midtxtSz, themeColor, txtSz } from '../theme';

// const CategoryBtn = () => {
//     return(


//     )
// }

const CategoriesBtns = ({ onFilterChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    return (
        <View>
            {/* <ButtonGroup
                buttons={categories.map(category => category.toUpperCase())}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    value == selectedIndex
                        ? setSelectedIndex(-1)
                        : setSelectedIndex(value)
                }}
                containerStyle={{ marginVertical: 10 }}
            /> */}
            <FlatList
                data={categories}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[styles.categoryBtn, { backgroundColor: selectedIndex == index ? themeColor : '#fff' }]}
                        onPress={() => {
                            setSelectedIndex((prevSelectedIndex) => prevSelectedIndex == index ? -1 : index)
                            onFilterChange(item);
                        }}
                    >
                        <Text style={[styles.categoryBtnTxt, { color: selectedIndex == index ? '#fff' : themeColor }
                        ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
                contentContainerStyle={styles.container}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    categoryBtn: {
        padding: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: themeColor,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    categoryBtnSel: {
        backgroundColor: themeColor,
        color: '#fff',
    },
    categoryBtnTxt: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: txtSz
    }

})

export default CategoriesBtns