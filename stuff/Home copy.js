import { View, Text, StyleSheet, Dimensions, ScrollView, Image, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import slides from '../Data/slides';

const device_width = Dimensions.get("window").width;

const Home = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollRef = useRef();
    // const scrolling = useRef(new Animated.Value(0)).current;

    // const translation = scrolling.interpolate({
    //     inputRange: [0, 100],
    //     outputRange: [400, 800],
    //     extrapolate: 'clamp',
    // });

    // useEffect(() => {
    //     setInterval(() => {

    //         setSelectedIndex((selectedIndex) => selectedIndex <=3 ? selectedIndex + 1 : 0);

    //     Animated.timing(scrolling,{
    //         toValue: device_width*selectedIndex,
    //         duration: 250,
    //         useNativeDriver: true,
    //     }).start();

    //             // scrollRef.contentOffset={x : device_width*selectedIndex};
    //             // scrollX.setValue(device_width*selectedIndex);
    //             // scrolling.current.scrollIntoView()
    //             // handleScroll(scrollX);
    //             // console.log(scrolling);
    // //         // }
    //     }, 5000);
    // }, [])

    const setActivedot = (event) => {
        const activeIndex = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        // console.warn("++++++++++++++++++++++++++++++");
        // console.log(scrollRef.current)
        setSelectedIndex(activeIndex);
    }

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                // ref={scrolling}
                style={styles.slider}
                // contentOffset={{ x: 800 }}
                horizontal
                pagingEnabled
                // onScrollEndDrag={setActivedot}
                onMomentumScrollEnd={setActivedot}

                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                // onScroll={Animated.event(
                //     [{
                //         nativeEvent: {
                //             contentOffset: { x: scrolling }
                //         }
                //     }],
                //     {
                //         useNativeDriver: true
                //     }
                // )}
            >
                {
                    slides.map((image, i) => (
                        <Image key={i} source={{ uri: image }} style={styles.image} />
                    ))
                }
            </Animated.ScrollView>
            <View style={styles.pagination}>
                {
                    slides.map((image, i) => (
                        <Text
                            key={i}
                            style={i === selectedIndex ? styles.active_dot : styles.dot}>
                            &#11044;
                        </Text>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    slider: {
        width: device_width,
        height: 300,
    },
    image: {
        width: device_width,
        resizeMode: 'cover'
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        alignSelf: 'center'
    },
    dot: {
        color: '#ccffff',
        fontSize: 12,
        opacity: 0.5,
        marginHorizontal: 2
    },
    active_dot: {
        color: '#006699',
        marginHorizontal: 2
    }
})

export default Home