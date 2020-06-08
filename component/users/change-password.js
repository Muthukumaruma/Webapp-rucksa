import React, { useState, useEffect, useContext } from "react";
const qs = require("querystring");
import { DebounceInput } from "react-debounce-input";
import NETWORK from "../utls/network";
import { UserContext } from "../../provider/user-provider";
import "../../sass/component/_modal.scss";

const ChangePassword = props => {
  const [userName, setUserName] = useState(props.selectedUser.username);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userConsumer = useContext(UserContext);

  const updatePassword = () => {
    if (!active) return false;
    // validations
    if (password != confPassword) {
      setError(true);
      setErrorMessage("Password and confirm password doesn't match");
      return false;
    }

    NETWORK.post(
      "api/admin/user/update/password",
      qs.stringify({
        user_id: props.selectedUser.user_id,
        password: password
      })
    ).then(res => {
      if (res.data.status == "success") {
        setSuccess(true);
        if (props.selectedUser.user_id == userConsumer.state.userId) {
          userConsumer.logout();
        }
      } else {
        setError(true);
        setErrorMessage(res.data.message);
      }
    });
  };

  useEffect(() => {
    if (password.length >= 6 && confPassword.length >= 6) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="popup-modal ">
        <div className="overlay" onClick={() => props.closePassword()}></div>
        <div className="modal-content animated fadeInDown faster">
          {!success ? (
            <>
              <h5>
                <i className="zmdi zmdi-account-add"></i> Change Password for{" "}
                {userName}
              </h5>
              <div className="form-group">
                <div
                  className={
                    "form-line " + (password.length >= 6 ? "succuess" : "")
                  }
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div
                  className={
                    "form-line " +
                    (confPassword.length >= 6 && password == confPassword
                      ? "succuess"
                      : "") +
                    (confPassword.length >= password.length &&
                    password != confPassword
                      ? "failure"
                      : "")
                  }
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={e => setConfPassword(e.target.value)}
                  />
                </div>
              </div>
              <p className={"error " + (error == true ? "show" : "hide")}>
                {errorMessage}
              </p>
              <div className="btn-list">
                <button
                  type="submit"
                  className={
                    "btn btn-raised g-bg-cyan " + (active ? " " : "disabled")
                  }
                  onClick={() => updatePassword()}
                >
                  Submit
                </button>
                <button
                  type="submit"
                  className="btn btn-raised"
                  onClick={() => props.closePassword()}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="success">
                <i class="zmdi zmdi-check-all"></i>
                <h3>Successfully Updated user {name}</h3>
                <button
                  type="submit"
                  className="btn btn-raised"
                  onClick={() => props.closePassword()}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
