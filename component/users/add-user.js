import React, { useState, useEffect } from "react";
const qs = require("querystring");
import { DebounceInput } from "react-debounce-input";
import NETWORK from "../../component/utls/network";
import "../../sass/component/_modal.scss";

const AddUser = props => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState([]);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [available, setAvailable] = useState(undefined);

  const createUser = () => {
    if (!active) return false;
    // validations
    if (!available) {
      setError(true);
      setErrorMessage("User name already exist");
      return false;
    } else if (password != confPassword) {
      setError(true);
      setErrorMessage("Password and confirm password doesn't match");
      return false;
    }

    NETWORK.post(
      "api/admin/user/create",
      qs.stringify({
        username: userName,
        password: password,
        name: name,
        role_id: role
      })
    ).then(res => {
      if (res.data.status == "success") {
        setSuccess(true);
        props.getUsers();
      } else {
        setError(true);
        setErrorMessage(res.data.message);
      }
    });
  };

  const checkAvail = val => {
    setError(false);
    if (val.length < 3) return false;
    setTimeout(() => {
      NETWORK.get(`api/admin/user/availability?username=${val}`).then(res => {
        if (res.data.status == "success") {
          setAvailable(true);
          setError(false);
        } else {
          setAvailable(false);
          setError(true);
          setErrorMessage(res.data.message);
        }
      });
    }, 500);
  };

  useEffect(() => {
    if (roles.length == 0) {
      getRole();
    }

    if (
      name.length >= 4 &&
      userName.length >= 3 &&
      password.length >= 6 &&
      confPassword.length >= 6 &&
      role != ""
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const getRole = () => {
    NETWORK.get("api/role/list").then(res => {
      if ((res.data.status = "success")) {
        setRoles(res.data.roles);
      }
    });
  };

  return (
    <>
      <div className="popup-modal ">
        <div className="overlay" onClick={() => props.closeUserPopup()}></div>
        <div className="modal-content animated fadeInDown faster">
          {!success ? (
            <>
              <h5>
                <i class="zmdi zmdi-account-add"></i> Add User
              </h5>
              <div className="form-group">
                <div
                  className={
                    "form-line " + (name.length >= 4 ? "succuess" : "")
                  }
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    autoFocus="autofocus"
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div
                  className={
                    "form-line " +
                    (available == true ? "succuess" : "") +
                    (available == false ? "failure" : "")
                  }
                >
                  {/* <DebounceInput
                    debounceTimeout={200}
                    placeholder="User Name"
                    className="form-control"
                    value={userName}
                    onChange={e => {
                      setUserName(e.target.value);
                      checkAvail(e.target.value);
                    }}
                  /> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    onChange={e => {
                      setUserName(e.target.value);
                      checkAvail(e.target.value);
                    }}
                  />
                </div>
              </div>
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
              <div className="form-group drop-custum">
                <select
                  class="form-control show-tick"
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="">-- Role --</option>
                  {roles.map(role => (
                    <option value={role.role_id}>{role.label}</option>
                  ))}
                </select>
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
                  onClick={() => createUser()}
                >
                  Submit
                </button>
                <button
                  type="submit"
                  className="btn btn-raised"
                  onClick={() => props.closeUserPopup()}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="success">
                <i class="zmdi zmdi-check-all"></i>
                <h3>Successfully created user {name}</h3>
                <button
                  type="submit"
                  className="btn btn-raised"
                  onClick={() => props.closeUserPopup()}
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

export default AddUser;
