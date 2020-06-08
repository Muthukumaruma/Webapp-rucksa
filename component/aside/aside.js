import React from "react";
import UserInfo from "./user-info";
import SideMenu from "./side-menu";

import "../../sass/component/_sidebar.scss";
const Aside = () => {
  return (
    <aside className="sidebar">
      <UserInfo />
      <SideMenu />
    </aside>
  );
};

export default Aside;
