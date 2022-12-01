import React, { useState } from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import exadoAdminActions from "../../redux/exadoAdmin/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { promiseWrapper } from "../../utility/common";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";


class AdminRefundPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AdminRefundReason: "",
      RefundPercentage: "",
    };
  }

  closeAdminRefundPopup = () => {
    this.props.CloseAdminRefundPopup("", "", 0);
  };

  UpdateRefundReason = (e) => {
    this.setState({ AdminRefundReason: e.target.value });
  };

  UpdateRefundPercentage = (e) => {
    this.setState({ RefundPercentage: e.target.value });
  };

  SaveRefund() {
    let errorMessage = "";
    if (this.state.AdminRefundReason === "") {
      errorMessage += `Please enter reason for refund \n`;
    }
    if (errorMessage != "") {
      toast.error(errorMessage);
      return;
    }
    this.closeAdminRefundPopup();
    let aprefund = {
      refundGuid: this.props.RefundDetails.RefundGuid,
      appointmentGuid: this.props.RefundDetails.AppointmentGuid,
      refundReason: this.props.RefundDetails.RefundReason,
      refundAmount: this.props.RefundDetails.RefundAmount,
      refundPercentage: Number(this.state.RefundPercentage),
      adminReason: this.state.AdminRefundReason,
    };
    promiseWrapper(this.props.adminactions.approveRefund, {
      model: aprefund,
    }).then((data) => {
      if (data.isSuccess == true) {
        toast.success(data.message);
        // this.closeAddFundsPopup();
      } else {
        toast.error(data.errorMessage);
        // this.closeAddFundsPopup();
      }
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal modify-modal"
        style={{ display: "block" }}
        tabindex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header modify-modal-header">
              <h5 className="modal-title modify-modal-title">Approve Refund</h5>
              <button
                type="button"
                className="close ms-0 model-close-btn"
                onClick={this.closeAdminRefundPopup}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body modify-modal-body">
              <div className="appointment-details">
                <div className="row">
                  <div className="mb-3">
                    How much amount should be refunded?
                  </div>
                  <div className="search-bar-text-input mb-4">
                    <div className="d-flex  justify-content-between divForm-radio mt-1">
                      <div className="form-check">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="0"
                            checked={this.state.RefundPercentage === "0"}
                            onChange={this.UpdateRefundPercentage.bind(this)}
                          />
                          <label className="form-check-label">0%</label>
                        </div>
                      </div>
                      <div className="form-check">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="25"
                            checked={this.state.RefundPercentage === "25"}
                            onChange={this.UpdateRefundPercentage.bind(this)}
                          />
                          <label className="form-check-label">25%</label>
                        </div>
                      </div>
                      <div className="form-check">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="50"
                            checked={this.state.RefundPercentage === "50"}
                            onChange={this.UpdateRefundPercentage.bind(this)}
                          />
                          <label className="form-check-label">50%</label>
                        </div>
                      </div>
                      <div className="form-check">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="75"
                            checked={this.state.RefundPercentage === "75"}
                            onChange={this.UpdateRefundPercentage.bind(this)}
                          />
                          <label className="form-check-label">75%</label>
                        </div>
                      </div>
                      <div className="form-check">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="100"
                            checked={this.state.RefundPercentage === "100"}
                            onChange={this.UpdateRefundPercentage.bind(this)}
                          />
                          <label className="form-check-label">100%</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <label className="mb-2">Admin Reason</label>
                <div className="search-bar-text-input delete-account-textarea">
                  <textarea
                    className="form-control"
                    onChange={this.UpdateRefundReason.bind(this)}
                    rows="4"
                    placeholder="Your Reason"
                  ></textarea>
                </div>
                <div className="my-5 d-flex justify-content-around">
                  <button
                    type="button"
                    onClick={this.SaveRefund.bind(this)}
                    className="btn appointment-accept-btn"
                  >
                    Submit
                  </button>
                </div>
              </div>
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
  const adminactions = bindActionCreators(exadoAdminActions, dispatch);
  return { docactions, patientactions, adminactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AdminRefundPopup));
