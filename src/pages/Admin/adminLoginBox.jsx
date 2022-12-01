import React from "react";
import $ from "jquery";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
import ButtonComponent from "../../commonComponent/Button/buttonComponent";
import InputBox from "../../commonComponent/InputBox/inputBox";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { promiseWrapper } from "../../utility/common";

class AdminLoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailAddress: "",
      Password: "",
      redirect: null,
      hiddenPassword: true,
    };
  }

  OnLogin = (event) => {
    event.preventDefault();
    let errorMessage = "";
    if ($("#txtEmailAddress").val() === "") {
      errorMessage += `Please enter email address \n`;
    }
    if ($("#txtPassword").val() === "") {
      errorMessage += "Please enter password \n";
    }
    if (errorMessage !== "") {
      toast.error(errorMessage);
      return;
    } else {
      // let logintype = localStorage.getItem('login-Type') == "Patient" ? 2 : 1;
      promiseWrapper(this.props.actions.loginUser, {
        email: this.state.EmailAddress,
        password: this.state.Password,
        userType: 3,
      }).then((data) => {
        if (data.data.success === true) {
          localStorage.removeItem("login-Type");
          localStorage.setItem("access-token", data.data.result.token);
          localStorage.setItem("user-id", data.data.result.userGuid);
          localStorage.setItem("user-fullname", data.data.result.fullName);
          localStorage.setItem("user-type", data.data.result.userType);
          localStorage.setItem("profile-image", data.data.result.profileImage);
          toast.success(data.data.message);
          this.setState({ redirect: "/admin/dashboard" });
        } else {
          toast.error(data.message);
        }
      })
    }
  };

  UpdateEmail = (event) => {
    this.setState({ EmailAddress: $("#txtEmailAddress").val() });
  };

  UpdatePassword = (event) => {
    this.setState({ Password: $("#txtPassword").val() });
  };

  ForgotPassword() {
    this.props.onForgotPasswordClick();
  }

  togglePasswordShow() {
    this.setState({ hiddenPassword: !this.state.hiddenPassword }, () => {
      if (this.state.hiddenPassword === false) {
        $("#togglePassword").removeClass("fa-eye-slash");
        $("#togglePassword").addClass("fa-eye");
      } else {
        $("#togglePassword").removeClass("fa-eye");
        $("#togglePassword").addClass("fa-eye-slash");
      }
    });
  }

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="login-tab">
        <ul
          className="nav nav-pills mb-3 nav-justified"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              id="pills-login-tab"
              data-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Admin Login
            </a>
          </li>
        </ul>
        <div className="tab-content login-section" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="pills-login-tab"
          >
            <div
              className="tab-pane fade show active"
              id="nav-login"
              role="tabpanel"
              aria-labelledby="nav-login-tab"
            >
              <form
                className="divForm login-page"
                onSubmit={this.OnLogin.bind(this)}
              >
                <div className="divFormRow">
                  <label htmlFor="Emailaddress" className="form-label">
                    Email address
                  </label>
                  <InputBox
                    Type="email"
                    onChange={this.UpdateEmail.bind(this)}
                    className="form-control"
                    PlaceHolder={t("Login_Email_Address")}
                    Value={this.state.EmailAddress}
                    Id="txtEmailAddress"
                  />
                </div>
                <div className="divFormRow relative-position my-3">
                  <label htmlFor="Password" className="form-label">
                    Password
                  </label>
                  <InputBox
                    Type={this.state.hiddenPassword ? "password" : "text"}
                    onChange={this.UpdatePassword.bind(this)}
                    className="form-control icon-input"
                    PlaceHolder={t("Login_Password")}
                    Value={this.state.Password}
                    Id="txtPassword"
                  />
                  <a onClick={this.togglePasswordShow.bind(this)}>
                    <i
                      className="far fa-eye-slash times-icon"
                      id="togglePassword"
                    ></i>
                  </a>
                </div>
                <div className="divFormRow pull-right mt-3">
                  <span className="float-end">
                    <a
                      className="forgetPassword"
                      onClick={this.ForgotPassword.bind(this)}
                    >
                      {t("Forget_Password")}
                    </a>
                  </span>
                </div>
                <ButtonComponent
                  Style={{ margin: "10px 0 0 0" }}
                  ID="btnLogin"
                  Type="submit"
                  ClassName="btn MyButton"
                  Text={t("Login")}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
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
)(withTranslation()(AdminLoginBox));
