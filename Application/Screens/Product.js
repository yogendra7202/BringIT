import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AirbnbRating, Icon } from '@rneui/themed'
import Counter from '../Components/Counter'
import { lgtxtSz, themeColor, xlgtxtSz } from '../theme'


const Product = ({ route, navigation }) => {
    const item = route.params.data;
    const productID = route.params.productID;
    const [count, setCount] = useState(1);

    return (
        <View>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: '45%' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: lgtxtSz, fontWeight: 'bold' }}>{item.productName}</Text>
                <Text style={{ fontSize: xlgtxtSz, fontWeight: 'bold' }}>Rs.{item.price}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* <Text></Text> */}
                <Counter count={count} setCount={setCount} />
                <TouchableOpacity style={{
                    borderWidth: 1, borderRadius: 20, width: 120,
                    padding: 10, alignItems: 'center', alignSelf: 'flex-end'
                }}
                    onPress={() => { console.log('Hii') }}
                >
                    <Text>Add to Cart</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ margin: 10 }}>{item.description}</Text>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Rate the Product</Text>
                <AirbnbRating />
            </View>
            <Icon name='chevron-left' type='font-awesome' color={themeColor}
                containerStyle={{ position: 'absolute', overflow: 'hidden' }}
                onPress={() => navigation.goBack()}
                raised />
        </View>
    )
}

export default Product