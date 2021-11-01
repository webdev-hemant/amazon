import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CartItems from "./CartItems";
import "./Checkout.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const basket = useSelector((state) => state.cart.basket);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (basket?.length === 0) {
      toast.warn("cart is emty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [basket]);

  const totalCartPriceAddition = basket.reduce(
    (a, b) => a + Number(b.pricing),
    0
  );
  // ------toast
  const notifyCheck = (itemName) => {
    toast.info(`${itemName}removed from cart!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div className="checkout_compo_wrapper">
        <div className="container-fluid">
          <div className="row flex-column-reverse flex-sm-column-reverse flex-md-row">
            <div className="col col-md-9">
              <div className="checkout_ban_and_basket_wrapper">
                <div className="banner_checkout">
                  <img src="./imgs/checkout-banner.jpg" alt="" />
                </div>
                <div className="basket_wrapper">
                  <h2>Your Shopping Basket</h2>
                  <div className="underline"></div>
                  <div className="all_basket_items">
                    <div className="row row-cols-1 row-cols-lg-">
                      <div className="col">
                        {basket?.length ? (
                          basket.map((elem, ind) => {
                            const { id, heading, pricing, rating, img } = elem;
                            return (
                              <div className="lund" key={id}>
                                <CartItems
                                  id={id}
                                  ind={ind}
                                  heading={heading}
                                  pricing={pricing}
                                  rating={rating}
                                  img={img}
                                  notifyCheck={notifyCheck}
                                />
                              </div>
                            );
                          })
                        ) : (
                          <h2
                            style={{ fontWeight: "600" }}
                            className="display-3 text-center "
                          >
                            Cart is Emty please add items to continue
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-3 ">
              <div className="card_total_wrapper">
                <h2>
                  Subtotal ({basket?.length} items): ₹
                  {totalCartPriceAddition?.toFixed(2)}
                </h2>
                <div className="checkbox_wrapper">
                  <input type="checkbox" name="" id="total_checkbox" />
                  <label htmlFor="total_checkbox">
                    This order contains gift
                  </label>
                </div>
                <Link to="/final-page">
                  <button className="btn btn-warning">
                    Proceed to checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer newestOnTop style={{ zIndex: "999999999999999999999" }} />
    </>
  );
};

export default Checkout;
