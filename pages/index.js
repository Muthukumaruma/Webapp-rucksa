import React, { Component } from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="block-header">
          <h2>Dashboard</h2>
          <small className="text-muted">Welcome to Rucksa application</small>
        </div>
      </>
    );
  }
}

export default HomePage;
