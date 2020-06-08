import React, { Component } from "react";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Component {...this.props} />
      </>
    );
  }
}
export default Layout;
