import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
	<p>
		显示：
		{' '}
		<FilterLink filter="SHOW_ALL" >所有</FilterLink> {' '}
		<FilterLink filter="SHOW_ACTIVE">激活的</FilterLink> {' '}
		<FilterLink filter="SHOW_COMPLETED">完成的</FilterLink> {' '}
	</p>
);

export default Footer;