import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { promiseWrapper, localStorageKeys } from "../../utility/common";
import LandingPageHeader from "./landingPageHeader";
import LandingPageFooter from "./landingPageFooter";
import ReactStars from "react-rating-stars-component";
import CommonCalender from "./../../commonComponent/AppoitmentCalendar/commonCalendar";
// import PersonImg from './../../assets/images/Person.png';
// import VideochatImg from './../../assets/images/videochat.png';
// import StarImg from './../../assets/images/Star.png';
// import AboutImg from './../../assets/images/About.png';
// import Location1Img from './../../assets/images/Location1.png';
// import ContactImg from './../../assets/images/Contact.png';
// import Group10073Img from './../../assets/images/Group10073.png';
// import EducationImg from './../../assets/images/Education.png';
// import ExperienceImg from './../../assets/images/Experience.png';
// import FAQsImg from './../../assets/images/FAQs.png';
// import PatientImg from './../../assets/images/Patient.png';
import ViewAllAvailability from "./viewAllAvailability";
import { withTranslation, Trans } from "react-i18next";

class BookAnAppoinmentDoctorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      docGuid: this.props.match.params.docGuid,
      appoinmentType: "Clinic",
      viewAllAvailabilityPopup: false,
      anAppoinmentModel: {
        appDate: new Date().toISOString().split("T")[0],
        location: "",
        physicianService: [],
        isMale: 0,
        languageId: [],
        appointmentType: this.props.appoinmentModel.appointmentType,
      },
      docDeatils: {
        acceptOnlinePayment: "",
        doctorImage: "",
        firstName: "",
        lastName: "",
        physicianServices: [],
        totalReview: 0,
        averageReview: 0,
        description: "",
        onlineAppointmentFees: 0,
        inclinicAppointmentFees: 0,
        isChatFree: null,
        chatFees: 0,
        gender: 0,
        availableSlots: [],
        clinicName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        contact: "",
        educationModel: [
          {
            doctorEducationGuid: "",
            degreeTitle: "",
            collage: "",
            passingYear: "",
            verificationType: 0,
            educationCertificates: [
              {
                fileGuid: "",
                docName: "",
                docURL: "",
                isDeleted: null,
              },
            ],
          },
        ],
        experienceModel: [
          {
            doctorExperienceGuid: "",
            startDate: "",
            endDate: "",
            startDateYear: "",
            endDateYear: "",
            organizationName: "",
            description: "",
            verificationType: 0,
          },
        ],
        reviews: [
          {
            doctorReviewGuid: "",
            patientGuid: "",
            patientFirstname: "",
            patientLastName: "",
            rating: 0,
            description: "",
          },
        ],
        faQs: [
          {
            doctorFAQGuid: "",
            question: "",
            answer: "",
          },
        ],
      },
    };
  }

  componentDidMount() {
    // console.log(this.props.appoinmentModel);
    this.setState({ docGuid: this.props.match.params.docGuid });
    this.getAppointmentData();
    if (this.props.appoinmentModel.appointmentType === 1) {
      this.setState({ appoinmentType: "Video" });
    } else if (this.props.appoinmentModel.appointmentType === 2) {
      this.setState({ appoinmentType: "Clinic" });
    } else if (this.props.appoinmentModel.appointmentType === 3) {
      this.setState({ appoinmentType: "Chat" });
    }
  }

  UpdateAppoinmentType = (e) => {
    this.setState({ appoinmentType: e.target.value });
    let data = 0;
    if (e.target.value === "Clinic") {
      data = 2;
    } else if (e.target.value === "Video") {
      data = 1;
    } else if (e.target.value === "Chat") {
      data = 3;
    }
    this.setState(
      (prevState) => ({
        anAppoinmentModel: {
          ...prevState.anAppoinmentModel,
          ["appointmentType"]: data,
        },
      }),
      () => {
        this.props.patientactions.updateAppoimentModel(
          this.state.anAppoinmentModel
        );
        this.getAppointmentData();
      }
    );
  };

  getAppointmentData() {
    promiseWrapper(this.props.patientactions.searchDoctorAppointment, {
      appointmentModel: this.state.anAppoinmentModel,
      doctorGuid: this.props.match.params.docGuid,
    }).then((jsdata) => {
      this.setState({ docDeatils: jsdata });
    });
  }

  CallBackAppointmentSave(doctorGuid, timesloat, e) {
    let docAppoinmentDetails = {
      acceptOnlinePayment: this.state.docDeatils.acceptOnlinePayment,
      doctorImage: this.state.docDeatils.doctorImage,
      firstName: this.state.docDeatils.firstName,
      lastName: this.state.docDeatils.lastName,
      doctorCurrency: this.state.docDeatils.doctorCurrency,
      physicianServices: this.state.docDeatils.physicianServices,
      totalReview: this.state.docDeatils.totalReview,
      averageReview: this.state.docDeatils.averageReview,
      onlineAppointmentFees: this.state.docDeatils.onlineAppointmentFees,
      inclinicAppointmentFees: this.state.docDeatils.inclinicAppointmentFees,
      isChatFree: this.state.docDeatils.isChatFree,
      chatFees: this.state.docDeatils.chatFees,
      experience: this.state.docDeatils.experience,
      timeslot: timesloat,
      docGuid: doctorGuid,
      appointmentType: this.state.anAppoinmentModel.appointmentType,
      refundInClinicPercentage: this.state.docDeatils.refundInClinicPercentage,
      refundPercentage: this.state.docDeatils.refundPercentage,
    };
    this.props.patientactions.updateDoctorAppointmentDetails(
      docAppoinmentDetails
    );
    sessionStorage.setItem(
      localStorageKeys.saveAppointmentData,
      JSON.stringify(docAppoinmentDetails)
    );
    this.setState({ redirect: "/book-an-appoinment-save" });
  }

  toggleViewAllAvailability = () => {
    this.setState({ docGuid: this.state.docGuid }, () => {
      this.setState({
        viewAllAvailabilityPopup: !this.state.viewAllAvailabilityPopup,
      });
    });
  };

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <LandingPageHeader />
        <div className="doctor-profile-container">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="dotor-item-container">
                  <div className="doctor-item-left">
                    <img
                      src={this.state.docDeatils.doctorImage}
                      alt=""
                      className="img-fluid top-doctor-image rounded-circle"
                    />
                  </div>
                  <div className="doctor-item-right">
                    <a className="doctor-name-link">
                      {this.state.docDeatils.firstName === "" ||
                      this.state.docDeatils.firstName == null
                        ? "---"
                        : this.state.docDeatils.firstName}
                      &nbsp;
                      {this.state.docDeatils.lastName === "" ||
                      this.state.docDeatils.lastName == null
                        ? "---"
                        : this.state.docDeatils.lastName}
                    </a>
                    <span className="doctor-designation">
                      {this.state.docDeatils.physicianServices.map((v, idx) => {
                        return `${v}, `;
                      })}
                    </span>
                    <div>
                      <span className="doctor-rating d-flex align-items-center">
                        <ReactStars
                          classNames="star-img img-fluid"
                          count={5}
                          size={20}
                          value={this.state.docDeatils.averageReview}
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
                        ({this.state.docDeatils.totalReview})
                      </span>
                    </div>
                    <div>
                      <span className="doctor-year">
                        {this.state.docDeatils.experience}{" "}
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
                          <span>
                            <img
                              src="assets/images/Person.png"
                              alt="Person.png"
                              className="img-fluid"
                            />
                          </span>
                          <span>
                            {t("Public.SearchDoctorAppointment.InPersonVisit")}
                          </span>
                        </div>
                      </div>
                      <div className="doctor-visit-container">
                        <div className="visit-pills">
                          <span>
                            <img
                              src="assets/images/videochat.png"
                              alt="videochat.png"
                              className="img-fluid"
                            />
                          </span>
                          <span>{t("Public.Appointment.VideoVisit")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="doctor-charges">
                      <div className="d-flex">
                        <div className="question-rate2">
                          <div className="question-rate21">
                            {this.state.docDeatils.doctorCurrency}{" "}
                            {this.state.docDeatils.chatFees}
                          </div>
                          <div className="question-status">
                            {t("Public.Appointment.Per3Question")}
                          </div>
                        </div>
                        <div className="question-rate2">
                          <div className="question-rate22">
                            {this.state.docDeatils.doctorCurrency}{" "}
                            {this.state.docDeatils.onlineAppointmentFees}
                          </div>
                          <div className="question-status">
                            {t("Public.Appointment.Online")}
                          </div>
                        </div>
                        <div className="question-rate2">
                          <div className="question-rate23">
                            {this.state.docDeatils.doctorCurrency}{" "}
                            {this.state.docDeatils.inclinicAppointmentFees}
                          </div>
                          <div className="question-status">
                            {t("Public.Appointment.InClinic")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="doctor-details">
                  <div className="doctor-details-left">
                    <img
                      src="assets/images/About.png"
                      alt="About.png"
                      className="img-fluid doctor-details-left-icon"
                    />
                    <div className="doctor-details-left-title">
                      {t("Public.SearchDoctorAppointment.AboutDoctor")}
                    </div>
                  </div>
                  <div className="doctor-details-right">
                    <div className="doctor-details-right-text">
                      {this.state.docDeatils.description}
                    </div>
                  </div>
                </div>
                <div className="doctor-details">
                  <div className="doctor-details-left">
                    <img
                      src="assets/images/Location1.png"
                      alt="Location1.png"
                      className="img-fluid doctor-details-left-icon"
                    />
                    <div className="doctor-details-left-title">
                      {t("Public.SearchDoctorAppointment.Address")}
                    </div>
                  </div>
                  <div className="doctor-details-right">
                    <div className="doctor-details-right-text">
                      <span>{this.state.docDeatils.address}</span>
                      <br />
                      <span>
                        {this.state.docDeatils.city},{" "}
                        {this.state.docDeatils.state},{" "}
                        {this.state.docDeatils.zip},{" "}
                        {this.state.docDeatils.country}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="doctor-details">
                  <div className="doctor-details-left">
                    <img
                      src="assets/images/Contact.png"
                      alt="Contact.png"
                      className="img-fluid doctor-details-left-icon"
                    />
                    <div className="doctor-details-left-title">
                      {t("Public.SearchDoctorAppointment.Contact")}
                    </div>
                  </div>
                  <div className="doctor-details-right">
                    <div className="doctor-details-right-text">
                      <span>{this.state.docDeatils.contact}</span>
                      <br />
                    </div>
                  </div>
                </div>
                {/* <div className="doctor-details">
                                    <div className="doctor-details-left">
                                        <img src={ServicesImg} alt="Services.png" className="img-fluid doctor-details-left-icon" />
                                        <div className="doctor-details-left-title">Services</div>
                                    </div>
                                    <div className="doctor-details-right">
                                        <div className="doctor-details-right-text">
                                            {this.state.docDeatils.physicianServices.map((v, idx) => {
                                                return (<div><span>{v}, </span><br /></div>)
                                            })
                                            }
                                        </div>
                                    </div>
                                </div> */}
                <div className="doctor-details">
                  <div className="doctor-details-left">
                    <img
                      src="assets/images/Group10073.png"
                      alt="Group10073.png"
                      className="img-fluid doctor-details-left-icon"
                    />
                    <div className="doctor-details-left-title">
                      {t("Public.SearchDoctorAppointment.Specializations")}
                    </div>
                  </div>
                  <div className="doctor-details-right">
                    <div className="doctor-details-right-text">
                      {this.state.docDeatils.physicianServices.map((v, idx) => {
                        return (
                          <div>
                            <span>{v}, </span>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="doctor-details">
                  <div className="doctor-details-left">
                    <img
                      src="assets/images/Education.png"
                      alt="Education.png"
                      className="img-fluid doctor-details-left-icon"
                    />
                    <div className="doctor-details-left-title">
                      {t("Public.SearchDoctorAppointment.Education")}
                    </div>
                  </div>
                  <div className="doctor-details-right">
                    <div className="doctor-details-right-text">
                      {this.state.docDeatils.educationModel.map((v, idx) => {
                        return (
                          <div>
                            <span>
                              {v.degreeTitle} - {v.collage}, {v.passingYear}
                            </span>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="doctor-details">
                  <div className="doctor-details-left">
                    <img
                      src="assets/images/Experience.png"
                      alt="Experience.png"
                      className="img-fluid doctor-details-left-icon"
                    />
                    <div className="doctor-details-left-title">
                      {t("Public.SearchDoctorAppointment.Experience")}
                    </div>
                  </div>
                  <div className="doctor-details-right">
                    <div className="doctor-details-right-text">
                      {this.state.docDeatils.experienceModel.map((v, idx) => {
                        return (
                          <div>
                            <span>
                              {v.startDateYear} - {v.endDateYear} -{" "}
                              {v.organizationName}
                            </span>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="doctor-timing-container doctor-timing-container-gray">
                  <div className="doctor-timing-container-title">
                    <h4>
                      {t(
                        "Public.SearchDoctorAppointment.Book_Your_Appointment"
                      )}
                    </h4>
                  </div>
                  <div className="doctor-timing-type-appoitnment">
                    {t("Public.Appointment.ViewAllAvailability")}
                  </div>
                  <div className="web-timing-slider">
                    <div className="doctor-timing-type-radios">
                      <div className="form-check  timing-type-radio">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Clinic"
                          checked={this.state.appoinmentType === "Clinic"}
                          onChange={this.UpdateAppoinmentType.bind(this)}
                        />
                        <label className="form-check-label" for="inlineRadio1">
                          {t("Public.Appointment.InClinic")}
                        </label>
                      </div>
                      <div className="form-check  timing-type-radio">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Video"
                          checked={this.state.appoinmentType === "Video"}
                          onChange={this.UpdateAppoinmentType.bind(this)}
                        />
                        <label className="form-check-label" for="inlineRadio2">
                          {t("Public.Appointment.VideoVisit")}
                        </label>
                      </div>
                      <div className="form-check ">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Chat"
                          checked={this.state.appoinmentType === "Chat"}
                          onChange={this.UpdateAppoinmentType.bind(this)}
                        />
                        <label className="form-check-label" for="inlineRadio2">
                          {t("Public.SearchDoctorAppointment.ChatWithDoctor")}
                        </label>
                      </div>
                    </div>
                    <div className="doctor-timing-type-appoitnment">
                      {t("Public.SearchDoctorAppointment.SelectAvailableTime")}
                    </div>
                    <div className="doctor-timing-slider">
                      {/* {this.state.docDeatils && this.state.docDeatils.availableSlots.length > 0 && */}
                      <CommonCalender
                        key={this.state.docDeatils.availableSlots}
                        CalData={this.state.docDeatils.availableSlots}
                        DocGuid={this.state.docGuid}
                        CallBackAppointmentSave={this.CallBackAppointmentSave.bind(
                          this,
                          this.state.docGuid
                        )}
                      />
                      {/* } */}
                    </div>
                  </div>
                  <div className="check-availability d-flex justify-content-end">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={this.toggleViewAllAvailability.bind(this)}
                    >
                      {t("Public.Appointment.ViewAllAvailability")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {this.state.docDeatils.faQs &&
              this.state.docDeatils.faQs.length > 0 && (
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="doctor-details">
                      <div className="doctor-details-left">
                        <img
                          src="assets/images/FAQs.png"
                          alt="FAQs.png"
                          className="img-fluid doctor-details-left-icon"
                        />
                        <div className="doctor-details-left-title">
                          {t("Public.SearchDoctorAppointment.FAQs")}
                        </div>
                      </div>
                    </div>
                    {this.state.docDeatils.faQs.map((v, idx) => (
                      <div className="doctor-details">
                        <div className="doctor-details-left">
                          <i className="fas fa-circle doctor-details-left-icon"></i>
                          <div className="doctor-details-left-title">
                            {v.question}
                          </div>
                        </div>
                        <div className="doctor-details-right">
                          <div className="doctor-details-right-text">
                            {v.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            <hr />
            {this.state.docDeatils.reviews &&
              this.state.docDeatils.reviews.length > 0 && (
                <div className="row">
                  <div id="doctor-all-reviews">
                    <div className="doctor-details">
                      <div className="doctor-details-left">
                        <img
                          src="assets/images/Patient.png"
                          alt="Patient.png"
                          className="img-fluid doctor-details-left-icon"
                        />
                        <div className="doctor-details-left-title">
                          {t("Public.SearchDoctorAppointment.PatientReview")}
                        </div>
                      </div>
                    </div>
                    {this.state.docDeatils.reviews.map((v, idx) => (
                      <div className="doctor-details">
                        <div className="doctor-details-left">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-circle doctor-details-left-icon"></i>
                            <div className="doctor-details-left-title">
                              {v.patientFirstname} {v.patientLastName}
                            </div>
                          </div>
                        </div>
                        <div className="doctor-details-right">
                          <div className="doctor-details-right-text">
                            <div>
                              <span className="doctor-rating d-flex align-items-center">
                                <ReactStars
                                  classNames="star-img img-fluid"
                                  count={5}
                                  size={20}
                                  value={v.rating}
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
                                  filledIcon={<i className="fa fa-star" />}
                                  color="#fff"
                                  activeColor="#20CAD6"
                                />
                              </span>
                            </div>
                            {v.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
        {this.state.viewAllAvailabilityPopup ? (
          <ViewAllAvailability
            CallBackAppointmentSave={this.CallBackAppointmentSave.bind(
              this,
              this.state.docGuid
            )}
            ViewAvailability={this.toggleViewAllAvailability}
            DocGuid={this.state.docGuid}
          />
        ) : null}
        <LandingPageFooter />
      </div>
    );
  }
}

function mapStoreToprops(state, props) {
  return {
    appoinmentModel: state.ExadoPatient.appoinmentModel,
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
)(withTranslation()(BookAnAppoinmentDoctorView));
