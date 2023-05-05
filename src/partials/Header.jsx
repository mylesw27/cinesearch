import { Link } from 'react-router-dom'

export default function Header({ currentUser, handleLogout }) {
	const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>

			<Link to="/profile">
				Profile
			</Link>
		</>
	)

	const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				Register
			</Link> {" | "}

			<Link to="/login">
				Login
			</Link> 
		</>
	)

	return (
		<nav class="navbar navbar-light bg-light header">
            <div>
            <a class="navbar-brand navbar-link" href="/">
                    Home
                </a>
                <a class="navbar-brand navbar-link" href="/register">
                    Register
                </a>
                <a class="navbar-brand navbar-link" href="/login">
                    Login
                </a>
            </div>
            <img class="navbar-logo" src="/logo.png" alt="logo image" />
		</nav>
	)
}
