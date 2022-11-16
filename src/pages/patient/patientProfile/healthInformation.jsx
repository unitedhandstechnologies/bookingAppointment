import React from 'react';
import $ from 'jquery';
import exadoPatientActions from '../../../redux/exadoPatient/action';
import { toast } from 'react-toastify';
import { promiseWrapper, localStorageKeys } from '../../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from "moment";
import { withTranslation } from 'react-i18next';

class HealthInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      languageCode: "",
      LoadedData: true,
      QuestionnaireList: [],
      AnswerDataList: [],
      error: "",
      success: "",
      errorTimer: null,
      successTimer: null
    };
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  componentDidMount() {
    if (this.props.languageObj?.languageAbbreviation) {
      const { languageAbbreviation } = this.props.languageObj
      this.setState({ languageCode: languageAbbreviation }, () => this.GetQuestionnaireData());
    }
    this.GetQuestionnaireData();
  }

  componentDidUpdate() {
    const langCode = this.props.languageObj?.languageAbbreviation;
    if (langCode && this.state.languageCode !== langCode) {
      this.setState({ languageCode: langCode }, () => this.GetQuestionnaireData());
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.errorTimer);
    clearTimeout(this.state.successTimer);
  }

  GetQuestionnaireData() {
    promiseWrapper(this.props.patientactions.getPatientQuestionnaire, { pageNo: this.state.currentPage }).then((data) => {
      this.setState({ QuestionnaireList: data }, () => {
        promiseWrapper(this.props.patientactions.getPatientAnswers, { patientGuid: localStorage.getItem(localStorageKeys.userId), pageNo: this.state.currentPage }).then((data) => {
          this.setState({ AnswerDataList: data }, () => {
            this.setState({ LoadedData: true });
          });
        });
      });
    });
  }

  _next() {
    let currentPage = this.state.currentPage
    // If the current step is 1 or 2, then add one on "next" button click
    let curPage = currentPage;
    currentPage = currentPage >= 5 ? 6 : currentPage + 1
    this.setState({ currentPage: currentPage }, () => {
      $(".count" + currentPage).addClass("js-active");
      this.SaveAnswertoDB(curPage);
      this.GetQuestionnaireData();
    });
  }

  _save() {
    this.setState({ currentPage: 1 }, () => {
      $(".count1").addClass("js-active");
      this.SaveAnswertoDB(6);
      this.GetQuestionnaireData();
      this.props.SavedLastStep();
    });
  }

  _prev() {
    let currentPage = this.state.currentPage;
    $(".count" + currentPage).removeClass("js-active");
    let curPage = currentPage;
    currentPage = currentPage <= 1 ? 1 : currentPage - 1
    this.setState({ currentPage: currentPage }, () => {
      this.SaveAnswertoDB(curPage);
      this.GetQuestionnaireData();
    });
  }

  UpdateCurrentPage = (e) => {
    $(".multisteps-form__progress-btn").removeClass("js-active");
    $(".count" + e).addClass("js-active");
    this.setState({ currentPage: e }, () => {
      this.GetQuestionnaireData();
    });
  }

  SaveAnswertoDB(curPage) {
    let result = {
      "answerList": this.state.AnswerDataList,
      "pageNo": curPage
    };
    promiseWrapper(this.props.patientactions.saveAnswers, { answers: result })
      .then((data) => {
        if (data.data.isSuccess == true) {
          this.setState({
            success: data.data.message,
            successTimer: setTimeout(() => this.setState({ success: "" }), 2000),
          })
          // toast.success(data.data.message);
        }
        else {
          this.setState({
            error: data.data.errorMessage,
            errorTimer: setTimeout(() => this.setState({ error: "" }), 2000),
          })
          // toast.error(data.data.errorMessage);
        }
      });
  }

  AddNewAnswer = (questionGuid, questionType, e) => {
    let curState = this.state.AnswerDataList;
    let ans1 = "";
    let ans2 = "";
    if (questionType === 3) {
      ans1 = $("#txtAns1-" + questionGuid).val();
      if (!ans1) {
        $("#txtAns1-" + questionGuid).addClass("error-message-input")
        // toast.warning("Fill up input");
        return;
      }
    }
    else if (questionType === 2) {
      ans1 = $("#txtAns1-" + questionGuid).val();
      ans2 = $("#txtAns2-" + questionGuid).val();
      if (!ans1 || !ans2) {
        !ans1 && $("#txtAns1-" + questionGuid).addClass("error-message-input")
        !ans2 && $("#txtAns2-" + questionGuid).addClass("error-message-input")
        // toast.warning("Fill up input");
        return;
      }
    }
    let addNew = {
      "answerGuid": null,
      "questionGuid": questionGuid,
      "patientGuid": localStorage.getItem("user-id"),
      "answer1": ans1,
      "answer2": ans2,
      "answerOrder": 0
    };
    curState.push(addNew);
    this.setState({ AnswerDataList: curState });
    $("#txtAns1-" + questionGuid).val("");
    $("#txtAns2-" + questionGuid).val("");
  }

  UpdateType1Answer = (questionGuid, e) => {
    let curState = this.state.AnswerDataList;
    let isExist = this.state.AnswerDataList.filter(x => x.questionGuid === questionGuid);
    let ans1 = e.target.value;
    if (isExist.length !== 0) {
      let newState = curState.map(function (d, idx) {
        if (d.questionGuid === questionGuid) {
          if (ans1 !== "Yes") {
            d.answer2 = "";
          }
          d.answer1 = ans1;
        }
        return d;
      });
      this.setState({ AnswerDataList: newState });
    }
    else {
      let addNew = {
        "answerGuid": null,
        "questionGuid": questionGuid,
        "patientGuid": localStorage.getItem("user-id"),
        "answer1": ans1,
        "answer2": "",
        "answerOrder": 0
      };
      curState.push(addNew);
      this.setState({ AnswerDataList: curState });
    }
  }

  UpdateType4Answer = (questionGuid, e) => {
    let curState = this.state.AnswerDataList;
    let isExist = this.state.AnswerDataList.filter(x => x.questionGuid === questionGuid);
    let ans1 = e.target.value;
    if (isExist.length !== 0) {
      let newState = curState.map(function (d, idx) {
        if (d.questionGuid === questionGuid) {
          d.answer1 = ans1;
          d.answer2 = "";
        }
        return d;
      });
      this.setState({ AnswerDataList: newState });
    }
    else {
      let addNew = {
        "answerGuid": null,
        "questionGuid": questionGuid,
        "patientGuid": localStorage.getItem("user-id"),
        "answer1": ans1,
        "answer2": "",
        "answerOrder": 0
      };
      curState.push(addNew);
      this.setState({ AnswerDataList: curState });
    }
  }

  UpdateYesRadioText = (questionGuid, e) => {
    let curState = this.state.AnswerDataList;
    let ans2 = e.target.value;
    let newState = curState.map(function (d, idx) {
      if (d.questionGuid === questionGuid) {
        d.answer2 = ans2;
      }
      return d;
    });
    this.setState({ AnswerDataList: newState });
  }

  RemoveAnswer = (id, e) => {
    let curState = this.state.AnswerDataList;
    curState.splice(id, 1);
    this.setState({ AnswerDataList: curState });
  }

  changeStyle = (e) => { if (e.target.classList.contains("error-message-input")) e.target.classList.remove("error-message-input") }


  render() {
    const { t } = this.props
    const { success, error } = this.state
    return (
      <div>
        {this.state && this.state.LoadedData &&
          <div className="multi-step-form-container multi-step-form-container-progress-bar">
            <div className="multisteps-form ">
              <div className="multisteps-form__progress">
                <button onClick={this.UpdateCurrentPage.bind(this, 1)} className="multisteps-form__progress-btn js-active count1 count-align" id="health-tracking-tab-btn" type="button" title="Health Tracking"><span className="multisteps-form__progress-text">{t('Patient.HealthInformation.Health_Tracking')}</span></button>
                <button onClick={this.UpdateCurrentPage.bind(this, 2)} className="multisteps-form__progress-btn count2 count-align" type="button" id="hearing-and-seeing-tab-btn" title="Hearing and Seeing">{t('Patient.HealthInformation.Hearing_Seeing')}</button>
                <button onClick={this.UpdateCurrentPage.bind(this, 3)} className="multisteps-form__progress-btn count3 count-align" type="button" id="digestion-nutrition-tab-btn" title="Digestion and Nutrition">{t('Patient.HealthInformation.Digestion_Nutrition')}</button>
                <button onClick={this.UpdateCurrentPage.bind(this, 4)} className="multisteps-form__progress-btn count4 count-align" type="button" id="chronic-condition-tab-btn" title="Chronic Diseasesand conditions">{t('Patient.HealthInformation.Chronic_Diseasesand_Conditions')}</button>
                <button onClick={this.UpdateCurrentPage.bind(this, 5)} className="multisteps-form__progress-btn count5 count-align" type="button" id="recent-history-tab-btn" title="Recent Medical History (2 Months)">{t('Patient.HealthInformation.Recent_Medical_History')}</button>
                <button onClick={this.UpdateCurrentPage.bind(this, 6)} className="multisteps-form__progress-btn count6 count-align" type="button" id="medication-intake-tab-btn" title="Medication Intake">{t('Patient.HealthInformation.Medication_Intake')}</button>
              </div>
              <div className="bg-white">
                <div className="health-tracking-section">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}
                  {this.state.QuestionnaireList.map((d, idx) => (
                    <div key={idx}>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-6 col-md-12 py-2">
                          <span className="health-info-question-text">{d.question}</span>
                        </div>
                        <div className="col-lg-6 col-md-12 patient-profile-input-container">
                          <div className="d-flex">
                            {d.questionType === 4 &&
                              <div className="col-md-12">
                                <div className="d-flex divForm-radio2 justify-content-between mt-1">
                                  {d.multipleOptions.split(',').map((data, id4x) => (
                                    <div className="form-check" key={id4x}>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value={data}
                                        id={`redio4-${data}-${d.questionGuid}`}
                                        name={`redio4-${d.questionGuid}`}
                                        checked={this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0] && this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0].answer1 === data}
                                        onChange={this.UpdateType4Answer.bind(this, d.questionGuid)} />
                                      <label className="form-check-label">{data}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            }
                            {d.questionType === 3 &&
                              <div className="">
                                <div className="search-bar-text-input d-flex">
                                  <input type="text" id={`txtAns1-${d.questionGuid}`} className="form-control w-75" placeholder={d.placeholderText} onChange={e => this.changeStyle(e)} />
                                </div>
                              </div>
                            }
                            {d.questionType === 2 &&
                              <>
                                <div className="">
                                  <div className="search-bar-text-input">
                                    <input type="text" id={`txtAns1-${d.questionGuid}`} className="form-control w-75" placeholder={d.placeholderText.slice(0, d.placeholderText.indexOf("|"))} onChange={e => this.changeStyle(e)} />
                                  </div>
                                </div>
                                <div className="">
                                  <input type="text" id={`txtAns2-${d.questionGuid}`} className="form-control w-75" placeholder={d.placeholderText.slice(d.placeholderText.indexOf("|") + 1, d.placeholderText.length)} onChange={e => this.changeStyle(e)} />
                                </div>
                              </>
                            }
                            {d.questionType === 1 &&
                              <div className="col-md-12">
                                <div className="d-flex divForm-radio2 justify-content-between mt-1">
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="Yes"
                                        id={`redioYes-${d.questionGuid}`}
                                        name={`redio-${d.questionGuid}`}
                                        checked={this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0] && this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0].answer1 === "Yes"}
                                        onChange={this.UpdateType1Answer.bind(this, d.questionGuid)} />
                                      <label className="form-check-label">{t("Patient.HealthInformation.Yes")}</label>
                                    </div>
                                  </div>
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="No"
                                        id={`redioNo-${d.questionGuid}`}
                                        name={`redio-${d.questionGuid}`}
                                        checked={this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0] && this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0].answer1 === "No"}
                                        onChange={this.UpdateType1Answer.bind(this, d.questionGuid)} />
                                      <label className="form-check-label">{t("Patient.HealthInformation.No")}</label>
                                    </div>
                                  </div>
                                  <div className="form-check">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value="NA"
                                        id={`redioNa-${d.questionGuid}`}
                                        name={`redio-${d.questionGuid}`}
                                        checked={this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0] && this.state.AnswerDataList.filter(x => x.questionGuid === d.questionGuid)[0].answer1 === "NA"}
                                        onChange={this.UpdateType1Answer.bind(this, d.questionGuid)} />
                                      <label className="form-check-label">{t("Patient.HealthInformation.Don't_Know")}</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                            {d.displayAddButton === true &&
                              <div className="">
                                <button className="btn health-info-add-new-btn" onClick={this.AddNewAnswer.bind(this, d.questionGuid, d.questionType)} type="button" id="eye-btn"><span className="mx-2 fs-10"><i className="fas fa-plus"></i></span>{t('Patient.HealthInformation.Add_New')}</button>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="diopters-dropdown my-4 position-relative">
                        {this.state.AnswerDataList.map((ad, idax) => (
                          <div className="px-2" key={idax}>
                            {ad.questionGuid === d.questionGuid && d.questionType === 3 &&
                              <div className="row my-2 health-info-div">
                                <div className="col-md-6">
                                  <div className="alcohol-intake-dropdown-text">
                                    <span className="alcohol-intake-dropdown-text-date">{`${moment(ad.createdDate).format("DD-MMM-YYYY")}`} &nbsp;</span>
                                    <span className="diopters-dropdown-text-time">&nbsp;&nbsp; {`${moment(ad.createdDate).format("hh:mm A")}`}</span>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-8">
                                      <div>
                                        <span>{d.question}:</span>
                                        <span className="alcohol-intake-value">{ad.answer1}</span>
                                      </div>
                                    </div>
                                    <a onClick={this.RemoveAnswer.bind(this, idax)} className="text-danger mainLeftPanelFontSize25">
                                      <i className="far fa-window-close close-row"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            }

                            {ad.questionGuid === d.questionGuid && d.questionType === 1 && ad.answer1 === "Yes" &&
                              <div className="search-bar-text-input">
                                <textarea className="form-control textarea-remove-focus"
                                  id={`redioYesTxtAns-${d.questionGuid}`}
                                  rows="4"
                                  onChange={this.UpdateYesRadioText.bind(this, d.questionGuid)}
                                  placeholder={d.placeholderText}>
                                  {ad.answer2}
                                </textarea>
                              </div>
                            }

                            {ad.questionGuid === d.questionGuid && d.questionType === 2 &&
                              <div className="row health-info-div my-2">
                                <div className="col-md-6">
                                  <div className="diopters-dropdown-text">
                                    <span className="diopters-dropdown-text-date">{`${moment(ad.createdDate).format("DD-MMM-YYYY")}`} &nbsp;</span>
                                    <span className="diopters-dropdown-text-time"> &nbsp;&nbsp;{`${moment(ad.createdDate).format("hh:mm A")}`}</span>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div>
                                        <span>{t("Patient.HealthInformation.Right_Eye")}:</span>
                                        <span className="diopters-dropdown-right-eye-value">{ad.answer1}</span>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div>
                                        <span>{t("Patient.HealthInformation.Left_Eye")}:</span>
                                        <span className="diopters-dropdown-left-eye-value">{ad.answer2}</span>
                                      </div>
                                    </div>
                                    <a onClick={this.RemoveAnswer.bind(this, idax)} className="text-danger mainLeftPanelFontSize25">
                                      <i className="far fa-window-close close-row"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="row">
                    <div className="button-row mt-4 col-12 w-100">
                      {this.state.currentPage !== 1 &&
                        <button onClick={this._prev.bind(this)} className="btn MyButton my-button-25 ml-auto me-4" type="button" title="Prev">{t('Patient.HealthInformation.Prev')}</button>
                      }
                      {this.state.currentPage < 6 &&
                        <button onClick={this._next.bind(this)} className="btn MyButton my-button-25 ml-auto float-end" type="button" title="Next">{t('Patient.HealthInformation.Next')}</button>
                      }
                      {this.state.currentPage == 6 &&
                        <button onClick={this._save.bind(this)} className="btn MyButton my-button-25 ml-auto float-end" type="button" title="Save">{t('Patient.HealthInformation.Save_Next')}</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStoreToprops(state, props) {
  return { languageObj: state.Exado.language }
}

function mapDispatchToProps(dispatch) {
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { patientactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(HealthInformation));
