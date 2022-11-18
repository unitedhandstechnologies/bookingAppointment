import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import CloseLineImg from './../../../src/assets/images/close-line.png';
import {
  appointmentStatus,
  appointmentType,
  localStorageKeys,
  promiseWrapper,
  userType,
} from "../../utility/common";
import AppointmentCancelPopup from "./../../commonComponent/AppoitmentCalendar/appointmentCancelPopUp";
import { withTranslation } from "react-i18next";

class ViewAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AppointmentDetails: {},
      IsCancelPopUp: false,
    };
  }

  handleViewAppointmentPopupClick = (data) => {
    this.props.ViewAppointmentAction(data);
  };

  componentDidMount() {
    promiseWrapper(this.props.patientactions.getBookedAppointment, {
      appointmentGuid: this.props.AppointmentGuid,
    }).then((jsdata) => {
      this.setState({ AppointmentDetails: jsdata });
    });
  }

  IsCancelAppoinment() {
    this.setState({
      IsCancelPopUp: !this.state.IsCancelPopUp,
    });
  }

  CloseCancelPopup() {
    this.setState({
      IsCancelPopUp: !this.state.IsCancelPopUp,
    });
    this.handleViewAppointmentPopupClick("");
  }

  render() {
    const { t } = this.props;
    const { AppointmentDetails, IsCancelPopUp } = this.state;
    return (
      <div
        className="modal modify-modal"
        style={{ display: "block", zIndex: 2 }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header modify-modal-header">
              <h5 className="modal-title modify-modal-title">
                {t("Doctor.ViewAppointmentPopup.Appointment_Details")}
              </h5>
              <button
                type="button"
                className="close modify-modal-close"
                onClick={this.handleViewAppointmentPopupClick.bind(this, "")}
              >
                <img
                  src="assets/images/close-line.png"
                  alt="close-line.png"
                  className="img-fluid"
                />
              </button>
            </div>
            <div className="modal-body modify-modal-body">
              <div className="appointment-details">
                <div className="row">
                  <div className="col-md-4">
                    <div className="appointment-details-container">
                      <div className="appointment-details-title">
                        {t("Doctor.ViewAppointmentPopup.Date")}
                      </div>
                      <div className="appointment-details-text">
                        {new Date(
                          AppointmentDetails.appointmentDateTime
                        ).toDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="appointment-details-container">
                      <div className="appointment-details-title">
                        {t("Doctor.ViewAppointmentPopup.Time")}
                      </div>
                      <div className="appointment-details-text">
                        {new Date(
                          AppointmentDetails.appointmentDateTime
                        ).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="appointment-details-container">
                      <div className="appointment-details-title">
                        {t("Doctor.ViewAppointmentPopup.Appointment")}
                      </div>
                      <div className="appointment-details-text">
                        {AppointmentDetails.appointmentType}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="appointment-details-container">
                      <div className="appointment-details-title">
                        {t("Doctor.ViewAppointmentPopup.Patients_Details")}
                      </div>
                      <div className="appointment-details-text">
                        <span>
                          {AppointmentDetails.patientFirstName} &nbsp;
                          {AppointmentDetails.patientLastName}
                        </span>
                        {/* <span className="appointment-details-title">M - 29</span> */}
                      </div>
                      {/* <a href="#" className="view-hiostory-link">View History</a> */}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="appointment-details-container">
                      <div className="appointment-details-title">
                        {t("Doctor.ViewAppointmentPopup.Medical_Specialty")}
                      </div>
                      <div className="appointment-details-text">
                        {AppointmentDetails.physicianServices}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="appointment-details-container">
                      <div className="appointment-details-title">
                        {t("Doctor.ViewAppointmentPopup.Consultation_Fees")}
                      </div>
                      <div className="appointment-details-text">
                        € {AppointmentDetails.amount}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="question-answer mb-3">
                  <div className="question">
                    {t(
                      "Doctor.ViewAppointmentPopup.Q_Since_when_the_symptoms_are_active_?_(4 hours_or_8_hours)"
                    )}
                  </div>
                  <div className="answer">
                    {t("Doctor.ViewAppointmentPopup.A.")}{" "}
                    {AppointmentDetails.sinceWhen}
                  </div>
                </div>
                <div className="question-answer mb-3">
                  <div className="question">
                    {t(
                      "Doctor.ViewAppointmentPopup.Q_Is_there_any_medication_or_any_treatment_taken_yet_?"
                    )}
                  </div>
                  <div className="answer">
                    {t("Doctor.ViewAppointmentPopup.A.")}{" "}
                    {AppointmentDetails.anyMedication}
                  </div>
                </div>
                <div className="question-answer mb-3">
                  <div className="question">
                    {t(
                      "Doctor.ViewAppointmentPopup.Q_has_there_already_been_given_a_diagnosis_on_this_condition_?"
                    )}{" "}
                  </div>
                  <div className="answer">
                    {t("Doctor.ViewAppointmentPopup.A.")}{" "}
                    {AppointmentDetails.diagnosisGiven}
                  </div>
                </div>
                <div className="question-answer mb-3">
                  <div className="question">
                    {t("Doctor.ViewAppointmentPopup.Q_Problem_or_symptoms.")}
                  </div>
                  <div className="answer d-flex">
                    {t("Doctor.ViewAppointmentPopup.A.")}&nbsp;
                    <p>{AppointmentDetails.symptoms}</p>
                  </div>
                </div>
                <hr />
                {AppointmentDetails.patientAttachments &&
                  AppointmentDetails.patientAttachments.length > 0 && (
                    <div className="document-container">
                      <div className="document-title">
                        {t("Doctor.ViewAppointmentPopup.Attachments")}
                      </div>
                      <div className="document-links">
                        <div className="row w-100">
                          {AppointmentDetails.patientAttachments.map(
                            (v, idx) => (
                              <div className="col-md-12 col-6">
                                <a
                                  href={v.docURL}
                                  target="_blank"
                                  className="attachment-links"
                                >
                                  {v.docName}
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              <div className="my-5 d-flex justify-content-around">
                {AppointmentDetails.appointmentStatus ===
                  appointmentStatus.Approved &&
                  AppointmentDetails.appointmentType ===
                    appointmentType.ON_LINE &&
                  this.props.joinCall && (
                    <button
                      type="button"
                      onClick={() =>
                        this.props.isAppointmentTime(
                          null,
                          AppointmentDetails.appointmentDateTime,
                          AppointmentDetails.appointmentGuid
                        )
                      }
                      className="btn appointment-accept-btn"
                    >
                      {t("Doctor.AppointmentUpComing.Take_Call")}
                    </button>
                  )}
                {parseInt(localStorage.getItem(localStorageKeys.userType)) ===
                  userType.doctor && (
                  <>
                    {AppointmentDetails.appointmentStatus ===
                      appointmentStatus.Requested && (
                      <>
                        <button
                          type="button"
                          className="btn appointment-accept-btn"
                          onClick={this.handleViewAppointmentPopupClick.bind(
                            this,
                            true
                          )}
                        >
                          {t("Doctor.ViewAppointmentPopup.Accept")}
                        </button>
                        <button
                          type="button"
                          className="btn appointment-reject-btn"
                          onClick={this.handleViewAppointmentPopupClick.bind(
                            this,
                            false
                          )}
                        >
                          {t("Doctor.ViewAppointmentPopup.Reject")}
                        </button>
                      </>
                    )}
                    {AppointmentDetails.appointmentStatus ===
                      appointmentStatus.Approved && (
                      <button
                        type="button"
                        className="btn appointment-reject-btn"
                        onClick={this.IsCancelAppoinment.bind(this)}
                      >
                        {t("Doctor.ViewAppointmentPopup.Cancel")}
                      </button>
                    )}
                  </>
                )}
                {parseInt(localStorage.getItem(localStorageKeys.userType)) ===
                  userType.patient && (
                  <button
                    type="button"
                    onClick={this.IsCancelAppoinment.bind(this)}
                    className="btn appointment-reject-btn"
                  >
                    {t("Doctor.ViewAppointmentPopup.Cancel")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {IsCancelPopUp ? (
          <AppointmentCancelPopup
            ClosePopup={this.CloseCancelPopup.bind(this)}
            AppointmentGuid={AppointmentDetails.appointmentGuid}
          />
        ) : null}
      </div>
    );
  }
}

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(ViewAppointment));
