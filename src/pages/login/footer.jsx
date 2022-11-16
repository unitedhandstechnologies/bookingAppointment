import React from 'react';
// import Logowhite from "./../../assets/images/Logowhite.png";
import { Link, NavLink } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    const { t } = this.props;

    return (
      <div className="footer-container">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
              <div className="div-footer-title">
                <h3>{t("Login_Page.Footer.Exado")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li>
                  <NavLink className="sidebar-menu-a w-100" to="/">
                    {t("Login_Page.Footer.Home")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="sidebar-menu-a w-100" to="/about-us">
                    {t("Login_Page.Footer.About_Us")}
                  </NavLink>
                </li>
                <li><a href="/#how-it-works">{t("Login_Page.Footer.How_It_Works")}</a></li>
                <li><a>{t("Login_Page.Footer.Careers")}</a></li>
                <li>
                  <NavLink className="sidebar-menu-a w-100" to="/contact-us">
                    {t("Login_Page.Footer.Contact_Us")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="sidebar-menu-a w-100" to="/terms-and-conditions">
                    {t("Login_Page.Footer.Terms_N_Conditions")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="div-footer-title">
                <h3>{t("Login_Page.Footer.Specialities")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li><Link exact to="/book-an-appoinment/Dentists">{t("Login_Page.Footer.Dentists")}</Link></li>
                <li><Link exact to="/book-an-appoinment/Cardiologists">{t("Login_Page.Footer.Cardiologists")}</Link></li>
                <li><Link exact to="/book-an-appoinment/Dermatologists">{t("Login_Page.Footer.Dermatologists")}</Link></li>
                <li><Link exact to="/book-an-appoinment/Endocrinologists">{t("Login_Page.Footer.Endocrinologists")}</Link></li>
                <li><Link exact to="/book-an-appoinment/Hematologists">{t("Login_Page.Footer.Hematologists")}</Link></li>
                <li><Link exact to="/book-an-appoinment/Internists">{t("Login_Page.Footer.Internists")}</Link></li>
                <li><Link exact to="/book-an-appoinment">{t("Login_Page.Footer.View_Doctors")}</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="div-footer-title">
                <h3>{t("Login_Page.Footer.Services")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li>
                  <Link className="doctorName" exact to="/book-an-appoinment">{t("Login_Page.Footer.Book_an_Appoinment")}</Link>
                </li>
                <li>
                  <Link className="doctorName" exact to="/chat-with-doctor">{t("Login_Page.Footer.Chat_with_Doctor")}</Link>
                </li>
                <li><Link className="doctorName" exact to="/emergency">{t("Login_Page.Footer.Emergency")}</Link></li>
                <li><a>{t("Login_Page.Footer.Help_N_Support")}</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="div-footer-title">
                <h3>{t("Login_Page.Footer.Are_you_top_doctor?")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li><Link exact to="/register-doctor">{t("Login_Page.Footer.List_your_practice_on_Exado")}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container py-4">
            <div className="bottom-footer-container">
              <div className="row ">
                <div className="col-lg-2 col-md-2 col-sm-12 logo-footer">
                  <img src="assets/images/Logowhite.png" className="img-fluid" alt='white logo' />
                </div>
                <div className="col-lg-10 col-md-10 col-sm-12 div-footer-text">
                  <span>{t("Login_Page.Footer.©_2000_2020_exado")}</span>
                  <div className="footer-social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-linkedin-in"></i>
                    <i className="fab fa-youtube"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withTranslation()(Footer);
