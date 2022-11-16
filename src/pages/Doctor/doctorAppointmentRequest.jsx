import React from 'react';
import exadoDocActions from '../../redux/exadoDoc/action';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { isAppointmentNew, promiseWrapper } from '../../utility/common';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import DoctorHeader from "./docHeader";
import DoctorFooter from "./docFooter";
import DoctorLeftPanel from './../../commonComponent/LeftPanel/leftPanel';
import ViewAppointment from "./../../commonComponent/AppoitmentCalendar/viewAppointment";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AppointmentAcceptPopup from "./../../commonComponent/AppoitmentCalendar/appointmentAcceptPopUp";
import AppointmentRejectPopup from "./../../commonComponent/AppoitmentCalendar/appointmentRejectPopUp";
import AppointmentRejectConfirm from "./../../commonComponent/AppoitmentCalendar/appointmentRejectConfirmPopUp";
import moment from "moment";
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

class DoctorAppointmentRequests extends React.Component {
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
      IsAcceeptPopUp: false,
      IsRejectPopUp: false,
      viewAppointmentPopup: false,
      appointmentGuid: "",
      viewRejectConfirmPopup: false
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
      "patientGuid": null,
      "doctorGuid": localStorage.getItem('user-id'),
      "appointmentStatuses": [1],
      "appointmentTypes": this.state.appointmentTypes.map(v => parseInt(v, 10)),
      "fromDate": this.state.FromDate,
      "toDate": this.state.ToDate
    }
    promiseWrapper(this.props.patientactions.getAppointments, { filter: param }).then((data) => {
      const filterList = data.patientAppointments.filter(appointment => isAppointmentNew(appointment.appointmentDateTime));
      this.setState({ AppointmentRequestList: filterList }, () => {
        this.setState({ TotalRecords: filterList.length });
        this.setState({ TotalPages: Math.ceil(filterList.length / this.state.PageSize) });
        this.setState({ LoadedData: true });
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

  IsAcceeptAppoinment(appId) {
    promiseWrapper(this.props.patientactions.changeAppointmentStatus, { appointmentGuid: appId, isConfirm: true })
      .then((data) => {
        if (data.data.isSuccess == true) {
          this.setState({ IsAcceeptPopUp: true });
          this.GetAppointmentRequestList();
        }
        else {
          toast.error(data.data.errorMessage);
        }
      });
  }

  IsRejectConfirmReturn(appId, action) {
    if (action === 1) {
      promiseWrapper(this.props.patientactions.changeAppointmentStatus, { appointmentGuid: appId, isConfirm: false })
        .then((data) => {
          if (data.data.isSuccess == true) {
            this.setState({ viewRejectConfirmPopup: false });
            this.setState({ IsRejectPopUp: true });
            if (this.state.viewAppointmentPopup) this.setState({
              viewAppointmentPopup: !this.state.viewAppointmentPopup
            });
            this.GetAppointmentRequestList();
          }
          else {
            toast.error(data.data.errorMessage);
          }
        });
    }
    else {
      this.setState({ viewRejectConfirmPopup: false });
    }
  }

  IsRejectAppoinment(appId) {
    this.setState({ appointmentGuid: appId }, () => {
      this.setState({
        viewRejectConfirmPopup: !this.state.viewRejectConfirmPopup
      });
    });
  }

  CloseAcceeptPopup() {
    this.setState({ IsAcceeptPopUp: false });
  }

  CloseRejectPopup() {
    this.setState({ IsRejectPopUp: false });
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
      this.setState({
        viewAppointmentPopup: !this.state.viewAppointmentPopup
      });
    }
    if (data === false) {
      this.IsRejectAppoinment(this.state.appointmentGuid);
    }
    if (data === "") {
      this.setState({ appointmentGuid: "" }, () => {
        this.setState({
          viewAppointmentPopup: !this.state.viewAppointmentPopup
        });
      });
    }
  };

  render() {
    const { t } = this.props
    return (
      <div>
        <DoctorHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <DoctorLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div>
                  <div className="row search-bar">
                    <div className="py-4 search-bar-text w-100 bg-light">
                      {t('Doctor.AppointmentRequests.Appointment_Requests')}
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
                          placeholder={t('Doctor.AppointmentUpComing.Search_Appointment_Doctor_Name')}
                          onChange={this.SearchUpdate.bind(this)}
                          value={this.state.SearchText}
                          onKeyPress={this.handleKeyPress} />
                      </div>
                    </div>
                    <div className="search-bar-text-input col-md-3">
                      <DropdownMultiselect
                        selected={this.state.appointmentTypes}
                        buttonClass="selectpicker btn filter-btn"
                        placeholder={t('Doctor.AppointmentRequests.Filter')}
                        handleOnChange={this.UpdateFilterType.bind(this)}
                        options={AppTypeList}
                        optionKey="id"
                        optionLabel="name" />
                    </div>
                    <div className="search-bar-text-input col-md-2">
                      <button type="button" onClick={this.GetAppointmentRequestList.bind(this)} className="btn filter-btn w-100">{t('Doctor.AppointmentRequests.Search')}</button>
                    </div>
                  </div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12 table-min-height">
                      <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                          <thead>
                            <tr className="new-patient-table-title">
                              <th rowSpan="2">{t('Doctor.AppointmentUpComing.Booking_ID')}</th>
                              <th rowSpan="2">{t('Doctor.AppointmentUpComing.Patient_Name')}</th>
                              <th>{t('Doctor.AppointmentCancelled.Date')}</th>
                              <th rowSpan="2">{t('Doctor.AppointmentUpComing.Medical_Specialty')}</th>
                              <th rowSpan="2">{t('Doctor.AppointmentUpComing.Amount_(€)')}</th>
                              <th rowSpan="2">{t('Doctor.AppointmentUpComing.Appointment_Type')}</th>
                              <th rowSpan="2">{t('Doctor.AppointmentUpComing.Symptoms')}</th>
                              <th rowSpan="2">{t('Doctor.AppointmentUpComing.Actions')}</th>
                            </tr>
                            <tr>
                              <th>{t('Doctor.AppointmentCompleted.Time')}</th>
                            </tr>
                          </thead>
                          {this.state && this.state.LoadedData &&
                            <tbody>
                              {this.state.AppointmentRequestList.length > 0 ? this.state.AppointmentRequestList.map((v, idx) =>
                              (
                                <tr key={idx}>
                                  <td>{v.bookingId}</td>
                                  <td>
                                    {v.externalUser ?
                                      `${v.patientFirstName} ${v.patientLastName}` :
                                      <Link className="doctorName" to={"/patient-detail-view/" + v.patientGuid}>
                                        {v.patientFirstName} {v.patientLastName}
                                      </Link>
                                    }
                                  </td>
                                  <td className="dateTime">{moment(v.appointmentDateTime).format("MM/DD/YYYY")}<br />{moment(v.appointmentDateTime).format("HH:mm")}</td>
                                  <td className="medicalSpecialty">{v.physicianServices}</td>
                                  <td className="country">{v.amount}</td>
                                  <td className="type">{v.appointmentType}</td>
                                  <td><a className="doctorName" onClick={this.toggleViewAppointment.bind(this, v.appointmentGuid)}>{t('Doctor.AppointmentUpComing.View')}</a></td>
                                  <td>
                                    <div className="d-flex justify-content-between booking-btn">
                                      <a className="btn joinCall mr-2" onClick={this.IsAcceeptAppoinment.bind(this, v.appointmentGuid)}>{t('Doctor.AppointmentRequests.Accept')}</a>
                                      <a type="button" onClick={this.IsRejectAppoinment.bind(this, v.appointmentGuid)} className="btn btn-outline-dark cancel">{t('Doctor.AppointmentRequests.Reject')}</a>
                                    </div>
                                  </td>
                                </tr>
                              )) : <tr><td colSpan={8} className="empty-list">{t("EmptyListMessages.appointments_request")}</td></tr>}
                            </tbody>
                          }
                        </table>
                        {this.state.viewAppointmentPopup ? <ViewAppointment ViewAppointmentAction={this.toggleViewAppointmentAction} AppointmentGuid={this.state.appointmentGuid} /> : null}
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
                        </div>
                      </div>
                    </div>
                    <DoctorFooter />
                  </div>
                </div>
              </div>

              {this.state.IsAcceeptPopUp === true &&
                <AppointmentAcceptPopup ClosePopup={this.CloseAcceeptPopup.bind(this)} />
              }

              {this.state.IsRejectPopUp === true &&
                <AppointmentRejectPopup ClosePopup={this.CloseRejectPopup.bind(this)} />
              }

              {this.state.viewRejectConfirmPopup === true &&
                <AppointmentRejectConfirm AppointmentGuid={this.state.appointmentGuid} ClosePopup={this.IsRejectConfirmReturn.bind(this)} />
              }
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

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(DoctorAppointmentRequests));