import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import './App.css'
import jwt_decode from 'jwt-decode'
import ListView from './components/partials/ListView'
import favorites from './favorites'
import Header from './partials/Header'
import Footer from './partials/Footer'
import MovieDetails from './components/pages/MovieDetails'


function App() {
	// the currently logged in user will be stored up here in state
	const [currentUser, setCurrentUser] = useState(null)
	const [favoritesArray, setFavoritesArray] = useState([])

	// useEffect -- if the user navigates away form the page, we will log them back in
	useEffect(() => {
		// check to see if token is in storage
		const token = localStorage.getItem('jwt')
		if (token) {
			// if so, we will decode it and set the user in app state
			setCurrentUser(jwt_decode(token))
		} else {
			setCurrentUser(null)
		}
	}, []) // happen only once - no _id needed

	// event handler to log the user out when needed
	const handleLogout = () => {
		// check to see if a token exists in local storage
		if (localStorage.getItem('jwt')) {
			// if so, delete it
			localStorage.removeItem('jwt')
			// set the user in the App state to be null
			setCurrentUser(null)
		}
	}

	return (
		<Router>
			<header>
				<Header />
			</header>

			<div className="App">
				<Routes>
					<Route
						path="/"
						element={<Welcome />}
					/>

					<Route
						path="/register"
						element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
					/>

					<Route
						path="/login"
						element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
					/>

					<Route
						path="/movies"
						element={<MovieDetails handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
					/>

					<Route
						path="/movies/details"
						element={<MovieDetails handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
					/>

					{/* Route for favorites list */}
					<Route
						path="/favorites"
						element={<ListView
							listName={"Favorites"}
						/>} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
