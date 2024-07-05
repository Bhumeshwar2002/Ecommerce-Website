import React from 'react'
import playstore from "../../../images/playstore.png"
import appstore from "../../../images/Appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>Download our App</h4>
            <p>Download app for android and ios devices</p>
            <img src={ playstore} alt="playstore" />
            <img src={ appstore} alt="Appstore" />
        </div>

        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High quality is our first priority</p>
            <p>copyright 2024 &copy; Bhuvii</p>

        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="">Instagram</a>
            <a href="">Youtube</a>
            <a href="">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer



