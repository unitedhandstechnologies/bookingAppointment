import { Field, Formik } from 'formik';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { isEmpty, localStorageKeys, promiseWrapper } from '../../../utility/common';
import ChangePasswordPopup from '../../Doctor/changePasswordPopup'
import DeactivateAccountPopup from '../../Doctor/deactivateAccountPopup';
import ProfileImgPopup from '../../Doctor/profileImgPopup'
import SendOTPPopup from '../../Doctor/sendOTPPopup';
import { object, string } from 'yup';
import ErrorMessage from "../../../commonComponent/Elements/errorMessage";
import Select from "react-select";

class PersonalInformation extends Component {
 constructor(props) {
  super(props);
  this.state = {
   ProfilePersonalInfo: {},
   IsSendOTP: false,
   CitizenshipData: [],
   LanguageData: [],
   WebSiteLanguageData: [],
   TimezoneData: [],
   modal: false,
   changePasswordPopup: false,
   deactivateAccountPopup: false,
   sendOTPPopup: false,
   CurrencyData: [],
   SelectedCurrency: {},
   loaded: false,
   error: "",
   success: "",
   errorTimer: null,
   successTimer: null
  }
 }

 componentDidMount() {
  this.setState({ WebSiteLanguageData: JSON.parse(localStorage.getItem(localStorageKeys.websiteLanguageData)) })
  this.getAllCurrency();
  this.getCountry();
  this.getLanguages();
  this.getWebsiteLanguages();
  this.getTimezones();
  this.getPatientProfileInfo();
 }

 componentDidUpdate() {
  const state = this.state;
  if (Object.keys(state.ProfilePersonalInfo).length && state.CitizenshipData.length && state.LanguageData && state.TimezoneData && state.CurrencyData && state.WebSiteLanguageData && !state.loaded) this.setState({ loaded: true })
 }

 componentWillUnmount() {
  clearTimeout(this.state.errorTimer);
  clearTimeout(this.state.successTimer);
 }

 togglePop = () => this.setState({ modal: !this.state.modal })

 GetProfIMGData = (img) => this.setState(prevState => ({
  ProfilePersonalInfo: { ...prevState.ProfilePersonalInfo, profileImageURL: img, profileImage: img }
 }));


 togglechangePasswordPopup = () => this.setState({ changePasswordPopup: !this.state.changePasswordPopup })

 toggleDeactivateAccountPopup = () => this.setState({ deactivateAccountPopup: !this.state.deactivateAccountPopup })

 toggleSendOTPPopup = () => {
  if (this.state.sendOTPPopup === false) this.SendOTPText()
  else this.setState({
   sendOTPPopup: !this.state.sendOTPPopup
  })
 }

 SendOTPText() {
  if (isEmpty(this.state.ProfilePersonalInfo["phone"])) {
   toast.error("Please enter mobile number");
  }
  else {
   promiseWrapper(this.props.docactions.sendTextOTP, { userGuid: localStorage.getItem("user-id"), mobile: this.state.ProfilePersonalInfo["phone"] }).then((jsdata) => {
    this.setState({ IsSendOTP: true }, () => {
     this.setState({
      sendOTPPopup: !this.state.sendOTPPopup
     });
    });
   });
  }
 }

 updateCurrency = (currencyCode) => this.setState({ SelectedCurrency: this.selectCurrencyFromList(currencyCode) })

 selectCurrencyFromList = (currencyCode) => {
  for (let i = 0; i < this.state.CurrencyData.length; i++) {
   if (this.state.CurrencyData[i].currencyCode === currencyCode) return this.state.CurrencyData[i]
  }
 }

 changeStateLanguage = (langObj) => promiseWrapper(this.props.comactions.changeLanguage, { language: langObj })

 getLanguageObject = (languageData, languageId) => {
  let langObj = languageData.filter(language => {
   return (language.languageId === languageId)
  });
  return langObj[0];
 }

 getAllCurrency = () => promiseWrapper(this.props.docactions.getCurrency).then(jsdata => this.setState({ CurrencyData: jsdata })).catch(err => console.log(err))

 getCountry = () => promiseWrapper(this.props.docactions.getCountry).then(jsdata => this.setState({ CitizenshipData: jsdata }))

 getLanguages = () => promiseWrapper(this.props.docactions.getLanguages).then(jsdata => this.setState({ LanguageData: jsdata }))

 getWebsiteLanguages = () => promiseWrapper(this.props.docactions.getWebsiteLanguages).then((jsdata) => {
  this.setState({ WebSiteLanguageData: jsdata })
 })
 getTimezones = () => promiseWrapper(this.props.docactions.getTimezones).then((jsdata) => this.setState({ TimezoneData: jsdata }))

 getPatientProfileInfo = () => promiseWrapper(this.props.patientactions.getPatientProfileInfo, { userGuid: localStorage.getItem(localStorageKeys.userId) }).then((data) => {
  const languageObj = this.getLanguageObject(JSON.parse(localStorage.getItem(localStorageKeys.websiteLanguageData)), parseInt(data.languageId));
  this.setState({
   ProfilePersonalInfo: { ...data, doB: data.doB != null ? data.doB.substr(0, 10) : null },
   SelectedCurrency: data.currency && this.selectCurrencyFromList(data.currency)
  }, () => { if (languageObj) this.changeStateLanguage(languageObj) });
 });

 setStates = (e) => this.setState(prevState => ({
  ProfilePersonalInfo: {
   ...prevState.ProfilePersonalInfo,
   [e.target.name]: e.target.value
  }
 }))

 selectDefaultCurrency = (currencyCode) => {
  if (currencyCode && this.state.CurrencyData.length) {
   const defCurrencyOption = this.state.CurrencyData.find(currency => currencyCode === currency.currencyCode);
   return { label: defCurrencyOption.currency, value: defCurrencyOption.currencyCode }
  }
 }

 selectDefaultTimezone = (timezoneGuid) => {
  if (timezoneGuid && this.state.TimezoneData.length) {
   const defTimezoneOption = this.state.TimezoneData.find(timezone => timezoneGuid === timezone.timezoneGuid);
   return { label: defTimezoneOption.displayName, value: defTimezoneOption.timezoneGuid }
  }
 }

 selectDefaultcitizenshipId = (citizenshipId) => {
  if (citizenshipId && this.state.CitizenshipData.length) {
   const defCitizenshipOption = this.state.CitizenshipData.find(citizenship => citizenshipId === citizenship.countryID);
   return { label: defCitizenshipOption.citizenship, value: defCitizenshipOption.countryID }
  }
 }

 selectDefaultlanguageId = (languageId) => {
  if (languageId && this.state.WebSiteLanguageData.length) {
   const defLanguageOption = this.state.WebSiteLanguageData.find(language => languageId === language.languageId);
   return { label: defLanguageOption.languageName, value: defLanguageOption.languageId }
  }
 }


 SavePersonalProfile(values) {
  console.log(values);
  // return;
  let prfInfo = {
   userGuid: localStorage.getItem(localStorageKeys.userId),
   firstName: values.firstName,
   lastName: values.lastName,
   email: values.email,
   phone: values.phone,
   userType: this.state.ProfilePersonalInfo.userType,
   isVerified: this.state.ProfilePersonalInfo.isVerified,
   isEmailVerified: this.state.ProfilePersonalInfo.isEmailVerified,
   isMobileVerified: this.state.ProfilePersonalInfo.isMobileVerified,
   languageId: Number(values.languageId),
   gender: Number(values.gender),
   doB: values.doB,
   citizenshipId: Number(values.citizenshipId),
   mobileOTP: this.state.ProfilePersonalInfo.mobileOTP,
   profileImage: this.state.ProfilePersonalInfo.profileImage,
   profileImageURL: this.state.ProfilePersonalInfo.profileImageURL,
   profileImagePath: this.state.ProfilePersonalInfo.profileImagePath,
   weight: Number(values.weight),
   height: Number(values.height),
   occupation: values.occupation,
   timezoneGuid: values.timezoneGuid,
   socialSecurityNumber: values.socialSecurityNumber,
   currency: values.currencyCode
  };

  promiseWrapper(this.props.patientactions.savePatientProfileInfo, { userModel: prfInfo })
   .then((data) => {
    if (data.data.isSuccess === true) {
     this.setState({
      success: data.data.message,
      successTimer: setTimeout(() => {
       this.setState({ success: "" })
       const languageObj = this.getLanguageObject(this.state.LanguageData, parseInt(values.languageId));
       this.changeStateLanguage(languageObj);
       window.$('.nav-pills a[href="#health-info"]').tab('show');
       localStorage.setItem(localStorageKeys.profileImage, this.state.ProfilePersonalInfo.profileImage);
      }, 2000)
     })
    }
    else this.setState({
     error: data.data.errorMessage,
     errorTimer: setTimeout(() => this.setState({ error: "" }), 3000),
    })
   });
 }

 render() {
  const { t } = this.props;
  const { ProfilePersonalInfo, modal, changePasswordPopup, deactivateAccountPopup, sendOTPPopup, WebSiteLanguageData, TimezoneData, CurrencyData, CitizenshipData, loaded, error, success } = this.state;
  return (
   <div className="row personal-info-tab-container">
    <div className="col-md-4">
     <div className="my-profile-container d-flex flex-column align-items-center my-5">
      <div className="my-profile-photo d-flex justify-content-center align-items-center">
       <img style={{ borderRadius: "inherit" }} src={ProfilePersonalInfo["profileImage"]} alt="profile" />
      </div>
      <div className="my-profile-info my-3">
       <div style={{ cursor: "pointer" }} onClick={this.togglePop}>{t('Doctor.Profile_Basic.Change_Profile_Picture')}
       </div>
      </div>
      {modal ? <ProfileImgPopup profImg={ProfilePersonalInfo["profileImageURL"] === null ? ProfilePersonalInfo["profileImage"] : ProfilePersonalInfo["profileImageURL"]} profImgData={this.GetProfIMGData.bind(this)} toggle={this.togglePop} /> : null}
      <div className="my-profile-details">
       <div className="my-phone my-3">
        <div className="send-otp" style={{ cursor: "pointer" }} onClick={this.togglechangePasswordPopup}>
         {t('Doctor.Profile_Basic.Change_Password')}
        </div>
       </div>
       {changePasswordPopup ? <ChangePasswordPopup toggleChangePassword={this.togglechangePasswordPopup} /> : null}
       <div className="my-phone my-3">
        <div className="mobile-not-verified" style={{ cursor: "pointer" }} onClick={this.toggleDeactivateAccountPopup.bind(this)}>{t('Patient.PatientProfile.Delete_Account')}</div>
       </div>
       {deactivateAccountPopup ? <DeactivateAccountPopup user="Patient" toggleDeactivateAccount={this.toggleDeactivateAccountPopup} /> : null}
       {ProfilePersonalInfo["isMobileVerified"] === false &&
        <span><div style={{ cursor: "pointer" }} className="send-otp" onClick={this.toggleSendOTPPopup}>{t('Patient.PatientProfile.Send_OTP')}</div></span>
       }
       {sendOTPPopup ? <SendOTPPopup toggleSendOTP={this.toggleSendOTPPopup} OTPMobileNo={ProfilePersonalInfo.phone} /> : null}
      </div>
     </div>
    </div>
    {loaded &&
     <div className="col-md-8 personal-info-right-content" >
      <div className="mt-3">
       {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
       {success && <div className="alert alert-success" role="alert">{success}</div>}
      </div>
      <Formik
       enableReinitialize
       initialValues={{
        firstName: ProfilePersonalInfo.firstName || "",
        lastName: ProfilePersonalInfo.lastName || "",
        phone: ProfilePersonalInfo.phone || "",
        email: ProfilePersonalInfo.email || "",
        gender: ProfilePersonalInfo.gender ? (ProfilePersonalInfo.gender).toString() : "",
        currencyCode: ProfilePersonalInfo.currency || "",
        socialSecurityNumber: ProfilePersonalInfo.socialSecurityNumber || "",
        timezoneGuid: ProfilePersonalInfo.timezoneGuid || "",
        citizenshipId: ProfilePersonalInfo.citizenshipId || "",
        languageId: ProfilePersonalInfo.languageId || "",
        occupation: ProfilePersonalInfo.occupation || "",
        height: ProfilePersonalInfo.height || "",
        weight: ProfilePersonalInfo.weight || "",
        doB: ProfilePersonalInfo.doB || ""
       }}
       validationSchema={patientProfileSchema}
       onSubmit={(values) => this.SavePersonalProfile(values)}
      >
       {({ handleSubmit, errors, touched, handleChange }) => (
        <div
         className="divForm mt-4"
         onSubmit={handleSubmit}
        >
         <div className="row">
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label htmlFor='firstName' className="form-label">{t('Doctor.Profile_Basic.First_Name')}</label>
            <Field
             type="text"
             className={
              errors.firstName && touched.firstName
               ? "form-control error-message-input"
               : "form-control"}
             name='firstName'
             placeholder={t('Doctor.Profile_Basic.First_Name')}
            />
            {errors.firstName && touched.firstName && <ErrorMessage error={errors.firstName} t={t} />}
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label className="form-label">{t('Doctor.Profile_Basic.Last_Name')}</label>
            <Field
             type="text"
             className={
              errors.lastName && touched.lastName
               ? "form-control error-message-input"
               : "form-control"}
             name='lastName'
             placeholder={t('Doctor.Profile_Basic.Last_Name')}
            />
            {errors.lastName && touched.lastName && <ErrorMessage error={errors.lastName} t={t} />}
           </div>
          </div>
         </div>
         <div className="row">
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label className="form-label">{t('Doctor.Profile_Basic.Mobile_Number')}</label>
            <label data-domain="Not Verified" className="patient-mobile-not-verify mobile-verify">
            </label>
            <Field
             type="text"
             className={
              errors.phone && touched.phone
               ? "form-control error-message-input"
               : "form-control"}
             name='phone'
             onChange={(e) => this.setStates(e)}
             placeholder={t('Doctor.Profile_Basic.Mobile_Number')}
            />
            {errors.phone && touched.phone && <ErrorMessage error={errors.phone} t={t} />}
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label className="form-label">{t('Doctor.Profile_Basic.Email_Address')}</label>
            <label data-domain="Verified" className="patient-email-verify email-verify" />
            <Field
             type="text"
             disabled
             name='email'
             className={
              errors.email && touched.email
               ? "form-control error-message-input"
               : "form-control"}
             placeholder={t('Doctor.Profile_Basic.Email_Address')}
            />
            {errors.email && touched.email && <ErrorMessage error={errors.email} t={t} />}
           </div>
          </div>
         </div>
         <div className="row">
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <span>{t('Doctor.Profile_Basic.Sex')}</span>
            <div className={`d-flex w-100 justify-content-between divForm-radio mt-1 ${errors.gender && touched.gender && "error-message-input"}`}>
             <div className="form-check">
              <label className="form-check-label">
               <Field
                className="form-check-input"
                type="radio"
                value="1"
                name="gender"
               />
               {t('Doctor.Profile_Basic.Male')}
              </label>
             </div>
             <div className="form-check">
              <label className="form-check-label">
               <Field
                className="form-check-input"
                type="radio"
                value="2"
                name="gender"
               />
               {t('Doctor.Profile_Basic.Female')}
              </label>
             </div>
             <div className="form-check">
              <label className="form-check-label">
               <Field
                className="form-check-input"
                type="radio"
                value="3"
                name="gender"
               />
               {t('Doctor.Profile_Basic.Other')}
              </label>
             </div>
            </div>
            {errors.gender && touched.gender && <ErrorMessage error={errors.gender} t={t} />}
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label className="form-label">{t('Doctor.Profile_Basic.Date_of_Birth')}</label>
            <Field
             type="date"
             max={new Date().toISOString().split("T")[0]}
             className={
              errors.doB && touched.doB
               ? "form-control error-message-input"
               : "form-control"}
             name='doB'
            />
            {errors.doB && touched.doB && <ErrorMessage error={errors.doB} t={t} />}
           </div>
          </div>
         </div>
         <div className="row">
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <div className="row">
             <div className="col-md-6">
              <div className="form-group">
               <div className="search-bar-text-input">
                <label className="form-label">{t('Patient.PatientProfile.Weight')}</label>
                <Field
                 type="text"
                 className={
                  errors.weight && touched.weight
                   ? "form-control error-message-input"
                   : "form-control"}
                 name='weight'
                 placeholder={t('Patient.PatientProfile.Weight')}
                />
                {errors.weight && touched.weight && <ErrorMessage error={errors.weight} t={t} />}
               </div>
              </div>
             </div>
             <div className="col-md-6">
              <div className="form-group">
               <div className="search-bar-text-input">
                <label className="form-label">{t('Patient.PatientProfile.Height')}</label>
                <Field type="text"
                 className={
                  errors.height && touched.height
                   ? "form-control error-message-input"
                   : "form-control"}
                 name='height'
                 placeholder={t('Patient.PatientProfile.Height')}
                />
                {errors.height && touched.height && <ErrorMessage error={errors.height} t={t} />}
               </div>
              </div>
             </div>
            </div>
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label className="form-label">{t('Patient.PatientProfile.Occupation')}</label>
            <Field
             type="text"
             className={
              errors.occupation && touched.occupation
               ? "form-control error-message-input"
               : "form-control"}
             name='occupation'
             placeholder={t('Patient.PatientProfile.Occupation')}
            />
            {errors.occupation && touched.occupation && <ErrorMessage error={errors.occupation} t={t} />}
           </div>
          </div>
         </div>
         <div className="row">
          <div className="col-lg-6 col-md-12">
           <div className="form-group">
            <div className="search-bar-text-input mb-4">
             <label className="form-label">{t('Doctor.Profile_Basic.Language_Website')}</label>
             <Select
              name='languageId'
              className={`${errors.socialSecurityNumber && touched.socialSecurityNumber && "error-message-input"}`}
              onChange={selectedOption => {
               let event = { target: { name: 'languageId', value: selectedOption.value } }; handleChange(event)
              }}
              defaultValue={() => this.selectDefaultlanguageId(ProfilePersonalInfo.languageId)}
              options={WebSiteLanguageData.map(language => { return { value: language.languageId, label: language.languageName } })} />
             {/* <option value="">{t('Doctor.Profile_Basic.Select_Language')}</option>
                                          {WebSiteLanguageData.map((h, i) => (<option key={i} value={h.languageId}>{h.languageName}</option>))}
                                       </Select> */}
             {errors.languageId && touched.languageId && <ErrorMessage error={errors.languageId} t={t} />}
            </div>
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
           <div className="form-group">
            <div className="search-bar-text-input mb-4">
             <label className="form-label">{t('Doctor.Profile_Basic.Citizenship')}</label>
             <Select
              // as="select"
              name='citizenshipId'
              className={`${errors.citizenshipId && touched.citizenshipId && "error-message-input"}`}
              onChange={selectedOption => {
               let event = { target: { name: 'citizenshipId', value: selectedOption.value } }; handleChange(event)
              }}
              defaultValue={() => this.selectDefaultcitizenshipId(ProfilePersonalInfo.citizenshipId)}
              options={CitizenshipData.map(citizenship => { return { value: citizenship.countryID, label: citizenship.citizenship } })} />
             {/* <option value="">{t('Doctor.Profile_Basic.Select_Citizenship')}</option>
                                          {CitizenshipData.map((h, i) => (<option key={i} value={h.countryID}>{h.citizenship}</option>))}
                                       </Select> */}
             {errors.citizenshipId && touched.citizenshipId && <ErrorMessage error={errors.citizenshipId} t={t} />}
            </div>
           </div>
          </div>
         </div>
         <div className="row">
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label className="form-label">{t('Patient.PatientProfile.Timezone')}</label>
            <Select
             name='timezoneGuid'
             className={`${errors.timezoneGuid && touched.timezoneGuid && "error-message-input"}`}
             onChange={selectedOption => {
              let event = { target: { name: 'timezoneGuid', value: selectedOption.value } }; handleChange(event)
             }}
             defaultValue={() => this.selectDefaultTimezone(ProfilePersonalInfo.timezoneGuid)}
             options={TimezoneData.map(timezone => { return { value: timezone.timezoneGuid, label: timezone.displayName } })}
            />
            {/* <option value="">{t('Patient.PatientProfile.Select_Timezone')}</option>
                                       {TimezoneData.map((h, i) => (<option key={i} value={h.timezoneGuid}>{h.displayName}</option>))}
                                    </Select> */}
            {errors.timezoneGuid && touched.timezoneGuid && <ErrorMessage error={errors.timezoneGuid} t={t} />}
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
           <div className="form-group">
            <div className="search-bar-text-input mb-4">
             <label className="form-label">{t("Doctor.Profile_Basic.Social_Security_Number")}</label>
             <Field
              type="text"
              className={
               errors.socialSecurityNumber && touched.socialSecurityNumber
                ? "form-control error-message-input"
                : "form-control"}
              name='socialSecurityNumber'
             />
             {errors.socialSecurityNumber && touched.socialSecurityNumber && <ErrorMessage error={errors.socialSecurityNumber} t={t} />}
            </div>
           </div>
          </div>
         </div>
         <div className="row">
          <div className="col-lg-6 col-md-12">
           <div className="search-bar-text-input mb-4">
            <label className="form-label">
             {t("Admin.AdminFinance.Currency")}
            </label>
            <Select
             name='currencyCode'
             className={`${errors.currencyCode && touched.currencyCode && "error-message-input"}`}
             onChange={selectedOption => {
              let event = { target: { name: 'currencyCode', value: selectedOption.value } }
              handleChange(event)
             }}
             defaultValue={() => this.selectDefaultCurrency(ProfilePersonalInfo.currency)}
             options={CurrencyData.map(currency => { return { value: currency.currencyCode, label: `${currency.currency} - ${currency.currencyCode}` } })}
            />
            {/* <option value="">Select Currency</option>
                                       {CurrencyData.map((currency, i) => (<option key={i} value={currency.currencyCode}>{currency.currency} - {currency.currencyCode}</option>))}
                                    </Select> */}
            {errors.currencyCode && touched.currencyCode && <ErrorMessage error={errors.currencyCode} t={t} />}
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
          </div>
         </div>
         <div className="w-100">
          <div className="mb-5 d-flex justify-content-end">
           <button className="btn MyButton my-button-25 personal-info-button"
            onClick={handleSubmit}
            data-toggle="tab"
            type="submit"
           >{t('Patient.PatientProfile.Save_Next')}</button>
          </div>
         </div>
        </div>
       )}
      </Formik>
     </div>}
   </div>
  )
 }
}

export default PersonalInformation

const patientProfileSchema = object({
 firstName: string().required("ProfileErrorMessages.first_name"),
 lastName: string().required("ProfileErrorMessages.last_name"),
 phone: string().required("ProfileErrorMessages.mobile"),
 email: string().required("ProfileErrorMessages.email"),
 gender: string().required("ProfileErrorMessages.sex"),
 currencyCode: string().required("ProfileErrorMessages.currency"),
 socialSecurityNumber: string().required("ProfileErrorMessages.socialsecurityNumber"),
 timezoneGuid: string().required("ProfileErrorMessages.timezone"),
 citizenshipId: string().required("ProfileErrorMessages.citizenship"),
 languageId: string().required("ProfileErrorMessages.language_platform"),
 occupation: string().required("ProfileErrorMessages.occupatiom"),
 height: string().required("ProfileErrorMessages.height"),
 weight: string().required("ProfileErrorMessages.weight"),
 doB: string().required("ProfileErrorMessages.dob")
})