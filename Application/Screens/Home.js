import { Alert, BackHandler, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Slider from '../Components/Slider'
import CategoryList from '../Components/CategoryList';
import ProductList from '../Components/ProductList';
import CategoriesBtns from '../Components/CategoriesBtns';

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: null
    }
  }

  // handleBackButton = () => {
  //   Alert.alert(
  //     null,
  //     'Do you want to close.', [{
  //       text: 'Yes',
  //       onPress: () => BackHandler.exitApp()
  //     },
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel'
  //     },], {
  //     cancelable: false
  //   }
  //   )
  //   return true;
  // }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  // }

  render() {
    return (
      <ScrollView>
        <Slider />
        <CategoriesBtns onFilterChange={(category) => {
          this.setState(({ filter }) => {
            if (filter == category) {
              return { filter: null }
            } else {
              return { filter: category }
            }
            // ? return(category)
            // : return(category)
          })
        }} />
        <ProductList navigation={this.props.navigation} filter={this.state.filter} />
        {/* <CategoryList title={'Shoes'} category={'shoes'} navigation={this.props.navigation} /> */}
        {/* <ItemList title={'T-Shirts'} category={'t-shirts'} navigation={navigation} />
    <ItemList title={'Bags'} category={'bags'} navigation={navigation} />
    <ItemList title={'Laptops'} category={'laptops'} navigation={navigation} /> */}

      </ScrollView>
    );
  }
}

export default Home