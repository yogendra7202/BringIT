import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import WishlistItem from '../Components/WishlistItem'
import { connect } from 'react-redux'
import { midtxtSz } from '../theme';

export class Wishlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wishlist: null
    };
  }

  componentDidMount() {
    // console.log(this.state.wishlist);
    // console.log("+++01", this.props.wishlist)
    this.setState({ wishlist: this.props.wishlistState })
  }
  // componentDidUpdate() {
  //   // console.log("--", this.state.wishlist);
  //   console.log("--0", this.props.wishlist)

  // }

  render() {

    return (
      <View>
        {this.state.wishlist
          ? Object.keys(this.state.wishlist).length === 0
            ? <View style={styles.atCenter}>
              <Text>No Item in Wishlist.</Text>
              <Text style={styles.txtBtn} onPress={() => { this.props.navigation.navigate('Home') }}>
                Go to Home...
              </Text>
            </View>
            : <FlatList
              data={Object.values(this.state.wishlist)}
              renderItem={({ item, index }) => WishlistItem(item, Object.keys(this.state.wishlist)[index])}
              keyExtractor={(item, index) => index}
            // extraData={wishlist}
            />
          : <View style={styles.atCenter}><ActivityIndicator /></View>}
      </View>
    )
  }
}

function mapStateToProps(state) {
  console.log("State", state)
  return { wishlistState: state.WishListReducer.Wishlist }
}

const styles = StyleSheet.create({
  atCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  txtBtn: {
    fontSize: midtxtSz,
    color: 'purple',
    fontWeight: '800',
  }
})

export default connect(mapStateToProps, {})(Wishlist)