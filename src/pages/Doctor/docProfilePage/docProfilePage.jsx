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
import Avatar from "../../../assets/images/Avatar.png"

// const DoctorProfilePage = (props) => {
//   const {t} =props
//   const [LoadedData, setLoadedData] = useState(false);
//   const [ProfilePersonalInfo, setProfilePersonalInfo] = useState({
//     userGuid: localStorage.getItem("user-id"),
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     userType: 0,
//     isVerified: false,
//     isEmailVerified: false,
//     isMobileVerified: false,
//     languageId: 1,
//     gender: 1,
//     doB: "",
//     citizenshipId: 0,
//     preferredLanguageIds: [],
//     mobileOTP: "",
//     profileImage: "",
//     profileImageURL: "",
//     profileImagePath: "",
//     cancelReason: "",
//     profileVerification: 0,
//     timezoneGuid: "",
//   });

//   const [IsSendOTP, setIsSendOTP] = useState(false);
//   const [CitizenshipData, setCitizenshipData] = useState([]);
//   const [LanguageData, setLanguageData] = useState([]);
//   const [WebSiteLanguageData, setWebSiteLanguageData] = useState([]);
//   const [TimezoneData, setTimezoneData] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [changePasswordPopup, setChangePasswordPopup] = useState(false);
//   const [deactivateAccountPopup, setDeactivateAccountPopup] = useState(false);
//   const [sendOTPPopup, setSendOTPPopup] = useState(false);
//   const [disableTab, setDisableTab] = useState(false);

//   useEffect(() => {

//     getLanguages();
//     getCountry();
//     getWebsiteLanguages();
//     getTimezones();
//     getProfilePersonalData();

//     if (
//       LoadedData &&
//       CitizenshipData.length &&
//       LanguageData.length &&
//       WebSiteLanguageData.length &&
//       TimezoneData &&
//       Object.keys(ProfilePersonalInfo).length
//     )
//       setLoadedData( true );
//   },[]);

//   const getLanguages = () =>
//     promiseWrapper(props.actions.getLanguages).then((jsdata) =>
//       setLanguageData(jsdata)
//     );

//   const getCountry = () =>
//     promiseWrapper(props.actions.getCountry).then((jsdata) =>
//       setCitizenshipData(jsdata)
//     );

//   const getWebsiteLanguages = () =>
//     promiseWrapper(props.actions.getWebsiteLanguages).then((jsdata) =>
//       setWebSiteLanguageData(jsdata)
//     );

//   const getTimezones = () =>
//     promiseWrapper(props.actions.getTimezones).then((jsdata) =>
//       setTimezoneData(jsdata)
//     );

//   const getProfilePersonalData = () => {
//     promiseWrapper(props.actions.getProfileInfo, {
//       userGuid: localStorage.getItem(localStorageKeys.userId),
//     }).then((data) => {
//       setProfilePersonalInfo(
//         {
//           ...data,
//           doB: data.doB != null ? data.doB.substr(0, 10) : null,
//           gender: data.gender.toString(),
//           preferredLanguageIds: data.preferredLanguageIds.map((v) =>
//             v.toString()
//           ),
//         },
//         () => {
//           localStorage.setItem(
//             localStorageKeys.profileImage,
//             data.profileImageURL
//           );
//           if (data.languageId === null || data.languageId < 0) {
//             setDisableTab(true);
//           }
//         }
//       );
//     });
//   };

//   const togglePop = () => setModal(!modal);

//   const togglechangePasswordPopup = () =>
//     setChangePasswordPopup(!changePasswordPopup);

//   const toggleDeactivateAccountPopup = () =>
//     setDeactivateAccountPopup(!deactivateAccountPopup);

//   const toggleSendOTPPopup = () => {
//     if (sendOTPPopup === false) SendOTPText();
//     else setSendOTPPopup(!sendOTPPopup);
//   };

//   const SendOTPText = () => {
//     if (isEmpty(ProfilePersonalInfo["phone"]))
//       toast.error("Please enter mobile number");
//     else {
//       promiseWrapper(props.actions.sendTextOTP, {
//         userGuid: localStorage.getItem(localStorageKeys.userId),
//         mobile: ProfilePersonalInfo.phone,
//       }).then((jsdata) => {
//         setIsSendOTP(true);
//         setSendOTPPopup(!sendOTPPopup);
//       });
//     }
//   };


//   const SavePersonalProfile=(ProfilePersonalInfo)=> {
//     let prfInfo = {
//       userGuid: localStorage.getItem(localStorageKeys.userId),
//       firstName: ProfilePersonalInfo["firstName"],
//       lastName: ProfilePersonalInfo["lastName"],
//       email: ProfilePersonalInfo["email"],
//       phone: ProfilePersonalInfo["phone"],
//       address: ProfilePersonalInfo["address"],
//       userType: ProfilePersonalInfo["userType"],
//       isVerified: ProfilePersonalInfo["isVerified"],
//       isEmailVerified: ProfilePersonalInfo["isEmailVerified"],
//       isMobileVerified: ProfilePersonalInfo["isMobileVerified"],
//       languageId: Number(ProfilePersonalInfo["languageId"]),
//       gender: Number(ProfilePersonalInfo["gender"]),
//       doB: ProfilePersonalInfo["doB"],
//       citizenshipId: Number(ProfilePersonalInfo["citizenshipId"]),
//       preferredLanguageIds: ProfilePersonalInfo["preferredLanguageIds"].map(
//         (v) => parseInt(v, 10)
//       ),
//       mobileOTP: ProfilePersonalInfo["mobileOTP"],
//       profileImage: ProfilePersonalInfo["profileImage"],
//       profileImageURL: ProfilePersonalInfo["profileImageURL"],
//       profileImagePath: ProfilePersonalInfo["profileImagePath"],
//       timezoneGuid: ProfilePersonalInfo["timezoneGuid"],
//     };
//     promiseWrapper(props.actions.saveProfileInfo, {
//       userModel: prfInfo,
//     }).then((data) => {
//       if (data.data.isSuccess == true) {
//         setDisableTab( false );
//         toast.success(data.data.message);
//         // $('.nav-pills a[href="#additional-info"]').tab('show');
//         localStorage.setItem(
//           localStorageKeys.profileImage,
//           ProfilePersonalInfo.profileImageURL
//         );
//       } else {
//         toast.error(data.data.message);
//       }
//     });
//   }

//   const GetProfIMGData=(img)=> {
//     // setState((prevState) => ({
//     //   ProfilePersonalInfo: {
//     //     ...prevProfilePersonalInfo,
//     //     profileImageURL: img,
//     //     profileImage: img,
//     //   },
//     // }));
//     setProfilePersonalInfo({...ProfilePersonalInfo ,profileImageURL:img, profileImage:img})
//   }

//   return(<>
//    <div>
//         <DoctorHeader />
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row">
//               <DoctorLeftPanel />
//               {LoadedData && LoadedData && (
//                 <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
//                   <div className="row search-bar">
//                     <div className="py-4 search-bar-text w-100 bg-light">
//                       {t("Doctor.Profile_Basic.My_Profile")}
//                     </div>
//                   </div>
//                   <div className="row my-3 px-4">
//                     <div className="my-profile-form">
//                       <div className="divForm">
//                         <div className="row">
//                           <div className="col-md-4">
//                             <div className="my-profile-container d-flex flex-column align-items-center my-5">
//                               <div className="my-profile-photo d-flex justify-content-center align-items-center">
//                                 <img
//                                   style={{ borderRadius: "inherit" }}
//                                   src={
//                                     ProfilePersonalInfo[
//                                       "profileImage"
//                                     ]
//                                   }
//                                   alt="profile img"
//                                 />
//                               </div>
//                               <div className="my-profile-info my-3">
//                                 <a
//                                   style={{ cursor: "pointer" }}
//                                   onClick={togglePop}
//                                 >
//                                   {t(
//                                     "Doctor.Profile_Basic.Change_Profile_Picture"
//                                   )}
//                                 </a>
//                               </div>
//                               {modal ? (
//                                 <ProfileImgPopup
//                                   profImg={
//                                     ProfilePersonalInfo[
//                                       "profileImageURL"
//                                     ] === null
//                                       ? ProfilePersonalInfo[
//                                           "profileImage"
//                                         ]
//                                       : ProfilePersonalInfo[
//                                           "profileImageURL"
//                                         ]
//                                   }
//                                   profImgData={GetProfIMGData}
//                                   toggle={togglePop}
//                                 />
//                               ) : null}
//                               <div className="my-profile-details">
//                                 <div className="my-profile my-3">
//                                   <span>
//                                     {t("Doctor.Profile_Basic.Profile")} :{" "}
//                                   </span>
//                                   {ProfilePersonalInfo[
//                                     "profileVerification"
//                                   ] == "1" && (
//                                     <span className="profile-not-verified">
//                                       {t("Doctor.Profile_Basic.Not_Verified")}
//                                     </span>
//                                   )}
//                                   {ProfilePersonalInfo[
//                                     "profileVerification"
//                                   ] == "2" && (
//                                     <span
//                                       className="profile-verified"
//                                       style={{ color: "rgb(32, 202, 214)" }}
//                                     >
//                                       {t("Doctor.Profile_Basic.In_Process")}
//                                     </span>
//                                   )}
//                                   {ProfilePersonalInfo[
//                                     "profileVerification"
//                                   ] == "3" && (
//                                     <span className="profile-verified">
//                                       {t("Doctor.Profile_Basic.Verified")}
//                                     </span>
//                                   )}
//                                   {ProfilePersonalInfo[
//                                     "profileVerification"
//                                   ] == "4" && (
//                                     <span className="profile-not-verified">
//                                       {t("Doctor.Profile_Basic.Rejected")}
//                                     </span>
//                                   )}
//                                   {ProfilePersonalInfo[
//                                     "profileVerification"
//                                   ] == "5" && (
//                                     <span className="profile-not-verified">
//                                       {t(
//                                         "Doctor.Profile_Basic.NeedAdditionInfo"
//                                       )}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="my-email my-3">
//                                   <span>
//                                     {t("Doctor.Profile_Basic.Email")} :{" "}
//                                   </span>
//                                   {ProfilePersonalInfo[
//                                     "isEmailVerified"
//                                   ] == true ? (
//                                     <span className="email-verified">
//                                       {" "}
//                                       {t("Doctor.Profile_Basic.Verified")}{" "}
//                                     </span>
//                                   ) : (
//                                     <span className="email-not-verified">
//                                       {t("Doctor.Profile_Basic.Not_Verified")}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="my-phone my-3">
//                                   <span>
//                                     {t("Doctor.Profile_Basic.Mobile")} :{" "}
//                                   </span>
//                                   {ProfilePersonalInfo[
//                                     "isMobileVerified"
//                                   ] === true ? (
//                                     <span className="mobile-verified">
//                                       {" "}
//                                       {t("Doctor.Profile_Basic.Verified")}{" "}
//                                     </span>
//                                   ) : (
//                                     <span className="mobile-not-verified">
//                                       {t("Doctor.Profile_Basic.Not_Verified")}
//                                     </span>
//                                   )}
//                                   {ProfilePersonalInfo[
//                                     "isMobileVerified"
//                                   ] === false && (
//                                     <span className="mx-4">
//                                       <a
//                                         style={{ cursor: "pointer" }}
//                                         className="send-otp"
//                                         onClick={toggleSendOTPPopup}
//                                       >
//                                         {t("Doctor.Profile_Basic.Send_OTP")}
//                                       </a>
//                                     </span>
//                                   )}
//                                   {sendOTPPopup ? (
//                                     <SendOTPPopup
//                                       toggleSendOTP={toggleSendOTPPopup}
//                                       OTPMobileNo={
//                                         ProfilePersonalInfo.phone
//                                       }
//                                     />
//                                   ) : null}
//                                 </div>
//                                 {(ProfilePersonalInfo
//                                   .profileVerification == "4" ||
//                                   ProfilePersonalInfo
//                                     .profileVerification == "5") && (
//                                   <div>
//                                     <p>
//                                       <strong>
//                                         {t(
//                                           "Doctor.Profile_Basic.Reject_Reason"
//                                         )}
//                                         :
//                                       </strong>{" "}
//                                       <br />
//                                       {
//                                         ProfilePersonalInfo
//                                           .cancelReason
//                                       }
//                                     </p>
//                                   </div>
//                                 )}
//                                 <div className="my-phone my-3">
//                                   <a
//                                     className="send-otp"
//                                     style={{ cursor: "pointer" }}
//                                     onClick={togglechangePasswordPopup}
//                                   >
//                                     {t("Doctor.Profile_Basic.Change_Password")}
//                                   </a>
//                                 </div>
//                                 {changePasswordPopup ? (
//                                   <ChangePasswordPopup
//                                     toggleChangePassword={
//                                       togglechangePasswordPopup
//                                     }
//                                   />
//                                 ) : null}
//                                 <div className="my-phone my-3">
//                                   <a
//                                     className="mobile-not-verified"
//                                     style={{ cursor: "pointer" }}
//                                     onClick={toggleDeactivateAccountPopup

//                                     }
//                                   >
//                                     {t(
//                                       "Doctor.Profile_Basic.Deactivate_Account"
//                                     )}
//                                   </a>
//                                 </div>
//                                 <div className="my-phone my-3">
//                                   <Link
//                                     className="send-otp"
//                                     to={`/book-an-appoinment-doc-detail/${localStorage.getItem(
//                                       "user-id"
//                                     )}`}
//                                   >
//                                     {t(
//                                       "Doctor.Profile_Basic.ViewAsPatientProfile"
//                                     )}
//                                   </Link>
//                                 </div>
//                                 {deactivateAccountPopup ? (
//                                   <DeactivateAccountPopup
//                                     user="Doctor"
//                                     toggleDeactivateAccount={
//                                       toggleDeactivateAccountPopup
//                                     }
//                                   />
//                                 ) : null}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-md-8" id="my-doctor-profile">
//                             <ul
//                               className="nav nav-pills nav-fill"
//                               id="myprofiletab"
//                               role="tablist"
//                             >
//                               <li className="nav-item">
//                                 <a
//                                   className="nav-link active"
//                                   id="personal-info-tab"
//                                   data-toggle="tab"
//                                   href="#personal-info"
//                                   role="tab"
//                                   aria-controls="personal-info"
//                                   aria-selected="true"
//                                 >
//                                   {t(
//                                     "Doctor.Profile_Basic.Personal_Information"
//                                   )}
//                                 </a>
//                               </li>
//                               <li className="nav-item">
//                                 <a
//                                   className={`nav-link ${
//                                     disableTab ? "disabled" : ""
//                                   }`}
//                                   id="additional-info-tab"
//                                   data-toggle="tab"
//                                   href="#additional-info"
//                                   role="tab"
//                                   aria-controls="additional-info"
//                                   aria-selected="false"
//                                   aria-disabled={disableTab}
//                                 >
//                                   {t(
//                                     "Doctor.Profile_Basic.Additional_Information"
//                                   )}
//                                 </a>
//                               </li>
//                             </ul>
//                             <div className="tab-content px-4" id="myTabContent">
//                               <div
//                                 className="tab-pane fade show active"
//                                 id="personal-info"
//                                 role="tabpanel"
//                                 aria-labelledby="personal-info-tab"
//                               >
//                                 <PersonalInfo
//                                   t={t}
//                                   ProfilePersonalInfo={ProfilePersonalInfo}
//                                   WebSiteLanguageData={WebSiteLanguageData}
//                                   CitizenshipData={CitizenshipData}
//                                   TimezoneData={TimezoneData}
//                                   LanguageData={LanguageData}
//                                   onSubmit={(e) => SavePersonalProfile(e)}
//                                 />
//                               </div>
//                               <div
//                                 className="tab-pane fade"
//                                 id="additional-info"
//                                 role="tabpanel"
//                                 aria-labelledby="additional-info-tab"
//                               >
//                                 <DoctorAdditionalInfo />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <DoctorFooter />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//   </>)
// };

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
        isEmailVerified: false,
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
        profileVerification: 0,
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
    promiseWrapper(this.props.actions.getLanguages).then((jsdata) =>
      this.setState({ LanguageData: jsdata })
    );

  getCountry = () =>
    promiseWrapper(this.props.actions.getCountry).then((jsdata) =>
      this.setState({ CitizenshipData: jsdata })
    );

  getWebsiteLanguages = () =>
    promiseWrapper(this.props.actions.getWebsiteLanguages).then((jsdata) =>
      this.setState({ WebSiteLanguageData: jsdata })
    );

  getTimezones = () =>
    promiseWrapper(this.props.actions.getTimezones).then((jsdata) =>
      this.setState({ TimezoneData: jsdata })
    );

  getProfilePersonalData = () => {
    promiseWrapper(this.props.actions.getProfileInfo, {
      userGuid: localStorage.getItem(localStorageKeys.userId),
    }).then((data) => {
      this.setState(
        {
          ProfilePersonalInfo: {
            ...data,
            doB: data.doB != null ? data.doB.substr(0, 10) : null,
            gender: data.gender.toString(),
            preferredLanguageIds: data.preferredLanguageIds.map((v) =>
              v.toString()
            ),
          },
        },
        () => {
          localStorage.setItem(
            localStorageKeys.profileImage,
            data.profileImageURL
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
      lastName: ProfilePersonalInfo["lastName"],
      email: ProfilePersonalInfo["email"],
      phone: ProfilePersonalInfo["phone"],
      address: ProfilePersonalInfo["address"],
      userType: ProfilePersonalInfo["userType"],
      isVerified: ProfilePersonalInfo["isVerified"],
      isEmailVerified: ProfilePersonalInfo["isEmailVerified"],
      isMobileVerified: ProfilePersonalInfo["isMobileVerified"],
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
    };
    promiseWrapper(this.props.actions.saveProfileInfo, {
      userModel: prfInfo,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        this.setState({ disableTab: false });
        toast.success(data.data.message);
        window.$('.nav-pills a[href="#additional-info"]').tab('show');
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
                                    { Avatar }
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
                                  ] == "1" && (
                                      <span className="profile-not-verified">
                                        {t("Doctor.Profile_Basic.Not_Verified")}
                                      </span>
                                    )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] == "2" && (
                                      <span
                                        className="profile-verified"
                                        style={{ color: "rgb(32, 202, 214)" }}
                                      >
                                        {t("Doctor.Profile_Basic.In_Process")}
                                      </span>
                                    )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] == "3" && (
                                      <span className="profile-verified">
                                        {t("Doctor.Profile_Basic.Verified")}
                                      </span>
                                    )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] == "4" && (
                                      <span className="profile-not-verified">
                                        {t("Doctor.Profile_Basic.Rejected")}
                                      </span>
                                    )}
                                  {this.state.ProfilePersonalInfo[
                                    "profileVerification"
                                  ] == "5" && (
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
                                  ] == true ? (
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
                                  .profileVerification == "4" ||
                                  this.state.ProfilePersonalInfo
                                    .profileVerification == "5") && (
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
                                    to={`/book-an-appoinment-doc-detail/${localStorage.getItem(
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
                                  className={`nav-link ${disableTab ? "disabled" : ""
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
