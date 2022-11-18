import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { localStorageKeys } from "../../utility/common";

class UserDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  LogoutUser = (event) => {
    let userType = localStorage.getItem("user-type");
    localStorage.clear();
    if (this.props.history.location.pathname === "/" && userType !== "3")
      this.props.logOutAction();
    else if (userType === "3") this.props.history.replace("/admin-login");
    else this.props.history.replace("/home");
  };

  getProfileImage = () => {
    const image = localStorage.getItem(localStorageKeys.profileImage);
    if (image && image !== "null" && image !== "undefined") return image;
    else return "assets/images/default-avatar.png";
  };

  render() {
    const { t } = this.props;
    return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto nav-top-menu">
          <li className="nav-item profile">
            <div>
              <div className="d-flex align-items-center">
                <div className="profilePhotoContainer">
                  <div className="profilePhoto d-flex justify-content-center align-items-center">
                    <img
                      src={this.getProfileImage()}
                      style={{ borderRadius: "inherit" }}
                      className="img-fluid"
                      alt="profile"
                    />
                  </div>
                </div>
                <div className="nav-item dropdown dropdown-menu-third position-static w-100">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown=3"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("user-fullname")}
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-third"
                    aria-labelledby="navbarDropdown3"
                  >
                    <div className="row">
                      {localStorage.getItem("user-type") == "3" && (
                        <div className="col-md-12">
                          <Link
                            className="dropdown-item"
                            to={`/admin-dashboard`}
                          >
                            {t("Doctor.DocHeader.Overview")}
                          </Link>
                          <div
                            className="dropdown-item"
                            onClick={this.LogoutUser.bind(this)}
                          >
                            {t("Doctor.DocHeader.Logout")}
                          </div>
                        </div>
                      )}
                      {localStorage.getItem("user-type") == "2" && (
                        <div className="col-md-12">
                          <Link
                            className="dropdown-item"
                            to={`/patient-dashboard`}
                          >
                            {t("Doctor.DocHeader.Overview")}
                          </Link>
                          <Link
                            className="dropdown-item"
                            to={`/patient-profile`}
                          >
                            {t("Doctor.DocHeader.My_Profile")}
                          </Link>
                          <div
                            className="dropdown-item"
                            onClick={this.LogoutUser.bind(this)}
                          >
                            {t("Doctor.DocHeader.Logout")}
                          </div>
                        </div>
                      )}
                      {localStorage.getItem("user-type") == "1" && (
                        <div className="col-md-12">
                          <Link
                            className="dropdown-item"
                            to={`/doctor-dashboard`}
                          >
                            {t("Doctor.DocHeader.Overview")}
                          </Link>
                          <Link
                            className="dropdown-item"
                            to={`/doctor-profile`}
                          >
                            {t("Doctor.DocHeader.My_Profile")}
                          </Link>
                          <div
                            className="dropdown-item"
                            onClick={this.LogoutUser.bind(this)}
                          >
                            {t("Doctor.DocHeader.Logout")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      // <div>
      //     <li className="nav-item profile">
      //         <div className="d-flex align-items-center">
      //             <div className="profilePhotoContainer">
      //                 <div className="profilePhoto d-flex justify-content-center align-items-center">
      //                     <img style={{ borderRadius: "inherit" }} src={window.localStorage.getItem("profile-image")} />
      //                 </div>
      //             </div>
      //             <li className="nav-item dropdown dropdown-menu-third position-static">
      //                 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown=3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      //                     {localStorage.getItem('user-fullname')}
      //                 </a>
      //                 <div className="dropdown-menu dropdown-menu-third" aria-labelledby="navbarDropdown3">
      //                     <div className="row">
      //                         {localStorage.getItem("user-type") == "3" &&
      //                             <div className="col-md-12">
      //                                 <Link className="dropdown-item" to={`/admin-dashboard`}>Overview</Link>
      //                                 <a className="dropdown-item" onClick={this.LogoutUser.bind(this)}>Logout</a>
      //                             </div>
      //                         }
      //                         {localStorage.getItem("user-type") == "2" &&
      //                             <div className="col-md-12">
      //                                 <Link className="dropdown-item" to={`/patient-dashboard`}>Overview</Link>
      //                                 <Link className="dropdown-item" to={`/patient-profile`}>My Profile</Link>
      //                                 <a className="dropdown-item" onClick={this.LogoutUser.bind(this)}>Logout</a>
      //                             </div>
      //                         }
      //                         {localStorage.getItem("user-type") == "1" &&
      //                             <div className="col-md-12">
      //                                 <Link className="dropdown-item" to={`/doctor-dashboard`}>Overview</Link>
      //                                 <Link className="dropdown-item" to={`/doctor-profile`}>My Profile</Link>
      //                                 <a className="dropdown-item" onClick={this.LogoutUser.bind(this)}>Logout</a>
      //                             </div>
      //                         }
      //                     </div>
      //                 </div>
      //             </li>
      //         </div>
      //     </li>

      //     {/*  <li className="nav-item profile">
      //         <div>
      //             <div className="d-flex align-items-center">
      //                 <div className="profilePhotoContainer">
      //                     <div className="profilePhoto">
      //                     </div>
      //                 </div>
      //                 <div className="d-flex profileContainer">
      //                     <div className="userName pr-2">{localStorage.getItem('user-fullname')}</div>
      //                     <div className="drowdownArrow">
      //                         <a className="nav-link dropdown-toggle navbarDropdown" href="#" id="navbarDropdown"
      //                             role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
      //                         <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdown">
      //                             <li onClick={this.LogoutUser.bind(this)}><a className="dropdown-item" href="#">Logout</a></li>
      //                         </ul>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </li> */}
      // </div>
    );
  }
}

export default withRouter(withTranslation()(UserDropDown));
