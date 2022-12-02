import React from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../../redux/exadoDoc/action";
import exadoPatientActions from "../../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { promiseWrapper } from "../../../utility/common";
import { bindActionCreators } from "redux";
import PatientHeader from "../header2";
import PatientFooter from "../footer";
import PatientLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { withTranslation } from "react-i18next";
import WithdrawPopup from "./patientWithdrawPopup";

class MyFinance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WalletBalance: 0,
      LoadedAppointmentData: false,
      PageSize: 5,
      CurrentPage: 1,
      TotalAppointmentRecords: 0,
      TotalAppointmentPages: 0,
      AppointmentRequestList: [],
      withdrawModal: false,
      TotalSpent: 0,
      TotalRefund: 0,
      alertData: "",
      successTimer: null,
    };
  }

  componentDidMount() {
    this.UpdateWalletBalance();
    this.GetAppointmentRequestList();
  }

  getWithdrawSuccessMsg = (success) => {
    this.setState({ alertData: success });
    this.setState({
      successTimer: setTimeout(() => {
        this.setState({ alertData: "" });
      }, 2000),
    });
  };
  GetAppointmentRequestList() {
    let param = {
      pageSize: Number(this.state.PageSize),
      currentPage: Number(this.state.CurrentPage),
      search: "",
      sortExp: "",
      sortDir: "",
      patientGuid: localStorage.getItem("user-id") || "",
      doctorGuid: "",
      appointmentStatuses: [1],
      appointmentTypes: [1],
      fromDate: "", //new moment().subtract(3, 'months'),
      toDate: "", //new Date()
    };
    promiseWrapper(this.props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      this.setState(
        { AppointmentRequestList: data.result.patientAppointments },
        () => {
          this.setState({ TotalAppointmentRecords: data.result.totalRecords });
          this.setState({ TotalAppointmentPages: data.result.totalPages });
          this.setState({ LoadedAppointmentData: true });
        }
      );
    });
  }

  handleAppointmentPageClick = (data) => {
    let currentPage = data.selected + 1;
    this.setState({ CurrentPage: currentPage }, () => {
      this.GetAppointmentRequestList();
    });
  };

  UpdateWalletBalance() {
    promiseWrapper(this.props.patientactions.getPatientFinanceData, {
      patientGuid: localStorage.getItem("user-id"),
    }).then((jsdata) => {
      this.setState({
        WalletBalance: jsdata.result.walletBalance,
        TotalSpent: jsdata.result.totalSpent,
        TotalRefund: jsdata.result.totalRefund,
      });
    });
  }

  setWithDrawModal = () => {
    this.setState({ withdrawModal: !this.state.withdrawModal });
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
                {this.state.alertData && (
                  <div className="alert alert-success mt-3" role="alert">
                    {this.state.alertData}
                  </div>
                )}
                <div className="row my-4">
                  <div className="col-lg-4 col-md-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Patient.MyFinance.Available_Balance")}
                          </div>
                          <div className="text">
                            <button
                              type="button"
                              className="btn py-0 btn-withdraw"
                              onClick={() => this.setWithDrawModal()}
                            >
                              Withdraw
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.WalletBalance}
                          </div>
                          <div className="text">
                            <Link
                              to={"/patient/addfunds"}
                              className="btn py-0 btn-add-funds"
                            >
                              {t("Patient.MyFinance.Add_Funds")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3 col-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Patient.MyFinance.Total_Spent")}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.TotalSpent}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3 col-6 mb-3">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text">
                            {t("Patient.MyFinance.Total_Refund")}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <div className="text text-currency">
                            €{this.state.TotalRefund}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-finance-section">
                  <div className="row search-bar my-3">
                    <div className="col-md-5 search-bar-text">My Finances</div>
                    <div className="col-md-5 search-bar-text-input mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="search"
                        placeholder="Search Booking ID, Patient Name, Date, Domain"
                      />
                    </div>
                    <div className="col-md-2 search-bar-text-input">
                      <input
                        type="text"
                        className="form-control"
                        id="filter"
                        placeholder="Filters"
                      />
                    </div>
                  </div>
                  <div
                    className="mainRightPanelAlert d-flex align-items-center p-3 mb-4"
                    role="alert"
                  >
                    <div>{t("Patient.MyFinance.Add_Fund_Warning")}</div>
                  </div>
                  <div className="tableContainer table-responsive mb-5">
                    <table className="table table-bordered appointmentTable">
                      <thead>
                        <tr>
                          <th rowSpan="2">
                            {t("Patient.MyFinance.Booking_ID")}
                          </th>
                          <th rowSpan="2">
                            {t("Patient.MyFinance.Doctor_Name")}
                          </th>
                          <th>{t("Patient.MyFinance.Date")}</th>
                          <th rowSpan="2">{t("Patient.MyFinance.Domain")}</th>
                          <th rowSpan="2">
                            {t("Patient.MyFinance.Amount_Paid")} (€)
                          </th>
                          <th colSpan="2">
                            {t("Patient.MyFinance.Consultation")}
                          </th>
                          <th rowSpan="2">{t("Patient.MyFinance.Refunded")}</th>
                        </tr>
                        <tr>
                          <th>{t("Patient.MyFinance.Time")}</th>
                          <th>{t("Patient.MyFinance.Type")}</th>
                          <th>{t("Patient.MyFinance.Status")}</th>
                        </tr>
                      </thead>
                      {this.state && this.state.LoadedAppointmentData && (
                        <tbody>
                          {this.state.AppointmentRequestList.length > 0 ? (
                            this.state.AppointmentRequestList.map((v, idx) => (
                              <tr key={idx}>
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
                                <td>{v.amount}</td>
                                <td className="type">{v.appointmentType}</td>
                                <td className="status">
                                  {v.appointmentStatus}
                                </td>
                                <td>NA</td>
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
                    {this.state.AppointmentRequestList.length > 0 && (
                      <div className="my-4 d-flex justify-content-center">
                        <ReactPaginate
                          previousClassName={"arrow"}
                          nextClassName={"arrow"}
                          previousLabel={"<<"}
                          nextLabel={">>"}
                          breakLabel={"..."}
                          pageLinkClassName={"pages"}
                          pageCount={this.state.TotalAppointmentPages}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={this.handleAppointmentPageClick}
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
        {this.state.withdrawModal && (
          <WithdrawPopup
            withdrawModal={this.state.withdrawModal}
            setWithDrawModal={this.setWithDrawModal}
            getWithdrawSuccessMsg={this.getWithdrawSuccessMsg}
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
)(withTranslation()(MyFinance));
