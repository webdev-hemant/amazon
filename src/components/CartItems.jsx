import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CartItems.scss";
import { productItem, removeCart } from "./redux/cart";
const CartItems = ({ id, ind, heading, pricing, rating, img, notifyCheck }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // -------full api data-------
  const api = useSelector((state) => state.cart.apiData);
  // -------full api data-------

  const handleClick = () => {
    dispatch(removeCart(id));
    notifyCheck(heading);
  };

  // ------------view product full info-----
  const viewFullProductInfo = () => {
    const logthis = api.filter((elem) => {
      return elem.id == id;
    });
    // console.log(logthis[0].title);
    // const { id, category, title, image, price, rating, description } =
    //   logthis[0];

    dispatch(
      productItem({
        id: logthis[0].id,
        heading: logthis[0].title,
        pricing: logthis[0].price,
        img: logthis[0].image,
        rating: logthis[0].rating.rate,
        cat: logthis[0].category,
        dec: logthis[0].description,
      })
    );
    history.push("/product-page");
  };
  // ------------view product full info-----
  return (
    <>
      <div className="checkout_cart__items">
        <div className="row">
          <div className="col-6 col-md-2 d-flex  justify-content-between align-items-center ">
            <h2 className="ms-4 me-1">({ind + 1})</h2>
            <figure
              style={{ cursor: "pointer" }}
              onClick={() => viewFullProductInfo()}
            >
              <img className="img-fluid" src={img} alt="" />
            </figure>
          </div>
          <div className="col-6 col-md-5 bg-info">
            <div className="all_text_cart_wrapper">
              <div className="extra_wrapper_checkout">
                <div className="item_info">
                  <h2
                    style={{ cursor: "pointer" }}
                    onClick={() => viewFullProductInfo()}
                    className="fs-3"
                  >
                    {heading}
                  </h2>
                  <h3>₹{pricing}</h3>
                  <h4>
                    {Array(rating)
                      .fill()
                      .map((e, ind) => {
                        return <span key={ind}>⭐</span>;
                      })}
                  </h4>
                </div>
                {/* <div className="quantity">
                  <button onClick={() => dispatch(incrementCartProduct(id))}>
                    +
                  </button>
                  <h2>{"1"}</h2>
                  <button>-</button>
                </div> */}
              </div>
              <button
                onClick={() => handleClick()}
                className="btn btn-danger fs-5"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
