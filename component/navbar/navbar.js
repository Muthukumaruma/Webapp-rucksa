import React from "react";
import "../../sass/component/_navbar.scss";
const Navbar = () => {
  return (
    <>
      <nav className="navbar clearHeader">
        <div className="col-md-12">
          <div className="navbar-header">
            {" "}
            <a className="bars"></a>{" "}
            <a className="navbar-brand" href="/">
              <img src="/images/logo.png" title="Rucksa" />
            </a>{" "}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
