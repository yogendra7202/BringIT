import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Card, Icon } from '@rneui/themed'
import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

async function addToWishlist(productID, item) {
  const uid = auth().currentUser.uid;
  await firestore().collection('wishlist').doc(uid)
    .set({ [productID]: item }, { merge: true })
    .then((res) => {
      console.log('Item added to Wishlist!');
    }).catch((error) => {
      console.log("Error...");
    });
}

function Item(item, productID, navigation) {
  // const [addedtoWishList, setaddedtoWishList] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Product', { item })} activeOpacity={0.8}>
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
        onPress={() => { addToWishlist(productID, item) }}
        containerStyle={styles.wishlistIcon}
        raised />
    </>
  );
}

const ItemList = ({ title, category, navigation }) => {

  const [categoryData, setCategoryData] = useState(null);

  if (!categoryData) {

    firestore()
      .collection('products')
      .doc(category)
      .get()
      .then(documentSnapshot => {
        // console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          // console.log('User data: ', documentSnapshot.data());
          setCategoryData(documentSnapshot.data().data);
        }
      });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {categoryData ?
        <FlatList
          data={categoryData}
          renderItem={
            ({ item }) => Item(item, category + item.id, navigation)
          }
          keyExtractor={item => item.id}
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

export default ItemList