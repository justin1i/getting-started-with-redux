import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => {
  const to = filter === 'all' ? '' : filter;
  const activeStyle = {
    textDecoration: 'none',
    color: 'black',
  };

  return <Link to={to} activeStyle={activeStyle}>{children}</Link>;
};
FilterLink.propTypes = {
  filter: PropTypes.string,
  children: PropTypes.string,
};

export default FilterLink;
