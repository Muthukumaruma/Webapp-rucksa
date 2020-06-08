import React from "react";
import NETWORK from "../component/utls/network";
export const UserContext = React.createContext();
import { WriteCookie, GetCookie } from "../component/utls/cookie";

class UserProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginPage: false,
      emailId: "",
      userName:
        this.props.userDetails && this.props.userDetails.username
          ? this.props.userDetails.username
          : "",
      name:
        this.props.userDetails && this.props.userDetails.name
          ? this.props.userDetails.name
          : "",
      userId:
        this.props.userDetails && this.props.userDetails.user_id
          ? this.props.userDetails.user_id
          : "",
      roles:
        this.props.userDetails && this.props.userDetails.roles
          ? this.props.userDetails.roles[0]
          : "",
      loggedin: this.props.loginStatus
    };
  }

  logout = () => {
    NETWORK.get("api/auth/logout").then(res => {
      if (res.data.status == "success") {
        if (GetCookie("sessionid")) {
          document.cookie = `sessionid= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        }
        this.props.authendicate(false);
      } else {
      }
    });
  };

  login = () => {
    console.log(this.props);

    this.props.authendicate(true);
    this.setState({ loggedin: true });
    this.getUser();
    try {
      document.body.classList.remove("authentication");
    } catch (e) {
      console.log(e.message);
    }
  };

  getUser = () => {
    NETWORK.get("api/user/profile").then(res => {
      if (res.data.status == "success") {
        this.setState({
          userName: res.data.user.username,
          name: res.data.user.name,
          userId: res.data.user_id,
          roles: res.data.user.roles[0]
        });
      }
    });
  };

  showLoginPage = title => {
    this.setState({ showLoginPage: true });
  };

  hideLoginPage = type => {
    this.setState({ showLoginPage: false });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          logout: this.logout,
          login: this.login
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
