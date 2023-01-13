import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed'

const Counter = ({ count, setCount }) => {

    // function updateBy(num) {
    //     return (setCount(count => count > 0 ? count + num : count));
    // }
    const increase = () => { setCount(count => count > 0 ? count + 1 : count) }
    const decrease = () => { setCount(count => count > 1 ? count - 1 : count) }

    return (
        <View style={styles.container}>
            <Icon name='minus' type='font-awesome' style={styles.icon} onPress={decrease} />
            <Text style={styles.count}>{count}</Text>
            <Icon name='plus' type='font-awesome' style={styles.icon} onPress={increase} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        borderWidth: 1,
        padding: 5
    },
    count: {
        fontSize: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    }
})

export default Counter