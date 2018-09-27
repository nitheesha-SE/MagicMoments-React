import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Geosuggest from 'react-geosuggest';
import HelloWorld from './components/hello-world';
import MyMapComponent from './components/my-map-component';
import GroceryList from './components/grocery-list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: { lat: 42.331014, lng: -83.07204000000002 },
    };
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  render() {
    return (
      <>
        <HelloWorld title="Nearby Grocery Stores" />
        <Geosuggest onSuggestSelect={this.onSuggestSelect} />
        <MyMapComponent mapCenter={this.state.mapCenter} />
        <GroceryList />
      </>
    );
  }

  onSuggestSelect(suggest) {
    this.setState({
      mapCenter: suggest.location,
    });
  }
}

export default hot(module)(App);
