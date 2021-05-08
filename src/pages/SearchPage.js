import React from 'react';
import './SearchPage.css';
import { useStateValue } from '../StateProvider';
import useGoogleSearch from '../useGoogleSearch';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import { Avatar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CircularProgress from '@material-ui/core/CircularProgress';

function SearchPage() {
	const [{ term }, dispatch] = useStateValue();
	const { data } = useGoogleSearch(term);

	return (
		<div className="search-page">
			<div className="search-page-header">
				<Link to="/">
					<img
						className="search-page-logo"
						src="https://www.google.com.ar/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
						alt="Logo de Google"
					/>
				</Link>

				<div className="search-page-search-and-options">
					<Search hideButtons inputValue={term}/>

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
				
				<div className='search-page-avatar'>
					<AppsIcon />
					<Avatar />
				</div>
			</div>

			{data?.searchInformation ? (
				<div className="search-page-results">
					<p className="search-page-result-count">
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
				<div className='search-page-loader-div'>
					<CircularProgress />
				</div>

				// <div className="search-page-limit-exceeded">
				// 	<p> Hemos llegado al límite de búsquedas permitidas por Google. 😅</p>
				// 	<p> Vuelva a intentarlo mañana. 😊</p>
				// </div>
			)}
		</div>
	);
}

export default SearchPage;
