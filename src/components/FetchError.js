import React, { PropTypes } from 'react';

const FetchError = ({ message, onRetry }) => (
  <div>
    <p>找不到数据哦。 {message}</p>
    <button onClick={onRetry}>重试</button>
  </div>
);

FetchError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default FetchError;
