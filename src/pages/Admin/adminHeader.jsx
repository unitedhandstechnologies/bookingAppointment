import React from "react";
import { Redirect, Link, NavLink } from "react-router-dom";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserDropDown from "../../commonComponent/UserDropDown/userDropDown";
import LanguageHandlerMobile from "../../commonComponent/LanguageSelect/LanguageHandlerMobile";
class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="divLogo1 mobile-logo">
          <Link to="/">
            <img
              src="assets/images/logo.png"
              className="img-fluid logo"
              alt="link img"
            />
          </Link>
        </div>
        <div className="mobile-nav justify-content-between align-items-center">
          <div className="menu-icon">
            <img
              src="assets/images/01aligncenter(icon).png"
              alt="01aligncenter(icon).png"
              className="img-fluid mobile-menu-item-menu"
              data-toggle="modal"
              data-target="#mobilemodalmenu"
            />
          </div>
          <div className="mobile-right-menu">
            <div className="d-flex align-items-center">
              <div className="menu-collapse mx-2">
                <span
                  data-toggle="modal"
                  data-target="#mobilemodallanguage"
                  className="mobile-menu-item-language"
                >
                  Language{" "}
                  <img
                    src="assets/images/Iconionic-md-arrow-dropdown.png"
                    alt="Iconionic-md-arrow-dropdown.png"
                  />
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div className="profilePhotoContainer mobile-menu-profile">
                  <div className="profilePhoto d-flex justify-content-center align-items-center">
                    <img
                      src="assets/images/Ellipse354.png"
                      alt="Ellipse354.png"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="nav-item dropdown dropdown-menu-third">
                  <a
                    className="nav-link dropdown-toggle mobile-menu-item-profile"
                    id="navbarDropdown3"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Michael S.
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-third"
                    aria-labelledby="navbarDropdown3"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <a className="dropdown-item">Overview </a>
                        <a className="dropdown-item">My Profile</a>
                        <a className="dropdown-item">Logout</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divHeader divNavMenu">
          <div className="container-fluid px-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
              <div className="divLogo1">
                <Link to="/">
                  <img
                    src="assets/images/logo.png"
                    className="img-fluid logo"
                    alt="link img"
                  />
                </Link>
              </div>
              <button
                className="navbar-toggler toggle-btn"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto nav-top-menu">
                  <UserDropDown />
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <LanguageHandlerMobile />
      </>
    );
  }
}

const mapStoreToprops = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(exadoActions, dispatch);
  return { actions };
};

export default connect(mapStoreToprops, mapDispatchToProps)(AdminHeader);
