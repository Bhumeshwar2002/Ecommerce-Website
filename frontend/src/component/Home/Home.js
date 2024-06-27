import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg";
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData';

const product={
    name:"Blue Tshirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:"₹3000",
    _id:"sahil",
}

const Home = () => {
  return (
    <Fragment>

        <MetaData title= "ECOMMERCE" />

        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    SCROLL <CgMouse />
                </button>
            </a>
        </div>
        <div className='container' id="container">
            <Product product ={product} />
            <Product product ={product} />
            <Product product ={product} />
            <Product product ={product} />
            <Product product ={product} />
            <Product product ={product} />
            <Product product ={product} />
            <Product product ={product} />
        </div>
        
    </Fragment>
  )
}

export default Home
