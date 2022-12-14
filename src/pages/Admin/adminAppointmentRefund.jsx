import React, { useState } from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import AdminHeader from "./adminHeader";
import AdminFooter from "../patient/footer";
import AdminLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import moment from "moment";
import AdminRefundPopup from "./refundPopup";
import { withTranslation } from "react-i18next";
import { useEffect } from "react";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

const AdminAppointmentRefund = (props) => {
  const [LoadedData, setLoadedData] = useState(false);
  const [AppointmentRequestList, setAppointmentRequestList] = useState([]);
  const [PageSize, setPageSize] = useState(10);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [SearchText, setSearchText] = useState("");
  const [SortExp, setSortExp] = useState("");
  const [SortDir, setSortDir] = useState("");
  const [TotalRecords, setTotalRecords] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);
  const [appointmentTypes, setAppointmentTypes] = useState(["1", "2", "3"]);
  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);
  const [viewRefundPopup, setViewRefundPopup] = useState(false);
  const [RefundDetails, setRefundDetails] = useState({
    AppontmentGuid: "",
    RefundGuid: "",
    RefundReason: "",
    RefundAmount: 0,
  });

  const { t } = props;

  useEffect(() => {
    GetAppointmentRequestList();
  }, []);

  const ShowRefundPopUp = (appID, reID, RReason, RAmount) => {
    let tt = {
      AppointmentGuid: appID,
      RefundGuid: reID,
      RefundReason: RReason,
      RefundAmount: RAmount,
    };

    setRefundDetails(tt);
    setViewRefundPopup(!viewRefundPopup);
    GetAppointmentRequestList();
    setLoadedData(true);
  };

  const GetAppointmentRequestList = () => {
    let param = {
      pageSize: Number(PageSize),
      currentPage: Number(CurrentPage),
      search: SearchText,
      sortExp: SortExp,
      sortDir: SortDir,
      patientGuid: null,
      doctorGuid: null,
      appointmentStatuses: [4],
      appointmentTypes: appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: FromDate,
      toDate: ToDate,
      isRequiredRefundData: true,
    };
    promiseWrapper(props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      setAppointmentRequestList(
        data.patientAppointments.filter((t) => t.isApplyForRefund === true)
      );
      setTotalRecords(data.totalRecords);
      setTotalPages(data.totalPages);
      setLoadedData(true);
    });
  };

  const UpdateFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const UpdateToDate = (e) => {
    setToDate(e.target.value);
  };

  const UpdateFilterType = (e) => {
    setAppointmentTypes(e.map((v) => parseInt(v, 10)));
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    setCurrentPage(currentPage);
    GetAppointmentRequestList();
  };

  const SearchUpdate = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      SearchUpdate(event);
      GetAppointmentRequestList();
    }
  };

  return (
    <>
      <div>
        <AdminHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <AdminLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div>
                  <div className="row search-bar">
                    <div className="py-4 search-bar-text w-100 bg-light">
                      Refund Requests
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="search-bar-text-input col-md-7 top-search">
                      <div className="col-lg-4 float-start">
                        <input
                          type="date"
                          max="2100-12-31"
                          className="form-control"
                          onChange={UpdateFromDate}
                          value={FromDate}
                        />
                      </div>
                      <div className="col-lg-4 float-start">
                        <input
                          type="date"
                          max="2100-12-31"
                          className="form-control"
                          onChange={UpdateToDate}
                          value={ToDate}
                        />
                      </div>
                      <div className="col-lg-4 float-start">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Appointment, Doctor Name"
                          onChange={SearchUpdate}
                          value={SearchText}
                          onKeyPress={handleKeyPress}
                        />
                      </div>
                    </div>
                    <div className="search-bar-text-input col-md-3">
                      <DropdownMultiselect
                        selected={appointmentTypes}
                        buttonclassName="selectpicker btn filter-btn"
                        placeholder="Filter"
                        handleOnChange={UpdateFilterType}
                        options={AppTypeList}
                        optionKey="id"
                        optionLabel="name"
                      />
                    </div>
                    <div className="search-bar-text-input col-md-2">
                      <button
                        type="button"
                        onClick={GetAppointmentRequestList}
                        className="btn filter-btn w-100"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-12 table-min-height">
                      <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                          <thead>
                            <tr className="new-patient-table-title">
                              <th rowspan="2">Booking ID</th>
                              <th rowspan="2">Patient Name</th>
                              <th rowspan="2">Doctor Name</th>
                              <th>Date</th>
                              <th rowspan="2">Amount (???)</th>
                              <th rowspan="2">Appointment Type</th>
                              <th rowspan="2">Refund Reason</th>
                              <th rowspan="2">Refund Amount (???)</th>
                              <th rowspan="2">Actions</th>
                            </tr>
                            <tr>
                              <th>Time</th>
                            </tr>
                          </thead>
                          {LoadedData && (
                            <tbody>
                              {AppointmentRequestList.length > 0 ? (
                                AppointmentRequestList.map((v, idx) => (
                                  <tr>
                                    <td className="dateTime">{v.bookingId}</td>
                                    <td>
                                      <Link
                                        className="doctorName"
                                        to={`/patient-detail-view/${v.patientGuid}`}
                                      >
                                        {v.patientFirstName} {v.patientLastName}
                                      </Link>
                                    </td>
                                    <td>
                                      <Link
                                        className="doctorName"
                                        to={`/doctor-detail-view/${v.doctorGuid}`}
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
                                    <td className="country">{v.amount}</td>
                                    <td className="type">
                                      {v.appointmentType}
                                    </td>
                                    <td className="dateTime">
                                      {v.refundDescription}
                                    </td>
                                    <td className="country">
                                      {v.appointmentStatus !== "Refunded"
                                        ? "---"
                                        : v.refundAmount}
                                    </td>
                                    <td>
                                      <div className="d-flex justify-content-between booking-btn">
                                        {v.appointmentStatus !== "Refunded" && (
                                          <a
                                            className="btn joinCall mr-2"
                                            role="button"
                                            onClick={ShowRefundPopUp(
                                              v.appointmentGuid,
                                              v.refundGuid,
                                              v.refundDescription,
                                              v.refundAmount
                                            )}
                                        >
                                            Refund
                                          </a>
                                        )}
                                        {v.appointmentStatus === "Refunded" && (
                                          <a
                                            className="btn joinCall mr-2"
                                            role="button"
                                          >
                                            Refunded
                                          </a>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={9} className="empty-list">
                                    {" "}
                                    {t("EmptyListMessages.refund_requests")}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
                        {AppointmentRequestList.length > 0 && (
                          <div className="my-4 d-flex justify-content-center">
                            <ReactPaginate
                              previousClassName={"arrow"}
                              nextClassName={"arrow"}
                              previousLabel={"<<"}
                              nextLabel={">>"}
                              breakLabel={"..."}
                              pageLinkClassName={"pages"}
                              pageCount={TotalPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={handlePageClick}
                              containerClassName={"pagination"}
                              activeLinkClassName={"active"}
                            />
                          </div>
                        )}
                      </div>
                      {viewRefundPopup ? (
                        <AdminRefundPopup
                          CloseAdminRefundPopup={ShowRefundPopUp}
                          RefundDetails={RefundDetails}
                        />
                      ) : null}
                    </div>
                    <AdminFooter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// class AdminAppointmentRefund extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       LoadedData: false,
//       AppointmentRequestList: [],
//       PageSize: 10,
//       CurrentPage: 1,
//       SearchText: "",
//       SortExp: "",
//       SortDir: "",
//       TotalRecords: 0,
//       TotalPages: 0,
//       appointmentTypes: ["1", "2", "3"],
//       FromDate: null, //new moment().subtract(3, 'months'),
//       ToDate: null,
//       viewRefundPopup: false,
//       RefundDetails: {
//         AppointmentGuid: "",
//         RefundGuid: "",
//         RefundReason: "",
//         RefundAmount: 0,
//       },
//     };
//   }

//   componentDidMount() {
//     this.GetAppointmentRequestList();
//   }

//   ShowRefundPopUp = (appID, reID, RReason, RAmount) => {
//     let tt = {
//       AppointmentGuid: appID,
//       RefundGuid: reID,
//       RefundReason: RReason,
//       RefundAmount: RAmount,
//     };
//     this.setState({ RefundDetails: tt }, () => {
//       this.setState({ viewRefundPopup: !this.state.viewRefundPopup });
//       this.GetAppointmentRequestList();
//       this.setState({ LoadedData: true });
//     });
//   };

//   GetAppointmentRequestList() {
//     let param = {
//       pageSize: Number(this.state.PageSize),
//       currentPage: Number(this.state.CurrentPage),
//       search: this.state.SearchText,
//       sortExp: this.state.SortExp,
//       sortDir: this.state.SortDir,
//       patientGuid: null,
//       doctorGuid: null,
//       appointmentStatuses: [4],
//       appointmentTypes: this.state.appointmentTypes.map((v) => parseInt(v, 10)),
//       fromDate: this.state.FromDate,
//       toDate: this.state.ToDate,
//       isRequiredRefundData: true,
//     };
//     promiseWrapper(this.props.patientactions.getAppointments, {
//       filter: param,
//     }).then((data) => {
//       this.setState(
//         {
//           AppointmentRequestList: data.patientAppointments.filter(
//             (t) => t.isApplyForRefund === true
//           ),
//         },
//         () => {
//           this.setState({ TotalRecords: data.totalRecords });
//           this.setState({ TotalPages: data.totalPages });
//           this.setState({ LoadedData: true });
//         }
//       );
//     });
//   }

//   UpdateFromDate = (e) => {
//     this.setState({ FromDate: e.target.value });
//   };

//   UpdateToDate = (e) => {
//     this.setState({ ToDate: e.target.value });
//   };

//   UpdateFilterType = (e) => {
//     this.setState({ appointmentTypes: e.map((v) => parseInt(v, 10)) });
//   };

//   handlePageClick = (data) => {
//     let currentPage = data.selected + 1;
//     this.setState({ CurrentPage: currentPage }, () => {
//       this.GetAppointmentRequestList();
//     });
//   };

//   SearchUpdate = (e) => {
//     this.setState({ SearchText: e.target.value });
//   };

//   handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       this.SearchUpdate(event);
//       this.GetAppointmentRequestList();
//     }
//   };

//   render() {
//     const { t } = this.props;
//     return (
//       <div>
//         <AdminHeader />
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row">
//               <AdminLeftPanel />
//               <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
//                 <div>
//                   <div className="row search-bar">
//                     <div className="py-4 search-bar-text w-100 bg-light">
//                       Refund Requests
//                     </div>
//                   </div>
//                   <div className="row my-4">
//                     <div className="search-bar-text-input col-md-7 top-search">
//                       <div className="col-lg-4 float-start">
//                         <input
//                           type="date"
//                           max="2100-12-31"
//                           className="form-control"
//                           onChange={this.UpdateFromDate.bind(this)}
//                           value={this.state.FromDate}
//                         />
//                       </div>
//                       <div className="col-lg-4 float-start">
//                         <input
//                           type="date"
//                           max="2100-12-31"
//                           className="form-control"
//                           onChange={this.UpdateToDate.bind(this)}
//                           value={this.state.ToDate}
//                         />
//                       </div>
//                       <div className="col-lg-4 float-start">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Search Appointment, Doctor Name"
//                           onChange={this.SearchUpdate.bind(this)}
//                           value={this.state.SearchText}
//                           onKeyPress={this.handleKeyPress}
//                         />
//                       </div>
//                     </div>
//                     <div className="search-bar-text-input col-md-3">
//                       <DropdownMultiselect
//                         selected={this.state.appointmentTypes}
//                         buttonclassName="selectpicker btn filter-btn"
//                         placeholder="Filter"
//                         handleOnChange={this.UpdateFilterType.bind(this)}
//                         options={AppTypeList}
//                         optionKey="id"
//                         optionLabel="name"
//                       />
//                     </div>
//                     <div className="search-bar-text-input col-md-2">
//                       <button
//                         type="button"
//                         onClick={this.GetAppointmentRequestList.bind(this)}
//                         className="btn filter-btn w-100"
//                       >
//                         Search
//                       </button>
//                     </div>
//                   </div>
//                   <div className="row mt-3 d-flex justify-content-center">
//                     <div className="col-md-12 table-min-height">
//                       <div className="tableContainer table-responsive">
//                         <table className="table table-bordered appointmentTable">
//                           <thead>
//                             <tr className="new-patient-table-title">
//                               <th rowspan="2">Booking ID</th>
//                               <th rowspan="2">Patient Name</th>
//                               <th rowspan="2">Doctor Name</th>
//                               <th>Date</th>
//                               <th rowspan="2">Amount (???)</th>
//                               <th rowspan="2">Appointment Type</th>
//                               <th rowspan="2">Refund Reason</th>
//                               <th rowspan="2">Refund Amount (???)</th>
//                               <th rowspan="2">Actions</th>
//                             </tr>
//                             <tr>
//                               <th>Time</th>
//                             </tr>
//                           </thead>
//                           {this.state && this.state.LoadedData && (
//                             <tbody>
//                               {this.state.AppointmentRequestList.length > 0 ? (
//                                 this.state.AppointmentRequestList.map(
//                                   (v, idx) => (
//                                     <tr>
//                                       <td className="dateTime">
//                                         {v.bookingId}
//                                       </td>
//                                       <td>
//                                         <Link
//                                           className="doctorName"
//                                           to={`/patient-detail-view/${v.patientGuid}`}
//                                         >
//                                           {v.patientFirstName}{" "}
//                                           {v.patientLastName}
//                                         </Link>
//                                       </td>
//                                       <td>
//                                         <Link
//                                           className="doctorName"
//                                           to={`/doctor-detail-view/${v.doctorGuid}`}
//                                         >
//                                           {v.doctorFirstName} {v.doctorLastName}
//                                         </Link>
//                                       </td>
//                                       <td className="dateTime">
//                                         {moment(v.appointmentDateTime).format(
//                                           "MM/DD/YYYY"
//                                         )}
//                                         <br />
//                                         {moment(v.appointmentDateTime).format(
//                                           "HH:mm"
//                                         )}
//                                       </td>
//                                       <td className="country">{v.amount}</td>
//                                       <td className="type">
//                                         {v.appointmentType}
//                                       </td>
//                                       <td className="dateTime">
//                                         {v.refundDescription}
//                                       </td>
//                                       <td className="country">
//                                         {v.appointmentStatus !== "Refunded"
//                                           ? "---"
//                                           : v.refundAmount}
//                                       </td>
//                                       <td>
//                                         <div className="d-flex justify-content-between booking-btn">
//                                           {v.appointmentStatus !==
//                                             "Refunded" && (
//                                             <a
//                                               className="btn joinCall mr-2"
//                                               role="button"
//                                               onClick={this.ShowRefundPopUp.bind(
//                                                 this,
//                                                 v.appointmentGuid,
//                                                 v.refundGuid,
//                                                 v.refundDescription,
//                                                 v.refundAmount
//                                               )}
//                                             >
//                                               Refund
//                                             </a>
//                                           )}
//                                           {v.appointmentStatus ===
//                                             "Refunded" && (
//                                             <a
//                                               className="btn joinCall mr-2"
//                                               role="button"
//                                             >
//                                               Refunded
//                                             </a>
//                                           )}
//                                         </div>
//                                       </td>
//                                     </tr>
//                                   )
//                                 )
//                               ) : (
//                                 <tr>
//                                   <td colSpan={9} className="empty-list">
//                                     {" "}
//                                     {t("EmptyListMessages.refund_requests")}
//                                   </td>
//                                 </tr>
//                               )}
//                             </tbody>
//                           )}
//                         </table>
//                         {this.state.AppointmentRequestList.length > 0 && (
//                           <div className="my-4 d-flex justify-content-center">
//                             <ReactPaginate
//                               previousClassName={"arrow"}
//                               nextClassName={"arrow"}
//                               previousLabel={"<<"}
//                               nextLabel={">>"}
//                               breakLabel={"..."}
//                               pageLinkClassName={"pages"}
//                               pageCount={this.state.TotalPages}
//                               marginPagesDisplayed={2}
//                               pageRangeDisplayed={5}
//                               onPageChange={this.handlePageClick}
//                               containerClassName={"pagination"}
//                               activeLinkClassName={"active"}
//                             />
//                           </div>
//                         )}
//                       </div>
//                       {this.state.viewRefundPopup ? (
//                         <AdminRefundPopup
//                           CloseAdminRefundPopup={this.ShowRefundPopUp}
//                           RefundDetails={this.state.RefundDetails}
//                         />
//                       ) : null}
//                     </div>
//                     <AdminFooter />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const mapStoreToprops=(state, props)=> {
  return {};
}

const mapDispatchToProps=(dispatch)=>{
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AdminAppointmentRefund));
