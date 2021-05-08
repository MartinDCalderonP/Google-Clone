import React, { useState, useEffect } from 'react';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Search(props) {
	const [{}, dispatch] = useStateValue();

	const [inputTerm, setInputTerm] = useState('');
	const history = useHistory();

	useEffect(() => {
		if (props.inputValue) {
			setInputTerm(props.inputValue);	
		}
	}, [props.inputValue])

	const handleInputTermChange = (e) => {
		setInputTerm(e.target.value);
	};

	const search = (e) => {
		e.preventDefault();

		dispatch({
			type: actionTypes.SET_SEARCH_TERM,
			term: inputTerm,
		});

		history.push(`/search?q=${inputTerm}`);
	};

	return (
		<div className="search-div">
			<form className="search-form">
				<div className="search-input-div">
					<SearchIcon className="search-icon" />
					<input
						value={inputTerm}
						onChange={handleInputTermChange}
					/>
				</div>

				{!props.hideButtons ? (
					<>
						<div className="search-buttons-div">
							<Button type="submit" onClick={search} variant="outlined">
								Buscar con Google
							</Button>
							<Button variant="outlined">Me siento con suerte</Button>
						</div>

						<div className="search-offerBy-div">
							<p>
								Ofrecido por Google en: <Link to="/english"> English </Link>
							</p>
						</div>
					</>
				) : (
					<></>
				)}
			</form>
		</div>
	);
}

export default Search;
