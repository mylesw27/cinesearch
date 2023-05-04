import myImage from "../assets/movienight.png.jpg"

export default function Welcome() {
	return (
		<div style={{ position: "relative" }}>
      <img className="movienight-img" src={myImage} alt="My Image" style={{ width: "1200px", height: "740px", marginTop: "140px", marginLeft: "-270px" }} />
      <h1 style={{ position: "absolute", top: "50px", left: "50%", transform: "translate(-50%, -50%)", fontFamily:"Abril Fatface", fontSize: "xxx-large"}}>LIGHTS, CAMERA, ACTION! </h1>
	  <h2 style={{ position: "absolute", top: "70px", left: "80%", transform: "translate(-50%, -50%)", fontFamily:"Abril Fatface", fontSize: "xxxx-large" }}> Join us for the ultimate movie experience. </h2>
    </div>
	)
}