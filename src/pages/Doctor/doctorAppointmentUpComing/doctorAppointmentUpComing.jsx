import React, { lazy } from 'react';
import { Redirect, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import exadoDocActions from '../../../redux/exadoDoc/action';
import exadoPatientActions from '../../../redux/exadoPatient/action';
import { componentWithLazyLoad, isAppointmentNew, promiseWrapper } from '../../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import DoctorHeader from "../docHeader";
import DoctorFooter from "../docFooter";
import DoctorLeftPanel from '../../../commonComponent/LeftPanel/leftPanel';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import ViewAppointment from "../../../commonComponent/AppoitmentCalendar/viewAppointment";
import moment from "moment";
import AppointmentCancelPopup from "../../../commonComponent/AppoitmentCalendar/appointmentCancelPopUp";
import { withTranslation } from 'react-i18next';
import AddAppointmentModal from './addAppoinmentModal';
import AppointmentAcceptPopUp from '../../../commonComponent/AppoitmentCalendar/appointmentAcceptPopUp';
import AppointmentRejectConfirm from '../../../commonComponent/AppoitmentCalendar/appointmentRejectConfirmPopUp';
import AppointmentRejectPopUp from '../../../commonComponent/AppoitmentCalendar/appointmentRejectPopUp';

const CalendarView = lazy(() => import('./calendarView'))

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

class DoctorAppointmentUpComing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
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
      MakeCompletePopUp: false,
      CalendarView: true,
      addAppointmentModal: false,
      getCalendarData: 0,
      viewRejectConfirmPopup: false,
      rejectAppointmentGuid: ""
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
      "appointmentStatuses": [2],
      "appointmentTypes": this.state.appointmentTypes.map(v => parseInt(v, 10)),
      "fromDate": this.state.FromDate,
      "toDate": this.state.ToDate
    }
    promiseWrapper(this.props.patientactions.getAppointments, { filter: param })
      .then((data) => {
        this.setState({ AppointmentRequestList: data.patientAppointments }, () => {
          this.setState({ TotalRecords: data.totalRecords });
          this.setState({ TotalPages: data.totalPages });
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

  MakeCompletePopUpClick(appointmentId) {
    this.setState({ appointmentGuid: appointmentId }, () => {
      this.setState({ MakeCompletePopUp: !this.state.MakeCompletePopUp });
    });
  }

  MarkAppointmentAsComplete() {
    promiseWrapper(this.props.docactions.markAppointmentAsComplete, { appointmentGuid: this.state.appointmentGuid })
      .then((data) => {
        if (data.isSuccess == true) {
          this.setState({ appointmentGuid: "" }, () => {
            this.setState({ MakeCompletePopUp: !this.state.MakeCompletePopUp });
          });
          this.GetAppointmentRequestList();
        }
        else {
          toast.error(data.data.errorMessage);
        }
      });
  }

  MarkAppointmentAsCompleteWithDiagnostic() {
    promiseWrapper(this.props.docactions.markAppointmentAsComplete, { appointmentGuid: this.state.appointmentGuid })
      .then((data) => {
        if (data.isSuccess == true) {
          let appId = this.state.appointmentGuid;
          this.setState({ appointmentGuid: "" }, () => {
            this.setState({ MakeCompletePopUp: !this.state.MakeCompletePopUp });
            this.setState({ redirect: "/save-diagnostic/" + appId });
          });
        }
        else {
          toast.error(data.data.errorMessage);
        }
      });
  }

  changeView(e) { this.setState({ CalendarView: Boolean(parseInt(e.target.value)) }); }

  setAddAppointmentModal(val, reload) {
    this.setState({ addAppointmentModal: val });
    if (reload) this.setState(prev => ({ getCalendarData: prev.getCalendarData + 1 }))
  }

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

  isAppointmentTime = (id, appoinmentTime, appointmentGuid) => {
    const currentTime = new Date().getTime();
    const appTime = new Date(appoinmentTime).getTime() - (1000 * 60 * 60 * 6);
    if (currentTime < appTime) {
      toast.warning("Appointment time is not arrived")
    } else {
      toast.success("Video Call Initiated");
      this.props.history.push(`/video-call/${appointmentGuid}`)
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
            this.setState({ viewRejectConfirmPopup: false, rejectAppointmentGuid: "", IsRejectPopUp: true });
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
      this.setState({ viewRejectConfirmPopup: false, rejectAppointmentGuid: "" });
    }
  }

  IsRejectAppoinment(appId) {
    this.setState({ rejectAppointmentGuid: appId }, () => this.setState({
      viewRejectConfirmPopup: !this.state.viewRejectConfirmPopup
    }))
  }

  CloseAcceeptPopup() {
    this.setState({ IsAcceeptPopUp: false });
  }

  CloseRejectPopup() {
    this.setState({ IsRejectPopUp: false });
  }

  render() {
    const { t } = this.props
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <>
        <div>
          <DoctorHeader />
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <DoctorLeftPanel />
                <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                  <div>
                    <div className="row search-bar">
                      <div className="py-4 search-bar-text bg-light col-lg-6">
                        {t('Doctor.AppointmentUpComing.Appointment_UpComing')}
                      </div>
                      <div className="view-selector col-lg-6  bg-light d-flex justify-content-between py-4 align-content-space-between">
                        <select className='form-select w-50' onChange={this.changeView.bind(this)}>
                          <option value="1" >{t("Doctor.AppointmentUpComing.Calender_View")}</option>
                          <option value="0" selected={!this.state.CalendarView}>{t("Doctor.AppointmentUpComing.List_View")}</option>
                        </select>
                        <button
                          className='btn btn-success'
                          onClick={() => {
                            this.setAddAppointmentModal(true)
                            this.setState({ getCalendarData: 0 })
                          }}
                        >
                          {t("Doctor.AppointmentUpComing.Add_Appointment_+")}
                        </button>
                      </div>
                    </div>
                    {!this.state.CalendarView ?
                      <>
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
                              placeholder={t('Doctor.AppointmentUpComing.Filter')}
                              handleOnChange={this.UpdateFilterType.bind(this)}
                              options={AppTypeList}
                              optionKey="id"
                              optionLabel="name" />
                          </div>
                          <div className="search-bar-text-input col-md-2">
                            <button type="button" onClick={this.GetAppointmentRequestList.bind(this)} className="btn filter-btn w-100">{t('Doctor.AppointmentUpComing.Search')}</button>
                          </div>
                        </div>
                        <div className="row mt-3 d-flex justify-content-center">

                          <div className="col-md-12 table-min-height">
                            <>
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
                                      {this.state.AppointmentRequestList.length > 0 ? this.state.AppointmentRequestList.map((v, idx) => this.isAppointmentNewUpcomming(v.appointmentDateTime, v.appointmentGuid) ? (
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
                                          <td><Link className="doctorName" onClick={this.toggleViewAppointment.bind(this, v.appointmentGuid)}>{t('Doctor.AppointmentUpComing.View')}</Link></td>
                                          <td className="d-flex justify-content-center booking-btn">
                                            <div className="dropdown">
                                              <button className="btn btn-outline-dark dropdown-toggle cancel" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {t('Doctor.AppointmentUpComing.Actions')}
                                              </button>
                                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <button
                                                  className='dropdown-item'
                                                  onClick={() => this.isAppointmentTime(idx, v.appointmentDateTime, v.appointmentGuid)}
                                                >
                                                  {t('Doctor.AppointmentUpComing.Take_Call')}
                                                </button>
                                                <a className="dropdown-item" onClick={this.MakeCompletePopUpClick.bind(this, v.appointmentGuid)}>{t('Doctor.AppointmentUpComing.Mark_as_complete')}</a>
                                                <a className="dropdown-item" onClick={this.IsCancelAppoinment.bind(this, v.appointmentGuid)}>{t('Doctor.AppointmentUpComing.Cancel')}</a>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      ) : null):<tr>
                                                  <td colSpan={8} className="empty-list">{t("EmptyListMessages.upcoming_appointments")}</td>
                                                </tr>}
                                    </tbody>
                                  }
                                </table>
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
                            </>
                          </div>
                          {this.state.MakeCompletePopUp === true &&
                            <div className="modal accept-appointment-actions" style={{ display: "block" }}>
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-body">
                                    <div className="divForm my-4">
                                      <div className="d-flex flex-column text-center">
                                        <div className="patient-forget-password-text">
                                          <span>{t('Doctor.MyDashboard.Are_you_sure_you_want_to_mark_this')}</span><br />
                                          <span>{t('Doctor.MyDashboard.appointment_as_complete?')}</span>
                                        </div>
                                      </div>
                                      <div className="mt-3 text-center">
                                        <button className="btn MyButton reset-password-button w-75 py-2" onClick={this.MarkAppointmentAsCompleteWithDiagnostic.bind(this, "")}>{t('Doctor.MyDashboard.Yes,_Upload_diagnostic_report')}</button>
                                      </div>
                                      <div className="mt-3 text-center">
                                        <button type="button" onClick={this.MakeCompletePopUpClick.bind(this, "")} className="btn pending-feedback-cancel w-75 py-2">{t('Doctor.MyDashboard.No')}</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                          <DoctorFooter />
                        </div>
                      </> :
                      componentWithLazyLoad(CalendarView, {
                        getCalendarData: this.state.getCalendarData,
                        setCalendarView: () => this.setState(prev => ({ getCalendarData: prev.getCalendarData + 1 })),
                        toggleViewAppointment: appointmentGuid => this.toggleViewAppointment(appointmentGuid)
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.viewAppointmentPopup &&
          <ViewAppointment
            ViewAppointmentAction={this.toggleViewAppointmentAction}
            AppointmentGuid={this.state.appointmentGuid}
            joinCall={true}
            isAppointmentTime={this.isAppointmentTime}
          />}
        {this.state.IsCancelPopUp &&
          <AppointmentCancelPopup
            ClosePopup={this.ClosePopup.bind(this)}
            AppointmentGuid={this.state.appointmentGuid}
          />
        }
        {this.state.addAppointmentModal &&
          <AddAppointmentModal
            addAppointmentModal={this.state.addAppointmentModal}
            setAddAppointmentModal={(val, reload) => this.setAddAppointmentModal(val, reload)}
          />}
        {this.state.IsAcceeptPopUp === true &&
          <AppointmentAcceptPopUp ClosePopup={this.CloseAcceeptPopup.bind(this)} />
        }

        {this.state.IsRejectPopUp === true &&
          <AppointmentRejectPopUp ClosePopup={this.CloseRejectPopup.bind(this)} />
        }

        {this.state.viewRejectConfirmPopup === true &&
          <AppointmentRejectConfirm AppointmentGuid={this.state.rejectAppointmentGuid} ClosePopup={this.IsRejectConfirmReturn.bind(this)} />
        }
      </>
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

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(DoctorAppointmentUpComing));