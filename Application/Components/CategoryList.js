import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Card, Icon } from '@rneui/themed'
import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { addToFSWishlist } from '../FireBase/WishlistOperations'
import { addToWishlist } from '../Redux/Actions'
import { useDispatch } from 'react-redux'

function Item({ item, productID, onaddWishist, navigation }) {

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Product', { productID, item })} activeOpacity={0.8}>
        <Card containerStyle={styles.card}>
          <Card.Image source={{ uri: item.image }} style={styles.image} />
          <Card.Title numberOfLines={2}>{item.productName}</Card.Title>
          <View style={styles.details}>
            <Text style={styles.priceDetail}>${item.price}</Text>
            <Text style={styles.extraDetail}>Color: {item.color + "\n"} Size: {item.size}</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Icon name='heart' type='font-awesome-5' size={15} color={"#000"}
        onPress={() => { onaddWishist({ productID, item }) }}
        containerStyle={styles.wishlistIcon}
        raised />
    </>
  );
}

const CategoryList = ({ title, category, navigation }) => {

  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState(null);
  const [keys, setKeys] = useState([]);

  if (!categoryData) {

    firestore()
      .collection('products')
      .where('category', '==', category)
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot.docs.map((doc) => doc.id))
        setKeys(querySnapshot.docs.map((doc) => doc.id));
        setCategoryData(querySnapshot.docs.map((doc) => doc.data()));
        console.log("Products Fetched");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {categoryData ?
        <FlatList
          data={categoryData}
          renderItem={
            ({ item, index }) => {
              //   Item(item, onaddWishist= { 
              //   const productID = keys[index];
              //   dispatch(addToWishlist({ productID, item }));
              //  } , navigation)
              return (
                <Item item={item} productID={keys[index]} onaddWishist={(data) => {
                  dispatch(addToWishlist(data));
                }} navigation={navigation} />
              )
            }
          }
          keyExtractor={(item, index) => index}
          style={styles.list}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        // <AirbnbRating />
        : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  list: {
    marginHorizontal: 10,
    marginVertical: 8
  },
  card: {
    padding: 5,
    margin: 8,
    borderRadius: 15,
    width: 150
  },
  image: {
    borderRadius: 10,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 11,
    paddingHorizontal: 20,
    color: '#fff',
    backgroundColor: '#006699',
  },
  details: {
    color: '#222',
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  priceDetail: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  extraDetail: {
    fontSize: 9
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    overflow: 'hidden',
  },
})

export default CategoryList