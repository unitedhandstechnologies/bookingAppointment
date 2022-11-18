import React from "react";
import {
  isAppointmentNew,
  localStorageKeys,
  promiseWrapper,
} from "../../utility/common";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DoctorHeader from "./docHeader";
import DoctorFooter from "./docFooter";
import DoctorLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import ViewAppointment from "./../../commonComponent/AppoitmentCalendar/viewAppointment";
import AppointmentAcceptPopup from "./../../commonComponent/AppoitmentCalendar/appointmentAcceptPopUp";
import AppointmentRejectPopup from "./../../commonComponent/AppoitmentCalendar/appointmentRejectPopUp";
import AppointmentCancelPopup from "./../../commonComponent/AppoitmentCalendar/appointmentCancelPopUp";
import AppointmentRejectConfirm from "./../../commonComponent/AppoitmentCalendar/appointmentRejectConfirmPopUp";
import { withTranslation } from "react-i18next";
import exadoActions from "../../redux/exado/action";

class DoctorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      redirect: null,
      AppointmentRequestList: [],
      IsAcceeptPopUp: false,
      IsRejectPopUp: false,
      IsCancelPopUp: false,
      viewAppointmentPopup: false,
      appointmentGuid: "",
      viewRejectConfirmPopup: false,
      MakeCompletePopUp: false,
      appointmentRequestList: [],
      appointmentUpcomingList: [],
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
      pageSize: 10,
      currentPage: 1,
      search: "",
      sortExp: "",
      sortDir: "",
      patientGuid: null,
      doctorGuid: localStorage.getItem("user-id"),
      appointmentStatuses: [1, 2],
      appointmentTypes: [1, 2, 3],
      fromDate: null, //new moment().subtract(3, 'months'),
      toDate: null, //new Date(),
    };
    promiseWrapper(this.props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      const requestList = data.patientAppointments.filter(
        (appointmentData) =>
          appointmentData.appointmentStatus === "Requested" &&
          isAppointmentNew(appointmentData.appointmentDateTime)
      );
      const upcomingList = data.patientAppointments.filter(
        (appointmentData) =>
          appointmentData.appointmentStatus === "Approved" &&
          isAppointmentNew(appointmentData.appointmentDateTime, 2)
      );
      this.setState(
        {
          AppointmentRequestList: data.patientAppointments,
          appointmentRequestList: requestList,
          appointmentUpcomingList: upcomingList,
        },
        () => {
          this.setState({ LoadedData: true });
        }
      );
    });
  }

  IsAcceeptAppoinment(appId) {
    promiseWrapper(this.props.patientactions.changeAppointmentStatus, {
      appointmentGuid: appId,
      isConfirm: true,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        this.setState({ IsAcceeptPopUp: true });
        this.GetAppointmentRequestList();
      } else {
        toast.error(data.data.errorMessage);
      }
    });
  }

  IsRejectConfirmReturn(appId, action) {
    if (action === 1) {
      promiseWrapper(this.props.patientactions.changeAppointmentStatus, {
        appointmentGuid: appId,
        isConfirm: false,
      }).then((data) => {
        if (data.data.isSuccess == true) {
          this.setState({ viewRejectConfirmPopup: false });
          this.setState({ IsRejectPopUp: true });
          this.setState({
            viewAppointmentPopup: !this.state.viewAppointmentPopup,
          });
          this.GetAppointmentRequestList();
        } else {
          toast.error(data.data.errorMessage);
        }
      });
    } else {
      this.setState({ viewRejectConfirmPopup: false });
    }
  }

  IsRejectAppoinment(appId) {
    this.setState({ appointmentGuid: appId }, () => {
      this.setState({
        viewRejectConfirmPopup: !this.state.viewRejectConfirmPopup,
      });
    });
  }

  CloseAcceeptPopup() {
    this.setState({ IsAcceeptPopUp: false });
  }

  CloseRejectPopup() {
    this.setState({ IsRejectPopUp: false });
  }

  IsCancelAppoinment(appId) {
    this.setState({ appointmentGuid: appId }, () => {
      this.setState({
        IsCancelPopUp: !this.state.IsCancelPopUp,
      });
    });
  }

  CloseCancelPopup() {
    this.setState({ appointmentGuid: "" }, () => {
      this.setState({
        IsCancelPopUp: !this.state.IsCancelPopUp,
      });
      this.GetAppointmentRequestList();
    });
  }

  toggleViewAppointment = (data) => {
    this.setState({ appointmentGuid: data }, () => {
      this.setState({
        viewAppointmentPopup: !this.state.viewAppointmentPopup,
      });
    });
  };

  toggleViewAppointmentAction = (data) => {
    if (data === true) {
      this.IsAcceeptAppoinment(this.state.appointmentGuid);
      this.setState({
        viewAppointmentPopup: !this.state.viewAppointmentPopup,
      });
    }
    if (data === false) {
      this.IsRejectAppoinment(this.state.appointmentGuid);
    }
    if (data === "") {
      this.setState({ appointmentGuid: "" }, () => {
        this.setState({
          viewAppointmentPopup: !this.state.viewAppointmentPopup,
        });
      });
    }
  };

  MakeCompletePopUpClick(appointmentId) {
    this.setState({ appointmentGuid: appointmentId }, () => {
      this.setState({ MakeCompletePopUp: !this.state.MakeCompletePopUp });
    });
  }

  MarkAppointmentAsComplete() {
    promiseWrapper(this.props.docactions.markAppointmentAsComplete, {
      appointmentGuid: this.state.appointmentGuid,
    }).then((data) => {
      if (data.isSuccess == true) {
        this.setState({ appointmentGuid: "" }, () => {
          this.setState({ MakeCompletePopUp: !this.state.MakeCompletePopUp });
        });
        this.GetAppointmentRequestList();
      } else {
        toast.error(data.data.errorMessage);
      }
    });
  }

  MarkAppointmentAsCompleteWithDiagnostic() {
    promiseWrapper(this.props.docactions.markAppointmentAsComplete, {
      appointmentGuid: this.state.appointmentGuid,
    }).then((data) => {
      if (data.isSuccess == true) {
        let appId = this.state.appointmentGuid;
        this.setState({ appointmentGuid: "" }, () => {
          this.setState({ MakeCompletePopUp: !this.state.MakeCompletePopUp });
          this.setState({ redirect: "/save-diagnostic/" + appId });
        });
      } else {
        toast.error(data.data.errorMessage);
      }
    });
  }

  isAppointmentTime = (id, appoinmentTime, appointmentGuid) => {
    const currentTime = new Date().getTime();
    const appTime = new Date(appoinmentTime).getTime() - 1000 * 60 * 60 * 4;
    if (currentTime < appTime) {
      toast.warning("Appointment time is not arrived");
    } else {
      toast.success("Video Call Initiated");
      this.props.history.push(`/video-call/${appointmentGuid}`);
    }
    console.log(this.props);
  };

  getUserLanguage = () => {
    promiseWrapper(this.props.docactions.getProfileInfo, {
      userGuid: localStorage.getItem(localStorageKeys.userId),
    }).then((data) => {
      if (data.languageId) {
        const languageData = JSON.parse(
          localStorage.getItem(localStorageKeys.websiteLanguageData)
        );
        const userLangugae = languageData.find(
          (language) => language.languageId === data.languageId
        );
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
    const { appointmentRequestList, appointmentUpcomingList } = this.state;
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
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div className="row">
                  <div className="col-md-3 col-6 my-3">
                    <div className="card doctor-card">
                      <div className="doctor-card-title pt-3">
                        {t("Doctor.MyDashboard.Total_Earning")}
                      </div>
                      <div className="doctor-card-text pb-3">
                        {t("Doctor.MyDashboard.€_1500")}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 my-3">
                    <div className="card doctor-card">
                      <div className="doctor-card-title pt-3">
                        {t("Doctor.MyDashboard.Total_Appointment")}
                      </div>
                      <div className="doctor-card-text pb-3">
                        {t("Doctor.MyDashboard.M_1560")}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 my-3">
                    <div className="card doctor-card">
                      <div className="doctor-card-title pt-3">
                        {t("Doctor.MyDashboard.Total_Patients")}
                      </div>
                      <div className="doctor-card-text pb-3">
                        {t("Doctor.MyDashboard.M_163")}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 my-3">
                    <div className="card doctor-card">
                      <div className="doctor-card-title pt-3">
                        {t("Doctor.MyDashboard.Total_Consultancy_Hours")}
                      </div>
                      <div className="doctor-card-text pb-3">
                        {t("Doctor.MyDashboard.M_102")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center pt-5 bg-white">
                  <div className="col-lg-6 col-md-12">
                    {this.state && this.state.LoadedData && (
                      <div className="card doctor-table-card mb-3">
                        <div className="doctor-table-card-title mb-3 py-4 px-3 d-flex justify-content-between">
                          <div>
                            {t("Doctor.MyDashboard.Appointment_Requests")}
                          </div>
                          <div className="doctor-table-card-title-link">
                            <Link
                              className="text-light"
                              to="/doctor-appointment-requests"
                            >
                              {t("Doctor.MyDashboard.View_All")}
                            </Link>
                          </div>
                        </div>
                        {appointmentRequestList.length ? (
                          appointmentRequestList.map((v, idx) => (
                            <div
                              className="doctor-table-card-body mx-3"
                              key={idx}
                            >
                              <div className="row mb-2">
                                <div className="col-md-4">
                                  <div className="mb-2">
                                    <span className="doctorName">
                                      <Link
                                        className="doctorName"
                                        to={
                                          "/patient-detail-view/" +
                                          v.patientGuid
                                        }
                                      >
                                        {v.patientFirstName} {v.patientLastName}
                                      </Link>
                                    </span>
                                    |
                                    <span className="medicalSpecialty">
                                      {" "}
                                      {v.appointmentType}
                                    </span>
                                  </div>
                                  <div>{v.physicianServices}</div>
                                </div>
                                <div className="col-md-8 doctor-table-card-body-right">
                                  <div>
                                    <div className="dateTime mb-2 w-100">
                                      {moment(v.appointmentDateTime).format(
                                        "MM/DD/YYYY"
                                      )}{" "}
                                      {moment(v.appointmentDateTime).format(
                                        "HH:mm"
                                      )}
                                    </div>
                                    <div className="action">
                                      <div className="d-flex justify-content-end">
                                        <a
                                          className="btn viewDetails doctor-viewDetails"
                                          onClick={this.toggleViewAppointment.bind(
                                            this,
                                            v.appointmentGuid
                                          )}
                                          role="button"
                                        >
                                          {t("Doctor.MyDashboard.View_Details")}
                                        </a>
                                        <a
                                          className="btn joinCall mr-2"
                                          onClick={this.IsAcceeptAppoinment.bind(
                                            this,
                                            v.appointmentGuid
                                          )}
                                          role="button"
                                        >
                                          {t("Doctor.MyDashboard.Accept")}
                                        </a>
                                        <button
                                          type="button"
                                          onClick={this.IsRejectAppoinment.bind(
                                            this,
                                            v.appointmentGuid
                                          )}
                                          className="btn btn-outline-dark cancel"
                                        >
                                          {t("Doctor.MyDashboard.Reject")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center px-2 empty-list">
                            {t("EmptyListMessages.appointments_request")}
                          </div>
                        )}
                      </div>
                    )}
                    {this.state.viewAppointmentPopup ? (
                      <ViewAppointment
                        ViewAppointmentAction={this.toggleViewAppointmentAction}
                        AppointmentGuid={this.state.appointmentGuid}
                      />
                    ) : null}
                    {this.state.IsAcceeptPopUp === true && (
                      <AppointmentAcceptPopup
                        ClosePopup={this.CloseAcceeptPopup.bind(this)}
                      />
                    )}

                    {this.state.IsRejectPopUp === true && (
                      <AppointmentRejectPopup
                        ClosePopup={this.CloseRejectPopup.bind(this)}
                      />
                    )}
                    {this.state.viewRejectConfirmPopup === true && (
                      <AppointmentRejectConfirm
                        AppointmentGuid={this.state.appointmentGuid}
                        ClosePopup={this.IsRejectConfirmReturn.bind(this)}
                      />
                    )}

                    {this.state.MakeCompletePopUp === true && (
                      <div
                        className="modal accept-appointment-actions"
                        style={{ display: "block" }}
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-body">
                              <div className="divForm my-4">
                                <div className="d-flex flex-column text-center">
                                  <div className="patient-forget-password-text">
                                    <span>
                                      {t(
                                        "Doctor.MyDashboard.Are_you_sure_you_want_to_mark_this"
                                      )}
                                    </span>
                                    <br />
                                    <span>
                                      {t(
                                        "Doctor.MyDashboard.appointment_as_complete?"
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-3 text-center">
                                  <a
                                    className="btn MyButton reset-password-button w-75 py-2"
                                    onClick={this.MarkAppointmentAsCompleteWithDiagnostic.bind(
                                      this,
                                      ""
                                    )}
                                  >
                                    {t(
                                      "Doctor.MyDashboard.Yes,_Upload_diagnostic_report"
                                    )}
                                  </a>
                                </div>
                                <div className="mt-3 text-center">
                                  <a
                                    className="btn MyButton reset-password-button w-75 py-2"
                                    onClick={this.MarkAppointmentAsComplete.bind(
                                      this,
                                      ""
                                    )}
                                  >
                                    {t(
                                      "Doctor.MyDashboard.Yes,_dont_Upload_documents"
                                    )}
                                  </a>
                                </div>
                                <div className="mt-3 text-center">
                                  <button
                                    type="button"
                                    onClick={this.MakeCompletePopUpClick.bind(
                                      this,
                                      ""
                                    )}
                                    className="btn pending-feedback-cancel w-75 py-2"
                                  >
                                    {t("Doctor.MyDashboard.No")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {this.state.IsCancelPopUp ? (
                    <AppointmentCancelPopup
                      ClosePopup={this.CloseCancelPopup.bind(this)}
                      AppointmentGuid={this.state.appointmentGuid}
                    />
                  ) : null}
                  <div className="col-lg-6 col-md-12">
                    {this.state && this.state.LoadedData && (
                      <div className="card doctor-table-card mb-3">
                        <div className="doctor-table-card-title mb-3 py-4 px-3 d-flex justify-content-between">
                          <div>
                            {t("Doctor.MyDashboard.Upcoming_Appointment")}
                          </div>
                          <div className="doctor-table-card-title-link">
                            <Link
                              className="text-light"
                              to="/doctor-appointment-upcoming"
                            >
                              {t("Doctor.MyDashboard.View_All")}
                            </Link>
                          </div>
                        </div>
                        {appointmentUpcomingList.length > 0 ? (
                          appointmentUpcomingList.map((v, idx) => (
                            <div className="doctor-table-card-body mx-3">
                              <div className="row mb-2">
                                <div className="col-md-4">
                                  <div className="mb-2">
                                    <Link
                                      className="doctorName"
                                      to={
                                        "/patient-detail-view/" + v.patientGuid
                                      }
                                    >
                                      {v.patientFirstName} {v.patientLastName}
                                    </Link>
                                    |
                                    <span className="medicalSpecialty">
                                      {" "}
                                      {v.appointmentType}
                                    </span>
                                  </div>
                                  <div>{v.physicianServices}</div>
                                </div>
                                <div className="col-md-8 doctor-table-card-body-right">
                                  <div>
                                    <div className="dateTime mb-2 w-100">
                                      {moment(v.appointmentDateTime).format(
                                        "MM/DD/YYYY"
                                      )}{" "}
                                      {moment(v.appointmentDateTime).format(
                                        "HH:mm"
                                      )}
                                    </div>
                                    <div className="action">
                                      <div className="d-flex justify-content-end">
                                        <a
                                          className="btn viewDetails doctor-viewDetails"
                                          onClick={this.toggleViewAppointment.bind(
                                            this,
                                            v.appointmentGuid
                                          )}
                                          role="button"
                                        >
                                          {t("Doctor.MyDashboard.View_Details")}
                                        </a>
                                        <div className="dropdown">
                                          <button
                                            className="btn btn-outline-dark dropdown-toggle cancel"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                          >
                                            {t("Doctor.MyDashboard.Actions")}
                                          </button>
                                          <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton"
                                          >
                                            <button
                                              className="dropdown-item"
                                              onClick={() =>
                                                this.isAppointmentTime(
                                                  idx,
                                                  v.appointmentDateTime,
                                                  v.appointmentGuid
                                                )
                                              }
                                            >
                                              {t(
                                                "Doctor.AppointmentUpComing.Take_Call"
                                              )}
                                            </button>
                                            <a
                                              className="dropdown-item dropdown-action"
                                              onClick={this.MakeCompletePopUpClick.bind(
                                                this,
                                                v.appointmentGuid
                                              )}
                                            >
                                              {t(
                                                "Doctor.MyDashboard.Mark_as_complete"
                                              )}
                                            </a>
                                            <a
                                              className="dropdown-item dropdown-action"
                                              onClick={this.IsCancelAppoinment.bind(
                                                this,
                                                v.appointmentGuid
                                              )}
                                            >
                                              {t("Doctor.MyDashboard.Cancel")}
                                            </a>
                                          </div>
                                        </div>

                                        {/* <button type="button" onClick={this.IsCancelAppoinment.bind(this, v.appointmentGuid)} className="btn btn-outline-dark cancel">Cancel</button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center px-2 empty-list">
                            {t("EmptyListMessages.upcoming_appointments")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="row pt-5 d-flex justify-content-center bg-white">
                  <div className="col-lg-6 col-md-12">
                    <div className="card doctor-table-card">
                      <div className="doctor-table-card-title  mb-3 py-4 px-3 d-flex justify-content-between">
                        <div>{t('Doctor.MyDashboard.Emergency_Consultations')}</div>
                        <div className="doctor-table-card-title-link"><a className="text-light">
                          {t('Doctor.MyDashboard.View_All')}</a></div>
                      </div>
                      <div className="doctor-table-card-body mx-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span> Dentist</span>
                            </div>
                            <div className="doctor-timer">
                              <span>01:32 Left</span>
                            </div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">{t('Doctor.MyDashboard.View_Details')}</a>
                                  <a className="btn joinCall mr-2" role="button">{t('Doctor.MyDashboard.Take_Call')}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span> Dentist</span>
                            </div>
                            <div className="doctor-timer">
                              <span>06:59 Left</span>
                            </div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">View Details</a>
                                  <a className="btn joinCall mr-2" role="button">Take Call</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span> Dentist</span>
                            </div>
                            <div className="doctor-timer">
                              <span>06:59 Left</span>
                            </div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">View Details</a>
                                  <a className="btn joinCall mr-2" role="button">Take Call</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span> Dentist</span>
                            </div>
                            <div className="doctor-timer">
                              <span>06:59 Left</span>
                            </div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">View Details</a>
                                  <a className="btn joinCall mr-2" role="button">Take Call</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span>John Doe</span>  |<span className="medicalSpecialty"> In Progress</span>
                            </div>
                            <div>Dentist</div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn doctor-viewDetails doctor-viewDetails-disable" role="button">View Details</a>
                                  <a className="btn mr-2 doctor-joinCall-disable" role="button">Take Call</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="card doctor-table-card">
                      <div className="doctor-table-card-title mb-3 py-4 px-3 d-flex justify-content-between">
                        <div>{t('Doctor.MyDashboard.Open_Chat_Consultations')}</div>
                        <div className="doctor-table-card-title-link"><a className="text-light">{t('Doctor.MyDashboard.View_All')}</a></div>
                      </div>
                      <div className="doctor-table-card-body mx-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span className="medicalSpecialty">  Dentist</span>
                            </div>
                            <div className="description">Lorem Ipsum is simply dummy...</div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">{t('Doctor.MyDashboard.View_Details')}</a>
                                  <a className="btn startChat mr-2" role="button">{t('Doctor.MyDashboard.Start_Chat')}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span className="medicalSpecialty">  Dentist</span>
                            </div>
                            <div className="description">Lorem Ipsum is simply dummy...</div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">View Details</a>
                                  <a className="btn startChat mr-2" role="button">Start Chat</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span className="medicalSpecialty">  Dentist</span>
                            </div>
                            <div className="description">Lorem Ipsum is simply dummy...</div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">View Details</a>
                                  <a className="btn startChat mr-2" role="button">Start Chat</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span className="doctorName">John Doe</span>  |<span className="medicalSpecialty">  Dentist</span>
                            </div>
                            <div className="description">Lorem Ipsum is simply dummy...</div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn viewDetails doctor-viewDetails" role="button">View Details</a>
                                  <a className="btn startChat mr-2" role="button">Start Chat</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="doctor-table-card-body mx-3 mt-3">
                        <div className="row mb-2">
                          <div className="col-md-4">
                            <div className="mb-2">
                              <span>John Doe</span>  |<span>  Dentist</span>
                            </div>
                            <div className="description">Lorem Ipsum is simply dummy...</div>
                          </div>
                          <div className="col-md-8 doctor-table-card-body-right">
                            <div>
                              <div className="dateTime mb-2 w-100">April 21, 2020 07:01 AM</div>
                              <div className="action">
                                <div className="d-flex justify-content-end">
                                  <a className="btn doctor-viewDetails doctor-viewDetails-disable" role="button">View Details</a>
                                  <a className="btn startChat mr-2 doctor-joinCall-disable" role="button">Start Chat</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row py-5 bg-light">
                    <div className="col-lg-4 col-md-6 mt-2 ">
                      <div className="card-deck chart">
                        <div className="card chart-container">
                          <div className="card-body">
                            <h5 className="card-title chart-title">{t('Doctor.MyDashboard.Total_Earning')}</h5>
                            <div className="chart-image"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-2 ">
                      <div className="card-deck chart">
                        <div className="card chart-container">
                          <div className="card-body">
                            <h5 className="card-title chart-title">{t('Doctor.MyDashboard.Total_Pending_Amount')}</h5>
                            <div className="chart-image"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-2 ">
                      <div className="card-deck chart">
                        <div className="card chart-container">
                          <div className="card-body">
                            <h5 className="card-title chart-title">{t('Doctor.MyDashboard.Total_Refunded')}</h5>
                            <div className="chart-image"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-2 ">
                      <div className="card-deck chart">
                        <div className="card chart-container">
                          <div className="card-body">
                            <h5 className="card-title chart-title">{t('Doctor.MyDashboard.Total_Appointments')}</h5>
                            <div className="chart-image"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-2 ">
                      <div className="card-deck chart">
                        <div className="card chart-container">
                          <div className="card-body">
                            <h5 className="card-title chart-title">{t('Doctor.MyDashboard.Total_Emergency_Consult')}</h5>
                            <div className="chart-image"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-2 ">
                      <div className="card-deck chart">
                        <div className="card chart-container">
                          <div className="card-body">
                            <h5 className="card-title chart-title">{t('Doctor.MyDashboard.Total_Chat')}</h5>
                            <div className="chart-image"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
  const comactions = bindActionCreators(exadoActions, dispatch);
  return { docactions, patientactions, comactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(DoctorDashboard));
