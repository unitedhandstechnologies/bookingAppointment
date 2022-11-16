import React from 'react';
// import Group8433Img from './../../assets/images/Group8433.png';
import { withTranslation, Trans } from 'react-i18next';

class AppointmentAccept extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    ClosePopup = () => {
        this.props.ClosePopup();
    };

    render() {
        const { t } = this.props
        return (
            <div className="modal accept-appointment" style={{ display: "block" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="divForm my-4">
                                <div className="d-flex flex-column text-center">
                                    <div className="patient-forget-password-text">
                                        <p>{t('Doctor.AppointmentAcceptedPopup.Appointment_Accepted')}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <img src="assets/images/Group8433.png" className="img-fluid w-25" alt="Responsive-img" />
                                </div>
                                <div className="text-center mb-5">
                                    <span>{t('Doctor.AppointmentAcceptedPopup.Appointment_has_been_added')}</span><br />
                                    <span>{t('Doctor.AppointmentAcceptedPopup._to_your_dashboard.')}</span>
                                </div>
                                <div className="mt-3 text-center">
                                    <a className="btn MyButton reset-password-button w-25" onClick={this.ClosePopup.bind(this)}>{t('Doctor.AppointmentAcceptedPopup.Done')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (withTranslation()(AppointmentAccept));