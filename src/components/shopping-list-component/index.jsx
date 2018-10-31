/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleRemoveItem"] }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bellIcon from './img/bell-icon.png';
import phoneIcon from './img/phone-icon.png';
import removeItemIcon from './img/remove-item-icon.png';
import style from './shopping-list.css';

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [], showMessageWidget: props.showMessageWidget };

    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleTextFamily = this.handleTextFamily.bind(this);
    this.handleClickNotifyIcon = this.handleClickNotifyIcon.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.getShoppingList(), 1000);
  }

  /* eslint-disable no-param-reassign */
  async getShoppingList() {
    fetch('/api/shoppingList')
      .then(response => response.json())
      .then(data => {
        data.data.map((item, index) => {
          item.showDeleteButton = this.state.items[index]
            ? this.state.items[index].showDeleteButton
            : false;
          return item;
        });

        this.setState({
          items: data.data,
        });
      });
  }

  handleClickItem(item, index) {
    item.showDeleteButton = !item.showDeleteButton;
    this.state.items[index] = item;
    this.forceUpdate();
  }

  handleRemoveItem(itemName) {
    fetch('/api/shoppingList', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: itemName,
      }),
    }).then(() => {
      // hide all delete buttons
      this.setState(prevState => ({
        items: prevState.items.map(item => {
          item.showDeleteButton = false;
          return item;
        }),
      }));
    });
  }

  handleTextFamily(event) {
    if (event.key === 'Enter') {
      fetch('/api/shoppingList/notifyFamily', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: event.currentTarget.value,
        }),
      })
        .then(response => response.json())
        .then(() => {
          this.setState({ showMessageWidget: false });
        });
    }
  }

  handleClickNotifyIcon() {
    window.handleDisplayMessageWidget(!this.state.showMessageWidget);
  }

  render() {
    const itemNameAndOwnerWrapperStyle = showDeleteButton => ({
      display: 'inline-block',
      width: showDeleteButton ? '50%' : '100%',
      height: '100%',
    });

    return (
      <>
        <div className={style.heading}>
          <div className={style.one}>Shopping List</div>
          <div className={style.icon}>
            <img width="35px" src={phoneIcon} alt="call" />{' '}
          </div>
          <div className={style.icon}>
            <img
              width="35px"
              src={bellIcon}
              alt="notify"
              onClick={this.handleClickNotifyIcon}
              onKeyPress={this.handleClickNotifyIcon}
            />{' '}
            {this.state.showMessageWidget && (
              <div
                style={{
                  'z-index': '1',
                  position: 'absolute',
                  width: '440px',
                  height: '200px',
                  background: 'red',
                  'background-image':
                    'linear-gradient(to bottom, white, rgb(220, 220, 220))',
                  border: '1px solid rgb(224, 223, 224)',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    'font-family': 'Nova Flat',
                    'font-size': '18px',
                    color: 'rgb(88,88,88)',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      width: '100px',
                      'padding-left': '80px',
                      'padding-right': '5px',
                      'text-align': 'right',
                    }}
                  >
                    To:
                  </span>
                  <input
                    type="text"
                    className={style.textbox}
                    defaultValue="18005555555"
                  />
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    'font-family': 'Nova Flat',
                    'font-size': '18px',
                    color: 'rgb(88,88,88)',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      width: '100px',
                      'padding-left': '38px',
                      'padding-right': '5px',
                      'text-align': 'right',
                      'vertical-align': 'top',
                    }}
                  >
                    Message:
                  </span>
                  <textarea
                    className={style.textarea}
                    onKeyPress={this.handleTextFamily}
                    defaultValue="Would you like anything from the store?"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={style.itemWrapper}>
          {this.state.items.map((shoppingItem, index) => (
            <div key={shoppingItem.key} className={style.item}>
              <div
                style={itemNameAndOwnerWrapperStyle(
                  shoppingItem.showDeleteButton,
                )}
                onClick={() => this.handleClickItem(shoppingItem, index)}
                onKeyPress={() => this.handleClickItem(shoppingItem, index)}
                role="button"
                tabIndex={index}
              >
                <div className={style.itemName}>{shoppingItem.text}</div>
                <div className={style.itemOwner}>
                  {shoppingItem.ownerName}
                  <span className={style.dot} />
                </div>
              </div>
              {shoppingItem.showDeleteButton && (
                <div
                  className={style.removeItemWrapper}
                  onClick={() => this.handleRemoveItem(shoppingItem.text)}
                  onKeyPress={() => this.handleRemoveItem(shoppingItem.text)}
                  role="button"
                  tabIndex={index}
                  value={shoppingItem.text}
                >
                  {' '}
                  <img width="40px" src={removeItemIcon} alt="remove" />{' '}
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
}

ShoppingList.propTypes = {
  showMessageWidget: PropTypes.bool,
};

export default ShoppingList;
