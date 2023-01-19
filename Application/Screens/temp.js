
// import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { midtxtSz } from '../theme'
// import WishlistItem from '../Components/WishlistItem'

// const Wishlist = () => {
//   const wishlist = useSelector((state) => state.WishListReducer.Wishlist)
//   // console.log("He--------", wishlist)
//   return (
//     <View>
//       {wishlist
//         ? Object.keys(wishlist).length === 0
//           ? <View style={styles.atCenter}>
//             <Text>No Item in Wishlist.</Text>
//             <Text style={styles.txtBtn} onPress={() => { this.props.navigation.navigate('Home') }}>
//               Go to Home...
//             </Text>
//           </View>
//           : <FlatList
//             data={Object.values(wishlist)}
//             renderItem={({ item, index }) => WishlistItem(item, Object.keys(wishlist)[index])}
//             keyExtractor={(item, index) => index}
//           // extraData={wishlist}
//           />
//         : <View style={styles.atCenter}><ActivityIndicator /></View>}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   atCenter: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   txtBtn: {
//     fontSize: midtxtSz,
//     color: 'purple',
//     fontWeight: '800',
//   }
// })

// export default Wishlist


// const mapDispatchToProps = (dispatch) => ({
//     requestUser: () => dispatch(requestUser()),
//     requestUsers: () => dispatch(requestUsers()),
//     receiveUsers: (users) => dispatch(receiveUsers(users)),
//     receiveUser: (user) => dispatch(receiveUser(user)),
//     refreshAll: (users) => dispatch(refreshAll(users))
//   });