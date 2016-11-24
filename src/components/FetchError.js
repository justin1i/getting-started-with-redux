import React from 'react';

const FetchError = ({ message, onRetry }) => (
  <div>
    <p>找不到数据哦。 {message}</p>
    <button onClick={onRetry}>重试</button>
  </div>
);

export default FetchError;