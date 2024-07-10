import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import "./Navbar.css";
import elogo from "../../../images/elogo.png";
import { useNavigate } from "react-router-dom";

const options = {
	burgerColorHover: "rgb(184, 184, 184)",
	logo,
	logoWidth: "20vmax",
	navColor1: "white",
	logoHoverSize: "10px",
	logoHoverColor: "#eb4034",
	link1Text: "Home",
	link2Text: "Products",
	link3Text: "Contact",
	link4Text: "About",
	link1Url: "/",
	link2Url: "/products",
	link3Url: "/contact",
	link4Url: "/about",
	link1Size: "1.3vmax",
	link1Color: "rgba(35, 35, 35,0.8)",
	nav1justifyContent: "flex-end",
	nav2justifyContent: "flex-end",
	nav3justifyContent: "flex-start",
	nav4justifyContent: "flex-start",
	link1ColorHover: "#eb4034",
	link1Margin: "1vmax",
	profileIconUrl: "/login",
	profileIconColor: "rgba(35, 35, 35,0.8)",
	searchIconColor: "rgba(35, 35, 35,0.8)",
	cartIconColor: "rgba(35, 35, 35,0.8)",
	profileIconColorHover: "#eb4034",
	searchIconColorHover: "#eb4034",
	cartIconColorHover: "#eb4034",
	cartIconMargin: "1vmax",
};

const Header = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to /login route
  };
	return (
		<>
			<div>
				<ReactNavbar {...options} />
			</div>
			<div className="main">
				<div className="first">
					<div className="flex logo">
						<a href="#">
							<img className="elogoimg" src={elogo} alt="elogo" />
						</a>
					</div>

					<div className="flex input">
						<div>
							<span>All</span>
							<i className="fas fa-caret-down"></i>
						</div>
						<input type="text" />
						<i className="fas fa-search"></i>
					</div>

					<div className="flex right">
						<div className="flex lang">
							<img
								src="http://en.wikipedia.org/wiki/Special:FilePath/Flag_of_India.svg"
								alt="India Flag"
							/>
							<i className="fas fa-caret-down"></i>
						</div>
						<div className="header-wrapper">
							<button className="sign" onClick={handleSignInClick}>
                Login
							</button>
							
						</div>
						<div>
							<div className="sign">
								<span style={{ cursor: "pointer" }}>Returns</span>
								<span style={{ cursor: "pointer" }}>& Orders</span>
							</div>
						</div>
						<div className="flex cart">
							<i className="fas fa-shopping-cart"></i>
							<span className="ca">Cart</span>
							<p>0</p>
						</div>
					</div>
				</div>
				<div className="second">
					<div className="second-1">
						<div>
							<i className="fas fa-bars"></i>
							<span>All</span>
						</div>
					</div>
					<div className="second-2">
						<ul>
							<li>Today's Deal</li>
							<li>Customer Service</li>
							<li>Registry</li>
							<li>Gift Cards</li>
							<li>Sell</li>
							<li>
								<i className="fas fa-caret-down"></i> Prime
							</li>
						</ul>
					</div>
					<div className="second-3">
						<span>Diwali Dhamaka offer</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
