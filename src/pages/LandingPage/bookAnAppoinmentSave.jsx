import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { promiseWrapper, localStorageKeys } from "../../utility/common";
import LandingPageHeader from "./landingPageHeader";
import LandingPageFooter from "./landingPageFooter";
import { withTranslation } from "react-i18next";

class BookAnAppoinmentSave extends React.Component {
  constructor(props) {
    super(props);
    const saveAppointmentData = JSON.parse(
      sessionStorage.getItem(localStorageKeys.saveAppointmentData)
    );
    console.log(saveAppointmentData);
    this.state = {
      redirect: null,
      ShowSuccess: false,
      docDeatils: {},
      IsChecked: false,
      appoinmentDetails: {},
      bookAppoinment: {
        appointmentGuid: null,
        bookingId: 0,
        patientGuid: localStorage.getItem("user-id"),
        doctorGuid: saveAppointmentData.docGuid,
        appointmentDate: saveAppointmentData.timeslot,
        consultFees:
          saveAppointmentData.appointmentType === 2
            ? saveAppointmentData.inclinicAppointmentFees
            : saveAppointmentData.onlineAppointmentFees,
        appointmentType: saveAppointmentData.appointmentType ?? 2,
        doctorCurrency: saveAppointmentData.doctorCurrency,
        refundPercentage: saveAppointmentData.refundPercentage,
        refundInClinicPercentage: saveAppointmentData.refundInClinicPercentage,
        symptoms: "",
        sinceWhen: "",
        anyMedication: "",
        diagnosisGiven: "",
        appointmentStatus: 1,
        patientAttachments: [],
        isPaidOnline: false,
      },
      ShowWallet: false,
      WalletBalance: 0,
      RefundCheckBox: true,
      saveAppointmentData: saveAppointmentData,
    };
  }

  componentDidMount() {
    if (
      this.state.saveAppointmentData.acceptOnlinePayment === true ||
      this.state.saveAppointmentData.appointmentType === 1
    ) {
      promiseWrapper(this.props.patientactions.getWalletBalance, {
        patientGuid: localStorage.getItem("user-id"),
      }).then((jsdata) => {
        this.setState({ WalletBalance: jsdata.result.walletBalance });
        this.setState((prevState) => ({
          bookAppoinment: {
            ...prevState.bookAppoinment,
            ["isPaidOnline"]: true,
          },
        }));
        this.setState({ ShowWallet: true });
        this.setState({ RefundCheckBox: false });
      });
    }
  }

  UpdateSymptomsText = (e) => {
    this.setState((prevState) => ({
      bookAppoinment: {
        ...prevState.bookAppoinment,
        ["symptoms"]: e.target.value,
      },
    }));
  };

  UpdateSinceWhenText = (e) => {
    this.setState((prevState) => ({
      bookAppoinment: {
        ...prevState.bookAppoinment,
        ["sinceWhen"]: e.target.value,
      },
    }));
  };

  UpdateAnyMedicationText = (e) => {
    this.setState((prevState) => ({
      bookAppoinment: {
        ...prevState.bookAppoinment,
        ["anyMedication"]: e.target.value,
      },
    }));
  };

  UpdateDiagnosisGivenText = (e) => {
    this.setState((prevState) => ({
      bookAppoinment: {
        ...prevState.bookAppoinment,
        ["diagnosisGiven"]: e.target.value,
      },
    }));
  };

  UpdateIsChecked = (e) => {
    this.setState({ IsChecked: e.target.checked });
  };

  UpdateRefundCheckBox = (e) => {
    this.setState({ RefundCheckBox: e.target.checked });
  };

  onUploadDocument = (e) => {
    promiseWrapper(this.props.patientactions.updatePatientAttachment, {
      patientGuid: localStorage.getItem("user-id"),
      file: e.target.files[0],
    }).then((data) => {
      if (data.success === true) {
        let curState = this.state.bookAppoinment.patientAttachments;
        let newFile = {
          fileGuid: null,
          docName: data.result,
          docURL: data.result,
          isDeleted: false,
        };
        curState.push(newFile);

        this.setState((prevState) => ({
          bookAppoinment: {
            ...prevState.bookAppoinment,
            ["patientAttachments"]: curState,
          },
        }));
      } else {
        toast.error("there is some issue with file upload");
      }
    });
  };

  onDeleteDocument = (dUrl, dName, idx, e) => {
    promiseWrapper(this.props.patientactions.removeDocument, {
      documentURI: dUrl,
      documentName: dName,
    }).then((data) => {
      if (data.success === true) {
        let curState = this.state.bookAppoinment.patientAttachments;
        curState.splice(idx, 1);
        // let newState = curState.map(function (d, id) {
        //     if (id === idx) {
        //         if (d.fileGuid !== null) {
        //             d.isDeleted = true;
        //         }
        //         else
        //         // d.educationCertificates.splice(inneridx, 1);
        //     }
        //     return d;
        // });

        this.setState((prevState) => ({
          bookAppoinment: {
            ...prevState.bookAppoinment,
            ["patientAttachments"]: curState,
          },
        }));
        toast.success("Attachment removed");
      } else {
        toast.error("there is some issue with file remove");
      }
    });
  };

  BookAnAppoinmentSave() {
    let errorMessage = "";
    if (this.state.bookAppoinment.symptoms === "") {
      errorMessage += `Please enter "Describe problem or symptoms." \n`;
    }
    if (this.state.bookAppoinment.sinceWhen === "") {
      errorMessage += `Please enter "Since when the symptoms are active ?" \n`;
    }
    if (this.state.bookAppoinment.anyMedication === "") {
      errorMessage += `Please enter "Is there any medication or any treatment taken yet ?" \n`;
    }
    if (
      this.state.ShowWallet === true &&
      this.state.walletBalance < this.state.bookAppoinment.consultFees
    ) {
      errorMessage += `Insufficient Balance Please Add funds to book appoinment" \n`;
    }
    if (errorMessage !== "") {
      toast.error(errorMessage);
      return;
    }
    promiseWrapper(this.props.patientactions.bookAppointment, {
      appointment: this.state.bookAppoinment,
    }).then((data) => {
      if (data.data.isSuccess === true) {
        toast.success(data.data.message);
        this.setState({ ShowSuccess: true });
      } else {
        toast.error(data.data.errorMessage);
      }
    });
  }

  render() {
    const { t } = this.props;
    const { saveAppointmentData } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <LandingPageHeader />
        <div className="appointment-details-container">
          <div className="appointment-details-profile">
            <div className="dotor-item-container my-4">
              <div className="doctor-item-left mx-4 d-flex align-items-center">
                <img
                  src={saveAppointmentData.doctorImage}
                  alt=""
                  className="img-fluid top-doctor-image rounded-circle"
                />
              </div>
              <div className="doctor-item-right">
                <a className="doctor-name-link">
                  {saveAppointmentData.firstName === "" ||
                  saveAppointmentData.firstName == null
                    ? "---"
                    : saveAppointmentData.firstName}
                  &nbsp;
                  {saveAppointmentData.lastName === "" ||
                  saveAppointmentData.lastName == null
                    ? "---"
                    : saveAppointmentData.lastName}
                </a>
                <span className="doctor-designation">
                  {saveAppointmentData.physicianServices.map((v, idx) => {
                    return `${v}, `;
                  })}
                </span>
                <div>
                  <span className="doctor-rating d-flex align-items-center">
                    <ReactStars
                      classNames="star-img img-fluid"
                      count={5}
                      size={20}
                      value={saveAppointmentData.averageReview}
                      isHalf={true}
                      edit={false}
                      emptyIcon={
                        <i
                          className="far fa-star"
                          style={{ color: "#20CAD6" }}
                        />
                      }
                      halfIcon={<i className="fa fa-star-half-alt" />}
                      filledIcon={<i className="fa fa-star" />}
                      color="#fff"
                      activeColor="#20CAD6"
                    />
                    ({saveAppointmentData.totalReview})
                  </span>
                </div>
                <div>
                  <span className="doctor-year">
                    {saveAppointmentData.experience}{" "}
                    {t("Public.Appointment.Years")}{" "}
                  </span>
                  <span className="doctor-exp">
                    {" "}
                    {t("Public.Appointment.OfExperience")}{" "}
                  </span>
                </div>
                <div className="doctor-visit">
                  <div className="doctor-visit-container">
                    <div className="visit-pills">
                      {this.state.bookAppoinment.appointmentType === 1 ? (
                        <>
                          <span>
                            <img
                              src="assets/images/videochat.png"
                              alt="videochat.png"
                              className="img-fluid"
                            />
                          </span>
                          <span>{t("Public.Appointment.VideoVisit")}</span>
                        </>
                      ) : this.state.bookAppoinment.appointmentType === 3 ? (
                        <span>{t("Public.Appointment.Chat_with_doctor")}</span>
                      ) : (
                        <span>{t("Public.Appointment.In-Clinic")}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="appointment-details-form-background">
            <div className="container">
              <div className="row">
                <div className="col-md-10 col-lg-6 col-sm-12 col-12 m-auto">
                  <div className="appointment-details-form py-4">
                    <div className="appointment-details-form-title">
                      <h3>{t("Public.BookAppointment.Appointment_Details")}</h3>
                    </div>
                    <div className="appointment-details-form-info my-4">
                      <div className="row">
                        <div className="col-md-8 col-sm-8 col-8">
                          <div className="appointment-details-form-info-title">
                            {t("Public.BookAppointment.Date")}
                          </div>
                          <div className="appointment-details-form-info-value">
                            {new Date(
                              saveAppointmentData.timeslot
                            ).toDateString()}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-4">
                          <div className="appointment-details-form-info-title">
                            {t("Public.BookAppointment.Time")}
                          </div>
                          <div className="appointment-details-form-info-value">
                            {new Date(
                              saveAppointmentData.timeslot
                            ).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4 col-sm-4 col-4">
                          <div className="appointment-details-form-info-title">
                            {t("Public.BookAppointment.Patient_Details")}
                          </div>
                          <div className="appointment-details-form-info-value">
                            {localStorage.getItem("user-fullname")}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-4">
                          {this.state.ShowWallet === true && (
                            <div className="appointment-details-form-info-title">
                              {t("Public.BookAppointment.Wallet_Balance")}
                            </div>
                          )}
                          {this.state.ShowWallet === true && (
                            <div>
                              <span className="appointment-details-form-info-balance">
                                € {this.state.WalletBalance}
                              </span>
                              <span className="appointment-details-form-info-add-funds">
                                <Link to="/patient/addfunds">
                                  {t("Public.Appointment.Add_Funds")}
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 col-sm-4 col-4">
                          <div className="appointment-details-form-info-title">
                            {t("Public.BookAppointment.Consultation_Fees")}
                          </div>
                          <div className="appointment-details-form-info-value">
                            {this.state.bookAppoinment.doctorCurrency}{" "}
                            {this.state.bookAppoinment.consultFees}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="describe-problem-textarea">
                        {t("Public.BookAppointment.Describe_Problem")}
                      </label>
                      <textarea
                        className="form-control appointment-details-form-inputs"
                        onChange={this.UpdateSymptomsText.bind(this)}
                        id="describe-problem-textarea"
                        rows="3"
                        placeholder="Describe problem or symptoms."
                      ></textarea>
                    </div>
                    <div className="form-group my-4">
                      <label for="symptoms-active">
                        {t("Public.BookAppointment.Since_When")}
                      </label>
                      <input
                        type="text"
                        className="form-control appointment-details-form-inputs"
                        onChange={this.UpdateSinceWhenText.bind(this)}
                        id="symptoms-active"
                        placeholder="Since..."
                      />
                    </div>
                    <div className="form-group my-4">
                      <label for="symptoms-active">
                        {t("Public.BookAppointment.Any_Medication")}
                      </label>
                      <input
                        type="text"
                        className="form-control appointment-details-form-inputs"
                        onChange={this.UpdateAnyMedicationText.bind(this)}
                        id="symptoms-active"
                        placeholder="Any medication or treatment..."
                      />
                    </div>
                    <div className="form-group my-4">
                      <label for="symptoms-active">
                        {t("Public.BookAppointment.Diagnosis_Given")}
                      </label>
                      <input
                        type="text"
                        className="form-control appointment-details-form-inputs"
                        onChange={this.UpdateDiagnosisGivenText.bind(this)}
                        id="symptoms-active"
                        placeholder="If any"
                      />
                    </div>
                    <div>
                      <label className="btn form-file-upload-btn btn-default w-100">
                        {t("Public.BookAppointment.Attach_Documents")}
                        <input
                          type="file"
                          onChange={this.onUploadDocument.bind(this)}
                          hidden
                        />
                      </label>
                      <div className="document-links">
                        <div className="row w-100">
                          {this.state.bookAppoinment.patientAttachments.map(
                            (v, idx) => (
                              <div className="col-md-12 col-6">
                                <a
                                  id={`att_${v.docName}`}
                                  href={v.docURL}
                                  target="_blank"
                                  className="attachment-links"
                                >
                                  {v.docName}
                                </a>
                                <a
                                  className="text-danger"
                                  onClick={this.onDeleteDocument.bind(
                                    this,
                                    v.docURL,
                                    v.docName,
                                    idx
                                  )}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fas fa-times"></i>
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 checkbox-input d-flex">
                      <input
                        className=""
                        type="checkbox"
                        value=""
                        checked={this.state.IsChecked === true}
                        onChange={this.UpdateIsChecked.bind(this)}
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-4"
                        for="flexCheckDefault"
                      >
                        {t("Public.BookAppointment.I_Agree_FirstMessage")}{" "}
                        <Link target="_blank" to="/terms-and-conditions">
                          {t("Public.BookAppointment.Terms&Conditions")}
                        </Link>{" "}
                        {t("Public.BookAppointment.I_Agree_SecondMessage")}
                      </label>
                    </div>
                    {this.state.ShowWallet === true && (
                      <div className="mt-3 checkbox-input d-flex">
                        <input
                          className=""
                          type="checkbox"
                          value=""
                          checked={this.state.RefundCheckBox === true}
                          onChange={this.UpdateRefundCheckBox.bind(this)}
                          id="flexCheckDefault2"
                        />
                        <label
                          className="form-check-label ml-4"
                          for="flexCheckDefault2"
                        >
                          {t(
                            "Public.Appointment.For_cancellation_of_appointment"
                          )}{" "}
                          {saveAppointmentData.appointmentType === 2
                            ? saveAppointmentData.refundInClinicPercentage
                            : saveAppointmentData.refundPercentage}
                          {t("Public.Appointment.%_will_be_refunded..")}
                        </label>
                      </div>
                    )}
                    <div className="book-appointment-btn my-4 d-flex justify-content-center">
                      {this.state.IsChecked === true &&
                        this.state.RefundCheckBox === true && (
                          <a
                            onClick={this.BookAnAppoinmentSave.bind(this)}
                            className="btn px-5"
                            role="button"
                          >
                            {t("Public.BookAppointment.Book")}
                          </a>
                        )}
                      {(this.state.IsChecked !== true ||
                        this.state.RefundCheckBox !== true) && (
                        <a className="btn px-5 disabled" role="button">
                          {t("Public.BookAppointment.Book")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.ShowSuccess === true && (
            <div
              className="modal accept-appointment"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="divForm my-4">
                      <div className="d-flex flex-column text-center">
                        <div className="patient-forget-password-text">
                          <p>
                            {t("Public.BookAppointment.Appointment_Booked")}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-4">
                        <img
                          src="assets/images/Group8433.png"
                          className="img-fluid w-25"
                          alt="Responsive logo"
                        />
                      </div>
                      <div className="text-center mb-5">
                        <span>
                          {t(
                            "Public.BookAppointment.Appointment_has_been_booked"
                          )}
                        </span>
                        <br />
                      </div>
                      <div className="mt-3 text-center">
                        <Link
                          className="btn MyButton reset-password-button w-50"
                          to="/patient/dashboard"
                        >
                          {t("Public.BookAppointment.Go_to_Dashboard")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <LandingPageFooter />
      </div>
    );
  }
}

function mapStoreToprops(state, props) {
  return {
    appoinmentModel: state.ExadoPatient.appoinmentModel,
    docAppoinmentDetails: state.ExadoPatient.docAppoinmentDetails,
  };
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withRouter(withTranslation()(BookAnAppoinmentSave)));
