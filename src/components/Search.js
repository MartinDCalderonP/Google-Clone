import React, { useState, useEffect } from 'react';
import styles from './Search.module.scss';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from '../stateProvider/StateProvider';
import { actionTypes } from '../stateProvider/reducer';

export default function Search({ inputValue, insideHeader, hideButtons }) {
	const [inputTerm, setInputTerm] = useState('');
	// eslint-disable-next-line
	const [{}, dispatch] = useStateValue();
	const history = useHistory();

	useEffect(() => {
		if (inputValue) {
			setInputTerm(inputValue);
		}
	}, [inputValue]);

	const handleInputTermChange = (e) => {
		setInputTerm(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();

		if (inputTerm !== '') {
			dispatch({
				type: actionTypes.SET_SEARCH_TERM,
				term: inputTerm,
			});

			history.push(`/search?q=${inputTerm}`);
		}
	};

	return (
		<form>
			<div
				className={
					`${styles.input}` + (insideHeader ? ` ${styles.insideHeader}` : '')
				}
			>
				<SearchIcon className={styles.icon} />
				<input value={inputTerm} onChange={handleInputTermChange} />
			</div>

			<div className={!hideButtons ? styles.buttons : styles.hidden}>
				<Button type="submit" onClick={handleSearch} variant="outlined">
					Buscar con Google
				</Button>
				<Button variant="outlined">Me siento con suerte</Button>
			</div>
		</form>
	);
}
