import React from 'react';
import {
	Link
} from 'react-router';

const FilterLink = ({
	filter,
	children
}) => {

	const to = filter === 'all' ? '' : filter;
	const activeStyle = {
		textDecoration: 'none',
		color: 'black'
	};

	return <Link to={to} activeStyle={activeStyle}>{children}</Link>;
};

export default FilterLink;