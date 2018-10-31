import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Heading from './components/heading-component';
import Map from './components/map-component';
import ShoppingList from './components/shopping-list-component';
import AddShoppingItem from './components/add-shopping-item-component';
import style from './App.css';
import SlalomIcon from './img/slalom-logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotifyFamily: false,
      showMessageWidget: false,
    };
    this.showNotifyFamilyRef = React.createRef();
    this.showMessageWidgetRef = React.createRef();

    // binding this globally so it can be called from a Maps callback
    this.onNearbyGroceryStores = this.onNearbyGroceryStores.bind(this);
    this.handleDisplayMessageWidget = this.handleDisplayMessageWidget.bind(
      this,
    );
    window.onNearbyGroceryStores = this.onNearbyGroceryStores;
    window.handleDisplayMessageWidget = this.handleDisplayMessageWidget;
  }

  onNearbyGroceryStores(isNearby) {
    if (isNearby) {
      this.setState({ showNotifyFamily: true });
      this.showNotifyFamilyRef.current.state.show = true;
    } else {
      this.setState({ showNotifyFamily: false });
      this.showNotifyFamilyRef.current.state.show = false;
    }
  }

  handleDisplayMessageWidget(show) {
    if (show) {
      this.setState({ showMessageWidget: true });
      this.showMessageWidgetRef.current.state.showMessageWidget = true;
    } else {
      this.setState({ showMessageWidget: false });
      this.showMessageWidgetRef.current.state.showMessageWidget = false;
    }
  }

  render() {
    return (
      <>
        <div className={style.wrapper}>
          <header>
            <Heading
              show={this.state.showNotifyFamily}
              ref={this.showNotifyFamilyRef}
            />
          </header>
          <map>
            <Map />
          </map>
          <shoppinglist>
            <ShoppingList
              showMessageWidget={this.state.showMessageWidget}
              ref={this.showMessageWidgetRef}
            />
          </shoppinglist>
          <searchlist>
            <AddShoppingItem />
          </searchlist>
          <footer>
            <img alt="Slalom" src={SlalomIcon} />
          </footer>
        </div>
      </>
    );
  }
}

export default hot(module)(App);
