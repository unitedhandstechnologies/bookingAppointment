import moment from 'moment';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import exadoPatientActions from '../../../redux/exadoPatient/action';
import { promiseWrapper } from '../../../utility/common';

export class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentPage: 1,
            AppointmentList: [],
            TotalPages: 0
        }
    }

    componentDidMount() {
        this.GetAppointmentList();
    }
    GetAppointmentList() {
        let param = {
            "pageSize": 10,
            "currentPage": this.state.CurrentPage,
            "doctorGuid": this.props.DoctorProfile.userGuid,
            "appointmentStatuses": [0, 1, 2],
            "appointmentTypes": [0, 1, 2],
            "isFromPatientDetailPage": true,
            "isRequiredRefundData": true,
            "isRequiredCommissionData": true
        }
        promiseWrapper(this.props.patientactions.getAppointments, { filter: param }).then((data) => {
            this.setState({
                AppointmentList: data.patientAppointments,
                TotalPages: data.totalPages
            });
        });
    }

    handlePageClick = (data) => {
        this.setState({ CurrentPage: data.selected + 1 }, () => {
            this.GetAppointmentList();
        });
    };


    render() {

        const { t } = this.props

        return (

            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-md-12" className="table-min-height">
                    <div className="tableContainer table-responsive">
                        <table className="table table-bordered appointmentTable">
                            <thead>
                                <tr className="new-patient-table-title">
                                    <th rowspan="2">{t("Admin.DoctorDetailView.Appointments.Booking_ID")}</th>
                                    <th rowspan="2">{t("Admin.DoctorDetailView.Appointments.Patient_Name")}</th>
                                    <th>{t("Date")}</th>
                                    <th rowspan="2">{t("Admin.DoctorDetailView.Appointments.Amount")} (€)</th>
                                    <th rowspan="2">{t("Admin.DoctorDetailView.Appointments.Appointment_Type")}</th>
                                    <th rowspan="2">{t("Admin.DoctorDetailView.Appointments.Refund_Amount")}</th>
                                    <th rowspan="2">{t("Admin.DoctorDetailView.Appointments.Admin_Commission")}</th>
                                    <th rowspan="2">{t("Admin.DoctorDetailView.Appointments.Due_Amount")}</th>
                                </tr>
                                <tr>
                                    <th>{t("Admin.DoctorDetailView.Appointments.Time")}</th>
                                </tr>
                            </thead>
                            {this.state.AppointmentList.length ?
                                <tbody>
                                    {this.state.AppointmentList.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.bookingId}</td>
                                            <td><Link className="doctorName" to={`/patient-detail-view/${data.patientGuid}`}>{data.patientFirstName} {data.patientLastName}</Link></td>
                                            <td className="dateTime">{moment(data.appointmentDateTime).format("MM/DD/YYYY")}<br />{moment(data.appointmentDateTime).format("HH:mm")}</td>
                                            <td className="country">{data.amount}</td>
                                            <td className="type">{data.appointmentType}</td>
                                            <td>{data.refundAmount}</td>
                                            <td>{data.adminCommission}</td>
                                            <td>{data.amountDue}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody> : <></>
                            }
                        </table>
                        <div className="my-4 d-flex justify-content-center">
                            <ReactPaginate
                                previousClassName={'arrow'}
                                nextClassName={'arrow'}
                                previousLabel={'<<'}
                                nextLabel={'>>'}
                                breakLabel={'...'}
                                pageLinkClassName={'pages'}
                                pageCount={this.state.TotalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                activeLinkClassName={'active'}
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStoreToprops(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const patientactions = bindActionCreators(exadoPatientActions, dispatch);
    return { patientactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(Appointments));
