import React from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../../redux/exadoDoc/action";
import exadoPatientActions from "../../../redux/exadoPatient/action";
import { promiseWrapper } from "../../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import ReactStars from "react-rating-stars-component";
import DoctorHeader from "../docHeader";
import DoctorFooter from "../docFooter";
import DoctorLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import moment from "moment";
import { withTranslation } from "react-i18next";
import GenerateInvoiceForm from "./generateInvoiceForm";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

class DoctorAppointmentCompleted extends React.Component {
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
      appointmentTypes: ["1"],
      FromDate: null, //new moment().subtract(3, 'months'),
      ToDate: null, //new Date(),
      FeedbackViewPopup: false,
      appointmentGuid: "",
      FeedbackData: {},
      generateInvoiceModal: false,
      invoiceGuid: "",
    };
  }

  componentDidMount() {
    this.GetAppointmentRequestList();
  }

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

  GetAppointmentRequestList() {
    let param = {
      pageSize: Number(this.state.PageSize),
      currentPage: Number(this.state.CurrentPage),
      search: this.state.SearchText,
      sortExp: this.state.SortExp,
      sortDir: this.state.SortDir,
      patientGuid: "",
      doctorGuid: localStorage.getItem("user-id") || "",
      appointmentStatuses: [4],
      appointmentTypes: this.state.appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: this.state.FromDate || "",
      toDate: this.state.ToDate || "",
    };
    promiseWrapper(this.props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      this.setState(
        { AppointmentRequestList: data.result.patientAppointments },
        () => {
          this.setState({ TotalRecords: data.result.totalRecords });
          this.setState({ TotalPages: data.result.totalPages });
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

  setGenerateInvoiceModal = (value) =>
    this.setState({ generateInvoiceModal: value });

  render() {
    const { t } = this.props;
    const { generateInvoiceModal } = this.state;
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
                      {t("Doctor.AppointmentCompleted.Appointment_Completed")}
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
                            "Doctor.AppointmentCompleted.Search_Appointment_Doctor_Name"
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
                        buttonClass="selectpicker btn filter-btn"
                        placeholder={t("Doctor.AppointmentCompleted.Filter")}
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
                        {t("Doctor.AppointmentCompleted.Search")}
                      </button>
                    </div>
                  </div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12 table-min-height">
                      <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                          <thead>
                            <tr className="new-patient-table-title">
                              <th rowSpan="2">
                                {t("Doctor.AppointmentCompleted.Booking_ID")}
                              </th>
                              <th rowSpan="2">
                                {t("Doctor.AppointmentCompleted.Patient_Name")}
                              </th>
                              <th>{t("Doctor.AppointmentCompleted.Date")}</th>
                              <th rowSpan="2">
                                {t(
                                  "Doctor.AppointmentCompleted.Medical_Specialty"
                                )}
                              </th>
                              <th rowSpan="2">
                                {t("Doctor.AppointmentCompleted.Amount_(€)")}
                              </th>
                              <th rowSpan="2">
                                {t(
                                  "Doctor.AppointmentCompleted.Appointment_Type"
                                )}
                              </th>
                              <th rowSpan="2">
                                {t("Doctor.AppointmentCompleted.Diagnosis")}
                              </th>
                              <th rowSpan="2">
                                {t("Doctor.AppointmentCompleted.Feedback")}
                              </th>
                              <th rowSpan="2">
                                {t("Doctor.AppointmentCompleted.Action")}
                              </th>
                            </tr>
                            <tr>
                              <th>{t("Doctor.AppointmentCompleted.Time")}</th>
                            </tr>
                          </thead>
                          {this.state && this.state.LoadedData && (
                            <tbody>
                              {this.state.AppointmentRequestList.length > 0 ? (
                                this.state.AppointmentRequestList.map(
                                  (v, idx) => (
                                    <tr key={idx}>
                                      <td>{v.bookingId}</td>
                                      <td>
                                        {v.externalUser ? (
                                          `${v.patientFirstName} ${v.patientLastName}`
                                        ) : (
                                          <Link
                                            className="doctorName"
                                            to={
                                              "/patient-detail-view/" +
                                              v.patientGuid
                                            }
                                          >
                                            {v.patientFirstName}{" "}
                                            {v.patientLastName}
                                          </Link>
                                        )}
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
                                      <td>
                                        <Link
                                          to={`/doc-view-diagnostic/${v.appointmentGuid}`}
                                          className="doctorName"
                                        >
                                          {t(
                                            "Doctor.AppointmentCompleted.View"
                                          )}
                                        </Link>
                                      </td>
                                      <td>
                                        {v.isFeedbackGiven === true && (
                                          <a
                                            onClick={this.FeedbackViewPopUp.bind(
                                              this,
                                              v.appointmentGuid
                                            )}
                                            className="type"
                                          >
                                            {t(
                                              "Doctor.AppointmentCompleted.Given"
                                            )}
                                          </a>
                                        )}
                                        {v.isFeedbackGiven === false &&
                                          v.feedbackPendingHours > 0 && (
                                            <span className="status">
                                              {t(
                                                "Doctor.AppointmentCompleted.Pending"
                                              )}
                                            </span>
                                          )}
                                        {v.isFeedbackGiven === false &&
                                          v.feedbackPendingHours === 0 && (
                                            <span className="country">
                                              {t(
                                                "Doctor.AppointmentCompleted.Expired"
                                              )}
                                            </span>
                                          )}
                                      </td>
                                      <td className="d-flex justify-content-center booking-btn">
                                        {/* <a className="btn joinCall mr-2">Take Call</a> */}
                                        <div className="dropdown">
                                          <button
                                            className="btn btn-outline-dark dropdown-toggle cancel"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                          >
                                            {t(
                                              "Doctor.AppointmentUpComing.Actions"
                                            )}
                                          </button>
                                          <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton"
                                          >
                                            <button
                                              className="dropdown-item"
                                              onClick={() => {
                                                this.setState({
                                                  invoiceGuid:
                                                    v.appointmentGuid,
                                                });
                                                this.setGenerateInvoiceModal(
                                                  true
                                                );
                                              }}
                                            >
                                              {t(
                                                "Doctor.AppointmentCompleted.Generate_Invoice"
                                              )}
                                            </button>
                                            <button className="dropdown-item">
                                              {t(
                                                "Doctor.AppointmentCompleted.View_Invoice"
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan={9} className="empty-list">
                                    {t(
                                      "EmptyListMessages.completed_appointments"
                                    )}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
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
                      </div>
                    </div>
                    <DoctorFooter />
                  </div>
                </div>
              </div>
            </div>
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
                                  "Doctor.AppointmentCompleted.Patient_Feedback"
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
                              {t("Doctor.AppointmentCompleted.Star_Rating")}
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
                              {t("Doctor.AppointmentCompleted.Ok")}
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
        {generateInvoiceModal && (
          <GenerateInvoiceForm
            generateInvoiceModal={generateInvoiceModal}
            t={t}
            appointmentGuid={this.state.invoiceGuid}
            setGenerateInvoiceModal={this.setGenerateInvoiceModal}
          />
        )}
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
)(withTranslation()(DoctorAppointmentCompleted));
