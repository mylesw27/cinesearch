import logo from "../assets/Logo.png"

export default function Welcome() {
	return (
		<div>
			<img src={logo} alt="Logo" />
			<h1>Welcome to CineSearch</h1>
			<p>this is the landing page</p>
		</div>
	)
}