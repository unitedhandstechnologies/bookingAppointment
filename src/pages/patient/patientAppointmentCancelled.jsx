import React from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import PatientHeader from "./header2";
import PatientFooter from "./footer";
import PatientLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import moment from "moment";
import { withTranslation } from "react-i18next";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

class PatientAppointmentCancelled extends React.Component {
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
    };
  }

  componentDidMount() {
    this.GetAppointmentRequestList();
  }

  GetAppointmentRequestList() {
    let param = {
      pageSize: Number(this.state.PageSize),
      currentPage: Number(this.state.CurrentPage),
      search: this.state.SearchText,
      sortExp: this.state.SortExp,
      sortDir: this.state.SortDir,
      patientGuid: localStorage.getItem("user-id"),
      doctorGuid: null,
      appointmentStatuses: [3, 5],
      appointmentTypes: this.state.appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: this.state.FromDate,
      toDate: this.state.ToDate,
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
                      {t("Patient.AppointmentCancelled.Appointment_Cancelled")}
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
                            "Patient.AppointmentCancelled.Search_Appointment_Doctor_Name"
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
                        placeholder={t("Patient.AppointmentCancelled.Filter")}
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
                        {t("Patient.AppointmentCancelled.Search")}
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
                                {t("Patient.AppointmentCancelled.Booking_ID")}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCancelled.Doctor_Name")}
                              </th>
                              <th>{t("Patient.AppointmentCancelled.Date")}</th>
                              <th rowspan="2">
                                {t(
                                  "Patient.AppointmentCancelled.Medical_Specialty"
                                )}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCancelled.Amount_(€)")}
                              </th>
                              <th rowspan="2">
                                {t(
                                  "Patient.AppointmentCancelled.Appointment_Type"
                                )}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCancelled.Cancelled_By")}
                              </th>
                              <th rowspan="2">
                                {t("Patient.AppointmentCancelled.Reason")}
                              </th>
                              <th rowspan="2">Suggested Date and Time</th>
                            </tr>
                            <tr>
                              <th>{t("Patient.AppointmentCancelled.Time")}</th>
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
                                          "DD/MM/YYYY"
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
                                      <td className="type">
                                        {v.cancelledByStr}
                                      </td>
                                      <td className="type-option-canceled reason">
                                        {v.cancelReason}
                                      </td>
                                      <td className="type">
                                        {moment(v.suggestedDateTime).format(
                                          "DD/MM/YYYY"
                                        )}{" "}
                                        {moment(v.suggestedDateTime).format(
                                          "HH:mm"
                                        )}
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan={9} className="empty-list">
                                    {t(
                                      "EmptyListMessages.cancelled_appointments"
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
                    <PatientFooter />
                  </div>
                </div>
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
  return { docactions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(PatientAppointmentCancelled));
