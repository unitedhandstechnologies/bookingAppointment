import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import { toast } from "react-toastify";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DoctorHeader from "./docHeader";
import DoctorFooter from "./docFooter";
import DoctorLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import { withTranslation } from "react-i18next";
import SetDefaultTiming from "./docSetDefaultTimingPopup";
import SetCustomTiming from "./docSetCustomTimingPopup";
import moment from "moment";

class DoctorMyTiming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedDefaultData: true,
      LoadedCustomData: true,
      setDefaultOnlineTimingPopup: false,
      setDefaultOfflineTimingPopup: false,
      setCustomTimingPopup: false,
      DocDefaultTimingData: [],
      DefaultGUID: "",
      DefaultCustomGUID: "",
      DocCustomTimingData: [],
    };
  }

  GetDefaulttiming() {
    promiseWrapper(this.props.actions.getDoctorDefaultTiming, {
      doctorGuid: localStorage.getItem("user-id"),
    }).then((jsdata) => {
      this.setState({ DocDefaultTimingData: jsdata.result }, () => {
        this.setState({ DefaultGUID: "" });
        this.setState({ LoadedDefaultData: true });
      });
    });
  }

  GetCustomTiming() {
    promiseWrapper(this.props.actions.getDoctorCustomTiming, {
      doctorGuid: localStorage.getItem("user-id"),
    }).then((jsdata) => {
      this.setState({ DocCustomTimingData: jsdata.result }, () => {
        this.setState({ DefaultCustomGUID: "" });
        this.setState({ LoadedCustomData: true });
      });
    });
  }

  componentDidMount() {
    this.GetDefaulttiming();
    this.GetCustomTiming();
  }

  DeleteDefaultTiming(defaultGuid) {
    promiseWrapper(this.props.actions.deleteDoctorDefaultTimingById, {
      defaultGuid: defaultGuid,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        toast.success(data.data.message);
        this.GetDefaulttiming();
      } else {
        toast.error(data.data.message);
      }
    });
  }

  DeleteCustomTiming(customTimingGuid) {
    promiseWrapper(this.props.actions.deleteDoctorCustomTimingById, {
      defaultGuid: customTimingGuid,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        toast.success(data.data.message);
        this.GetCustomTiming();
      } else {
        toast.error(data.data.message);
      }
    });
  }

  EditDefaultTiming(defaultGuid, isOnLine) {
    this.setState({ DefaultGUID: defaultGuid }, () => {
      if (isOnLine === true) {
        this.toggleSetDefaultOnlineTimingPopup();
      } else {
        this.toggleSetDefaultOfflineTimingPopup();
      }
    });
  }

  EditCustomTiming(customTimingGuid) {
    this.setState({ DefaultCustomGUID: customTimingGuid }, () => {
      this.toggleSetCustomTimingPopup();
    });
  }

  toggleSetDefaultOnlineTimingPopup = () => {
    if (this.state.setDefaultOnlineTimingPopup !== false) {
      this.GetDefaulttiming();
    }
    this.setState({
      setDefaultOnlineTimingPopup: !this.state.setDefaultOnlineTimingPopup,
    });
  };

  toggleSetDefaultOfflineTimingPopup = () => {
    if (this.state.setDefaultOfflineTimingPopup !== false) {
      this.GetDefaulttiming();
    }
    this.setState({
      setDefaultOfflineTimingPopup: !this.state.setDefaultOfflineTimingPopup,
    });
  };

  toggleSetCustomTimingPopup = () => {
    if (this.state.setCustomTimingPopup !== false) {
      this.GetCustomTiming();
    }
    this.setState({
      setCustomTimingPopup: !this.state.setCustomTimingPopup,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <DoctorHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <DoctorLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div className="row search-bar py-4 bg-light">
                  <div className="col-md-12 search-bar-text">
                    {t("Doctor.Profile_Basic.My_Schedule")}
                  </div>
                </div>
                <div className="row doctor-my-timing-tab">
                  <div
                    className="my-profile-form"
                    style={{ paddingBottom: "25px" }}
                  >
                    <div className="divForm">
                      <div className="row">
                        <div
                          className="col-lg-12 col-md-12 doctor-my-timing"
                          id="my-doctor-profile"
                        >
                          <ul
                            className="nav nav-pills nav-fill"
                            id="myprofiletab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="personal-info-tab"
                                data-toggle="tab"
                                href="#personal-info"
                                role="tab"
                                aria-controls="personal-info"
                                aria-selected="true"
                              >
                                {t("Doctor.Profile_Basic.Default_working_Time")}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="additional-info-tab"
                                data-toggle="tab"
                                href="#additional-info"
                                role="tab"
                                aria-controls="additional-info"
                                aria-selected="false"
                              >
                                {t("Doctor.Profile_Basic.Custom_working_Time")}
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content px-4" id="myTabContent">
                            {this.state && this.state.LoadedDefaultData && (
                              <div
                                className="tab-pane fade show active"
                                id="personal-info"
                                role="tabpanel"
                                aria-labelledby="personal-info-tab"
                              >
                                <div className="doctor-timing-container">
                                  <div className="row">
                                    <div className="col-md-12 my-3">
                                      <button
                                        type="button"
                                        onClick={
                                          this.toggleSetDefaultOnlineTimingPopup
                                        }
                                        className="btn set-timing-btn"
                                      >
                                        <i className="far fa-clock mx-2"></i>
                                        {t(
                                          "Doctor.Profile_Basic.Set_Working_Times"
                                        )}
                                      </button>
                                    </div>
                                    {this.state.setDefaultOnlineTimingPopup ? (
                                      <SetDefaultTiming
                                        IsOnline="True"
                                        DefaultGUID={this.state.DefaultGUID}
                                        toggleSetDefaultTiming={
                                          this.toggleSetDefaultOnlineTimingPopup
                                        }
                                      />
                                    ) : null}
                                    {this.state.setDefaultOfflineTimingPopup ? (
                                      <SetDefaultTiming
                                        IsOnline="False"
                                        DefaultGUID={this.state.DefaultGUID}
                                        toggleSetDefaultTiming={
                                          this
                                            .toggleSetDefaultOfflineTimingPopup
                                        }
                                      />
                                    ) : null}
                                  </div>
                                  <div className="row doctor-timing-row">
                                    <div className="col-md-12 timing-title mt-4">
                                      <div>
                                        {t(
                                          "Doctor.Profile_Basic.Online_Appointment"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="table-responsive">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">
                                            {t("Doctor.Profile_Basic.Day")}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.Working_Hours"
                                            )}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.Lunch_Break"
                                            )}
                                          </th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.DocDefaultTimingData &&
                                          this.state.DocDefaultTimingData.filter(
                                            (c) =>
                                              c.isOnlineAppointment === true
                                          ).map((d, idx) => (
                                            <tr key={idx}>
                                              <td>{d.day}</td>
                                              <td className="doctor-timing-days-time">
                                                <span>
                                                  {moment(
                                                    d.workFromTime
                                                  ).format("HH:mm")}{" "}
                                                  -{" "}
                                                  {moment(d.workToTime).format(
                                                    "HH:mm"
                                                  )}
                                                </span>
                                              </td>
                                              <td className="doctor-timing-days-time">
                                                {d.lunchFromTime !== null && (
                                                  <span>
                                                    {moment(
                                                      d.lunchFromTime
                                                    ).format("HH:mm")}{" "}
                                                    -{" "}
                                                    {moment(
                                                      d.lunchToTime
                                                    ).format("HH:mm")}
                                                  </span>
                                                )}
                                                {d.lunchFromTime === null && (
                                                  <span>--- - ---</span>
                                                )}
                                              </td>
                                              <td className="doctor-timing-btn">
                                                <span
                                                  onClick={this.EditDefaultTiming.bind(
                                                    this,
                                                    d.defaultTimingGuid,
                                                    d.isOnlineAppointment
                                                  )}
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <i className="far fa-edit doctor-timing-btn-edit"></i>
                                                </span>
                                                <span
                                                  onClick={this.DeleteDefaultTiming.bind(
                                                    this,
                                                    d.defaultTimingGuid
                                                  )}
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <i className="far fa-trash-alt doctor-timing-btn-delete"></i>
                                                </span>
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="row doctor-timing-row py-2">
                                    <div className="col-md-12 timing-title mt-4">
                                      <div>
                                        {t(
                                          "Doctor.Profile_Basic.In-Clinic_Appointment"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="table-responsive">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">
                                            {t("Doctor.Profile_Basic.Day")}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.Working_Hours"
                                            )}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.Lunch_Break"
                                            )}
                                          </th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.DocDefaultTimingData &&
                                          this.state.DocDefaultTimingData.filter(
                                            (c) =>
                                              c.isOnlineAppointment === false
                                          ).map((d, idx) => (
                                            <tr key={idx}>
                                              <td>{d.day}</td>
                                              <td className="doctor-timing-days-time">
                                                <span>
                                                  {moment(
                                                    d.workFromTime
                                                  ).format("HH:mm")}{" "}
                                                  -{" "}
                                                  {moment(d.workToTime).format(
                                                    "HH:mm"
                                                  )}
                                                </span>
                                              </td>
                                              <td className="doctor-timing-days-time">
                                                {d.lunchFromTime !== null && (
                                                  <span>
                                                    {moment(
                                                      d.lunchFromTime
                                                    ).format("HH:mm")}{" "}
                                                    -{" "}
                                                    {moment(
                                                      d.lunchToTime
                                                    ).format("HH:mm")}
                                                  </span>
                                                )}
                                                {d.lunchFromTime === null && (
                                                  <span>--- - ---</span>
                                                )}
                                              </td>
                                              <td className="doctor-timing-btn">
                                                <span
                                                  onClick={this.EditDefaultTiming.bind(
                                                    this,
                                                    d.defaultTimingGuid,
                                                    d.isOnlineAppointment
                                                  )}
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <i className="far fa-edit doctor-timing-btn-edit"></i>
                                                </span>
                                                <span
                                                  onClick={this.DeleteDefaultTiming.bind(
                                                    this,
                                                    d.defaultTimingGuid
                                                  )}
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <i className="far fa-trash-alt doctor-timing-btn-delete"></i>
                                                </span>
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
                            {this.state && this.state.LoadedCustomData && (
                              <div
                                className="tab-pane fade"
                                id="additional-info"
                                role="tabpanel"
                                aria-labelledby="additional-info-tab"
                              >
                                <div className="doctor-custom-timing-container">
                                  <div className="row">
                                    <div className="col-md-12 my-3 ">
                                      <button
                                        type="button"
                                        onClick={
                                          this.toggleSetCustomTimingPopup
                                        }
                                        className="btn set-custom-timing-btn"
                                      >
                                        <i className="far fa-clock mx-2"></i>
                                        {t(
                                          "Doctor.Profile_Basic.Add_Custom_Time"
                                        )}
                                      </button>
                                    </div>
                                    {this.state.setCustomTimingPopup ? (
                                      <SetCustomTiming
                                        DefaultCustomGUID={
                                          this.state.DefaultCustomGUID
                                        }
                                        toggleSetCustomTiming={
                                          this.toggleSetCustomTimingPopup
                                        }
                                      />
                                    ) : null}
                                  </div>
                                  <div className="table-responsive">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.From_Date"
                                            )}
                                          </th>
                                          <th scope="col">
                                            {t("Doctor.Profile_Basic.To_Date")}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.Is_Day_Off"
                                            )}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.Appointment_Type"
                                            )}
                                          </th>
                                          <th scope="col">
                                            {t("Doctor.Profile_Basic.Hour")}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.Lunch_Break"
                                            )}
                                          </th>
                                          <th scope="col">
                                            {t(
                                              "Doctor.Profile_Basic.In_Perpetuaity"
                                            )}
                                          </th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.DocCustomTimingData &&
                                          this.state.DocCustomTimingData.map(
                                            (d, idx) => (
                                              <tr key={idx}>
                                                <td>
                                                  {moment(d.fromDate).format(
                                                    "DD-MMM-yyyy"
                                                  )}
                                                </td>
                                                <td>
                                                  {moment(d.toDate).format(
                                                    "DD-MMM-yyyy"
                                                  )}
                                                </td>
                                                <td>
                                                  {d.isDayOff ? "Yes" : "No"}
                                                </td>
                                                <td>
                                                  {d.appointmentType === 1
                                                    ? "OnLine"
                                                    : d.appointmentType === 2
                                                    ? "In-Clinic"
                                                    : "Both"}
                                                </td>
                                                <td className="doctor-timing-days-time">
                                                  <span>
                                                    {d.workFromTime !== null
                                                      ? moment(
                                                          d.workFromTime
                                                        ).format("HH:mm")
                                                      : ""}{" "}
                                                    -{" "}
                                                    {d.workToTime !== null
                                                      ? moment(
                                                          d.workToTime
                                                        ).format("HH:mm")
                                                      : ""}
                                                  </span>
                                                </td>
                                                <td className="doctor-timing-days-time">
                                                  <span>
                                                    {d.lunchFromTime !== null
                                                      ? moment(
                                                          d.lunchFromTime
                                                        ).format("HH:mm")
                                                      : ""}{" "}
                                                    -{" "}
                                                    {d.lunchToTime !== null
                                                      ? moment(
                                                          d.lunchToTime
                                                        ).format("HH:mm")
                                                      : ""}
                                                  </span>
                                                </td>
                                                <td>
                                                  {d.isYearlyDayOff
                                                    ? "Yes"
                                                    : "No"}
                                                </td>
                                                <td className="doctor-timing-btn">
                                                  <span
                                                    onClick={this.EditCustomTiming.bind(
                                                      this,
                                                      d.customTimingGuid
                                                    )}
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    <i className="far fa-edit doctor-timing-btn-edit"></i>
                                                  </span>
                                                  <span
                                                    onClick={this.DeleteCustomTiming.bind(
                                                      this,
                                                      d.customTimingGuid
                                                    )}
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    <i className="far fa-trash-alt doctor-timing-btn-delete"></i>
                                                  </span>
                                                </td>
                                              </tr>
                                            )
                                          )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  const actions = bindActionCreators(exadoDocActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(DoctorMyTiming));
