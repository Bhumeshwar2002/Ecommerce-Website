import React from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js';
import {BrowserRouter as Router,Routes , Route} from "react-router-dom" 
import WebFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer.js"
import { useEffect } from 'react';
import Home from "./component/Home/Home.js"

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
      </Routes>


    <Footer />
  </Router>)
}

export default App;
