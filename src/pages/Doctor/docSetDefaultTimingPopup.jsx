import React from "react";
import { Redirect } from "react-router-dom";
import "../login/login.css";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import {
  promiseWrapper,
  weekArray,
  stringToBoolean,
} from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoDocActions from "../../redux/exadoDoc/action";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import moment from "moment";

class SetDefaultTiming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadedData: false,
      redirect: null,
      IsOnline: this.props.IsOnline,
      WeekDays: [],
      WorkFromTime: null,
      WorkToTime: null,
      LunchFromTime: null,
      LunchToTime: null,
      TimeSlot: 0,
    };
  }

  componentDidMount() {
    if (this.props.DefaultGUID !== "") {
      promiseWrapper(this.props.actions.getDoctorDefaultTimingById, {
        defaultGuid: this.props.DefaultGUID,
      }).then((jsdata) => {
        let tempdata = jsdata.data;
        let tta = [];
        tta.push(tempdata.dayID);
        this.setState({
          IsOnline: tempdata.isOnlineAppointment === true ? "True" : "False",
        });
        this.setState({ WeekDays: tta.map((v) => v.toString()) });
        this.setState({ WorkFromTime: tempdata.workFromTime });
        this.setState({ WorkToTime: tempdata.workToTime });
        this.setState({ LunchFromTime: tempdata.lunchFromTime });
        this.setState({ LunchToTime: tempdata.lunchToTime });
        this.setState({ TimeSlot: tempdata.timeSlot });
        this.setState({ LoadedData: true });
      });
    } else {
      this.setState({ LoadedData: true });
    }
  }

  handleSetDefaultTimingPopupClick = () => {
    this.props.toggleSetDefaultTiming();
  };

  UpdateWeekDay = (e) => {
    this.setState({ WeekDays: e });
  };

  UpdateTimeSlot = (e) => {
    console.log(e.target.value);
    this.setState({ TimeSlot: e.target.value });
  };

  UpdateIsOnline = (e) => {
    this.setState({ IsOnline: e.target.value });
  };

  UpdateTiming = (field, e) => {
    let timeAndDate = moment(
      new Date().toLocaleDateString("en-US") + " " + e.target.value
    ).format();
    if (field === "1") {
      this.setState({ WorkFromTime: timeAndDate });
    }
    if (field === "2") {
      this.setState({ WorkToTime: timeAndDate });
    }
    if (field === "3") {
      this.setState({ LunchFromTime: timeAndDate });
    }
    if (field === "4") {
      this.setState({ LunchToTime: timeAndDate });
    }
  };

  saveDefaultTiming() {
    let errorMessage = "";
    if (this.state.TimeSlot == "0" || this.state.TimeSlot == "") {
      errorMessage += "Please enter Duration of Patient Consultation \n";
    }
    if (this.state.WeekDays.length === 0) {
      errorMessage += `Please select Day \n`;
    }
    if (this.state.WorkFromTime === "" || this.state.WorkFromTime === null) {
      errorMessage += "Please enter working time From \n";
    }
    if (this.state.WorkToTime === "" || this.state.WorkToTime === null) {
      errorMessage += "Please enter working time To \n";
    }
    if (
      this.state.WorkFromTime !== "" &&
      this.state.WorkToTime !== "" &&
      this.state.WorkFromTime !== null &&
      this.state.WorkToTime !== null
    ) {
      if (this.state.WorkFromTime > this.state.WorkToTime)
        errorMessage += "Work From time should be less than Work To time \n";
    }
    // if (this.state.LunchFromTime === '') {
    //     errorMessage += 'Please enter lunch time From \n';
    // }
    // if (this.state.LunchToTime === '') {
    //     errorMessage += 'Please enter lunch time To \n';
    // }
    if (
      this.state.LunchFromTime !== "" &&
      this.state.LunchToTime !== "" &&
      this.state.LunchFromTime !== null &&
      this.state.LunchToTime !== null
    ) {
      if (this.state.LunchFromTime > this.state.LunchToTime)
        errorMessage += "Lunch From time should be less than Lunch To time \n";
    }
    if (errorMessage != "") {
      toast.error(errorMessage);
      return;
    }
    let sWorkFromTime = this.state.WorkFromTime;
    console.log(sWorkFromTime);
    if (this.state.WorkFromTime) {
      if (this.state.WorkFromTime.indexOf("+") >= 0)
        sWorkFromTime = this.state.WorkFromTime.substring(
          0,
          this.state.WorkFromTime.indexOf("+")
        );
      //sWorkFromTime = sWorkFromTime + '+00:00';
    }
    console.log(sWorkFromTime);

    let sWorkToTime = this.state.WorkToTime;
    console.log(sWorkToTime);
    if (this.state.WorkToTime) {
      if (this.state.WorkToTime.indexOf("+") >= 0)
        sWorkToTime = this.state.WorkToTime.substring(
          0,
          this.state.WorkToTime.indexOf("+")
        );
      //sWorkToTime = sWorkToTime + '+00:00';
    }
    console.log(sWorkToTime);

    let sLunchFromTime = this.state.LunchFromTime;
    if (this.state.LunchFromTime) {
      if (this.state.LunchFromTime.indexOf("+") >= 0)
        sLunchFromTime = this.state.LunchFromTime.substring(
          0,
          this.state.LunchFromTime.indexOf("+")
        );
      //sLunchFromTime = sLunchFromTime + '+00:00';
    }

    let sLunchToTime = this.state.LunchToTime;
    if (this.state.LunchToTime) {
      if (this.state.LunchToTime.indexOf("+") >= 0)
        sLunchToTime = this.state.LunchToTime.substring(
          0,
          this.state.LunchToTime.indexOf("+")
        );
      //sLunchToTime = sLunchToTime + '+00:00';
    }

    let response = {
      defaultTimingGuid: null,
      doctorGuid: localStorage.getItem("user-id"),
      isOnlineAppointment: stringToBoolean(this.state.IsOnline),
      days: this.state.WeekDays.map((v) => parseInt(v, 10)),
      workFromTime: sWorkFromTime,
      workToTime: sWorkToTime,
      lunchFromTime: sLunchFromTime,
      lunchToTime: sLunchToTime,
      timeSlot: Number(this.state.TimeSlot),
    };
    promiseWrapper(this.props.actions.saveDoctorDefaultTiming, {
      doctorDefaultTimingModel: response,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        toast.success(data.data.message);
      } else {
        toast.error(data.data.message);
      }
      this.handleSetDefaultTimingPopupClick();
    });
  }

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div
        className="modal"
        id="working-timing-modal"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered doctor-my-timing-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title working-titming-modal-title"
                id="exampleModalLabel"
              >
                {t("Doctor.Profile_Basic.Set_Working_Time")}
              </h5>
              <button
                type="button"
                onClick={this.handleSetDefaultTimingPopupClick}
                className="close close-btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 pr-2">
                  <div className="search-bar-text-input mb-4">
                    <span>
                      {t("Doctor.Profile_Basic.Select_Appoitnment_Type")}
                    </span>
                    <div
                      style={{ width: "100%" }}
                      className="d-flex justify-content-between divForm-radio mt-1"
                    >
                      <div className="form-check">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="True"
                            checked={this.state.IsOnline === "True"}
                            onChange={this.UpdateIsOnline.bind(this)}
                          />
                          <label className="form-check-label">
                            {t("Doctor.Profile_Basic.Online")}
                          </label>
                        </div>
                      </div>
                      <div className="form-check">
                        <div>
                          <input
                            className="form-check-input"
                            type="radio"
                            value="False"
                            checked={this.state.IsOnline === "False"}
                            onChange={this.UpdateIsOnline.bind(this)}
                          />
                          <label className="form-check-label">
                            {t("Doctor.Profile_Basic.In-Clinic")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pr-2">
                  <div className="form-group">
                    <div className="search-bar-text-input mb-4">
                      <label className="form-label">
                        {t(
                          "Doctor.Profile_Basic.Duration_of_Patient_Consultation_(Minutes)"
                        )}
                      </label>
                      <select
                        value={this.state.TimeSlot}
                        onChange={this.UpdateTimeSlot.bind(this)}
                        className="physician-servicies-select form-control appearance-auto"
                      >
                        <option value="0">
                          {t("Doctor.Profile_Basic.Select_Session_Duration")}
                        </option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                        <option value="75">75</option>
                        <option value="90">90</option>
                        <option value="105">105</option>
                        <option value="120">120</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 pr-2 mb-4">
                  <div className="form-group">
                    {this.state.LoadedData === true && (
                      <div className="search-bar-text-input">
                        <label className="form-label">
                          {t("Doctor.Profile_Basic.Select_Day")}
                        </label>
                        <DropdownMultiselect
                          selected={this.state.WeekDays}
                          buttonClass="selectpicker search-bar-text-input physician-servicies-select form-control border-class"
                          placeholder={t("Doctor.Profile_Basic.Select_Day")}
                          handleOnChange={this.UpdateWeekDay.bind(this)}
                          options={weekArray()}
                          optionKey="dayId"
                          optionLabel="dayName"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-2">
                  <div className="search-bar-text-input mb-4">
                    <label className="form-label">
                      {t("Doctor.Profile_Basic.Working_Time_From")}
                    </label>
                    <input
                      type="time"
                      value={moment(this.state.WorkFromTime).format("HH:mm")}
                      onChange={this.UpdateTiming.bind(this, "1")}
                      className="form-control"
                      placeholder={t("Doctor.Profile_Basic.Select_Day")}
                    />
                  </div>
                </div>
                <div className="col-md-6 pr-2">
                  <div className="search-bar-text-input mb-4">
                    <label className="form-label">
                      {t("Doctor.Profile_Basic.Working_Time_To")}
                    </label>
                    <input
                      type="time"
                      value={moment(this.state.WorkToTime).format("HH:mm")}
                      onChange={this.UpdateTiming.bind(this, "2")}
                      className="form-control"
                      placeholder={t("Doctor.Profile_Basic.Select_Day")}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 pr-2">
                  <div className="search-bar-text-input mb-4">
                    <label className="form-label">
                      {t("Doctor.Profile_Basic.Lunch_Break_From_(optional)")}
                    </label>
                    <input
                      type="time"
                      value={moment(this.state.LunchFromTime).format("HH:mm")}
                      onChange={this.UpdateTiming.bind(this, "3")}
                      className="form-control"
                      placeholder={t("Doctor.Profile_Basic.Select_Day")}
                    />
                  </div>
                </div>
                <div className="col-md-6 pr-2">
                  <div className="search-bar-text-input mb-4">
                    <label className="form-label">
                      {t("Doctor.Profile_Basic.Lunch_Break_To_(optional)")}
                    </label>
                    <input
                      type="time"
                      value={moment(this.state.LunchToTime).format("HH:mm")}
                      onChange={this.UpdateTiming.bind(this, "4")}
                      className="form-control"
                      placeholder={t("Doctor.Profile_Basic.Select_Day")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary px-5 doctor-timing-modal-cancel-btn"
                onClick={this.handleSetDefaultTimingPopupClick}
                data-dismiss="modal"
              >
                {t("Doctor.Profile_Basic.Cancel")}
              </button>
              <button
                type="button"
                onClick={this.saveDefaultTiming.bind(this)}
                className="btn px-5 doctor-timing-modal-save-btn"
              >
                {t("Doctor.Profile_Basic.Save")}
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
  const actions = bindActionCreators(exadoDocActions, dispatch);
  return { actions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(SetDefaultTiming));
