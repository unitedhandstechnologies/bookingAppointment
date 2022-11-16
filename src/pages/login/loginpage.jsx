import React from 'react';
import $ from 'jquery';
import './login.css';
import Header from "./header.jsx";
import LoginBox from './loginBox';
import OTPBox from './otpBox';
import ForgotPassword from './forgotPassword';
import LandingPageFooter from '../LandingPage/landingPageFooter';
import { withTranslation } from 'react-i18next';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DisplayPage: "Login",
            UserId: "",
            EmailId: "",
            IsUserLogedIn: false,
            IsReg: false
        };
    }

    componentWillMount() {
        if (localStorage.getItem("access-token") != null) {
            if (localStorage.getItem("user-type") === '2') {
                this.props.history.push('/patient-dashboard')
            }
            else if (localStorage.getItem("user-type") === '1') {
                this.props.history.push('/doctor-dashboard')
            }
            else {
                this.props.history.push('/patient-dashboard')
            }
        }
        if (window.location.pathname === "/register-doctor") {
            window.localStorage.setItem("login-Type", "Doctor");
            this.setState({ IsReg: true });
        }
    }

    LoadOTPUI(userId, emailId) {
        this.setState({ DisplayPage: "OTPPage" });
        this.setState({ UserId: userId });
        this.setState({ EmailId: emailId });
    }

    LoadForgotPasswordUI() {
        this.setState({ DisplayPage: "ForgotPasswordPage" });
    }

    LoadRegUI() {
        this.setState({ DisplayPage: "Login" });
        this.setState({ UserId: "" });
        this.setState({ EmailId: "" });
        $('.nav-tabs a[href="#nav-registration"]').trigger('click');
    }

    SetLogInType(type) {
        this.setState({ LoginType: type });
    }

    render() {
        return (
            <div>
                <Header LoginType={this.SetLogInType.bind(this)} />
                <div className="divLoginSection my-4">
                    <div className="container">
                        <div className="row divLoginSectionContainer">
                            <div className="col-md-12 col-lg-6">
                                <img src="assets/images/login.png" alt='login img' className="loginImg" />
                            </div>
                            <div className="col-md-12 col-lg-6 login-section-container p-0">
                                {this.state.DisplayPage == 'Login' &&
                                    <LoginBox IsReg={this.state.IsReg} LoginType={this.state.LoginType} onRegClick={this.LoadOTPUI.bind(this)} onForgotPasswordClick={this.LoadForgotPasswordUI.bind(this)} />
                                }
                                {this.state.DisplayPage == 'OTPPage' &&
                                    <OTPBox
                                        onCancel={this.LoadRegUI.bind(this)}
                                        userId={this.state.UserId}
                                        emailId={this.state.EmailId}
                                    />
                                }
                                {this.state.DisplayPage == 'ForgotPasswordPage' &&
                                    <ForgotPassword onCancel={this.LoadRegUI.bind(this)} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
                <LandingPageFooter />
            </div>
        )
    }
}
export default (withTranslation()(LoginPage));;
