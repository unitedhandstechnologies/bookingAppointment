import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import exadoAdminActions from "../../../redux/exadoAdmin/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { promiseWrapper } from "../../../utility/common";
import AdminHeader from "../adminHeader";
import AdminLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import Appointments from "./appointments";
import Finance from "./finance";

class DoctorDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userGuid,
      DoctorProfile: {},
    };
  }

  componentDidMount() {
    promiseWrapper(this.props.actions.getDoctorViewDetails, {
      userGuid: this.props.match.params.userGuid,
    }).then((response) => {
      this.setState({ DoctorProfile: response.result });
    });
  }

  render() {
    return (
      <div>
        <AdminHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <AdminLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel bg-light">
                <div className="row my-3">
                  <div className="search-bar my-4">
                    <div className="d-flex justify-content-between">
                      <div className="search-bar-text search-bar-text2">
                        <Link
                          to="/admin/doctor-list"
                          className="search-bar-text search-bar-text2"
                        >
                          Doctor
                        </Link>{" "}
                        &gt;&gt;{" "}
                        <span>
                          {this.state.DoctorProfile.firstName}{" "}
                          {this.state.DoctorProfile.lastName}
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
                                Doctor Information
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
                                Fees and Timing
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
                                Appointments
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
                                Finance
                              </a>
                            </li>
                          </ul>
                          <div
                            className="tab-content container-padding"
                            id="myTabContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="about-patient"
                              role="tabpanel"
                              aria-labelledby="about-patient-tab"
                            >
                              <div className="row py-3">
                                <div className="col-md-12">
                                  <div className="admin-doctor-profile-container d-flex align-items-center w-100">
                                    <div className="admin-doctor-profile d-flex justify-content-center align-items-center">
                                      <img
                                        src={
                                          this.state.DoctorProfile.profileImage
                                        }
                                        style={{ borderRadius: "50px" }}
                                        alt=''
                                      />
                                    </div>
                                    <div className="admin-doctor-name">
                                      {this.state.DoctorProfile.firstName}{" "}
                                      {this.state.DoctorProfile.lastName}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="admin-doctor-title mb-2 p-0">
                                  Personal Information
                                </div>
                                <hr />
                                <div className="col-lg-6 col-md-12">
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Language Website :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .profileLanguage === "" ||
                                          this.state.DoctorProfile
                                            .profileLanguage == null
                                            ? "---"
                                            : this.state.DoctorProfile
                                                .profileLanguage}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Supported Languages for consultation :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      {this.state.DoctorProfile
                                        .preferredLanguages &&
                                      this.state.DoctorProfile
                                        .preferredLanguages.length > 0
                                        ? this.state.DoctorProfile.preferredLanguages.join(
                                            ", "
                                          )
                                        : "---"}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      First Name :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .firstName === "" ||
                                          this.state.DoctorProfile.firstName ==
                                            null
                                            ? "---"
                                            : this.state.DoctorProfile
                                                .firstName}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Last Name :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.lastName ===
                                            "" ||
                                          this.state.DoctorProfile.lastName ==
                                            null
                                            ? "---"
                                            : this.state.DoctorProfile.lastName}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Sex :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.gender ===
                                            "" ||
                                          this.state.DoctorProfile.gender ==
                                            null
                                            ? "---"
                                            : this.state.DoctorProfile.gender}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Email :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.email ===
                                            "" ||
                                          this.state.DoctorProfile.email == null
                                            ? "---"
                                            : this.state.DoctorProfile.email}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Citizenship :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.country ===
                                            "" ||
                                          this.state.DoctorProfile.country ==
                                            null
                                            ? "---"
                                            : this.state.DoctorProfile.country}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Date of Birth :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.doB ===
                                            "" ||
                                          this.state.DoctorProfile.doB == null
                                            ? "---"
                                            : this.state.DoctorProfile.doB.substr(
                                                0,
                                                10
                                              )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Mobile Number :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.phone ===
                                            "" ||
                                          this.state.DoctorProfile.phone == null
                                            ? "---"
                                            : this.state.DoctorProfile.phone}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Time zone :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.timezone ===
                                            "" ||
                                          this.state.DoctorProfile.timezone ==
                                            null
                                            ? "---"
                                            : this.state.DoctorProfile.timezone}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-5">
                                <div className="admin-doctor-title mb-2 p-0">
                                  Additional Information
                                </div>
                                <hr />
                                <div className="col-lg-12 col-md-12">
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Select Physician Services :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      {this.state.DoctorProfile
                                        .physicianServices &&
                                        this.state.DoctorProfile
                                          .physicianServices.length > 0 &&
                                        this.state.DoctorProfile.physicianServices
                                          .sort((a, b) =>
                                            a.verificationType >
                                            b.verificationType
                                              ? 1
                                              : -1
                                          )
                                          .map((e, idx) => (
                                            <div className="mb-2">
                                              <div className="d-flex admin-doctor-value">
                                                {e.physicianService}
                                              </div>
                                            </div>
                                          ))}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Own Practice :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .ownPractice === true
                                            ? "Yes"
                                            : "No"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Practice Number :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {
                                            this.state.DoctorProfile
                                              .practiceNumber
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Practise Licence Document :
                                    </div>
                                    <div className="col-md-6">
                                      {this.state.DoctorProfile
                                        .practiceDocuments &&
                                        this.state.DoctorProfile
                                          .practiceDocuments.length > 0 &&
                                        this.state.DoctorProfile.practiceDocuments.map(
                                          (e, idx) => (
                                            <div className="mb-2">
                                              <span
                                                style={{ "font-size": "20px;" }}
                                                className="additional-info-doc"
                                              >
                                                <i className="far fa-file"></i>
                                              </span>
                                              <a
                                                className="mx-2"
                                                target="_blank"
                                                href={e.docURL}
                                                rel="noreferrer"
                                              >
                                                {e.docName}
                                              </a>{" "}
                                              <span
                                                style={{ color: "#FF0000" }}
                                              >
                                                {e.isDeleted ? "[DELETED]" : ""}
                                              </span>
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-5">
                                <div className="admin-doctor-title mb-2 p-0">
                                  Practice Info
                                </div>
                                <hr />
                                <div className="col-lg-6 col-md-12">
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Practice Name :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .clinicName === "" ||
                                          this.state.DoctorProfile.clinicName ==
                                            null
                                            ? "---"
                                            : this.state.DoctorProfile
                                                .clinicName}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Practice Contact Number :
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .clinicContact === "" ||
                                          this.state.DoctorProfile
                                            .clinicContact == null
                                            ? "---"
                                            : this.state.DoctorProfile
                                                .clinicContact}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Practice Email Address :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .clinicEmail === "" ||
                                          this.state.DoctorProfile
                                            .clinicEmail == null
                                            ? "---"
                                            : this.state.DoctorProfile
                                                .clinicEmail}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Country :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.country ===
                                            "" ||
                                          this.state.DoctorProfile.country ==
                                            null
                                            ? "---"
                                            : this.state.DoctorProfile.country}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Practice Address :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .clinicAddress === "" ||
                                          this.state.DoctorProfile
                                            .clinicAddress == null
                                            ? "---"
                                            : this.state.DoctorProfile
                                                .clinicAddress}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      City :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.city ===
                                            "" ||
                                          this.state.DoctorProfile.city == null
                                            ? "---"
                                            : this.state.DoctorProfile.city}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      State :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.state ===
                                            "" ||
                                          this.state.DoctorProfile.state == null
                                            ? "---"
                                            : this.state.DoctorProfile.state}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 admin-doctor-name">
                                      Zip :{" "}
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.zip ===
                                            "" ||
                                          this.state.DoctorProfile.zip == null
                                            ? "---"
                                            : this.state.DoctorProfile.zip}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-5">
                                <div className="admin-doctor-title mb-2 p-0">
                                  Education
                                </div>
                                <hr />
                                <div className="col-lg-12 col-md-12">
                                  {this.state.DoctorProfile.educationModel &&
                                    this.state.DoctorProfile.educationModel
                                      .length > 0 &&
                                    this.state.DoctorProfile.educationModel
                                      .sort((a, b) =>
                                        a.verificationType > b.verificationType
                                          ? -1
                                          : 1
                                      )
                                      .map((d, idx) => (
                                        <div style={{ paddingTop: "10px" }}>
                                          <div className="row">
                                            <div className="col-md-5 admin-doctor-name">
                                              Degree Title :{" "}
                                            </div>
                                            <div className="col-md-7">
                                              <div className="mb-2">
                                                <div className="d-flex admin-doctor-value">
                                                  {d.degreeTitle}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-md-5 admin-doctor-name">
                                              University :{" "}
                                            </div>
                                            <div className="col-md-7">
                                              <div className="mb-2">
                                                <div className="d-flex admin-doctor-value">
                                                  {d.collage}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-md-5 admin-doctor-name">
                                              Degree obtain in year :{" "}
                                            </div>
                                            <div className="col-md-7">
                                              <div className="mb-2">
                                                <div className="d-flex admin-doctor-value">
                                                  {d.passingYear}{" "}
                                                  <span
                                                    style={{ color: "#FF0000" }}
                                                  >
                                                    {d.verificationType === 2
                                                      ? "[Not Verified]"
                                                      : ""}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-md-5 admin-doctor-name">
                                              upload Education Certification :{" "}
                                            </div>
                                            <div className="col-md-7">
                                              {d.educationCertificates !==
                                                null &&
                                                d.educationCertificates.length >
                                                  0 &&
                                                d.educationCertificates.map(
                                                  (e, idx) => (
                                                    <div className="mb-2">
                                                      <div className="admin-doctor-value">
                                                        <div className="mb-2">
                                                          <span
                                                            style={{
                                                              "font-size":
                                                                "20px;",
                                                            }}
                                                            className="additional-info-doc"
                                                          >
                                                            <i className="far fa-file"></i>
                                                          </span>
                                                          <a
                                                            className="mx-2"
                                                            target="_blank"
                                                            href={e.docURL} rel="noreferrer"
                                                          >
                                                            {e.docName}
                                                          </a>{" "}
                                                          <span
                                                            style={{
                                                              color: "#FF0000",
                                                            }}
                                                          >
                                                            {e.isDeleted
                                                              ? "[DELETED]"
                                                              : ""}
                                                          </span>
                                                          &nbsp;
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                </div>
                              </div>
                              <div className="row mt-5">
                                <div className="admin-doctor-title mb-2 p-0">
                                  Current and passed work places (ex: Hospitals,
                                  Clinics, etc)
                                </div>
                                <hr />
                                <div className="col-lg-12 col-md-12">
                                  {this.state.DoctorProfile.experienceModel &&
                                    this.state.DoctorProfile.experienceModel
                                      .length > 0 &&
                                    this.state.DoctorProfile.experienceModel
                                      .sort((a, b) =>
                                        a.verificationType > b.verificationType
                                          ? -1
                                          : 1
                                      )
                                      .map((d, idx) => (
                                        <div>
                                          <div className="mb-2  admin-doctor-name">
                                            {d.organizationName}
                                          </div>
                                          <div className="mb-2 admin-doctor-value">
                                            {d.startDateYear}
                                          </div>
                                          <div className="mb-2 admin-doctor-value">
                                            {d.endDateYear}
                                          </div>
                                          <div className="mb-2 admin-doctor-value">
                                            {d.description}
                                          </div>
                                        </div>
                                      ))}
                                </div>
                              </div>
          
                            </div>
                            <div
                              className="tab-pane fade"
                              id="health-info"
                              role="tabpanel"
                              aria-labelledby="health-info-tab"
                            >
                              <div className="row">
                                <div className="admin-doctor-title mb-2 p-0">
                                  My Fees
                                </div>
                                <hr />
                                <div className="col-lg-12 col-md-12">
                                  <div className="row">
                                    <div className="col-md-4 admin-doctor-name">
                                      Currency :{" "}
                                    </div>
                                    <div className="col-md-8">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile.doctorFees
                                            ? this.state.DoctorProfile
                                                .doctorFees.currencyCode
                                            : "---"}{" "}
                                          (
                                          {this.state.DoctorProfile.doctorFees
                                            ? this.state.DoctorProfile
                                                .doctorFees.currency
                                            : ""}
                                          )
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4 admin-doctor-name">
                                      Online Appointment Fees :{" "}
                                    </div>
                                    <div className="col-md-8">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                            this.state.DoctorProfile.doctorFees
                                              .onlineAppointmentFees}{" "}
                                          (
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                            this.state.DoctorProfile.doctorFees
                                              .currencyCode}{" "}
                                          per Consultation)
                                        </div>
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                            this.state.DoctorProfile.doctorFees
                                              .refundPercentage}
                                          % Refund if patient missed the
                                          session.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4 admin-doctor-name">
                                      In-Clinic Appointment Fees :{" "}
                                    </div>
                                    <div className="col-md-8">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                            this.state.DoctorProfile.doctorFees
                                              .inClinicAppointmentFees}{" "}
                                          (
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                            this.state.DoctorProfile.doctorFees
                                              .currencyCode}{" "}
                                          per Consultation)
                                        </div>
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                            this.state.DoctorProfile.doctorFees
                                              .refundInClinicPercentage}
                                          % Refund if patient missed the
                                          session.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4 admin-doctor-name">
                                      Chat Consultation Fees :{" "}
                                    </div>
                                    <div className="col-md-8">
                                      <div className="mb-2">
                                        <div className="d-flex admin-doctor-value">
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                            this.state.DoctorProfile.doctorFees
                                              .isChatFree && <span>No</span>}
                                          {this.state.DoctorProfile
                                            .doctorFees &&
                                          this.state.DoctorProfile.doctorFees
                                            .isChatFree === false &&
                                          this.state.DoctorProfile.doctorFees
                                            ? this.state.DoctorProfile
                                                .doctorFees.chatFees +
                                              " (" +
                                              this.state.DoctorProfile
                                                .doctorFees.currencyCode +
                                              " per Consultation)"
                                            : ""}
                                        </div>

                                        {/* <div className="d-flex admin-doctor-value">No 50 (INR per Consultation)</div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="patient-history"
                              role="tabpanel"
                              aria-labelledby="patient-history-tab"
                            >
                              <Appointments
                                DoctorProfile={this.state.DoctorProfile}
                              />
                            </div>
                            <div
                              className="tab-pane fade"
                              id="health-monitoring"
                              role="tabpanel"
                              aria-labelledby="health-monitoring-tab"
                            >
                              <Finance
                                DoctorProfile={this.state.DoctorProfile}
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
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(DoctorDetailView));
