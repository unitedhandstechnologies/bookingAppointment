import React from 'react';
import exadoDocActions from '../../redux/exadoDoc/action';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { promiseWrapper } from '../../utility/common';
import { toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';

class AskRefundPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RefundReason: ""
        };
    }

    closeAskRefundPopup = () => {
        this.props.CloseAskRefundPopup(this.props.AppoinmentDetails.appointmentGuid);
    };

    UpdateRefundReason = (e) => {
        this.setState({ RefundReason: e.target.value });
    }

    SaveRefund() {
        let errorMessage = '';
        if (this.state.RefundReason === '') {
            errorMessage += `Please enter reason for refund \n`;
        }
        if (errorMessage != '') {
            toast.error(errorMessage);
            return;
        }
        this.closeAskRefundPopup();
        let refund = {
            "appointmentGuid": this.props.AppoinmentDetails.appointmentGuid,
            "refundReason": this.state.RefundReason
        };
        promiseWrapper(this.props.patientactions.addRefund, { refundModel: refund })
            .then((data) => {
                if (data.isSuccess == true) {
                    toast.success(data.message);
                    // this.closeAddFundsPopup();
                }
                else {
                    toast.error(data.errorMessage);
                    // this.closeAddFundsPopup();
                }
            });
    }

    render() {
        const { t } = this.props
        return (
            <div className="modal modify-modal" style={{ display: "block" }} tabindex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header modify-modal-header">
                            <h5 className="modal-title modify-modal-title">Ask For Refund</h5>
                            <button type="button" className="close ms-0 model-close-btn" onClick={this.closeAskRefundPopup}>
                                <span aria-hidden="true"><i className="fas fa-times"></i></span>
                            </button>
                        </div>
                        <div className="modal-body modify-modal-body">
                            <div className="appointment-details">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="appointment-details-container">
                                            <div className="appointment-details-title">{t('Public.BookAppointment.Date')}</div>
                                            <div className="appointment-details-text">{new Date(this.props.AppoinmentDetails.appointmentDateTime).toDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="appointment-details-container">
                                            <div className="appointment-details-title">{t('Public.BookAppointment.Time')}</div>
                                            <div className="appointment-details-text">{new Date(this.props.AppoinmentDetails.appointmentDateTime).toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="appointment-details-container">
                                            <div className="appointment-details-title">Doctor's Details</div>
                                            <div className="appointment-details-text">{this.props.AppoinmentDetails.doctorFirstName} {this.props.AppoinmentDetails.doctorLastName}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="appointment-details-container">
                                            <div className="appointment-details-title">{t('Public.BookAppointment.Patient_Details')}</div>
                                            <div className="appointment-details-text">
                                                <span>{this.props.AppoinmentDetails.patientFirstName} {this.props.AppoinmentDetails.patientLastName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="appointment-details-container">
                                            <div className="appointment-details-title">{t('Patient.ViewDignosticReport.Booking_Id')}</div>
                                            <div className="appointment-details-text">{this.props.AppoinmentDetails.bookingId}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="appointment-details-container">
                                            <div className="appointment-details-title">{t('Patient.ViewDignosticReport.Consultation_Fees')}</div>
                                            <div className="appointment-details-text">€ {this.props.AppoinmentDetails.amount}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <label className="mb-2">Reason</label>
                                <div className="search-bar-text-input delete-account-textarea">
                                    <textarea className="form-control" onChange={this.UpdateRefundReason.bind(this)} rows="4" placeholder="Your Reason"></textarea>
                                </div>
                                <div className="my-5 d-flex justify-content-around">
                                    <button type="button" onClick={this.SaveRefund.bind(this)} className="btn appointment-accept-btn">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStoreToprops(state, props) {
    return {
        appoinmentModel: state.ExadoPatient.appoinmentModel,
    }
}

function mapDispatchToProps(dispatch) {
    const docactions = bindActionCreators(exadoDocActions, dispatch);
    const patientactions = bindActionCreators(exadoPatientActions, dispatch);
    return { docactions, patientactions };
}


export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(AskRefundPopup));