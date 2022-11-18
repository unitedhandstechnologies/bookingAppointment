import React from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import DoctorHeader from "./docHeader";
import DoctorFooter from "./docFooter";
import DoctorLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import moment from "moment";
import { withTranslation } from "react-i18next";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

class DoctorMyFinance extends React.Component {
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
      FromDate: "", //new moment().subtract(3, 'months'),
      ToDate: "", //new Date(),
      TotalEarning: 0,
      TotalOnlineEarning: 0,
      TotalOfflineEarning: 0,
      TotalRefunded: 0,
      TotalPending: 0,
    };
  }

  componentDidMount() {
    this.GetAppointmentRequestList();
    this.UpdateWalletBalance();
  }

  GetAppointmentRequestList() {
    let param = {
      pageSize: Number(this.state.PageSize),
      currentPage: Number(this.state.CurrentPage),
      search: this.state.SearchText,
      sortExp: this.state.SortExp,
      sortDir: this.state.SortDir,
      patientGuid: null,
      doctorGuid: localStorage.getItem("user-id"),
      appointmentStatuses: [1, 2, 3, 4, 5],
      appointmentTypes: this.state.appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: this.state.FromDate || null,
      toDate: this.state.ToDate || null,
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

  UpdateWalletBalance() {
    promiseWrapper(this.props.docactions.getDoctorFinanceData, {
      doctorGuid: localStorage.getItem("user-id"),
    }).then((jsdata) => {
      this.setState({
        TotalEarning: jsdata.totalEarning,
        TotalOnlineEarning: jsdata.totalOnlineEarning,
        TotalOfflineEarning: jsdata.totalOfflineEarning,
        TotalRefunded: jsdata.totalRefunded,
        TotalPending: jsdata.totalPending,
      });
    });
  }

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
                <div className="row my-4">
                  <div className="col-lg-3 col-md-3 col-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Doctor.MyFinance.Total_Earning")}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.TotalEarning}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Doctor.MyFinance.Total_Offline_Earning")}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.TotalOfflineEarning}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Doctor.MyFinance.Total_Online_Earning")}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.TotalOnlineEarning}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Doctor.MyFinance.Total_Refund")}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.TotalRefunded}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Doctor.MyFinance.Total_Pending")}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.TotalPending}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-finance-section">
                  <div className="row search-bar my-3">
                    <div className="col-md-5 search-bar-text">
                      {t("Doctor.MyFinance.My_Finances")}
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
                              "Doctor.DocMyPatients.Search_Appointment_Doctor_Name"
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
                          placeholder={t("Doctor.DocMyPatients.Filter")}
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
                          {t("Doctor.DocMyPatients.Search")}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="tableContainer table-responsive mb-5">
                    <table className="table table-bordered appointmentTable">
                      <thead>
                        <tr>
                          <th rowSpan="2">
                            {t("Doctor.MyFinance.Booking_ID")}
                          </th>
                          <th rowSpan="2">
                            {t("Doctor.MyFinance.Patient_Name")}
                          </th>
                          <th>Date</th>
                          <th rowSpan="2">
                            {t("Doctor.MyFinance.Media_Speciality")}
                          </th>
                          <th colSpan="2">
                            {t("Doctor.MyFinance.Amount_Paid")} (€)
                          </th>
                          <th rowSpan="2">
                            {t("Doctor.MyFinance.Appiontment_Type")}
                          </th>
                          <th rowSpan="2">
                            {t("Doctor.MyFinance.Mode_of_Payment")}
                          </th>
                        </tr>
                        <tr>
                          <th>{t("Doctor.MyFinance.Time")}</th>
                          <th>{t("Doctor.MyFinance.Paid")}</th>
                          <th>{t("Doctor.MyFinance.Status")}</th>
                        </tr>
                      </thead>
                      {this.state && this.state.LoadedData && (
                        <tbody>
                          {this.state.AppointmentRequestList.length > 0 ? (
                            this.state.AppointmentRequestList.map((v, idx) => (
                              <tr key={idx}>
                                <td>{v.bookingId}</td>
                                <td>
                                  <Link
                                    className="doctorName"
                                    to={"/patient-detail-view/" + v.patientGuid}
                                  >
                                    {v.patientFirstName} {v.patientLastName}
                                  </Link>
                                </td>
                                <td className="dateTime">
                                  {moment(v.appointmentDateTime).format(
                                    "MMM DD, YYYY"
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
                                <td className="type">{v.appointmentStatus}</td>
                                <td>{v.appointmentType}</td>
                                <td>{v.isPaidOnline ? "Online" : "Offline"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="empty-list">
                                {t("EmptyListMessages.finance_list")}
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
)(withTranslation()(DoctorMyFinance));
