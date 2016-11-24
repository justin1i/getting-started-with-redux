import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
	<p>
		显示：
		{' '}
		<FilterLink filter="all" >所有</FilterLink> {' '}
		<FilterLink filter="active">激活的</FilterLink> {' '}
		<FilterLink filter="completed">完成的</FilterLink> {' '}
	</p>
);

export default Footer;