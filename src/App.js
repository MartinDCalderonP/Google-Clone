import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function App() {
	return (
		<HelmetProvider>
			<Helmet>
				<title>Google</title>
			</Helmet>
			<div className="App">
				<Router>
					<Switch>
						<Route path="/search">
							<SearchPage />
						</Route>

						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</div>
		</HelmetProvider>
	);
}
