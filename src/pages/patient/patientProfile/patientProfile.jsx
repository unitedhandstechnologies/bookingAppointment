import React from "react";
import exadoDocActions from "../../../redux/exadoDoc/action";
import exadoPatientActions from "../../../redux/exadoPatient/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PatientHeader from "../header2";
import PatientFooter from "../footer";
import PatientLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import { withTranslation } from "react-i18next";
import { promiseWrapper } from "../../../utility/common";
import HealthInformation from "./healthInformation";
import moment from "moment";
import exadoActions from "../../../redux/exado/action";
import PersonalInformation from "./personalInformation";
import { Link } from "react-router-dom";

class PatientProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MonitorQuestionnaireList: [],
      MonitorAnswerDataList: [],
    };
  }

  componentDidMount() {}

  GotoLastTab() {
    promiseWrapper(this.props.patientactions.getPatientQuestionnaire, {
      pageNo: 1,
    }).then((data) => {
      this.setState({ MonitorQuestionnaireList: data }, () => {
        promiseWrapper(this.props.patientactions.getPatientAnswers, {
          patientGuid: localStorage.getItem("user-id"),
          pageNo: 1,
        }).then((data) => {
          this.setState({ MonitorAnswerDataList: data }, () => {
            window.$('.nav-pills a[href="#1812health-monitoring"]').tab("show");
          });
        });
      });
    });
  }

  handleSelect = () => {
    promiseWrapper(this.props.patientactions.getPatientQuestionnaire, {
      pageNo: 1,
    }).then((data) => {
      this.setState({ MonitorQuestionnaireList: data }, () => {
        promiseWrapper(this.props.patientactions.getPatientAnswers, {
          patientGuid: localStorage.getItem("user-id"),
          pageNo: 1,
        }).then((data) => {
          this.setState({ MonitorAnswerDataList: data }, () => {});
        });
      });
    });
  };

  render() {
    const { t, docactions, patientactions, comactions } = this.props;
    return (
      <div>
        <PatientHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <PatientLeftPanel />
              {/* {this.state && this.state.LoadedData && */}
              <div className="col-lg-10 col-md-12 mainRightPanel">
                <div className="row mb-3">
                  <div className="search-bar bg-light py-4">
                    <div className="d-flex justify-content-between">
                      <div className="search-bar-text search-bar-text2">
                        {t("Doctor.Profile_Basic.My_Profile")}{" "}
                        <span className="tab-breadcumb">
                          {" "}
                          {t("Doctor.Profile_Basic.Personal_Information")}
                        </span>{" "}
                        <span className="tab-breadcumb2"></span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="mainRightPanelAlertProfile p-3 d-flex align-items-center"
                    role="alert"
                  >
                    <div>{t("Patient.PatientProfile.Profile_Message")}</div>
                  </div>
                  <div className="py-3 bg-light"></div>
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
                                id="personal-info-tab"
                                data-toggle="tab"
                                href="#personal-info"
                                role="tab"
                                aria-controls="personal-info"
                                aria-selected="true"
                              >
                                {t("Doctor.Profile_Basic.Personal_Information")}
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
                                {t("Patient.PatientProfile.Health_Information")}
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
                                onClick={this.handleSelect.bind()}
                              >
                                {t("Patient.PatientProfile.Health_Monitoring")}
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id="personal-info"
                              role="tabpanel"
                              aria-labelledby="personal-info-tab"
                            >
                              <PersonalInformation
                                t={t}
                                docactions={docactions}
                                patientactions={patientactions}
                                comactions={comactions}
                              />
                            </div>
                            <div
                              className="tab-pane fade"
                              id="health-info"
                              role="tabpanel"
                              aria-labelledby="health-info-tab"
                            >
                              <HealthInformation
                                SavedLastStep={this.GotoLastTab.bind(this)}
                              />
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
                                    <>
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
                                            (ad, idx) => (
                                              <div key={idx}>
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
                                                                  "Patient.HealthInformation.Right_Eye"
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
                                                                  "Patient.HealthInformation.Left_Eye"
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
                                    </>
                                  )
                                )}
                                <Link
                                  className="btn MyButton float-end"
                                  to="/patient-dashboard"
                                >
                                  Done
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <PatientFooter />
              </div>
              {/* } */}
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
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  const comactions = bindActionCreators(exadoActions, dispatch);
  return { docactions, patientactions, comactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(PatientProfile));

// QuestionType
// 	1 - Yes / No / Don't Know
// 	2 - 2 textbox
// 	3 - 1 textbox
// 	4 - Radio Button
