import React from "react";
import $ from "jquery";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import InputBox from "../../commonComponent/InputBox/inputBox";
import ButtonComponent from "../../commonComponent/Button/buttonComponent";
import "./../login/login.css";
import { promiseWrapper, isPasswordValid } from "../../utility/common";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      Password: "",
      ConfirmPassword: "",
      redirect: null,
      showPasswordMsg: false,
      hiddenPassword: true,
      hiddenConPassword: true,
    };
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.setState({ userId: userId });
  }

  UpdatePassword = (event) => {
    this.setState({ Password: $("#txtPassword").val() });
  };

  UpdateConfirmPassword = (event) => {
    this.setState({ ConfirmPassword: $("#txtConfirmPassword").val() });
  };

  OnResetPaswordSubmit = (event) => {
    let errorMessage = "";
    this.setState({ showPasswordMsg: false });
    if ($("#txtPassword").val() === "") {
      errorMessage += "Please enter password \n";
    }
    if ($("#txtConfirmPassword").val() === "") {
      errorMessage += "Please enter confirm password \n";
    }
    if (!isPasswordValid($("#txtPassword").val())) {
      //errorMessage += 'Please enter valid password e.g. 8 digit, contains one Upper and Lower case character, one special character and one digit. \n';
      this.setState({ showPasswordMsg: true });
      return;
    }
    if (errorMessage !== "") {
      toast.error(errorMessage);
      return;
    } else {
      if ($("#txtPassword").val() !== $("#txtConfirmPassword").val()) {
        toast.error("Password and confirm password must be same");
        return;
      }
    }
    promiseWrapper(this.props.actions.resetPassword, {
      userId: this.state.userId,
      password: this.state.Password,
    }).then((data) => {
      if (data.data.isSuccess === true) {
        toast.success(data.data.message);
        if (data.data.data.userType === 3) {
          this.setState({ redirect: "/admin/login" });
        } else {
          this.setState({ redirect: "/login" });
        }
      } else {
        toast.error(data.data.errorMessage);
      }
    });
  };

  togglePasswordShow() {
    this.setState({ hiddenPassword: !this.state.hiddenPassword }, () => {
      if (this.state.hiddenPassword === false) {
        $("#toggleCPassword").removeClass("fa-eye-slash");
        $("#toggleCPassword").addClass("fa-eye");
      } else {
        $("#toggleCPassword").removeClass("fa-eye");
        $("#toggleCPassword").addClass("fa-eye-slash");
      }
    });
  }

  toggleConPasswordShow() {
    this.setState({ hiddenConPassword: !this.state.hiddenConPassword }, () => {
      if (this.state.hiddenConPassword === false) {
        $("#toggleConPassword").removeClass("fa-eye-slash");
        $("#toggleConPassword").addClass("fa-eye");
      } else {
        $("#toggleConPassword").removeClass("fa-eye");
        $("#toggleConPassword").addClass("fa-eye-slash");
      }
    });
  }

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <div className="divHeader">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="divLogo">
                  <img
                    src="assets/images/logo.png"
                    width="180"
                    alt="logo img"
                  />
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
                  alt="login img"
                />
              </div>
              <div className="col-md-5 login-section-container p-0">
                <div className="create-new-passowrd-section">
                  <div className="divForm">
                    <div className=" my-5">
                      <img
                        src="assets/images/Group7889.png"
                        className="img-fluid create-new-password-img"
                        alt="Responsive img"
                      />
                    </div>
                    <div className="forget-password-text">
                      <p>{t("ResetPassword.Create_new_password")}</p>
                    </div>
                    <div>
                      <p className="text-muted">
                        {t("ResetPassword.password_must_different")}
                      </p>
                    </div>
                    <div className="divFormRow px-2 relative-position">
                      <label className="form-label w-100 new-password-label">
                        {t("ResetPassword.Password")}
                      </label>
                      <InputBox
                        Type={this.state.hiddenPassword ? "password" : "text"}
                        onChange={this.UpdatePassword.bind(this)}
                        className="form-control icon-input"
                        PlaceHolder="Password"
                        Value={this.state.Password}
                        Id="txtPassword"
                      />
                      <a onClick={this.togglePasswordShow.bind(this)}>
                        <i
                          className="far fa-eye-slash times-icon"
                          id="toggleCPassword"
                        ></i>
                      </a>
                    </div>
                    <div className="divFormRow px-2 relative-position">
                      <label className="form-label w-100 new-password-label">
                        {t("ResetPassword.Confirm_Password")}
                      </label>
                      <InputBox
                        Type={
                          this.state.hiddenConPassword ? "password" : "text"
                        }
                        onChange={this.UpdateConfirmPassword.bind(this)}
                        className="form-control icon-input"
                        PlaceHolder="Confirm Password"
                        Value={this.state.ConfirmPassword}
                        Id="txtConfirmPassword"
                      />
                      <a onClick={this.toggleConPasswordShow.bind(this)}>
                        <i
                          className="far fa-eye-slash times-icon"
                          id="toggleConPassword"
                        ></i>
                      </a>
                    </div>
                    {this.state.showPasswordMsg === true && (
                      <div
                        className="ms-4 mb-sm-2 text-start"
                        style={{ color: "#FF0000" }}
                      >
                        {t("ResetPassword.Invalid_Password")}
                      </div>
                    )}
                    <div className="mt-2 ms-4 text-start">
                      {t("ResetPassword.Password_contain_8_Characters")}:
                      <div className="ms-5">
                        -{t("ResetPassword.One_Uppercase_Letter")}
                        <br />-{t("ResetPassword.One_Lowercase_Letter")}
                        <br />-{t("ResetPassword.One_Special_Character")}
                        <br />-{t("ResetPassword.One_Digit")}
                      </div>
                    </div>
                    <div className="mt-4">
                      <ButtonComponent
                        ID="btnSubmit"
                        Action={this.OnResetPaswordSubmit.bind(this)}
                        ClassName="btn MyButton new-password-button"
                        Text="Reset Password"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
)(withTranslation()(ResetPassword));
