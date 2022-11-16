import React from 'react';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { promiseWrapper } from '../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from "moment";
import { withTranslation } from 'react-i18next';


class HealthMonitoring extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            LoadedData: true,
            QuestionnaireList: [],
            AnswerDataList: [],
        };
    }

    componentDidMount() {
        promiseWrapper(this.props.patientactions.getPatientQuestionnaire, { pageNo: this.state.currentPage }).then((data) => {
            this.setState({ QuestionnaireList: data }, () => {
                promiseWrapper(this.props.patientactions.getPatientAnswers, { patientGuid: localStorage.getItem("user-id"), pageNo: this.state.currentPage }).then((data) => {
                    this.setState({ AnswerDataList: data }, () => {
                        this.setState({ LoadedData: true });
                    });
                });
            });
        });
    }

    render() {
        const { t } = this.props
        return (
            <div>
                {this.state && this.state.LoadedData &&
                    <div className="health-monitoring-section">
                        {this.state.QuestionnaireList.map((d, idx) => (
                            <div>
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-12">
                                        <span className="health-info-question-text">{d.question}</span>
                                    </div>
                                </div>
                                <div className="monitoring-diopters-dropdown px-2 my-4">
                                    {this.state.AnswerDataList.map((ad, idax) => (
                                        <div>
                                            {ad.questionGuid === d.questionGuid && d.questionType === 3 &&
                                                <div className="row my-2 health-info-div">
                                                    <div className="col-md-6">
                                                        <div className="monitoring-alcohol-intake-dropdown-text">
                                                            <span className="monitoring-alcohol-intake-dropdown-text-date">{`${moment(ad.createdDate).format("DD-MMM-YYYY")}`} &nbsp;</span>
                                                            <span className="monitoring-alcohol-intake-text-time">&nbsp;&nbsp; {`${moment(ad.createdDate).format("hh:mm A")}`}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                <div>
                                                                    <span>{d.question}:</span>
                                                                    <span className="monitoring-alcohol-intake-value">{ad.answer1}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {ad.questionGuid === d.questionGuid && d.questionType === 2 &&
                                                <div className="row health-info-div my-2">
                                                    <div className="col-md-6">
                                                        <div className="monitoring-diopters-dropdown-text">
                                                            <span className="monitoring-diopters-dropdown-text-date">{`${moment(ad.createdDate).format("DD-MMM-YYYY")}`} &nbsp;</span>
                                                            <span className="monitoring-diopters-dropdown-text-time">&nbsp;&nbsp; {`${moment(ad.createdDate).format("hh:mm A")}`}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div>
                                                                    <span>{t("Patient.HealthInformation.Right_Eye")}:</span>
                                                                    <span className="monitoring-diopters-dropdown-right-eye-value">{ad.answer1}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div>
                                                                    <span>{t("Patient.HealthInformation.Left_Eye")}:</span>
                                                                    <span className="monitoring-diopters-dropdown-left-eye-value">{ad.answer2}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

function mapStoreToprops(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const patientactions = bindActionCreators(exadoPatientActions, dispatch);
    return { patientactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(HealthMonitoring));
