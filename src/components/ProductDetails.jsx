import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "./ProductDetails.scss";
import { addToCart } from "./redux/cart";
const ProductDetails = () => {
  const productDetails = useSelector((state) => state.cart.productDetails);
  const spreadProduct = productDetails[0];
  const dispatch = useDispatch();

  // -----notify-----------
  const notify = (itemName) =>
    toast.success(`${itemName} added to cart!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  // -----notify-----------

  const handleClick = () => {
    dispatch(
      addToCart({
        id: spreadProduct.id,
        heading: spreadProduct.heading,
        pricing: spreadProduct.pricing,
        rating: Math.round(spreadProduct.rating),
        img: spreadProduct.img,
      })
    );
    notify(spreadProduct.heading);
  };
  return (
    <>
      <div className="product_details__wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="product_img">
                <img className="img-fluid" src={spreadProduct?.img} alt="" />
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="product_details">
                <h1 className="title">{spreadProduct?.heading}</h1>
                <h3 className="category">
                  <span>from</span> {spreadProduct?.cat}
                </h3>

                <h2 className="price">
                  <span>Price</span> ₹{spreadProduct?.pricing}
                </h2>
                <h3 className="rating">
                  {Array(Math.round(spreadProduct?.rating))
                    .fill()
                    .map((e) => "⭐")}
                </h3>
                <button
                  style={{ fontWeight: 600 }}
                  className="btn btn-warning fs-4 py-2 px-5 mt-2"
                  onClick={() => handleClick()}
                >
                  Add to Cart
                </button>
                <h4 className="description">{spreadProduct?.dec}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer style={{ zIndex: "999999999999999999999" }} />
    </>
  );
};

export default ProductDetails;
