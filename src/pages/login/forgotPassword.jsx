import React from 'react';
import $ from 'jquery';
import InputBox from '../../commonComponent/InputBox/inputBox';
import ButtonComponent from '../../commonComponent/Button/buttonComponent';
import { toast } from 'react-toastify';
import { promiseWrapper } from '../../utility/common';
import exadoActions from '../../redux/exado/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DisplayPage: "ForgotPasswordPage",
            EmailId: ""
        };
    }

    UpdateEmailId = (event) => {
        this.setState({ EmailId: $('#txtEmailId').val() });
    }

    OnCancelForgotPassword() {
        this.props.onCancel();
    }

    OnForgotPasswordSubmit() {
        if ($('#txtEmailId').val() == '') {
            toast.error('Please enter valid Email Address');
            return;
        }
        else if (this.isEmail($('#txtEmailId').val()) === false) {
            toast.error('Enter valid email');
        }
        else {
            let type = "";
            if (localStorage.getItem("login-Type") === "Doctor") {
                type = 1
            }
            else if (localStorage.getItem("login-Type") === "Patient") {
                type = 2
            }
            else {
                type = 3
            }
            promiseWrapper(this.props.actions.forgotPassword, { email: this.state.EmailId, userType: type })
                .then((data) => {
                    if (data.data.isSuccess == true) {
                        toast.success(data.data.message);
                        this.props.onCancel();
                    }
                    else {
                        toast.error(data.data.errorMessage);
                    }
                });
        }
    }

    isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let result = regex.test(email);
        return result;
    }

    render() {
        const { t } = this.props
        return (
            <div className="forget-password-section">
                <div className="divForm">
                    <div className=" my-3">
                        <img src="assets/images/Group7864.png" className="img-fluid forget-password-img" alt="Responsive img" />
                    </div>
                    <div className="forget-password-text">
                        <p>{t('Enter_Email_Label1')} <br />{t('Enter_Email_Label2')} </p>
                    </div>
                    <div>
                        <p className="text-muted">{t('Verification_Code_Label')}</p>
                    </div>
                    <div className="divFormRow mt-3">
                        <InputBox
                            Type="email"
                            onChange={this.UpdateEmailId.bind(this)}
                            Class="form-control"
                            PlaceHolder={t('Email_Address')}
                            Value={this.state.EmailId}
                            Id="txtEmailId" />
                    </div>
                    <div className="mt-3">
                        <ButtonComponent ID='btnSubmit' Action={this.OnForgotPasswordSubmit.bind(this)} ClassName="btn MyButton password-reset-button" Text={t('Submit')} />
                    </div>
                    <div className="mt-3">
                        <a onClick={this.OnCancelForgotPassword.bind(this)} className="forgetPassword"> {t('ForgotPassword_Go_Back')}</a> {t('To_Login')}
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

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(ForgotPassword));