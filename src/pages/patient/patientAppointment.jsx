import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import PatientHeader from "./header2";
import PatientLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";

class PatientAppointmentRequestsTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      AppointmentRequestList: [],
      PageSize: 1,
      CurrentPage: 1,
      SearchText: "",
      SortExp: "",
      SortDir: "",
      TotalRecords: 0,
      TotalPages: 0,
      FromDate: new Date(),
      ToDate: "",
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
      appointmentStatuses: [1],
      appointmentTypes: [1, 2, 3],
      fromDate: new Date("08/01/2021"),
      toDate: new Date(),
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
      this.GetDoctorList();
    }
  };

  render() {
    return (
      <div>
        <PatientHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <PatientLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div className="mb-5">
                  <div className="row search-bar my-2">
                    <div className="col-md-5 search-bar-text w-100">
                      Appointment Requests
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="search-bar-text-input col-md-9 top-search">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Appointment, Doctor Name"
                        onChange={this.SearchUpdate.bind(this)}
                        value={this.state.SearchText}
                        onKeyPress={this.handleKeyPress}
                      />
                    </div>
                    <div className="search-bar-text-input col-md-3">
                      <button
                        type="button"
                        className="btn filter-btn"
                        onclick="myFunction()"
                      >
                        <i className="fas fa-filter mx-1"></i>
                        <span>Filter</span>
                      </button>
                      <div id="filter-div" className="filter-container">
                        <div className="row">
                          <div className="col-12">
                            <div className="filter-title">Appointment Type</div>
                            <div className="filter-list"></div>
                            <div className="form-group form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="appoitment-type1"
                              />
                              <label
                                className="form-check-label"
                                for="appoitment-type1"
                              >
                                Emergency
                              </label>
                            </div>
                            <div className="form-group form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="appoitment-type2"
                              />
                              <label
                                className="form-check-label"
                                for="appoitment-type2"
                              >
                                In-Clinic
                              </label>
                            </div>
                            <div className="form-group form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="appoitment-type3"
                              />
                              <label
                                className="form-check-label"
                                for="appoitment-type3"
                              >
                                Online
                              </label>
                            </div>
                            <div className="form-group form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="appoitment-type4"
                              />
                              <label
                                className="form-check-label"
                                for="appoitment-type4"
                              >
                                Chat
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12">
                      <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                          <thead>
                            <tr className="new-patient-table-title">
                              <th rowspan="2">No.</th>
                              <th rowspan="2">Booking ID</th>
                              <th rowspan="2">Patient Name</th>
                              <th>Date</th>
                              <th rowspan="2">Medical Specialty</th>
                              <th rowspan="2">Amount (€)</th>
                              <th rowspan="2">Appointment Type</th>
                              <th rowspan="2">Symptoms</th>
                              <th rowspan="2">Actions</th>
                            </tr>
                            <tr>
                              <th>Time</th>
                            </tr>
                          </thead>
                          {this.state && this.state.LoadedData && (
                            <tbody>
                              {this.state.AppointmentRequestList.length > 0 ? (
                                this.state.AppointmentRequestList.map(
                                  (v, idx) => (
                                    <tr>
                                      <td>{v.bookingId}</td>
                                      <td>{v.bookingId}</td>
                                      <td>
                                        <a className="doctorName">
                                          {v.doctorFirstName} {v.doctorLastName}
                                        </a>
                                      </td>
                                      <td className="dateTime">
                                        {new Date(
                                          v.appointmentDateTime
                                        ).toDateString()}
                                      </td>
                                      <td className="medicalSpecialty">
                                        {v.physicianServices}
                                      </td>
                                      <td className="country">{v.amount}</td>
                                      <td className="type">
                                        {v.appointmentType}
                                      </td>
                                      <td>
                                        <a
                                          className="doctorName"
                                          data-toggle="modal"
                                          data-target=".modify-modal"
                                        >
                                          View
                                        </a>
                                      </td>
                                      <td>
                                        <div className="d-flex justify-content-between booking-btn">
                                          <a
                                            className="btn joinCall mr-2"
                                            role="button"
                                            data-toggle="modal"
                                            data-target=".accept-appointment"
                                          >
                                            Accept
                                          </a>
                                          <a
                                            type="button"
                                            className="btn btn-outline-dark cancel"
                                            data-toggle="modal"
                                            data-target=".reject-appointment"
                                          >
                                            Reject
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <>List is empty</>
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
)(PatientAppointmentRequestsTest);
