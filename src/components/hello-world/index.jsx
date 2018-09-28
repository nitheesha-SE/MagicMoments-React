import React from 'react';
import PropTypes from 'prop-types';
import style from './hello-world.css';

const HelloWorld = ({ title, isGroceryStoreNearby, showTextFamily }) => (
  <>
    <div className={style['hello-world']}>{title}</div>
    <div>{isGroceryStoreNearby}</div>
    <div>
      {showTextFamily ? (
        <button type="button"> Text Family </button>
      ) : (
        <button type="button" hidden>
          {' '}
          Text Family{' '}
        </button>
      )}
    </div>
  </>
);

HelloWorld.propTypes = {
  title: PropTypes.string,
  isGroceryStoreNearby: PropTypes.string,
  showTextFamily: PropTypes.bool,
};

export default HelloWorld;
