import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart, productItem } from "./redux/cart";
import "./SearchDisplay.scss";

const SearchDisplay = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchedItems = useSelector((state) => state.cart.headerSearchButton);
  // console.log(searchedItems);
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
  // -----------add to cart----------
  const handleClick = (id, title, image, price, rating) => {
    dispatch(
      addToCart({
        id: id,
        heading: title,
        pricing: price,
        rating: Math.round(rating.rate),
        img: image,
      })
    );
    notify(title);
  };
  // -----------add to cart----------
  // ------------view product full info-----
  const viewFullProductInfo = (
    id,
    title,
    image,
    price,
    rating,
    category,
    description
  ) => {
    dispatch(
      productItem({
        id: id,
        heading: title,
        pricing: price,
        img: image,
        rating: rating.rate,
        cat: category,
        dec: description,
      })
    );
    history.push("/product-page");
  };
  // ------------view product full info-----
  return (
    <>
      <div className="SearchDisplay_wrapper">
        <div className="container-fluid">
          <div className="row ">
            <h2 className="fs-2 fw-bold text-center my-5 py-5 search_result_title">
              Search Result...
            </h2>
            {searchedItems.map((elem) => {
              const { id, title, image, price, rating, category, description } =
                elem;
              return (
                <div key={id} className="col-12 col-md-8">
                  <div className="SearchDisplay_container">
                    <div className="row">
                      <div className="col-6 col-md-4 ">
                        <figure
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            viewFullProductInfo(
                              id,
                              title,
                              image,
                              price,
                              rating,
                              category,
                              description
                            )
                          }
                          className="search_dis_img"
                        >
                          <img src={image} alt="" />
                        </figure>
                      </div>
                      <div className="col-6 col-md-8 ">
                        <div className="search_dis_data_wrapper">
                          <h2
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              viewFullProductInfo(
                                id,
                                title,
                                image,
                                price,
                                rating,
                                category,
                                description
                              )
                            }
                            className="heading"
                          >
                            {title}
                          </h2>
                          <h3 className="price">
                            <span>Price:</span> ₹{price}
                          </h3>
                          <h4 className="rating">
                            {Array(Math.round(rating.rate))
                              .fill()
                              .map((elem) => {
                                return <h3>⭐</h3>;
                              })}
                          </h4>
                          <button
                            onClick={() =>
                              handleClick(
                                id,
                                title,
                                image,
                                price,
                                rating,
                                category,
                                description
                              )
                            }
                            className="btn btn-warning fs-5 fw-lg-bold p-lg-2 search_dis_btn"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer style={{ zIndex: "999999999999999999999" }} />
    </>
  );
};

export default SearchDisplay;
