import React, { Component } from 'react';
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';
import style from './grocery-list.css';
import TodoItems from './TodoItems';

class GroceryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      notifications: OrderedSet(),
      groceryStoresNearbyNotificationKey: null,
    };

    // refs
    this.groceryListRef = React.createRef();

    // binds
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.itemAddNotification = this.itemAddNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.groceryStoresNearbyNotification = this.groceryStoresNearbyNotification.bind(
      this,
    );
    // binding this globally so it can be called from a GMaps callback
    this.onNearbyGroceryStores = this.onNearbyGroceryStores.bind(this);
    window.onNearbyGroceryStores = this.onNearbyGroceryStores;
  }

  componentDidMount() {
    setInterval(() => this.getShoppingList(), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items.length > this.state.items.length) {
      const prevItemSet = new Set();
      prevState.items.forEach(element => prevItemSet.add(element.text));
      this.state.items.forEach(value => prevItemSet.delete(value.text));
      prevItemSet.forEach(value => this.itemDeletedNotification(value));
    }

    if (prevState.items.length < this.state.items.length) {
      const newItemSet = new Set();
      this.state.items.forEach(element => newItemSet.add(element.text));
      prevState.items.forEach(value => newItemSet.delete(value.text));
      newItemSet.forEach(value => this.itemAddNotification(value));
    }
  }

  async getShoppingList() {
    fetch('/api/shoppingList')
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.data,
        });
      });
  }

  addItem(e) {
    const itemArray = this.state.items;

    if (this._inputElement.value !== '') {
      this.itemAddNotification(this._inputElement.value);

      itemArray.unshift({
        text: this._inputElement.value,
        key: Date.now(),
      });

      this.setState({
        items: itemArray,
      });

      this._inputElement.value = '';
    }
    console.log(itemArray);
    e.preventDefault();
  }

  deleteItem(key) {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.key !== key),
    }));
  }

  itemAddNotification(groceryItemName) {
    const guid = Date.now() + Math.random();
    return this.setState(prevState => ({
      notifications: prevState.notifications.add({
        message: groceryItemName + ` added to shopping list!`,
        key: guid,
        action: 'Dismiss',
        dismissAfter: 5000,
        onClick: (notification, deactivate) => {
          deactivate();
          this.removeNotification(guid);
        },
      }),
    }));
  }

  itemDeletedNotification(groceryItemName) {
    const guid = Date.now() + Math.random();
    return this.setState(prevState => ({
      notifications: prevState.notifications.add({
        message: groceryItemName + ` has been deleted from the shopping list!`,
        key: guid,
        action: 'Dismiss',
        dismissAfter: 5000,
        onClick: (notification, deactivate) => {
          deactivate();
          this.removeNotification(guid);
        },
      }),
    }));
  }

  groceryStoresNearbyNotification(isNearby) {
    const guid = Date.now() + Math.random();
    const notification = {
      message: 'There are grocery stores nearby!',
      key: guid,
      action: 'Text Family?',
      dismissAfter: false,
      onClick: (currentNotification, deactivate) => {
        fetch('/api/shoppingList/notifyFamily', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message:
              "I'm at a grocery store! Add to the " +
              'family shopping list if you would like anything!',
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            deactivate();
            this.removeNotification(guid);
          });
      },
    };

    if (
      isNearby &&
      this.state.notifications.get(
        this.state.groceryStoresNearbyNotificationKey,
      ) == null
    ) {
      return this.setState(prevState => ({
        groceryStoresNearbyNotificationKey: notification,
        notifications: prevState.notifications.add(notification),
      }));
    }
    if (!isNearby) {
      return this.removeNotification(
        this.state.groceryStoresNearbyNotificationKey,
      );
    }
    return null;
  }

  removeNotification(count) {
    this.setState(prevState => ({
      notifications: prevState.notifications.filter(n => n.key !== count),
    }));
  }

  onNearbyGroceryStores(isNearby) {
    if (isNearby && this.state.items.length > 0) {
      return this.groceryStoresNearbyNotification(isNearby);
    }
    return this.removeNotification(
      this.state.groceryStoresNearbyNotificationKey.key,
    );
  }

  render() {
    return (
      <>
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={notification =>
            this.setState(prevState => ({
              notifications: prevState.notifications.delete(notification),
            }))
          }
        />
        <div className={style.todoListMain}>
          <div className={style.header}>
            <div className={style.familyShoppingListHeader}>Shopping List</div>
          </div>

          <TodoItems
            entries={this.state.items}
            delete={this.deleteItem}
            ref={this.groceryListRef}
          />
        </div>
      </>
    );
  }
}

export default GroceryList;
