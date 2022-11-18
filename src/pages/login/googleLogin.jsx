import React from "react";
import { useGoogleLogin } from "react-google-login";
import { GoogleClientID } from "../../redux/exado/constants";
import { refreshGoogleToken } from "../../utility/refreshAuthToken.js";
import { toast } from "react-toastify";
import { promiseWrapper } from "../../utility/common";
import { useHistory } from "react-router";
import exadoActions from "../../redux/exado/action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import google from '../../assets/images/google.png';

const GoogleLoginButton = (props) => {
  const history = useHistory();

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    let ut = localStorage.getItem("login-Type")
      ? localStorage.getItem("login-Type")
      : "Patient";
    let userData = {
      FirstName: res.profileObj.givenName,
      LastName: res.profileObj.familyName,
      Email: res.profileObj.email,
      UserType: ut == "Patient" ? 2 : 1,
      SocialMediaLoginId: res.profileObj.googleId,
      SocialMediaType: 2,
      IsDoctorLogin: ut == "Patient" ? false : true,
    };
    promiseWrapper(props.actions.socialMediaLogin, {
      userModel: userData,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        window.localStorage.removeItem("login-Type");
        window.localStorage.setItem("access-token", data.data.data.Token);
        window.localStorage.setItem("user-id", data.data.data.userId);
        window.localStorage.setItem(
          "user-fullname",
          data.data.data.UserFullName
        );
        window.localStorage.setItem("user-type", data.data.data.UserType);
        if (data.data.data.UserType === "2") {
          history.push("/patient-dashboard");
        } else if (data.data.data.UserType === "1") {
          if (data.data.data.ProfileVerification === "1") {
            history.push("/doctor-profile");
          } else {
            history.push("/doctor-dashboard");
          }
        } else {
          history.push("/patient-dashboard");
        }
      } else {
        toast.error(data.data.errorMessage);
      }
    });
    refreshGoogleToken(res);
  };

  const onFailure = (res) => {
    toast.error(res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: GoogleClientID,
    autoLoad: false,
    isSignedIn: true,
    accessType: "online",
  });

  return (
    <button onClick={signIn} className="MyGoogleButton">
      <img
        className="login-social-icon"
        src="assets/images/google.png"
        alt="google logo"
      />
      {props.LabelText}
    </button>
  );
};

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(exadoActions, dispatch);
  return { actions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(GoogleLoginButton);
