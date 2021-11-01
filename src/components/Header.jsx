import React, { useEffect } from "react";
import "./Header.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  const basket = useSelector((state) => state.cart.basket);
  const useName = localStorage.getItem("SignUPname");
  const useFname = localStorage.getItem("first_name_Login");
  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-2 col-sm-1 d-none">
              <div className="mob_nav text-white">
                <div className="ham_wrapper">
                  <GiHamburgerMenu className="ham_icon" />
                </div>
              </div>
            </div>
            <div className="col-4 col-sm-2 col-md-2 col-lg-1 me-auto">
              <div className="header_logo_wrapper ">
                <Link className="text-decoration-none" to="/">
                  <figure>
                    <img className="img-fluid" src="./imgs/logo.png" alt="" />
                  </figure>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-8 d-none d-md-block mx-auto ">
              <div className="header_input_and_search_wrapper">
                <Search />
              </div>
            </div>
            <div className="col-2 col-sm-2 col-md-2 col-lg-1 ms-auto d-flex">
              <div className="header_option_1 mx-auto ">
                <Link className="text-decoration-none" to="/login">
                  <div className="option_1_extra_wrapper">
                    <h6 className="fs-4 d-flex justify-content-center align-items-center flex-column">
                      <img
                        // style={{ background: "lightgreen" }}
                        width={15}
                        src="./imgs/avatar.png"
                        alt=""
                      />
                      {useName || useFname
                        ? useName?.slice(0, 6) || useFname?.slice(0, 6)
                        : "Login"}
                    </h6>
                    {/* <h5>Account & Lists</h5> */}
                  </div>
                </Link>
              </div>
              {/* <div className="row g-md-4">
                <div className="col">
                  
                </div>
              </div> */}
            </div>
            <div className="col-3 col-sm-2 col-md-1 col-lg-2 col-xl-1 ms-auto ms-sm-0">
              <Link className="text-decoration-none" to="/checkout">
                <div className="header_option_3 me-lg-5">
                  <AiOutlineShoppingCart className="cart_header_icon" />
                  <h5>Cart {basket?.length === 0 ? "" : basket?.length}</h5>
                </div>
              </Link>
            </div>
            <div className="col-12 d-block d-sm-block d-md-none d-lg-none py-3">
              <div className="header_input_and_search_wrapper">
                <Search />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
