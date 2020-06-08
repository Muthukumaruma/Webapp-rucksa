import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import UserProvider from "../provider/user-provider";
import Login from "../component/login-page";
import Navbar from "../component/navbar/navbar";
import Aside from "../component/aside/aside";
import NETWORK from "../component/utls/network";
const qs = require("querystring");
import "../sass/style.scss";

class RucksaApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.pageProps.loginStatus
    };

    if (process.browser) {
      this.onPageStart();
    } else {
    }
  }

  onPageStart = () => {
    // this.authendicate(false); /api/user/login/status
  };

  static async getInitialProps({ Component, ctx, router }) {
    const env = process.browser ? "client" : "server";

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    if (!process.browser) {
      NETWORK.defaults.headers.common["cookie"] = ctx.req.headers.cookie
        ? ctx.req.headers.cookie
        : "";

      try {
        let user = await NETWORK.get("api/user/profile");

        let loginStatus = await NETWORK.get("api/user/login/status");

        pageProps.userDetails = user.data.user;

        pageProps.loginStatus = loginStatus.data.status;
      } catch (e) {}
    }

    // ctx.res.set("Set-Cookie", profile.headers["set-cookie"]);

    return { pageProps };
  }

  componentDidMount() {
    try {
      if (!this.state.authenticated) {
        document.body.classList.add("authentication");
      } else {
        document.body.classList.remove("authentication");
      }
    } catch (e) {}
  }

  authendicate = value => {
    if (value == false) {
      document.body.classList.add("authentication");
    } else {
      document.body.classList.remove("authentication");
    }

    this.setState({ authenticated: value });
  };

  render() {
    const { Component, pageProps, router } = this.props;

    const queryParams = router.query;
    // if (process.browser) {
    //   debugger;
    //   if (pageProps.loginStatus == "success") {
    //     this.authendicate(true);
    //   } else {
    //     this.authendicate(false);
    //   }
    // }

    return (
      <>
        <Head>
          <title>Rucksa</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>

        {console.log(this.state.authenticated)}
        {!this.state.authenticated ? (
          <div className="login">
            <UserProvider
              userDetails={pageProps.userDetails}
              loginStatus={pageProps.loginStatus}
              authendicate={val => this.authendicate(val)} //Login process
            >
              <Login />
            </UserProvider>
          </div>
        ) : (
          <div className="main">
            <UserProvider
              userDetails={pageProps.userDetails}
              setLogin={this.authendicate}
              authendicate={val => this.authendicate(val)}
            >
              <Navbar />
              <Aside />
              <section className="content">
                <div className="container-fluid">
                  <Component {...pageProps} />
                </div>
              </section>
              <div className="color-bg"></div>
            </UserProvider>
          </div>
        )}
      </>
    );
  }
}
export default RucksaApp;
