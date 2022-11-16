import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import "../login/login.css";
import { toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';
import { promiseWrapper } from '../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoDocActions from '../../redux/exadoDoc/action';
import exadoPatientActions from '../../redux/exadoPatient/action';
// import Group8169 from "../../assets/images/Group8169.png";

class DeactivateAccountPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Message: "",
        };
    }

    handleDeactivateAccountClick = () => {
        this.props.toggleDeactivateAccount();
    };

    UpdateMessage = (e) => {
        this.setState({ Message: e });
    }

    OnAccountAction = (event) => {
        if (this.props.user === "Doctor") {
            promiseWrapper(this.props.actions.deactivateAccount, { doctorGuid: localStorage.getItem("user-id") })
                .then((data) => {
                    if (data.data.isSuccess == true) {
                        toast.success(data.data.message);
                        localStorage.clear();
                        this.setState({ redirect: "/home" });
                    }
                    else {
                        toast.error(data.data.errorMessage);
                    }
                });
        }
        else {
            promiseWrapper(this.props.patientActions.deletePatient, { patientGuid: localStorage.getItem("user-id") })
                .then((data) => {
                    if (data.data.isSuccess == true) {
                        toast.success(data.data.message);
                        localStorage.clear();
                        this.setState({ redirect: "/home" });
                    }
                    else {
                        toast.error(data.data.errorMessage);
                    }
                });
        }
    }

    render() {
        const { t } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="modal delete-your-account" style={{ display: "block" }} tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="divForm m-4">
                                <div className="d-flex justify-content-center">
                                    <img src="assets/images/Group8169.png" className="img-fluid w-25" alt="Responsive img" />
                                </div>
                                <div className="d-flex flex-column text-center">
                                    <div className="patient-forget-password-text mt-4">
                                        <p>{t('Doctor.DeactivateAccountPopup.Were_sorry_to_see_you_go.')}</p>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <p className="text-muted w-75">{t('Doctor.DeactivateAccountPopup.Are_you_sure_you_want_to_delete_your_account?_If_you_delete_your_account_you_will_permanently_lose_your_profile.')}</p>
                                    </div>
                                </div>
                                <label className="mb-2">{t('Doctor.DeactivateAccountPopup.Message')}</label>
                                <div className="search-bar-text-input delete-account-textarea mb-3">
                                    <textarea
                                        className="form-control"
                                        id="txtareaMessage"
                                        onChange={this.UpdateMessage.bind(this)}
                                        rows="4"
                                        placeholder={t('Doctor.DeactivateAccountPopup.Your_Message')}></textarea>
                                </div>
                                <div className="d-flex">
                                    <button type="button" onClick={this.handleDeactivateAccountClick} className="btn MyButton w-50 mx-3" data-dismiss="modal">{t('Doctor.DeactivateAccountPopup.Cancel')}</button>
                                    <button type="button" onClick={this.OnAccountAction} className="btn btn-outline-danger w-50 delete-account-btn mx-3" role="button" data-toggle="modal" data-target=".delete-your-account-okay">{this.props.user === "Doctor" ? "Deactivate Account" : "Delete Account"}</button>
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
    const actions = bindActionCreators(exadoDocActions, dispatch);
    const patientActions = bindActionCreators(exadoPatientActions, dispatch);
    return { actions, patientActions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(DeactivateAccountPopup));