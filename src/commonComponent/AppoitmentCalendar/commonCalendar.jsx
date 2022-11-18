import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import {
  promiseWrapper,
  getMonthNameByDate,
  getDayNameByDate,
} from "../../utility/common";
import { Link } from "react-router-dom";

class CommonCalender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DocGuid: this.props.DocGuid,
      CalendarData: [],
      CalanderDisplayData: [],
      anAppoinmentModel: {
        appDate: this.props.appoinmentModel.appDate,
        location: this.props.appoinmentModel.location,
        physicianService: this.props.appoinmentModel.physicianService,
        isMale: this.props.appoinmentModel.isMale,
        languageId: this.props.appoinmentModel.languageId,
        appointmentType: this.props.appoinmentModel.appointmentType,
      },
      showLoginModal: false,
    };
  }

  componentDidMount() {
    this.setState({ CalanderDisplayData: this.props.CalData });
  }

  componentDidUpdate() {
    if (
      this.state.anAppoinmentModel.appointmentType !==
      this.props.appoinmentModel.appointmentType
    ) {
      // console.log(this.props.appoinmentModel);
      this.setState(
        {
          anAppoinmentModel: {
            ...this.state.anAppoinmentModel,
            appointmentType: this.props.appoinmentModel.appointmentType,
          },
        },
        () => this.CallFetchNextAppointments()
      );
    }
  }

  CalendarClick(mov) {
    let appdate = "";
    if (mov === 1) {
      appdate = moment(this.state.CalanderDisplayData[0].currentDate)
        .subtract(5, "days")
        .format("YYYY-MM-DD");
    } else {
      appdate = moment(this.state.CalanderDisplayData[4].currentDate)
        .add(1, "days")
        .format("YYYY-MM-DD");
    }
    this.setState(
      (prevState) => ({
        anAppoinmentModel: { ...prevState.anAppoinmentModel, appdate },
      }),
      () => {
        this.CallFetchNextAppointments();
      }
    );
  }

  CallFetchNextAppointments = () => {
    promiseWrapper(this.props.patientactions.fetchNextAppointments, {
      appointmentModel: this.state.anAppoinmentModel,
      doctorGuid: this.props.DocGuid,
      isViewAllAvailability: false,
    }).then((jsdata) => {
      // let temp = this.state.CalendarData;
      // jsdata.map((v, idx) => {
      //     temp.push(v);
      // });
      // this.setState({ CalendarData: temp }, () => {
      this.setState({ CalanderDisplayData: jsdata });
      // });
    });
  };

  CallBackAppointmentSave(timesloat) {
    if (
      localStorage.getItem("user-id") === null ||
      localStorage.getItem("user-id") === undefined
    ) {
      // alert("Login first to book an ");
      this.setState({ showLoginModal: true });
      return;
    }
    this.props.CallBackAppointmentSave(timesloat);
  }

  render() {
    return (
      <>
        {this.state.showLoginModal && (
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
                        <p>Login</p>
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
                        You Need To Login Before Booking An Appointment
                      </span>
                      <br />
                    </div>
                    <div className="mt-3 text-center">
                      <Link
                        className="btn MyButton reset-password-button w-50"
                        to="/login"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="web-timing-slider">
          <div className="web-timing-container">
            <div className="web-timing-box">
              <div className="doctor-timing-date">
                <div className="row">
                  <div className="col-md-1 col-1 text-center d-flex justify-content-end">
                    {this.state.CalanderDisplayData.length > 0 && (
                      <button
                        className="calender-icon"
                        disabled={
                          new Date(
                            this.state.CalanderDisplayData[0].currentDate
                          ).getTime() <
                          new Date().getTime() + 24 * 60 * 60 * 1000
                        }
                        onClick={this.CalendarClick.bind(this, 1)}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                    )}
                    <br />
                  </div>
                  {this.state.CalanderDisplayData.map((v, idx) => (
                    <div className="col-md-2 col-2 text-center" key={idx}>
                      <div className="date-align">
                        <span>
                          {getMonthNameByDate(new Date(v.currentDate))}{" "}
                          {new Date(v.currentDate).getDate()}
                        </span>
                        <br />
                        <span>
                          {getDayNameByDate(new Date(v.currentDate)).sortName}
                        </span>
                      </div>
                      {v.availableTime.map((d, idx) => (
                        <div className="timing-btn" key={idx}>
                          {d !== "0001-01-01T00:00:00" && (
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
                          )}
                          {d === "0001-01-01T00:00:00" && <a>---</a>}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="col-md-1 col-1 text-center d-flex justify-content-end">
                    <button
                      className="calender-icon"
                      onClick={this.CalendarClick.bind(this, 2)}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStoreToprops, mapDispatchToProps)(CommonCalender);
