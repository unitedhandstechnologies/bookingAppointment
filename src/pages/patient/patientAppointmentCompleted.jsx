import React from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import ReactPaginate from "react-paginate";
import AppointmentFeedBack from "./../../commonComponent/AppoitmentCalendar/appointmentFeedback";
import PatientHeader from "./header2";
import PatientFooter from "./footer";
import PatientLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import AskRefundPopup from "./askRefundPopup";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { withTranslation } from "react-i18next";
import Switch from "react-switch";
import moment from "moment";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

class PatientAppointmentCompleted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      LoadedFeedBackData: false,
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
      FeedbackViewPopup: false,
      appointmentGuid: "",
      FeedbackData: {},
      viewAppointmentFeedBackPopup: false,
      AppointmentData: {
        appointmentGuid: "",
        appointmentDate: "",
        patientName: "",
        doctorName: "",
        bookingId: "",
        consultFees: 0,
        doctorGuid: "",
        patientGuid: "",
        doctorImage: "",
        physicianServices: [],
        totalReview: 0,
        averageReview: 0,
        experience: 0,
        isFeedbackGiven: true,
        feedbackPendingHours: 0,
        isApplyForRefund: false,
        refundPendingHours: 0,
      },
      viewRefundPopup: false,
      RefundAppointmentData: {},
    };
  }

  componentDidMount() {
    this.GetAppointmentRequestList();
  }

  ShowRefundPopUp = (data) => {
    this.setState(
      {
        RefundAppointmentData: this.state.AppointmentRequestList.filter(
          (d) => d.appointmentGuid === data
        )[0],
      },
      () => {
        this.setState({ viewRefundPopup: !this.state.viewRefundPopup });
        this.GetAppointmentRequestList();
      }
    );
  };

  FeedbackViewPopUp = (data) => {
    if (data !== "") {
      this.setState({ appointmentGuid: data });
      promiseWrapper(this.props.patientactions.getDoctorReviewByAppointmentId, {
        appointmentGuid: data,
      }).then((data) => {
        this.setState({ FeedbackData: data }, () => {
          this.setState({ LoadedFeedBackData: true });
        });
      });
    } else {
      this.setState({ appointmentGuid: "" });
      this.setState({ LoadedFeedBackData: false });
    }
    this.setState({ FeedbackViewPopup: !this.state.FeedbackViewPopup });
  };

  toggleAppointmentFeedBackPopUp = (rv, ag, dg, pg) => {
    this.setState((prevState) => ({
      AppointmentData: {
        ...prevState.AppointmentData,
        ["appointmentGuid"]: ag,
      },
    }));
    this.setState((prevState) => ({
      AppointmentData: {
        ...prevState.AppointmentData,
        ["doctorGuid"]: dg,
      },
    }));
    this.setState((prevState) => ({
      AppointmentData: {
        ...prevState.AppointmentData,
        ["patientGuid"]: pg,
      },
    }));
    this.setState({
      viewAppointmentFeedBackPopup: !this.state.viewAppointmentFeedBackPopup,
    });
    if (rv === "true") {
      this.setState((prevState) => ({
        AppointmentData: {
          ...prevState.AppointmentData,
          ["appointmentGuid"]: "",
        },
      }));
      this.setState((prevState) => ({
        AppointmentData: {
          ...prevState.AppointmentData,
          ["doctorGuid"]: "",
        },
      }));
      this.setState((prevState) => ({
        AppointmentData: {
          ...prevState.AppointmentData,
          ["patientGuid"]: "",
        },
      }));
      this.GetAppointmentRequestList();
    }
  };

  GetAppointmentRequestList() {
    let param = {
      pageSize: Number(this.state.PageSize),
      currentPage: Number(this.state.CurrentPage),
      search: this.state.SearchText,
      sortExp: this.state.SortExp,
      sortDir: this.state.SortDir,
      patientGuid: localStorage.getItem("user-id"),
      doctorGuid: null,
      appointmentStatuses: [4],
      appointmentTypes: this.state.appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: this.state.FromDate,
      toDate: this.state.ToDate,
      isRequiredRefundData: true,
    };
    promiseWrapper(this.props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      this.setState(
        { AppointmentRequestList: data.patientAppointments },
        () => {
          this.setState({ TotalRecords: data.totalRecords });
          this.setState({ TotalPages: data.totalPages });
          this.setState({ LoadedData: true });
        }
      );
    });
  }

  UpdateFromDate = (e) => {
    this.setState({ FromDate: e.target.value });
  };

  UpdateToDate = (e) => {
    this.setState({ ToDate: e.target.value });
  };

  UpdateFilterType = (e) => {
    this.setState({ appointmentTypes: e.map((v) => parseInt(v, 10)) });
  };

  handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    this.setState({ CurrentPage: currentPage }, () => {
      this.GetAppointmentRequestList();
    });
  };

  SearchUpdate = (e) => {
    this.setState({ SearchText: e.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.SearchUpdate(event);
      this.GetAppointmentRequestList();
    }
  };

  UpdateShowDiagnosisToOthers = (checked, event, id) => {
    promiseWrapper(this.props.patientactions.showDiagnosisToOthers, {
      appointmentGuid: id,
      bValue: checked,
    }).then((data) => {
      if (data.isSuccess == true) {
        toast.success(data.message);
        this.GetAppointmentRequestList();
      } else {
        toast.error(data.errorMessage);
        this.GetAppointmentRequestList();
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
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div>
                  <div className="row search-bar">
                    <div className="py-4 search-bar-text w-100 bg-light">
                      {t("Patient.AppointmentCompleted.Appointment_Completed")}
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="search-bar-text-input col-md-7 top-search">
                      <div className="col-lg-4 float-start">
                        <input
                          type="date"
                          max="2100-12-31"
                          className="form-control"
                          onChange={this.UpdateFromDate.bind(this)}
                          value={this.state.FromDate}
                        />
                      </div>
                      <div className="col-lg-4 float-start">
                        <input
                          type="date"
                          max="2100-12-31"
                          className="form-control"
                          onChange={this.UpdateToDate.bind(this)}
                          value={this.state.ToDate}
                        />
                      </div>
                      <div className="col-lg-4 float-start">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t(
                            "Patient.AppointmentCompleted.Search_Appointment_Doctor_Name"
                          )}
                          onChange={this.SearchUpdate.bind(this)}
                          value={this.state.SearchText}
                          onKeyPress={this.handleKeyPress}
                        />
                      </div>
                    </div>
                    <div className="search-bar-text-input col-md-3">
                      <DropdownMultiselect
                        selected={this.state.appointmentTypes}
                        buttonclassName="selectpicker btn filter-btn"
                        placeholder={t("Patient.AppointmentCompleted.Filter")}
                        handleOnChange={this.UpdateFilterType.bind(this)}
                        options={AppTypeList}
                        optionKey="id"
                        optionLabel="name"
                      />
                    </div>
                    <div className="search-bar-text-input col-md-2">
                      <button
                        type="button"
                        onClick={this.GetAppointmentRequestList.bind(this)}
                        className="btn filter-btn w-100"
                      >
                        {t("Patient.AppointmentCompleted.Search")}
                      </button>
                    </div>
                  </div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12 table-min-height">
                      <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                          <thead>
                            <tr className="new-patient-table-title">
                              <th rowspan="2">
                                {t("Patient.AppointmentCompleted.Booking_ID")}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCompleted.Doctor_Name")}
                              </th>
                              <th>{t("Patient.AppointmentCompleted.Date")}</th>
                              <th rowspan="2">
                                {t(
                                  "Patient.AppointmentCompleted.Medical_Specialty"
                                )}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCompleted.Amount_(€)")}
                              </th>
                              <th rowspan="2">
                                {t(
                                  "Patient.AppointmentCompleted.Appointment_Type"
                                )}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCompleted.Diagnosis")}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCompleted.Feedback")}
                              </th>
                            </tr>
                            <tr>
                              <th>{t("Patient.AppointmentCompleted.Time")}</th>
                            </tr>
                          </thead>
                          {this.state && this.state.LoadedData && (
                            <tbody>
                              {this.state.AppointmentRequestList.length > 0 ? (
                                this.state.AppointmentRequestList.map(
                                  (v, idx) => (
                                    <tr>
                                      <td>{v.bookingId}</td>
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
                                      <td className="country">{v.amount}</td>
                                      <td className="type">
                                        {v.appointmentType}
                                      </td>
                                      <td className="admin-switch2">
                                        <Switch
                                          className=""
                                          id={v.appointmentGuid}
                                          checked={v.showDiagnosisToOthers}
                                          onChange={
                                            this.UpdateShowDiagnosisToOthers
                                          }
                                          offColor="#bdc1c2"
                                          onColor="#20CAD6"
                                          handleDiameter={15}
                                          width={30}
                                          height={15}
                                        />
                                        <Link
                                          to={`/patient-view-diagnostic/${v.appointmentGuid}`}
                                          className="doctorName"
                                        >
                                          {t(
                                            "Patient.AppointmentCompleted.View"
                                          )}
                                        </Link>
                                      </td>
                                      <td className="booking-btn">
                                        <div className="dropdown">
                                          <button
                                            className="btn btn-outline-dark dropdown-toggle cancel"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                          >
                                            Actions
                                          </button>
                                          <div
                                            className="dropdown-menu action-dropdown"
                                            aria-labelledby="dropdownMenuButton"
                                          >
                                            {
                                              // v.isPaidOnline &&
                                              // v.isApplyForRefund === false &&
                                              // v.refundPendingHours > 0 &&
                                              <a
                                                className="dropdown-item"
                                                onClick={this.ShowRefundPopUp.bind(
                                                  this,
                                                  v.appointmentGuid
                                                )}
                                              >
                                                Ask for refund{" "}
                                                <span className="dropdown-item-timer">
                                                  {parseInt(
                                                    v.refundPendingHours
                                                  )}{" "}
                                                  {t(
                                                    "Patient.AppointmentCompleted.Hours_Pending"
                                                  )}
                                                </span>
                                              </a>
                                            }
                                            {v.isPaidOnline &&
                                              v.isApplyForRefund === false &&
                                              v.refundPendingHours === 0 && (
                                                <a className="dropdown-item">
                                                  {t(
                                                    "Patient.AppointmentCompleted.Refund_time_left"
                                                  )}
                                                </a>
                                              )}
                                            {v.isPaidOnline &&
                                              v.isApplyForRefund === true &&
                                              v.appointmentStatus ===
                                                "Completed" && (
                                                <a className="dropdown-item">
                                                  {t(
                                                    "Patient.AppointmentCompleted.Applyed_for_Refund"
                                                  )}
                                                </a>
                                              )}
                                            {v.isPaidOnline &&
                                              v.isApplyForRefund === true &&
                                              v.appointmentStatus ===
                                                "Refunded" && (
                                                <a className="dropdown-item">
                                                  {" "}
                                                  {v.refundAmount} (€){" "}
                                                  {t(
                                                    "Patient.AppointmentCompleted.Refunded"
                                                  )}{" "}
                                                </a>
                                              )}
                                            <a className="dropdown-item">
                                              {v.isFeedbackGiven === true && (
                                                <a
                                                  onClick={this.FeedbackViewPopUp.bind(
                                                    this,
                                                    v.appointmentGuid
                                                  )}
                                                  className="type"
                                                >
                                                  {t(
                                                    "Patient.AppointmentCompleted.Given"
                                                  )}
                                                </a>
                                              )}
                                              {v.isFeedbackGiven === false &&
                                                v.feedbackPendingHours > 0 && (
                                                  <>
                                                    <a
                                                      className="status"
                                                      onClick={this.toggleAppointmentFeedBackPopUp.bind(
                                                        this,
                                                        "false",
                                                        v.appointmentGuid,
                                                        v.doctorGuid,
                                                        v.patientGuid
                                                      )}
                                                    >
                                                      {t(
                                                        "Patient.AppointmentCompleted.Pending"
                                                      )}
                                                    </a>
                                                    <div className="type-option-canceled">
                                                      {parseInt(
                                                        v.feedbackPendingHours
                                                      )}{" "}
                                                      {t(
                                                        "Patient.AppointmentCompleted.Hours_Pending"
                                                      )}
                                                    </div>
                                                  </>
                                                )}
                                              {v.isFeedbackGiven === false &&
                                                v.feedbackPendingHours ===
                                                  0 && (
                                                  <span className="country">
                                                    {t(
                                                      "Patient.AppointmentCompleted.Expired"
                                                    )}
                                                  </span>
                                                )}
                                            </a>
                                            <Link
                                              className="dropdown-item"
                                              to={`/doctor/book-an-appoinment-doc-detail/${v.doctorGuid}`}
                                            >
                                              {t(
                                                "Patient.ViewDignosticReport.Book_Again"
                                              )}
                                            </Link>
                                            <a className="dropdown-item">
                                              {t(
                                                "Patient.AppointmentCompleted.Invoice_receipt"
                                              )}
                                            </a>
                                          </div>
                                        </div>
                                      </td>
                                      {/* <td>
                                                                        {v.isFeedbackGiven === true &&
                                                                            <a onClick={this.FeedbackViewPopUp.bind(this, v.appointmentGuid)} className="type">{t('Patient.AppointmentCompleted.Given')}</a>
                                                                        }
                                                                        {v.isFeedbackGiven === false && v.feedbackPendingHours > 0 &&
                                                                            <>
                                                                                <a className="status" onClick={this.toggleAppointmentFeedBackPopUp.bind(this, "false", v.appointmentGuid, v.doctorGuid, v.patientGuid)}>{t('Patient.AppointmentCompleted.Pending')}</a>
                                                                                <div className="type-option-canceled">{parseInt(v.feedbackPendingHours)} {t('Patient.AppointmentCompleted.Hours_Pending')}</div>
                                                                            </>
                                                                        }
                                                                        {v.isFeedbackGiven === false && v.feedbackPendingHours === 0 &&
                                                                            <span className="country">{t('Patient.AppointmentCompleted.Expired')}</span>
                                                                        }
                                                                    </td> */}
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan={8} className="empty-list">
                                    {t(
                                      "EmptyListMessages.completed_appointments"
                                    )}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
                        {this.state.AppointmentRequestList.length > 0 && (
                          <div className="my-4 d-flex justify-content-center">
                            <ReactPaginate
                              previousClassName={"arrow"}
                              nextClassName={"arrow"}
                              previousLabel={"<<"}
                              nextLabel={">>"}
                              breakLabel={"..."}
                              pageLinkClassName={"pages"}
                              pageCount={this.state.TotalPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={this.handlePageClick}
                              containerClassName={"pagination"}
                              activeLinkClassName={"active"}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <PatientFooter />
              </div>
            </div>
            {this.state.viewAppointmentFeedBackPopup ? (
              <AppointmentFeedBack
                CloseAppointmentFeedBack={this.toggleAppointmentFeedBackPopUp}
                AppointmentData={this.state.AppointmentData}
              />
            ) : null}
            {this.state.viewRefundPopup ? (
              <AskRefundPopup
                CloseAskRefundPopup={this.ShowRefundPopUp}
                AppoinmentDetails={this.state.RefundAppointmentData}
              />
            ) : null}
            {this.state.FeedbackViewPopup === true &&
              this.state.LoadedFeedBackData === true && (
                <div
                  className="modal pending-feedback"
                  style={{ display: "block" }}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="divForm my-4">
                          <div className="d-flex flex-column text-center">
                            <div className="patient-forget-password-text">
                              <p>
                                {t(
                                  "Patient.AppointmentCompleted.Patient_Feedback"
                                )}
                              </p>
                            </div>
                          </div>
                          <label className="mb-2">
                            {this.state.FeedbackData.patientFirstname}{" "}
                            {this.state.FeedbackData.patientLastName}
                          </label>
                          <div className="search-bar-text-input delete-account-textarea">
                            <label className="form-control">
                              {this.state.FeedbackData.description}
                            </label>
                          </div>
                          <div className="mt-2 mb-5 d-flex align-items-center">
                            <span className="feedback-star-rating-text">
                              {t("Patient.AppointmentCompleted.Star_Rating")}
                            </span>
                            <ReactStars
                              classNames="star-img img-fluid"
                              count={5}
                              size={20}
                              value={this.state.FeedbackData.rating}
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
                          </div>
                          <div className="mt-3 text-center">
                            <button
                              type="button"
                              className="btn pending-feedback-cancel w-25 mx-2"
                              onClick={this.FeedbackViewPopUp.bind(this, "")}
                            >
                              {t("Patient.AppointmentCompleted.Ok")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
)(withTranslation()(PatientAppointmentCompleted));
