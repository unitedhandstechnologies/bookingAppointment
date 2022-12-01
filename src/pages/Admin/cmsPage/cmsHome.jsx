import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoActions from "../../../redux/exado/action";
import exadoAdminActions from "../../../redux/exadoAdmin/action";
import { cmsPageNum, promiseWrapper } from "../../../utility/common";
import { toast } from "react-toastify";

class CmsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      langId: this.props.langId,
      cmsData: {
        pageNumber: cmsPageNum.HomePage,
        languageId: this.props.langId,
        headerMainTitle: "",
        headerSubTitle: "",
        offlineConsultation: "",
        onlineConsultation: "",
        chatWithADoctor: "",
        midSectionTitle: "",
        howItWorksStep1: "",
        howItWorksStep2: "",
        howItWorksStep3: "",
        howItWorksStep4: "",
        howItWorksStep5: "",
        emergencyOnlineConsultation: "",
        describeInShort: "",
        talkwithDoctor: "",
      },
    };
  }

  componentDidMount() {
    this.getCMSPageData(
      cmsPageNum.HomePage,
      this.props.langId ? this.props.langId : 1,
      this.state.isAdmin
    );
  }

  componentDidUpdate() {
    if (this.props.langId !== this.state.langId) {
      this.setState(
        {
          langId: this.props.langId,
          cmsData: { ...this.state.cmsData, languageId: this.props.langId },
        },
        () => {
          this.getCMSPageData(
            cmsPageNum.HomePage,
            this.props.langId,
            this.state.isAdmin
          );
        }
      );
    }
  }

  setStates(e) {
    const newData = { ...this.state.cmsData, [e.target.name]: e.target.value };
    this.setState({ cmsData: newData });
  }

  getCMSPageData = (pageNum, langId, isAdmin) => {
    const queryParam = {
      cMSPagenumber: pageNum,
      languageId: langId,
      isAdmin: isAdmin,
    };
    promiseWrapper(this.props.comactions.getCMSPage, {
      query: { ...queryParam },
    })
      .then((data) => {
        const receivedData = {
          ...data.data.result,
          pageNumber: this.state.cmsData.pageNumber,
          languageId: this.state.cmsData.languageId,
        };
        this.setState({ cmsData: receivedData });
      })
      .catch((err) => console.log(err));
  };

  submitCMSData = () => {
    promiseWrapper(this.props.adminactions.saveCMSPage, {
      data: { ...this.state.cmsData },
    })
      .then((data) => {
        if (data.data.success) toast.success(data.data.result);
        else toast.error(data.errorMessage);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      headerMainTitle,
      headerSubTitle,
      offlineConsultation,
      onlineConsultation,
      chatWithADoctor,
      midSectionTitle,
      howItWorksStep1,
      howItWorksStep2,
      howItWorksStep3,
      howItWorksStep4,
      howItWorksStep5,
      emergencyOnlineConsultation,
      describeInShort,
      talkwithDoctor,
    } = this.state.cmsData;

    return (
      <div className="appointment-details-container">
        <form
          className="appointment-details-form"
          onSubmit={(e) => {
            e.preventDefault();
            this.submitCMSData();
          }}
        >
          <div className="form-group my-4">
            <label>Header Main Title</label>
            <input
              type="text"
              className="form-control appointment-details-form-inputs"
              value={headerMainTitle ? headerMainTitle : ""}
              name="headerMainTitle"
              onChange={(e) => this.setStates(e)}
            />
          </div>
          <div className="form-group my-4">
            <label className="mb-2">Header Sub Title</label>
            <input
              type="text"
              className="form-control appointment-details-form-inputs"
              value={headerSubTitle ? headerSubTitle : ""}
              name="headerSubTitle"
              onChange={(e) => this.setStates(e)}
            />
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Offline Consultation</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="offlineConsultation"
              value={offlineConsultation ? offlineConsultation : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Online Consultation</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="onlineConsultation"
              value={onlineConsultation ? onlineConsultation : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Chat With A Doctor</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              id="describe-problem-textarea"
              rows="3"
              name="chatWithADoctor"
              value={chatWithADoctor ? chatWithADoctor : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label className="mb-2">How It Works Step 1</label>
            <input
              type="text"
              className="form-control appointment-details-form-inputs"
              value={howItWorksStep1 ? howItWorksStep1 : ""}
              name="howItWorksStep1"
              onChange={(e) => this.setStates(e)}
            />
          </div>
          <div className="form-group my-4">
            <label className="mb-2">How It Works Step 2</label>
            <input
              type="text"
              className="form-control appointment-details-form-inputs"
              value={howItWorksStep2 ? howItWorksStep2 : ""}
              name="howItWorksStep2"
              onChange={(e) => this.setStates(e)}
            />
          </div>
          <div className="form-group my-4">
            <label className="mb-2">How It Works Step 3</label>
            <input
              type="text"
              className="form-control appointment-details-form-inputs"
              value={howItWorksStep3 ? howItWorksStep3 : ""}
              name="howItWorksStep3"
              onChange={(e) => this.setStates(e)}
            />
          </div>
          <div className="form-group my-4">
            <label className="mb-2">How It Works Step 4</label>
            <input
              type="text"
              className="form-control appointment-details-form-inputs"
              value={howItWorksStep4 ? howItWorksStep4 : ""}
              name="howItWorksStep4"
              onChange={(e) => this.setStates(e)}
            />
          </div>
          <div className="form-group my-4">
            <label className="mb-2">How It Works Step 5</label>
            <input
              type="text"
              className="form-control appointment-details-form-inputs"
              value={howItWorksStep5 ? howItWorksStep5 : ""}
              name="howItWorksStep5"
              onChange={(e) => this.setStates(e)}
            />
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Mid Section Title</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="midSectionTitle"
              value={midSectionTitle ? midSectionTitle : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">
              Emergency On-line Consultation
            </label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="emergencyOnlineConsultation"
              value={
                emergencyOnlineConsultation ? emergencyOnlineConsultation : ""
              }
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Describe In Short</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="describeInShort"
              value={describeInShort ? describeInShort : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Talk With Doctor</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="talkwithDoctor"
              value={talkwithDoctor ? talkwithDoctor : ""}
            ></textarea>
          </div>
          <div className="my-5 d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStoreToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const comactions = bindActionCreators(exadoActions, dispatch);
  const adminactions = bindActionCreators(exadoAdminActions, dispatch);
  return { comactions, adminactions };
}

export default connect(mapStoreToProps, mapDispatchToProps)(CmsHome);
