import React, { useEffect, useState } from "react";
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
import { withTranslation } from "react-i18next";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

const AdminAppointmentCompleted = (props) => {
  const [LoadedData, setLoadedData] = useState(false);
  const [AppointmentRequestList, setAppointmentRequestList] = useState([]);
  const [PageSize, setPageSize] = useState(10);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [SearchText, setSearchText] = useState("");
  const [SortExp, setSortExp] = useState("");
  const [SortDir, setSortDir] = useState("");
  const [TotalRecords, setTotalRecords] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);
  const [appointmentTypes, setAppointmentTypes] = useState(["1"]);
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");

  const { t } = props;

  useEffect(() => {
    GetAppointmentRequestList();
  }, [CurrentPage]);

  const GetAppointmentRequestList = () => {
    let param = {
      pageSize: Number(PageSize),
      currentPage: Number(CurrentPage),
      search: SearchText,
      sortExp: SortExp,
      sortDir: SortDir,
      patientGuid: "",
      doctorGuid: "",
      appointmentStatuses: [4],
      appointmentTypes: appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: "",
      toDate: "",
    };
    promiseWrapper(props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      setAppointmentRequestList(data.result.patientAppointments);
      setTotalRecords(data.result.totalRecords);
      setTotalPages(data.result.totalPages);
      setLoadedData(true);
    });
  };

  const UpdateFromDate = (e) => {
    // setState({ FromDate: e.target.value });
    setFromDate(e.target.value);
  };

  const UpdateToDate = (e) => {
    // setState({ ToDate: e.target.value });
    setToDate(e.target.value);
  };

  const UpdateFilterType = (e) => {
    // setState({ appointmentTypes: e.map(v => parseInt(v, 10)) });
    setAppointmentTypes(e.map((v) => parseInt(v, 10)));
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    // setState({ CurrentPage: currentPage }, () => {
    //     GetAppointmentRequestList();
    // });
    setCurrentPage(currentPage);
  };

  const SearchUpdate = (e) => {
    // setState({ SearchText: e.target.value });
    setSearchText(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      SearchUpdate(event);
      GetAppointmentRequestList();
    }
  };

  return (
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
                    Appointment Completed
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
                            <th rowspan="2">Medical Specialty</th>
                            <th rowspan="2">Amount (€)</th>
                            <th rowspan="2">Appointment Type</th>
                            {/* <th rowspan="2">Symptoms</th>
                                                                  <th rowspan="2">Actions</th> */}
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
                                  <td>{v.bookingId}</td>
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
                                  <td className="medicalSpecialty">
                                    {v.physicianServices}
                                  </td>
                                  <td className="country">{v.amount}</td>
                                  <td className="type">{v.appointmentType}</td>
                                  {/* <td><a className="doctorName" data-toggle="modal" data-target=".modify-modal">View</a></td>
                                                                          <td>
                                                                              <div className="d-flex justify-content-between booking-btn">
                                                                                  <a className="btn joinCall mr-2" role="button" data-toggle="modal" data-target=".accept-appointment">Accept</a>
                                                                                  <a type="button" className="btn btn-outline-dark cancel" data-toggle="modal" data-target=".reject-appointment">Reject</a>
                                                                              </div>
                                                                          </td> */}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="empty-list">
                                  {t(
                                    "EmptyListMessages.completed_appointments"
                                  )}
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
                  </div>
                  <AdminFooter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// class AdminAppointmentCompleted extends React.Component {
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
//       ToDate: null, //new Date(),
//     };
//   }

//   componentDidMount() {
//     this.GetAppointmentRequestList();
//   }

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
//     };
//     promiseWrapper(this.props.patientactions.getAppointments, {
//       filter: param,
//     }).then((data) => {
//       this.setState(
//         { AppointmentRequestList: data.patientAppointments },
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
//                       Appointment Completed
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
//                               <th rowspan="2">Medical Specialty</th>
//                               <th rowspan="2">Amount (€)</th>
//                               <th rowspan="2">Appointment Type</th>
//                               {/* <th rowspan="2">Symptoms</th>
//                                                             <th rowspan="2">Actions</th> */}
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
//                                       <td>{v.bookingId}</td>
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
//                                       <td className="medicalSpecialty">
//                                         {v.physicianServices}
//                                       </td>
//                                       <td className="country">{v.amount}</td>
//                                       <td className="type">
//                                         {v.appointmentType}
//                                       </td>
//                                       {/* <td><a className="doctorName" data-toggle="modal" data-target=".modify-modal">View</a></td>
//                                                                     <td>
//                                                                         <div className="d-flex justify-content-between booking-btn">
//                                                                             <a className="btn joinCall mr-2" role="button" data-toggle="modal" data-target=".accept-appointment">Accept</a>
//                                                                             <a type="button" className="btn btn-outline-dark cancel" data-toggle="modal" data-target=".reject-appointment">Reject</a>
//                                                                         </div>
//                                                                     </td> */}
//                                     </tr>
//                                   )
//                                 )
//                               ) : (
//                                 <tr>
//                                   <td colSpan={7} className="empty-list">
//                                     {t(
//                                       "EmptyListMessages.completed_appointments"
//                                     )}
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

const mapStoreToprops = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
};

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AdminAppointmentCompleted));
