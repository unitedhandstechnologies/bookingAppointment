import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import exadoAdminActions from "../../redux/exadoAdmin/action";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import ViewAppointment from "./../../commonComponent/AppoitmentCalendar/viewAppointment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { promiseWrapper } from "../../utility/common";
import AdminHeader from "./adminHeader";
import AdminFooter from "../patient/footer";
import AdminLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import moment from "moment";
import AdminDashBoardWithdrawComponent from "./adminDashBoardWithdrawComponent";
import { getUnVerifiedDoctorsList } from "../../redux/exadoAdmin/apiCalls";

const AdminDashboard = (props) => {
  const [VerificationRequestsData, setVerificationRequestsData] = useState([]);
  const [AppointmentRequestList, setAppointmentRequestList] = useState([]);
  const [viewAppointmentPopup, setViewAppointmentPopUp] = useState(false);
  const [appointmentGuid, setAppointmentGuid] = useState("");
  const { t } = props;

  const GetUnVerifiedDoctorsList = () => {
    promiseWrapper(props.adminactions.getUnVerifiedDoctorsList).then(
      (jsdata) => {
        setVerificationRequestsData(jsdata);
      }
    );
  };

  const GetAppointmentRequestList = () => {
    let param = {
      pageSize: 5,
      currentPage: 1,
      search: "",
      sortExp: "",
      sortDir: "",
      patientGuid: null,
      doctorGuid: null,
      appointmentStatuses: [1, 2, 3, 4, 5],
      appointmentTypes: [1, 2, 3],
      fromDate: null, //new moment().subtract(3, 'months'),
      toDate: null, //new Date(),
    };
    promiseWrapper(props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      setAppointmentRequestList(data.patientAppointments);
    });
  };

  useEffect(() => {
    GetAppointmentRequestList();
    GetUnVerifiedDoctorsList();
  }, []);

  const toggleViewAppointment = (data) => {
    setAppointmentGuid(data);

    setViewAppointmentPopUp(!viewAppointmentPopup);
  };

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

  return (
    <div>
      <AdminHeader />
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <AdminLeftPanel />
            <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
              <div className="row mt-3 admin-mainRightPanel">
                <div className="col-md-3 mb-3">
                  <a className="card-links">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-3">
                        <div className="cardHeader">Total Revenue</div>
                        {/* <div className="cardBody">€100.00</div> */}
                        <div className="cardFooter d-flex justify-content-end align-items-end">
                          <div className="footerRight">
                            <i
                              className="fa fa-arrow-circle-right"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a className="card-links">
                    <div className="card card2 mainRightPanelCard">
                      <div className="p-3">
                        <div className="cardHeader">Total Patients</div>
                        {/* <div className="cardBody">100+</div> */}
                        <div className="cardFooter d-flex justify-content-between align-items-end">
                          <div className="footerLeft"></div>
                          <div className="footerRight">
                            <i
                              className="fa fa-arrow-circle-right"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a className="card-links">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-3">
                        <div className="cardHeader">Total Doctors</div>
                        {/* <div className="cardBody">100+</div> */}
                        <div className="cardFooter d-flex justify-content-between align-items-end">
                          <div className="footerLeft"></div>
                          <div className="footerRight">
                            <i
                              className="fa fa-arrow-circle-right"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a className="card-links">
                    <div className="card card1 mainRightPanelCard">
                      <div className="p-3">
                        <div className="cardHeader">Total Sessions</div>
                        {/* <div className="cardBody">100+</div> */}
                        <div className="cardFooter d-flex justify-content-between mb-3">
                          <div className="footerLeft"></div>
                          <div className="footerRight">
                            <i
                              className="fa fa-arrow-circle-right"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row d-flex justify-content-center bg-white">
                <div className="col-md-12">
                  <div className="tableHeading d-flex justify-content-between my-3">
                    <div className="admin-headingLeft">
                      <div>Verification Requests</div>
                    </div>
                    <div className="headingRight">{/* <a>View All</a> */}</div>
                  </div>
                  <div className="tableContainer table-responsive">
                    <table className="table table-bordered appointmentTable">
                      <thead>
                        <tr className="new-patient-table-title">
                          <th>No.</th>
                          <th>Doctor Name</th>
                          <th>Sex</th>
                          <th>Mobile Number</th>
                          <th>Email ID</th>
                          <th>Country</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {VerificationRequestsData.length > 0 ? (
                          VerificationRequestsData.map((d, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                <Link
                                  className="doctorName"
                                  to={`/admin-verification-request/${d.userGuid}`}
                                >
                                  {d.firstName} {d.lastName}
                                </Link>
                              </td>
                              <td className="sex">{d.gender}</td>
                              <td className="mobile">{d.phone}</td>
                              <td className="email">{d.email}</td>
                              <td className="country">{d.country}</td>
                              <td className="profileVerificationStatus">
                                {d.profileVerificationStatus}
                              </td>
                              <td>
                                <Link
                                  to={`/admin-verification-request/${d.userGuid}`}
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
                            <td colSpan={8} className="empty-list">
                              {t("EmptyListMessages.verification_request")}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row mt-3 d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="tableHeading d-flex justify-content-between my-3">
                    <div className="headingLeft">
                      <div>Appointments</div>
                    </div>
                    <div className="headingRight">
                      <Link to="/admin-appointment-requests">View All</Link>
                    </div>
                  </div>
                  <div className="tableContainer table-responsive">
                    <table className="table table-bordered appointmentTable">
                      <thead>
                        <tr>
                          <th rowSpan="2">Booking ID</th>
                          <th rowSpan="2">Patient Name</th>
                          <th rowSpan="2">Doctor Name</th>
                          <th>Date</th>
                          <th rowSpan="2">Medical Specialty</th>
                          <th rowSpan="2">Appointment Type</th>
                          <th rowSpan="2">Cost</th>
                          <th rowSpan="2">Status</th>
                          <th rowSpan="2">View</th>
                        </tr>
                        <tr>
                          <th>Time</th>
                        </tr>
                      </thead>
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
                                {moment(v.appointmentDateTime).format("HH:mm")}
                              </td>
                              <td className="medicalSpecialty">
                                {v.physicianServices}
                              </td>
                              <td className="medicalSpecialty">
                                {v.appointmentType}
                              </td>
                              <td className="medicalSpecialty">{v.amount}</td>
                              <td className="status">{v.appointmentStatus}</td>
                              <td>
                                <a
                                  onClick={()=>toggleViewAppointment(v.appointmentGuid)}
                                    
                                  className="view-details-link"
                                >
                                  <span className="view-details-icon">
                                    <i className="fas fa-eye"></i>
                                  </span>
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={9} className="empty-list">
                              {t("EmptyListMessages.appointments_request")}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {viewAppointmentPopup ? (
                    <ViewAppointment
                      ViewAppointmentAction={toggleViewAppointmentAction}
                      AppointmentGuid={appointmentGuid}
                    />
                  ) : null}
                </div>
              </div>

              {/* <div className="row mt-3 d-flex justify-content-center">
                                    <div className="col-md-12">
                                        <div className="tableHeading d-flex justify-content-between my-3">
                                            <div className="admin-headingLeft">
                                                <div>New Patient SignUp</div>
                                            </div>
                                            <div className="headingRight">
                                                <a>View All</a>
                                            </div>
                                        </div>
                                        <div className="tableContainer table-responsive">
                                            <table className="table table-bordered appointmentTable">
                                                <thead>
                                                    <tr className="new-patient-table-title">
                                                        <th>No.</th>
                                                        <th>Patient Name</th>
                                                        <th>Sex</th>
                                                        <th>Mobile Number</th>
                                                        <th>Email ID</th>
                                                        <th>Date of Birth</th>
                                                        <th>Citizenship</th>
                                                        <th>View</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>001</td>
                                                        <td><a className="doctorName">John Doe</a></td>
                                                        <td className="sex">Male</td>
                                                        <td className="mobile">+1 - 987 (654) 3210</td>
                                                        <td className="email">Username@gmail.com</td>
                                                        <td className="dob">Day / Month / Year</td>
                                                        <td className="country">United States</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td><a className="doctorName">John Doe</a></td>
                                                        <td className="sex">Male</td>
                                                        <td className="mobile">+1 - 987 (654) 3210</td>
                                                        <td className="email">Username@gmail.com</td>
                                                        <td className="dob">Day / Month / Year</td>
                                                        <td className="country">United States</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td><a className="doctorName">John Doe</a></td>
                                                        <td className="sex">Male</td>
                                                        <td className="mobile">+1 - 987 (654) 3210</td>
                                                        <td className="email">Username@gmail.com</td>
                                                        <td className="dob">Day / Month / Year</td>
                                                        <td className="country">United States</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row mt-3 d-flex justify-content-center">
                                    <div className="col-md-12">
                                        <div className="tableHeading d-flex justify-content-between my-3">
                                            <div className="headingLeft">
                                                <div>Emergency Consultations</div>
                                            </div>
                                            <div className="headingRight">
                                                <a>View All</a>
                                            </div>
                                        </div>
                                        <div className="tableContainer table-responsive">
                                            <table className="table table-bordered appointmentTable">
                                                <thead>
                                                    <tr>
                                                        <th rowSpan="2">No.</th>
                                                        <th rowSpan="2">Booking ID</th>
                                                        <th rowSpan="2">Patient Name</th>
                                                        <th rowSpan="2">Doctor Name</th>
                                                        <th>Date</th>
                                                        <th rowSpan="2">Medical Specialty</th>
                                                        <th rowSpan="2">Cost</th>
                                                        <th rowSpan="2">Status</th>
                                                        <th rowSpan="2">View</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a><div className="doctorName">John Doe</div></a><div className="patient-name">Male, 25</div></td>
                                                        <td><a className="doctorName">John Doe</a></td>
                                                        <td className="dateTime">April 21, 2020 07:01 AM</td>
                                                        <td className="medicalSpecialty">Dentist</td>
                                                        <td className="medicalSpecialty">20$</td>
                                                        <td className="status">In Progress</td>

                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
                                                        <td>-</td>
                                                        <td className="dateTime">April 21, 2020 07:01 AM</td>
                                                        <td className="medicalSpecialty">Dentist</td>
                                                        <td className="medicalSpecialty">20$</td>
                                                        <td className="status">Not Accepted</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
                                                        <td>-</td>
                                                        <td className="dateTime">April 21, 2020 07:01 AM</td>
                                                        <td className="medicalSpecialty">Dentist</td>
                                                        <td className="medicalSpecialty">20$</td>
                                                        <td>
                                                            <div className="status">
                                                                Pending
                                                </div>
                                                            <div className="doctor-timer">01:32 left</div>
                                                        </td>

                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> */}
              {/* <div className="row mt-3 d-flex justify-content-center mb-5">
                                    <div className="col-md-6">
                                        <div className="tableHeading d-flex justify-content-between my-3">
                                            <div className="admin-headingLeft">
                                                <div>Withdrawal Requests</div>
                                            </div>
                                            <div className="headingRight">
                                                <a>View All</a>
                                            </div>
                                        </div>
                                        <div className="tableContainer table-responsive">
                                            <table className="table table-bordered appointmentTable">
                                                <thead>
                                                    <tr className="new-patient-table-title">
                                                        <th>No.</th>
                                                        <th>Booking ID</th>
                                                        <th>Patient Name</th>
                                                        <th>Withdrawal Amount</th>
                                                        <th>View</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a><div className="doctorName">John Doe</div></a><div className="patient-name">Male, 25</div></td>
                                                        <td className="medicalSpecialty">20$</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
                                                        <td className="medicalSpecialty">20$</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
                                                        <td className="medicalSpecialty">20$</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="tableHeading d-flex justify-content-between my-3">
                                            <div className="admin-headingLeft">
                                                <div>Refund Request</div>
                                            </div>
                                            <div className="headingRight">
                                                <a>View All</a>
                                            </div>
                                        </div>
                                        <div className="tableContainer table-responsive">
                                            <table className="table table-bordered appointmentTable">
                                                <thead>
                                                    <tr className="new-patient-table-title">
                                                        <th>No.</th>
                                                        <th>Ticket ID</th>
                                                        <th>Patient Name</th>
                                                        <th>Reason</th>
                                                        <th>View</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a><div className="doctorName">John Doe</div></a><div className="patient-name">Male, 25</div></td>
                                                        <td className="reason">Misbehave</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
                                                        <td className="reason">Misbehave</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>#IDXXXXXXXX</td>
                                                        <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
                                                        <td className="reason">Misbehave</td>
                                                        <td>
                                                            <a href="admin-view-details.html" className="view-details-link">
                                                                <span className="view-details-icon">
                                                                    <i className="fas fa-eye"></i>
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> */}
              <div className="row mt-3 d-flex justify-content-center mb-5">
                <AdminDashBoardWithdrawComponent />
              </div>
              <AdminFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// class AdminDashboard extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           VerificationRequestsData: [],
//           AppointmentRequestList: [],
//           viewAppointmentPopup: false,
//           appointmentGuid: ""
//       };
//   }

//   componentDidMount() {
//       this.GetAppointmentRequestList();
//       this.GetUnVerifiedDoctorsList();
//   }

//   GetUnVerifiedDoctorsList() {
//       promiseWrapper(this.props.adminactions.getUnVerifiedDoctorsList).then((jsdata) => {
//           this.setState({ VerificationRequestsData: jsdata });
//       });
//   }

//   GetAppointmentRequestList() {
//       let param = {
//           "pageSize": 5,
//           "currentPage": 1,
//           "search": "",
//           "sortExp": "",
//           "sortDir": "",
//           "patientGuid": null,
//           "doctorGuid": null,
//           "appointmentStatuses": [1, 2, 3, 4, 5],
//           "appointmentTypes": [1, 2, 3],
//           "fromDate": null, //new moment().subtract(3, 'months'),
//           "toDate": null //new Date(),
//       }
//       promiseWrapper(this.props.patientactions.getAppointments, { filter: param }).then((data) => {
//           this.setState({ AppointmentRequestList: data.patientAppointments });
//       });
//   }

//   toggleViewAppointment = (data) => {
//       this.setState({ appointmentGuid: data }, () => {
//           this.setState({
//               viewAppointmentPopup: !this.state.viewAppointmentPopup
//           });
//       });
//   };

//   toggleViewAppointmentAction = (data) => {
//       if (data === true) {
//           this.IsAcceeptAppoinment(this.state.appointmentGuid);
//       }
//       if (data === false) {
//           this.IsRejectAppoinment(this.state.appointmentGuid);
//       }
//       this.setState({ appointmentGuid: "" }, () => {
//           this.setState({
//               viewAppointmentPopup: !this.state.viewAppointmentPopup
//           });
//       });
//   };

//   render() {
//       const { t } = this.props;
//       return (
//           <div>
//               <AdminHeader />
//               <div className="main">
//                   <div className="container-fluid">
//                       <div className="row">
//                           <AdminLeftPanel />
//                           <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
//                               <div className="row mt-3 admin-mainRightPanel">
//                                   <div className="col-md-3 mb-3">
//                                       <a className="card-links">
//                                           <div className="card card1 mainRightPanelCard">
//                                               <div className="p-3">
//                                                   <div className="cardHeader">Total Revenue</div>
//                                                   {/* <div className="cardBody">€100.00</div> */}
//                                                   <div className="cardFooter d-flex justify-content-end align-items-end">
//                                                       <div className="footerRight">
//                                                           <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
//                                                       </div>
//                                                   </div>
//                                               </div>
//                                           </div>
//                                       </a>
//                                   </div>
//                                   <div className="col-md-3 mb-3">
//                                       <a className="card-links">
//                                           <div className="card card2 mainRightPanelCard">
//                                               <div className="p-3">
//                                                   <div className="cardHeader">Total Patients</div>
//                                                   {/* <div className="cardBody">100+</div> */}
//                                                   <div className="cardFooter d-flex justify-content-between align-items-end">
//                                                       <div className="footerLeft"></div>
//                                                       <div className="footerRight">
//                                                           <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
//                                                       </div>
//                                                   </div>
//                                               </div>
//                                           </div>
//                                       </a>
//                                   </div>
//                                   <div className="col-md-3 mb-3">
//                                       <a className="card-links">
//                                           <div className="card card1 mainRightPanelCard">
//                                               <div className="p-3">
//                                                   <div className="cardHeader">Total Doctors</div>
//                                                   {/* <div className="cardBody">100+</div> */}
//                                                   <div className="cardFooter d-flex justify-content-between align-items-end">
//                                                       <div className="footerLeft"></div>
//                                                       <div className="footerRight">
//                                                           <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
//                                                       </div>
//                                                   </div>
//                                               </div>
//                                           </div>
//                                       </a>
//                                   </div>
//                                   <div className="col-md-3 mb-3">
//                                       <a className="card-links">
//                                           <div className="card card1 mainRightPanelCard">
//                                               <div className="p-3">
//                                                   <div className="cardHeader">Total Sessions</div>
//                                                   {/* <div className="cardBody">100+</div> */}
//                                                   <div className="cardFooter d-flex justify-content-between mb-3">
//                                                       <div className="footerLeft"></div>
//                                                       <div className="footerRight">
//                                                           <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
//                                                       </div>
//                                                   </div>
//                                               </div>
//                                           </div>
//                                       </a>
//                                   </div>
//                               </div>
//                               <div className="row d-flex justify-content-center bg-white">
//                                   <div className="col-md-12">
//                                       <div className="tableHeading d-flex justify-content-between my-3">
//                                           <div className="admin-headingLeft">
//                                               <div>Verification Requests</div>
//                                           </div>
//                                           <div className="headingRight">
//                                               {/* <a>View All</a> */}
//                                           </div>
//                                       </div>
//                                       <div className="tableContainer table-responsive">
//                                           <table className="table table-bordered appointmentTable">
//                                               <thead>
//                                                   <tr className="new-patient-table-title">
//                                                       <th>No.</th>
//                                                       <th>Doctor Name</th>
//                                                       <th>Sex</th>
//                                                       <th>Mobile Number</th>
//                                                       <th>Email ID</th>
//                                                       <th>Country</th>
//                                                       <th>Status</th>
//                                                       <th>Action</th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   {this.state.VerificationRequestsData.length > 0 ? this.state.VerificationRequestsData.map((d, idx) => (
//                                                       <tr key={idx}>
//                                                           <td>{idx + 1}</td>
//                                                           <td>
//                                                               <Link className="doctorName" to={`/admin-verification-request/${d.userGuid}`}>
//                                                                   {d.firstName} {d.lastName}
//                                                               </Link>
//                                                           </td>
//                                                           <td className="sex">{d.gender}</td>
//                                                           <td className="mobile">{d.phone}</td>
//                                                           <td className="email">{d.email}</td>
//                                                           <td className="country">{d.country}</td>
//                                                           <td className="profileVerificationStatus">{d.profileVerificationStatus}</td>
//                                                           <td>
//                                                               <Link to={`/admin-verification-request/${d.userGuid}`}>
//                                                                   <span className="view-details-icon">
//                                                                       <i className="fas fa-eye"></i>
//                                                                   </span>
//                                                               </Link>
//                                                           </td>
//                                                       </tr>
//                                                   )) :<tr>
//                                                       <td colSpan={8} className="empty-list">{t("EmptyListMessages.verification_request")}</td>
//                                                   </tr> }
//                                               </tbody>
//                                           </table>
//                                       </div>
//                                   </div>
//                               </div>
//                               <div className="row mt-3 d-flex justify-content-center">
//                                   <div className="col-md-12">
//                                       <div className="tableHeading d-flex justify-content-between my-3">
//                                           <div className="headingLeft">
//                                               <div>Appointments</div>
//                                           </div>
//                                           <div className="headingRight">
//                                               <Link to="/admin-appointment-requests">View All</Link>
//                                           </div>
//                                       </div>
//                                       <div className="tableContainer table-responsive">
//                                           <table className="table table-bordered appointmentTable">
//                                               <thead>
//                                                   <tr>
//                                                       <th rowSpan="2">Booking ID</th>
//                                                       <th rowSpan="2">Patient Name</th>
//                                                       <th rowSpan="2">Doctor Name</th>
//                                                       <th>Date</th>
//                                                       <th rowSpan="2">Medical Specialty</th>
//                                                       <th rowSpan="2">Appointment Type</th>
//                                                       <th rowSpan="2">Cost</th>
//                                                       <th rowSpan="2">Status</th>
//                                                       <th rowSpan="2">View</th>
//                                                   </tr>
//                                                   <tr>
//                                                       <th>Time</th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   {this.state.AppointmentRequestList.length > 0 ? this.state.AppointmentRequestList.map((v, idx) => (
//                                                       <tr key={idx}>
//                                                           <td>{v.bookingId}</td>
//                                                           <td><Link className="doctorName" to={`/patient-detail-view/${v.patientGuid}`}>{v.patientFirstName} {v.patientLastName}</Link></td>
//                                                           <td><Link className="doctorName" to={`/doctor-detail-view/${v.doctorGuid}`}>{v.doctorFirstName} {v.doctorLastName}</Link></td>
//                                                           <td className="dateTime">{moment(v.appointmentDateTime).format("MM/DD/YYYY")}<br />{moment(v.appointmentDateTime).format("HH:mm")}</td>
//                                                           <td className="medicalSpecialty">{v.physicianServices}</td>
//                                                           <td className="medicalSpecialty">{v.appointmentType}</td>
//                                                           <td className="medicalSpecialty">{v.amount}</td>
//                                                           <td className="status">{v.appointmentStatus}</td>
//                                                           <td>
//                                                               <a onClick={this.toggleViewAppointment.bind(this, v.appointmentGuid)} className="view-details-link">
//                                                                   <span className="view-details-icon">
//                                                                       <i className="fas fa-eye"></i>
//                                                                   </span>
//                                                               </a>
//                                                           </td>
//                                                       </tr>
//                                                   )) : <tr><td colSpan={9} className="empty-list">{t("EmptyListMessages.appointments_request")}</td></tr>}
//                                               </tbody>
//                                           </table>
//                                       </div>
//                                       {this.state.viewAppointmentPopup ? <ViewAppointment ViewAppointmentAction={this.toggleViewAppointmentAction} AppointmentGuid={this.state.appointmentGuid} /> : null}
//                                   </div>
//                               </div>

//                               {/* <div className="row mt-3 d-flex justify-content-center">
//                                   <div className="col-md-12">
//                                       <div className="tableHeading d-flex justify-content-between my-3">
//                                           <div className="admin-headingLeft">
//                                               <div>New Patient SignUp</div>
//                                           </div>
//                                           <div className="headingRight">
//                                               <a>View All</a>
//                                           </div>
//                                       </div>
//                                       <div className="tableContainer table-responsive">
//                                           <table className="table table-bordered appointmentTable">
//                                               <thead>
//                                                   <tr className="new-patient-table-title">
//                                                       <th>No.</th>
//                                                       <th>Patient Name</th>
//                                                       <th>Sex</th>
//                                                       <th>Mobile Number</th>
//                                                       <th>Email ID</th>
//                                                       <th>Date of Birth</th>
//                                                       <th>Citizenship</th>
//                                                       <th>View</th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td><a className="doctorName">John Doe</a></td>
//                                                       <td className="sex">Male</td>
//                                                       <td className="mobile">+1 - 987 (654) 3210</td>
//                                                       <td className="email">Username@gmail.com</td>
//                                                       <td className="dob">Day / Month / Year</td>
//                                                       <td className="country">United States</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td><a className="doctorName">John Doe</a></td>
//                                                       <td className="sex">Male</td>
//                                                       <td className="mobile">+1 - 987 (654) 3210</td>
//                                                       <td className="email">Username@gmail.com</td>
//                                                       <td className="dob">Day / Month / Year</td>
//                                                       <td className="country">United States</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td><a className="doctorName">John Doe</a></td>
//                                                       <td className="sex">Male</td>
//                                                       <td className="mobile">+1 - 987 (654) 3210</td>
//                                                       <td className="email">Username@gmail.com</td>
//                                                       <td className="dob">Day / Month / Year</td>
//                                                       <td className="country">United States</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                               </tbody>
//                                           </table>
//                                       </div>
//                                   </div>
//                               </div>
                              
//                               <div className="row mt-3 d-flex justify-content-center">
//                                   <div className="col-md-12">
//                                       <div className="tableHeading d-flex justify-content-between my-3">
//                                           <div className="headingLeft">
//                                               <div>Emergency Consultations</div>
//                                           </div>
//                                           <div className="headingRight">
//                                               <a>View All</a>
//                                           </div>
//                                       </div>
//                                       <div className="tableContainer table-responsive">
//                                           <table className="table table-bordered appointmentTable">
//                                               <thead>
//                                                   <tr>
//                                                       <th rowSpan="2">No.</th>
//                                                       <th rowSpan="2">Booking ID</th>
//                                                       <th rowSpan="2">Patient Name</th>
//                                                       <th rowSpan="2">Doctor Name</th>
//                                                       <th>Date</th>
//                                                       <th rowSpan="2">Medical Specialty</th>
//                                                       <th rowSpan="2">Cost</th>
//                                                       <th rowSpan="2">Status</th>
//                                                       <th rowSpan="2">View</th>
//                                                   </tr>
//                                                   <tr>
//                                                       <th>Time</th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a><div className="doctorName">John Doe</div></a><div className="patient-name">Male, 25</div></td>
//                                                       <td><a className="doctorName">John Doe</a></td>
//                                                       <td className="dateTime">April 21, 2020 07:01 AM</td>
//                                                       <td className="medicalSpecialty">Dentist</td>
//                                                       <td className="medicalSpecialty">20$</td>
//                                                       <td className="status">In Progress</td>

//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
//                                                       <td>-</td>
//                                                       <td className="dateTime">April 21, 2020 07:01 AM</td>
//                                                       <td className="medicalSpecialty">Dentist</td>
//                                                       <td className="medicalSpecialty">20$</td>
//                                                       <td className="status">Not Accepted</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
//                                                       <td>-</td>
//                                                       <td className="dateTime">April 21, 2020 07:01 AM</td>
//                                                       <td className="medicalSpecialty">Dentist</td>
//                                                       <td className="medicalSpecialty">20$</td>
//                                                       <td>
//                                                           <div className="status">
//                                                               Pending
//                                               </div>
//                                                           <div className="doctor-timer">01:32 left</div>
//                                                       </td>

//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                               </tbody>
//                                           </table>
//                                       </div>
//                                   </div>
//                               </div> */}
//                               {/* <div className="row mt-3 d-flex justify-content-center mb-5">
//                                   <div className="col-md-6">
//                                       <div className="tableHeading d-flex justify-content-between my-3">
//                                           <div className="admin-headingLeft">
//                                               <div>Withdrawal Requests</div>
//                                           </div>
//                                           <div className="headingRight">
//                                               <a>View All</a>
//                                           </div>
//                                       </div>
//                                       <div className="tableContainer table-responsive">
//                                           <table className="table table-bordered appointmentTable">
//                                               <thead>
//                                                   <tr className="new-patient-table-title">
//                                                       <th>No.</th>
//                                                       <th>Booking ID</th>
//                                                       <th>Patient Name</th>
//                                                       <th>Withdrawal Amount</th>
//                                                       <th>View</th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a><div className="doctorName">John Doe</div></a><div className="patient-name">Male, 25</div></td>
//                                                       <td className="medicalSpecialty">20$</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
//                                                       <td className="medicalSpecialty">20$</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
//                                                       <td className="medicalSpecialty">20$</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                               </tbody>
//                                           </table>
//                                       </div>
//                                   </div>
//                                   <div className="col-md-6">
//                                       <div className="tableHeading d-flex justify-content-between my-3">
//                                           <div className="admin-headingLeft">
//                                               <div>Refund Request</div>
//                                           </div>
//                                           <div className="headingRight">
//                                               <a>View All</a>
//                                           </div>
//                                       </div>
//                                       <div className="tableContainer table-responsive">
//                                           <table className="table table-bordered appointmentTable">
//                                               <thead>
//                                                   <tr className="new-patient-table-title">
//                                                       <th>No.</th>
//                                                       <th>Ticket ID</th>
//                                                       <th>Patient Name</th>
//                                                       <th>Reason</th>
//                                                       <th>View</th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a><div className="doctorName">John Doe</div></a><div className="patient-name">Male, 25</div></td>
//                                                       <td className="reason">Misbehave</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
//                                                       <td className="reason">Misbehave</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                                   <tr>
//                                                       <td>001</td>
//                                                       <td>#IDXXXXXXXX</td>
//                                                       <td><a className="doctorName">John Doe</a><div className="patient-name">Male, 25</div></td>
//                                                       <td className="reason">Misbehave</td>
//                                                       <td>
//                                                           <a href="admin-view-details.html" className="view-details-link">
//                                                               <span className="view-details-icon">
//                                                                   <i className="fas fa-eye"></i>
//                                                               </span>
//                                                           </a>
//                                                       </td>
//                                                   </tr>
//                                               </tbody>
//                                           </table>
//                                       </div>
//                                   </div>
//                               </div> */}
//                               <div className="row mt-3 d-flex justify-content-center mb-5">
//                                   <AdminDashBoardWithdrawComponent />
//                               </div>
//                               <AdminFooter />
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       )
//   }
// }

const mapStoreToprops=(state, props) =>{
  return {};
}

const mapDispatchToProps=(dispatch)=> {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  const adminactions = bindActionCreators(exadoAdminActions, dispatch);
  return { docactions, patientactions, adminactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AdminDashboard));
