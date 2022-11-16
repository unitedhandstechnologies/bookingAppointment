import React from 'react';
import { Redirect } from "react-router-dom";
import OtpInput from 'react-otp-input';
import ButtonComponent from '../../commonComponent/Button/buttonComponent';
import { toast } from 'react-toastify';
import { promiseWrapper } from '../../utility/common';
import exadoActions from '../../redux/exado/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

class OTPBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DisplayPage: "OTPPage",
            OTP: "",
            redirect: null
        };
    }

    UpdateOTP = OTP => this.setState({ OTP });

    OnCancelRegister() {
        this.props.onCancel();
    }

    OnRegisterSubmit() {
        if (this.state.OTP.length !== 6) {
            toast.error('Please enter valid otp');
            return;
        }
        else {
            promiseWrapper(this.props.actions.verifyEmailOTP, { userId: this.props.userId, emailOTP: this.state.OTP })
                .then((data) => {
                    if (data.data.isSuccess == true) {
                        window.localStorage.removeItem('login-Type');
                        window.localStorage.setItem("access-token", data.data.data.Token);
                        window.localStorage.setItem("user-id", data.data.data.UserId);
                        window.localStorage.setItem("user-fullname", data.data.data.UserFullName);
                        window.localStorage.setItem("user-type", data.data.data.UserType);
                        //toast.success(data.data.message);
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
                    }
                    else {
                        toast.error(data.data.errorMessage);
                    }
                });
        }
    }

    OnResendCode() {
        promiseWrapper(this.props.actions.sendOTPCode, { userId: this.props.userId })
            .then((data) => {
                if (data.data.isSuccess == true) {
                    toast.success(data.data.message);
                }
                else {
                    toast.error(data.data.errorMessage);
                }
            });
    }

    render() {
        const { t } = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="verification-code-section">
                <div className="divForm">
                    <div className="my-2">
                        <img src="assets/images/Group7226.png" className="img-fluid" alt="Responsive img verification-code-img" />
                    </div>
                    <div className="forget-password-text">
                        <p>{t("Login_Page.OTPBox.Enter_your_verification_code")}</p>
                    </div>
                    <div>
                        <p className="text-muted">{t("Login_Page.OTPBox.We_have_sent_code_to")}</p>
                        <p className="verification-email">{this.props.emailId}</p>
                    </div>
                    <div>
                        <p>{t("Login_Page.OTPBox.Please_enter_code")}</p>
                        <div className="divFormRow d-flex justify-content-center">
                            <OtpInput
                                value={this.state.OTP}
                                onChange={this.UpdateOTP.bind(this)}
                                numInputs={6}
                                separator={<span> - </span>}
                                inputStyle={{ width: "3em", height: "3em", margin: "0 3px 0 3px" }}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <ButtonComponent ID='btnCancelOTP' Action={this.OnRegisterSubmit.bind(this)} ClassName="btn MyButton verification-code-button" Text="Submit" />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            <p>
                                {t("Login_Page.OTPBox.Send_wrong_email?")}<a className="verification-go-back" onClick={this.OnCancelRegister.bind(this)}>{t("Login_Page.OTPBox.Go_Back")}</a>
                            </p>
                        </div>
                        <div>
                            <p><a className="verification-go-back" onClick={this.OnResendCode.bind(this)}>{t("Login_Page.OTPBox.Resend_Code")}</a></p>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(OTPBox));