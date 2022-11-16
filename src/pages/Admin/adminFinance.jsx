import React, { useEffect, useState } from 'react';
import AdminHeader from './adminHeader';
import AdminLeftPanel from '../../commonComponent/LeftPanel/leftPanel';
import { useTranslation } from 'react-i18next';
import AdminFooter from '../patient/footer';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import exadoAdminActions from '../../redux/exadoAdmin/action';
import { promiseWrapper } from '../../utility/common';
import { toast } from 'react-toastify'

const AdminFinance = (props) => {

    const { t } = useTranslation();

    const [financeList, setFinanceList] = useState([]);

    useEffect(() => {
        getPageData();
    }, []);

    const getPageData = () => {
        promiseWrapper(props.adminactions.getFinanceData).then((data) => {
            if (data?.data) {
                setFinanceList(data.data)
            }
        }).catch(err => console.log(err));
    }

    const markasPaid = () => {
        promiseWrapper(props.adminactions.markAsPaid, { data: { adminFinanceData: financeList } }).then((data) => {
            if (data.data.isSuccess) {
                toast.success(data.data.message)
            } else toast.error(data.data.errorMessage)
        }).catch(err => console.log(err));
    }

    return (
        <>
            <div>
                <AdminHeader />
                <div className="main">
                    <div className="container-fluid">
                        <div className="row">
                            <AdminLeftPanel />
                            <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                                <div className="row d-flex justify-content-center bg-white" style={{ minHeight: "74.5vh" }}>
                                    <div className="col-md-12">
                                        <div className="tableHeading d-flex justify-content-between my-3">
                                            <div className="admin-headingLeft">
                                                <div>{t("Finance")}</div>
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn btn-success dropdown-toggle cancel" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {t("Actions")}
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                    <button className="dropdown-item" onClick={() => "abc"}>{t("Export_Master_File")}</button>
                                                    <button className="dropdown-item" onClick={() => markasPaid()}>{t("Mark_as_Paid")}</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tableContainer table-responsive">
                                            <table className="table table-bordered appointmentTable">
                                                <thead>
                                                    <tr className="new-patient-table-title">
                                                        <th>{t("Doctor_Name")}</th>
                                                        <th>{t("Locality")}</th>
                                                        <th>{t("Currency")}</th>
                                                        <th>{t("Total_Amount")}</th>
                                                        <th>{t("Admin_Commission")}</th>
                                                        <th>{t("Due_Amount")}</th>
                                                        <th>{t("Total_Refund")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {financeList.length > 0 ? financeList.map((data, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <Link to={`/doctor-detail-view/${data.doctorGuid}`}
                                                                >
                                                                    {data.doctorFirstName} {data.doctorLastName}
                                                                </Link>
                                                            </td>
                                                            <td>{data.locality}</td>
                                                            <td>{data.currency}</td>
                                                            <td>{data.totalAmount}</td>
                                                            <td>{data.adminCommission}</td>
                                                            <td>{data.dueAmount}</td>
                                                            <td>{data.totalRefund}</td>
                                                        </tr>
                                                    )) : <tr><td colSpan={7} className="empty-list">{t("EmptyListMessages.finance_list")}</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <AdminFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStoreToprops(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const adminactions = bindActionCreators(exadoAdminActions, dispatch);
    return { adminactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(AdminFinance);
