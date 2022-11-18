import React from "react";
import { Redirect } from "react-router-dom";
import OtpInput from "react-otp-input";
import "../login/login.css";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoActions from "../../redux/exado/action";

class ChangePasswordPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      OTP: "",
    };
  }

  handleSendOTPPopupClick = () => {
    this.props.toggleSendOTP();
  };

  UpdateOTP = (OTP) => this.setState({ OTP });

  OnSubmitOTP = (event) => {
    if (this.state.OTP.length !== 6) {
      toast.error("Please enter valid otp");
      return;
    } else {
      toast.success("Mobile phone verified successfully");
      this.handleSendOTPPopupClick();
    }
  };

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div
        className="modal send-otp-model"
        style={{ display: "block" }}
        id="send-otp"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {t("Doctor.SendOtpPopup.Mobile_OTP")}
              </h5>
              <button
                type="button"
                className="close send-otp-close"
                onClick={this.handleSendOTPPopupClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="verification-code-section p-5">
                <div className="divForm">
                  <div className="forget-password-text">
                    <p>{t("Doctor.SendOtpPopup.Enter_your_mobile_OTP_code")}</p>
                  </div>
                  <div>
                    <p className="text-muted">
                      {t("Doctor.SendOtpPopup.We_have_sent_to_OTP_code_to")}
                    </p>
                    <p className="verification-email">
                      {this.props.OTPMobileNo}
                    </p>
                  </div>
                  <div>
                    <p>
                      {t(
                        "Doctor.SendOtpPopup.Please_enter_the_code_you_received_below"
                      )}
                    </p>
                    <div className="divFormRow d-flex justify-content-around">
                      <OtpInput
                        value={this.state.OTP}
                        onChange={this.UpdateOTP.bind(this)}
                        numInputs={6}
                        separator={<span> - </span>}
                        inputStyle={{
                          width: "3em",
                          height: "3em",
                          margin: "0 3px 0 3px",
                        }}
                      />
                      {/* <div className="verification-code-digits">
                                                <input type="text" className="form-control" id="verification-code-input1" placeholder="_" />
                                            </div>
                                            <div className="verification-code-digits">
                                                <input type="text" className="form-control" id="verification-code-input2" placeholder="_" />
                                            </div>
                                            <div className="verification-code-digits">
                                                <input type="text" className="form-control" id="verification-code-input3" placeholder="_" />
                                            </div>
                                            <div className="verification-code-digits">
                                                <input type="text" className="form-control" id="verification-code-input4" placeholder="_" />
                                            </div> */}
                    </div>
                  </div>
                  <div className="mt-3">
                    <a
                      className="btn MyButton verification-code-button"
                      onClick={this.OnSubmitOTP.bind(this)}
                      role="button"
                    >
                      {t("Doctor.SendOtpPopup.Submit")}
                    </a>
                  </div>
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
  const actions = bindActionCreators(exadoActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(ChangePasswordPopup));
