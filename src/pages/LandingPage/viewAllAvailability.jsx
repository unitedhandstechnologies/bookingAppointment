import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactStars from "react-rating-stars-component";
import {
  promiseWrapper,
  getMonthNameByDate,
  getDayNameByDate,
} from "../../utility/common";
// import VideochatImg from './../../assets/images/videochat.png';
import moment from "moment";
import { withTranslation, Trans } from "react-i18next";

class ViewAllAvailability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docGuid: this.props.DocGuid,
      //CalendarData: [],
      CalanderDisplayData: [],
      bookAppoinment: this.props.appoinmentModel.appointmentType,
      anAppoinmentModel: {
        appDate: new Date().toISOString().split("T")[0],
        location: "",
        physicianService: [],
        isMale: 0,
        languageId: [],
        appointmentType: this.props.appoinmentModel.appointmentType,
      },
      docDeatils: {
        doctorGuid: "",
        doctorImage: "",
        firstName: "",
        lastName: "",
        physicianServices: [],
        totalReview: 0,
        averageReview: 0,
        experience: 0,
        availableSlots: [],
      },
    };
  }

  CallBackAppointmentSave(timesloat) {
    if (
      localStorage.getItem("user-id") === null ||
      localStorage.getItem("user-id") === undefined
    ) {
      //alert({t.Public.ViewAllAvailability.LoginMessage});
      alert("Login first to book an appointment");
      return;
    }
    this.props.CallBackAppointmentSave(timesloat);
  }

  handleViewAllAvailabilityPopupClick = () => {
    this.props.ViewAvailability("");
  };

  CalendarClick(mov) {
    let appdate = "";
    if (mov === 1) {
      appdate = moment(this.state.CalanderDisplayData[0].currentDate)
        .subtract(7, "days")
        .format("YYYY-MM-DD");
    } else {
      appdate = moment(this.state.CalanderDisplayData[6].currentDate)
        .add(1, "days")
        .format("YYYY-MM-DD");
    }

    this.setState(
      (prevState) => ({
        anAppoinmentModel: { ...prevState.anAppoinmentModel, appdate },
      }),
      () => {
        promiseWrapper(this.props.patientactions.fetchNextAppointments, {
          appointmentModel: this.state.anAppoinmentModel,
          doctorGuid: this.props.DocGuid,
          isViewAllAvailability: true,
        }).then((jsdata) => {
          this.setState({ CalanderDisplayData: jsdata });
        });
      }
    );
  }

  componentDidMount() {
    promiseWrapper(this.props.patientactions.viewAllAvailability, {
      appointmentModel: this.props.appoinmentModel,
      doctorGuid: this.props.DocGuid,
    }).then((jsdata) => {
      this.setState({ docDeatils: jsdata });
      this.setState({
        CalanderDisplayData: this.state.docDeatils.availableSlots,
      });
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal doctor-modal"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close model-close-btn"
                onClick={this.handleViewAllAvailabilityPopupClick}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body doctor-modal-body">
              <div className="dotor-item-container">
                <div className="doctor-item-left">
                  <img
                    src={this.state.docDeatils.doctorImage}
                    alt=""
                    className="img-fluid top-doctor-image"
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
                      return <span key={idx}>{v}</span>;
                    })}
                  </span>
                  <div>
                    <span className="doctor-rating">
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
                      {t("Public.Appointment.Years")}
                    </span>
                    <span className="doctor-exp">
                      {" "}
                      {t("Public.Appointment.OfExperience")}{" "}
                    </span>
                  </div>
                  <div className="doctor-visit">
                    <div className="doctor-visit-container">
                      <div className="visit-pills">
                        {this.props.appoinmentModel.appointmentType === 1 ? (
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
                          <span>{t("Chat_with_Doctor")}</span>
                        ) : (
                          <span>{t("Public.Appointment.InClinic")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="doctor-timing-container">
                <div className="doctor-timing-type-appoitnment">
                  {t("Public.SearchDoctorAppointment.SelectAvailableTime")}
                </div>
              </div>
              {this.state.CalanderDisplayData &&
                this.state.CalanderDisplayData.length > 0 && (
                  <div className="doctor-timing-modal-container">
                    <div className="doctor-timing-btn-container">
                      <div className="timing-date-container">
                        {/* <div className="date-pill py-1 rounded me-5">
                                                <i className="fas fa-calendar-alt px-1"></i><span className="px-2">{t('Public.ViewAllAvailability.date')}</span>
                                            </div> */}
                        <div className="d-flex align-items-center">
                          <button
                            disabled={
                              new Date(
                                this.state.CalanderDisplayData[0].currentDate
                              ).getTime() <
                              new Date().getTime() + 24 * 60 * 60 * 1000
                            }
                            onClick={this.CalendarClick.bind(this, 1)}
                            className="mx-2 calender-icon"
                          >
                            <i className="fas fa-chevron-left"></i>
                          </button>
                        </div>
                        <div className="timing-date">
                          <span className="px-2">
                            {getMonthNameByDate(
                              new Date(
                                this.state.CalanderDisplayData[0].currentDate
                              )
                            )}{" "}
                            {new Date(
                              this.state.CalanderDisplayData[0].currentDate
                            ).getDate()}
                          </span>
                          <br />
                          <span>
                            {
                              getDayNameByDate(
                                new Date(
                                  this.state.CalanderDisplayData[0].currentDate
                                )
                              ).sortName
                            }
                          </span>
                        </div>
                        <span className="my-auto">-</span>
                        <div className="timing-date">
                          <span className="px-2">
                            {getMonthNameByDate(
                              new Date(
                                this.state.CalanderDisplayData[6].currentDate
                              )
                            )}{" "}
                            {new Date(
                              this.state.CalanderDisplayData[6].currentDate
                            ).getDate()}
                          </span>
                          <br />
                          <span>
                            {
                              getDayNameByDate(
                                new Date(
                                  this.state.CalanderDisplayData[6].currentDate
                                )
                              ).sortName
                            }
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <button
                            onClick={this.CalendarClick.bind(this, 2)}
                            className="mx-2 calender-icon"
                          >
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.state.CalanderDisplayData.map((v, idx) => (
                      <div className="mobile-timing" key={idx}>
                        <span className="mobile-timing-date">
                          {getMonthNameByDate(new Date(v.currentDate))}{" "}
                          {new Date(v.currentDate).getDate()}{" "}
                          {getDayNameByDate(new Date(v.currentDate)).sortName}
                        </span>
                        <div className="doctor-timing-btn-container">
                          {v.availableTime.map((d, idx) => (
                            <div className="timing-btn" key={idx}>
                              <button
                                className="calender-timing-btn"
                                disabled={
                                  new Date(d).getTime() < new Date().getTime()
                                }
                                onClick={this.CallBackAppointmentSave.bind(
                                  this,
                                  d
                                )}
                              >
                                {moment(d).format("hh:mm A")}
                              </button>
                            </div>
                          ))}
                          {v.availableTime.length === 0 && (
                            <div
                              className="timing-btn"
                              style={{
                                backgroundColor: "#FFF",
                                color: "#000",
                                padding: "2px 20px",
                                fontSize: "14px",
                              }}
                            >
                              {t("Public.ViewAllAvailability.NoTimeAvailable")}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
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
)(withTranslation()(ViewAllAvailability));
