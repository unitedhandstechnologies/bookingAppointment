import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoAdminActions from '../../../redux/exadoAdmin/action';
import { promiseWrapper } from '../../../utility/common';
import { Form } from "react-bootstrap"
import moment from 'moment';
import { withTranslation } from 'react-i18next';

export class Finance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PaymentData: {},
            Month: parseInt(moment().format("MM")),
            Year: parseInt(moment().format("YYYY"))
        }
    }
    componentDidMount() {
        this.getPaymentData();
    }
    getPaymentData() {
        let param = {
            "Month": this.state.Month,
            "Year": this.state.Year
        }
        promiseWrapper(this.props.adminactions.getDoctorPayment, { query: param }).then((data) => {
            this.setState({
                PaymentData: data.data,
            });
        });
    }

    setMonth(e) {
        this.setState({ Month: e.target.value })
    }

    setYear(e) {
        this.setState({ Year: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getPaymentData();
        console.log(this.state.Month, this.state.Year)
    }

    yearList() {
        const list = [];
        let year = 2021;
        while (year <= this.state.Year) { list.push(year); year++ }
        return list;
    }

    render() {

        const { t } = this.props;

        return (
            <div className="row">
                <div className="admin-doctor-title mb-2 p-0">
                    <Form className="row" onSubmit={(e) => this.handleSubmit(e)}>
                        <select className="form-select col" onChange={(e) => this.setMonth(e)}>
                            {moment.months().map((month, i) =>
                                <option value={i + 1}
                                    selected={((i + 1) === this.state.Month) ? true : false}
                                >
                                    {month}
                                </option>
                            )}
                        </select>
                        <select className="form-select col" onChange={(e) => this.setYear(e)}>
                            {this.yearList().map(year =>
                                <option
                                    value={year}
                                    selected={(year === this.state.Year) ? true : false}
                                >
                                    {year}
                                </option>
                            )}
                        </select>
                        <button type='submit' className='btn btn-success col'>{t("Admin.DoctorDetailView.Finance.Get_Finance_Data")}</button>
                    </Form>
                </div>
                <hr />
                <div className="col-lg-12 col-md-12">
                    <div className="row">
                        <div className="col-md-4 admin-doctor-name">{t("Admin.DoctorDetailView.Finance.Total_Amount")} : </div>
                        <div className="col-md-8">
                            <div className="mb-2">
                                <div className="d-flex admin-doctor-value">
                                    {this.state.PaymentData.totalAmount}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 admin-doctor-name">{t("Admin.DoctorDetailView.Finance.Total_Commission")} : </div>
                        <div className="col-md-8">
                            <div className="mb-2">
                                <div className="d-flex admin-doctor-value">
                                    {this.state.PaymentData.totalCommission}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 admin-doctor-name">{t("Admin.DoctorDetailView.Finance.Total_Refund")} : </div>
                        <div className="col-md-8">
                            <div className="mb-2">
                                <div className="d-flex admin-doctor-value">
                                    {this.state.PaymentData.totalRefund}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 admin-doctor-name">{t("Admin.DoctorDetailView.Finance.Total_Paid")} : </div>
                        <div className="col-md-8">
                            <div className="mb-2">
                                <div className="d-flex admin-doctor-value">
                                    {this.state.PaymentData.totalPaid}
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
    return {}
}

function mapDispatchToProps(dispatch) {
    const adminactions = bindActionCreators(exadoAdminActions, dispatch);
    return { adminactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(Finance));
