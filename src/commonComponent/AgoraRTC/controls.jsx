import React, { useEffect, useState } from "react";
import ConfirmPopup from "../Elements/confirmPopup";
// import Group8169 from 'assets/images/Group8169.png';
import { useTranslation } from "react-i18next";
import {
  localStorageKeys,
  promiseWrapper,
  userType,
} from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoDocActions from "../../redux/exadoDoc/action";

const Controls = (props) => {
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  useEffect(() => {
    console.log(trackState);
  }, [trackState]);

  const { t } = useTranslation();

  const [confirmModal, setConfirmModal] = useState(false);

  const changeTrackSetting = async (type) => {
    if (type === "a") {
      await props.tracks[0].setEnabled(!trackState.audio);
      setTrackState((prev) => {
        return { ...prev, audio: !prev.audio };
      });
    } else if (type === "v") {
      await props.tracks[1].setEnabled(!trackState.video);
      setTrackState((prev) => {
        return { ...prev, video: !prev.video };
      });
    }
  };

  const setClick = async () => {
    setConfirmModal(false);
    await props.client.leave();
    await props.client.removeAllListeners();
    await props.tracks[0].close();
    await props.tracks[1].close();
    props.setStart(false);
    const userMode = parseInt(localStorage.getItem(localStorageKeys.userType));
    if (userMode === userType.doctor) {
      MarkAppointmentAsCompleteWithDiagnostic();
      props.push(`/save-diagnostic/${props.appointmentGuid}`);
    } else if (userMode === userType.patient)
      props.push("/patient-appointment-upcoming");
  };

  const MarkAppointmentAsCompleteWithDiagnostic = () => {
    promiseWrapper(props.docactions.markAppointmentAsComplete, {
      appointmentGuid: props.appointmentGuid,
    }).then((data) => {
      if (data.isSuccess === true) console.log(data.data.message);
      else console.log(data.data.errorMessage);
    });
  };

  return (
    <div className="v-call-icon">
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="d-flex justify-content-center">
              <div
                className="icon-container rounded-circle d-flex justify-content-center align-items-center"
                onClick={() => changeTrackSetting("a")}
              >
                {!trackState.audio && "no"}
                <img
                  src="assets/images/Micemute.png"
                  alt="Micemute.png"
                  className="img-fluid w-50"
                />
              </div>
              <div
                className="icon-container rounded-circle d-flex justify-content-center align-items-center mx-2"
                onClick={() => changeTrackSetting("v")}
              >
                {!trackState.video && "no"}
                <img
                  src="assets/images/VideoCall.png"
                  alt="VideoCall.png"
                  className="img-fluid w-50"
                />
              </div>
              <div
                className="icon-container rounded-circle d-flex justify-content-center align-items-center"
                onClick={() => setConfirmModal(true)}
              >
                <img
                  src="assets/images/Callend.png"
                  alt="Callend.png"
                  className="img-fluid w-50"
                />
              </div>
              {!props.start && (
                <button
                  className="btn btn-success"
                  onClick={() => props.setStart(true)}
                >
                  Start Call
                </button>
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-end">
              <div className="icon-container rounded-circle d-flex justify-content-center align-items-center">
                <img
                  src="assets/images/Record.png"
                  alt="Record.png"
                  className="img-fluid w-50"
                />
              </div>
              <div
                className="icon-container rounded-circle d-flex justify-content-center align-items-center ms-2"
                onClick={() => props.setShowSidebar(!props.showSidebar)}
              >
                <i className="fas fa-ellipsis-h text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmPopup
        show={confirmModal}
        setShow={setConfirmModal}
        title={"End Call"}
        warning={"Are you sure you want to complete the appointment?"}
        okBtnText={"Yes"}
        cancleBtnText={"NO"}
        // Image={Group8169}
        ImagePath="assets/images/Group8169.png"
        setClick={setClick}
      />
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

export default connect(mapStoreToprops, mapDispatchToProps)(Controls);
