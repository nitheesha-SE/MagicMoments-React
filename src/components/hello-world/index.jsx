import React from 'react';
import PropTypes from 'prop-types';
import style from './hello-world.css';

const HelloWorld = ({ title, isGroceryStoreNearby }) => (
  <>
    <div className={style['hello-world']}>{title}</div>
    <div>{isGroceryStoreNearby}</div>
  </>
);

HelloWorld.propTypes = {
  title: PropTypes.string,
  isGroceryStoreNearby: PropTypes.string,
};

export default HelloWorld;
