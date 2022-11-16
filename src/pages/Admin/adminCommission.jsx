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
import { FormControl, InputGroup } from 'react-bootstrap';

const AdminCommission = (props) => {

    const { t } = useTranslation();

    const [commissionList, setCommissionList] = useState([]);

    useEffect(() => {
        getPageData();
    }, []);

    const getPageData = () => {
        promiseWrapper(
            props.adminactions.getAllCommission).then((data) => {
                if (data.data) {
                    setCommissionList(data.data.map(list => {
                        return {
                            "doctorCommissionGuid": list.doctorCommissionGuid,
                            "doctorGuid": list.doctorGuid,
                            "commissionPercentage": (list.commissionPercentage) ? (list.commissionPercentage).toFixed(2) : (0).toFixed(2),
                            "firstName": list.firstName,
                            "lastName": list.lastName
                        }
                    }));
                }
            }).catch(err => console.log(err));
    }

    const updateData = (e, docGuid) => {
        let value = e.target.value
        setCommissionList(prev => prev.map(data => {
            if (data.doctorGuid === docGuid)
                return {
                    "doctorCommissionGuid": data.doctorCommissionGuid,
                    "doctorGuid": data.doctorGuid,
                    "commissionPercentage": value,
                    "firstName": data.firstName,
                    "lastName": data.lastName
                }
            else return data
        }))
    }

    const handleSubmit = () => {
        const data = commissionList.map(list => {
            return {
                "doctorCommissionGuid": list.doctorCommissionGuid,
                "doctorGuid": list.doctorGuid,
                "commissionPercentage": (list.commissionPercentage) ? parseFloat(list.commissionPercentage) : 0,
                "firstName": list.firstName,
                "lastName": list.lastName
            }
        })
        promiseWrapper(
            props.adminactions.saveDoctorCommission, { list: { CommissionData: data } }).then((data) => {
                if (data.data.isSuccess) {
                    toast.success(data.data.message)
                    getPageData();
                }
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
                                                <div>{t("Admin.AdminCommission.Commission")}</div>
                                            </div>
                                            <div className="headingRight">
                                            </div>
                                        </div>
                                        <div className="tableContainer table-responsive">
                                            <table className="table table-bordered appointmentTable">
                                                <thead>
                                                    <tr className="new-patient-table-title">
                                                        <th>{t("Admin.AdminCommission.Doctor_Name")}</th>
                                                        <th>{t("Admin.AdminCommission.Commission")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(commissionList.length) ? commissionList.map((data, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <Link className="doctor-name" to={`/doctor-detail-view/${data.doctorGuid}`}
                                                                >
                                                                    {data.firstName} {data.lastName}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <InputGroup>
                                                                    <FormControl
                                                                        type='number'
                                                                        placeholder="Commission Percentage"
                                                                        aria-label="Commission Percentage"
                                                                        value={data.commissionPercentage}
                                                                        onChange={(e) => updateData(e, data.doctorGuid)}
                                                                    />
                                                                    <InputGroup.Text id="basic-addon2"> % </InputGroup.Text>
                                                                </InputGroup>
                                                            </td>
                                                        </tr>
                                                    )) : <tr><td colSpan={2} className="empty-list">{t("EmptyListMessages.commissions_list")}</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button type='button' className='btn btn-success float-end mt-5 me-5'
                                            onClick={handleSubmit}
                                        >
                                            {t("Admin.AdminCommission.Save_All_Data")}
                                        </button>
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

export default connect(mapStoreToprops, mapDispatchToProps)(AdminCommission);
