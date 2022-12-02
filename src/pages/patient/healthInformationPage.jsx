import React from "react";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

class HealthInformationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
      LoadedData: false,
      QuestionnaireList: [],
      AnswerDataList: [],
    };
  }

  componentDidMount() {
    this.GetQuestionnaireData();
  }

  GetQuestionnaireData() {
    promiseWrapper(this.props.patientactions.getPatientQuestionnaire, {
      languageId: this.state.currentPage,
    }).then((data) => {
      this.setState({ QuestionnaireList: data }, () => {
        promiseWrapper(this.props.patientactions.getPatientAnswers, {
          patientGuid: localStorage.getItem("user-id"),
          pageNo: 1,
        }).then((data) => {
          this.setState({ AnswerDataList: data.result }, () => {
            this.setState({ LoadedData: true });
          });
        });
      });
      this.setState({ LoadedData: true });
    });
  }

  CallPrev() {
    this.props.callPrev();
  }

  CallNext() {
    this.props.callNext();
  }

  render() {
    const { t } = this.props;
    return <div></div>;
  }
}

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(HealthInformationPage));
