import React, { useContext, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Link from "next/link";
import { UserContext } from "../../provider/user-provider";
import Router, { useRouter } from "next/router";

const SideMenu = props => {
  const pages = [
    {
      name: "Dashboard",
      path: "/",
      role: "all",
      icon: "zmdi-home"
    },
    {
      name: "User Accounts",
      path: "/user/list",
      role: "Admin Privileges",
      icon: "zmdi-account"
    }
  ];

  if (process.browser) {
    return (
      <div className="menu">
        <Scrollbars
          // onScroll={this.handleScroll}
          // onScrollFrame={this.handleScrollFrame}
          // onScrollStart={this.handleScrollStart}
          // onScrollStop={this.handleScrollStop}
          // onUpdate={this.handleUpdate}
          // renderView={this.renderView}
          // renderTrackHorizontal={this.renderTrackHorizontal}
          // renderTrackVertical={this.renderTrackVertical}
          // renderThumbHorizontal={this.renderThumbHorizontal}
          // renderThumbVertical={this.renderThumbVertical}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax={window.innerHeight - 150}
          thumbMinSize={30}
          universal={true}
          {...props}
        >
          <ul className="list">
            <li className="header">MAIN NAVIGATION</li>
            {pages.map((page, index) => (
              <MenuList page={page} index={index} />
            ))}
          </ul>
        </Scrollbars>
      </div>
    );
  } else {
    return <></>;
  }
};

const MenuList = props => {
  const userConsumer = useContext(UserContext);
  const router = useRouter();
  const gotoPage = page => {
    Router.push({ pathname: page.path, query: {} }, `${page.path}`);
  };

  if (props.page.role == "Admin Privileges") {
    if (userConsumer.state.roles.label == "Admin Privileges") {
      return (
        <li
          className={router.pathname === props.page.path ? "active" : ""}
          key={props.index}
        >
          <a
            onClick={() => gotoPage(props.page)}
            className="toggled waves-effect waves-block"
          >
            <i className={"zmdi " + props.page.icon}></i>
            <span>{props.page.name}</span>
          </a>
        </li>
      );
    } else {
      return <></>;
    }
  } else {
    return (
      <li
        className={router.pathname === props.page.path ? "active" : ""}
        key={props.index}
      >
        <a
          onClick={() => gotoPage(props.page)}
          className="toggled waves-effect waves-block"
        >
          <i className={"zmdi " + props.page.icon}></i>
          <span>{props.page.name}</span>
        </a>
      </li>
    );
  }
};

export default SideMenu;
