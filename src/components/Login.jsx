import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { toast, ToastContainer } from "react-toastify";
import "./Login.scss";
import { login } from "./redux/cart";

const Login = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [viewPass, setviewPass] = useState(true);
  const [usingName, setusingName] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/pappusheth/google_sheets/TgUTsToYEaTpfBtA?tabId=sheet1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([[usingName, new Date().toLocaleString()]]),
        }
      );
      await response.json();
      // setName("");
      // setEmail("");
      // setPass("");
    } catch (error) {
      console.log(error);
    }
    if (usingName) {
      localStorage.setItem("first_name_Login", usingName);
      localStorage.removeItem("name");
      // localStorage.removeItem("first_name_Login");
      localStorage.removeItem("email_or_mobile");
      localStorage.removeItem("password");
      localStorage.removeItem("SignUPname");
      dispatch(login(localStorage.getItem("first_name_Login")));
      // history.push("/");
      notifySuccess("Login successful");
      demoTest();
    } else {
      notify("Please fill data!");
    }
  };

  const dispatch = useDispatch();

  const togglePass = () => {
    if (viewPass) {
      setviewPass(false);
    } else {
      setviewPass(true);
    }
  };
  // ------------------
  const demoTest = () => {
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };
  // -----
  // const handle_first_name_set = () => {
  //   if (usingName) {
  //     localStorage.setItem("first_name_Login", usingName);
  //     localStorage.removeItem("name");
  //     // localStorage.removeItem("first_name_Login");
  //     localStorage.removeItem("email_or_mobile");
  //     localStorage.removeItem("password");
  //     localStorage.removeItem("SignUPname");
  //     dispatch(login(localStorage.getItem("first_name_Login")));
  //     // history.push("/");
  //     notifySuccess("Login successful");
  //     demoTest();
  //   } else {
  //     notify("Please fill data!");
  //   }
  // };
  const handleLogin = () => {
    if (email && pass) {
      if (
        localStorage.getItem("email_or_mobile") === email &&
        localStorage.getItem("password") === pass
      ) {
        localStorage.setItem("first_name_Login", localStorage.getItem("name"));
        dispatch(login(localStorage.getItem("first_name_Login")));
        // localStorage.setItem("SignUPname", localStorage.getItem("name"));
        // history.push("/");
        demoTest();
      } else {
        notify("Email and Password NOT match");
      }
    } else {
      notify("Please fill data!");
    }
  };
  // ------------------
  // ------toast warn
  var notify = (lund) =>
    toast.warn(lund, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  // ------toast sucess
  var notifySuccess = (lund) =>
    toast.success(lund, {
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
      <div className="login_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-3 ">
              <div className="useName_wrapper">
                <div className="using_name">
                  <Link to="/">
                    <img src="./imgs/logo.png" alt="" />
                  </Link>
                  <h3
                    style={{
                      fontSize: "2.5rem",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      marginBottom: "3rem",
                    }}
                  >
                    Try Password less login
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <input
                      placeholder="Enter your Name"
                      type="text"
                      value={usingName}
                      onChange={(e) => setusingName(e.target.value)}
                    />
                    {/* <Link to="/"> */}
                    <button
                      className="usingName"
                      type="submit"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   // handle_first_name_set();
                      // }}
                    >
                      login
                    </button>
                    {/* </Link> */}
                    <h4 style={{ fontWeight: "600" }}>
                      Tip💡: Only first name is enough for full website
                      experience!
                    </h4>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-none d-sm-none d-md-block mt-3">
              <div className="center_divider">
                <div className="divider"></div>
              </div>
            </div>
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-3 ">
              <div className="login_container">
                <Link to="/">
                  <img
                    style={{ margin: "2rem 0" }}
                    src="./imgs/logo.png"
                    alt=""
                  />
                </Link>
                <div className="form_wrapper">
                  <h2> Log-In </h2>
                  <label htmlFor="email_input">
                    Email or mobile phone number
                  </label>
                  <input
                    type="email"
                    id="email_input"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />

                  <label htmlFor="password_input">password</label>
                  {viewPass ? (
                    <input
                      type="password"
                      id="email_input"
                      value={pass}
                      onChange={(e) => setpass(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      id="email_input"
                      value={pass}
                      onChange={(e) => setpass(e.target.value)}
                    />
                  )}

                  <div className="view_pass">
                    {viewPass ? (
                      <input
                        value={viewPass}
                        onClick={(e) => setviewPass(e.target.checked)}
                        type="checkbox"
                        id="passShow"
                      />
                    ) : (
                      <input
                        value={viewPass}
                        onClick={(e) => setviewPass(e.target.checked)}
                        type="checkbox"
                        checked
                        id="passShow"
                      />
                    )}

                    <button
                      className="viewPassBtn"
                      onClick={() => togglePass()}
                    >
                      view password
                    </button>
                  </div>
                  <Link to="/" style={{ width: "100%" }}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogin();
                      }}
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Login
                    </button>
                  </Link>
                  <p>
                    By continuing, you agree to Amazon's Conditions of Use and
                    Privacy Notice.....Nah Just kidding!
                  </p>
                </div>
                <div className="new_to_amazon_wrapper">
                  <p>New to Amazon clone?</p>
                  <Link to="/sign-up">
                    <button>Create your Amazon clone account</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer style={{ zIndex: "999999999999999999999" }} />
    </>
  );
};

export default Login;
