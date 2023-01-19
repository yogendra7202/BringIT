import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed'
import { smtxtSz, themeColor, txtSz } from '../theme'

const Counter = ({ count, setCount }) => {

    // console.log(count)
    // function updateBy(num) {
    //     return (setCount(count => count > 0 ? count + num : count));
    // }
    const increase = () => { setCount(count => count > 0 ? count + 1 : count) }
    const decrease = () => { setCount(count => count > 1 ? count - 1 : count) }

    return (
        <View style={styles.container}>
            <Icon name='minus' type='font-awesome' size={smtxtSz} color={themeColor} style={styles.icon} onPress={decrease} />
            <Text style={styles.count}>{count}</Text>
            <Icon name='plus' type='font-awesome' size={smtxtSz} color={themeColor} style={styles.icon} onPress={increase} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        borderColor: themeColor,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5
    },
    count: {
        fontSize: 20,
        fontWeight: '800',
        color: '#666',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    }
})

export default Counter