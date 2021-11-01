import React from "react";
import "./Product.scss";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, productItem } from "./redux/cart";
import { Link } from "react-router-dom";

const Product = ({
  id,
  heading,
  pricing,
  rating,
  img,
  notify,
  category,
  description,
}) => {
  // const productDetails = useSelector((state) => state.productDetails);
  // console.log(basket);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      addToCart({
        id: id,
        heading: heading,
        pricing: pricing,
        rating: rating,
        img: img,
      })
    );
    notify(heading);
  };
  const addProductDetails = () => {
    dispatch(
      productItem({
        id: id,
        heading: heading,
        pricing: pricing,
        rating: rating,
        img: img,
        cat: category,
        dec: description,
      })
    );
  };

  return (
    <>
      <div className="col">
        <div className="product_wrapper">
          <div className="product">
            <div className="row">
              <div className="col">
                <Link
                  style={{ textDecoration: "none", color: "#000" }}
                  to="/product-page"
                >
                  <p
                    onClick={() => addProductDetails()}
                    className="product_heading"
                  >
                    {heading}
                  </p>
                </Link>
                <p className="product_pricing">
                  <small> ₹</small>
                  <strong>{pricing}</strong>
                </p>
                <div className="product_rating">
                  {rating === 0 ? (
                    <p>⭐</p>
                  ) : (
                    Array(rating)
                      .fill()
                      .map((elem, ind) => <p key={ind}>⭐</p>)
                  )}
                </div>
                <button
                  onClick={() => handleClick()}
                  className="btn btn-warning fs-6 px-3 py-2 fw-bold m-3"
                >
                  Add to Basket
                </button>
              </div>
              <div className="col">
                <Link
                  style={{ textDecoration: "none", color: "#000" }}
                  to="/product-page"
                >
                  <figure onClick={() => addProductDetails()}>
                    <img className="img-fluid" src={img} alt="" />
                  </figure>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
