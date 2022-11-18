import React, { Component } from "react";
import { withTranslation, Trans } from "react-i18next";
import { Redirect } from "react-router-dom";
import exadoAdminActions from "../../redux/exadoAdmin/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ToastContainer, toast } from "react-toastify";
import { promiseWrapper, convertEsTojson } from "../../utility/common";

class RejectPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Reason: "",
      redirect: null,
    };
  }

  handlePopupClick = () => {
    this.props.toggle();
  };

  UpdateReason = (e) => {
    this.setState({ Reason: e.target.value });
  };

  RejectApproval() {
    // if (this.props.docUserId !== null && this.props.docUserId !== "")
    promiseWrapper(this.props.actions.verifyDoctorProfile, {
      userGuid: this.props.docUserId,
      verificationType: this.props.buttonActionValue,
      cancelReason: this.state.Reason,
    }).then((jsdata) => {
      if (jsdata.isSuccess == true) {
        toast.success(jsdata.message);
        this.setState({ redirect: "/admin-dashboard" });
      } else {
        toast.error(jsdata.message);
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="modal view-details-reject" style={{ display: "block" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-end">
              <button
                type="button"
                onClick={this.handlePopupClick}
                className="close modal-close-button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="modal-title mb-4">
                {this.props.buttonActionValue === 4
                  ? `Reason for rejecting ${this.props.docName}`
                  : `Need additional info for ${this.props.docName}`}
              </h5>
              <div className="divForm got-emergency-form">
                <div className="search-bar-text-input mb-3">
                  <textarea
                    className="form-control"
                    onChange={this.UpdateReason.bind(this)}
                    id="cancelReason"
                    rows="4"
                    placeholder="Your Feedback"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                onClick={this.RejectApproval.bind(this)}
                className="btn modal-submit px-5"
              >
                Submit
              </button>
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
  const actions = bindActionCreators(exadoAdminActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(RejectPopup));
