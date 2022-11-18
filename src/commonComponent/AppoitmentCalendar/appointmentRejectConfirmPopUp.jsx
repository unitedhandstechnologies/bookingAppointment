import React from "react";
// import Group84331Img from './../../assets/images/Group84331.png';
import { withTranslation, Trans } from "react-i18next";

class AppointmentRejectConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ClosePopup = (appId, action) => this.props.ClosePopup(appId, action);

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal reject-appointment"
        style={{ display: "block", zIndex: "3" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="divForm my-4">
                <div className="d-flex flex-column text-center">
                  <div className="patient-forget-password-text">
                    <p>
                      {t("Doctor.RejectConfirmationPopup.Reject_Confirmation")}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <img
                    src="assets/images/Group84331.png"
                    className="img-fluid w-25"
                    alt="Responsive image"
                  />
                </div>
                <div className="text-center mb-5">
                  <span>
                    {t(
                      "Doctor.RejectConfirmationPopup.Are_you_sure_you_want_to_reject_this_appointment"
                    )}
                  </span>
                  <br />
                </div>
                <div className="mt-3 text-center">
                  <a
                    className="btn MyButton reset-password-button w-25 me-5"
                    onClick={this.ClosePopup.bind(
                      this,
                      this.props.AppointmentGuid,
                      1
                    )}
                  >
                    {t("Doctor.RejectConfirmationPopup.Reject")}
                  </a>
                  <a
                    className="btn MyButton reset-password-button w-25"
                    onClick={this.ClosePopup.bind(
                      this,
                      this.props.AppointmentGuid,
                      0
                    )}
                  >
                    {t("Doctor.RejectConfirmationPopup.Cancel")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AppointmentRejectConfirm);
