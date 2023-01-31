import { View, Text } from 'react-native'
import React from 'react'

const OptionsMenu = ({ isVisible, setIsVisible, data, onClick }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setIsVisible(!isVisible)
            }}>
            <View style={styles.centeredView}>
                <FlatList
                    data={data}
                    ListHeaderComponent={<Text>Select an Address</Text>}
                    renderItem={({ item }) => (
                        <Text>{item}</Text>
                    )}
                    keyExtractor={(item, index) => index}
                    style={styles.modalView}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Modal>
    )
}

export default OptionsMenu