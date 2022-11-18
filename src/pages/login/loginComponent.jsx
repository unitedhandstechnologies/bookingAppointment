import React from "react";
import { Link, Redirect } from "react-router-dom";
import GoogleLoginButton from "./googleLogin";
import FaceBookLoginButton from "./facebookLogin";
import {
  localStorageKeys,
  promiseWrapper,
  userType,
} from "../../utility/common";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import { object, string } from "yup";
import ErrorMessage from "../../commonComponent/Elements/errorMessage";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      success: "",
      redirect: null,
      hiddenPassword: true,
      errorTimer: null,
      successTimer: null,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.state.errorTimer);
    clearTimeout(this.state.successTimer);
  }

  OnLogin = (values) => {
    let logintype =
      localStorage.getItem(localStorageKeys.loginType) ===
      userType.login_patient
        ? userType.patient
        : userType.doctor;
    promiseWrapper(this.props.actions.loginUser, {
      email: values.email,
      password: values.password,
      userType: logintype,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        if (data.data.data.IsEmailVerified === "False") {
          this.props.onLoginNotVerified(
            data.data.data.userId,
            this.state.EmailAddress
          );
          return;
        }
        localStorage.removeItem(localStorageKeys.loginType);
        localStorage.setItem(
          localStorageKeys.accessToken,
          data.data.data.Token
        );
        localStorage.setItem(localStorageKeys.userId, data.data.data.userId);
        localStorage.setItem(
          localStorageKeys.userFullname,
          data.data.data.UserFullName
        );
        localStorage.setItem(
          localStorageKeys.userType,
          data.data.data.UserType
        );
        localStorage.setItem(
          localStorageKeys.profileImage,
          data.data.data.ProfileImage
        );
        const UserType = parseInt(data.data.data.UserType);
        this.setState({
          success: data.data.message,
          successTimer: setTimeout(() => {
            this.setState({ success: "" });
            if (UserType === userType.patient) {
              this.setState({ redirect: "/patient-dashboard" });
            } else if (UserType === userType.doctor) {
              if (data.data.data.ProfileVerification === "1") {
                this.setState({ redirect: "/doctor-profile" });
              } else {
                this.setState({ redirect: "/doctor-dashboard" });
              }
            } else {
              this.setState({ redirect: "/patient-dashboard" });
            }
          }, 2000),
        });
      } else
        this.setState({
          error: data.data.errorMessage,
          errorTimer: setTimeout(() => this.setState({ error: "" }), 2000),
        });
    });
  };
  // setTimeout(function() { your_func(); }, 5000);
  ForgotPassword() {
    this.props.onForgotPassword();
  }

  togglePasswordShow = () =>
    this.setState({ hiddenPassword: !this.state.hiddenPassword });

  render() {
    const { t } = this.props;
    const { hiddenPassword, error, success } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div
        className="tab-pane fade show active"
        id="nav-login"
        role="tabpanel"
        aria-labelledby="nav-login-tab"
      >
        <div className="d-flex justify-content-center">
          <div>
            <FaceBookLoginButton LabelText={t("Connect_With_Facebook")} />
          </div>
          <div className="ms-3">
            <GoogleLoginButton LabelText={t("Connect_With_Google")} />
          </div>
        </div>
        <div className="divor">
          <h6>or</h6>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            this.OnLogin(values);
          }}
        >
          {({ errors, touched, getFieldProps, handleSubmit }) => (
            <form className="divForm login-page" onSubmit={handleSubmit}>
              <div className="divFormRow">
                <label htmlFor="email" className="form-label">
                  {t("Login_Email_Address")}
                </label>
                <input
                  type="email"
                  name="email"
                  onFocus={(e) => e.target.setAttribute("autocomplete", "off")}
                  className={
                    errors.email && touched.email
                      ? "form-control error-message-input"
                      : "form-control"
                  }
                  placeholder={t("Login_Email_Address")}
                  {...getFieldProps("email")}
                />
                {errors.email && touched.email && (
                  <ErrorMessage error={errors.email} t={t} />
                )}
              </div>
              <div className="divFormRow relative-position my-3">
                <label htmlFor="password" className="form-label">
                  {t("Login_Password")}
                </label>
                <input
                  type={this.state.hiddenPassword ? "password" : "text"}
                  name="password"
                  className={
                    errors.password && touched.password
                      ? "form-control error-message-input"
                      : "form-control icon-input"
                  }
                  placeholder={t("Login_Password")}
                  {...getFieldProps("password")}
                />
                <i
                  className={`far ${
                    hiddenPassword ? "fa-eye-slash" : "fa-eye"
                  } times-icon`}
                  id="togglePassword"
                  onClick={this.togglePasswordShow.bind(this)}
                  style={{ cursor: "pointer" }}
                ></i>
                {errors.password && touched.password && (
                  <ErrorMessage error={errors.password} t={t} />
                )}
              </div>
              <button type="submit" className="btn MyButton">
                {t("Login")}
              </button>

              <Link
                className="float-end forgetPassword"
                onClick={() => this.ForgotPassword(this)}
              >
                {t("Forget_Password")}
              </Link>
            </form>
          )}
        </Formik>
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
)(withTranslation()(LoginComponent));

const loginSchema = object({
  email: string()
    .email("ErrorMessages.invalid_email")
    .required("ErrorMessages.field_requires"),
  password: string().required("ErrorMessages.field_requires"),
});
