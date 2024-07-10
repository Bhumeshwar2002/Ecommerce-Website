import React from 'react'
import "./Navbar.css"
const Navbar = () => {
  return (
    <>
      <div className="first">
        <div className="flex logo">
          <div className="map flex">
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <span>Deliver to</span>
              <span>India</span>
            </div>
          </div>
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
            <img src="http://en.wikipedia.org/wiki/Special:FilePath/Flag_of_India.svg" alt="India Flag" />
            <i className="fas fa-caret-down"></i>
          </div>
          <div className="sign">
            <span>Hello, Sign in</span>
            <div className="flex ac">
              <span>Account & Lists</span>
              <i className="fas fa-caret-down"></i>
            </div>
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
            <li><i className="fas fa-caret-down"></i> Prime</li>
          </ul>
        </div>
        <div className="second-3">
          <span>Diwali Dhamaka offer</span>
        </div>
      </div>
    </>
  )
}

export default Navbar
