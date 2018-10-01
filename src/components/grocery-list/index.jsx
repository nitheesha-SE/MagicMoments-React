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
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  addItem(e) {
    const itemArray = this.state.items;

    if (this._inputElement.value !== '') {
      this.addNotification(this._inputElement.value);

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

  addNotification(groceryItemName) {
    const guid = Date.now();
    return this.setState(prevState => ({
      notifications: prevState.notifications.add({
        message: groceryItemName + ` added to grocery list!`,
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

  removeNotification(count) {
    this.setState(prevState => ({
      notifications: prevState.notifications.filter(n => n.key !== count),
    }));
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
            <div>Family Grocery List</div>
            <form onSubmit={this.addItem}>
              <input
                ref={a => {
                  this._inputElement = a;
                  return this._inputElement;
                }}
                placeholder="enter task"
              />
              <button type="submit">add</button>
            </form>
          </div>

          <TodoItems entries={this.state.items} delete={this.deleteItem} />
        </div>
      </>
    );
  }
}

export default GroceryList;
