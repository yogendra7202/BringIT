import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { fetchAllFSProducts, fetchFSProducts } from '../FireBase/ProductOperations'
import ProductItem from './ProductItem';
import { useDispatch } from 'react-redux';
import { addToCart, addToWishlist } from '../Redux/Actions';


// const usePreviousValue = value => {
//     const ref = useRef();
//     useEffect(() => {
//         ref.current = value;
//     });
//     return ref.current;
// };

const ProductList = ({ navigation, filter }) => {
    const dispatch = useDispatch();
    const [productList, setProductList] = useState(null);
    const [keys, setKeys] = useState(null);

    const ref = useRef();

    useEffect(() => {
        if (!productList) {

            fetchAllFSProducts().then(({ ids, data }) => {
                setKeys(ids);
                setProductList(data);
                ref.current = data;
            });

        }
        else {
            if (filter && ref.prevfilter != filter) {
                setProductList(ref.current.filter(product => product.category.includes(filter)))
            } else if (ref.prevfilter != filter) {
                setProductList(ref.current);
            }
        }
        ref.prevfilter = filter;
    });

    // if (!productList) {
    //     // if (keyword) {
    //     //     fetchFSProducts(keyword).then((data) => {
    //     //         setProductList(data);
    //     //     });
    //     // } else {
    //     fetchAllFSProducts().then(({ ids, data }) => {
    //         setKeys(ids);
    //         setProductList(data);
    //     });
    //     // }

    // } else {
    //     // console.log(productList != productList.filter(product => product.category.includes(filter)))
    //     if (filter && prevfilter != filter) {
    //         //     // setProductList(productList.filter(product => product.category.includes(filter)))
    //         console.log(productList.filter(product => product.category.includes(filter)))
    //     }
    // }

    return (
        <View>
            {
                productList
                    ?
                    // productList.map(item => <ProductItem item={item} />)

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginBottom: 100,
                    }}>
                        {
                            productList.map((item, index) => (
                                <ProductItem
                                    key={index}
                                    card
                                    item={item}
                                    productID={keys[index]}
                                    onCard={(data) => {
                                        navigation.navigate('Product', { data })
                                    }}
                                    onIcon={(data) => {
                                        dispatch(addToWishlist(data));
                                    }}
                                    onBtn={(data) => {
                                        dispatch(addToCart(data));
                                    }}
                                />
                            ))
                        }
                    </View>

                    // <FlatList
                    //     data={productList}
                    //     renderItem={({ item, index }) => (
                    //         <ProductItem
                    //             card
                    //             item={item}
                    //             productID={keys[index]}
                    //             onCard={(data) => {
                    //                 navigation.navigate('Product', { data })
                    //             }}
                    //             onIcon={(data) => {
                    //                 dispatch(addToWishlist(data));
                    //             }}
                    //             onBtn={(data) => {
                    //                 dispatch(addToCart(data));
                    //             }}
                    //         />
                    //     )}
                    //     keyExtractor={(item, index) => index}
                    //     numColumns={2}
                    //     style={{ marginBottom: 100 }}
                    // // nestedScrollEnabled
                    // />
                    : <ActivityIndicator />
            }
        </View>
    )
}

export default ProductList