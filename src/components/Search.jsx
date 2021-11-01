import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { productItem, searchProduct } from "./redux/cart";

const Search = () => {
  const [input, setinput] = useState("");
  const [searchArray, setsearchArray] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  // ---------------
  const api = useSelector((state) => state.cart.apiData);
  // console.log(api);
  // ---------------------------
  const handleInput = (e) => {
    const inputValue = e.target.value;
    const newFilter = api.filter((elem) => {
      return elem.title.toLowerCase().includes(input.toLowerCase());
    });
    setsearchArray(newFilter);
    setinput(inputValue);
    inputValue.length === 0 && setsearchArray([]);
  };
  // ---------------------------
  const addProductDetails = (
    id,
    heading,
    pricing,
    rating,
    img,
    category,
    description
  ) => {
    // console.log(rating);
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
    setinput("");
    history.push("/product-page");
  };
  // -----------------search button click on header------
  const searchBtnClick = () => {
    dispatch(searchProduct(searchArray));
    history.push("/SearchDisplay-page");
    setinput("");
  };
  // ---------------------------
  return (
    <>
      <div className="search_alfa_wrapper">
        <input
          value={input}
          onChange={handleInput}
          placeholder="Search Items"
          className="header_input"
          type="text"
        />
        <button
          onClick={() => {
            searchBtnClick();
          }}
          className="search_header_btn_wrapper"
        >
          <BsSearch className="input_search_icon" />
        </button>
      </div>
      {input.length === 0 || (
        <div className="list_items_search">
          <ul>
            {searchArray.slice(0, 5).map((elem) => {
              const { id, title, price, category, rating, image, description } =
                elem;
              // console.log(rating);
              return (
                <li
                  key={id}
                  style={{ fontWeight: 600 }}
                  onClick={() =>
                    addProductDetails(
                      id,
                      title,
                      price,
                      rating.rate,
                      image,
                      category,
                      description
                    )
                  }
                  className="text-dark"
                >
                  {title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
