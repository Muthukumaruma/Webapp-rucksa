import React, { useContext, useState } from "react";
import { UserContext } from "../provider/user-provider";
import NETWORK from "../component/utls/network";
// import Cookies from "universal-cookie";
// import { response } from "express";
import { WriteCookie, GetCookie } from "../component/utls/cookie";
const qs = require("querystring");
import "../sass/_login.scss";

const Login = props => {
  const userConsumer = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const signin = () => {
    if (userName.length < 3 || password.length < 5) {
      setError(true);
      if (userName.length < 3 && password.length >= 5) {
        setErrorMessage("User name should be minimum 3 charector");
      } else if (password.length < 5 && userName.length >= 3) {
        setErrorMessage("Password should be minimum 5 charector");
      } else {
        setErrorMessage("Please enter valid Username and Password");
      }
      return false;
    }
    let loginDetails = NETWORK.post(
      "api/auth/login",
      qs.stringify({ username: userName, password: password })
    ).then(res => {
      if (res.data.status == "success") {
        if (!GetCookie("sessionid")) {
          WriteCookie("sessionid", res.data.data.auth_token, 24);
        }

        userConsumer.login(true);
      } else {
        setError(true);
        setErrorMessage(res.data.message);
      }
    });
  };

  return (
    <>
      <div className="card">
        <h1 className="title">
          <span>Welcome to Rucksa </span>Login{" "}
          <span className="msg">Sign in to start your session</span>
        </h1>
        <div className="body">
          <form>
            <div className="input-group icon before_span">
              <span className="input-group-addon">
                {" "}
                <i className="zmdi zmdi-account"></i>{" "}
              </span>
              <div className="form-line">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  required
                  autoFocus={true}
                  onChange={e => {
                    setUserName(e.target.value), setError(false);
                  }}
                />
              </div>
            </div>
            <div className="input-group icon before_span">
              <span className="input-group-addon">
                {" "}
                <i className="zmdi zmdi-lock"></i>{" "}
              </span>
              <div className="form-line">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required=""
                  onChange={e => {
                    setPassword(e.target.value), setError(false);
                  }}
                  onSubmit={signin}
                />
              </div>
            </div>
            <div>
              {/* <div className="">
                <input
                  type="checkbox"
                  name="rememberme"
                  id="rememberme"
                  className="filled-in chk-col-pink"
                />
                <label for="rememberme">Remember Me</label>
              </div> */}
              <div className="text-center">
                <a
                  className="btn btn-raised waves-effect g-bg-cyan"
                  onClick={signin}
                >
                  SIGN IN
                </a>
                {/* <a href="sign-up.html" className="btn btn-raised waves-effect">
                  SIGN UP
                </a> */}
              </div>
              <div className="text-center">
                {" "}
                <a>Forgot Password?</a>
              </div>
              <LoginError error={error} errorMessage={errorMessage} />
            </div>
          </form>
        </div>
      </div>
      {/* <div className="login-bg"></div> */}
    </>
  );
};

const LoginError = props => {
  if (props.error && props.errorMessage != "") {
    return (
      <>
        <p className="error">
          <i class="zmdi zmdi-info-outline"></i> {props.errorMessage}
        </p>
      </>
    );
  } else {
    return <></>;
  }
};

export default Login;
