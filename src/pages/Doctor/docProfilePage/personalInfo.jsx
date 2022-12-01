import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import DropdownMultiselect from "./multiSelectDropdown";
import Select from "react-select";

export class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfilePersonalInfo: this.props.ProfilePersonalInfo,
    };
  }

  UpdatePreferredLanguage = (e) => {
    this.setState((prevState) => ({
      ProfilePersonalInfo: {
        ...prevState.ProfilePersonalInfo,
        preferredLanguageIds: e,
      },
    }));
  };

  selectDefaultlanguageId = (languageId) => {
    if (languageId && this.props.WebSiteLanguageData.length) {
      const defLanguageOption = this.props.WebSiteLanguageData.find(
        (language) => languageId === language.languageId
      );
      return {
        label: defLanguageOption.languageName,
        value: defLanguageOption.languageId,
      };
    }
  };

  selectDefaultTimezone = (timezoneGuid) => {
    if (timezoneGuid && this.props.TimezoneData.length) {
      const defTimezoneOption = this.props.TimezoneData.find(
        (timezone) => timezoneGuid === timezone.timezoneGuid
      );
      return {
        label: defTimezoneOption.displayName,
        value: defTimezoneOption.timezoneGuid,
      };
    }
  };

  selectDefaultcitizenshipId = (citizenshipId) => {
    if (citizenshipId && this.props.CitizenshipData.length) {
      const defCitizenshipOption = this.props.CitizenshipData.find(
        (citizenship) => citizenshipId === citizenship.countryID
      );
      return {
        label: defCitizenshipOption.citizenship,
        value: defCitizenshipOption.countryID,
      };
    }
  };

  render() {
    const {
      t,
      WebSiteLanguageData,
      CitizenshipData,
      TimezoneData,
      LanguageData,
      onSubmit,
      ProfilePersonalInfo
    } = this.props;
    return (
      <Formik
        enableReinitialize
        initialValues={{
          languageId: ProfilePersonalInfo.languageId || "",
          preferredLanguageIds: ProfilePersonalInfo.preferredLanguageIds || "",
          firstName: ProfilePersonalInfo.firstName || localStorage.getItem("user-fullname")||"",
          lastName: ProfilePersonalInfo.lastName || "",
          gender: ProfilePersonalInfo.gender
            ? ProfilePersonalInfo.gender.toString()
            : "",
          email: ProfilePersonalInfo.email || localStorage.getItem("email")||"",
          citizenshipId: ProfilePersonalInfo.citizenshipId || "",
          doB: ProfilePersonalInfo.doB || "",
          phone: ProfilePersonalInfo.phone || "",
          timezoneGuid: ProfilePersonalInfo.timezoneGuid || "",
        }}
        // validationSchema={patientProfileSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleSubmit, errors, touched, handleChange, values }) => (
          <Form
            className="divForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <div className="row pt-2">
              <div className="col-md-6 mt-4">
                <div className="search-bar-text-input mb-4">
                  <label className="form-label">
                    {t("Doctor.Profile_Basic.Language_Website")}
                  </label>
                  <Select
                    name="languageId"
                    className={`${
                      errors.languageId &&
                      touched.languageId &&
                      "error-message-input"
                    }`}
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "languageId",
                          value: selectedOption.value,
                        },
                      };
                      handleChange(event);
                    }}
                    defaultValue={() =>
                      this.selectDefaultlanguageId(
                        ProfilePersonalInfo.languageId
                      )
                    }
                    options={WebSiteLanguageData.map((language) => {
                      return {
                        value: language.languageId,
                        label: language.languageName,
                      };
                    })}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="search-bar-text-input mb-4">
                    <label className="form-label">
                      {t("Doctor.Profile_Basic.Supported_Languages")}
                    </label>
                    <DropdownMultiselect
                      selected={ProfilePersonalInfo.preferredLanguageIds}
                      buttonClass="selectpicker search-bar-text-input physician-servicies-select form-control border-class"
                      placeholder={t(
                        "Doctor.Profile_Basic.Select_Preferred_Language"
                      )}
                      handleOnChange={(selectedOption) => {
                        let event = {
                          target: {
                            name: "preferredLanguageIds",
                            value: selectedOption,
                          },
                        };
                        handleChange(event);
                      }}
                      options={LanguageData}
                      optionKey="languageId"
                      optionLabel="languageName"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="search-bar-text-input mb-4">
                  <label className="form-label">
                    {t("Doctor.Profile_Basic.First_Name")}
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder={t("Doctor.Profile_Basic.First_Name")}
                    name="firstName"
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "firstName",
                          value: selectedOption.value,
                        },
                      };
                      handleChange(event);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="search-bar-text-input mb-4">
                  <label className="form-label">
                    {t("Doctor.Profile_Basic.Last_Name")}
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder={t("Doctor.Profile_Basic.Last_Name")}
                    name="lastName"
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "lastName",
                          value: selectedOption.value,
                        },
                      };
                      handleChange(event);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="search-bar-text-input mb-4">
                  <span>{t("Doctor.Profile_Basic.Sex")}</span>
                  <div className="d-flex w-100 justify-content-between divForm-radio mt-1">
                    <div className="form-check">
                      <div>
                        <Field
                          className="form-check-input"
                          type="radio"
                          value="1"
                          // checked={ProfilePersonalInfo.gender === "1"}
                          name="gender"
                          id="male"
                          // onChange={selectedOption => {
                          //   let event = { target: { name: 'lastName', value: selectedOption.value } }
                          //   handleChange(event)
                          // }}
                        />
                        <label className="form-check-label" htmlFor="male">
                          {t("Doctor.Profile_Basic.Male")}
                        </label>
                      </div>
                    </div>
                    <div className="form-check">
                      <div>
                        <Field
                          className="form-check-input"
                          type="radio"
                          value="2"
                          // checked={ProfilePersonalInfo.gender === "2"}
                          name="gender"
                          id="female"
                          // onChange={selectedOption => {
                          //   let event = { target: { name: 'lastName', value: selectedOption.value } }
                          //   handleChange(event)
                          // }}
                        />
                        <label className="form-check-label" htmlFor="female">
                          {t("Doctor.Profile_Basic.Female")}
                        </label>
                      </div>
                    </div>
                    <div className="form-check">
                      <div>
                        <Field
                          className="form-check-input"
                          type="radio"
                          value="3"
                          // checked={ProfilePersonalInfo.gender === "3"}
                          name="gender"
                          id="other"
                          // onChange={selectedOption => {
                          //   console.log(selectedOption);
                          //   let event = { target: { name: 'lastName', value: selectedOption.target.value } }
                          //   handleChange(event)
                          // }}
                        />
                        <label className="form-check-label" htmlFor="other">
                          {t("Doctor.Profile_Basic.Other")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="search-bar-text-input mb-4">
                  <label className="form-label">
                    {t("Doctor.Profile_Basic.Email_Address")}
                  </label>
                  <Field
                    type="email"
                    disabled
                    className="form-control"
                    name="email"
                    placeholder={t("Doctor.Profile_Basic.Email_Address")}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <div className="search-bar-text-input">
                    <label className="form-label">
                      {t("Doctor.Profile_Basic.Citizenship")}
                    </label>
                    <Select
                      name="citizenshipId"
                      className={`${
                        errors.citizenshipId &&
                        touched.citizenshipId &&
                        "error-message-input"
                      }`}
                      onChange={(selectedOption) => {
                        let event = {
                          target: {
                            name: "citizenshipId",
                            value: selectedOption.value,
                          },
                        };
                        handleChange(event);
                      }}
                      defaultValue={() =>
                        this.selectDefaultcitizenshipId(
                          ProfilePersonalInfo.citizenshipId
                        )
                      }
                      options={CitizenshipData.map((citizenship) => {
                        return {
                          value: citizenship.countryID,
                          label: citizenship.citizenship,
                        };
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="search-bar-text-input mb-2">
                  <label className="form-label">
                    {t("Doctor.Profile_Basic.Date_of_Birth")}
                  </label>
                  <Field
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className="form-control"
                    name="doB"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="search-bar-text-input">
                  <label className="form-label">
                    {t("Doctor.Profile_Basic.Mobile_Number")}
                  </label>
                  {/* <span className="mx-5"><a onClick={this.SendOTPText.bind(this)} className="send-otp">Send OTP</a></span> */}
                  <Field
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder={t("Doctor.Profile_Basic.Mobile_Number")}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="search-bar-text-input mb-4">
                  <label className="form-label">
                    {t("Doctor.Profile_Basic.Timezone")}
                  </label>
                  <Select
                    name="timezoneGuid"
                    className={`${
                      errors.timezoneGuid &&
                      touched.timezoneGuid &&
                      "error-message-input"
                    }`}
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "timezoneGuid",
                          value: selectedOption.value,
                        },
                      };
                      handleChange(event);
                    }}
                    defaultValue={() =>
                      this.selectDefaultTimezone(
                        ProfilePersonalInfo.timezoneGuid
                      )
                    }
                    options={TimezoneData.map((timezone) => {
                      return {
                        value: timezone.timezoneGuid,
                        label: timezone.displayName,
                      };
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="w-100">
              <div className="mb-5 d-flex justify-content-end">
                <input
                  type="submit"
                  className="btn MyButton register-button w-25"
                  value={t("Doctor.Profile_Basic.Save_Next")}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default PersonalInfo;
