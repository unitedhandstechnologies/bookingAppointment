import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoActions from "../../../redux/exado/action";
import exadoAdminActions from "../../../redux/exadoAdmin/action";
import { cmsPageNum, promiseWrapper } from "../../../utility/common";
import { toast } from "react-toastify";

class CmsChatWithDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      langId: this.props.langId,
      cmsData: {
        pageNumber: cmsPageNum.ChatWithDoctors,
        languageId: this.props.langId,
        howItWorksStep1: "",
        howItWorksStep2: "",
        howItWorksStep3: "",
        howItWorksStep4: "",
        howItWorksStep5: "",
      },
    };
  }

  componentDidMount() {
    this.getCMSPageData(
      cmsPageNum.ChatWithDoctors,
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
            cmsPageNum.ChatWithDoctors,
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
      howItWorksStep1,
      howItWorksStep2,
      howItWorksStep3,
      howItWorksStep4,
      howItWorksStep5,
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

export default connect(mapStoreToProps, mapDispatchToProps)(CmsChatWithDoctors);
