import React from 'react';
import PropTypes from 'prop-types';
import style from './heading.css';

class Heading extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: props.show };

    this.handleTextFamily = this.handleTextFamily.bind(this);
    this.handleHideNotification = this.handleHideNotification.bind(this);
  }

  handleTextFamily() {
    this.setState({
      show: false,
    });
    window.handleDisplayMessageWidget(true);
  }

  handleHideNotification() {
    this.setState({
      show: false,
    });
  }

  render() {
    const notification = this.state.show ? (
      <div className={style.heading}>
        <div className={style.message}>
          You are at a store. Notify your family?
        </div>
        <div className={style.buttonContainer}>
          <button
            className={style.button}
            onClick={this.handleTextFamily}
            type="button"
          >
            Yes
          </button>
        </div>
        <div className={style.buttonContainer}>
          <button
            className={style.button}
            onClick={this.handleHideNotification}
            type="button"
          >
            Ignore
          </button>
        </div>
      </div>
    ) : (
      <div />
    );

    return notification;
  }
}

Heading.propTypes = {
  show: PropTypes.bool,
};

export default Heading;
