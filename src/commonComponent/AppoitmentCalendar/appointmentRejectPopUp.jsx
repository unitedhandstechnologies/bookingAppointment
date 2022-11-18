import React from "react";
// import Group84331Img from './../../assets/images/Group84331.png';
import { withTranslation, Trans } from "react-i18next";

class AppointmentReject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ClosePopup = () => {
    this.props.ClosePopup();
  };

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
                      {t(
                        "Doctor.AppointmentRejectedPopup.Appointment_Rejected"
                      )}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <img
                    src="assets/images/Group84331.png"
                    className="img-fluid w-25"
                    alt="Responsive-img"
                  />
                </div>
                <div className="text-center mb-5">
                  <span>
                    {t(
                      "Doctor.AppointmentRejectedPopup.Appointment_has_been_removed"
                    )}
                  </span>
                  <br />
                  <span>
                    {t("Doctor.AppointmentRejectedPopup.from_your_dashborad.")}
                  </span>
                </div>
                <div className="mt-3 text-center">
                  <a
                    className="btn MyButton reset-password-button"
                    onClick={this.ClosePopup.bind(this)}
                  >
                    {t("Doctor.AppointmentRejectedPopup.Done")}
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

export default withTranslation()(AppointmentReject);
