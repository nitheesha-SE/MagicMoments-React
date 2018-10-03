import React from 'react';
import PropTypes from 'prop-types';
import style from './heading.css';

const Heading = ({ title }) => (
  <>
    <div className={style.heading}>{title}</div>
  </>
);

Heading.propTypes = {
  title: PropTypes.string,
  isGroceryStoreNearby: PropTypes.string,
  showTextFamily: PropTypes.bool,
};

export default Heading;
