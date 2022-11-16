import React from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { isAppointmentNew, promiseWrapper } from "../../utility/common";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import AdminHeader from "./adminHeader";
import AdminFooter from "../patient/footer";
import AdminLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import ViewAppointment from "./../../commonComponent/AppoitmentCalendar/viewAppointment";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AppointmentAcceptPopup from "./../../commonComponent/AppoitmentCalendar/appointmentAcceptPopUp";
import AppointmentRejectPopup from "./../../commonComponent/AppoitmentCalendar/appointmentRejectPopUp";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";

const AdminAppointmentRequests = (props) => {
  const AppTypeList = [
    { id: 1, name: "OnLine" },
    { id: 2, name: "InClinic" },
    { id: 3, name: "Chat" },
    { id: 4, name: "Emergency" },
  ];
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
  const [IsAcceeptPopUp, setIsAcceeptPopUp] = useState(false);
  const [IsRejectPopUp, setIsRejectPopUp] = useState(false);
  const [viewAppointmentPopup, setViewAppointmentPopUp] = useState(false);
  const [appointmentGuid, setAppointmentGuid] = useState("");

  const { t } = props;

  useEffect(() => {
    GetAppointmentRequestList();
  }, []);

  const GetAppointmentRequestList = () => {
    let param = {
      pageSize: Number(PageSize),
      currentPage: Number(CurrentPage),
      search: SearchText,
      sortExp: SortExp,
      sortDir: SortDir,
      patientGuid: null,
      doctorGuid: null,
      appointmentStatuses: [1],
      appointmentTypes: appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: FromDate,
      toDate: ToDate,
    };
    promiseWrapper(props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      const filterList = data.patientAppointments.filter((appointment) =>
        isAppointmentNew(appointment.appointmentDateTime)
      );

      setAppointmentRequestList(filterList);
      setTotalRecords(filterList.length);
      setTotalPages(Math.ceil(filterList.length / PageSize));
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

  const IsAcceeptAppoinment = (appId) => {
    promiseWrapper(props.patientactions.changeAppointmentStatus, {
      appointmentGuid: appId,
      isConfirm: true,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        setIsAcceeptPopUp(true);
        GetAppointmentRequestList();
      } else {
        toast.error(data.data.errorMessage);
      }
    });
  };

  const IsRejectAppoinment = (appId) => {
    promiseWrapper(props.patientactions.changeAppointmentStatus, {
      appointmentGuid: appId,
      isConfirm: false,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        setIsRejectPopUp(true);
        GetAppointmentRequestList();
      } else {
        toast.error(data.data.errorMessage);
      }
    });
  };

  const CloseAcceeptPopup = () => {
    setIsAcceeptPopUp(false);
  };

  const CloseRejectPopup = () => {
    setIsRejectPopUp(false);
  };

  const toggleViewAppointment = (data) => {
    setAppointmentGuid(data);
    setViewAppointmentPopUp(!viewAppointmentPopup);
  };

  const toggleViewAppointmentAction = (data) => {
    if (data === true) {
      IsAcceeptAppoinment(appointmentGuid);
    }
    if (data === false) {
      IsRejectAppoinment(appointmentGuid);
    }

    setAppointmentGuid("");
    setViewAppointmentPopUp(!viewAppointmentPopup);
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
                      Appointment Requests
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
                        buttonClass="selectpicker btn filter-btn"
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
                              <th rowspan="2">Actions</th>
                            </tr>
                            <tr>
                              <th>Time</th>
                            </tr>
                          </thead>
                          {LoadedData && LoadedData && (
                            <tbody>
                              {AppointmentRequestList.length > 0 ? (
                                AppointmentRequestList.map((v, idx) => (
                                  <tr key={idx}>
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
                                    <td className="type">
                                      {v.appointmentType}
                                    </td>
                                    <td>
                                      <a
                                        className="doctorName"
                                        onClick={toggleViewAppointment.bind(
                                          this,
                                          v.appointmentGuid
                                        )}
                                      >
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={8} className="empty-list">
                                    {" "}
                                    Appointment Requests are not available.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
                        {viewAppointmentPopup ? (
                          <ViewAppointment
                            ViewAppointmentAction={toggleViewAppointmentAction}
                            AppointmentGuid={appointmentGuid}
                          />
                        ) : null}
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

              {IsAcceeptPopUp === true && (
                <AppointmentAcceptPopup ClosePopup={CloseAcceeptPopup} />
              )}

              {IsRejectPopUp === true && (
                <AppointmentRejectPopup ClosePopup={CloseRejectPopup} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// class AdminAppointmentRequests extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             LoadedData: false,
//             AppointmentRequestList: [],
//             PageSize: 10,
//             CurrentPage: 1,
//             SearchText: "",
//             SortExp: "",
//             SortDir: "",
//             TotalRecords: 0,
//             TotalPages: 0,
//             appointmentTypes: ["1", "2", "3"],
//             FromDate: null, //new moment().subtract(3, 'months'),
//             ToDate: null, //new Date(),
//             IsAcceeptPopUp: false,
//             IsRejectPopUp: false,
//             viewAppointmentPopup: false,
//             appointmentGuid: ""
//         };
//     }

//     componentDidMount() {
//         this.GetAppointmentRequestList();
//     }

//     GetAppointmentRequestList() {
//         let param = {
//             "pageSize": Number(this.state.PageSize),
//             "currentPage": Number(this.state.CurrentPage),
//             "search": this.state.SearchText,
//             "sortExp": this.state.SortExp,
//             "sortDir": this.state.SortDir,
//             "patientGuid": null,
//             "doctorGuid": null,
//             "appointmentStatuses": [1],
//             "appointmentTypes": this.state.appointmentTypes.map(v => parseInt(v, 10)),
//             "fromDate": this.state.FromDate,
//             "toDate": this.state.ToDate
//         }
//         promiseWrapper(this.props.patientactions.getAppointments, { filter: param }).then((data) => {
//             const filterList = data.patientAppointments.filter(appointment => isAppointmentNew(appointment.appointmentDateTime));
//             this.setState({ AppointmentRequestList: filterList }, () => {
//                 this.setState({ TotalRecords: filterList.length });
//                 this.setState({ TotalPages: Math.ceil(filterList.length / this.state.PageSize) });
//                 this.setState({ LoadedData: true });
//             });
//         });
//     }

//     UpdateFromDate = (e) => {
//         this.setState({ FromDate: e.target.value });
//     }

//     UpdateToDate = (e) => {
//         this.setState({ ToDate: e.target.value });
//     }

//     UpdateFilterType = (e) => {
//         this.setState({ appointmentTypes: e.map(v => parseInt(v, 10)) });
//     }

//     handlePageClick = (data) => {
//         let currentPage = data.selected + 1;
//         this.setState({ CurrentPage: currentPage }, () => {
//             this.GetAppointmentRequestList();
//         });
//     };

//     SearchUpdate = (e) => {
//         this.setState({ SearchText: e.target.value });
//     }

//     handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             this.SearchUpdate(event);
//             this.GetAppointmentRequestList();
//         }
//     }

//     IsAcceeptAppoinment(appId) {
//         promiseWrapper(this.props.patientactions.changeAppointmentStatus, { appointmentGuid: appId, isConfirm: true })
//             .then((data) => {
//                 if (data.data.isSuccess == true) {
//                     this.setState({ IsAcceeptPopUp: true });
//                     this.GetAppointmentRequestList();
//                 }
//                 else {
//                     toast.error(data.data.errorMessage);
//                 }
//             });
//     }

//     IsRejectAppoinment(appId) {
//         promiseWrapper(this.props.patientactions.changeAppointmentStatus, { appointmentGuid: appId, isConfirm: false })
//             .then((data) => {
//                 if (data.data.isSuccess == true) {
//                     this.setState({ IsRejectPopUp: true });
//                     this.GetAppointmentRequestList();
//                 }
//                 else {
//                     toast.error(data.data.errorMessage);
//                 }
//             });

//     }

//     CloseAcceeptPopup() {
//         this.setState({ IsAcceeptPopUp: false });
//     }

//     CloseRejectPopup() {
//         this.setState({ IsRejectPopUp: false });
//     }

//     toggleViewAppointment = (data) => {
//         this.setState({ appointmentGuid: data }, () => {
//             this.setState({
//                 viewAppointmentPopup: !this.state.viewAppointmentPopup
//             });
//         });
//     };

//     toggleViewAppointmentAction = (data) => {
//         if (data === true) {
//             this.IsAcceeptAppoinment(this.state.appointmentGuid);
//         }
//         if (data === false) {
//             this.IsRejectAppoinment(this.state.appointmentGuid);
//         }
//         this.setState({ appointmentGuid: "" }, () => {
//             this.setState({
//                 viewAppointmentPopup: !this.state.viewAppointmentPopup
//             });
//         });
//     };

//     render() {
//         const { t } = this.props;
//         return (
//             <div>
//                 <AdminHeader />
//                 <div className="main">
//                     <div className="container-fluid">
//                         <div className="row">
//                             <AdminLeftPanel />
//                             <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
//                                 <div>
//                                     <div className="row search-bar">
//                                         <div className="py-4 search-bar-text w-100 bg-light">
//                                             Appointment Requests
//                                         </div>
//                                     </div>
//                                     <div className="row my-4">
//                                         <div className="search-bar-text-input col-md-7 top-search">
//                                             <div className="col-lg-4 float-start">
//                                                 <input type="date" max="2100-12-31"
//                                                     className="form-control"
//                                                     onChange={this.UpdateFromDate.bind(this)}
//                                                     value={this.state.FromDate} />
//                                             </div>
//                                             <div className="col-lg-4 float-start">
//                                                 <input type="date" max="2100-12-31"
//                                                     className="form-control"
//                                                     onChange={this.UpdateToDate.bind(this)}
//                                                     value={this.state.ToDate} />
//                                             </div>
//                                             <div className="col-lg-4 float-start">
//                                                 <input type="text"
//                                                     className="form-control"
//                                                     placeholder="Search Appointment, Doctor Name"
//                                                     onChange={this.SearchUpdate.bind(this)}
//                                                     value={this.state.SearchText}
//                                                     onKeyPress={this.handleKeyPress} />
//                                             </div>
//                                         </div>
//                                         <div className="search-bar-text-input col-md-3">
//                                             <DropdownMultiselect
//                                                 selected={this.state.appointmentTypes}
//                                                 buttonClass="selectpicker btn filter-btn"
//                                                 placeholder="Filter"
//                                                 handleOnChange={this.UpdateFilterType.bind(this)}
//                                                 options={AppTypeList}
//                                                 optionKey="id"
//                                                 optionLabel="name" />
//                                         </div>
//                                         <div className="search-bar-text-input col-md-2">
//                                             <button type="button" onClick={this.GetAppointmentRequestList.bind(this)} className="btn filter-btn w-100">Search</button>
//                                         </div>
//                                     </div>
//                                     <div className="row mt-3 d-flex justify-content-center">
//                                         <div className="col-md-12 table-min-height" >
//                                             <div className="tableContainer table-responsive">
//                                                 <table className="table table-bordered appointmentTable">
//                                                     <thead>
//                                                         <tr className="new-patient-table-title">
//                                                             <th rowspan="2">Booking ID</th>
//                                                             <th rowspan="2">Patient Name</th>
//                                                             <th rowspan="2">Doctor Name</th>
//                                                             <th>Date</th>
//                                                             <th rowspan="2">Medical Specialty</th>
//                                                             <th rowspan="2">Amount (€)</th>
//                                                             <th rowspan="2">Appointment Type</th>
//                                                             <th rowspan="2">Actions</th>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>Time</th>
//                                                         </tr>
//                                                     </thead>
//                                                     {this.state && this.state.LoadedData &&
//                                                         <tbody>
//                                                             {this.state.AppointmentRequestList.length > 0 ? this.state.AppointmentRequestList.map((v, idx) => (
//                                                                 <tr key={idx}>
//                                                                     <td>{v.bookingId}</td>
//                                                                     <td><Link className="doctorName" to={`/patient-detail-view/${v.patientGuid}`}>{v.patientFirstName} {v.patientLastName}</Link></td>
//                                                                     <td><Link className="doctorName" to={`/doctor-detail-view/${v.doctorGuid}`}>{v.doctorFirstName} {v.doctorLastName}</Link></td>
//                                                                     <td className="dateTime">{moment(v.appointmentDateTime).format("MM/DD/YYYY")}<br />{moment(v.appointmentDateTime).format("HH:mm")}</td>
//                                                                     <td className="medicalSpecialty">{v.physicianServices}</td>
//                                                                     <td className="country">{v.amount}</td>
//                                                                     <td className="type">{v.appointmentType}</td>
//                                                                     <td><a className="doctorName" onClick={this.toggleViewAppointment.bind(this, v.appointmentGuid)}>View</a></td>
//                                                                 </tr>
//                                                             )) : <tr><td colSpan={8} className="empty-list"> Appointment Requests are not available.</td></tr>}
//                                                         </tbody>
//                                                     }
//                                                 </table>
//                                                 {this.state.viewAppointmentPopup ? <ViewAppointment ViewAppointmentAction={this.toggleViewAppointmentAction} AppointmentGuid={this.state.appointmentGuid} /> : null}
//                                                 {this.state.AppointmentRequestList.length > 0 &&
//                                                     <div className="my-4 d-flex justify-content-center">
//                                                         <ReactPaginate
//                                                             previousClassName={'arrow'}
//                                                             nextClassName={'arrow'}
//                                                             previousLabel={'<<'}
//                                                             nextLabel={'>>'}
//                                                             breakLabel={'...'}
//                                                             pageLinkClassName={'pages'}
//                                                             pageCount={this.state.TotalPages}
//                                                             marginPagesDisplayed={2}
//                                                             pageRangeDisplayed={5}
//                                                             onPageChange={this.handlePageClick}
//                                                             containerClassName={'pagination'}
//                                                             activeLinkClassName={'active'}
//                                                         />
//                                                     </div>
//                                                 }
//                                             </div>
//                                         </div>
//                                         <AdminFooter />
//                                     </div>
//                                 </div>
//                             </div>

//                             {this.state.IsAcceeptPopUp === true &&
//                                 <AppointmentAcceptPopup ClosePopup={this.CloseAcceeptPopup.bind(this)} />
//                             }

//                             {this.state.IsRejectPopUp === true &&
//                                 <AppointmentRejectPopup ClosePopup={this.CloseRejectPopup.bind(this)} />
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
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
)(withTranslation()(AdminAppointmentRequests));
