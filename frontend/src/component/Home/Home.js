import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader.js";
import { useAlert } from "react-alert";
// const dispatch = useDispatch();

const Home = () => {

    const alert = useAlert()

	const dispatch = useDispatch();
	const { loading, error, products, productCount } = useSelector(
		(state) => state.products
	);
	useEffect(() => {
        if(error){
            return alert.error(error)
        }
		dispatch(getProduct());
	}, [dispatch,error]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="ECOMMERCE" />

					<div className="banner">
						<p>Welcome to Ecommerce</p>
						<h1>FIND AMAZING PRODUCTS BELOW</h1>
						<a href="#container">
							<button>
								SCROLL <CgMouse />
							</button>
						</a>
					</div>
					<div className="container" id="container">
						{products &&
							products.map((product) => <Product product={product} />)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Home;
