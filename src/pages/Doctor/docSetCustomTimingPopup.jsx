import React, { forwardRef, useState } from "react";
import { Redirect } from "react-router-dom";
import "../login/login.css";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import { promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoDocActions from "../../redux/exadoDoc/action";
import moment from "moment";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

// const SetCustomTiming = (props) => {
//   const [LoadedData, setLoadedData] = useState(false);
//   const [redirect, setRedirect] = useState(null);
//   const [IsOnline, setIsOnline] = useState("1");
//   const [IsDayOff, setIsDayOff] = useState(false);
//   const [IsYearlyDayOff, setIsYearlyDayOff] = useState(false);
//   const [FromDate, setFromDate] = useState(null);
//   const [ToDate, setToDate] = useState(null);
//   const [WorkFromTime, setWorkFromTime] = useState("");
//   const [WorkToTime, setWorkToTime] = useState("");
//   const [LunchFromTime, setLunchFromTime] = useState("");
//   const [LunchToTime, setLunchToTime] = useState("");
//   const [setTime] = useState(false);

//   const handleSetCustomTimingPopupClick = () => {
//     props.toggleSetCustomTiming();
//   };

//   const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
//     <div className="position-relative">
//       <Form.Control
//         ref={ref}
//         onClick={onClick}
//         value={value}
//         className="ps-4"
//         onChange={() => {}}
//       />

//     </div>
//   ));

//   useEffect(() => {
//     if (props.DefaultCustomGUID !== "") {
//       promiseWrapper(props.actions.getDoctorCustomTimingById, {
//         defaultGuid: props.DefaultCustomGUID,
//       }).then((jsdata) => {
//         let tempdata = jsdata.data;
//         setIsDayOff(tempdata.isDayOff);
//         setIsYearlyDayOff(tempdata.isYearlyDayOff);
//         setFromDate(
//           tempdata.fromDate != null ? tempdata.fromDate.substr(0, 10) : null
//         );
//         setToDate(
//           tempdata.toDate != null ? tempdata.toDate.substr(0, 10) : null
//         );
//         setIsOnline({ IsOnline: tempdata.appointmentType.toString() });
//         setWorkFromTime({ WorkFromTime: tempdata.workFromTime });
//         setWorkToTime({ WorkToTime: tempdata.workToTime });
//         setLunchFromTime({ LunchFromTime: tempdata.lunchFromTime });
//         setLunchToTime({ LunchToTime: tempdata.lunchToTime });
//         setLoadedData(true);
//       });
//     } else {
//       setLoadedData(true);
//     }
//   }, []);

//   const UpdateIsOnline = (e) => {
//     setIsOnline(e.target.value);
//   };

//   const UpdateFromDate = (e) => {
//     setFromDate(e.target.value);
//   };

//   const UpdateToDate = (e) => {
//     setToDate(e.target.value);
//   };

//   const UpdateIsDayOff = (e) => {
//     if (!e.target.checked && IsOnline == "3") {
//       setIsOnline("1");
//     }
//     setIsDayOff(e.target.checked);
//   };

//   const UpdateIsYearlyDayOff = (e) => {
//     setIsYearlyDayOff(e.target.checked);
//   };

//   const UpdateCustomTiming = (e, field) => {
//     let timeAndDate = moment(
//       new Date().toLocaleDateString("en-US") + " " + e.target.value
//     ).format();
//     if (field === "1") {
//       setWorkFromTime(timeAndDate);
//     }
//     if (field === "2") {
//       setWorkToTime(timeAndDate);
//     }
//     if (field === "3") {
//       setLunchFromTime(timeAndDate);
//     }
//     if (field === "4") {
//       setLunchToTime(timeAndDate);
//     }
//   };

//   const saveCustomTiming = () => {
//     let errorMessage = "";
//     if (FromDate === "") {
//       errorMessage += "Please enter From date \n";
//     }
//     if (ToDate === "") {
//       errorMessage += "Please enter To date \n";
//     }
//     if (FromDate !== "" && ToDate !== "") {
//       if (FromDate > ToDate)
//         errorMessage += "From date should be less than To date \n";
//     }
//     if (IsDayOff === false) {
//       if (WorkFromTime === "" || WorkFromTime === null) {
//         errorMessage += "Please enter working time From \n";
//       }
//       if (WorkToTime === "" || WorkToTime === null) {
//         errorMessage += "Please enter working time To \n";
//       }
//       if (
//         WorkFromTime !== "" &&
//         WorkToTime !== "" &&
//         WorkFromTime !== null &&
//         WorkToTime !== null
//       ) {
//         if (WorkFromTime > WorkToTime)
//           errorMessage += "Work From time should be less than Work To time \n";
//       }
//       // if (LunchFromTime === '' || LunchFromTime === null) {
//       //     errorMessage += 'Please enter lunch time From \n';
//       // }
//       // if (LunchToTime === '' || LunchToTime === null) {
//       //     errorMessage += 'Please enter lunch time To \n';
//       // }
//       if (
//         LunchFromTime !== "" &&
//         LunchToTime !== "" &&
//         LunchFromTime !== null &&
//         LunchToTime !== null
//       ) {
//         if (LunchFromTime > LunchToTime)
//           errorMessage +=
//             "Lunch From time should be less than Lunch To time \n";
//       }
//     }
//     if (errorMessage != "") {
//       toast.error(errorMessage);
//       return;
//     }

//     let sWorkFromTime = WorkFromTime;
//     if (WorkFromTime) {
//       if (WorkFromTime.indexOf("+") >= 0)
//         sWorkFromTime = WorkFromTime.substring(0, WorkFromTime.indexOf("+"));
//       // sWorkFromTime = sWorkFromTime;
//     }

//     let sWorkToTime = WorkToTime;
//     if (WorkToTime) {
//       if (WorkToTime.indexOf("+") >= 0)
//         sWorkToTime = WorkToTime.substring(0, WorkToTime.indexOf("+"));
//       // sWorkToTime = sWorkToTime ;
//     }

//     let sLunchFromTime = LunchFromTime;
//     if (LunchFromTime) {
//       if (LunchFromTime.indexOf("+") >= 0)
//         sLunchFromTime = LunchFromTime.substring(0, LunchFromTime.indexOf("+"));
//       // sLunchFromTime = sLunchFromTime ;
//     }

//     let sLunchToTime = LunchToTime;
//     if (LunchToTime) {
//       if (LunchToTime.indexOf("+") >= 0)
//         sLunchToTime = LunchToTime.substring(0, LunchToTime.indexOf("+"));
//       // sLunchToTime = sLunchToTime ;
//     }

//     let response = {
//       customTimingGuid:
//         props.DefaultCustomGUID === "" ? null : props.DefaultCustomGUID,
//       doctorGuid: localStorage.getItem("user-id"),
//       isDayOff: IsDayOff,
//       appointmentType: Number(IsOnline),
//       fromDate: FromDate,
//       toDate: ToDate,
//       workFromTime: sWorkFromTime,
//       workToTime: sWorkToTime,
//       lunchFromTime: sLunchFromTime,
//       lunchToTime: sLunchToTime,
//       isYearlyDayOff: IsYearlyDayOff,
//     };
//     promiseWrapper(props.actions.saveDoctorCustomTiming, {
//       doctorCustomTimingModel: response,
//     }).then((data) => {
//       if (data.data.isSuccess == true) {
//         toast.success(data.data.message);
//       } else {
//         toast.error(data.data.message);
//       }
//       handleSetCustomTimingPopupClick();
//     });
//   };

//   const { t } = props;

//   if (redirect) {
//     return <Redirect to={redirect} />;
//   }

//   return (
//     <>
//       <div
//         className="modal"
//         id="working-timing-modal"
//         style={{ display: "block" }}
//       >
//         <div className="modal-dialog modal-dialog-centered doctor-my-timing-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5
//                 className="modal-title working-titming-modal-title"
//                 id="exampleModalLabel"
//               >
//                 {t("Doctor.Profile_Basic.Add_Custom_Working_Time")}
//               </h5>
//               <button
//                 type="button"
//                 onClick={handleSetCustomTimingPopupClick}
//                 className="close close-btn"
//                 data-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-md-12 divForm">
//                   <div className="divFormRow pull-right mb-3">
//                     <span>
//                       <input
//                         className="form-check-input"
//                         name="is-day-off-name"
//                         type="checkbox"
//                         id="is-day-off"
//                         value=""
//                         checked={IsDayOff === true}
//                         onChange={UpdateIsDayOff}
//                       />
//                     </span>
//                     <span style={{ paddingLeft: "10px" }}>
//                       <label className="rememberMe form-label">
//                         {t("Doctor.Profile_Basic.Is_day_off")}
//                       </label>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-12 divForm">
//                   <div className="search-bar-text-input mb-4">
//                     <span>
//                       {t("Doctor.Profile_Basic.Select_Appoitnment_Type")}
//                     </span>
//                     <div className="d-flex  justify-content-between divForm-radio mt-1">
//                       <div className="form-check">
//                         <div>
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             value="1"
//                             checked={IsOnline === "1"}
//                             onChange={UpdateIsOnline}
//                           />
//                           <label className="form-check-label">
//                             {t("Doctor.Profile_Basic.Online")}
//                           </label>
//                         </div>
//                       </div>
//                       <div className="form-check">
//                         <div>
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             value="2"
//                             checked={IsOnline === "2"}
//                             onChange={UpdateIsOnline}
//                           />
//                           <label className="form-check-label">
//                             {t("Doctor.Profile_Basic.In-Clinic")}
//                           </label>
//                         </div>
//                       </div>
//                       {IsDayOff === true && (
//                         <div className="form-check">
//                           <div>
//                             <input
//                               className="form-check-input"
//                               type="radio"
//                               value="3"
//                               checked={IsOnline === "3"}
//                               onChange={UpdateIsOnline}
//                             />
//                             <label className="form-check-label">Both</label>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6 pr-2">
//                   <div className="search-bar-text-input mb-4">
//                     <label className="form-label">
//                       {t("Doctor.Profile_Basic.From_Date")}
//                     </label>

//                     <ReactDatePicker
//                       selected={FromDate}
//                       onChange={(date) => setFromDate(date)}
//                       dateFormat="dd/MM/yyyy"
//                       customInput={<ExampleCustomInput />}
//                       value={FromDate ? FromDate : `Enter From Date`}
//                       minDate={moment().toDate()}
//                     />
//                     {/* <input
//                       type="date"
//                       max="2100-12-31"
//                       value={FromDate}
//                       min={moment(new Date()).format("yyyy-MM-DD")}
//                       onChange={UpdateFromDate}
//                       className="form-control"
//                       placeholder="Select Day"
//                     /> */}
//                   </div>
//                 </div>
//                 <div className="col-md-6 pr-2">
//                   <div className="search-bar-text-input mb-4">
//                     <label className="form-label">
//                       {t("Doctor.Profile_Basic.To_Date")}
//                     </label>
//                     {/* <input
//                       type="date"
//                       max="2100-12-31"
//                       value={ToDate}
//                       min={moment(new Date()).format("yyyy-MM-DD")}
//                       onChange={UpdateToDate}
//                       className="form-control"
//                       placeholder={t("Doctor.Profile_Basic.Select_Day")}
//                     /> */}

//                     <ReactDatePicker
//                       selected={ToDate}
//                       onChange={(date) => setToDate(date)}
//                       dateFormat="dd/MM/yyyy"
//                       customInput={<ExampleCustomInput />}
//                       value={ToDate ? ToDate : `Enter To Date`}
//                       minDate={moment().toDate()}
//                     />
//                   </div>
//                 </div>
//               </div>
//               {IsDayOff === true && (
//                 <div className="row">
//                   <div className="col-md-12 divForm">
//                     <div className="divFormRow pull-right mb-3">
//                       <span>
//                         <input
//                           className="form-check-input"
//                           name="is-yearly-off-name"
//                           type="checkbox"
//                           id="is-year-off"
//                           value=""
//                           checked={IsYearlyDayOff === true}
//                           onChange={UpdateIsYearlyDayOff}
//                         />
//                       </span>
//                       <span style={{ paddingLeft: "10px" }}>
//                         <label className="rememberMe form-label">
//                           In Perpetuaity
//                         </label>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {IsDayOff === false && (
//                 <div className="row">
//                   <div className="col-md-6 pr-2">
//                     <div className="search-bar-text-input mb-4">
//                       <label className="form-label">
//                         {t("Doctor.Profile_Basic.Working_Time_From")}
//                       </label>
//                       <input
//                         id="WorkingFromTime"
//                         type="time"
//                         value={moment(WorkFromTime).format("HH:mm")}
//                         onChange={(e) => UpdateCustomTiming(e, "1")}
//                         className="form-control timeFielda"
//                         placeholder="Select Day"
//                       />
//                       {/* <TimePicker
//                         value={WorkFromTime}
//                         onChange={(e) => UpdateCustomTiming(e, "1")}
//                         showSecond={false}
//                         allowEmpty
//                       /> */}
//                     </div>
//                   </div>
//                   <div className="col-md-6 pr-2">
//                     <div className="search-bar-text-input mb-4">
//                       <label className="form-label">
//                         {t("Doctor.Profile_Basic.Working_Time_To")}
//                       </label>
//                       <input
//                         type="time"
//                         value={moment(WorkToTime).format("HH:mm")}
//                         onChange={(e) => UpdateCustomTiming(e, "2")}
//                         className="form-control"
//                         placeholder="Select Day"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {IsDayOff === false && (
//                 <div className="row">
//                   <div className="col-md-6 pr-2">
//                     <div className="search-bar-text-input mb-4">
//                       <label className="form-label">
//                         {t("Doctor.Profile_Basic.Lunch_Break_From_(optional)")}
//                       </label>
//                       <input
//                         type="time"
//                         value={moment(LunchFromTime).format("HH:mm")}
//                         onChange={(e) => UpdateCustomTiming(e, "3")}
//                         className="form-control"
//                         placeholder={t("Doctor.Profile_Basic.Select_Day")}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6 pr-2">
//                     <div className="search-bar-text-input mb-4">
//                       <label className="form-label">
//                         {t("Doctor.Profile_Basic.Lunch_Break_To_(optional)")}
//                       </label>
//                       <input
//                         type="time"
//                         value={moment(LunchToTime).format("HH:mm")}
//                         onChange={(e) => UpdateCustomTiming(e, "4")}
//                         className="form-control"
//                         placeholder={t("Doctor.Profile_Basic.Select_Day")}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary px-5 doctor-timing-modal-cancel-btn"
//                 onClick={handleSetCustomTimingPopupClick}
//                 data-dismiss="modal"
//               >
//                 {t("Doctor.Profile_Basic.Cancel")}
//               </button>
//               <button
//                 type="button"
//                 onClick={saveCustomTiming}
//                 className="btn px-5 doctor-timing-modal-save-btn"
//               >
//                 {t("Doctor.Profile_Basic.Save")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


var today = new Date()
var tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

class SetCustomTiming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      IsOnline: "1",
      IsDayOff: false,
      IsYearlyDayOff: false,
      FromDate: today,
      ToDate: tomorrow,
      WorkFromTime: moment(),
      WorkToTime: moment(),
      LunchFromTime: null,
      LunchToTime: null,
      setTime: false,
    };
  }

  handleSetCustomTimingPopupClick = () => {
    this.props.toggleSetCustomTiming();
  };

  componentDidMount() {
    if (this.props.DefaultCustomGUID !== "") {
      promiseWrapper(this.props.actions.getDoctorCustomTimingById, {
        defaultGuid: this.props.DefaultCustomGUID,
      }).then((jsdata) => {
        let tempdata = jsdata.data;
        this.setState({ IsDayOff: tempdata.isDayOff });
        this.setState({ IsYearlyDayOff: tempdata.isYearlyDayOff });
        this.setState({
          FromDate:
            tempdata.fromDate != null ? tempdata.fromDate.substr(0, 10) : null,
        });
        this.setState({
          ToDate:
            tempdata.toDate != null ? tempdata.toDate.substr(0, 10) : null,
        });
        this.setState({ IsOnline: tempdata.appointmentType.toString() });
        this.setState({ WorkFromTime: tempdata.workFromTime });
        this.setState({ WorkToTime: tempdata.workToTime });
        this.setState({ LunchFromTime: tempdata.lunchFromTime });
        this.setState({ LunchToTime: tempdata.lunchToTime });
        this.setState({ LoadedData: true });
      });
    } else {
      this.setState({ LoadedData: true });
    }
  }

  UpdateIsOnline = (e) => {
    this.setState({ IsOnline: e.target.value });
  };

  UpdateFromDate = (e) => {
    this.setState({ FromDate: e.target.value });
  };

  UpdateToDate = (e) => {
    this.setState({ ToDate: e.target.value });
  };

  UpdateIsDayOff = (e) => {
    if (!e.target.checked && this.state.IsOnline == "3") {
      this.setState({ IsOnline: "1" });
    }
    this.setState({ IsDayOff: e.target.checked });
  };

  UpdateIsYearlyDayOff = (e) => {
    this.setState({ IsYearlyDayOff: e.target.checked });
  };

  UpdateCustomTiming = (field, e) => {
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

  saveCustomTiming() {
    let errorMessage = "";
    if (this.state.FromDate === "") {
      errorMessage += "Please enter From date \n";
    }
    if (this.state.ToDate === "") {
      errorMessage += "Please enter To date \n";
    }
    if (this.state.FromDate !== "" && this.state.ToDate !== "") {
      if (this.state.FromDate > this.state.ToDate)
        errorMessage += "From date should be less than To date \n";
    }
    if (this.state.IsDayOff === false) {
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
      // if (this.state.LunchFromTime === '' || this.state.LunchFromTime === null) {
      //     errorMessage += 'Please enter lunch time From \n';
      // }
      // if (this.state.LunchToTime === '' || this.state.LunchToTime === null) {
      //     errorMessage += 'Please enter lunch time To \n';
      // }
      if (
        this.state.LunchFromTime !== "" &&
        this.state.LunchToTime !== "" &&
        this.state.LunchFromTime !== null &&
        this.state.LunchToTime !== null
      ) {
        if (this.state.LunchFromTime > this.state.LunchToTime)
          errorMessage +=
            "Lunch From time should be less than Lunch To time \n";
      }
    }
    if (errorMessage != "") {
      toast.error(errorMessage);
      return;
    }

    let sWorkFromTime = this.state.WorkFromTime;
    if (this.state.WorkFromTime) {
      if (this.state.WorkFromTime.indexOf("+") >= 0)
        sWorkFromTime = this.state.WorkFromTime.substring(
          0,
          this.state.WorkFromTime.indexOf("+")
        );
      // sWorkFromTime = sWorkFromTime;
    }

    let sWorkToTime = this.state.WorkToTime;
    if (this.state.WorkToTime) {
      if (this.state.WorkToTime.indexOf("+") >= 0)
        sWorkToTime = this.state.WorkToTime.substring(
          0,
          this.state.WorkToTime.indexOf("+")
        );
      // sWorkToTime = sWorkToTime ;
    }

    let sLunchFromTime = this.state.LunchFromTime;
    if (this.state.LunchFromTime) {
      if (this.state.LunchFromTime.indexOf("+") >= 0)
        sLunchFromTime = this.state.LunchFromTime.substring(
          0,
          this.state.LunchFromTime.indexOf("+")
        );
      // sLunchFromTime = sLunchFromTime ;
    }

    let sLunchToTime = this.state.LunchToTime;
    if (this.state.LunchToTime) {
      if (this.state.LunchToTime.indexOf("+") >= 0)
        sLunchToTime = this.state.LunchToTime.substring(
          0,
          this.state.LunchToTime.indexOf("+")
        );
      // sLunchToTime = sLunchToTime ;
    }

    let response = {
      customTimingGuid:
        this.props.DefaultCustomGUID === ""
          ? null
          : this.props.DefaultCustomGUID,
      doctorGuid: localStorage.getItem("user-id"),
      isDayOff: this.state.IsDayOff,
      appointmentType: Number(this.state.IsOnline),
      fromDate: this.state.FromDate,
      toDate: this.state.ToDate,
      workFromTime: sWorkFromTime,
      workToTime: sWorkToTime,
      lunchFromTime: sLunchFromTime,
      lunchToTime: sLunchToTime,
      isYearlyDayOff: this.state.IsYearlyDayOff,
    };
    promiseWrapper(this.props.actions.saveDoctorCustomTiming, {
      doctorCustomTimingModel: response,
    }).then((data) => {
      if (data.data.isSuccess == true) {
        toast.success(data.data.message);
      } else {
        toast.error(data.data.message);
      }
      this.handleSetCustomTimingPopupClick();
    });
  }





  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <>
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
                  {t("Doctor.Profile_Basic.Add_Custom_Working_Time")}
                </h5>
                <button
                  type="button"
                  onClick={this.handleSetCustomTimingPopupClick}
                  className="close close-btn"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 divForm">
                    <div className="divFormRow pull-right mb-3">
                      <span>
                        <input
                          className="form-check-input"
                          name="is-day-off-name"
                          type="checkbox"
                          id="is-day-off"
                          value=""
                          checked={this.state.IsDayOff === true}
                          onChange={this.UpdateIsDayOff.bind(this)}
                        />
                      </span>
                      <span style={{ paddingLeft: "10px" }}>
                        <label className="rememberMe form-label">
                          {t("Doctor.Profile_Basic.Is_day_off")}
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 divForm">
                    <div className="search-bar-text-input mb-4">
                      <span>
                        {t("Doctor.Profile_Basic.Select_Appoitnment_Type")}
                      </span>
                      <div className="d-flex  justify-content-between divForm-radio mt-1">
                        <div className="form-check">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              value="1"
                              checked={this.state.IsOnline === "1"}
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
                              value="2"
                              checked={this.state.IsOnline === "2"}
                              onChange={this.UpdateIsOnline.bind(this)}
                            />
                            <label className="form-check-label">
                              {t("Doctor.Profile_Basic.In-Clinic")}
                            </label>
                          </div>
                        </div>
                        {this.state.IsDayOff === true && (
                          <div className="form-check">
                            <div>
                              <input
                                className="form-check-input"
                                type="radio"
                                value="3"
                                checked={this.state.IsOnline === "3"}
                                onChange={this.UpdateIsOnline.bind(this)}
                              />
                              <label className="form-check-label">Both</label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-2">
                    <div className="search-bar-text-input mb-4">
                      <label className="form-label">
                        {t("Doctor.Profile_Basic.From_Date")}
                      </label>
                      <input
                        type="date"
                        max="2100-12-31"
                        value={this.state.FromDate}
                        min={moment(today).format("yyyy-MM-DD")}
                        onChange={this.UpdateFromDate.bind(this)}
                        className="form-control"
                        placeholder="Select Day"
                      />
                      {/* <ReactDatePicker
                        className="form-control"
                        selected={this.state.FromDate}
                        onChange={this.UpdateFromDate.bind(this)}
                        dateFormat="yyyy-MM-dd"

                        customInput={this.ExampleCustomInput}
                        value={
                          this.state.FromDate
                            ? this.state.FromDate
                            : `Enter From Date`
                        }
                        isIn
                        minDate={today}
                      /> */}
                    </div>
                  </div>
                  <div className="col-md-6 pr-2">
                    <div className="search-bar-text-input mb-4">
                      <label className="form-label">
                        {t("Doctor.Profile_Basic.To_Date")}
                      </label>
                      <input
                        type="date"
                        max="2100-12-31"
                        value={this.state.ToDate}
                        min={moment(tomorrow).format("yyyy-MM-DD")}
                        onChange={this.UpdateToDate.bind(this)}
                        className="form-control"
                        placeholder={t("Doctor.Profile_Basic.Select_Day")}
                      />
                      {/* <ReactDatePicker
                        selected={this.state.ToDate}
                        className="form-control"
                        onChange={this.UpdateToDate.bind(this)}
                        dateFormat="yyyy-MM-dd"
                        customInput={this.ExampleCustomInput}
                        value={
                          this.state.ToDate
                            ? this.state.ToDate
                            : `Enter To Date`
                        }
                        minDate={tomorrow}
                      /> */}
                    </div>
                  </div>
                </div>
                {this.state.IsDayOff === true && (
                  <div className="row">
                    <div className="col-md-12 divForm">
                      <div className="divFormRow pull-right mb-3">
                        <span>
                          <input
                            className="form-check-input"
                            name="is-yearly-off-name"
                            type="checkbox"
                            id="is-year-off"
                            value=""
                            checked={this.state.IsYearlyDayOff === true}
                            onChange={this.UpdateIsYearlyDayOff.bind(this)}
                          />
                        </span>
                        <span style={{ paddingLeft: "10px" }}>
                          <label className="rememberMe form-label">
                            In Perpetuaity
                          </label>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.IsDayOff === false && (
                  <div className="row">
                    <div className="col-md-6 pr-2">
                      <div className="search-bar-text-input mb-4">
                        <label className="form-label">
                          {t("Doctor.Profile_Basic.Working_Time_From")}
                        </label>
                        <input
                          id="WorkingFromTime"
                          type="time"
                          value={moment(this.state.WorkFromTime).format(
                            "HH:mm"
                          )}
                          onChange={this.UpdateCustomTiming.bind(this, "1")}
                          className="form-control timeFielda"
                          placeholder="Select Day"
                        />
                        {/* <TimePicker value={moment(this.state.WorkFromTime).format(
                            "HH:mm")} onChange={this.UpdateCustomTiming.bind(this, "1")}/> */}
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
                          onChange={this.UpdateCustomTiming.bind(this, "2")}
                          className="form-control"
                          placeholder="Select Day"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {this.state.IsDayOff === false && (
                  <div className="row">
                    <div className="col-md-6 pr-2">
                      <div className="search-bar-text-input mb-4">
                        <label className="form-label">
                          {t(
                            "Doctor.Profile_Basic.Lunch_Break_From_(optional)"
                          )}
                        </label>
                        <input
                          type="time"
                          value={moment(this.state.LunchFromTime).format(
                            "HH:mm"
                          )}
                          onChange={this.UpdateCustomTiming.bind(this, "3")}
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
                          onChange={this.UpdateCustomTiming.bind(this, "4")}
                          className="form-control"
                          placeholder={t("Doctor.Profile_Basic.Select_Day")}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-5 doctor-timing-modal-cancel-btn"
                  onClick={this.handleSetCustomTimingPopupClick}
                  data-dismiss="modal"
                >
                  {t("Doctor.Profile_Basic.Cancel")}
                </button>
                <button
                  type="button"
                  onClick={this.saveCustomTiming.bind(this)}
                  className="btn px-5 doctor-timing-modal-save-btn"
                >
                  {t("Doctor.Profile_Basic.Save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStoreToprops = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(exadoDocActions, dispatch);
  return { actions };
};

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(SetCustomTiming));
