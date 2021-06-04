import React from 'react';
import './SearchPage.css';
import { useStateValue } from '../stateProvider/StateProvider';
import useGoogleSearch from '../hooks/useGoogleSearch';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import { Avatar, CircularProgress } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Helmet } from 'react-helmet-async';

function SearchPage() {
	// eslint-disable-next-line
	const [{ term }, dispatch] = useStateValue();
	const { data } = useGoogleSearch(term);

	return (
		<div className="search-page">
			<Helmet>
				<title>{term} - Buscar con Google</title>
			</Helmet>
			<div className="search-page-header">
				<Link to="/">
					<img
						className="search-page-logo"
						src="https://www.google.com.ar/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
						alt="Logo de Google"
					/>
				</Link>

				<div className="search-page-search-and-options">
					<Search hideButtons inputValue={term} />

					<div className="search-page-options">
						<div className="search-page-option current-option">
							<SearchIcon />
							<Link to="/all">Todos</Link>
						</div>
						<div className="search-page-option">
							<ImageOutlinedIcon />
							<Link to="/images">Imágenes</Link>
						</div>
						<div className="search-page-option">
							<SlideshowIcon />
							<Link to="/videos">Videos</Link>
						</div>
						<div className="search-page-option">
							<RoomOutlinedIcon />
							<Link to="/maps">Mapas</Link>
						</div>
						<div className="search-page-option">
							<ChromeReaderModeOutlinedIcon />
							<Link to="/news">Noticias</Link>
						</div>
						<div className="search-page-option">
							<MoreVertIcon />
							<Link to="/more">Más</Link>
						</div>
						<div className="search-page-option">
							<Link to="/settings">Preferencias</Link>
						</div>
						<div className="search-page-option">
							<Link to="/tools">Herramientas</Link>
						</div>
					</div>
				</div>

				<div className="search-page-avatar">
					<AppsIcon />
					<Avatar />
				</div>
			</div>

			{data?.error ? (
				<div key='0' className="search-page-limit-exceeded">
					<h3 key='1'>Se acabaron las consultas. 😅</h3>
					<h3 key='2'>Vuelva a intentarlo mañana. 😊</h3>
				</div>
			) : data?.searchInformation ? (
				<div className="search-page-results">
					<p className="search-page-result-count" key='p'>
						Cerca de {data?.searchInformation.formattedTotalResults} resultados
						({data?.searchInformation.formattedSearchTime} segundos)
					</p>

					{data?.items.map((item) => (
						<div className="search-page-result" key={item.cacheId}>
							<a className="search-page-result-link" href={item.link}>
								{item.displayLink} <ArrowDropDownIcon viewBox="0 0 20 15" />
							</a>
							<a className="search-page-result-title" href={item.Link}>
								<h2>{item.title}</h2>
							</a>
							<p className="search-page-result-snippet">{item.snippet}</p>
						</div>
					))}
				</div>
			) : (
				<div className="search-page-loader-div">
					<CircularProgress />
				</div>
			)}
		</div>
	);
}

export default SearchPage;
