import React from 'react';
import { Redirect } from "react-router-dom";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FbAppID } from '../../redux/exado/constants';
import { toast } from 'react-toastify';
import { promiseWrapper } from '../../utility/common';
import exadoActions from '../../redux/exado/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import fb from '../../assets/images/fb.png';

class FaceBookLoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        };
    }

    responseFacebook(res) {
        console.log(res);
        if (res.status && res.status === 'unknown') {
            return;
        }
        let ut = localStorage.getItem("login-Type") ? localStorage.getItem("login-Type") : "Patient";
        let userData = {
            "FirstName": res.name,
            "LastName": res.name,
            "Email": res.email,
            "SocialMediaLoginId": res.userID,
            "SocialMediaType": 1,
            "UserType": ut == "Patient" ? 2 : 1,
            "IsDoctorLogin": ut == "Patient" ? false : true
        }
        promiseWrapper(this.props.actions.socialMediaLogin, { userModel: userData })
            .then((data) => {
                if (data.data.isSuccess == true) {
                    window.localStorage.removeItem('login-Type');
                    window.localStorage.setItem("access-token", data.data.data.Token);
                    window.localStorage.setItem("user-id", data.data.data.userId);
                    window.localStorage.setItem("user-fullname", data.data.data.UserFullName);
                    window.localStorage.setItem("user-type", data.data.data.UserType);
                    if (data.data.data.UserType === '2') {
                        this.setState({ redirect: "/patient-dashboard" });
                    }
                    else if (data.data.data.UserType === '1') {
                        if (data.data.data.ProfileVerification === '1') {
                            this.setState({ redirect: "/doctor-profile" });
                        }
                        else {
                            this.setState({ redirect: "/doctor-dashboard" });
                        }
                    }
                    else {
                        this.setState({ redirect: "/patient-dashboard" });
                    }
                    this.setState({ redirect: "/patient-dashboard" });
                }
                else {
                    toast.error(data.data.errorMessage);
                }
            });
        //refreshFacebookToken(res);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <FacebookLogin
                appId={FbAppID}
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook.bind(this)}
                render={renderProps => (
                    <button className="MyFBButton" onClick={renderProps.onClick}>
                        <img className="login-social-icon" src="assets/images/fb.png" alt="fb logo" />{this.props.LabelText}</button>
                )}
            />
        )
    }
}

function mapStoreToprops(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators(exadoActions, dispatch);
    return { actions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(FaceBookLoginButton);