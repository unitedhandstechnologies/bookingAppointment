import React from "react";
// import Logowhite from "./../../assets/images/Logowhite.png";
import { Link, NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

const LandingPageFooter = (props) => {
  const { t } = props;
  return (
    <>
      <div className="footer-container">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
              <div className="div-footer-title">
                <h3>{t("Public.LandingFooter.Exado")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li>
                  <NavLink className="sidebar-menu-a w-100" to="/">
                    {t("Public.LandingFooter.Home")}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="sidebar-menu-a w-100" to="/about-us">
                    {t("Public.LandingFooter.About_Us")}
                  </NavLink>
                </li>
                <li>
                  <a href="/#how-it-works">
                    {t("Public.LandingFooter.How_It_Works")}
                  </a>
                </li>
                <li>
                  <a>{t("Public.LandingFooter.Careers")}</a>
                </li>
                <li>
                  <NavLink className="sidebar-menu-a w-100" to="/contact-us">
                    {t("Public.LandingFooter.Contact_us")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="sidebar-menu-a w-100"
                    to="/terms-and-conditions"
                  >
                    {t("Public.LandingFooter.Terms_Conditions")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="div-footer-title">
                <h3>{t("Public.LandingFooter.Specialities")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li>
                  <Link exact to="/book-an-appoinment/Dentists">
                    {t("Public.LandingFooter.Dentists")}
                  </Link>
                </li>
                <li>
                  <Link exact to="/book-an-appoinment/Cardiologists">
                    {t("Public.LandingFooter.Cardiologists")}
                  </Link>
                </li>
                <li>
                  <Link exact to="/book-an-appoinment/Dermatologists">
                    {t("Public.LandingFooter.Dermatologists")}
                  </Link>
                </li>
                <li>
                  <Link exact to="/book-an-appoinment/Endocrinologists">
                    {t("Public.LandingFooter.Endocrinologists")}
                  </Link>
                </li>
                <li>
                  <Link exact to="/book-an-appoinment/Hematologists">
                    {t("Public.LandingFooter.Hematologists")}
                  </Link>
                </li>
                <li>
                  <Link exact to="/book-an-appoinment/Internists">
                    {t("Public.LandingFooter.Internists")}
                  </Link>
                </li>
                <li>
                  <Link exact to="/book-an-appoinment">
                    {t("Public.LandingFooter.View_Doctors")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <div className="div-footer-title">
                <h3>{t("Public.LandingFooter.Services")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li>
                  <Link className="doctorName" to="/book-an-appoinment">
                    {t("Public.LandingFooter.Book_an_Appoinment")}
                  </Link>
                </li>
                <li>
                  <Link className="doctorName" exact to="/chat-with-doctor">
                    {t("Public.LandingFooter.Chat_with_Doctor")}
                  </Link>
                </li>
                <li>
                  <Link className="doctorName" exact to="/emergency">
                    {t("Public.LandingFooter.Emergency")}
                  </Link>
                </li>
                <li>
                  <a>{t("Public.LandingFooter.Help_Support")}</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="div-footer-title">
                <h3>{t("Public.LandingFooter.Are_you_a_top_doctor?")}</h3>
                <hr className="my-1" />
              </div>
              <ul className="div-footer-links">
                <li>
                  <Link exact to="/register-doctor">
                    {t("Public.LandingFooter.List_your_practice_on_Exado")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container py-4">
            <div className="bottom-footer-container">
              <div className="row ">
                <div className="col-lg-2 col-md-2 col-sm-12 logo-footer">
                  <img
                    src="assets/images/Logowhite.png"
                    className="img-fluid"
                    alt="white logo"
                  />
                </div>
                <div className="col-lg-10 col-md-10 col-sm-12 div-footer-text">
                  <span>{t("Public.LandingFooter.copy_right")}</span>
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
    </>
  );
};

// class LandingPageFooter extends React.Component {
//   render() {
//     const { t } = this.props;
//     return (
//       <div className="footer-container">
//         <div className="container">
//           <div className="row py-5">
//             <div className="col-lg-3 col-md-6 col-sm-6 col-6 ">
//               <div className="div-footer-title">
//                 <h3>{t("Public.LandingFooter.Exado")}</h3>
//                 <hr className="my-1" />
//               </div>
//               <ul className="div-footer-links">
//                 <li>
//                   <NavLink className="sidebar-menu-a w-100" to="/">
//                     {t("Public.LandingFooter.Home")}
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink className="sidebar-menu-a w-100" to="/about-us">
//                     {t("Public.LandingFooter.About_Us")}
//                   </NavLink>
//                 </li>
//                 <li>
//                   <a href="/#how-it-works">
//                     {t("Public.LandingFooter.How_It_Works")}
//                   </a>
//                 </li>
//                 <li>
//                   <a>{t("Public.LandingFooter.Careers")}</a>
//                 </li>
//                 <li>
//                   <NavLink className="sidebar-menu-a w-100" to="/contact-us">
//                     {t("Public.LandingFooter.Contact_us")}
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     className="sidebar-menu-a w-100"
//                     to="/terms-and-conditions"
//                   >
//                     {t("Public.LandingFooter.Terms_Conditions")}
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-lg-3 col-md-6 col-sm-6 col-6">
//               <div className="div-footer-title">
//                 <h3>{t("Public.LandingFooter.Specialities")}</h3>
//                 <hr className="my-1" />
//               </div>
//               <ul className="div-footer-links">
//                 <li>
//                   <Link exact to="/book-an-appoinment/Dentists">
//                     {t("Public.LandingFooter.Dentists")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link exact to="/book-an-appoinment/Cardiologists">
//                     {t("Public.LandingFooter.Cardiologists")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link exact to="/book-an-appoinment/Dermatologists">
//                     {t("Public.LandingFooter.Dermatologists")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link exact to="/book-an-appoinment/Endocrinologists">
//                     {t("Public.LandingFooter.Endocrinologists")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link exact to="/book-an-appoinment/Hematologists">
//                     {t("Public.LandingFooter.Hematologists")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link exact to="/book-an-appoinment/Internists">
//                     {t("Public.LandingFooter.Internists")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link exact to="/book-an-appoinment">
//                     {t("Public.LandingFooter.View_Doctors")}
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-lg-2 col-md-6 col-sm-6 col-12">
//               <div className="div-footer-title">
//                 <h3>{t("Public.LandingFooter.Services")}</h3>
//                 <hr className="my-1" />
//               </div>
//               <ul className="div-footer-links">
//                 <li>
//                   <Link className="doctorName" to="/book-an-appoinment">
//                     {t("Public.LandingFooter.Book_an_Appoinment")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="doctorName" exact to="/chat-with-doctor">
//                     {t("Public.LandingFooter.Chat_with_Doctor")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="doctorName" exact to="/emergency">
//                     {t("Public.LandingFooter.Emergency")}
//                   </Link>
//                 </li>
//                 <li>
//                   <a>{t("Public.LandingFooter.Help_Support")}</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-lg-4 col-md-6 col-sm-6 col-12">
//               <div className="div-footer-title">
//                 <h3>{t("Public.LandingFooter.Are_you_a_top_doctor?")}</h3>
//                 <hr className="my-1" />
//               </div>
//               <ul className="div-footer-links">
//                 <li>
//                   <Link exact to="/register-doctor">
//                     {t("Public.LandingFooter.List_your_practice_on_Exado")}
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <div className="container py-4">
//             <div className="bottom-footer-container">
//               <div className="row ">
//                 <div className="col-lg-2 col-md-2 col-sm-12 logo-footer">
//                   <img
//                     src="assets/images/Logowhite.png"
//                     className="img-fluid"
//                     alt="white logo"
//                   />
//                 </div>
//                 <div className="col-lg-10 col-md-10 col-sm-12 div-footer-text">
//                   <span>{t("Public.LandingFooter.copy_right")}</span>
//                   <div className="footer-social-icons">
//                     <i className="fab fa-facebook-f"></i>
//                     <i className="fab fa-twitter"></i>
//                     <i className="fab fa-linkedin-in"></i>
//                     <i className="fab fa-youtube"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
export default withTranslation()(LandingPageFooter);
