import React, { Component } from 'react';
import style from './grocery-list.css';
import TodoItems from './TodoItems';

class GroceryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    const itemArray = this.state.items;

    if (this._inputElement.value !== '') {
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

  render() {
    return (
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
    );
  }
}

export default GroceryList;
