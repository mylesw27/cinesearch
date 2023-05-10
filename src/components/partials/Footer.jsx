import React from "react";
import "./Footer.css"

export default function Footer() {

  const footerStyle = {
    backgroundColor: "black",
    bottom: "0",
    width: "100%",
    height: "2.5rem"
  }
  return (
    <div className="footerDiv">
    <footer className="footer">
      <h6>Powered By The Mavericks</h6>
      <a href="https://github.com/Dxk0ta" style={{textDecoration: "none", color: 'white'}}><i className="bi bi-github"> Dakota Campbell</i> </a>
      <a href="https://github.com/juanedcabrera" style={{textDecoration: "none", color: 'white'}}><i className="bi bi-github"> Juan Cabrera</i> </a>
      <a href="https://github.com/awellsbiz" style={{textDecoration: "none", color: 'white'}}><i className="bi bi-github"> Anthony Wells</i> </a>
      <a href="https://github.com/mylesw27" style={{textDecoration: "none", color: 'white'}}><i className="bi bi-github"> Myles Wiegell</i></a>
    </footer>
    </div>
  );
}
