import React from 'react';
import LoginComponent from './loginComponent';
import RegistrationComponent from './registrationComponent';
import { withTranslation } from 'react-i18next';

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DisplayPage: "List",
        };
    }

    componentDidMount() {
        if (this.props.IsReg === true) {
            window.$('.nav-pills a[href="#pills-register"]').tab('show');
            window.scrollTo(0, 0)
        }
    }

    LoadOTPBox(userId, emailId) {
        this.props.onRegClick(userId, emailId);
    }

    LoadForgotPassword() {
        this.props.onForgotPasswordClick();
    }

    render() {
        const { t } = this.props;
        return (
            <div className="login-tab">
                <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">
                            {localStorage.getItem("login-Type") ? (localStorage.getItem("login-Type") === "Patient" ? "User" : localStorage.getItem("login-Type")) : "User"}'s {t("Login_Page.LoginBox.Login")}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">{t("Login_Page.LoginBox.Register")}</a>
                    </li>
                </ul>
                <div className="tab-content login-section" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                        <LoginComponent onForgotPassword={this.LoadForgotPassword.bind(this)} onLoginNotVerified={this.LoadOTPBox.bind(this)} />
                    </div>
                    <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                        <RegistrationComponent onRegistration={this.LoadOTPBox.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}
export default withTranslation()(LoginBox);
