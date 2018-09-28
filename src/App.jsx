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
      isGroceryStoreNearby: 'Nothing nearby.',
      showTextFamily: false,
    };
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onNearbyGroceryStores = this.onNearbyGroceryStores.bind(this);
    // binding this globally so it can be called from a GMaps callback
    window.onNearbyGroceryStores = this.onNearbyGroceryStores;
  }

  render() {
    return (
      <>
        <HelloWorld
          title="Nearby Grocery Stores"
          isGroceryStoreNearby={this.state.isGroceryStoreNearby}
          showTextFamily={this.state.showTextFamily}
        />
        <Geosuggest onSuggestSelect={this.onSuggestSelect} />
        <MyMapComponent
          mapCenter={this.state.mapCenter}
          onNearbyGroceryStores={this.onNearbyGroceryStores}
        />
        <GroceryList
          ref={child => {
            this.groceryListRef = child;
          }}
        />
      </>
    );
  }

  onSuggestSelect(suggest) {
    this.setState({
      mapCenter: suggest.location,
    });
  }

  onNearbyGroceryStores(isNearby) {
    // debugger;
    console.log(this.groceryListRef.state.items);
    if (isNearby && this.groceryListRef.state.items.length > 0) {
      console.log('there are nearby grocery stores!');
      this.setState({
        isGroceryStoreNearby:
          'There are grocery stores nearby and you have items in your list.',
        showTextFamily: true,
      });
    } else if (isNearby) {
      this.setState({
        isGroceryStoreNearby: 'Grocery list is empty.',
        showTextFamily: false,
      });
    } else {
      this.setState({
        isGroceryStoreNearby: 'No grocery stores nearby.',
        showTextFamily: false,
      });
    }
  }
}

export default hot(module)(App);
