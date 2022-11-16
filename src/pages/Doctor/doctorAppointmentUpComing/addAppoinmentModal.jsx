import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import exadoDocActions from '../../../redux/exadoDoc/action';
import exadoPatientActions from '../../../redux/exadoPatient/action';
import { appointmentType, localStorageKeys, promiseWrapper } from '../../../utility/common';

class AddAppointmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientFirstName: "",
            patientLastName: "",
            gender: "Male",
            email: "",
            phone: "",
            additionalDescription: "",
            symptoms: "",
            sinceWhen: "",
            anyMedication: "",
            diagnosisGiven: "",
            appointmentTime: "",
            appointmentDate: "",
            availableSlotes: []
        }
    }

    submitWithdrawalData(e) {
        e.preventDefault();
        const modal = {
            "patientFirstName": this.state.patientFirstName,
            "patientLastName": this.state.patientLastName,
            "gender": this.state.gender,
            "email": this.state.email,
            "phone": this.state.phone,
            "additionalDescription": this.state.additionalDescription,
            "doctorGuid": localStorage.getItem("user-id"),
            "appointmentType": 2,
            "symptoms": this.state.symptoms,
            "sinceWhen": this.state.sinceWhen,
            "anyMedication": this.state.anyMedication,
            "diagnosisGiven": this.state.diagnosisGiven,
            "appointmentDate": `${this.state.appointmentDate}T${this.state.appointmentTime}`
        }
        promiseWrapper(this.props.doctoractions.bookOfflineAppointment, { modal })
            .then(data => {
                if (data.data.isSuccess) toast.success("Appointment added successfully")
                else toast.error("Can't add appointment");
                this.props.setAddAppointmentModal(false, true);
            })
            .catch(err => console.log(err))
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

        const {
            patientFirstName,
            patientLastName,
            gender,
            email,
            phone,
            additionalDescription,
            symptoms,
            sinceWhen,
            anyMedication,
            diagnosisGiven,
            availableSlotes,
            appointmentDate
        } = this.state;
        const { t, addAppointmentModal, setAddAppointmentModal } = this.props;

        return (
            <Modal show={addAppointmentModal} onHide={() => setAddAppointmentModal(false)} style={{ zIndex: 2 }} centered>
                <div className="modify-modal" id="withdraw-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog mt-0 mb-0 modal-lg">
                        <div className="modal-content">
                            <div className="modal-header modify-modal-header">
                                <h5 className="modal-title modify-modal-title" id="exampleModalLabel">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Patient's_Details")}</h5>
                                <button type="button" className="close modify-modal-close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => setAddAppointmentModal(false)}
                                >
                                    <img src="assets/images/close-line.png" alt="close-line.png" className="img-fluid" />
                                </button>
                            </div>
                            <div className="modal-body modify-modal-body">
                                <form className="appointment-details" onSubmit={this.submitWithdrawalData.bind(this)}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label className="mb-2">{t("Doctor.AppointmentUpComing.AddAppointmentModal.First_Name")}</label>
                                            <div className="search-bar-text-input delete-account-textarea">
                                                <input type="text" className="form-control mb-2"
                                                    value={patientFirstName}
                                                    name='patientFirstName'
                                                    onChange={(e) => this.setStates(e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="mb-2">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Last_Name")}</label>
                                            <input type="text" className="form-control mb-2"
                                                value={patientLastName}
                                                name='patientLastName'
                                                onChange={(e) => this.setStates(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="search-bar-text-input delete-account-textarea">
                                                <div className="form-group">
                                                    <div className="search-bar-text-input">
                                                        <label className="form-label">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Gender")}</label>
                                                        <select
                                                            className="selectpicker physician-servicies-select form-control" title="Gender"
                                                            value={gender}
                                                            name='gender'
                                                            onChange={(e) => this.setStates(e)}
                                                        >
                                                            <option>{t("Doctor.AppointmentUpComing.AddAppointmentModal.Male")}</option>
                                                            <option>{t("Doctor.AppointmentUpComing.AddAppointmentModal.Female")}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="mb-2">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Phone_Number")}</label>
                                            <div className="search-bar-text-input delete-account-textarea">
                                                <input type="number" className="form-control mb-2"
                                                    value={phone}
                                                    name='phone'
                                                    onChange={(e) => this.setStates(e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className='input-wrapper'>
                                                <label className="form-label">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Date")}</label>
                                                <input type="date" max="2100-12-31"
                                                    name='appointmentDate'
                                                    className="form-control"
                                                    onChange={e => { this.setStates(e); this.getAvailableSlotes(e.target.value) }}
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
                                                            availableSlotes.map(time => <option value={time}>{time}</option>) :
                                                            <option>No Slot available</option> :
                                                        <option>Please select date</option>}
                                                </select>
                                                <i className="far fa-clock"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <label className="mb-2">{t("Doctor.AppointmentUpComing.AddAppointmentModal.E-mail_ID")}</label>
                                    <div className="search-bar-text-input delete-account-textarea">
                                        <input type="email" className="form-control mb-2"
                                            value={email}
                                            name='email'
                                            onChange={(e) => this.setStates(e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="describe-problem-textarea">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Additional_Description")}</label>
                                        <textarea
                                            className="form-control appointment-details-form-inputs"
                                            onChange={(e) => this.setStates(e)}
                                            id="additionalDescription"
                                            rows="3"
                                            value={additionalDescription}
                                            placeholder="Additional Description."
                                            name='additionalDescription'
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="describe-problem-textarea">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Symptoms")}</label>
                                        <textarea
                                            className="form-control appointment-details-form-inputs"
                                            onChange={(e) => this.setStates(e)}
                                            id="describe-problem-textarea"
                                            rows="3"
                                            placeholder="Describe problem or symptoms."
                                            name='symptoms'
                                            value={symptoms}
                                        ></textarea>
                                    </div>
                                    <div className="form-group my-4">
                                        <label htmlFor="symptoms-active">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Since_When")}</label>
                                        <input
                                            type="text"
                                            className="form-control appointment-details-form-inputs"
                                            onChange={(e) => this.setStates(e)}
                                            id="symptoms-active"
                                            placeholder="Since..."
                                            name='sinceWhen'
                                            value={sinceWhen}
                                        />
                                    </div>
                                    <div className="form-group my-4">
                                        <label htmlFor="symptoms-active">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Medication")}</label>
                                        <input
                                            type="text"
                                            className="form-control appointment-details-form-inputs"
                                            onChange={(e) => this.setStates(e)}
                                            id="symptoms-active"
                                            placeholder="Any medication or treatment..."
                                            name='anyMedication'
                                            value={anyMedication}
                                        />
                                    </div>
                                    <div className="form-group my-4">
                                        <label htmlFor="symptoms-active">{t("Doctor.AppointmentUpComing.AddAppointmentModal.Diagnosis")}</label>
                                        <input
                                            type="text"
                                            className="form-control appointment-details-form-inputs"
                                            onChange={(e) => this.setStates(e)}
                                            id="symptoms-active"
                                            placeholder="If any"
                                            name='diagnosisGiven'
                                            value={diagnosisGiven}
                                        />
                                    </div>
                                    <div className="my-5 d-flex justify-content-around">
                                        <button
                                            type="submit"
                                            data-toggle="modal"
                                            data-dismiss="modal"
                                            data-target="#withdraw-submit"
                                            className="btn appointment-accept-btn"
                                        >
                                            {t("Doctor.AppointmentUpComing.AddAppointmentModal.Submit")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

function mapStoreToprops(state, props) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    const doctoractions = bindActionCreators(exadoDocActions, dispatch);
    const patientactions = bindActionCreators(exadoPatientActions, dispatch);
    return { doctoractions, patientactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(AddAppointmentModal));