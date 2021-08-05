import React from 'react';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import { Button } from '@material-ui/core';
import Search from '../components/Search';

export default function Home() {
	return (
		<div className={styles.home}>
			<div className={styles.header}>
				<Link to="/gmail">Gmail</Link>
				<Link to="/images">Imágenes</Link>
				<AppsIcon />
				<Button className={styles.loginButton} variant="contained">
					I<span className={styles.lowercaseSpan}>niciar sesión</span>
				</Button>
			</div>

			<div className={styles.body}>
				<img
					src="https://www.google.com.ar/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
					alt="Logo de Google"
				/>

				<Search />

				<div className={styles.offerBy}>
					<p>
						Ofrecido por Google en: <Link to="/english"> English </Link>
					</p>
				</div>
			</div>
		</div>
	);
}
