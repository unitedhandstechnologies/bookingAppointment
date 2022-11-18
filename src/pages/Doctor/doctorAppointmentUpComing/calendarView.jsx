import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoDocActions from "../../../redux/exadoDoc/action";
import { isAppointmentNew, promiseWrapper } from "../../../utility/common";
import DoctorFooter from "../docFooter";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import moment from "moment";
import { withTranslation } from "react-i18next";

export class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedulerData1: [],
      viewAppointmentModel: false,
      tooltipVisibility: false,
    };
  }

  componentDidMount() {
    this.getBookedAppointments();
  }

  getBookedAppointments() {
    let currentDate = new Date();
    let params = {
      fromdate: moment(currentDate).subtract(6, "months").format("YYYY-MM-DD"),
      todate: moment(currentDate).add(6, "months").format("YYYY-MM-DD"),
      doctorGuid: localStorage.getItem("user-id"),
    };
    promiseWrapper(this.props.docactions.getBookedAppointments, {
      params,
    }).then((data) => {
      const info = data.data.filter((list) => {
        const isNew = isAppointmentNew(list.appointmentDateTime, 2);
        if (isNew) return true;
        else return false;
      });
      const schedulerData = info.map((list) => {
        let duration = list.duration ? list.duration : 30;
        return {
          title: `${list.patientFirstName} ${list.patientLastName} - ${list.appointmentType}`,
          startDate: moment(list.appointmentDateTime).toISOString(),
          endDate: moment(list.appointmentDateTime)
            .add(duration, "minutes")
            .toISOString(),
          appointmentGuid: list.appointmentGuid,
        };
      });
      this.setState({ schedulerData1: schedulerData });
    });
  }

  render() {
    const currentDate = new Date();
    const { getCalendarData, toggleViewAppointment } = this.props;

    if (getCalendarData === 1) {
      this.getBookedAppointments();
      this.props.setCalendarView(0);
    }

    return (
      <div className="row mt-3 d-flex justify-content-center">
        <Paper>
          <Scheduler data={this.state.schedulerData1}>
            <ViewState
              defaultCurrentDate={currentDate}
              defaultCurrentViewName="Week"
            />
            <WeekView startDayHour={8} endDayHour={20} />
            <Toolbar />
            <DateNavigator />
            <Appointments
              appointmentComponent={({ ...rest }) => (
                <Appointments.Appointment
                  {...rest}
                  onClick={(e) => toggleViewAppointment(e.data.appointmentGuid)}
                />
              )}
            />
          </Scheduler>
        </Paper>
        <DoctorFooter />
      </div>
    );
  }
}

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  return { docactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(CalendarView));
