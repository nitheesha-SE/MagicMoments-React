import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Geosuggest from 'react-geosuggest';
import HelloWorld from './components/hello-world';
import MyMapComponent from './components/my-map-component';
import GroceryList from './components/grocery-list';
import style from './App.css';
import SlalomIcon from './img/slalom-logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: { lat: 42.331014, lng: -83.07204000000002 },
    };
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.groceryListRef = React.createRef();
  }

  render() {
    return (
      <>
        <div className={style.wrapper}>
          <header>
            <HelloWorld
              title="AUTO"
              isGroceryStoreNearby={this.state.isGroceryStoreNearby}
              showTextFamily={this.state.showTextFamily}
            />
          </header>
          <article>
            <Geosuggest onSuggestSelect={this.onSuggestSelect} />
            <MyMapComponent
              mapCenter={this.state.mapCenter}
              onNearbyGroceryStores={this.onNearbyGroceryStores}
            />
          </article>
          <aside>
            <GroceryList ref={this.groceryListRef} />
          </aside>
          <footer>
            <img alt="Slalom" src={SlalomIcon} />
          </footer>
        </div>
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
