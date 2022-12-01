import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import exadoDocActions from "../../../redux/exadoDoc/action";
import { toast } from "react-toastify";
import {
  promiseWrapper,
  isEmpty,
  localStorageKeys,
} from "../../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DoctorHeader from "../docHeader";
import DoctorFooter from "../docFooter";
import DoctorLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import { withTranslation } from "react-i18next";
import DoctorAdditionalInfo from "../docAdditionalInfo";
import ProfileImgPopup from "../profileImgPopup";
import ChangePasswordPopup from "../changePasswordPopup";
import DeactivateAccountPopup from "../deactivateAccountPopup";
import SendOTPPopup from "../sendOTPPopup";
import PersonalInfo from "./personalInfo";
import Avatar from "../../../assets/images/Avatar.png";
class DoctorProfilePage extends React.Component {
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
        isEmailVerified: true,
        isMobileVerified: false,
        languageId: 1,
        gender: "1",
        doB: "",
        citizenshipId: 0,
        preferredLanguageIds: [],
        mobileOTP: "",
        profileImage: "",
        profileImageURL: "",
        profileImagePath: "",
        cancelReason: "",
        profileVerification: 1,
        timezoneGuid: "",
      },
      IsSendOTP: false,
      CitizenshipData: [],
      LanguageData: [],
      WebSiteLanguageData: [],
      TimezoneData: [],
      modal: false,
      changePasswordPopup: false,
      deactivateAccountPopup: false,
      sendOTPPopup: false,
      disableTab: false,
    };
  }

  componentDidMount() {
    this.getLanguages();
    this.getCountry();
    this.getWebsiteLanguages();
    this.getTimezones();
    this.getProfilePersonalData();
  }

  componentDidUpdate() {
    const state = this.state;
    if (
      !state.LoadedData &&
      state.CitizenshipData.length &&
      state.LanguageData.length &&
      state.WebSiteLanguageData.length &&
      state.TimezoneData &&
      Object.keys(state.ProfilePersonalInfo).length
    )
      this.setState({ LoadedData: true });
  }

  getLanguages = () =>
    promiseWrapper(this.props.actions.getLanguages).then((jsdata) => {
      this.setState({ LanguageData: jsdata });
    });

  getCountry = () =>
    promiseWrapper(this.props.actions.getCountry).then((jsdata) =>
      this.setState({ CitizenshipData: jsdata.result })
    );

  getWebsiteLanguages = () =>
    promiseWrapper(this.props.actions.getWebsiteLanguages).then((jsdata) =>
      this.setState({ WebSiteLanguageData: jsdata })
    );

  getTimezones = () =>
    promiseWrapper(this.props.actions.getTimezones).then((jsdata) =>
      this.setState({ TimezoneData: jsdata.result })
    );

  getProfilePersonalData = () => {
    promiseWrapper(this.props.actions.getProfileInfo, {
      userGuid: localStorage.getItem(localStorageKeys.userId),
    }).then((data) => {
      this.setState(
        {
          ProfilePersonalInfo: {
            ...data.result,
            doB: data.result.doB != null ? data.result.doB.substr(0, 10) : null,
            gender: data.result.gender,
            preferredLanguageIds: data.result.preferredLanguageIds.map((v) =>
              v.toString()
            ),
          },
        },
        () => {
          localStorage.setItem(
            localStorageKeys.profileImage,
            data.result.profileImageURL
          );
          if (data.languageId === null || data.languageId < 0) {
            this.setState({ disableTab: true });
          }
        }
      );
    });
  };

  togglePop = () => this.setState({ modal: !this.state.modal });

  togglechangePasswordPopup = () =>
    this.setState({ changePasswordPopup: !this.state.changePasswordPopup });

  toggleDeactivateAccountPopup = () =>
    this.setState({
      deactivateAccountPopup: !this.state.deactivateAccountPopup,
    });

  toggleSendOTPPopup = () => {
    if (this.state.sendOTPPopup === false) this.SendOTPText();
    else
      this.setState({
        sendOTPPopup: !this.state.sendOTPPopup,
      });
  };

  SendOTPText() {
    if (isEmpty(this.state.ProfilePersonalInfo["phone"]))
      toast.error("Please enter mobile number");
    else {
      promiseWrapper(this.props.actions.sendTextOTP, {
        userGuid: localStorage.getItem(localStorageKeys.userId),
        mobile: this.state.ProfilePersonalInfo.phone,
      }).then((jsdata) => {
        this.setState({ IsSendOTP: true }, () => {
          this.setState({
            sendOTPPopup: !this.state.sendOTPPopup,
          });
        });
      });
    }
  }

  SavePersonalProfile(ProfilePersonalInfo) {
    let prfInfo = {
      userGuid: localStorage.getItem(localStorageKeys.userId),
      firstName: ProfilePersonalInfo["firstName"],
      lastName: ProfilePersonalInfo["lastName"]||'',
      email: ProfilePersonalInfo["email"],
      phone: ProfilePersonalInfo["phone"],
      address: ProfilePersonalInfo["address"]|| null,
      userType: ProfilePersonalInfo["userType"] || 1,
      isVerified: ProfilePersonalInfo["isVerified"]|| false,
      isEmailVerified: ProfilePersonalInfo["isEmailVerified"]||true,
      isMobileVerified: ProfilePersonalInfo["isMobileVerified"]||false,
      languageId: Number(ProfilePersonalInfo["languageId"]),
      gender: Number(ProfilePersonalInfo["gender"]),
      doB: ProfilePersonalInfo["doB"],
      citizenshipId: Number(ProfilePersonalInfo["citizenshipId"]),
      preferredLanguageIds: ProfilePersonalInfo["preferredLanguageIds"].map(
        (v) => parseInt(v, 10)
      ),
      mobileOTP: ProfilePersonalInfo["mobileOTP"],
      profileImage: ProfilePersonalInfo["profileImage"],
      profileImageURL: ProfilePersonalInfo["profileImageURL"],
      profileImagePath: ProfilePersonalInfo["profileImagePath"],
      timezoneGuid: ProfilePersonalInfo["timezoneGuid"],
      cancelReason:ProfilePersonalInfo["cancelReason"]|| null
    };
    promiseWrapper(this.props.actions.saveProfileInfo, {
      userModel: prfInfo,
    }).then((data) => {
      if (data.data.success === true) {
        this.setState({ disableTab: false });
        toast.success(data.data.message);
        window.$('.nav-pills a[href="#additional-info"]').tab("show");
        localStorage.setItem(
          localStorageKeys.profileImage,
          this.state.ProfilePersonalInfo.profileImageURL
        );
      } else {
        toast.error(data.data.message);
      }
    });
  }

  GetProfIMGData(img) {
    this.setState((prevState) => ({
      ProfilePersonalInfo: {
        ...prevState.ProfilePersonalInfo,
        profileImageURL: img,
        profileImage: img,
      },
    }));
  }

  render() {
    const { t } = this.props;
    const {
      disableTab,
      ProfilePersonalInfo,
      WebSiteLanguageData,
      CitizenshipData,
      TimezoneData,
      LanguageData,
    } = this.state;
    return (
      <div>
        <DoctorHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <DoctorLeftPanel />
              {this.state && this.state.LoadedData && (
                <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                  <div className="row search-bar">
                    <div className="py-4 search-bar-text w-100 bg-light">
                      {t("Doctor.Profile_Basic.My_Profile")}
                    </div>
                  </div>
                  <div className="row my-3 px-4">
                    <div className="my-profile-form">
                      <div className="divForm">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="my-profile-container d-flex flex-column align-items-center my-5">
                              <div className="my-profile-photo d-flex justify-content-center align-items-center">
                                <img
                                  style={{ borderRadius: "inherit" }}
                                  src={
                                    this.state.ProfilePersonalInfo[
                                      "profileImage"
                                    ] ||
                                    localStorage.getItem("profile-image") || {
                                      Avatar,
                                    }
                                  }
                                  alt="profile img"
                                />
                              </div>
                              <div className="my-profile-info my-3">
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={this.togglePop}
                                >
                                  {t(
                                    "Doctor.Profile_Basic.Change_Profile_Picture"
                                  )}
                                </a>
                              </div>
                              {this.state.modal ? (
                                <ProfileImgPopup
                                  profImg={
                                    this.state.ProfilePersonalInfo[
                                      "profileImageURL"
                                    ] === null
                                      ? this.state.ProfilePersonalInfo[
                                          "profileImage"
                                        ]
                                      : this.state.ProfilePersonalInfo[
                                          "profileImageURL"
                                        ]
                                  }
                                  profImgData={this.GetProfIMGData.bind(this)}
                                  toggle={this.togglePop}
                                />
                              ) : null}
                              <div className="my-profile-details">
                                <div className="my-profile my-3">
                                  <span>
                                    {t("Doctor.Profile_Basic.Profile")} :{" "}
                                  </span>
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] === 1 && (
                                    <span className="profile-not-verified">
                                      {t("Doctor.Profile_Basic.Not_Verified")}
                                    </span>
                                  )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] === 2 && (
                                    <span
                                      className="profile-verified"
                                      style={{ color: "rgb(32, 202, 214)" }}
                                    >
                                      {t("Doctor.Profile_Basic.In_Process")}
                                    </span>
                                  )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] === 3 && (
                                    <span className="profile-verified">
                                      {t("Doctor.Profile_Basic.Verified")}
                                    </span>
                                  )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] === 4 && (
                                    <span className="profile-not-verified">
                                      {t("Doctor.Profile_Basic.Rejected")}
                                    </span>
                                  )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] === 5 && (
                                    <span className="profile-not-verified">
                                      {t(
                                        "Doctor.Profile_Basic.NeedAdditionInfo"
                                      )}
                                    </span>
                                  )}
                                </div>
                                <div className="my-email my-3">
                                  <span>
                                    {t("Doctor.Profile_Basic.Email")} :{" "}
                                  </span>
                                  {this.state.ProfilePersonalInfo[
                                    "isEmailVerified"
                                  ] === true ? (
                                    <span className="email-verified">
                                      {" "}
                                      {t("Doctor.Profile_Basic.Verified")}{" "}
                                    </span>
                                  ) : (
                                    <span className="email-not-verified">
                                      {t("Doctor.Profile_Basic.Not_Verified")}
                                    </span>
                                  )}
                                </div>
                                <div className="my-phone my-3">
                                  <span>
                                    {t("Doctor.Profile_Basic.Mobile")} :{" "}
                                  </span>
                                  {this.state.ProfilePersonalInfo[
                                    "isMobileVerified"
                                  ] === true ? (
                                    <span className="mobile-verified">
                                      {" "}
                                      {t("Doctor.Profile_Basic.Verified")}{" "}
                                    </span>
                                  ) : (
                                    <span className="mobile-not-verified">
                                      {t("Doctor.Profile_Basic.Not_Verified")}
                                    </span>
                                  )}
                                  {this.state.ProfilePersonalInfo[
                                    "isMobileVerified"
                                  ] === false && (
                                    <span className="mx-4">
                                      <a
                                        style={{ cursor: "pointer" }}
                                        className="send-otp"
                                        onClick={this.toggleSendOTPPopup}
                                      >
                                        {t("Doctor.Profile_Basic.Send_OTP")}
                                      </a>
                                    </span>
                                  )}
                                  {this.state.sendOTPPopup ? (
                                    <SendOTPPopup
                                      toggleSendOTP={this.toggleSendOTPPopup}
                                      OTPMobileNo={
                                        this.state.ProfilePersonalInfo.phone
                                      }
                                    />
                                  ) : null}
                                </div>
                                {(this.state.ProfilePersonalInfo
                                  .profileVerification === 4 ||
                                  this.state.ProfilePersonalInfo
                                    .profileVerification === 5) && (
                                  <div>
                                    <p>
                                      <strong>
                                        {t(
                                          "Doctor.Profile_Basic.Reject_Reason"
                                        )}
                                        :
                                      </strong>{" "}
                                      <br />
                                      {
                                        this.state.ProfilePersonalInfo
                                          .cancelReason
                                      }
                                    </p>
                                  </div>
                                )}
                                <div className="my-phone my-3">
                                  <a
                                    className="send-otp"
                                    style={{ cursor: "pointer" }}
                                    onClick={this.togglechangePasswordPopup}
                                  >
                                    {t("Doctor.Profile_Basic.Change_Password")}
                                  </a>
                                </div>
                                {this.state.changePasswordPopup ? (
                                  <ChangePasswordPopup
                                    toggleChangePassword={
                                      this.togglechangePasswordPopup
                                    }
                                  />
                                ) : null}
                                <div className="my-phone my-3">
                                  <a
                                    className="mobile-not-verified"
                                    style={{ cursor: "pointer" }}
                                    onClick={this.toggleDeactivateAccountPopup.bind(
                                      this
                                    )}
                                  >
                                    {t(
                                      "Doctor.Profile_Basic.Deactivate_Account"
                                    )}
                                  </a>
                                </div>
                                <div className="my-phone my-3">
                                  <Link
                                    className="send-otp"
                                    to={`/doctor/book-an-appoinment-doc-detail/${localStorage.getItem(
                                      "user-id"
                                    )}`}
                                  >
                                    {t(
                                      "Doctor.Profile_Basic.ViewAsPatientProfile"
                                    )}
                                  </Link>
                                </div>
                                {this.state.deactivateAccountPopup ? (
                                  <DeactivateAccountPopup
                                    user="Doctor"
                                    toggleDeactivateAccount={
                                      this.toggleDeactivateAccountPopup
                                    }
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-8" id="my-doctor-profile">
                            <ul
                              className="nav nav-pills nav-fill"
                              id="myprofiletab"
                              role="tablist"
                            >
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  id="personal-info-tab"
                                  data-toggle="tab"
                                  href="#personal-info"
                                  role="tab"
                                  aria-controls="personal-info"
                                  aria-selected="true"
                                >
                                  {t(
                                    "Doctor.Profile_Basic.Personal_Information"
                                  )}
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${
                                    disableTab ? "disabled" : ""
                                  }`}
                                  id="additional-info-tab"
                                  data-toggle="tab"
                                  href="#additional-info"
                                  role="tab"
                                  aria-controls="additional-info"
                                  aria-selected="false"
                                  aria-disabled={disableTab}
                                >
                                  {t(
                                    "Doctor.Profile_Basic.Additional_Information"
                                  )}
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content px-4" id="myTabContent">
                              <div
                                className="tab-pane fade show active"
                                id="personal-info"
                                role="tabpanel"
                                aria-labelledby="personal-info-tab"
                              >
                                <PersonalInfo
                                  t={t}
                                  ProfilePersonalInfo={ProfilePersonalInfo}
                                  WebSiteLanguageData={WebSiteLanguageData}
                                  CitizenshipData={CitizenshipData}
                                  TimezoneData={TimezoneData}
                                  LanguageData={LanguageData}
                                  onSubmit={(e) => this.SavePersonalProfile(e)}
                                />
                              </div>
                              <div
                                className="tab-pane fade "
                                id="additional-info"
                                role="tabpanel"
                                aria-labelledby="additional-info-tab"
                              >
                                <DoctorAdditionalInfo />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DoctorFooter />
                </div>
              )}
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
  const actions = bindActionCreators(exadoDocActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(DoctorProfilePage));
