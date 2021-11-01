import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast, ToastContainer } from "react-toastify";
import "./Signup.scss";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [viewPass, setviewPass] = useState(true);
  const history = useHistory();

  const togglePass = () => {
    if (viewPass) {
      setviewPass(false);
    } else {
      setviewPass(true);
    }
  };
  // -------------------
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
          body: JSON.stringify([
            [name, email, pass, new Date().toLocaleString()],
          ]),
        }
      );
      await response.json();
      // setName("");
      // setEmail("");
      // setPass("");
      if (name && email && pass) {
        localStorage.setItem("name", name);
        localStorage.setItem("email_or_mobile", email);
        localStorage.setItem("password", pass);
        history.push("/login");
      } else {
        notify("Please fill data!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // -------------------
  // const handleSignUP = () => {
  //   if (name && email && pass) {
  //     localStorage.setItem("name", name);
  //     localStorage.setItem("email_or_mobile", email);
  //     localStorage.setItem("password", pass);
  //     history.push("/login");
  //   } else {
  //     notify("Please fill data!");
  //   }
  // };
  // -------------------
  // ------toast
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
  return (
    <>
      <div className="login_wrapper">
        <div className="container">
          <div className="row">
            <div className="col col-sm-8 col-md-6 col-lg-4  mx-auto mt-3">
              <div className="login_container">
                <Link to="/">
                  <img
                    style={{ margin: "2rem 0" }}
                    src="./imgs/logo.png"
                    alt=""
                  />
                </Link>
                <form onSubmit={handleSubmit} className="form_wrapper">
                  <h2 className="text-center"> Sign-up </h2>
                  <label htmlFor="name_input">Name</label>
                  <input
                    type="text"
                    id="name_input"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <label htmlFor="email_input">
                    Email or mobile phone number
                  </label>
                  <input
                    type="email"
                    id="password_input"
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
                  {/* <Link to="/login" style={{ width: "100%" }}> */}
                  <button
                    style={{ width: "100%" }}
                    type="submit"
                    // onClick={() => handleSignUP()}
                  >
                    Sign up
                  </button>
                  {/* </Link> */}
                  <p>
                    By continuing, you agree to Amazon's Conditions of Use and
                    Privacy Notice.....Also Just kidding!
                  </p>
                </form>
                <div className="new_to_amazon_wrapper">
                  <p>Already member?</p>
                  <Link to="/login">
                    <button style={{ width: "30rem" }}>
                      Go to login page!
                    </button>
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

export default Signup;
