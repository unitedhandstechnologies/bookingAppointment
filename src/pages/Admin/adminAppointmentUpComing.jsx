import React, { useState } from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { isAppointmentNew, promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import AdminHeader from "./adminHeader";
import AdminFooter from "../patient/footer";
import AdminLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import ViewAppointment from "./../../commonComponent/AppoitmentCalendar/viewAppointment";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AppTypeList = [
  { id: 1, name: "OnLine" },
  { id: 2, name: "InClinic" },
  { id: 3, name: "Chat" },
  { id: 4, name: "Emergency" },
];

const AdminAppointmentUpComing = (props) => {
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
  // const [IsAcceeptPopUp, setIsAcceeptPopUp] = useState(false);
  // const [IsRejectPopUp, setIsRejectPopUp] = useState(false);
  const [viewAppointmentPopup, setViewAppointmentPopUp] = useState(false);
  const [appointmentGuid, setAppointmentGuid] = useState("");

  const { t } = props;

  

  const GetAppointmentRequestList = () => {
    let param = {
      pageSize: Number(PageSize),
      currentPage: Number(CurrentPage),
      search: SearchText,
      sortExp: SortExp,
      sortDir: SortDir,
      patientGuid: null,
      doctorGuid: null,
      appointmentStatuses: [2],
      appointmentTypes: appointmentTypes.map((v) => parseInt(v, 10)),
      fromDate: FromDate,
      toDate: ToDate,
    };
    promiseWrapper(props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      const filterList = data.patientAppointments.filter((appointment) =>
        isAppointmentNewUpcomming(
          appointment.appointmentDateTime,
          appointment.appointmentGuid
        )
      );

      setAppointmentRequestList(filterList);
      setTotalRecords(filterList.length);
      setTotalPages(filterList.length / 10);
      setLoadedData(true);
    });
  };

  useState(() => {
    GetAppointmentRequestList();
  }, []);

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

  const toggleViewAppointment = (data) => {
    setAppointmentGuid(data);
    setViewAppointmentPopUp(!viewAppointmentPopup);
  };

  // const IsAcceeptAppoinment = (appId) => {
  //   promiseWrapper(props.patientactions.changeAppointmentStatus, {
  //     appointmentGuid: appId,
  //     isConfirm: true,
  //   }).then((data) => {
  //     if (data.data.isSuccess == true) {
  //       setIsAcceeptPopUp(true);
  //       GetAppointmentRequestList();
  //     } else {
  //       toast.error(data.data.errorMessage);
  //     }
  //   });
  // };

  // const IsRejectAppoinment = (appId) => {
  //   promiseWrapper(props.patientactions.changeAppointmentStatus, {
  //     appointmentGuid: appId,
  //     isConfirm: false,
  //   }).then((data) => {
  //     if (data.data.isSuccess == true) {
  //       setIsRejectPopUp(true);
  //       GetAppointmentRequestList();
  //     } else {
  //       toast.error(data.data.errorMessage);
  //     }
  //   });
  // };

  const toggleViewAppointmentAction = (data) => {
    if (data === true) {
      data.IsAcceeptAppoinment(appointmentGuid);
    }
    if (data === false) {
      data.IsRejectAppoinment(appointmentGuid);
    }
    setAppointmentGuid("");
    setViewAppointmentPopUp(!viewAppointmentPopup);
  };

  const makeAppointmentComplete = (appointmentGuid) => {
    promiseWrapper(props.docactions.markAppointmentAsComplete, {
      appointmentGuid: appointmentGuid,
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const isAppointmentNewUpcomming = (date, appointmentGuid) => {
    const isNew = isAppointmentNew(date, 2);
    if (!isNew) makeAppointmentComplete(appointmentGuid);
    return isNew;
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
                    Appointment Upcoming
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
                            <th rowspan="2">Actions</th>
                          </tr>
                          <tr>
                            <th>Time</th>
                          </tr>
                        </thead>
                        {LoadedData && LoadedData && (
                          <tbody>
                            {AppointmentRequestList.length > 0 ? (
                              AppointmentRequestList.map(
                                (v, idx) => (
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
                                    <td className="type">
                                      {v.appointmentType}
                                    </td>
                                    <td>
                                      <Link
                                        className="doctorName"
                                        onClick={toggleViewAppointment.bind(
                                          this,
                                          v.appointmentGuid
                                        )}
                                      >
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                )
                              )
                            ) : (
                              <tr>
                                <td colSpan={8} className="empty-list">
                                  {t("EmptyListMessages.upcoming_appointments")}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                      {viewAppointmentPopup ? (
                        <ViewAppointment
                          ViewAppointmentAction={
                            toggleViewAppointmentAction
                          }
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
          </div>
        </div>
      </div>
    </div>
  );
};

// class AdminAppointmentUpComing extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         LoadedData: false,
//         AppointmentRequestList: [],
//         PageSize: 10,
//         CurrentPage: 1,
//         SearchText: "",
//         SortExp: "",
//         SortDir: "",
//         TotalRecords: 0,
//         TotalPages: 0,
//         appointmentTypes: ["1", "2", "3"],
//         FromDate: null, //new moment().subtract(3, 'months'),
//         ToDate: null, //new Date(),
//         viewAppointmentPopup: false,
//         appointmentGuid: "",
//       };
//     }
  
//     componentDidMount() {
//       this.GetAppointmentRequestList();
//     }
  
//     GetAppointmentRequestList() {
//       let param = {
//         pageSize: Number(this.state.PageSize),
//         currentPage: Number(this.state.CurrentPage),
//         search: this.state.SearchText,
//         sortExp: this.state.SortExp,
//         sortDir: this.state.SortDir,
//         patientGuid: null,
//         doctorGuid: null,
//         appointmentStatuses: [2],
//         appointmentTypes: this.state.appointmentTypes.map((v) => parseInt(v, 10)),
//         fromDate: this.state.FromDate,
//         toDate: this.state.ToDate,
//       };
//       promiseWrapper(this.props.patientactions.getAppointments, {
//         filter: param,
//       }).then((data) => {
//         const filterList = data.patientAppointments.filter((appointment) =>
//           this.isAppointmentNewUpcomming(
//             appointment.appointmentDateTime,
//             appointment.appointmentGuid
//           )
//         );
//         this.setState({ AppointmentRequestList: filterList }, () => {
//           this.setState({ TotalRecords: filterList.length });
//           this.setState({ TotalPages: filterList.length / 10 });
//           this.setState({ LoadedData: true });
//         });
//       });
//     }
  
//     UpdateFromDate = (e) => {
//       this.setState({ FromDate: e.target.value });
//     };
  
//     UpdateToDate = (e) => {
//       this.setState({ ToDate: e.target.value });
//     };
  
//     UpdateFilterType = (e) => {
//       this.setState({ appointmentTypes: e.map((v) => parseInt(v, 10)) });
//     };
  
//     handlePageClick = (data) => {
//       let currentPage = data.selected + 1;
//       this.setState({ CurrentPage: currentPage }, () => {
//         this.GetAppointmentRequestList();
//       });
//     };
  
//     SearchUpdate = (e) => {
//       this.setState({ SearchText: e.target.value });
//     };
  
//     handleKeyPress = (event) => {
//       if (event.key === "Enter") {
//         this.SearchUpdate(event);
//         this.GetAppointmentRequestList();
//       }
//     };
//     toggleViewAppointment = (data) => {
//       this.setState({ appointmentGuid: data }, () => {
//         this.setState({
//           viewAppointmentPopup: !this.state.viewAppointmentPopup,
//         });
//       });
//     };
  
//     toggleViewAppointmentAction = (data) => {
//       if (data === true) {
//         this.IsAcceeptAppoinment(this.state.appointmentGuid);
//       }
//       if (data === false) {
//         this.IsRejectAppoinment(this.state.appointmentGuid);
//       }
//       this.setState({ appointmentGuid: "" }, () => {
//         this.setState({
//           viewAppointmentPopup: !this.state.viewAppointmentPopup,
//         });
//       });
//     };
  
//     makeAppointmentComplete = (appointmentGuid) => {
//       promiseWrapper(this.props.docactions.markAppointmentAsComplete, {
//         appointmentGuid: appointmentGuid,
//       })
//         .then((data) => console.log(data))
//         .catch((err) => console.log(err));
//     };
  
//     isAppointmentNewUpcomming = (date, appointmentGuid) => {
//       const isNew = isAppointmentNew(date, 2);
//       if (!isNew) this.makeAppointmentComplete(appointmentGuid);
//       return isNew;
//     };
//     render() {
//       const { t } = this.props;
//       return (
//         <div>
//           <AdminHeader />
//           <div className="main">
//             <div className="container-fluid">
//               <div className="row">
//                 <AdminLeftPanel />
//                 <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
//                   <div>
//                     <div className="row search-bar">
//                       <div className="py-4 search-bar-text w-100 bg-light">
//                         Appointment Upcoming
//                       </div>
//                     </div>
//                     <div className="row my-4">
//                       <div className="search-bar-text-input col-md-7 top-search">
//                         <div className="col-lg-4 float-start">
//                           <input
//                             type="date"
//                             max="2100-12-31"
//                             className="form-control"
//                             onChange={this.UpdateFromDate.bind(this)}
//                             value={this.state.FromDate}
//                           />
//                         </div>
//                         <div className="col-lg-4 float-start">
//                           <input
//                             type="date"
//                             max="2100-12-31"
//                             className="form-control"
//                             onChange={this.UpdateToDate.bind(this)}
//                             value={this.state.ToDate}
//                           />
//                         </div>
//                         <div className="col-lg-4 float-start">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search Appointment, Doctor Name"
//                             onChange={this.SearchUpdate.bind(this)}
//                             value={this.state.SearchText}
//                             onKeyPress={this.handleKeyPress}
//                           />
//                         </div>
//                       </div>
//                       <div className="search-bar-text-input col-md-3">
//                         <DropdownMultiselect
//                           selected={this.state.appointmentTypes}
//                           buttonclassName="selectpicker btn filter-btn"
//                           placeholder="Filter"
//                           handleOnChange={this.UpdateFilterType.bind(this)}
//                           options={AppTypeList}
//                           optionKey="id"
//                           optionLabel="name"
//                         />
//                       </div>
//                       <div className="search-bar-text-input col-md-2">
//                         <button
//                           type="button"
//                           onClick={this.GetAppointmentRequestList.bind(this)}
//                           className="btn filter-btn w-100"
//                         >
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                     <div className="row mt-3 d-flex justify-content-center">
//                       <div className="col-md-12 table-min-height">
//                         <div className="tableContainer table-responsive">
//                           <table className="table table-bordered appointmentTable">
//                             <thead>
//                               <tr className="new-patient-table-title">
//                                 <th rowspan="2">Booking ID</th>
//                                 <th rowspan="2">Patient Name</th>
//                                 <th rowspan="2">Doctor Name</th>
//                                 <th>Date</th>
//                                 <th rowspan="2">Medical Specialty</th>
//                                 <th rowspan="2">Amount (€)</th>
//                                 <th rowspan="2">Appointment Type</th>
//                                 <th rowspan="2">Actions</th>
//                               </tr>
//                               <tr>
//                                 <th>Time</th>
//                               </tr>
//                             </thead>
//                             {this.state && this.state.LoadedData && (
//                               <tbody>
//                                 {this.state.AppointmentRequestList.length > 0 ? (
//                                   this.state.AppointmentRequestList.map(
//                                     (v, idx) => (
//                                       <tr>
//                                         <td>{v.bookingId}</td>
//                                         <td>
//                                           <Link
//                                             className="doctorName"
//                                             to={`/patient-detail-view/${v.patientGuid}`}
//                                           >
//                                             {v.patientFirstName}{" "}
//                                             {v.patientLastName}
//                                           </Link>
//                                         </td>
//                                         <td>
//                                           <Link
//                                             className="doctorName"
//                                             to={`/doctor-detail-view/${v.doctorGuid}`}
//                                           >
//                                             {v.doctorFirstName} {v.doctorLastName}
//                                           </Link>
//                                         </td>
//                                         <td className="dateTime">
//                                           {moment(v.appointmentDateTime).format(
//                                             "MM/DD/YYYY"
//                                           )}
//                                           <br />
//                                           {moment(v.appointmentDateTime).format(
//                                             "HH:mm"
//                                           )}
//                                         </td>
//                                         <td className="medicalSpecialty">
//                                           {v.physicianServices}
//                                         </td>
//                                         <td className="country">{v.amount}</td>
//                                         <td className="type">
//                                           {v.appointmentType}
//                                         </td>
//                                         <td>
//                                           <Link
//                                             className="doctorName"
//                                             onClick={this.toggleViewAppointment.bind(
//                                               this,
//                                               v.appointmentGuid
//                                             )}
//                                           >
//                                             View
//                                           </Link>
//                                         </td>
//                                       </tr>
//                                     )
//                                   )
//                                 ) : (
//                                   <tr>
//                                     <td colSpan={8} className="empty-list">
//                                       {t(
//                                         "EmptyListMessages.upcoming_appointments"
//                                       )}
//                                     </td>
//                                   </tr>
//                                 )}
//                               </tbody>
//                             )}
//                           </table>
//                           {this.state.viewAppointmentPopup ? (
//                             <ViewAppointment
//                               ViewAppointmentAction={
//                                 this.toggleViewAppointmentAction
//                               }
//                               AppointmentGuid={this.state.appointmentGuid}
//                             />
//                           ) : null}
//                           {this.state.AppointmentRequestList.length > 0 && (
//                             <div className="my-4 d-flex justify-content-center">
//                               <ReactPaginate
//                                 previousClassName={"arrow"}
//                                 nextClassName={"arrow"}
//                                 previousLabel={"<<"}
//                                 nextLabel={">>"}
//                                 breakLabel={"..."}
//                                 pageLinkClassName={"pages"}
//                                 pageCount={this.state.TotalPages}
//                                 marginPagesDisplayed={2}
//                                 pageRangeDisplayed={5}
//                                 onPageChange={this.handlePageClick}
//                                 containerClassName={"pagination"}
//                                 activeLinkClassName={"active"}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <AdminFooter />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }



const mapStoreToprops=(state, props)=> {
  return {};
}

const mapDispatchToProps=(dispatch)=> {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AdminAppointmentUpComing));
