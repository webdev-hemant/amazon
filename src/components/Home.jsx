import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Home.scss";
import Product from "./Product";
import AwesomeSlider from "react-awesome-slider";
import styles from "react-awesome-slider/src/styles";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getApi } from "./redux/cart";

const Home = () => {
  const [apiData, setapiData] = useState([]);
  const dispatch = useDispatch();

  // ---------------api to redux-------------
  dispatch(getApi(apiData));
  // ---------------api to redux-------------
  // ---------------api from redux-------------
  const apiAlfaData = useSelector((state) => state.cart.apiData, shallowEqual);
  // console.log(apiAlfaData);
  // ---------------api from redux-------------

  useEffect(() => {
    async function getData() {
      const res = await axios.get("https://fakestoreapi.com/products");
      setapiData(res.data);
      // const api_alfa_data = [...res.data];
      // setapiData(api_alfa_data);
    }
    getData();
  }, []);

  const filteredItem = (a, b) =>
    apiAlfaData.filter((item) => {
      return item.id >= a && item.id <= b;
    });
  // ----slider
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  // ------toast
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
  return (
    <>
      <div className="home_wrapper">
        <div className="container-fluid overflow-hidden">
          <div className="row g-4">
            <div className="col-12">
              <div className="home">
                {/* <img className="img-fluid" src="./imgs/bg_1.jpg" alt="" /> */}
                <div className="slider_custom">
                  <AutoplaySlider
                    play={true}
                    cancelOnInteraction={false}
                    interval={4000}
                    style={{ height: "100%" }}
                  >
                    <div data-src="./imgs/header2.jpg" />
                    <div data-src="./imgs/header1.jpg" />
                    <div data-src="./imgs/header4.png" />
                  </AutoplaySlider>
                </div>
                <div className="animation_schroll"></div>
              </div>
            </div>
            <div className="col-12">
              <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4">
                {filteredItem(2, 12).map((data) => {
                  return (
                    <Product
                      key={data.id}
                      id={data.id}
                      heading={data.title}
                      pricing={data.price}
                      rating={Math.ceil(data.rating.rate)}
                      img={data.image}
                      notify={notify}
                      category={data.category}
                      description={data.description}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-12">
              <div className="row g-4 row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-2">
                {filteredItem(13, 18).map((data) => {
                  return (
                    <Product
                      key={data.id}
                      id={data.id}
                      heading={data.title}
                      pricing={data.price}
                      rating={Math.ceil(data.rating.rate)}
                      img={data.image}
                      notify={notify}
                      category={data.category}
                      description={data.description}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-12">
              <div className="row g-4 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
                {filteredItem(19, 20).map((data) => {
                  return (
                    <Product
                      key={data.id}
                      id={data.id}
                      heading={data.title}
                      pricing={data.price}
                      rating={Math.round(data.rating.rate)}
                      img={data.image}
                      notify={notify}
                      category={data.category}
                      description={data.description}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer style={{ zIndex: "999999999999999999999" }} />
    </>
  );
};

export default Home;
