import { View, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import WishlistItem from '../Components/WishlistItem';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);

  const uid = auth().currentUser.uid;
  const docRef = firestore().collection('wishlist').doc(uid);


  if (!wishlist) {

    docRef.get().then(documentSnapshot => {
      console.log('Wishlist exists: ', documentSnapshot.exists);

      if (documentSnapshot.exists) {
        // console.log('Wishlist data: ', documentSnapshot.data());
        setWishlist(documentSnapshot.data());
      }
    });

  }

  return (
    <View>
      {wishlist
        ?
        // <WishlistItem item={{
        //   color: "yellow",
        //   id: 3,
        //   image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600",
        //   price: 27,
        //   productName: "Sparx Mens Shoe",
        //   size: 10
        // }} />
        <FlatList
          data={Object.values(wishlist)}
          renderItem={({ item, index }) => WishlistItem(item, Object.keys(wishlist)[index])}
          keyExtractor={(item, index) => index}
        // extraData={wishlist}
        />
        : <View style={{ alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>}
    </View>
  );
}

export default Wishlist