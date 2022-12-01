import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoActions from "../../../redux/exado/action";
import exadoAdminActions from "../../../redux/exadoAdmin/action";
import { cmsPageNum, promiseWrapper } from "../../../utility/common";
import { toast } from "react-toastify";

class CmsAboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      langId: this.props.langId,
      cmsData: {
        pageNumber: cmsPageNum.AboutUs,
        languageId: this.props.langId,
        headerMainTitle: "",
        headerSubTitle: "",
        offlineConsultation: "",
        onlineConsultation: "",
        chatWithADoctor: "",
        midSectionTitle: "",
        talkwithDoctor: "",
      },
    };
  }

  componentDidMount() {
    this.getCMSPageData(
      cmsPageNum.AboutUs,
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
            cmsPageNum.AboutUs,
            this.props.langId,
            this.state.isAdmin
          );
        }
      );
    }
  }

  setStates(e) {
    const newData = {
      ...this.state.cmsData,
      [e.target.name]: e.target.value ? e.target.value : null,
    };
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
        else toast.error(data.data.errorMessage);
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
            <label for="headerMainTitle">About Exado</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="headerMainTitle"
              value={headerMainTitle ? headerMainTitle : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="headerSubTitle">Our Mission & Vision</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="headerSubTitle"
              value={headerSubTitle ? headerSubTitle : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Mid-Section Title</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="midSectionTitle"
              value={midSectionTitle ? midSectionTitle : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Honesty</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="offlineConsultation"
              value={offlineConsultation ? offlineConsultation : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Trustworthiness</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              rows="3"
              name="onlineConsultation"
              value={onlineConsultation ? onlineConsultation : ""}
            ></textarea>
          </div>
          <div className="form-group my-4">
            <label for="describe-problem-textarea">Result oriented</label>
            <textarea
              className="form-control appointment-details-form-inputs"
              onChange={(e) => this.setStates(e)}
              id="describe-problem-textarea"
              rows="3"
              name="chatWithADoctor"
              value={chatWithADoctor ? chatWithADoctor : ""}
            ></textarea>
          </div>
          <div className="my-5 d-flex justify-content-around">
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

export default connect(mapStoreToProps, mapDispatchToProps)(CmsAboutUs);
