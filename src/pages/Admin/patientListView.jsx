import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import exadoAdminActions from "../../redux/exadoAdmin/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import Switch from "react-switch";
import { promiseWrapper } from "../../utility/common";
import AdminHeader from "./adminHeader";
import AdminFooter from "../patient/footer";
import AdminLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import { useEffect } from "react";

const PatientListView = (props) => {
  const [LoadedData, setLoadedData] = useState(false);
  const [PatientList, setPatientList] = useState([]);
  const [PageSize, setPageSize] = useState(10);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [SearchText, setSearchText] = useState("");
  const [SortExp, setSortExp] = useState("");
  const [SortDir, setsortDir] = useState("");
  const [TotalRecords, setTotalRecords] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);

  const { t } = props;

  const GetPatientList = () => {
    let param = {
      pageSize: Number(PageSize),
      currentPage: Number(CurrentPage),
      search: SearchText,
      sortExp: SortExp,
      sortDir: SortDir,
    };
    promiseWrapper(props.actions.getPagedPatientsList, { paging: param }).then(
      (data) => {
        setPatientList(data.result.patientList);
        setTotalRecords(data.result.totalRecords);
        setTotalPages(data.result.totalPages);
        setLoadedData(true);
      }
    );
  };

  useEffect(() => {
    GetPatientList();
  }, [CurrentPage]);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    setCurrentPage(currentPage);
  };

  const changeStatus = (checked, event, id) => {
    let temp = PatientList;
    let checkVar = temp.filter((d) => d.userGuid === id);
    if (checkVar.length > 0) checkVar[0].isActive = checked;
    setPatientList(temp);
    promiseWrapper(props.patientactions.changeStatus, {
      userGuid: id,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        toast.success(data.data.message);
        GetPatientList();
      } else {
        toast.error(data.data.message);
      }
    });
  };

  const SearchUpdate = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      SearchUpdate(event);
      GetPatientList();
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <AdminLeftPanel />
            <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel bg-white">
              <div className="">
                <div className="row search-bar">
                  <div className="py-4 search-bar-text w-100 bg-light">
                    List of Patients
                  </div>
                </div>
                <div className="divForm row admin-list mt-4">
                  <div className="search-bar-text-input mb-4 col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Patient Name, Email, Country"
                      onChange={SearchUpdate}
                      value={SearchText}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="search-bar-text-input mb-4 col-md-3">
                    <input
                      type="button"
                      onClick={GetPatientList}
                      className="btn save-button w-100"
                      value="Search"
                    />
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12 py-3">
                    <div className="tableContainer table-responsive">
                      <table className="table table-bordered appointmentTable">
                        <thead>
                          <tr className="new-patient-table-title">
                            {/* <th>No.</th> */}
                            <th>Patient Name</th>
                            <th>Sex</th>
                            <th>Email ID</th>
                            {/* <th>Domain Name</th> */}
                            <th>Citizenship</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {LoadedData && LoadedData && (
                          <tbody>
                            {PatientList.length > 0 ? (
                              PatientList.map((d, idx) => (
                                <tr>
                                  <td className="textleft">
                                    <Link
                                      className="doctorName"
                                      to={`/patient-detail-view/${d.userGuid}`}
                                    >
                                      {d.firstName} {d.lastName}
                                    </Link>
                                  </td>
                                  <td className="sex">{d.gender}</td>
                                  <td className="email textleft">{d.email}</td>
                                  <td className="country">{d.country}</td>
                                  <td className="admin-switch">
                                    <Switch
                                      id={d.userGuid}
                                      onChange={changeStatus}
                                      checked={d.isActive}
                                      offColor="#bdc1c2"
                                      onColor="#20CAD6"
                                      handleDiameter={15}
                                      width={80}
                                      height={25}
                                      uncheckedIcon={
                                        <div
                                          style={{
                                            fontSize: 13,
                                            color: "white",
                                            position: "absolute",
                                            left: -15,
                                            top: 1,
                                          }}
                                        >
                                          Inactive
                                        </div>
                                      }
                                      checkedIcon={
                                        <div
                                          style={{
                                            fontSize: 13,
                                            color: "white",
                                            position: "absolute",
                                            left: 10,
                                            top: 1,
                                          }}
                                        >
                                          Active
                                        </div>
                                      }
                                    />
                                  </td>
                                  <td>
                                    <Link
                                      className="view-details-link"
                                      to={`/patient-detail-view/${d.userGuid}`}
                                    >
                                      <span className="view-details-icon">
                                        <i className="fas fa-eye"></i>
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6} className="empty-list">
                                  {" "}
                                  {t("EmptyListMessages.appointments_request")}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                      {PatientList.length > 0 && (
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
                </div>
                <AdminFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// class PatientListView extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         LoadedData: false,
//         PatientList: [],
//         PageSize: 10,
//         CurrentPage: 1,
//         SearchText: "",
//         SortExp: "",
//         SortDir: "",
//         TotalRecords: 0,
//         TotalPages: 0,
//       };
//     }

//     componentDidMount() {
//       this.GetPatientList();
//     }

//     GetPatientList() {
//       console.log("abc");
//       let param = {
//         pageSize: Number(this.state.PageSize),
//         currentPage: Number(this.state.CurrentPage),
//         search: this.state.SearchText,
//         sortExp: this.state.SortExp,
//         sortDir: this.state.SortDir,
//       };
//       promiseWrapper(this.props.actions.getPagedPatientsList, {
//         paging: param,
//       }).then((data) => {
//         this.setState({ PatientList: data.patientList }, () => {
//           this.setState({ TotalRecords: data.totalRecords });
//           this.setState({ TotalPages: data.totalPages });
//           this.setState({ LoadedData: true });
//         });
//       });
//     }

//     handlePageClick = (data) => {
//       let currentPage = data.selected + 1;
//       this.setState({ CurrentPage: currentPage }, () => {
//         this.GetPatientList();
//       });
//     };

//     changeStatus = (checked, event, id) => {
//       let temp = this.state.PatientList;
//       let checkVar = temp.filter((d) => d.userGuid === id);
//       if (checkVar.length > 0) checkVar[0].isActive = checked;
//       this.setState({ PatientList: temp });
//       promiseWrapper(this.props.patientactions.changeStatus, {
//         userGuid: id,
//       }).then((data) => {
//         if (data.data.isSuccess == true) {
//           toast.success(data.data.message);
//           //this.GetPatientList();
//         } else {
//           toast.error(data.data.message);
//         }
//       });
//     };

//     SearchUpdate = (e) => {
//       this.setState({ SearchText: e.target.value });
//     };
//     handleKeyPress = (event) => {
//       if (event.key === "Enter") {
//         this.SearchUpdate(event);
//         this.GetPatientList();
//       }
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
//                 <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel bg-white">
//                   <div className="">
//                     <div className="row search-bar">
//                       <div className="py-4 search-bar-text w-100 bg-light">
//                         List of Patients
//                       </div>
//                     </div>
//                     <div className="divForm row admin-list mt-4">
//                       <div className="search-bar-text-input mb-4 col-md-9">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Search Patient Name, Email, Country"
//                           onChange={this.SearchUpdate.bind(this)}
//                           value={this.state.SearchText}
//                           onKeyPress={this.handleKeyPress}
//                         />
//                       </div>
//                       <div className="search-bar-text-input mb-4 col-md-3">
//                         <input
//                           type="button"
//                           onClick={this.GetPatientList.bind(this)}
//                           className="btn save-button w-100"
//                           value="Search"
//                         />
//                       </div>
//                     </div>
//                     <div className="row d-flex justify-content-center">
//                       <div className="col-md-12 py-3">
//                         <div className="tableContainer table-responsive">
//                           <table className="table table-bordered appointmentTable">
//                             <thead>
//                               <tr className="new-patient-table-title">
//                                 {/* <th>No.</th> */}
//                                 <th>Patient Name</th>
//                                 <th>Sex</th>
//                                 <th>Email ID</th>
//                                 {/* <th>Domain Name</th> */}
//                                 <th>Citizenship</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             {this.state && this.state.LoadedData && (
//                               <tbody>
//                                 {this.state.PatientList.length > 0 ? (
//                                   this.state.PatientList.map((d, idx) => (
//                                     <tr>
//                                       <td className="textleft">
//                                         <Link
//                                           className="doctorName"
//                                           to={`/patient-detail-view/${d.userGuid}`}
//                                         >
//                                           {d.firstName} {d.lastName}
//                                         </Link>
//                                       </td>
//                                       <td className="sex">{d.gender}</td>
//                                       <td className="email textleft">
//                                         {d.email}
//                                       </td>
//                                       <td className="country">{d.country}</td>
//                                       <td className="admin-switch">
//                                         <Switch
//                                           id={d.userGuid}
//                                           onChange={this.changeStatus}
//                                           checked={d.isActive}
//                                           offColor="#bdc1c2"
//                                           onColor="#20CAD6"
//                                           handleDiameter={15}
//                                           width={80}
//                                           height={25}
//                                           uncheckedIcon={
//                                             <div
//                                               style={{
//                                                 fontSize: 13,
//                                                 color: "white",
//                                                 position: "absolute",
//                                                 left: -15,
//                                                 top: 1,
//                                               }}
//                                             >
//                                               Inactive
//                                             </div>
//                                           }
//                                           checkedIcon={
//                                             <div
//                                               style={{
//                                                 fontSize: 13,
//                                                 color: "white",
//                                                 position: "absolute",
//                                                 left: 10,
//                                                 top: 1,
//                                               }}
//                                             >
//                                               Active
//                                             </div>
//                                           }
//                                         />
//                                       </td>
//                                       <td>
//                                         <Link
//                                           className="view-details-link"
//                                           to={`/patient-detail-view/${d.userGuid}`}
//                                         >
//                                           <span className="view-details-icon">
//                                             <i className="fas fa-eye"></i>
//                                           </span>
//                                         </Link>
//                                       </td>
//                                     </tr>
//                                   ))
//                                 ) : (
//                                   <tr>
//                                     <td colSpan={6} className="empty-list">
//                                       {" "}
//                                       {t(
//                                         "EmptyListMessages.appointments_request"
//                                       )}
//                                     </td>
//                                   </tr>
//                                 )}
//                               </tbody>
//                             )}
//                           </table>
//                           {this.state.PatientList.length > 0 && (
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
//                     </div>
//                     <AdminFooter />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }

const mapStoreToprops = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(exadoAdminActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { actions, patientactions };
};

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(PatientListView));
