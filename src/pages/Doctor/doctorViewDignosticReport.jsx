import React from "react";
import { Redirect, Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactStars from "react-rating-stars-component";
import DoctorHeader from "./docHeader";
import DoctorFooter from "./docFooter";
import DoctorLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import { withTranslation } from "react-i18next";

class DoctorViewDignosticReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      LoadedData: false,
      DiagnosticDetails: {},
      Age: 0,
      UserGender: "",
    };
  }

  componentDidMount() {
    promiseWrapper(this.props.docactions.getAllAppointmentDetail, {
      appointmentGuid: this.props.match.params.appointmentGuid,
    }).then((data) => {
      this.setState({ DiagnosticDetails: data }, () => {
        if (data.patientData.doB && data.patientData.doB !== "") {
          let ad = this.calculate_age(data.patientData.doB);
          this.setState({ Age: ad });
        }
        if (data.patientData.gender) {
          if (data.patientData.gender.toString() === "1") {
            this.setState({ UserGender: "Male" });
          } else if (data.patientData.gender.toString() === "2") {
            this.setState({ UserGender: "Female" });
          } else {
            this.setState({ UserGender: "Other" });
          }
        }
        this.setState({ LoadedData: true });
      });
    });
  }

  calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <DoctorHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <DoctorLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel bg-light">
                {this.state.LoadedData === true && (
                  <div className="row">
                    <div className="search-bar my-4">
                      <div className="d-flex justify-content-between">
                        <div className="search-bar-text search-bar-text2">
                          {"Patients >>"}{" "}
                          <span className="tab-breadcumb">
                            {this.state.DiagnosticDetails.patientData.firstName}{" "}
                            {this.state.DiagnosticDetails.patientData.lastName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="my-profile-form">
                      <div className="divForm">
                        <div className="row">
                          <div className="col-md-12 p-0">
                            <ul
                              className="nav nav-pills nav-fill"
                              id="myprofiletab"
                              role="tablist"
                            >
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  id="about-patient-tab"
                                  data-toggle="tab"
                                  href="#about-patient"
                                  role="tab"
                                  aria-controls="about-patient"
                                  aria-selected="true"
                                >
                                  {t("Doctor.AboutPatient.About_patient")}
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  id="health-info-tab"
                                  data-toggle="tab"
                                  href="#patient-symptoms"
                                  role="tab"
                                  aria-controls="patient-symptoms"
                                  aria-selected="false"
                                >
                                  {t("Doctor.AboutPatient.Patient_Symptoms")}
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  id="patient-history-tab"
                                  data-toggle="tab"
                                  href="#patient-history"
                                  role="tab"
                                  aria-controls="patient-history"
                                  aria-selected="false"
                                >
                                  {t("Doctor.AboutPatient.Appointment_Details")}
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                              <div
                                className="tab-pane fade show active"
                                id="about-patient"
                                role="tabpanel"
                                aria-labelledby="about-patient-tab"
                              >
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="my-profile-container d-flex align-items-center">
                                      <div className="my-profile-photo d-flex justify-content-center align-items-center">
                                        <img
                                          src={
                                            this.state.DiagnosticDetails
                                              .patientData.profileImage
                                          }
                                          style={{ borderRadius: "50px" }}
                                        />
                                      </div>
                                      <div className="mx-4 my-profile-details">
                                        <div className="admin-name">
                                          <span>
                                            {
                                              this.state.DiagnosticDetails
                                                .patientData.firstName
                                            }{" "}
                                            {
                                              this.state.DiagnosticDetails
                                                .patientData.lastName
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row my-5">
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Gender-Age")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {this.state.UserGender} -{" "}
                                        {this.state.Age}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Date_of_Birth")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {this.state.DiagnosticDetails
                                          .patientData.doB === "" ||
                                        this.state.DiagnosticDetails.patientData
                                          .doB == null
                                          ? "---"
                                          : this.state.DiagnosticDetails
                                              .patientData.doB}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Weight")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {this.state.DiagnosticDetails
                                          .patientData.weight === "" ||
                                        this.state.DiagnosticDetails.patientData
                                          .weight == null
                                          ? "---"
                                          : this.state.DiagnosticDetails
                                              .patientData.weight + " lbs"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Height")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {this.state.DiagnosticDetails
                                          .patientData.height === "" ||
                                        this.state.DiagnosticDetails.patientData
                                          .height == null
                                          ? "---"
                                          : this.state.DiagnosticDetails
                                              .patientData.height + " ft"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row my-5">
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Mobile_Number")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {this.state.DiagnosticDetails
                                          .patientData.phone === "" ||
                                        this.state.DiagnosticDetails.patientData
                                          .phone == null
                                          ? "---"
                                          : this.state.DiagnosticDetails
                                              .patientData.phone}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Email_Address")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {
                                          this.state.DiagnosticDetails
                                            .patientData.email
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t(
                                          "Doctor.AboutPatient.Preferred_Language"
                                        )}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {this.state.DiagnosticDetails
                                          .patientData.preferredLanguages &&
                                        this.state.DiagnosticDetails.patientData
                                          .preferredLanguages.length > 0
                                          ? this.state.DiagnosticDetails.patientData.preferredLanguages.join(
                                              ", "
                                            )
                                          : "---"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Citizenship")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span className="mx-2">
                                        {this.state.DiagnosticDetails
                                          .patientData.country === "" ||
                                        this.state.DiagnosticDetails.patientData
                                          .country == null
                                          ? "---"
                                          : this.state.DiagnosticDetails
                                              .patientData.country}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="patient-symptoms"
                                role="tabpanel"
                                aria-labelledby="health-info-tab"
                              >
                                <div className="patient-symptoms-container">
                                  <div className="my-4">
                                    <div className="patient-symptoms-question">
                                      {t(
                                        "Doctor.ViewAppointmentPopup.Q_Since_when_the_symptoms_are_active_?_(4 hours_or_8_hours)"
                                      )}
                                    </div>
                                    <div className="patient-symptoms-answer">
                                      <div className="d-flex">
                                        <span>
                                          {t("Doctor.ViewAppointmentPopup.A.")}
                                        </span>
                                        <span>
                                          {this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .sinceWhen === "" ||
                                          this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .sinceWhen == null
                                            ? "---"
                                            : this.state.DiagnosticDetails
                                                .patientAppointmentDetail
                                                .sinceWhen}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="my-2">
                                    <div className="patient-symptoms-question">
                                      {t(
                                        "Doctor.ViewAppointmentPopup.Q_Is_there_any_medication_or_any_treatment_taken_yet_?"
                                      )}
                                    </div>
                                    <div className="patient-symptoms-answer">
                                      <div className="d-flex">
                                        <span>
                                          {t("Doctor.ViewAppointmentPopup.A.")}
                                        </span>
                                        <span>
                                          {this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .anyMedication === "" ||
                                          this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .anyMedication == null
                                            ? "---"
                                            : this.state.DiagnosticDetails
                                                .patientAppointmentDetail
                                                .anyMedication}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="my-2">
                                    <div className="patient-symptoms-question">
                                      {t(
                                        "Doctor.ViewAppointmentPopup.Q_has_there_already_been_given_a_diagnosis_on_this_condition_?"
                                      )}
                                    </div>
                                    <div className="patient-symptoms-answer">
                                      <div className="d-flex">
                                        <span>
                                          {t("Doctor.ViewAppointmentPopup.A.")}
                                        </span>
                                        <span>
                                          {this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .diagnosisGiven === "" ||
                                          this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .diagnosisGiven == null
                                            ? "---"
                                            : this.state.DiagnosticDetails
                                                .patientAppointmentDetail
                                                .diagnosisGiven}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="my-2">
                                    <div className="patient-symptoms-question">
                                      {t(
                                        "Doctor.ViewAppointmentPopup.Q_Problem_or_symptoms."
                                      )}
                                    </div>
                                    <div className="patient-symptoms-answer">
                                      <div className="d-flex">
                                        <span>
                                          {t("Doctor.ViewAppointmentPopup.A.")}
                                        </span>
                                        <span>
                                          {this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .symptoms === "" ||
                                          this.state.DiagnosticDetails
                                            .patientAppointmentDetail
                                            .symptoms == null
                                            ? "---"
                                            : this.state.DiagnosticDetails
                                                .patientAppointmentDetail
                                                .symptoms}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {this.state.DiagnosticDetails
                                    .patientAppointmentDetail
                                    .patientAttachments &&
                                    this.state.DiagnosticDetails
                                      .patientAppointmentDetail
                                      .patientAttachments.length > 0 && (
                                      <div className="my-2">
                                        <div className="patient-symptoms-question">
                                          {t("Doctor.AboutPatient.Attachments")}
                                        </div>
                                        <div className="patient-symptoms-answer">
                                          {this.state.DiagnosticDetails.patientAppointmentDetail.patientAttachments.map(
                                            (v, idx) => (
                                              <span>
                                                <a
                                                  href={v.docURL}
                                                  target="_blank"
                                                  className="attachment-links"
                                                >
                                                  {v.docName}
                                                </a>
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="patient-history"
                                role="tabpanel"
                                aria-labelledby="patient-history-tab"
                              >
                                <div className="row">
                                  <div className="col-md-12 my-profile-column">
                                    <div className="my-profile-container d-flex align-items-center">
                                      <div className="my-profile-photo d-flex justify-content-center align-items-center">
                                        <img
                                          src={
                                            this.state.DiagnosticDetails
                                              .appointmentData.doctorImage
                                          }
                                          style={{ borderRadius: "50px" }}
                                        />
                                      </div>
                                      <div className="mx-4 my-profile-details">
                                        <div className="admin-name">
                                          <div>
                                            {
                                              this.state.DiagnosticDetails
                                                .appointmentData.doctorName
                                            }
                                          </div>
                                        </div>
                                        {this.state.DiagnosticDetails
                                          .appointmentData.physicianServices &&
                                          this.state.DiagnosticDetails
                                            .appointmentData.physicianServices
                                            .length > 0 && (
                                            <div className="my-profile-details-designation">
                                              {this.state.DiagnosticDetails.appointmentData.physicianServices.map(
                                                (v, idx) => {
                                                  return `${v}, `;
                                                }
                                              )}
                                            </div>
                                          )}
                                        <div className="d-flex align-items-center">
                                          <ReactStars
                                            classNames="star-img img-fluid"
                                            count={5}
                                            size={20}
                                            value={
                                              this.state.DiagnosticDetails
                                                .appointmentData.averageReview
                                            }
                                            isHalf={true}
                                            edit={false}
                                            emptyIcon={
                                              <i
                                                className="far fa-star"
                                                style={{ color: "#20CAD6" }}
                                              />
                                            }
                                            halfIcon={
                                              <i className="fa fa-star-half-alt" />
                                            }
                                            filledIcon={
                                              <i className="fa fa-star" />
                                            }
                                            color="#fff"
                                            activeColor="#20CAD6"
                                          />
                                          (
                                          {
                                            this.state.DiagnosticDetails
                                              .appointmentData.totalReview
                                          }
                                          )
                                        </div>
                                        <div className="my-profile-details-exp">
                                          {
                                            this.state.DiagnosticDetails
                                              .appointmentData.experience
                                          }{" "}
                                          {t(
                                            "Doctor.AboutPatient.years_Experience_overall"
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {this.state.DiagnosticDetails
                                      .appointmentData.doctorGuid ===
                                      localStorage.getItem("user-id") && (
                                      <>
                                        {this.state.DiagnosticDetails
                                          .appointmentData.isFeedbackGiven ===
                                          false &&
                                          this.state.DiagnosticDetails
                                            .appointmentData
                                            .feedbackPendingHours > 0 && (
                                            <div>
                                              <button className="btn doctor-dignostic-reprot-feedback-btn mt-3">
                                                {t(
                                                  "Doctor.AboutPatient.Feedback_pending"
                                                )}
                                              </button>
                                            </div>
                                          )}
                                        {this.state.DiagnosticDetails
                                          .appointmentData.isFeedbackGiven ===
                                          false &&
                                          this.state.DiagnosticDetails
                                            .appointmentData
                                            .feedbackPendingHours === 0 && (
                                            <div>
                                              <button className="btn btn-secondary mt-3">
                                                {t(
                                                  "Doctor.AboutPatient.Feedback_expired"
                                                )}
                                              </button>
                                            </div>
                                          )}
                                        {this.state.DiagnosticDetails
                                          .appointmentData.isFeedbackGiven ===
                                          true && (
                                          <div>
                                            <button className="btn btn-success mt-3">
                                              {t(
                                                "Doctor.AboutPatient.Feedback_given"
                                              )}
                                            </button>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Date")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span>
                                        {new Date(
                                          this.state.DiagnosticDetails.appointmentData.appointmentDate
                                        ).toDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Time")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span>
                                        {new Date(
                                          this.state.DiagnosticDetails.appointmentData.appointmentDate
                                        ).toLocaleTimeString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t(
                                          "Doctor.AboutPatient.Patients_Details"
                                        )}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span>
                                        {
                                          this.state.DiagnosticDetails
                                            .appointmentData.patientName
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t("Doctor.AboutPatient.Booking_Id")}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span>
                                        {
                                          this.state.DiagnosticDetails
                                            .appointmentData.bookingId
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-6 col-12">
                                    <div className="admin-info-title">
                                      <span>
                                        {t(
                                          "Doctor.AboutPatient.Consultation_Fees"
                                        )}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span>
                                        €{" "}
                                        {
                                          this.state.DiagnosticDetails
                                            .appointmentData.consultFees
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div>
                                  <div className="doctor-report-title">
                                    <span className="doctor-report-title-text">
                                      {t(
                                        "Doctor.AboutPatient.Diagnostic_Report"
                                      )}
                                    </span>
                                    {this.state.DiagnosticDetails
                                      .appointmentData.doctorGuid ===
                                      localStorage.getItem("user-id") && (
                                      <Link
                                        to={`/save-diagnostic/${this.props.match.params.appointmentGuid}`}
                                        className="btn doctor-report-edit-btn"
                                      >
                                        <span>
                                          <i className="fas fa-pen"></i>
                                        </span>{" "}
                                        {t("Doctor.AboutPatient.Edit")}
                                      </Link>
                                    )}
                                  </div>
                                  <div className="my-3">
                                    <div className="admin-info-title d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span>
                                        {t(
                                          "Doctor.AboutPatient.Describe_problem_or_symptoms."
                                        )}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <span className="mx-2">
                                        {
                                          this.state.DiagnosticDetails
                                            .diagnosticReport.describeProblem
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="admin-info-title d-flex align-items-center">
                                      <div className="admin-desc-dot"></div>
                                      <span>
                                        {t(
                                          "Doctor.AboutPatient.Diagnostic_Conclusion"
                                        )}
                                      </span>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <span className="mx-2">
                                        {
                                          this.state.DiagnosticDetails
                                            .diagnosticReport
                                            .diagnosticConclusion
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div>
                                      <div className="admin-info-title d-flex align-items-center">
                                        <div className="admin-desc-dot"></div>
                                        <span>
                                          {t(
                                            "Doctor.AboutPatient.Prescribe_Medication"
                                          )}
                                        </span>
                                      </div>
                                      <div className="admin-info-description mx-4">
                                        <div className="d-flex align-items-center">
                                          <div className="admin-desc-dot2"></div>
                                          <div>
                                            {
                                              this.state.DiagnosticDetails
                                                .diagnosticReport
                                                .prescribeMedicine
                                            }
                                          </div>
                                        </div>
                                        <div>
                                          {this.state.DiagnosticDetails
                                            .diagnosticReport
                                            .prescribeMedicineDocs &&
                                            this.state.DiagnosticDetails
                                              .diagnosticReport
                                              .prescribeMedicineDocs.length >
                                              0 && (
                                              <div>
                                                {this.state.DiagnosticDetails.diagnosticReport.prescribeMedicineDocs.map(
                                                  (v, idx) => (
                                                    <div>
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
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {this.state.DiagnosticDetails.diagnosticReport
                                    .additionalDocuments &&
                                    this.state.DiagnosticDetails
                                      .diagnosticReport.additionalDocuments
                                      .length > 0 && (
                                      <div className="mb-3">
                                        <div>
                                          <div className="admin-info-title d-flex align-items-center">
                                            <div className="admin-desc-dot"></div>
                                            <span>
                                              {t(
                                                "Doctor.AboutPatient.Additional_Documents"
                                              )}
                                            </span>
                                          </div>
                                          {this.state.DiagnosticDetails.diagnosticReport.additionalDocuments.map(
                                            (v, idx) => (
                                              <div className="admin-info-description mx-4">
                                                <div className="d-flex align-items-center">
                                                  <div className="admin-desc-dot2"></div>
                                                  <div>
                                                    {v.additionalDocument}
                                                  </div>
                                                </div>
                                                <div>
                                                  <a
                                                    href={
                                                      v.additionalFile.docURL
                                                    }
                                                    target="_blank"
                                                    className="attachment-links"
                                                  >
                                                    {v.additionalFile.docName}
                                                  </a>{" "}
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                                {this.state.DiagnosticDetails.review !==
                                  null && (
                                  <>
                                    <hr />
                                    <div className="doctor-details mt-4">
                                      <div className="admin-info-title d-flex align-items-center">
                                        <span className="admin-info-title-text">
                                          {t("Doctor.AboutPatient.Feedback")}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="admin-info-description d-flex align-items-center">
                                      <span>
                                        {
                                          this.state.DiagnosticDetails.review
                                            .description
                                        }
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <ReactStars
                                        classNames="star-img img-fluid"
                                        count={5}
                                        size={20}
                                        value={
                                          this.state.DiagnosticDetails.review
                                            .rating
                                        }
                                        isHalf={true}
                                        edit={false}
                                        emptyIcon={
                                          <i
                                            className="far fa-star"
                                            style={{ color: "#20CAD6" }}
                                          />
                                        }
                                        halfIcon={
                                          <i className="fa fa-star-half-alt" />
                                        }
                                        filledIcon={
                                          <i className="fa fa-star" />
                                        }
                                        color="#fff"
                                        activeColor="#20CAD6"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <DoctorFooter />
              </div>
            </div>
          </div>
        </div>
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
)(withTranslation()(DoctorViewDignosticReport));
