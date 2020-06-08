import React, { useState, useEffect, useContext } from "react";
const qs = require("querystring");
import { DebounceInput } from "react-debounce-input";
import NETWORK from "../../component/utls/network";
import { UserContext } from "../../provider/user-provider";
import "../../sass/component/_modal.scss";

const EditUser = props => {
  const [name, setName] = useState(props.selectedUser.name);
  const [userName, setUserName] = useState(props.selectedUser.username);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState(props.selectedUser.role[0].id);
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState([]);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [available, setAvailable] = useState(undefined);
  const userConsumer = useContext(UserContext);

  const updateUser = () => {
    if (!active) return false;
    // validations

    NETWORK.post(
      "api/admin/user/update/profile",
      qs.stringify({
        user_id: props.selectedUser.user_id,
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
    if (val.length < 5) return false;
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

    if (name.length >= 4 && userName.length >= 5 && role != "") {
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
        <div className="overlay" onClick={() => props.closeEditPopup()}></div>
        <div className="modal-content animated fadeInDown faster">
          {!success ? (
            <>
              <h5>
                <i className="zmdi zmdi-account-add"></i> Edit User
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
                    defaultValue={props.selectedUser.name}
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    value={props.selectedUser.username}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group drop-custum">
                <select
                  className="form-control show-tick"
                  onChange={e => setRole(e.target.value)}
                  defaultValue={role}
                  disabled={role === userConsumer.state.roles.id}
                >
                  {roles.map((role, index) => (
                    <option
                      defaultValue={role.role_id === role}
                      value={role.role_id}
                      key={index}
                    >
                      {role.label}
                    </option>
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
                  onClick={() => updateUser()}
                >
                  Submit
                </button>
                <button
                  type="submit"
                  className="btn btn-raised"
                  onClick={() => props.closeEditPopup()}
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
                  onClick={() => props.closeEditPopup()}
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

export default EditUser;
