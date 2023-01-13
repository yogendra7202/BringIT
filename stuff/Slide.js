import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Slide = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/04/14/13/06/landscape-1328858_960_720.jpg' }}
        style={{uri: item[imageKey]}} />
      <Text style={styles.label}>{item.desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 20,
    height: 200,
    width: '100%',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20
  },
  label: {
    position: 'absolute',
    bottom: 25,
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    alignSelf: 'center',
    color: '#a9ff85',
    letterSpacing: 1,
  }
})

export default Slide