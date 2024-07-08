import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import {useAlert} from "react-alert"

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails || {}
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
    if(error){
     alert.error(error)
     dispatch(clearErrors())
    }
  }, [dispatch, id, error ,alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,  
    isHalf: true,
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
   
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="ProductDetails">
          <div className="CarouselContainer">
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>

          <div className="details">
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>

            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>

            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly value={quantity} type="number" />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button onClick={addToCartHandler}>Add to Cart</button>
              </div>
              <p>
                Status:{" "}
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description: <p>{product.description}</p>
            </div>

            <button className="submitReviews">Submit Reviews</button>
          </div>
        </div>
      )}

      <div className="reviews">
        <h3 className="reviewsHeading">Product Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
