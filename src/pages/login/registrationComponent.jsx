import React from "react";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import GoogleLoginButton from "./googleLogin";
import FaceBookLoginButton from "./facebookLogin";
import { promiseWrapper } from "../../utility/common";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import ErrorMessage from "../../commonComponent/Elements/errorMessage";
import * as Yup from "yup";
class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserGuid: "",
      hiddenPassword: true,
      hiddenConPassword: true,
      errorTimer: null,
      successTimer: null,
      success: "",
      error: "",
    };
  }

  componentWillUnmount() {
    clearTimeout(this.state.errorTimer);
    clearTimeout(this.state.successTimer);
  }
  OnRegister = (values) => {
    let ut = localStorage.getItem("login-Type")
      ? localStorage.getItem("login-Type")
      : "Patient";

    let userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      UserType: ut === "Patient" ? 2 : 1,
      // IsDoctorLogin: ut == "Patient" ? false : true,
    };

    promiseWrapper(this.props.actions.registerUser, {
      userModel: userData,
    }).then((data) => {
      console.log(
        data.data.result.userId,
        "--------------data------------------"
      );
      if (data.data.success === true) {
        //window.localStorage.removeItem('login-Type');
        //   window.localStorage.setItem("access-token", data.data.data.Token);
        //   window.localStorage.setItem("user-id", data.result.userId);
        // window.localStorage.setItem("user-fullname", data.data.data.UserFullName);
        //  window.localStorage.setItem("user-type", data.UserType);
        // toast.success(data.data.message);
        this.setState({ success: data.data.message });
        this.setState({
          successTimer: setTimeout(() => {
            this.setState({ success: "" });
            this.setState({ UserGuid: data.data.result.userId });
            this.props.onRegistration(data.data.result.userId, values.email);
          }, 2000),
        });
      } else {
        // toast.error(data.data.errorMessage);
        this.setState({ error: data.data.message }, () =>
          this.setState({
            errorTimer: setTimeout(() => this.setState({ error: "" }), 3000),
          })
        );
      }
    });
  };

  togglePasswordShow = () =>
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  toggleConPasswordShow = () =>
    this.setState({ hiddenConPassword: !this.state.hiddenConPassword });

  render() {
    const { t } = this.props;
    return (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          ConfirmPassword: "",
          rememberMe: false,
        }}
        validationSchema={registrationSchema}
        onSubmit={(values) => {
          this.OnRegister(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          getFieldProps,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form className="divForm register-page" onSubmit={handleSubmit}>
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
            {this.state.error && (
              <div className="alert alert-danger" role="alert">
                {this.state.error}
              </div>
            )}
            {this.state.success && (
              <div className="alert alert-success" role="alert">
                {this.state.success}
                {console.log(this.state.success)}
              </div>
            )}
            <div className="row mt-3">
              <div className="col-lg-6 col-md-6">
                <div className="divFormRow px-2">
                  <label htmlFor="fname" className="form-label">
                    {t("First_Name")}
                  </label>
                  <input
                    type="text"
                    className={
                      errors.firstName && touched.firstName
                        ? "form-control error-message-input"
                        : "form-control"
                    }
                    placeholder={t("First_Name")}
                    id="txtFirstName"
                    name="firstName"
                    {...getFieldProps("firstName")}
                  />
                  {errors.firstName && touched.firstName && (
                    <ErrorMessage error={errors.firstName} t={t} />
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="divFormRow px-2">
                  <label htmlFor="lname" className="form-label">
                    {t("Last_Name")}
                  </label>
                  <input
                    type="text"
                    className={
                      errors.lastName && touched.lastName
                        ? "form-control error-message-input"
                        : "form-control"
                    }
                    placeholder={t("Last_Name")}
                    id="txtLastName"
                    name="lastName"
                    {...getFieldProps("lastName")}
                  />
                  {errors.lastName && touched.lastName && (
                    <ErrorMessage error={errors.lastName} t={t} />
                  )}
                </div>
              </div>
            </div>
            <div className="divFormRow px-2 mt-3">
              <label htmlFor="Emailaddress" className="form-label">
                {t("Email_Address")}
              </label>
              <input
                type="email"
                className={
                  errors.email && touched.email
                    ? "form-control error-message-input"
                    : "form-control"
                }
                placeholder={t("Email_Address")}
                id="txtEmail"
                name="email"
                {...getFieldProps("email")}
              />
              {errors.email && touched.email && (
                <ErrorMessage error={errors.email} t={t} />
              )}
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-6">
                <div className="divFormRow px-2 relative-position">
                  <label htmlFor="Password" className="form-label">
                    {t("Registration_Password")}
                  </label>
                  <input
                    type={this.state.hiddenPassword ? "password" : "text"}
                    className={
                      errors.password && touched.password
                        ? "form-control icon-input error-message-input"
                        : "form-control icon-input"
                    }
                    placeholder={t("Registration_Password")}
                    id="txtRegPassword"
                    name="password"
                    {...getFieldProps("password")}
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage error={errors.password} t={t} />
                  )}
                  <i
                    className={`far ${
                      this.state.hiddenPassword ? "fa-eye-slash" : "fa-eye"
                    } times-icon`}
                    onClick={this.togglePasswordShow.bind(this)}
                    id="toggleCPassword"
                  ></i>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="divFormRow px-2 relative-position">
                  <label htmlFor="ConfirmPassword" className="form-label">
                    {t("Registration_Confirm_Password")}
                  </label>
                  <input
                    type={this.state.hiddenConPassword ? "password" : "text"}
                    className={
                      errors.ConfirmPassword && touched.ConfirmPassword
                        ? "form-control icon-input error-message-input"
                        : "form-control icon-input"
                    }
                    placeholder={t("Registration_Confirm_Password")}
                    id="txtConfirmPassword"
                    name="ConfirmPassword"
                    {...getFieldProps("ConfirmPassword")}
                  />
                  {errors.ConfirmPassword && touched.ConfirmPassword && (
                    <ErrorMessage error={errors.ConfirmPassword} t={t} />
                  )}
                  <i
                    className={`far ${
                      this.state.hiddenConPassword ? "fa-eye-slash" : "fa-eye"
                    } times-icon`}
                    onClick={this.toggleConPasswordShow.bind(this)}
                    id="toggleConPassword"
                  ></i>
                </div>
              </div>
            </div>
            <div className="divFormRow px-2 mt-3">
              <input
                className="form-check-input"
                style={{ margin: "0.25em 0.25em 0 0" }}
                type="checkbox"
                id="termsAndCondition"
                value=""
                name="rememberMe"
                {...getFieldProps("rememberMe")}
                defaultChecked={values.rememberMe}
              />
              <label
                htmlFor="termsAndCondition"
                className="rememberMe form-label"
              >
                {/* I agree to the&nbsp; */}
                <Link target="_blank" to="/terms-and-conditions">
                  <span>{t("Terms_N_Condition")}</span>
                </Link>
              </label>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn MyButton register-button"
                disabled={!values.rememberMe}
              >
                {t("Registration_Button")}
              </button>
            </div>
          </form>
        )}
      </Formik>
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
)(withTranslation()(RegistrationComponent));
const registrationSchema = Yup.object({
  firstName: Yup.string().required("ErrorMessages.field_requires"),
  lastName: Yup.string().required("ErrorMessages.field_requires"),
  email: Yup.string()
    .email("ErrorMessages.invalid_email")
    .required("ErrorMessages.field_requires"),
  password: Yup.string()
    .required("ErrorMessages.field_requires")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "ErrorMessages.password_valid"
    ),
  ConfirmPassword: Yup.string()
    .required("ErrorMessages.field_requires")
    .oneOf([Yup.ref("password"), null], "ErrorMessages.cpassword_match"),
});
