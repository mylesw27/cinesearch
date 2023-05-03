import logo from "../assets/Logo.png"

export default function Welcome() {
	return (
		<div className="Welcome-page">
			<img src={logo} alt="Logo" />
			<h1>Welcome to CineSearch!</h1>
			<p>I don't mean to come off too cocky but I'm kind of the new "it" app.. Tell your friends.</p>
		</div>
	)
}