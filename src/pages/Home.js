import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import { Button } from '@material-ui/core';
import Search from '../components/Search';

export default function Home() {
	return (
		<div className="home">
			<div className="home-header">
				<Link to="/gmail">Gmail</Link>
				<Link to="/images">Imágenes</Link>
				<AppsIcon color="disabled" />
				<Button className="home-header-button" variant="contained">
					I<span className="home-header-button-span">niciar sesión</span>
				</Button>
			</div>

			<div className="home-body">
				<img
					src="https://www.google.com.ar/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
					alt="Logo de Google"
				/>

				<div className="home-search-div">
					<Search />
				</div>
			</div>
		</div>
	);
}
