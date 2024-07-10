import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination"


const Products = () => {
  const{ keyword }= useParams();
	const dispatch = useDispatch();
	const { products, loading, error, productCount , resultPerPage } = useSelector(
		(state) => state.products
	);

  const [currentPage ,setCurrentPage] = useState(1)
  const [price,setprice] = useState([0,2500])

  const priceHandler = (event ,newPrice) => {
    setprice(newPrice)
  }


  const setCurrentPageNo = (e) =>{
    setCurrentPage(e)
  }

	useEffect(() => {
		dispatch(getProduct(keyword,currentPage));
	}, [dispatch,keyword,currentPage]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<h2 className="productsHeading">Products</h2>
					<div className="products">
						{products &&
							products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>


          {resultPerPage < productCount && (
            <div className="paginationBox">
            <Pagination
              activePage = {currentPage}
              itemsCountPerPage = {resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText = "Next"
              prevPageText = "Prev"
              firstPageText = "1st"
              lastPageText = "Last"
              itemClass ="page-item"
              linkClass = "page-link"
              activeClass = "pageItemActive"
              activeLinkClass = "pageLinkActive"

            />
          </div>
          )}
				</Fragment>
			)}
		</Fragment>
	);
};

export default Products;
