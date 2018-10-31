import React, { Component } from 'react';
import style from './add-shopping-item.css';

const buttonText = 'Add More Items';

class AddShoppingItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: buttonText,
      filteredRecentlyAddedItems: [],
      recentlyAddedItems: [],
    };
    fetch('/api/shoppingList/recentlyAdded')
      .then(response => response.json())
      .then(data => {
        this.setState({
          recentlyAddedItems: data.data,
        });
      });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (event.currentTarget && event.currentTarget.value) {
      fetch(
        '/api/shoppingList/recentlyAdded?query=' + event.currentTarget.value,
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            filteredRecentlyAddedItems: data.data,
          });
        });
    }
  }

  handleClick() {
    if (this.state.value === buttonText) {
      this.setState({ value: '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('/api/shoppingList', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: event.currentTarget[0].value,
        ownerName: 'Me',
      }),
    }).then(() => this.setState({ value: buttonText }));
  }

  handleItemSelect(item) {
    fetch('/api/shoppingList', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: item.text,
        ownerName: 'Me',
      }),
    }).then(() =>
      this.setState({
        value: 'Add More Items',
        filteredRecentlyAddedItems: [],
      }),
    );
  }

  render() {
    return (
      <>
        <div className={style.container}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className={style.textbox}
              value={this.state.value}
              onChange={this.handleChange}
              onClick={this.handleClick}
            />
          </form>
          {this.state.filteredRecentlyAddedItems.length === 0 && (
            <div>
              <div
                style={{
                  'font-family': 'Nova Flat',
                  'font-size': '12px',
                  'padding-left': '5px',
                  'padding-top': '5px',
                }}
              >
                Recently Added Items
              </div>
              <div className={style.box}>
                {this.state.recentlyAddedItems.map((item, index) => (
                  <div
                    onClick={() => {
                      this.handleItemSelect(item);
                    }}
                    onKeyPress={() => {
                      this.handleItemSelect(item);
                    }}
                    role="button"
                    tabIndex={index}
                    key={item.key}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={style.resultsContainer}>
            {this.state.filteredRecentlyAddedItems.map((item, index) => (
              <div
                className={style.resultsItem}
                onClick={() => {
                  this.handleItemSelect(item);
                }}
                onKeyPress={() => {
                  this.handleItemSelect(item);
                }}
                role="button"
                tabIndex={index}
                key={item.key}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

AddShoppingItem.propTypes = {};

export default AddShoppingItem;
