import React, { Component } from "react";
import ListUser from "../../component/users/list-user";
import NETWORK from "../../component/utls/network";
import AddUser from "../../component/users/add-user";
import EditUser from "../../component/users/edit-user";
import { UserContext } from "../../provider/user-provider";
import ChangePassword from "../../component/users/change-password";
import "../../sass/component/_user.scss";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: "",
      pageNo: 0,
      limit: 10,
      offset: 0,
      count: 0,
      addUserPopup: false,
      editUserPopup: false,
      changePasswordPopup: false,
      selectedUser: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    NETWORK.get(
      `api/admin/user/list?limit=${this.state.limit}&offset=${this.state.pageNo}`
    ).then(res => {
      this.setState({
        userList: res.data.data.users,
        count: res.data.data.count,
        pageNo: this.state.pageNo++
      });
    });
  };

  addUser() {
    this.setState({ addUserPopup: true });
  }

  closeUserPopup = () => {
    this.setState({ addUserPopup: false });
  };

  editUser = data => {
    debugger;
    this.setState({
      editUserPopup: true,
      selectedUser: {
        name: data.name,
        user_id: data.user_id,
        username: data.username,
        role: data.roles
      }
    });
  };

  updatePassword = data => {
    this.setState({
      changePasswordPopup: true,
      selectedUser: {
        name: data.name,
        user_id: data.user_id,
        username: data.username,
        role: data.roles
      }
    });
  };

  closePassword = () => {
    this.setState({ changePasswordPopup: false });
  };

  closeEditPopup = () => {
    this.setState({ editUserPopup: false });
  };
  static contextType = UserContext;

  render() {
    if (process.browser) {
      if (this.context.state.roles.label == "Admin Privileges") {
        return (
          <>
            {/* Show add user popup */}
            {this.state.addUserPopup ? (
              <AddUser
                closeUserPopup={this.closeUserPopup}
                getUsers={this.getUsers}
              />
            ) : (
              <></>
            )}

            {this.state.editUserPopup ? (
              <EditUser
                selectedUser={this.state.selectedUser}
                closeEditPopup={this.closeEditPopup}
                getUsers={this.getUsers}
              />
            ) : (
              <></>
            )}

            {this.state.changePasswordPopup ? (
              <>
                <ChangePassword
                  selectedUser={this.state.selectedUser}
                  closePassword={this.closePassword}
                />
              </>
            ) : (
              <></>
            )}
            <div className="block-header">
              <h2>Users List</h2>
              <p className="text-muted">Create or Edit Users</p>
            </div>
            <div className="add-user">
              <button
                type="button"
                className="btn  btn-raised bg-teal waves-effect"
                onClick={() => this.addUser()}
              >
                <i className="zmdi zmdi-account-add"></i> Add User
              </button>
            </div>

            <div className="row clearfix">
              <ListUser
                users={this.state.userList}
                count={this.state.count}
                editUser={this.editUser}
                updatePassword={this.updatePassword}
              />
            </div>
          </>
        );
      } else {
        return (
          <div className="no-access text-center">
            <i class="zmdi zmdi-block"></i>

            <h1>You don't have a Access to this page</h1>
            <p>Contact your admin</p>
          </div>
        );
      }
    } else {
      return <></>;
    }
  }
}

export default Users;
