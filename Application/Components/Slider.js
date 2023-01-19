import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { device_width, slides } from '../AppData';
import { themeColor } from '../theme';

const Slider = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    setInterval(() => {

      setSelectedIndex((selectedIndex) => {

        selectedIndex = selectedIndex < slides.length - 1 ? selectedIndex + 1 : 0;

        scrollRef.current.scrollTo({
          animated: true,
          y: 0,
          x: device_width * selectedIndex,
        });

        return (selectedIndex);

      });

    }, 5000);
  }, [])

  const setActivedot = (event) => {
    const activeIndex = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setSelectedIndex(activeIndex);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.slider}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setActivedot}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={"fast"}
      >
        {
          slides.map((image, i) => (
            <Image key={i} source={{ uri: image }} style={styles.image} />
          ))
        }
      </ScrollView>
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
    marginBottom: 5,
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

export default Slider