import React from "react";
import exadoDocActions from "../../redux/exadoDoc/action";
import exadoPatientActions from "../../redux/exadoPatient/action";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactStars from "react-rating-stars-component";
import { promiseWrapper } from "../../utility/common";
import { withTranslation } from "react-i18next";

class AppointmentFeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FeedBackComments: "",
      Ratting: 0,
    };
  }

  ClosePopupClick = () => {
    this.props.CloseAppointmentFeedBack("false");
  };

  UpdateFeedBackComments = (e) => {
    this.setState({ FeedBackComments: e.target.value });
  };

  UpdateRatting = (e) => {
    this.setState({ Ratting: e });
  };

  SubmitFeedBack() {
    let data = {
      doctorReviewGuid: null,
      patientGuid: this.props.AppointmentData.patientGuid,
      doctorGuid: this.props.AppointmentData.doctorGuid,
      appointmentGuid: this.props.AppointmentData.appointmentGuid,
      patientFirstname: "",
      patientLastName: "",
      rating: this.state.Ratting,
      description: this.state.FeedBackComments,
      createdDate: null,
    };
    if (
      this.state.FeedBackComments !== "" &&
      this.state.FeedBackComments !== null
    ) {
      promiseWrapper(this.props.patientactions.saveReview, {
        model: data,
      }).then((data) => {
        if (data.isSuccess == true) {
          this.props.CloseAppointmentFeedBack("true");
        } else {
          toast.error("there is some issue with save feedback.");
          this.props.CloseAppointmentFeedBack("false");
        }
      });
    } else {
      toast.error("please write your appointment feedback.");
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="modal pending-feedback" style={{ display: "block" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="divForm my-4">
                <div className="d-flex flex-column text-center">
                  <div className="patient-forget-password-text">
                    <p>{t("Doctor.PatientFeedback.Patient_Feedback")}</p>
                  </div>
                </div>
                <label className="mb-2">
                  {t("Doctor.PatientFeedback.Provide_your_feedback")}
                </label>
                <div className="search-bar-text-input delete-account-textarea">
                  <textarea
                    className="form-control"
                    onChange={this.UpdateFeedBackComments.bind(this)}
                    rows="4"
                    placeholder={t("Doctor.PatientFeedback.Your_Feedback")}
                  ></textarea>
                </div>
                <div className="mt-2 mb-5 d-flex align-items-center">
                  <span className="feedback-star-rating-text">
                    {t("Doctor.PatientFeedback.Star_Rating")}
                  </span>
                  <ReactStars
                    classNames="star-img img-fluid mx-2"
                    count={5}
                    size={20}
                    value={this.state.Ratting}
                    isHalf={true}
                    edit={true}
                    onChange={this.UpdateRatting}
                    emptyIcon={
                      <i className="far fa-star" style={{ color: "#20CAD6" }} />
                    }
                    halfIcon={<i className="fa fa-star-half-alt" />}
                    filledIcon={<i className="fa fa-star" />}
                    color="#fff"
                    activeColor="#20CAD6"
                  />
                </div>
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    className="btn pending-feedback-cancel w-25 mx-2"
                    onClick={this.ClosePopupClick.bind(this)}
                  >
                    {t("Doctor.PatientFeedback.Cancel")}
                  </button>
                  <a
                    className="btn MyButton reset-password-button w-25 mx-2"
                    onClick={this.SubmitFeedBack.bind(this)}
                  >
                    {t("Doctor.PatientFeedback.Done")}
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

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AppointmentFeedBack));
