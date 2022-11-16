import React, { useEffect, useState } from 'react';
import AdminHeader from './adminHeader';
import AdminLeftPanel from '../../commonComponent/LeftPanel/leftPanel';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import AdminFooter from '../patient/footer';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ConfirmPopup from '../../commonComponent/Elements/confirmPopup';
import { connect } from 'react-redux';
import exadoAdminActions from '../../redux/exadoAdmin/action';
import { promiseWrapper } from '../../utility/common';
import moment from 'moment';
import { toast } from 'react-toastify'

const AdminFeedback = (props) => {

    const { t } = useTranslation();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewList, setReviewList] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    useEffect(() => {
        getPageData();
    }, [currentPage]);

    const getPageData = () => {
        promiseWrapper(
            props.adminactions.getAllReviews, {
            paging: {
                "pageSize": 10,
                "currentPage": currentPage
            }
        }).then((data) => {
            if (data?.data) {
                setReviewList(data.data.reviews)
                setTotalPages(data.data.totalPages)
            }
        }).catch(err => console.log(err));
    }

    const handlePageClick = data => setCurrentPage(data.selected + 1);

    const deleteReview = () => {
        setDeleteModal(false)
        promiseWrapper(
            props.adminactions.deleteReviewById, { reviewGuid: { "reviewGuid": deleteId } }).then((data) => {
                if (data?.data) {
                    if (data.data.isSuccess) {
                        toast.success(data.data.message);
                        getPageData();
                    }
                    else toast.error(data.data.errorMessage)
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
                                                <div>{t("Admin.AdminFeedback.Feedback")}</div>
                                            </div>
                                            <div className="headingRight">
                                            </div>
                                        </div>
                                        <div className="tableContainer table-responsive">
                                            <table className="table table-bordered appointmentTable">
                                                <thead>
                                                    <tr className="new-patient-table-title">
                                                        <th>{t("Admin.AdminFeedback.Patient_Name")}</th>
                                                        <th>{t("Admin.AdminFeedback.Doctor_Name")}</th>
                                                        <th>{t("Admin.AdminFeedback.Rating")}</th>
                                                        <th>{t("Admin.AdminFeedback.Review")}</th>
                                                        <th>{t("Admin.AdminFeedback.Date")}</th>
                                                        <th>{t("Admin.AdminFeedback.Action")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reviewList.length > 0 ? reviewList.map((data, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <Link to={`/patient-detail-view/${data.patientGuid}`}
                                                                >
                                                                    {data.patientFirstName} {data.patientLastName}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/doctor-detail-view/${data.doctorGuid}`}
                                                                >
                                                                    {data.doctorFirstname} {data.doctorLastName}
                                                                </Link>
                                                            </td>
                                                            <td>{data.rating} / 5</td>
                                                            <td>{data.description}</td>
                                                            <td>{data.createdDate ? moment(data.createdDate).format("MM/DD/YYYY") : <>{t("Admin.AdminFeedback.Not_Available")}</>}</td>
                                                            <td>
                                                                <div className="d-flex justify-content-center booking-btn">
                                                                    <button className="btn joinCall mr-2"
                                                                        onClick={() => {
                                                                            setDeleteModal(!deleteModal);
                                                                            setDeleteId(data.doctorReviewGuid);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )) : <tr><td colSpan={7} className="empty-list">{t("EmptyListMessages.feedback_list")}</td></tr>}
                                                </tbody>
                                            </table>
                                            {reviewList.length > 0 &&
                                                <div className="my-4 d-flex justify-content-center">
                                                    <ReactPaginate
                                                        previousClassName={'arrow'}
                                                        nextClassName={'arrow'}
                                                        previousLabel={'<<'}
                                                        nextLabel={'>>'}
                                                        breakLabel={'...'}
                                                        pageLinkClassName={'pages'}
                                                        pageCount={totalPages}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={5}
                                                        onPageChange={handlePageClick}
                                                        containerClassName={'pagination'}
                                                        activeLinkClassName={'active'}
                                                    />
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                                <AdminFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmPopup
                show={deleteModal}
                setShow={setDeleteModal}
                title={t("Admin.AdminFeedback.Delete_Review")}
                warning={t("Admin.AdminFeedback.Warning")}
                okBtnText={t("Admin.AdminFeedback.Delete")}
                cancleBtnText={t("Admin.AdminFeedback.Cancel")}
                // Image={Group8169}
                ImagePath="assets/images/Group8169.png"
                setClick={deleteReview}
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

export default connect(mapStoreToprops, mapDispatchToProps)(AdminFeedback);
