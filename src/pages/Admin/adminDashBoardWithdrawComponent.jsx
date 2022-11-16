import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ConfirmPopup from '../../commonComponent/Elements/confirmPopup';
import exadoAdminActions from '../../redux/exadoAdmin/action';
import { promiseWrapper } from '../../utility/common';
// import Group8169 from '../../assets/images/Group8169.png';
import { toast } from 'react-toastify';

const paging = {
    "pageSize": 3,
    "currentPage": 1,
    "search": "",
    "sortExp": "",
    "sortDir": ""
}

const AdminDashBoardWithdrawComponent = (props) => {

    const { t } = useTranslation();
    const [withdrawList, setWithdrawList] = useState([]);
    const [approveModal, setApproveModal] = useState(false);
    const [approveId, setApproveId] = useState("");

    useEffect(() => {
        getPageData();
    }, []);

    const getPageData = () => {
        promiseWrapper(props.adminactions.getAllUnprocessedWithdraw, { paging: paging }).then((data) => {
            if (data.data.withdrawList) setWithdrawList(data.data.withdrawList)
        }).catch(err => console.log(err));
    }

    const setClick = () => {
        promiseWrapper(props.adminactions.approveWithdraw, { withdrawGuid: { "withdrawGuid": approveId } }).then((data) => {
            if (data) {
                if (data.data.isSuccess) toast.success(t("Admin.AdminDashBoardWithdrawComponent.Request_Approved"))
                else toast.error(data.data.message)
            }
            getPageData();
        }).catch(err => {
            console.log(err);
        });
        setApproveModal(false);
        setApproveId("")
    }

    return (
        <>
            <div className="col-lg-6 col-md-12">
                <div className="tableHeading d-flex justify-content-between my-3">
                    <div className="admin-headingLeft">
                        <div>{t("Admin.AdminDashBoardWithdrawComponent.Withdrawal_Requests")}</div>
                    </div>
                    <div className="headingRight">
                        <Link to={"/withdraw-list"}>{t("Admin.AdminDashBoardWithdrawComponent.View_All")}</Link>
                    </div>
                </div>
                <div className="tableContainer table-responsive">
                    <table className="table table-bordered appointmentTable">
                        <thead>
                            <tr className="new-patient-table-title">
                                <th>{t("Admin.AdminDashBoardWithdrawComponent.No.")}</th>
                                <th>{t("Admin.AdminDashBoardWithdrawComponent.Patient_Name")}</th>
                                <th>{t("Admin.AdminDashBoardWithdrawComponent.Withdrawal_Amount")}</th>
                                <th>{t("Admin.AdminDashBoardWithdrawComponent.Action")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawList.length > 0 ? withdrawList.map((list, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <Link className="doctorName" to={`/patient-detail-view/${list.patientGuid}`}
                                        >
                                            {list.patientFirstName} {list.patientLastName}
                                        </Link>
                                    </td>
                                    <td className="medicalSpecialty">€ {list.withdrawAmount}</td>
                                    <td>
                                        <div className="d-flex justify-content-center booking-btn">
                                            <button
                                                type="button"
                                                className="btn joinCall mr-2"
                                                onClick={() => {
                                                    setApproveModal(!approveModal)
                                                    setApproveId(list.withdrawGuid)
                                                }}
                                            >
                                                {t("Admin.AdminDashBoardWithdrawComponent.Approve")}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : <tr><td colSpan={4} className="empty-list">{t("EmptyListMessages.withdrawal_request")}</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmPopup
                show={approveModal}
                setShow={setApproveModal}
                title={t("Admin.AdminDashBoardWithdrawComponent.Approve_Withdraw_Request")}
                warning={t("Admin.AdminDashBoardWithdrawComponent.Are_You_Sure_To_Approve_Withdraw_Request")}
                okBtnText={t("Admin.AdminDashBoardWithdrawComponent.Approve")}
                cancleBtnText={t("Admin.AdminDashBoardWithdrawComponent.Cancel")}
                // Image={Group8169}
                ImagePath="assets/images/Group8169.png"
                setClick={setClick}
            />
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

export default connect(mapStoreToprops, mapDispatchToProps)(AdminDashBoardWithdrawComponent);