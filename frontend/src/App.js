import React from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js';
import {BrowserRouter as Router,Routes , Route} from "react-router-dom" 
import WebFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer.js"
import { useEffect } from 'react';
import Home from "./component/Home/Home.js"
// import Loader from './component/layout/loader/Loader.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import Navbar from './component/layout/Header/Navbar.js';


// import Headers  from "./component/layout/Header.js"
function App(){
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      }
    })
  })


  return (<Router>
    <Header></Header>
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products />} />  {/* extra added*/}
        <Route path="/search" element={<Search/>} />
      </Routes>


    <Footer />
  </Router>)
}

export default App;


