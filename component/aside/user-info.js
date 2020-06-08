import React, { useContext } from "react";
import Report from "./report";
import NETWORK from "../utls/network";
import { UserContext } from "../../provider/user-provider";

const UserInfo = () => {
  const userConsumer = useContext(UserContext);
  const signout = () => {
    userConsumer.logout();
  };
  return (
    <div className="user-info">
      <div className="admin-image">
        {" "}
        <img src="/images/avatar.jpg" alt="" />{" "}
      </div>
      <div className="admin-action-info">
        {" "}
        <span>Welcome</span>
        <h3>{userConsumer.state.name}</h3>
        <ul>
          <li>
            <a title="Go to Inbox">
              <i className="zmdi zmdi-email"></i>
            </a>
          </li>
          <li>
            <a title="Go to Profile">
              <i className="zmdi zmdi-account"></i>
            </a>
          </li>
          <li>
            <a className="js-right-sidebar" data-close="true">
              <i className="zmdi zmdi-settings"></i>
            </a>
          </li>
          <li>
            <a title="Sign Out" onClick={() => signout()}>
              <i className="zmdi zmdi-sign-in"></i>
            </a>
          </li>
        </ul>
      </div>
      <Report />
    </div>
  );
};

export default UserInfo;
