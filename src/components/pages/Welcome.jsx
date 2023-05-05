import myImage from "../assets/movienight.png.jpg"

export default function Welcome() {
	return (
		<div style={{ position: "relative" }}>
      <img className="movienight-img" src={myImage} alt="My Image" style={{ width: "1200px", height: "740px", marginTop: "140px", marginLeft: "-270px" }} />
      <h1 style={{ position: "absolute", top: "50px", left: "50%", transform: "translate(-50%, -50%)", fontFamily:"Abril Fatface", fontSize: "xxx-large"}}>LIGHTS, CAMERA, ACTION! </h1>
	  <p style={{ position: "absolute", top: "70px", left: "100%", transform: "translate(-50%, -50%)", fontFamily:"Abril Fatface", fontSize: "80px", paddingRight: "1350px", paddingTop: "620px" }}> JOIN US FOR THE ULTIMATE MOVIE EXPIERIENCE. </p>
    </div>
	)
}