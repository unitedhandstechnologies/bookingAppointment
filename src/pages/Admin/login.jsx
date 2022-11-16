import React, { useEffect, useState } from "react";
// import logo from "../../assets/images/logo.png";
// import loginImg from "../../assets/images/login.png";
import { Redirect, Link, NavLink } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AdminLoginBox from "./adminLoginBox";
import ForgotPassword from "../../pages/login/forgotPassword";

const AdminLoginPage = (props) => {
  const [DisplayPage, setDisplayPage] = useState("AdminLogin");
  const { t } = props;

  useEffect(() => {
    if (localStorage.getItem("access-token") != null) {
      if (localStorage.getItem("user-type") === "3") {
        props.history.push("/admin-dashboard");
      } else {
        localStorage.clear();
      }
    }
  });

  const LoadAdminLogin = () => {
    setDisplayPage("AdminLogin");
  };

  const LoadForgotPasswordUI = () => {
    setDisplayPage("ForgotPasswordPage");
  };

  return (
    <>
      <div>
        <div className="divHeader">
          <div className="container">
            <div className="row">
              <div className="col-2">
                <div className="divLogo">
                  <Link to="/">
                    <img
                      src="assets/images/logo.png"
                      width="180"
                      alt="link img"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divLoginSection my-5">
          <div className="container">
            <div className="row divLoginSectionContainer">
              <div className="col-md-7">
                <img
                  src="assets/images/login.png"
                  className="loginImg"
                  alt="login"
                />
              </div>
              <div className="col-md-5 login-section-container p-0">
                {DisplayPage == "AdminLogin" && (
                  <AdminLoginBox onForgotPasswordClick={LoadForgotPasswordUI} />
                )}
                {DisplayPage == "ForgotPasswordPage" && (
                  <ForgotPassword onCancel={LoadAdminLogin} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// class AdminLoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             DisplayPage: "AdminLogin",
//         };
//     }

//     componentWillMount() {
//         if (localStorage.getItem("access-token") != null) {
//             if (localStorage.getItem("user-type") === '3') {
//                 this.props.history.push('/admin-dashboard')
//             }
//             else {
//                 localStorage.clear();
//             }
//         }
//     }

//     LoadAdminLogin() {
//         this.setState({ DisplayPage: "AdminLogin" });
//     }

//     LoadForgotPasswordUI() {
//         this.setState({ DisplayPage: "ForgotPasswordPage" });
//     }

//     render() {
//         const { t } = this.props
//         if (this.state.redirect) {
//             return <Redirect to={this.state.redirect} />
//         }
//         return (
//             <div>
//                 <div className="divHeader">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-2">
//                                 <div className="divLogo">
//                                     <Link to="/"><img src="assets/images/logo.png" width="180" alt='link img' /></Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="divLoginSection my-5">
//                     <div className="container">
//                         <div className="row divLoginSectionContainer">
//                             <div className="col-md-7">
//                                 <img src="assets/images/login.png" className="loginImg" alt='login' />
//                             </div>
//                             <div className="col-md-5 login-section-container p-0">
//                                 {this.state.DisplayPage == 'AdminLogin' &&
//                                     <AdminLoginBox onForgotPasswordClick={this.LoadForgotPasswordUI.bind(this)} />
//                                 }
//                                 {this.state.DisplayPage == 'ForgotPasswordPage' &&
//                                     <ForgotPassword onCancel={this.LoadAdminLogin.bind(this)} />
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

const mapStoreToprops=(state, props)=> {
  return {};
}

const mapDispatchToProps=(dispatch) =>{
  const actions = bindActionCreators(exadoActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AdminLoginPage));
