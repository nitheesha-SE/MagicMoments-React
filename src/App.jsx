import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Geosuggest from 'react-geosuggest';
import HelloWorld from './components/hello-world';
import MyMapComponent from './components/my-map-component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <HelloWorld title="Nearby Grocery Stores" />
        <Geosuggest
          onSuggestSelect={suggest => {
            console.log(suggest.location.lat);
            console.log(suggest.location.lng);
          }}
        />
        <MyMapComponent />
      </>
    );
  }
}

export default hot(module)(App);
