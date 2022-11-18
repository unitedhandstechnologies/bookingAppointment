import React from "react";
import { Link } from "react-router-dom";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LanguageHandlerMobile from "../../commonComponent/LanguageSelect/LanguageHandlerMobile";
import { withTranslation } from "react-i18next";
import UserDropDown from "../../commonComponent/UserDropDown/userDropDown";

class PatientHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <div className="divLogo1 mobile-logo">
          <Link to="/">
            <img
              src="assets/images/Group9488.png"
              className="img-fluid logo"
              alt="logo img"
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
                  {t("Doctor.DocHeader.Language")}
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
                        <a className="dropdown-item">
                          {t("Doctor.DocHeader.Overview")}
                        </a>
                        <a className="dropdown-item">
                          {t("Doctor.DocHeader.My_Profile")}
                        </a>
                        <a className="dropdown-item">
                          {t("Doctor.DocHeader.Logout")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" moblie-searchbar">
          <div className="nav-searchbar">
            <div className="dropdown">
              <button
                className="dropdown-toggle nav-dropdown-btn"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-map-marker-alt"></i>Banglore
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item">Action</a>
                <a className="dropdown-item">Another action</a>
                <a className="dropdown-item">Something else here</a>
              </div>
            </div>
            <div className="form-group search-doctor-group">
              <input
                type="text"
                className="form-control search-doctor-input"
                id="exampleInputPassword1"
                placeholder="Search Dotors"
              />
            </div>
            <div className="search-doctor-btn-container text-center">
              <i className="fas fa-search search-doctor-icon-btn"></i>
              <span className="search-doctor-icon-text">Find Doctor</span>
            </div>
          </div>
          <div className="nav-bell">
            <img
              src="assets/images/Group9152.png"
              alt="Group9152.png"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="divHeader divNavMenu">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
              <div className="divLogo1">
                <Link to="/">
                  <img
                    src="assets/images/Group9488.png"
                    className="img-fluid logo"
                    alt="logo img"
                  />
                </Link>
              </div>
              <div className="nav-searchbar">
                <div className="dropdown">
                  <button
                    className="dropdown-toggle nav-dropdown-btn"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-map-marker-alt"></i>Banglore
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item">Action</a>
                    <a className="dropdown-item">Another action</a>
                    <a className="dropdown-item">Something else here</a>
                  </div>
                </div>
                <div className="form-group search-doctor-group">
                  <input
                    type="text"
                    className="form-control search-doctor-input"
                    id="exampleInputPassword1"
                    placeholder="Search Dotors"
                  />
                </div>
                <div className="search-doctor-btn-container text-center">
                  <i className="fas fa-search search-doctor-icon-btn"></i>
                  <span className="search-doctor-icon-text">Find Doctor</span>
                </div>
              </div>
              <div className="nav-bell">
                <img
                  src="assets/images/Group9152.png"
                  alt="Group9152.png"
                  className="img-fluid"
                />
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
              <UserDropDown />
            </nav>
          </div>
        </div>
        <LanguageHandlerMobile />
      </>
    );
  }
}

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(exadoActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(PatientHeader));
