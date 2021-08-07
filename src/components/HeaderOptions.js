import React, { useState, useEffect } from 'react';
import styles from './HeaderOptions.module.scss';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import useDarkTheme from '../hooks/useDarkTheme';

export default function HeaderOptions({ settingsIcon, handleSwitchTheme }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const { checked, switchTheme } = useDarkTheme();

	useEffect(() => {
		handleSwitchTheme && handleSwitchTheme(checked);
	}, [handleSwitchTheme, checked]);

	const handleSettingsIconClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleThemeChangeClick = () => {
		handleClose();
		switchTheme();
	};

	return (
		<div className={styles.headerOptions}>
			{!settingsIcon ? (
				<>
					<Link to="/gmail">Gmail</Link>
					<Link to="/images">Imágenes</Link>
				</>
			) : (
				<>
					<IconButton
						aria-label="settings"
						aria-controls="menu"
						aria-haspopup="true"
						onClick={handleSettingsIconClick}
					>
						<SettingsIcon />
					</IconButton>
					<Menu
						id="simple-menu"
						className={styles.menu}
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
						getContentAnchorEl={null}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						<MenuItem
							className={styles.menuItem}
							onClick={handleThemeChangeClick}
						>
							{!checked ? (
								<>
									Tema Oscuro: Desactivado
									<WbSunnyIcon className={styles.themeIcon} />
								</>
							) : (
								<>
									Tema Oscuro: Activado
									<Brightness2Icon className={styles.themeIcon} />
								</>
							)}
						</MenuItem>
					</Menu>
				</>
			)}

			<AppsIcon className={styles.appsIcon} />

			<Button className={styles.loginButton} variant="contained">
				I<span className={styles.lowercaseSpan}>niciar sesión</span>
			</Button>
		</div>
	);
}
