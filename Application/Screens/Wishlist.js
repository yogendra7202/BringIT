import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { lgtxtSz, midtxtSz } from '../theme'
import { addToCart, removeFromWishlist } from '../Redux/Actions'
import ProductItem from '../Components/ProductItem'
import { device_width } from '../AppData'
import { Image } from 'react-native'
import BlankItem from '../Components/BlankItem'

export class Wishlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wishlist: null
    };
  }

  componentDidMount() {
    // console.log("+++01", this.props.wishlist)
    this.setState({ wishlist: this.props.wishlistState })
  }
  componentDidUpdate() {
    // console.log("--0", this.props.wishlistState == this.state.wishlist)
    if (this.props.wishlistState != this.state.wishlist)
      this.setState({ wishlist: this.props.wishlistState })
    // this.setState({ wishlist: this.props.wishlistState })

  }

  render() {

    return (
      <View>
        {this.state.wishlist
          ? Object.keys(this.state.wishlist).length === 0
            ? <BlankItem navigation={this.props.navigation} type={'wishlist'} />
            : <FlatList
              data={Object.values(this.state.wishlist)}
              renderItem={({ item, index }) =>
                <ProductItem
                  card={false}
                  item={item}
                  productID={Object.keys(this.state.wishlist)[index]}
                  onIcon={(data) => {
                    this.props.removeFromWishlist(data);
                  }}
                  onBtn={(data) => {
                    this.props.addToCart(data);
                  }}
                />
              }
              keyExtractor={(item, index) => index}
              style={{ marginBottom: 100 }}
            // extraData={wishlist}
            />
          : <View style={styles.atCenter}><ActivityIndicator /></View>}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { wishlistState: state.WishListReducer.Wishlist }
}

export default connect(mapStateToProps, { addToCart, removeFromWishlist })(Wishlist)

const styles = StyleSheet.create({
  atCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
})