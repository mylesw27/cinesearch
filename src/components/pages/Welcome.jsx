import logo from "../assets/Logo.png"

export default function Welcome() {
	return (
		<div className="Welcome-page">
			<img src={logo} alt="Logo" />
			<h1>Welcome to CineSearch!</h1>
			<p>Search all things movies here</p>
		</div>
	)
}