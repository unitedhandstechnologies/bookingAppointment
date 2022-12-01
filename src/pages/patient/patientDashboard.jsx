import React from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import {
  isAppointmentNew,
  localStorageKeys,
  promiseWrapper,
} from "../../utility/common";
import { bindActionCreators } from "redux";
import PatientHeader from "./header2";
import PatientFooter from "./footer";
import PatientLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import moment from "moment";
import ViewAppointment from "./../../commonComponent/AppoitmentCalendar/viewAppointment";
import AppointmentCancelPopup from "./../../commonComponent/AppoitmentCalendar/appointmentCancelPopUp";
import ReactPaginate from "react-paginate";
import { withTranslation } from "react-i18next";
import exadoActions from "../../redux/exado/action";

class PatientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedAppointmentData: false,
      PageSize: 5,
      CurrentPage: 1,
      TotalAppointmentRecords: 0,
      TotalAppointmentPages: 0,
      AppointmentRequestList: [],
      IsCancelPopUp: false,
      viewAppointmentPopup: false,
      appointmentGuid: "",
      timer: null,
    };
  }

  componentDidMount() {
    this.GetAppointmentRequestList();
    this.getUserLanguage();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  GetAppointmentRequestList() {
    let param = {
      pageSize: Number(this.state.PageSize),
      currentPage: Number(this.state.CurrentPage),
      search: "",
      sortExp: "",
      sortDir: "",
      patientGuid: localStorage.getItem("user-id"),
      doctorGuid: null,
      appointmentStatuses: [1, 2],
      appointmentTypes: [1, 2, 3],
      fromDate: null, //new moment().subtract(3, 'months'),
      toDate: null, //new Date()
    };
    promiseWrapper(this.props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      const filterArray = data.patientAppointments.filter((appointment) =>
        isAppointmentNew(appointment.appointmentDateTime)
      );
      this.setState({ AppointmentRequestList: filterArray }, () => {
        this.setState({ TotalAppointmentRecords: filterArray.length });
        this.setState({ TotalAppointmentPages: filterArray.length / 10 });
        this.setState({ LoadedAppointmentData: true });
      });
    });
  }

  toggleViewAppointment = (data) => {
    this.setState({ appointmentGuid: data }, () => {
      this.setState({
        viewAppointmentPopup: !this.state.viewAppointmentPopup,
      });
    });
  };

  handleAppointmentPageClick = (data) => {
    let currentPage = data.selected + 1;
    this.setState({ CurrentPage: currentPage }, () => {
      this.GetAppointmentRequestList();
    });
  };

  IsCancelAppoinment(appId) {
    this.setState({ LoadedAppointmentData: false }, () => {
      this.setState({ appointmentGuid: appId }, () => {
        this.setState({
          IsCancelPopUp: !this.state.IsCancelPopUp,
        });
      });
    });
  }

  ClosePopup() {
    this.setState({ appointmentGuid: "" }, () => {
      this.setState({
        IsCancelPopUp: !this.state.IsCancelPopUp,
      });
      this.GetAppointmentRequestList();
    });
  }

  toggleViewAppointmentAction = (data) => {
    this.setState({ appointmentGuid: "" }, () => {
      this.setState({
        viewAppointmentPopup: !this.state.viewAppointmentPopup,
      });
    });
  };

  getUserLanguage = () => {
    promiseWrapper(this.props.patientactions.getPatientProfileInfo, {
      userGuid: localStorage.getItem(localStorageKeys.userId),
    }).then((data) => {
      if (data.result.languageId) {
        const languageData = JSON.parse(
          localStorage.getItem(localStorageKeys.websiteLanguageData)
        );
        const userLangugae = languageData.find(
          (language) => language.languageId === data.languageId
        );
        console.log(data.languageId, userLangugae);
        console.log("body changes");
        if (userLangugae?.languageId) {
          this.setState({
            timer: setTimeout(
              () =>
                promiseWrapper(this.props.comactions.changeLanguage, {
                  language: userLangugae,
                }),
              500
            ),
          });
        }
      }
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <PatientHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <PatientLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel mainRightPanel-background ">
                <div
                  className="mainRightPanelAlert d-flex align-items-center my-4"
                  role="alert"
                >
                  <div>{t("Patient.Dashboard_Data_Privacy")}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-3 col-md-6 mb-3">
                    <Link to="/patient/myfinance" className="card-links">
                      <div className="card card1 mainRightPanelCard">
                        <div className="p-3">
                          <div className="cardHeader">
                            {t("Patient.Dashboard_My_Finances")}
                          </div>
                          {/* <div className="cardBody">€100.00</div>
                                                    <div className="cardFooter d-flex justify-content-between align-items-end">
                                                        <div className="footerLeft">
                                                            Add Funds
                                                        </div>
                                                        <div className="footerRight">
                                                            <img src="assets/images/Group8566.png" className="img-fluid" alt="Responsive image" />
                                                        </div>
                                                    </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <Link to="/book-an-appoinment" className="card-links">
                      <div className="card card2 mainRightPanelCard">
                        <div className="p-3">
                          <div className="cardHeader">
                            {t("Patient.Dashboard_Consult_Doctor")}
                          </div>
                          {/* <div className="card2Body">Book your appointment with your nearby Expert.</div>
                                                    <div className="cardFooter d-flex justify-content-between align-items-end">
                                                        <div className="footerLeft"></div>
                                                        <div className="footerRight">
                                                            <img src="./asset/images/Group8566.png" className="img-fluid" alt="Responsive image" /></div>
                                                    </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <Link to="/emergency" className="card-links">
                      <div className="card card1 mainRightPanelCard">
                        <div className="p-3">
                          <div className="cardHeader">
                            {t("Patient.Dashboard_Got_Emergency")}
                          </div>
                          {/* <div className="card2Body">Book your appointment with your nearby Expert.</div>
                                                    <div className="cardFooter d-flex justify-content-between align-items-end">
                                                        <div className="footerLeft"></div>
                                                        <div className="footerRight">
                                                            <img src="./asset/images/Group8566.png" className="img-fluid" alt="Responsive image" />
                                                        </div>
                                                    </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <Link to="/chat-with-doctor" className="card-links">
                      <div className="card card1 mainRightPanelCard">
                        <div className="p-3">
                          <div className="cardHeader">
                            {t("Patient.Dashboard_Chat_With_Doctor")}
                          </div>
                          {/* <div className="card2Body">Start Conversation with random doctor.</div>
                                                    <div className="cardFooter d-flex justify-content-between mb-2">
                                                        <div className="footerLeft"></div>
                                                        <div className="footerRight">
                                                            <img src="./asset/images/Group8566.png" className="img-fluid" alt="Responsive image" />
                                                        </div>
                                                    </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="row mt-3 d-flex justify-content-center">
                  <div className="col-md-12 table-min-height">
                    <div className="tableHeading d-flex justify-content-between mb-4">
                      <div className="headingLeft">
                        <div>
                          {t(
                            "Patient.AppointmentUpComing.Upcoming_Requested_Appointments"
                          )}
                        </div>
                      </div>
                      <div className="headingRight">
                        <Link to="/patient/appointment-requests">
                          {t("Patient.AppointmentUpComing.View_All")}
                        </Link>
                      </div>
                    </div>
                    <div className="tableContainer table-responsive">
                      <table className="table table-bordered appointmentTable">
                        <thead>
                          <tr>
                            <th rowspan="2">
                              {t("Patient.AppointmentUpComing.Booking_ID")}
                            </th>
                            <th rowspan="2">
                              {t("Patient.AppointmentUpComing.Doctor_Name")}
                            </th>
                            <th>{t("Patient.AppointmentUpComing.Date")}</th>
                            <th rowspan="2">
                              {t(
                                "Patient.AppointmentUpComing.Medical_Specialty"
                              )}
                            </th>
                            <th rowspan="2">
                              {t(
                                "Patient.AppointmentUpComing.Appointment_Type"
                              )}
                            </th>
                            <th rowspan="2">
                              {t("Patient.AppointmentUpComing.Status")}
                            </th>
                            <th rowspan="2">
                              {t("Patient.AppointmentUpComing.Actions")}
                            </th>
                          </tr>
                          <tr>
                            <th>{t("Patient.AppointmentUpComing.Time")}</th>
                          </tr>
                        </thead>
                        {this.state && this.state.LoadedAppointmentData && (
                          <tbody>
                            {this.state.AppointmentRequestList.length > 0 ? (
                              this.state.AppointmentRequestList.map(
                                (v, idx) => (
                                  <tr key={idx}>
                                    <td rowSpan>{v.bookingId}</td>
                                    <td>
                                      <Link
                                        className="doctor-name-link"
                                        to={`/doctor/book-an-appoinment-doc-detail/${v.doctorGuid}`}
                                      >
                                        {v.doctorFirstName} {v.doctorLastName}
                                      </Link>
                                    </td>
                                    <td className="dateTime">
                                      {moment(v.appointmentDateTime).format(
                                        "MM/DD/YYYY"
                                      )}
                                      <br />
                                      {moment(v.appointmentDateTime).format(
                                        "HH:mm"
                                      )}
                                    </td>
                                    <td className="medicalSpecialty">
                                      {v.physicianServices}
                                    </td>
                                    <td className="type">
                                      {v.appointmentType}
                                    </td>
                                    <td className="status">
                                      {v.appointmentStatus}
                                    </td>
                                    <td
                                      className="action"
                                      style={{ width: "240px" }}
                                    >
                                      <div className="d-flex justify-content-end">
                                        <a
                                          className="btn viewDetails"
                                          onClick={this.toggleViewAppointment.bind(
                                            this,
                                            v.appointmentGuid
                                          )}
                                          role="button"
                                        >
                                          {t(
                                            "Patient.AppointmentUpComing.View"
                                          )}
                                        </a>
                                        {/* <a className="btn joinCall mx-3" role="button">Join Call</a> */}
                                        <button
                                          type="button"
                                          onClick={this.IsCancelAppoinment.bind(
                                            this,
                                            v.appointmentGuid
                                          )}
                                          className="btn btn-outline-dark cancel"
                                        >
                                          {t(
                                            "Patient.AppointmentUpComing.Cancel"
                                          )}
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )
                            ) : (
                              <tr>
                                <td colSpan={7} className="empty-list">
                                  {t(
                                    "EmptyListMessages.upcoming_requested_list"
                                  )}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                      {this.state.viewAppointmentPopup ? (
                        <ViewAppointment
                          ViewAppointmentAction={
                            this.toggleViewAppointmentAction
                          }
                          AppointmentGuid={this.state.appointmentGuid}
                        />
                      ) : null}
                      {this.state.IsCancelPopUp ? (
                        <AppointmentCancelPopup
                          ClosePopup={this.ClosePopup.bind(this)}
                          AppointmentGuid={this.state.appointmentGuid}
                        />
                      ) : null}
                      {this.state.AppointmentRequestList.length > 0 && (
                        <div className="my-4 d-flex justify-content-center">
                          <ReactPaginate
                            previousClassName={"arrow"}
                            nextClassName={"arrow"}
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            breakLabel={"..."}
                            pageLinkClassName={"pages"}
                            pageCount={this.state.TotalAppointmentPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handleAppointmentPageClick}
                            containerClassName={"pagination"}
                            activeLinkClassName={"active"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <PatientFooter />
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
  const comactions = bindActionCreators(exadoActions, dispatch);
  return { docactions, patientactions, comactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(PatientDashboard));
