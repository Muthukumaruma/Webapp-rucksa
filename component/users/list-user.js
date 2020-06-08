import React from "react";

const ListUser = props => {
  if (props.count > 0) {
    return (
      <>
        {props.users.map((user, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
            <div className="card all-patients">
              <div className="body">
                <div className="row">
                  <div className="col-md-3 col-sm-3 text-center m-b-0">
                    <a className="p-profile-pix">
                      <img
                        src="http://via.placeholder.com/60x60"
                        alt="user"
                        className="img-thumbnail img-fluid"
                      />
                    </a>
                  </div>
                  <div className="col-md-9 col-sm-9 m-b-0">
                    <h5 className="m-b-0">
                      {user.name}{" "}
                      <a
                        className="edit"
                        onClick={() => props.updatePassword(user)}
                      >
                        <i class="zmdi zmdi-key"></i>
                      </a>
                      <a className="edit" onClick={() => props.editUser(user)}>
                        <i className="zmdi zmdi-edit"></i>
                      </a>
                    </h5>{" "}
                    <div>
                      <b title="User name">User name : </b>
                      {user.username}
                    </div>
                    <div>
                      <b title="Role">Role: </b>
                      {user.roles.map((role, index) => (
                        <span key={index}>{role.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
};

export default ListUser;
