import React from 'react';
import { Link, NavLink } from "react-router-dom";
// import logo from "./../../assets/images/Group9488.png";
import exadoActions from '../../redux/exado/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LanguageHandler from "../../commonComponent/LanguageSelect/LanguageHandler";
import LanguageHandlerMobile from "../../commonComponent/LanguageSelect/LanguageHandlerMobile";
import { withTranslation, Trans } from 'react-i18next';
// import threelines from "./../../assets/images/01aligncenter(icon).png";
// import languagedropdown from "./../../assets/images/Iconionic-md-arrow-dropdown.png";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //language: 'en'
    };
  }

  UpdateLoginType(type) {
    window.localStorage.setItem("login-Type", type);
    this.props.LoginType(type);
  }

  render() {
    const { t } = this.props
    return (
      <>
        <div className="divLogo1 mobile-logo">
          <a href="homePage2.html">
            <Link to="/"><img src="assets/images/Group9488.png" className="img-fluid logo" alt='link logo' /></Link>
          </a>
        </div>
        <div className="mobile-nav justify-content-between align-items-center">
          <div className="mobile-nav w-100 justify-content-between">
            <div className="menu-icon">
              <img src="assets/images/01aligncenter(icon).png" alt="01aligncenter(icon).png" className="img-fluid mobile-menu-item-menu" data-toggle="modal" data-target="#mobilemodalmenu" />
            </div>
            <div className="menu-collapse">
              <span data-toggle="modal" data-target="#mobilemodallanguage" className="mobile-menu-item-language">{t("Login_Page.Header.Language")}
                <img src="assets/images/Iconionic-md-arrow-dropdown.png" alt="Iconionic-md-arrow-dropdown.png" className="mx-2" /></span>
            </div>
          </div>
        </div>
        <div className="divHeader divNavMenu">
          <div className="container p-0">
            <nav className="navbar navbar-expand-lg bg-white">
              <div className="divLogo1"><Link to="/"><img src="assets/images/Group9488.png" className="img-fluid logo" alt='logo img' /></Link></div>
              <button className="navbar-toggler toggle-btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto nav-top-menu">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/book-an-appoinment">{t('Book_an_Appoinment')}</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/chat-with-doctor" activeStyle={{ fontWeight: "bold", color: "#436B95" }}>{t('Chat_with_Doctor')}</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/emergency" activeStyle={{ fontWeight: "bold", color: "#436B95" }}>{t('Emergency')}</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">{t('Help_Support')}</NavLink>
                  </li>
                  <LanguageHandler />
                  <li className="nav-item profile">
                    <div>
                      <div className="d-flex align-items-center">
                        <div className="nav-item dropdown dropdown-menu-third position-static w-100">
                          <a className="nav-link dropdown-toggle landing-dropdown-toggle" id="navbarDropdown=3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {t("Login_Page.Header.Login")} / {t("Login_Page.Header.Signup")}
                          </a>
                          <div className="dropdown-menu dropdown-menu-third" aria-labelledby="navbarDropdown3">
                            <div className="row">
                              <div className="col-md-12">
                                <a onClick={this.UpdateLoginType.bind(this, 'Doctor')} className="dropdown-item">{t("Login_Page.Header.Doctor_Login")}</a>
                                <a onClick={this.UpdateLoginType.bind(this, 'Patient')} className="dropdown-item">{t("Login_Page.Header.User_Login")}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="modal fade mobile-nav-modal-menu" id="mobilemodalmenu" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="mobilemodalmenuLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <img src="assets/images/Group9488.png" width="150" className="img-fluid logo" alt='logo img' />
                <button type="button" className="close language-close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body menu-container">
                <div className="row">
                  <div className="col-12">
                    <NavLink className="nav-link dropdown-item" to="/book-an-appoinment">{t('Book_an_Appoinment')}</NavLink>
                    <NavLink className="nav-link dropdown-item" to="/chat-with-doctor" activeStyle={{ fontWeight: "bold" }}>{t('Chat_with_Doctor')}</NavLink>
                    <NavLink className="nav-link dropdown-item" to="/emergency" activeStyle={{ fontWeight: "bold" }}>{t('Emergency')}</NavLink>
                    <NavLink className="nav-link dropdown-item" to="/">{t('Help_Support')}</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LanguageHandlerMobile />
      </>
    )
  }
}

function mapStoreToprops(state, props) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(exadoActions, dispatch);
  return { actions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(Header));