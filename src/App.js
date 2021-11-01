import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Finalpage from "./components/Finalpage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ProductDetails from "./components/ProductDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "./components/redux/cart";
import SearchDisplay from "./components/SearchDisplay";

const App = () => {
  const dispatch = useDispatch();

  const useFname = localStorage.getItem("first_name_Login");
  dispatch(login(useFname));

  const [Fname, setlocalFData] = useState("");
  const fnameRedux = useSelector((state) => state.cart.login);

  useEffect(() => {
    const useFname = localStorage.getItem("first_name_Login");
    // const fnameRedux = useSelector((state) => state.cart.login);
    // dispatch(login(useFname));
    setlocalFData(fnameRedux);
  });
  // useEffect(() => {
  //   setlocalFData(fnameRedux);
  // });

  // ------------------

  return (
    <>
      <Router>
        <Switch>
          <Route path={"/checkout"}>
            <Header />
            <div style={{ paddingTop: "6rem" }} className="god_wrapper">
              <Checkout />
            </div>
          </Route>
          <Route exact path={"/"}>
            {Fname ? (
              <>
                <Header />
                <div style={{ paddingTop: "6rem" }} className="god_wrapper">
                  <Home />
                </div>
              </>
            ) : (
              <Redirect to="/login" />
            )}
            {/* <Header /> */}
            <div style={{ paddingTop: "6rem" }} className="god_wrapper">
              {/* <Home /> */}
            </div>
          </Route>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/sign-up"}>
            <Signup />
          </Route>
          <Route path={"/final-page"}>
            <Header />
            <div style={{ paddingTop: "10rem" }} className="god_wrapper">
              <Finalpage />
            </div>
          </Route>

          <Route path={"/product-page"}>
            <Header />
            <div style={{ paddingTop: "10rem" }} className="god_wrapper">
              <ProductDetails />
            </div>
          </Route>
          <Route path={"/SearchDisplay-page"}>
            <Header />
            <div style={{ paddingTop: "10rem" }} className="god_wrapper">
              <SearchDisplay />
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
