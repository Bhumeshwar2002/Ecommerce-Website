import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product?.ratings || 0,
    isHalf: true,
  };

  return (
    <Link className='productCard' to={`/product/${product?._id}`}>
      {product?.images?.[0]?.url ? (
        <img src={product.images[0].url} alt={product.name} />
      ) : (
        <div className="placeholder-image">Image not available</div>
      )}
      <p>{product?.name || "Product Name"}</p>

      <div>
        <ReactStars {...options} /><span>({product?.numOfReviews || 0} Reviews)</span>
      </div>
      <span>{`₹${product?.price || 0}`}</span>
    </Link>
  );
}

export default ProductCard;
