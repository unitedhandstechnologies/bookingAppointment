import React from 'react';
import { Link, withRouter } from "react-router-dom";
import exadoDocActions from '../../redux/exadoDoc/action';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { isAppointmentNew, promiseWrapper } from '../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import PatientHeader from "./header2";
import PatientFooter from "./footer";
import PatientLeftPanel from './../../commonComponent/LeftPanel/leftPanel';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import ViewAppointment from "./../../commonComponent/AppoitmentCalendar/viewAppointment";
import AppointmentCancelPopup from "./../../commonComponent/AppoitmentCalendar/appointmentCancelPopUp";
import moment from "moment";
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

class PatientAppointmentUpComing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      AppointmentRequestList: [],
      PageSize: 10,
      CurrentPage: 1,
      SearchText: "",
      SortExp: "",
      SortDir: "",
      TotalRecords: 0,
      TotalPages: 0,
      appointmentTypes: ["1", "2", "3"],
      FromDate: null, //new moment().subtract(3, 'months'),
      ToDate: null, //new Date(),
      IsCancelPopUp: false,
      viewAppointmentPopup: false,
      appointmentGuid: "",
      isAppointmentTime: {}
    };
  }

  componentDidMount() {
    this.GetAppointmentRequestList();
  }

  GetAppointmentRequestList() {
    let param = {
      "pageSize": Number(this.state.PageSize),
      "currentPage": Number(this.state.CurrentPage),
      "search": this.state.SearchText,
      "sortExp": this.state.SortExp,
      "sortDir": this.state.SortDir,
      "patientGuid": localStorage.getItem('user-id'),
      "doctorGuid": null,
      "appointmentStatuses": [2],
      "appointmentTypes": this.state.appointmentTypes.map(v => parseInt(v, 10)),
      "fromDate": this.state.FromDate,
      "toDate": this.state.ToDate
    }
    promiseWrapper(this.props.patientactions.getAppointments, { filter: param }).then((data) => {
      const filterList = data.patientAppointments.filter(appointment => this.isAppointmentNewUpcomming(appointment.appointmentDateTime, appointment.appointmentGuid));
      this.setState({ AppointmentRequestList: filterList }, () => {
        this.setState({ TotalRecords: filterList.length, TotalPages: Math.floor(filterList.length / 10), LoadedData: true });
      });
    });
  }

  UpdateFromDate = (e) => {
    this.setState({ FromDate: e.target.value });
  }

  UpdateToDate = (e) => {
    this.setState({ ToDate: e.target.value });
  }

  UpdateFilterType = (e) => {
    this.setState({ appointmentTypes: e.map(v => parseInt(v, 10)) });
  }

  handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    this.setState({ CurrentPage: currentPage }, () => {
      this.GetAppointmentRequestList();
    });
  };

  SearchUpdate = (e) => {
    this.setState({ SearchText: e.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.SearchUpdate(event);
      this.GetAppointmentRequestList();
    }
  }

  IsCancelAppoinment(appId) {
    this.setState({ appointmentGuid: appId }, () => {
      this.setState({
        IsCancelPopUp: !this.state.IsCancelPopUp
      });
    });
  }

  ClosePopup() {
    this.setState({ appointmentGuid: "" }, () => {
      this.setState({
        IsCancelPopUp: !this.state.IsCancelPopUp
      });
      this.GetAppointmentRequestList();
    });
  }

  toggleViewAppointment = (data) => {
    this.setState({ appointmentGuid: data }, () => {
      this.setState({
        viewAppointmentPopup: !this.state.viewAppointmentPopup
      });
    });
  };

  toggleViewAppointmentAction = (data) => {
    if (data === true) {
      this.IsAcceeptAppoinment(this.state.appointmentGuid);
    }
    if (data === false) {
      this.IsRejectAppoinment(this.state.appointmentGuid);
    }
    this.setState({ appointmentGuid: "" }, () => {
      this.setState({
        viewAppointmentPopup: !this.state.viewAppointmentPopup
      });
    });
  };

  makeAppointmentComplete = (appointmentGuid) => {
    promiseWrapper(this.props.docactions.markAppointmentAsComplete, { appointmentGuid: appointmentGuid })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  isAppointmentNewUpcomming = (date, appointmentGuid) => {
    const isNew = isAppointmentNew(date, 2);
    if (!isNew) this.makeAppointmentComplete(appointmentGuid);
    return isNew
  }

  isAppointmentTime = (id = null, appoinmentTime, appointmentGuid) => {
    const currentTime = new Date().getTime();
    const appTime = new Date(appoinmentTime).getTime() - (1000 * 60 * 60 * 6);
    if (currentTime < appTime) {
      toast.warning("Appointment time is not arrived")
    } else { toast.success("Video Call Initiated"); this.props.history.push(`/video-call/${appointmentGuid}`) }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <PatientHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <PatientLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div>
                  <div className="row search-bar">
                    <div className="py-4 search-bar-text w-100 bg-light">
                      {t('Patient.AppointmentUpComing.Appointment_UpComing')}
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="search-bar-text-input col-md-7 top-search">
                      <div className="col-lg-4 float-start">
                        <input type="date" max="2100-12-31"
                          className="form-control"
                          onChange={this.UpdateFromDate.bind(this)}
                          value={this.state.FromDate} />
                      </div>
                      <div className="col-lg-4 float-start">
                        <input type="date" max="2100-12-31"
                          className="form-control"
                          onChange={this.UpdateToDate.bind(this)}
                          value={this.state.ToDate} />
                      </div>
                      <div className="col-lg-4 float-start">
                        <input type="text"
                          className="form-control"
                          placeholder={t('Patient.AppointmentUpComing.Search_Appointment_Doctor_Name')}
                          onChange={this.SearchUpdate.bind(this)}
                          value={this.state.SearchText}
                          onKeyPress={this.handleKeyPress} />
                      </div>
                    </div>
                    <div className="search-bar-text-input col-md-3">
                      <DropdownMultiselect
                        selected={this.state.appointmentTypes}
                        buttonClass="selectpicker btn filter-btn"
                        placeholder={t('Patient.AppointmentUpComing.Filter')}
                        handleOnChange={this.UpdateFilterType.bind(this)}
                        options={AppTypeList}
                        optionKey="id"
                        optionLabel="name" />
                    </div>
                    <div className="search-bar-text-input col-md-2">
                      <button type="button" className="btn filter-btn w-100">{t('Patient.AppointmentUpComing.Search')}</button>
                    </div>
                  </div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12 table-min-height">
                      <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                          <thead>
                            <tr className="new-patient-table-title">
                              <th rowSpan="2">{t('Patient.AppointmentUpComing.Booking_ID')}</th>
                              <th rowSpan="2">{t('Patient.AppointmentUpComing.Doctor_Name')}</th>
                              <th>{t('Patient.AppointmentUpComing.Date')}</th>
                              <th rowSpan="2">{t('Patient.AppointmentUpComing.Medical_Specialty')}</th>
                              <th rowSpan="2">{t('Patient.AppointmentUpComing.Amount_(€)')}</th>
                              <th rowSpan="2">{t('Patient.AppointmentUpComing.Appointment_Type')}</th>
                              <th rowSpan="2">{t('Patient.AppointmentUpComing.Actions')}</th>
                            </tr>
                            <tr>
                              <th>{t('Patient.AppointmentUpComing.Time')}</th>
                            </tr>
                          </thead>
                          {this.state && this.state.LoadedData &&
                            <tbody>
                              {this.state.AppointmentRequestList.length > 0 ? this.state.AppointmentRequestList.map((v, idx) => {
                                if (this.isAppointmentNewUpcomming(v.appointmentDateTime, v.appointmentGuid)) {
                                  // this.isAppointmentTime(idx, v.appointmentDateTime)
                                  return (
                                    <tr key={idx}>
                                      <td>{v.bookingId}</td>
                                      <td><Link className="doctor-name-link" to={`/book-an-appoinment-doc-detail/${v.doctorGuid}`}>{v.doctorFirstName} {v.doctorLastName}</Link></td>
                                      <td className="dateTime">{moment(v.appointmentDateTime).format("MM/DD/YYYY")}<br />{moment(v.appointmentDateTime).format("HH:mm")}</td>
                                      <td className="medicalSpecialty">{v.physicianServices}</td>
                                      <td className="country">{v.amount}</td>
                                      <td className="type">{v.appointmentType}</td>
                                      <td className="action" style={{ width: "240px" }}>
                                        <div className="d-flex justify-content-between booking-btn">
                                          <a className="btn viewDetails" onClick={this.toggleViewAppointment.bind(this, v.appointmentGuid)} role="button">{t('Patient.AppointmentUpComing.View')} </a>
                                          <button
                                            className='btn btn-outline-success cancel me-2'
                                            onClick={() => this.isAppointmentTime(idx, v.appointmentDateTime, v.appointmentGuid)}
                                          >
                                            {t('Patient.AppointmentUpComing.Take_Call')}
                                          </button>
                                          <button type="button" onClick={this.IsCancelAppoinment.bind(this, v.appointmentGuid)} className="btn btn-outline-dark cancel">{t('Patient.AppointmentUpComing.Cancel')}</button>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                } else return null
                              }) : <tr>
                                <td colSpan={8} className="empty-list">{t("EmptyListMessages.upcoming_appointments")}</td>
                              </tr>
                              }
                            </tbody>
                          }
                        </table>
                        {this.state.viewAppointmentPopup ?
                          <ViewAppointment
                            ViewAppointmentAction={this.toggleViewAppointmentAction}
                            AppointmentGuid={this.state.appointmentGuid}
                            joinCall={true}
                            isAppointmentTime={this.isAppointmentTime}
                          /> : null}
                        {this.state.IsCancelPopUp ? <AppointmentCancelPopup ClosePopup={this.ClosePopup.bind(this)} AppointmentGuid={this.state.appointmentGuid} /> : null}
                        {this.state.AppointmentRequestList.length > 0 &&
                          <div className="my-4 d-flex justify-content-center">
                            <ReactPaginate
                              previousClassName={'arrow'}
                              nextClassName={'arrow'}
                              previousLabel={'<<'}
                              nextLabel={'>>'}
                              breakLabel={'...'}
                              pageLinkClassName={'pages'}
                              pageCount={this.state.TotalPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={this.handlePageClick}
                              containerClassName={'pagination'}
                              activeLinkClassName={'active'}
                            />
                          </div>}
                      </div>
                    </div>
                    <PatientFooter />
                  </div>
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
  return {}
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withRouter(withTranslation()(PatientAppointmentUpComing)));