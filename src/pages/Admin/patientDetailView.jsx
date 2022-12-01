import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import exadoAdminActions from "../../redux/exadoAdmin/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactPaginate from "react-paginate";
import { promiseWrapper } from "../../utility/common";
import AdminHeader from "./adminHeader";
import AdminFooter from "../patient/footer";
import AdminLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import moment from "moment";

class PatientDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      ProfilePersonalInfo: {
        userGuid: localStorage.getItem("user-id"),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        userType: 0,
        isVerified: false,
        isEmailVerified: false,
        isMobileVerified: false,
        languageId: 1,
        gender: "",
        doB: "",
        citizenshipId: 0,
        preferredLanguageIds: [],
        mobileOTP: "",
        profileImage: "",
        profileImageURL: "",
        profileImagePath: "",
        cancelReason: "",
        profileVerification: 0,
        timezoneGuid: "",
        weight: 0,
        height: 0,
        occupation: "",
        country: "",
        preferredLanguages: [],
        questionnaireData: [],
        patientAnswersModel: [],
      },
      UserGender: "",
      Age: "",
      PageTitles: [
        { title: "Health Tracking", pageNo: 1 },
        { title: "Hearing and Seeing", pageNo: 2 },
        { title: "Digestion and Nutrition", pageNo: 3 },
        { title: "Chronic Disease and Conditions", pageNo: 4 },
        { title: "Recent Medical History (2 months)", pageNo: 5 },
        { title: "Medication Intake", pageNo: 6 },
      ],
      AppointmentRequestList: [],
      CurrentPage: 1,
      TotalRecords: 0,
      TotalPages: 0,
      appointmentTypes: ["1", "2", "3"],
      MonitorQuestionnaireList: [],
      MonitorAnswerDataList: [],
    };
  }

  componentDidMount() {
    promiseWrapper(this.props.actions.getPatientViewDetails, {
      patientGuid: this.props.match.params.userGuid,
    }).then((data) => {
      this.setState({ ProfilePersonalInfo: data.result }, () => {
        this.GetAppointmentRequestList();
        this.setState((prevState) => ({
          ProfilePersonalInfo: {
            ...prevState.ProfilePersonalInfo,
            ["doB"]:
              data.result.doB != null ? data.result.doB.substr(0, 10) : null,
          },
        }));
        this.setState((prevState) => ({
          ProfilePersonalInfo: {
            ...prevState.ProfilePersonalInfo,
            ["gender"]: data.result.gender.toString(),
          },
        }));

        if (data.result.gender) {
          if (data.result.gender.toString() === "1") {
            this.setState({ UserGender: "Male" });
          } else if (data.result.gender.toString() === "2") {
            this.setState({ UserGender: "Female" });
          } else {
            this.setState({ UserGender: "Other" });
          }
        }
        if (data.doB && data.result.doB !== "") {
          let ad = this.calculate_age(data.result.doB);
          this.setState({ Age: ad });
        }
        promiseWrapper(this.props.patientactions.getPatientQuestionnaire, {
          languageId: 1,
        }).then((data) => {
          this.setState({ MonitorQuestionnaireList: data.result }, () => {
            promiseWrapper(this.props.patientactions.getPatientAnswers, {
              patientGuid: this.props.match.params.userGuid,
              languageId: 1,
            }).then((data) => {
              this.setState({ MonitorAnswerDataList: data.result }, () => {
                this.setState({ LoadedData: true });
              });
            });
          });
        });
      });
    });
  }

  GetAppointmentRequestList() {
    let param = {
      pageSize: 10,
      currentPage: Number(this.state.CurrentPage),
      search: "",
      sortExp: "",
      sortDir: "",
      patientGuid: this.props.match.params.userGuid,
      doctorGuid: localStorage.getItem("user-id"),
      appointmentStatuses: [4],
      appointmentTypes: [1, 2, 3],
      fromDate: null,
      toDate: null,
      isFromPatientDetailPage: true,
    };
    promiseWrapper(this.props.patientactions.getAppointments, {
      filter: param,
    }).then((data) => {
      this.setState(
        { AppointmentRequestList: data.patientAppointments },
        () => {
          this.setState({ TotalRecords: data.totalRecords });
          this.setState({ TotalPages: data.totalPages });
        }
      );
    });
  }

  calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    this.setState({ CurrentPage: currentPage }, () => {
      this.GetAppointmentRequestList();
    });
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <AdminHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <AdminLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div className="row">
                  <div className="search-bar my-4">
                    <div className="d-flex justify-content-between">
                      <div className="search-bar-text search-bar-text2">
                        <Link
                          className="search-bar-text search-bar-text2"
                          to="/admin/patient-list"
                        >{`My Patients`}</Link>{" "}
                        &gt;&gt;
                        <span>
                          {" "}
                          {this.state.ProfilePersonalInfo.firstName}{" "}
                          {this.state.ProfilePersonalInfo.lastName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="my-profile-form">
                    <div className="divForm">
                      <div className="row">
                        <div className="col-md-12 p-0">
                          <ul
                            className="nav nav-pills nav-fill"
                            id="myprofiletab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="about-patient-tab"
                                data-toggle="tab"
                                href="#about-patient"
                                role="tab"
                                aria-controls="about-patient"
                                aria-selected="true"
                              >
                                {t("Admin.PatientDetailView.About_Patient")}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="health-info-tab"
                                data-toggle="tab"
                                href="#health-info"
                                role="tab"
                                aria-controls="health-info"
                                aria-selected="false"
                              >
                                {t("Admin.PatientDetailView.Health_Info")}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="patient-history-tab"
                                data-toggle="tab"
                                href="#patient-history"
                                role="tab"
                                aria-controls="patient-history"
                                aria-selected="false"
                              >
                                {t("Admin.PatientDetailView.Patient's_History")}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="health-monitoring-tab"
                                data-toggle="tab"
                                href="#health-monitoring"
                                role="tab"
                                aria-controls="health-monitoring"
                                aria-selected="false"
                              >
                                {t("Admin.PatientDetailView.Health_Monitoring")}
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content" id="myTabContent">
                            <div
                              className="tab-pane fade show active m-5"
                              id="about-patient"
                              role="tabpanel"
                              aria-labelledby="about-patient-tab"
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="my-profile-container d-flex align-items-center">
                                    <div className="my-profile-photo d-flex justify-content-center align-items-center">
                                      <img
                                        src={
                                          this.state.ProfilePersonalInfo
                                            .profileImage
                                        }
                                        style={{ borderRadius: "50px" }}
                                      />
                                    </div>
                                    <div className="mx-4 my-profile-details">
                                      <div className="admin-name">
                                        <span>
                                          {
                                            this.state.ProfilePersonalInfo
                                              .firstName
                                          }{" "}
                                          {
                                            this.state.ProfilePersonalInfo
                                              .lastName
                                          }
                                        </span>
                                      </div>
                                      <div className="admin-designation">
                                        <span>
                                          {this.state.ProfilePersonalInfo
                                            .occupation === "" ||
                                          this.state.ProfilePersonalInfo
                                            .occupation == null
                                            ? "---"
                                            : this.state.ProfilePersonalInfo
                                                .occupation}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row my-5">
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t("Admin.PatientDetailView.Gender-Age")}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.UserGender} - {this.state.Age}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t(
                                        "Admin.PatientDetailView.Date_Of_Birth"
                                      )}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.ProfilePersonalInfo.doB ===
                                        "" ||
                                      this.state.ProfilePersonalInfo.doB == null
                                        ? "---"
                                        : this.state.ProfilePersonalInfo.doB}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t("Admin.PatientDetailView.Weight")}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.ProfilePersonalInfo.weight ===
                                        "" ||
                                      this.state.ProfilePersonalInfo.weight ==
                                        null
                                        ? "---"
                                        : this.state.ProfilePersonalInfo
                                            .weight + " lbs"}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t("Admin.PatientDetailView.Height")}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.ProfilePersonalInfo.height ===
                                        "" ||
                                      this.state.ProfilePersonalInfo.height ==
                                        null
                                        ? "---"
                                        : this.state.ProfilePersonalInfo
                                            .height + " ft"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="row my-5">
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t(
                                        "Admin.PatientDetailView.Mobile_Number"
                                      )}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.ProfilePersonalInfo.phone ===
                                        "" ||
                                      this.state.ProfilePersonalInfo.phone ==
                                        null
                                        ? "---"
                                        : this.state.ProfilePersonalInfo.phone}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t(
                                        "Admin.PatientDetailView.Email_Address"
                                      )}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.ProfilePersonalInfo.email}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t(
                                        "Admin.PatientDetailView.Preferred_Language"
                                      )}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.ProfilePersonalInfo
                                        .preferredLanguages &&
                                      this.state.ProfilePersonalInfo
                                        .preferredLanguages.length > 0
                                        ? this.state.ProfilePersonalInfo.preferredLanguages.join(
                                            ", "
                                          )
                                        : "---"}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                  <div className="admin-info-title">
                                    <span>
                                      {t("Admin.PatientDetailView.Citizenship")}
                                    </span>
                                  </div>
                                  <div className="admin-info-description d-flex align-items-center">
                                    <div className="admin-desc-dot"></div>
                                    <span className="mx-2">
                                      {this.state.ProfilePersonalInfo
                                        .country === "" ||
                                      this.state.ProfilePersonalInfo.country ==
                                        null
                                        ? "---"
                                        : this.state.ProfilePersonalInfo
                                            .country}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="health-info"
                              role="tabpanel"
                              aria-labelledby="health-info-tab"
                            >
                              <div className="col-sm-12 col-md-12 col-lg-12">
                                {/* accordion item 2 start  */}
                                <Accordion allowZeroExpanded>
                                  {this.state.PageTitles.map((p, idxx) => (
                                    <AccordionItem key={idxx}>
                                      <AccordionItemHeading>
                                        <AccordionItemButton>
                                          {p.title}
                                        </AccordionItemButton>
                                      </AccordionItemHeading>
                                      <AccordionItemPanel>
                                        {this.state.ProfilePersonalInfo
                                          .questionnaireData &&
                                          this.state.ProfilePersonalInfo.questionnaireData
                                            .filter(
                                              (q) =>
                                                q.questionPageNo == p.pageNo
                                            )
                                            .sort((a, b) =>
                                              a.questionOrder > b.questionOrder
                                                ? 1
                                                : -1
                                            )
                                            .map((d, idx) => (
                                              <div
                                                className="hearing-seeing-qa"
                                                key={idx}
                                              >
                                                <div className="hearing-seeing-q">
                                                  <span className="hearing-seeing-qno">
                                                    {idx + 1}.{" "}
                                                  </span>
                                                  <span className="hearing-seeing-q-text">
                                                    {d.question}
                                                  </span>
                                                </div>
                                                <div className="hearing-seeing-a px-2 my-2">
                                                  {d.answers.map((ad, idbx) => (
                                                    <div key={idbx}>
                                                      {d.questionType === 3 && (
                                                        <div className="row my-2 health-info-div">
                                                          <div className="col-md-6">
                                                            <div className="alcohol-intake-dropdown-text">
                                                              <span className="alcohol-intake-dropdown-text-date">
                                                                {`${moment(
                                                                  ad.createdDate
                                                                ).format(
                                                                  "DD-MMM-YYYY"
                                                                )}`}{" "}
                                                                &nbsp;
                                                              </span>
                                                              <span className="diopters-dropdown-text-time">
                                                                &nbsp;&nbsp;{" "}
                                                                {`${moment(
                                                                  ad.createdDate
                                                                ).format(
                                                                  "hh:mm A"
                                                                )}`}
                                                              </span>
                                                            </div>
                                                          </div>
                                                          <div className="col-md-6">
                                                            <div className="row">
                                                              <div className="col-md-8">
                                                                <div>
                                                                  <span>
                                                                    {d.question}
                                                                    :
                                                                  </span>
                                                                  <span className="alcohol-intake-value">
                                                                    {ad.answer1}
                                                                  </span>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )}

                                                      {d.questionType === 2 && (
                                                        <div className="row health-info-div my-2">
                                                          <div className="col-md-6">
                                                            <div className="diopters-dropdown-text">
                                                              <span className="diopters-dropdown-text-date">
                                                                {`${moment(
                                                                  ad.createdDate
                                                                ).format(
                                                                  "DD-MMM-YYYY"
                                                                )}`}{" "}
                                                                &nbsp;
                                                              </span>
                                                              <span className="diopters-dropdown-text-time">
                                                                {" "}
                                                                &nbsp;&nbsp;
                                                                {`${moment(
                                                                  ad.createdDate
                                                                ).format(
                                                                  "hh:mm A"
                                                                )}`}
                                                              </span>
                                                            </div>
                                                          </div>
                                                          <div className="col-md-6">
                                                            <div className="row">
                                                              <div className="col-md-4">
                                                                <div>
                                                                  <span>
                                                                    {t(
                                                                      "Admin.PatientDetailView.Right_Eye"
                                                                    )}
                                                                    :
                                                                  </span>
                                                                  <span className="diopters-dropdown-right-eye-value">
                                                                    {ad.answer1}
                                                                  </span>
                                                                </div>
                                                              </div>
                                                              <div className="col-md-4">
                                                                <div>
                                                                  <span>
                                                                    {t(
                                                                      "Admin.PatientDetailView.Left_Eye"
                                                                    )}
                                                                    :
                                                                  </span>
                                                                  <span className="diopters-dropdown-left-eye-value">
                                                                    {ad.answer2}
                                                                  </span>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )}
                                                      {d.questionType === 1 && (
                                                        <p>
                                                          <p className="p-0"></p>
                                                          <p className="p-0">
                                                            <strong>
                                                              {ad.answer1 ==
                                                              "NA"
                                                                ? "Don't Know"
                                                                : ad.answer1}
                                                            </strong>
                                                            {ad.answer1 ==
                                                            "Yes" ? (
                                                              <br />
                                                            ) : (
                                                              ""
                                                            )}{" "}
                                                            {ad.answer2}
                                                          </p>
                                                        </p>
                                                      )}
                                                      {d.questionType === 4 && (
                                                        <p>
                                                          <p className="p-0"></p>
                                                          <p className="p-0">
                                                            {ad.answer1}
                                                          </p>
                                                        </p>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            ))}
                                      </AccordionItemPanel>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                                {/* <Accordion allowZeroExpanded>
                                                                    <AccordionItem>
                                                                        <AccordionItemHeading>
                                                                            <AccordionItemButton>
                                                                                Hearing and Seeing
                                                                            </AccordionItemButton>
                                                                        </AccordionItemHeading>
                                                                        <AccordionItemPanel>
                                                                            {this.state.ProfilePersonalInfo.questionnaireData && this.state.ProfilePersonalInfo.questionnaireData.filter(q => q.questionPageNo === 1).sort((a, b) => a.questionOrder > b.questionOrder ? 1 : -1).map((d, idx) => (
                                                                                <div className="hearing-seeing-qa">
                                                                                    <div className="hearing-seeing-q">
                                                                                        <span className="hearing-seeing-qno">{idx + 1}. </span>
                                                                                        <span className="hearing-seeing-q-text">{d.question}</span>
                                                                                    </div>
                                                                                    <div className="hearing-seeing-a pt-3">
                                                                                        <p className="p-0"></p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </AccordionItemPanel>
                                                                    </AccordionItem>
                                                                </Accordion> */}
                                {/* <input className="ac-input" id="ac-2" name="accordion-1" type="radio" />
                                                                <label className="ac-label" for="ac-2"><i></i></label> */}
                                <div className="article ac-content"></div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade m-3"
                              id="patient-history"
                              role="tabpanel"
                              aria-labelledby="patient-history-tab"
                            >
                              <div className="row mt-3 d-flex justify-content-center">
                                <div className="col-md-12 table-min-height">
                                  <div className="tableContainer table-responsive">
                                    <table className="table table-bordered appointmentTable">
                                      <thead>
                                        <tr className="new-patient-table-title">
                                          <th rowSpan="2">
                                            {t(
                                              "Admin.PatientDetailView.Booking_ID"
                                            )}
                                          </th>
                                          <th rowSpan="2">
                                            {t(
                                              "Admin.PatientDetailView.Doctor_Name"
                                            )}
                                          </th>
                                          <th>
                                            {t("Admin.PatientDetailView.Date")}
                                          </th>
                                          <th rowSpan="2">
                                            {t(
                                              "Admin.PatientDetailView.Medical_Specialty"
                                            )}
                                          </th>
                                          <th rowSpan="2">
                                            {t(
                                              "Admin.PatientDetailView.Amount"
                                            )}{" "}
                                            (€)
                                          </th>
                                          <th rowSpan="2">
                                            {t(
                                              "Admin.PatientDetailView.Appointment_Type"
                                            )}
                                          </th>
                                          <th rowSpan="2">
                                            {t(
                                              "Admin.PatientDetailView.Diagnosis"
                                            )}
                                          </th>
                                        </tr>
                                        <tr>
                                          <th>
                                            {t("Admin.PatientDetailView.Time")}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.AppointmentRequestList.map(
                                          (v, idx) => {
                                            if (
                                              v.showDiagnosisToOthers ||
                                              v.doctorGuid ===
                                                localStorage.getItem("user-id")
                                            )
                                              return (
                                                <tr key={idx}>
                                                  <td>{v.bookingId}</td>
                                                  <td>
                                                    <Link
                                                      className="doctor-name-link"
                                                      to={`/doctor/book-an-appoinment-doc-detail/${v.doctorGuid}`}
                                                    >
                                                      {v.doctorFirstName}{" "}
                                                      {v.doctorLastName}
                                                    </Link>
                                                  </td>
                                                  <td className="dateTime">
                                                    {moment(
                                                      v.appointmentDateTime
                                                    ).format("MM/DD/YYYY")}
                                                    <br />
                                                    {moment(
                                                      v.appointmentDateTime
                                                    ).format("HH:mm")}
                                                  </td>
                                                  <td className="medicalSpecialty">
                                                    {v.physicianServices}
                                                  </td>
                                                  <td className="country">
                                                    {v.amount}
                                                  </td>
                                                  <td className="type">
                                                    {v.appointmentType}
                                                  </td>
                                                  <td>
                                                    <Link
                                                      to={`/doc-view-diagnostic/${v.appointmentGuid}`}
                                                      className="doctorName"
                                                    >
                                                      {t(
                                                        "Admin.PatientDetailView.View"
                                                      )}
                                                    </Link>
                                                  </td>
                                                </tr>
                                              );
                                            else return false;
                                          }
                                        )}
                                      </tbody>
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
                            <div
                              className="tab-pane fade"
                              id="health-monitoring"
                              role="tabpanel"
                              aria-labelledby="health-monitoring-tab"
                            >
                              <div className="health-monitoring-section">
                                {this.state.MonitorQuestionnaireList.map(
                                  (d, idx) => (
                                    <div key={idx}>
                                      <div className="row d-flex align-items-center">
                                        <div className="col-md-12">
                                          <span className="health-info-question-text">
                                            {d.question}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="monitoring-diopters-dropdown px-2 my-4">
                                        {this.state.MonitorAnswerDataList.map(
                                          (ad, idax) => (
                                            <div key={idax}>
                                              {ad.questionGuid ===
                                                d.questionGuid &&
                                                d.questionType === 3 && (
                                                  <div className="row my-2 health-info-div">
                                                    <div className="col-md-6">
                                                      <div className="monitoring-alcohol-intake-dropdown-text">
                                                        <span className="monitoring-alcohol-intake-dropdown-text-date">
                                                          {`${moment(
                                                            ad.createdDate
                                                          ).format(
                                                            "DD-MMM-YYYY"
                                                          )}`}{" "}
                                                          &nbsp;
                                                        </span>
                                                        <span className="monitoring-alcohol-intake-text-time">
                                                          &nbsp;&nbsp;{" "}
                                                          {`${moment(
                                                            ad.createdDate
                                                          ).format("hh:mm A")}`}
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                      <div className="row">
                                                        <div className="col-md-8">
                                                          <div>
                                                            <span>
                                                              {d.question}:
                                                            </span>
                                                            <span className="monitoring-alcohol-intake-value">
                                                              {ad.answer1}
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              {ad.questionGuid ===
                                                d.questionGuid &&
                                                d.questionType === 2 && (
                                                  <div className="row health-info-div my-2">
                                                    <div className="col-md-6">
                                                      <div className="monitoring-diopters-dropdown-text">
                                                        <span className="monitoring-diopters-dropdown-text-date">
                                                          {`${moment(
                                                            ad.createdDate
                                                          ).format(
                                                            "DD-MMM-YYYY"
                                                          )}`}{" "}
                                                          &nbsp;
                                                        </span>
                                                        <span className="monitoring-diopters-dropdown-text-time">
                                                          &nbsp;&nbsp;{" "}
                                                          {`${moment(
                                                            ad.createdDate
                                                          ).format("hh:mm A")}`}
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                      <div className="row">
                                                        <div className="col-md-4">
                                                          <div>
                                                            <span>
                                                              {t(
                                                                "Admin.PatientDetailView.Right_Eye"
                                                              )}
                                                              :
                                                            </span>
                                                            <span className="monitoring-diopters-dropdown-right-eye-value">
                                                              {ad.answer1}
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                          <div>
                                                            <span>
                                                              {t(
                                                                "Admin.PatientDetailView.Left_Eye"
                                                              )}
                                                              :
                                                            </span>
                                                            <span className="monitoring-diopters-dropdown-left-eye-value">
                                                              {ad.answer2}
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <AdminFooter />
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
  const actions = bindActionCreators(exadoAdminActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { actions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(PatientDetailView));
