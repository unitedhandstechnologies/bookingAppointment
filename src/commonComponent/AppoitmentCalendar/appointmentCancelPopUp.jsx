import React from 'react';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { appointmentType, localStorageKeys, promiseWrapper, userType } from '../../utility/common';
import { withTranslation } from 'react-i18next';

class AppointmentCancel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelReason: "",
            availableSlotes: [],
            appointmentDate: "",
            appointmentTime: ""
        };
    }

    UpdateCancelreason = (e) => {
        this.setState({ cancelReason: e.target.value });
    }

    ClosePopup = () => this.props.ClosePopup()

    CancelAppointment() {
        const dateNtime = (this.state.appointmentDate && this.state.appointmentTime) ? `${this.state.appointmentDate}T${this.state.appointmentTime}` : new Date().toUTCString();
        if (this.state.cancelReason !== "" && this.state.cancelReason !== null) {
            promiseWrapper(this.props.patientactions.cancelAppointment, { appointmentGuid: this.props.AppointmentGuid, cancelReason: this.state.cancelReason, canceledBy: localStorage.getItem('user-type'), suggestedDateTime: dateNtime }).then((data) => {
                if (data.data.isSuccess == true) {
                }
                else {
                    toast.error("there is some issue with cancel appointment");
                }
            });
            this.ClosePopup();
        }
        else {
            toast.error("please give reason for cancel appointment");
        }

    }

    getAvailableSlotes = (appointmentDate) => {
        promiseWrapper(this.props.patientactions.viewAllAvailability, {
            appointmentModel: { appDate: appointmentDate, appointmentType: appointmentType.InClinic }, doctorGuid: localStorage.getItem(localStorageKeys.userId)
        }).then((data) => {
            data.availableSlots.forEach(dateSlotes => {
                if (dateSlotes.availableTime.length) {
                    const currentDate = new Date(dateSlotes.currentDate).toDateString();
                    const selectedDate = new Date(appointmentDate).toDateString();
                    const today = new Date().toDateString();
                    if (selectedDate === currentDate) {
                        if (today !== selectedDate)
                            this.setState({
                                availableSlotes: dateSlotes.availableTime.map(dateTime => new Date(dateTime).toLocaleTimeString('en-GB')), appointmentTime: new Date(dateSlotes.availableTime[0]).toLocaleTimeString('en-GB')
                            })
                        else {
                            const filterTime = dateSlotes.availableTime.filter(dateTime => {
                                if ((new Date().getTime()) < new Date(dateTime).getTime()) return true
                                else return false
                            })
                            this.setState({
                                availableSlotes: filterTime.map(dateTime => new Date(dateTime).toLocaleTimeString('en-GB')),
                                appointmentTime: new Date(filterTime[0]).toLocaleTimeString('en-GB')
                            })
                        }
                    }
                }
            });
        });
    }

    setStates = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { t } = this.props;
        const {
            availableSlotes,
            appointmentDate
        } = this.state;
        return (
            <div className="modal reject-appointment" style={{ display: "block", zIndex: 3 }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <a type="button" className="close modify-modal-close text-end mt-3 me-3" onClick={this.ClosePopup.bind(this)}>
                            <img src="assets/images/close-line.png" alt="close-line.png" className="img-fluid" />
                        </a>
                        <div className="modal-body">
                            <div className="divForm my-4">
                                <div className="d-flex flex-column text-center">
                                    <div className="patient-forget-password-text">
                                        <p>{t('Doctor.AppointmentCancelledPopup.Appointment_Cancelled')}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <img src="assets/images/Group84331.png" className="img-fluid w-25" alt="Responsive img" />
                                </div>
                                {parseInt(localStorage.getItem(localStorageKeys.userType)) === userType.doctor &&
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className='input-wrapper'>
                                                <label className="form-label">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Date")}</label>
                                                <input type="date" max="2100-12-31"
                                                    name='appointmentDate'
                                                    className="form-control"
                                                    onChange={e => {
                                                        this.setStates(e);
                                                        this.getAvailableSlotes(e.target.value)
                                                    }}
                                                    value={appointmentDate}
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                                <i className="far fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className='input-wrapper'>
                                                <label className="form-label">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Time")}</label>
                                                <select
                                                    name="appointmentTime"
                                                    className="form-control"
                                                    onChange={(e) => { if (availableSlotes.length) this.setStates(e) }}
                                                >
                                                    {appointmentDate ?
                                                        availableSlotes.length ?
                                                            availableSlotes.map((time, i) => <option key={i} value={time}>{time}</option>) :
                                                            <option>No Slot available</option> :
                                                        <option>Please select date</option>}
                                                </select>
                                                <i className="far fa-clock"></i>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <label className="mb-2">{t('Doctor.AppointmentCancelledPopup.Please_enter_your_reason')}</label>
                                <div className="search-bar-text-input delete-account-textarea mb-3">
                                    <textarea className="form-control" onChange={this.UpdateCancelreason.bind(this)} rows="4" placeholder={t('Doctor.AppointmentCancelledPopup.Your_Reason')}></textarea>
                                </div>
                                <div className="mt-3 text-center">
                                    <a className="btn MyButton reset-password-button" onClick={this.CancelAppointment.bind(this)}>{t('Doctor.AppointmentCancelledPopup.Send_Cancelation')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStoreToprops(state, props) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    const patientactions = bindActionCreators(exadoPatientActions, dispatch);
    return { patientactions };
}


export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(AppointmentCancel));