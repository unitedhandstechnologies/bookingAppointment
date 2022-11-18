import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoDocActions from "../../redux/exadoDoc/action";
import {
  localStorageKeys,
  promiseWrapper,
  userType,
} from "../../utility/common";
import { useTranslation } from "react-i18next";

const Sidebar = (props) => {
  const { setShowSidebar, appointmentGuid, showSidebar } = props;
  const style = {
    display: {
      width: "340px",
      padding: "20px",
    },
    hide: {
      width: "0%",
      padding: "0",
    },
  };
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const userMode = parseInt(localStorage.getItem(localStorageKeys.userType));
  const { t } = useTranslation();

  useEffect(() => {
    getAppointmentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAppointmentDetails = () => {
    promiseWrapper(props.docactions.getAllAppointmentDetail, {
      appointmentGuid: appointmentGuid,
    })
      .then((data) => {
        setAppointmentDetails(data.patientAppointmentDetail);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="side-chat">
      {appointmentDetails && (
        <div
          id="myNav"
          className="overlay"
          style={showSidebar ? style.display : style.hide}
        >
          <div className="d-flex align-items-center justify-content-between side-chat-header">
            <div className="side-chat-title">
              {userMode === userType.patient
                ? t("Doctor.Doctor")
                : t("Patient.Patient")}{" "}
              {t("Patient.AppointmentUpComing.View")}
            </div>
            <button className="closebtn" onClick={() => setShowSidebar(false)}>
              &times;
            </button>
          </div>
          <div className="overlay-content my-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 p-0">
                  {userMode === userType.patient ? (
                    <>
                      <div className="chat-item-title">
                        {t("Patient.AppointmentUpComing.Doctor_Name")}
                      </div>
                      <div className="chat-item-value">
                        Dr. {appointmentDetails.doctorFirstName}{" "}
                        {appointmentDetails.doctorLastName}
                      </div>
                      <div className="chat-item-designation">
                        {appointmentDetails.physicianServices}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="chat-item-title">
                        {t("Doctor.AppointmentUpComing.Patient_Name")}
                      </div>
                      <div className="chat-item-value">
                        {appointmentDetails.patientFirstName}{" "}
                        {appointmentDetails.patientLastName}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 col-6 p-0">
                  <div className="chat-item-title">
                    {t("Patient.AppointmentUpComing.Date")}
                  </div>
                  <div className="chat-item-value">
                    {new Date(
                      appointmentDetails.appointmentDateTime
                    ).toDateString()}
                  </div>
                </div>
                <div className="col-md-6 col-6 p-0">
                  <div className="chat-item-title">
                    {t("Patient.AppointmentUpComing.Time")}
                  </div>
                  <div className="chat-item-value">
                    {new Date(
                      appointmentDetails.appointmentDateTime
                    ).toTimeString()}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 p-0">
                  <div className="chat-item-title">
                    {t("Patient.AppointmentUpComing.Booking_ID")}
                  </div>
                  <div className="chat-item-value">
                    {appointmentDetails.bookingId}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 p-0">
                  <div className="app-details">
                    <div className="app-details-title">
                      {t("Public.BookAppointment.Appointment_Details")}
                    </div>
                    <div className="app-qa">
                      <div className="app-q">
                        <span className="me-2">Q.</span>
                        {t("Public.ChatWithDoctor.Describe_symptoms")}
                      </div>
                      <div className="app-a d-flex">
                        <div className="me-2">A.</div>
                        <div>{appointmentDetails.symptoms}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 p-0">
                  <div className="app-details">
                    <div className="app-qa">
                      <div className="app-q">
                        <span className="me-2">Q.</span>
                        {t("Public.ChatWithDoctor.medication_or_treatment")}
                      </div>
                      <div className="app-a d-flex">
                        <div className="me-2">B.</div>
                        <div>{appointmentDetails.anyMedication}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 p-0">
                  <div className="app-details">
                    <div className="app-qa">
                      <div className="app-q">
                        <span className="me-2">Q.</span>
                        {t("Public.ChatWithDoctor.already_given_diagnosis")}
                      </div>
                      <div className="app-a d-flex">
                        <div className="me-2">C.</div>
                        <div>{appointmentDetails.diagnosisGiven}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 p-0">
                  <div className="app-details">
                    <div className="app-qa">
                      <div className="app-q">
                        <span className="me-2">Q.</span>
                        {t("Public.ChatWithDoctor.Since_when")}
                      </div>
                      <div className="app-a d-flex">
                        <div className="me-2">D.</div>
                        <div>{appointmentDetails.sinceWhen}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  return { docactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(Sidebar);
