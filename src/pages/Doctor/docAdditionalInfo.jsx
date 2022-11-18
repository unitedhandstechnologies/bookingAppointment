import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import { toast } from "react-toastify";
import { stringToBoolean, promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

class DoctorAdditionalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      ShowButtonSave: "",
      PhysicianServiceList: [],
      ProfileAdditionalInfo: {
        userGuid: localStorage.getItem("user-id"),
        physicianServiceIds: [0],
        ownPractice: true,
        practiceNumber: "",
        practiceDocument: {
          fileGuid: null,
          docName: "",
          docURL: "",
        },
        clinicName: "",
        clinicContact: "",
        clinicEmail: "",
        clinicAddress: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        profileVerification: 0,
        educationModel: [
          {
            doctorEducationGuid: null,
            degreeTitle: "",
            collage: "",
            passingYear: "",
            educationCertificates: [
              {
                fileGuid: null,
                docName: "",
                docURL: "",
              },
            ],
          },
        ],
        experienceModel: [
          {
            doctorExperienceGuid: null,
            startDate: "2021-04-22T20:19:40.794Z",
            endDate: "2021-04-22T20:19:40.794Z",
            organizationName: "",
            description: "",
          },
        ],
      },
    };
  }

  componentDidMount() {
    promiseWrapper(this.props.actions.getPhysicianService).then((jsdata) => {
      this.setState({ PhysicianServiceList: jsdata }, () => {
        promiseWrapper(this.props.actions.getAdditionalInfo, {
          userGuid: localStorage.getItem("user-id"),
        }).then((data) => {
          this.setState({ ProfileAdditionalInfo: data }, () => {
            if (
              data.experienceModel != null &&
              data.experienceModel.length === 0
            ) {
              this.onAddExperience();
            } else {
              this.UpdateExperienceDates();
            }

            if (data.educationModel.length === 0) {
              this.onAddEducation();
            }

            this.setState((prevState) => ({
              ProfileAdditionalInfo: {
                ...prevState.ProfileAdditionalInfo,
                ["physicianServiceIds"]: data.physicianServiceIds.map((v) =>
                  v.toString()
                ),
              },
            }));
            this.setState((prevState) => ({
              ProfileAdditionalInfo: {
                ...prevState.ProfileAdditionalInfo,
                ["ownPractice"]: data.ownPractice.toString(),
              },
            }));
            this.setState({ LoadedData: true });
          });
        });
      });
    });
  }

  onUploadCertFile = (e) => {
    promiseWrapper(this.props.actions.uploadDoctorProfileCertificates, {
      fileType: 3,
      doctorGuid: localStorage.getItem("user-id"),
      file: e.target.files[0],
    }).then((data) => {
      if (data.data.isSuccess == true) {
        this.setState((prevState) => ({
          ProfileAdditionalInfo: {
            ...prevState.ProfileAdditionalInfo,
            practiceDocument: {
              ...prevState.ProfileAdditionalInfo.practiceDocument,
              ["docName"]: data.data.data.docName,
            },
          },
        }));
        this.setState((prevState) => ({
          ProfileAdditionalInfo: {
            ...prevState.ProfileAdditionalInfo,
            practiceDocument: {
              ...prevState.ProfileAdditionalInfo.practiceDocument,
              ["docURL"]: data.data.data.docURL,
            },
          },
        }));
        this.setState((prevState) => ({
          ProfileAdditionalInfo: {
            ...prevState.ProfileAdditionalInfo,
            practiceDocument: {
              ...prevState.ProfileAdditionalInfo.practiceDocument,
              ["fileGuid"]: null,
            },
          },
        }));
      } else {
        toast.error("there is some issue with file upload");
      }
    });
  };

  onDeletePrecticeDoc() {
    let updoc = {
      fileGuid: null,
      docName: null,
      docURL: null,
    };

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["practiceDocument"]: updoc,
      },
    }));
  }

  UpdatephysicianService = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["physicianServiceIds"]: e,
      },
    }));
  };

  UpdateOwnPractice = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["ownPractice"]: e.target.value,
      },
    }));
  };

  UpdatePracticeNumber = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["practiceNumber"]: e.target.value,
      },
    }));
  };

  UpdateClinicName = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["clinicName"]: e.target.value,
      },
    }));
  };

  UpdateClinicContact = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["clinicContact"]: e.target.value,
      },
    }));
  };

  UpdateClinicEmail = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["clinicEmail"]: e.target.value,
      },
    }));
  };

  UpdateClinicAddress = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["clinicAddress"]: e.target.value,
      },
    }));
  };

  UpdateCity = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["city"]: e.target.value,
      },
    }));
  };

  UpdateState = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["state"]: e.target.value,
      },
    }));
  };

  UpdateZip = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["zip"]: e.target.value,
      },
    }));
  };

  UpdateCountry = (e) => {
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["country"]: e.target.value,
      },
    }));
  };

  isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let result = regex.test(email);
    return result;
  }

  SaveAdditionalInfo() {
    //console.log((this.state.ProfileAdditionalInfo["physicianServiceIds"].map(v => parseInt(v, 10))));
    let errorMessage = "";
    if (
      this.state.ProfileAdditionalInfo["physicianServiceIds"].map((v) =>
        parseInt(v, 10)
      ) === "" ||
      this.state.ProfileAdditionalInfo["physicianServiceIds"].map((v) =>
        parseInt(v, 10)
      ).length === 0
    ) {
      errorMessage += `Please select at least one physician service \n`;
    }
    if (this.state.ProfileAdditionalInfo["ownPractice"] === "true") {
      if (this.state.ProfileAdditionalInfo["practiceNumber"] === "")
        errorMessage += "Please enter practice number \n";
      if (this.state.ProfileAdditionalInfo["practiceDocument"] == null)
        errorMessage += "Please upload practice licence document \n";
      else if (
        this.state.ProfileAdditionalInfo["practiceDocument"].docName == null ||
        this.state.ProfileAdditionalInfo["practiceDocument"].docName == ""
      )
        errorMessage += "Please upload practice licence document \n";
    }
    if (
      this.state.ProfileAdditionalInfo["clinicEmail"] !== "" &&
      this.isEmail(this.state.ProfileAdditionalInfo["clinicEmail"]) === false
    ) {
      errorMessage += "Enter valid practice email address \n";
    }
    if (this.state.ProfileAdditionalInfo["educationModel"].length > 0) {
      this.state.ProfileAdditionalInfo["educationModel"].forEach(function (
        val,
        index
      ) {
        console.log(val);
        if (val.degreeTitle === "")
          errorMessage += "Please enter degree title \n";
        if (val.collage === "")
          errorMessage += "Please enter university name \n";
        else if (val.educationCertificates.length === 0)
          errorMessage +=
            "Please upload at-least one education certificate for " +
            val.collage +
            " \n";
        if (val.passingYear === "")
          errorMessage += "Please enter degree obtained in Year \n";
      });
    }
    if (this.state.ProfileAdditionalInfo["experienceModel"].length > 0) {
      this.state.ProfileAdditionalInfo["experienceModel"].forEach(function (
        val,
        index
      ) {
        console.log(val);
        if (val.startDate === "") errorMessage += "Please enter start date \n";
        if (val.endDate === "") {
          //errorMessage += 'Please enter end date \n';
          val.endDate = null;
        }
        if (val.startDate !== "") {
          if (new Date(val.startDate) >= new Date())
            errorMessage += "start date should be less than current date \n";
          if (
            val.endDate !== "" &&
            val.endDate !== null &&
            new Date(val.startDate) >= new Date(val.endDate)
          )
            errorMessage += "end date should be less than start date \n";
        }
        if (val.organizationName == null || val.organizationName === "")
          errorMessage += "Please enter organization name \n";
        if (val.description == null || val.description === "")
          errorMessage += "Please enter details of activity \n";
      });
    }
    if (errorMessage != "") {
      toast.error(errorMessage);
      return;
    }
    if (this.state.ProfileAdditionalInfo["ownPractice"] === "false") {
      this.setState((prevState) => ({
        ProfileAdditionalInfo: {
          ...prevState.ProfileAdditionalInfo,
          ["practiceNumber"]: "",
        },
      }));

      let updoc = {
        fileGuid: null,
        docName: "",
        docURL: "",
      };

      this.setState((prevState) => ({
        ProfileAdditionalInfo: {
          ...prevState.ProfileAdditionalInfo,
          ["practiceDocument"]: updoc,
        },
      }));
    }

    let additionalInfo = {
      userGuid: localStorage.getItem("user-id"),
      physicianServiceIds: this.state.ProfileAdditionalInfo[
        "physicianServiceIds"
      ].map((v) => parseInt(v, 10)),
      ownPractice: stringToBoolean(
        this.state.ProfileAdditionalInfo["ownPractice"]
      ),
      practiceNumber: this.state.ProfileAdditionalInfo["practiceNumber"],
      practiceDocument: this.state.ProfileAdditionalInfo["practiceDocument"],
      clinicName: this.state.ProfileAdditionalInfo["clinicName"],
      clinicContact: this.state.ProfileAdditionalInfo["clinicContact"],
      clinicEmail: this.state.ProfileAdditionalInfo["clinicEmail"],
      clinicAddress: this.state.ProfileAdditionalInfo["clinicAddress"],
      city: this.state.ProfileAdditionalInfo["city"],
      state: this.state.ProfileAdditionalInfo["state"],
      zip: this.state.ProfileAdditionalInfo["zip"],
      country: this.state.ProfileAdditionalInfo["country"],
      educationModel: this.state.ProfileAdditionalInfo["educationModel"],
      experienceModel: this.state.ProfileAdditionalInfo["experienceModel"],
    };

    promiseWrapper(this.props.actions.saveAdditionalInfo, {
      additionalInfoModel: additionalInfo,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        toast.success(data.data.message);
        this.setState({ ShowButtonSave: "In Process" });
      } else {
        toast.error(data.data.message);
      }
    });
  }

  UpdateExperienceDates() {
    let curState = this.state.ProfileAdditionalInfo.experienceModel;
    var newState = curState.map(function (e) {
      e.startDate = e.startDate.substr(0, 10);
      e.endDate = e.endDate != null ? e.endDate.substr(0, 10) : "";
      return e;
    });

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["experienceModel"]: newState,
      },
    }));
  }

  onAddExperience = (e) => {
    let curState = this.state.ProfileAdditionalInfo.experienceModel;
    let addNew = {
      doctorExperienceGuid: null,
      startDate: "",
      endDate: "",
      organizationName: "",
      description: "",
    };
    curState.push(addNew);

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["experienceModel"]: curState,
      },
    }));
  };

  onDeleteExperience = (idx, e) => {
    let curState = this.state.ProfileAdditionalInfo.experienceModel;
    curState.splice(idx, 1);
    if (curState.length === 0) {
      let addNew = {
        doctorExperienceGuid: null,
        startDate: "",
        endDate: "",
        organizationName: "",
        description: "",
      };
      curState.push(addNew);
    }
    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["experienceModel"]: curState,
      },
    }));
  };

  UpdateExperience = (idx, fieldName, e) => {
    let curState = this.state.ProfileAdditionalInfo.experienceModel;
    var newState = curState.map(function (d, id) {
      if (id === idx) {
        if (fieldName === "startDate") {
          d.startDate = e.target.value;
        }
        if (fieldName === "endDate") {
          d.endDate = e.target.value;
        }
        if (fieldName === "organizationName") {
          d.organizationName = e.target.value;
        }
        if (fieldName === "description") {
          d.description = e.target.value;
        }
      }
      return d;
    });

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["experienceModel"]: newState,
      },
    }));
  };

  onUploadEduCert = (idx, e) => {
    promiseWrapper(this.props.actions.uploadDoctorProfileCertificates, {
      fileType: 2,
      doctorGuid: localStorage.getItem("user-id"),
      file: e.target.files[0],
    }).then((data) => {
      if (data.data.isSuccess == true) {
        let curState = this.state.ProfileAdditionalInfo.educationModel;
        var newState = curState.map(function (d, id) {
          if (id === idx) {
            let newFile = {
              fileGuid: null,
              docName: data.data.data.docName,
              docURL: data.data.data.docURL,
            };
            d.educationCertificates.push(newFile);
          }
          return d;
        });

        this.setState((prevState) => ({
          ProfileAdditionalInfo: {
            ...prevState.ProfileAdditionalInfo,
            ["educationModel"]: newState,
          },
        }));
      } else {
        toast.error("there is some issue with file upload");
      }
    });
  };

  onDeleteEducationCertificat = (idx, inneridx, e) => {
    let curState = this.state.ProfileAdditionalInfo.educationModel;
    let newState = curState.map(function (d, id) {
      if (id === idx) {
        d.educationCertificates.splice(inneridx, 1);
      }
      return d;
    });

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["educationModel"]: newState,
      },
    }));
  };

  onAddEducation = (e) => {
    let curState = this.state.ProfileAdditionalInfo.educationModel;
    let addNew = {
      doctorEducationGuid: null,
      degreeTitle: "",
      collage: "",
      passingYear: "",
      educationCertificates: [],
    };
    curState.push(addNew);

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["educationModel"]: curState,
      },
    }));
  };

  onDeleteEducation = (idx, e) => {
    let curState = this.state.ProfileAdditionalInfo.educationModel;
    curState.splice(idx, 1);
    if (curState.length === 0) {
      let addNew = {
        doctorEducationGuid: null,
        degreeTitle: "",
        collage: "",
        passingYear: "",
        educationCertificates: [],
      };
      curState.push(addNew);
    }

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["educationModel"]: curState,
      },
    }));
  };

  UpdateEducation = (idx, fieldName, e) => {
    let curState = this.state.ProfileAdditionalInfo.educationModel;
    let newState = curState.map(function (d, id) {
      if (id === idx) {
        if (fieldName === "degreeTitle") {
          d.degreeTitle = e.target.value;
        }
        if (fieldName === "collage") {
          d.collage = e.target.value;
        }
        if (fieldName === "passingYear") {
          d.passingYear = e.target.value;
        }
      }
      return d;
    });

    this.setState((prevState) => ({
      ProfileAdditionalInfo: {
        ...prevState.ProfileAdditionalInfo,
        ["educationModel"]: newState,
      },
    }));
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        {this.state && this.state.LoadedData && (
          <div>
            <div className="row">
              <div className="col-md-12 py-4">
                <div className="divForm">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="search-bar-text-input mb-4">
                          <label className="form-label w-100">
                            {t(
                              "Doctor.Profile_Addtitional.Select_Physician_Services"
                            )}
                          </label>
                          <div className="border shadow-sm">
                            <DropdownMultiselect
                              selected={
                                this.state.ProfileAdditionalInfo[
                                  "physicianServiceIds"
                                ]
                              }
                              buttonclassName="selectpicker search-bar-text-input physician-servicies-select w-100 form-control border-class "
                              placeholder={t(
                                "Doctor.Profile_Addtitional.Select_Physician_Services"
                              )}
                              handleOnChange={this.UpdatephysicianService.bind(
                                this
                              )}
                              options={this.state.PhysicianServiceList}
                              optionKey="physicianServiceId"
                              optionLabel="physicianServiceName"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="search-bar-text-input">
                    <div className="row">
                      <div className="col-md-3">
                        <span className="pb-2">
                          {t("Doctor.Profile_Addtitional.Own_Practice")}
                        </span>
                        <div className="d-flex divForm-radio justify-content-between mt-1">
                          <div className="form-check">
                            <div>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="my-profile-radio-check"
                                id="yes"
                                value="true"
                                checked={
                                  this.state.ProfileAdditionalInfo[
                                    "ownPractice"
                                  ] === "true"
                                }
                                onChange={this.UpdateOwnPractice.bind(this)}
                              />
                              <label className="form-check-label">
                                {t("Doctor.Profile_Addtitional.Yes")}
                              </label>
                            </div>
                          </div>
                          <div className="form-check">
                            <div>
                              <input
                                className="form-check-input"
                                type="radio"
                                value="false"
                                checked={
                                  this.state.ProfileAdditionalInfo[
                                    "ownPractice"
                                  ] === "false"
                                }
                                onChange={this.UpdateOwnPractice.bind(this)}
                              />
                              <label className="form-check-label">
                                {t("Doctor.Profile_Addtitional.No")}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.state.ProfileAdditionalInfo["ownPractice"] ===
                        "true" && (
                        <div className="col-md-3 practise-number">
                          <div className="search-bar-text-input ">
                            <label className="form-label">
                              {t("Doctor.Profile_Addtitional.Practice_Number")}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "Doctor.Profile_Addtitional.XXXXXXXXXXXX"
                              )}
                              onChange={this.UpdatePracticeNumber.bind(this)}
                              value={
                                this.state.ProfileAdditionalInfo.practiceNumber
                              }
                            />
                          </div>
                        </div>
                      )}
                      {this.state.ProfileAdditionalInfo["ownPractice"] ===
                        "true" && (
                        <div className="col-md-6 practise-number">
                          <label className="form-label">
                            {t(
                              "Doctor.Profile_Addtitional.Practice_Licence_Document"
                            )}
                          </label>
                          <div className="search-bar-text-input">
                            <div>
                              <label className="btn fileUpload btn-default form-control">
                                {t(
                                  "Doctor.Profile_Addtitional.Upload_Licence_Document"
                                )}
                                <input
                                  type="file"
                                  hidden
                                  onChange={this.onUploadCertFile.bind(this)}
                                />
                              </label>
                              {this.state.ProfileAdditionalInfo.practiceDocument
                                .docName !== null &&
                                this.state.ProfileAdditionalInfo
                                  .practiceDocument.docURL !== null && (
                                  <div className="d-flex mx-3 my-2">
                                    <div style={{ color: "#4EC1BA" }}>
                                      <i className="fas fa-file"></i>
                                    </div>
                                    <a
                                      className="mx-2"
                                      target="_blank"
                                      href={
                                        this.state.ProfileAdditionalInfo
                                          .practiceDocument.docURL
                                      }
                                    >
                                      {
                                        this.state.ProfileAdditionalInfo
                                          .practiceDocument.docName
                                      }
                                    </a>
                                    <a
                                      className="text-danger"
                                      onClick={this.onDeletePrecticeDoc.bind(
                                        this
                                      )}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fas fa-times"></i>
                                    </a>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-100 mt-4 clinic-info">
                  {t("Doctor.Profile_Addtitional.Practice_Info")}
                </div>
                <hr className="bg-secondary" />
                <div className="search-bar-text-input mb-4">
                  <label className="form-label">
                    {t("Doctor.Profile_Addtitional.Practice_Name")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Doctor.Profile_Addtitional.Practice_Name")}
                    onChange={this.UpdateClinicName.bind(this)}
                    value={this.state.ProfileAdditionalInfo["clinicName"]}
                  />
                </div>
                <div className="row mt-2 mb-4">
                  <div className="col-md-6">
                    <div className="search-bar-text-input">
                      <label className="form-label">
                        {t(
                          "Doctor.Profile_Addtitional.Practice_Contact_Number"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t(
                          "Doctor.Profile_Addtitional.Practice_Contact_Number"
                        )}
                        onChange={this.UpdateClinicContact.bind(this)}
                        value={
                          this.state.ProfileAdditionalInfo["clinicContact"]
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="search-bar-text-input">
                      <label className="form-label">
                        {t("Doctor.Profile_Addtitional.Practice_Email_Address")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t(
                          "Doctor.Profile_Addtitional.Practice_Email_Address"
                        )}
                        onChange={this.UpdateClinicEmail.bind(this)}
                        value={this.state.ProfileAdditionalInfo["clinicEmail"]}
                      />
                    </div>
                  </div>
                </div>
                <div className="search-bar-text-input mt-2 mb-4">
                  <label className="form-label">
                    {t("Doctor.Profile_Addtitional.Practice_Address")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t(
                      "Doctor.Profile_Addtitional.Practice_Address"
                    )}
                    onChange={this.UpdateClinicAddress.bind(this)}
                    value={this.state.ProfileAdditionalInfo["clinicAddress"]}
                  />
                </div>
                <div className="row mt-2 mb-4">
                  <div className="col-md-4">
                    <div className="search-bar-text-input">
                      <label className="form-label">
                        {t("Doctor.Profile_Addtitional.City")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Doctor.Profile_Addtitional.City")}
                        onChange={this.UpdateCity.bind(this)}
                        value={this.state.ProfileAdditionalInfo["city"]}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="search-bar-text-input">
                      <label className="form-label">
                        {t("Doctor.Profile_Addtitional.State")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Doctor.Profile_Addtitional.State")}
                        onChange={this.UpdateState.bind(this)}
                        value={this.state.ProfileAdditionalInfo["state"]}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="search-bar-text-input">
                      <label className="form-label">
                        {t("Doctor.Profile_Addtitional.Zip")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Doctor.Profile_Addtitional.Zip")}
                        onChange={this.UpdateZip.bind(this)}
                        value={this.state.ProfileAdditionalInfo["zip"]}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="search-bar-text-input">
                      <label className="form-label">
                        {t("Doctor.Profile_Addtitional.Country")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("Doctor.Profile_Addtitional.Country")}
                        onChange={this.UpdateCountry.bind(this)}
                        value={this.state.ProfileAdditionalInfo["country"]}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-100 mt-4 clinic-info">
                  {t("Doctor.Profile_Addtitional.Education")}
                </div>
                <hr className="bg-secondary" />
                <div className="education ">
                  <div className="education-section">
                    {this.state.ProfileAdditionalInfo.educationModel.map(
                      (d, idx) => (
                        <div className="p-2 m-2 doctorTimeSlider" key={idx}>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="search-bar-text-input mb-4">
                                <label className="form-label">
                                  {t("Doctor.Profile_Addtitional.Degree_Title")}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={d.degreeTitle}
                                  disabled={
                                    d.verificationType === 3 ? "disabled" : ""
                                  }
                                  onChange={this.UpdateEducation.bind(
                                    this,
                                    idx,
                                    "degreeTitle"
                                  )}
                                  placeholder={t(
                                    "Doctor.Profile_Addtitional.Degree_Title"
                                  )}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="search-bar-text-input mb-4">
                                <label className="form-label">
                                  {t("Doctor.Profile_Addtitional.University")}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={d.collage}
                                  disabled={
                                    d.verificationType === 3 ? "disabled" : ""
                                  }
                                  onChange={this.UpdateEducation.bind(
                                    this,
                                    idx,
                                    "collage"
                                  )}
                                  placeholder={t(
                                    "Doctor.Profile_Addtitional.University"
                                  )}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="search-bar-text-input passing-year mb-4">
                                <label className="form-label">
                                  {t(
                                    "Doctor.Profile_Addtitional.Degree_Obtained_In_Year"
                                  )}
                                </label>
                                <input
                                  type="text"
                                  value={d.passingYear}
                                  disabled={
                                    d.verificationType === 3 ? "disabled" : ""
                                  }
                                  onChange={this.UpdateEducation.bind(
                                    this,
                                    idx,
                                    "passingYear"
                                  )}
                                  className="yearpicker year-date-picker form-control"
                                  placeholder={t(
                                    "Doctor.Profile_Addtitional.Degree_Obtained_In_Year"
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-7">
                              <div className="search-bar-text-input">
                                <div className="search-bar-text-input">
                                  <label className="form-label">
                                    {t(
                                      "Doctor.Profile_Addtitional.Upload_Education_Certification"
                                    )}
                                  </label>
                                  <div>
                                    <label className="btn fileUpload btn-default w-100">
                                      {t(
                                        "Doctor.Profile_Addtitional.Upload_Education_Documents"
                                      )}
                                      <input
                                        type="file"
                                        hidden
                                        disabled={
                                          d.verificationType === 3
                                            ? "disabled"
                                            : ""
                                        }
                                        onChange={this.onUploadEduCert.bind(
                                          this,
                                          idx
                                        )}
                                      />
                                    </label>
                                    {d.educationCertificates !== null &&
                                      d.educationCertificates.length > 0 &&
                                      d.educationCertificates.map(
                                        (c, inneridx) => (
                                          <div
                                            className="d-flex mx-3 my-2"
                                            id={inneridx}
                                          >
                                            <div style={{ color: "#4EC1BA" }}>
                                              <i className="fas fa-file"></i>
                                            </div>
                                            <a
                                              className="mx-3"
                                              target="_blank"
                                              href={c.docURL}
                                            >
                                              {c.docName}
                                            </a>
                                            {d.verificationType !== 3 && (
                                              <a
                                                className="text-danger"
                                                style={{ cursor: "pointer" }}
                                                onClick={this.onDeleteEducationCertificat.bind(
                                                  this,
                                                  idx,
                                                  inneridx
                                                )}
                                              >
                                                <i className="fas fa-times"></i>
                                              </a>
                                            )}
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {d.verificationType !== 3 && (
                              <div className="col-md-2 mt-38 d-flex justify-content-center align-items-start">
                                <a
                                  className="mt-25 text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={this.onDeleteEducation.bind(
                                    this,
                                    idx
                                  )}
                                >
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="w-100 mb-3">
                  <a
                    onClick={this.onAddEducation.bind(this)}
                    className="btn add-more-education my-2 "
                  >
                    {t("Doctor.Profile_Addtitional.Add_More")}
                  </a>
                </div>
                <div className="w-100 mt-4 clinic-info">
                  {t(
                    "Doctor.Profile_Addtitional.Current_And_Passed_Work_Places"
                  )}
                  <span>
                    {t(
                      "Doctor.Profile_Addtitional.Example_Current_And_Passed_Work_Places"
                    )}
                  </span>
                </div>
                <hr className="bg-secondary" />
                <div className="experince">
                  {this.state.ProfileAdditionalInfo.experienceModel.map(
                    (d, idx) => (
                      <div className="row" id={idx}>
                        <div className="col-md-3" style={{ width: "23%" }}>
                          <div className="search-bar-text-input mb-4">
                            <label className="form-label">
                              {t("Doctor.Profile_Addtitional.Start_Date")}
                            </label>
                            <input
                              type="date"
                              max="2100-12-31"
                              className="yearpicker year-date-picker form-control"
                              value={d.startDate}
                              disabled={
                                d.verificationType === 3 ? "disabled" : ""
                              }
                              onChange={this.UpdateExperience.bind(
                                this,
                                idx,
                                "startDate"
                              )}
                              placeholder={t(
                                "Doctor.Profile_Addtitional.Start_Date"
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-md-3" style={{ width: "23%" }}>
                          <div className="search-bar-text-input mb-4">
                            <label className="form-label">
                              {t("Doctor.Profile_Addtitional.End_Date")}
                            </label>
                            <input
                              type="date"
                              max="2100-12-31"
                              className="yearpicker form-control"
                              value={d.endDate}
                              disabled={
                                d.verificationType === 3 ? "disabled" : ""
                              }
                              onChange={this.UpdateExperience.bind(
                                this,
                                idx,
                                "endDate"
                              )}
                              placeholder={t(
                                "Doctor.Profile_Addtitional.End_Date"
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-md-2" style={{ width: "20%" }}>
                          <div className="search-bar-text-input mb-4">
                            <label className="form-label">
                              {t("Doctor.Profile_Addtitional.Institution")}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={d.organizationName}
                              disabled={
                                d.verificationType === 3 ? "disabled" : ""
                              }
                              onChange={this.UpdateExperience.bind(
                                this,
                                idx,
                                "organizationName"
                              )}
                              placeholder={t(
                                "Doctor.Profile_Addtitional.Institution"
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="search-bar-text-input mb-4">
                            <label className="form-label">
                              {t(
                                "Doctor.Profile_Addtitional.Details_Of_Activity"
                              )}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={d.description}
                              disabled={
                                d.verificationType === 3 ? "disabled" : ""
                              }
                              onChange={this.UpdateExperience.bind(
                                this,
                                idx,
                                "description"
                              )}
                              placeholder={t(
                                "Doctor.Profile_Addtitional.Details_Of_Activity"
                              )}
                            />
                          </div>
                        </div>
                        {d.verificationType !== 3 && (
                          <div className="col-md-1 mt-38 d-flex justify-content-center align-items-start">
                            <a
                              className="mt-25 text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={this.onDeleteExperience.bind(this, idx)}
                            >
                              <i className="far fa-trash-alt"></i>
                            </a>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
                <div className="w-100 mb-4">
                  <a
                    className="btn add-more-experince my-2"
                    onClick={this.onAddExperience.bind(this)}
                  >
                    {t("Doctor.Profile_Addtitional.Add_More")}
                  </a>
                </div>
              </div>
            </div>
            <div className="w-100 mb-4 d-flex flex-column align-items-end">
              {this.state.ProfileAdditionalInfo.profileVerification === 1 && (
                <a
                  className="btn verification-button my-2 w-50"
                  onClick={this.SaveAdditionalInfo.bind(this)}
                >
                  {t("Doctor.Profile_Addtitional.Send_For_Verification")}
                </a>
              )}
              {this.state.ProfileAdditionalInfo.profileVerification === 2 && (
                // <a className="btn verification-button my-2 w-50" onClick={this.SaveAdditionalInfo.bind(this)}>{t('Doctor.Profile_Addtitional.Verification_In_Process')}</a>
                <a
                  className="btn verification-button my-2 w-50"
                  onClick={this.SaveAdditionalInfo.bind(this)}
                >
                  {t("Doctor.Profile_Addtitional.Send_For_Verification")}
                </a>
              )}
              {this.state.ProfileAdditionalInfo.profileVerification === 3 && (
                // <a className="btn verified-button my-2 w-25" onClick={this.SaveAdditionalInfo.bind(this)}>{t('Doctor.Profile_Addtitional.Verified')}</a>
                <a
                  className="btn verification-button my-2 w-50"
                  onClick={this.SaveAdditionalInfo.bind(this)}
                >
                  {t("Doctor.Profile_Addtitional.Send_For_Verification")}
                </a>
              )}
              {(this.state.ProfileAdditionalInfo.profileVerification === 4 ||
                this.state.ProfileAdditionalInfo.profileVerification === 5) && (
                // <a className="btn verification-button my-2 w-50" onClick={this.SaveAdditionalInfo.bind(this)}>{t('Doctor.Profile_Addtitional.Rejected')}</a>
                <a
                  className="btn verification-button my-2 w-50"
                  onClick={this.SaveAdditionalInfo.bind(this)}
                >
                  {t("Doctor.Profile_Addtitional.Send_For_Verification")}
                </a>
              )}
            </div>
          </div>
        )}
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
)(withTranslation()(DoctorAdditionalInfo));
