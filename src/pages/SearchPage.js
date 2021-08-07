import React, { useState } from 'react';
import styles from './SearchPage.module.scss';
import { useStateValue } from '../stateProvider/StateProvider';
import useGoogleSearch from '../hooks/useGoogleSearch';
import { Link } from 'react-router-dom';
import HeaderOptions from '../components/HeaderOptions';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Helmet } from 'react-helmet-async';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SearchPage() {
	const [{ term }] = useStateValue();
	const { data } = useGoogleSearch(term);
	const matches = useMediaQuery('(max-width: 720px)');
	const [logo, setLogo] = useState('');

	const onSwitchTheme = (switchTheme) => {
		!switchTheme
			? setLogo(
					'https://www.google.com.ar/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
			  )
			: setLogo(
					'https://www.google.com.ar/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png'
			  );
	};

	return (
		<div className={styles.searchPage}>
			<Helmet>
				<title>{`${term ? term : ''} - Buscar con Google`}</title>
			</Helmet>

			<div className={styles.header}>
				<div className={styles.logoAndSearch}>
					<Link to="/">
						<img className={styles.logo} src={logo} alt="Logo de Google" />
					</Link>

					<div className={styles.searchAndOptions}>
						<Search inputValue={term} insideHeader hideButtons />

						<div className={styles.options}>
							<div className={`${styles.option} ${styles.currentOption}`}>
								<SearchIcon />
								<Link to="/all">Todos</Link>
							</div>
							<div className={styles.option}>
								<ImageOutlinedIcon />
								<Link to="/images">Imágenes</Link>
							</div>
							<div className={styles.option}>
								<SlideshowIcon />
								<Link to="/videos">Videos</Link>
							</div>
							<div className={styles.option}>
								<ChromeReaderModeOutlinedIcon />
								<Link to="/news">Noticias</Link>
							</div>
							<div className={styles.option}>
								<RoomOutlinedIcon />
								<Link to="/maps">Mapas</Link>
							</div>
							<div className={styles.option}>
								<MoreVertIcon />
								<Link to="/more">Más</Link>
							</div>
							<div className={`${styles.option} ${styles.lastOption}`}>
								<Link to="/tools">Herramientas</Link>
							</div>
						</div>
					</div>
				</div>

				{!matches && (
					<div className={styles.headerOptions}>
						<HeaderOptions settingsIcon handleSwitchTheme={onSwitchTheme} />
					</div>
				)}
			</div>

			{data?.error ? (
				<div className={styles.limitExceeded}>
					<h3>Se acabaron las consultas. 😅</h3>
					<h3>Vuelva a intentarlo mañana. 😊</h3>
				</div>
			) : data?.searchInformation ? (
				<div className={styles.results}>
					<p
						className={styles.resultsCount}
						key={data?.searchInformation.formattedTotalResults}
					>
						Cerca de {data?.searchInformation.formattedTotalResults} resultados
						({data?.searchInformation.formattedSearchTime} segundos)
					</p>

					{data?.items.map((item) => (
						<div className={styles.result} key={item.cacheId}>
							<a href={item.link}>
								{item.displayLink}
								<ArrowDropDownIcon viewBox="0 0 20 15" />
							</a>
							<a className={styles.resultTitle} href={item.link}>
								<h2>{item.title}</h2>
							</a>
							<p className={styles.resultSnippet}>{item.snippet}</p>
						</div>
					))}
				</div>
			) : (
				<div className={styles.loader}>
					<CircularProgress />
				</div>
			)}
		</div>
	);
}
