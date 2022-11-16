import React from "react";
import { Redirect } from 'react-router-dom'
import $ from 'jquery';
import "../login/login.css";
import { toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';
import InputBox from '../../commonComponent/InputBox/inputBox';
import { promiseWrapper, isPasswordValid } from '../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoActions from '../../redux/exado/action';

class ChangePasswordPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            OldPWD: "",
            NewPWD: "",
            ConfirmPWD: "",
            hiddenOldPWD: true,
            hiddenNewPWD: true,
            hiddenConfirmPWD: true,
        };
    }

    handleChangePasswordPopupClick = () => {
        this.props.toggleChangePassword();
    };

    UpdateOldPWD = (e) => {
        this.setState({ OldPWD: e });
    }

    UpdateNewPWD = (e) => {
        this.setState({ NewPWD: e });
    }

    UpdateConfirmPWD = (e) => {
        this.setState({ ConfirmPWD: e });
    }

    toggleOldPWDShow() {
        this.setState({ hiddenOldPWD: !this.state.hiddenOldPWD }, () => {
            if (this.state.hiddenOldPWD === false) {
                $("#txtOldPWD").removeClass("fa-eye-slash");
                $("#txtOldPWD").addClass("fa-eye");
            }
            else {
                $("#txtOldPWD").removeClass("fa-eye");
                $("#txtOldPWD").addClass("fa-eye-slash");
            }
        });
    }

    toggleNewPWDShow() {
        this.setState({ hiddenNewPWD: !this.state.hiddenNewPWD }, () => {
            if (this.state.hiddenNewPWD === false) {
                $("#txtNewPWD").removeClass("fa-eye-slash");
                $("#txtNewPWD").addClass("fa-eye");
            }
            else {
                $("#txtNewPWD").removeClass("fa-eye");
                $("#txtNewPWD").addClass("fa-eye-slash");
            }
        });
    }

    toggleConfirmPWDShow() {
        this.setState({ hiddenConfirmPWD: !this.state.hiddenConfirmPWD }, () => {
            if (this.state.hiddenConfirmPWD === false) {
                $("#txtConfirmPWD").removeClass("fa-eye-slash");
                $("#txtConfirmPWD").addClass("fa-eye");
            }
            else {
                $("#txtConfirmPWD").removeClass("fa-eye");
                $("#txtConfirmPWD").addClass("fa-eye-slash");
            }
        });
    }

    OnChangePassword = (event) => {
        let errorMessage = '';
        if (this.state.OldPWD == '') {
            errorMessage += 'Please enter old password \n';
        }
        if (this.state.NewPWD == '') {
            errorMessage += 'Please enter new password \n';
        }
        else if (!isPasswordValid(this.state.NewPWD)) {
            errorMessage += 'Please enter valid password e.g. 8 digit, contains one Upper and Lower case character, one special character and one digit. \n';
        }
        if (this.state.ConfirmPWD == '') {
            errorMessage += 'Please enter confirm password \n';
        }
        if (errorMessage != '') {
            toast.error(errorMessage);
            return;
        }
        else {
            if (this.state.NewPWD !== this.state.ConfirmPWD) {
                toast.error("password and confirm password must be same");
                return;
            }
        }
        promiseWrapper(this.props.actions.changePassword, { userId: localStorage.getItem("user-id"), oldPassword: this.state.OldPWD, newPassword: this.state.NewPWD })
            .then((data) => {
                if (data.data.isSuccess == true) {
                    toast.success(data.data.message);
                    this.props.toggleChangePassword();
                }
                else {
                    toast.error(data.data.errorMessage);
                }
            });
        //this.props.onRegistration('aditya', 'aditya@gmail.com');
    }

    render() {
        const { t } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="modal patient-general-setting-change-password" style={{ display: "block" }} tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <span className="close h4 text-end me-2" onClick={this.handleChangePasswordPopupClick}>&times;</span>
                        <div className="modal-body">
                            <div className="divForm my-4">
                                <div className="d-flex justify-content-center">
                                    <img src="assets/images/Group7889.png" className="img-fluid w-25" alt="Responsive img" />
                                </div>
                                <div className="d-flex flex-column text-center">
                                    <div className="patient-forget-password-text mt-4">
                                        <p>{t('Doctor.ChangepasswordPopup.Create_new_password')}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted">{t('Doctor.ChangepasswordPopup.Your_new_password_must_be_different_from_previously_used_passwords.')}</p>
                                    </div>
                                </div>
                                <div className="divFormRow px-2 mb-3 relative-position">
                                    <label className="form-label w-100 old-password-label">{t('Doctor.ChangepasswordPopup.Old_Password')}</label>
                                    <InputBox
                                        Type={this.state.hiddenOldPWD ? "password" : "text"}
                                        onChange={this.UpdateOldPWD.bind(this)}
                                        Class="form-control icon-input"
                                        PlaceHolder={t('Doctor.ChangepasswordPopup.Old_Password')}
                                        Value={this.state.OldPWD}
                                        Id="OldPWD" />
                                    <a onClick={this.toggleOldPWDShow.bind(this)}><i className="far fa-eye-slash times-icon" id="txtOldPWD"></i></a>
                                </div>
                                <div className="divFormRow px-2 mb-3 relative-position">
                                    <label className="form-label w-100 new-password-label">{t('Doctor.ChangepasswordPopup.New_Password')}</label>
                                    <InputBox
                                        Type={this.state.hiddenNewPWD ? "password" : "text"}
                                        onChange={this.UpdateNewPWD.bind(this)}
                                        Class="form-control icon-input"
                                        PlaceHolder={t('Doctor.ChangepasswordPopup.New_Password')}
                                        Value={this.state.NewPWD}
                                        Id="NewPWD" />
                                    <a onClick={this.toggleNewPWDShow.bind(this)}><i className="far fa-eye-slash times-icon" id="txtNewPWD"></i></a>
                                </div>
                                <div className="divFormRow px-2 mb-3 relative-position">
                                    <label className="form-label w-100 new-password-label">{t('Doctor.ChangepasswordPopup.Re-enter_password')}</label>
                                    <InputBox
                                        Type={this.state.hiddenConfirmPWD ? "password" : "text"}
                                        onChange={this.UpdateConfirmPWD.bind(this)}
                                        Class="form-control icon-input"
                                        PlaceHolder={t('Doctor.ChangepasswordPopup.Re-enter_password')}
                                        Value={this.state.ConfirmPWD}
                                        Id="ConfirmPWD" />
                                    <a onClick={this.toggleConfirmPWDShow.bind(this)}><i className="far fa-eye-slash times-icon" id="txtConfirmPWD"></i></a>
                                </div>
                                <div className="mt-3">
                                    <a className="btn MyButton reset-password-button" onClick={this.OnChangePassword.bind(this)} role="button" data-toggle="modal" data-target=".patient-general-setting-reset-password-btn">{t('Doctor.ChangepasswordPopup.Reset_Password')}</a>
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
    return {}
}

function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators(exadoActions, dispatch);
    return { actions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(ChangePasswordPopup));