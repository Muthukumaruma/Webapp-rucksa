import React, { useState, useEffect } from "react";
const qs = require("querystring");
import NETWORK from "../../component/utls/network";

const CheckUser = props => {
  const [available, setAvailable] = useState(undefined);

  const checkAvail = () => {
    NETWORK.get(`api/admin/user/availability?username=${props.userName}`).then(
      res => {
        if (res.data.status == "success") {
          setAvailable(true);
        } else {
          setAvailable(false);
        }
      }
    );
  };

  useEffect(() => {
    setAvailable(undefined);
  }, [props.userName]);

  if (available == undefined) {
    return (
      <>
        <div className="check">
          <small className="pointer " onClick={() => checkAvail()}>
            Check Available
          </small>
        </div>
      </>
    );
  } else if (available == true) {
    return (
      <>
        <div className="check status">
          <i class="zmdi zmdi-check-circle success"></i>
        </div>
      </>
    );
  } else
    return (
      <>
        <div className="check status">
          <i class="zmdi zmdi-close-circle failure"></i>
        </div>
      </>
    );
};

export default CheckUser;
