import React from 'react';
import styles from './HeaderOptions.module.scss';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import { Button } from '@material-ui/core';

export default function HeaderOptions({ searchPage }) {
	return (
		<div className={styles.headerOptions}>
			{!searchPage ? (
				<>
					<Link to="/gmail">Gmail</Link>
					<Link to="/images">Imágenes</Link>
				</>
			) : (
				<SettingsIcon />
			)}
			<AppsIcon />
			<Button className={styles.loginButton} variant="contained">
				I<span className={styles.lowercaseSpan}>niciar sesión</span>
			</Button>
		</div>
	);
}
