import { ScrollView } from 'react-native'
import React, { Component } from 'react'
import Slider from '../Components/Slider'
import CategoryList from '../Components/CategoryList';

export class Home extends Component {
  render() {
    return (
      <ScrollView>
        <Slider />
        <CategoryList title={'Shoes'} category={'shoes'} navigation={this.props.navigation} />
        {/* <ItemList title={'T-Shirts'} category={'t-shirts'} navigation={navigation} />
    <ItemList title={'Bags'} category={'bags'} navigation={navigation} />
    <ItemList title={'Laptops'} category={'laptops'} navigation={navigation} /> */}

      </ScrollView>
    );
  }
}

export default Home