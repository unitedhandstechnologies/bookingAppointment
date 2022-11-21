import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdminHeader from "./adminHeader";
import AdminLeftPanel from "../../commonComponent/LeftPanel/leftPanel";
import AdminFooter from "../patient/footer";
import { bindActionCreators } from "redux";
import exadoAdminActions from "../../redux/exadoAdmin/action";
import { promiseWrapper } from "../../utility/common";
import ReactPaginate from "react-paginate";
import ConfirmPopup from "../../commonComponent/Elements/confirmPopup";
import { toast } from "react-toastify";

const AdminUnprocessedWithdrawList = (props) => {
  const { t } = useTranslation();

  const [withdrawList, setWithdrawList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [approveModal, setApproveModal] = useState(false);
  const [approveId, setApproveId] = useState("");

  useEffect(() => {
    getPageData();
  }, [currentPage]);

  const getPageData = () => {
    promiseWrapper(props.adminactions.getAllUnprocessedWithdraw, {
      paging: {
        pageSize: 10,
        currentPage: currentPage,
      },
    })
      .then((data) => {
        if (data?.data.result) {
          setWithdrawList(data.data.result.withdrawList);
          setTotalPages(data.data.result.totalPages);
        }
      })
      .catch((err) => console.log(err));
  };

  const setClick = () => {
    promiseWrapper(props.adminactions.approveWithdraw, {
      withdrawGuid: { withdrawGuid: approveId },
    })
      .then((data) => {
        if (data) {
          if (data.data.isSuccess)
            toast.success(
              t("Admin.AdminDashBoardWithdrawComponent.Request_Approved")
            );
          else toast.error(data.data.message);
        }
        getPageData();
      })
      .catch((err) => {
        console.log(err);
      });
    setApproveModal(false);
    setApproveId("");
  };

  const handlePageClick = (data) => setCurrentPage(data.selected + 1);

  return (
    <>
      <div>
        <AdminHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <AdminLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div
                  className="row d-flex justify-content-center bg-white"
                  style={{ minHeight: "74.5vh" }}
                >
                  <div className="col-md-12">
                    <div className="tableHeading d-flex justify-content-between my-3">
                      <div className="admin-headingLeft">
                        <div>
                          {t(
                            "Admin.AdminDashBoardWithdrawComponent.Withdrawal_Requests"
                          )}
                        </div>
                      </div>
                      <div className="headingRight"></div>
                    </div>
                    <div className="tableContainer table-responsive">
                      <table className="table table-bordered appointmentTable">
                        <thead>
                          <tr className="new-patient-table-title">
                            <th>
                              {t("Admin.AdminDashBoardWithdrawComponent.No.")}
                            </th>
                            <th>
                              {t(
                                "Admin.AdminDashBoardWithdrawComponent.Patient_Name"
                              )}
                            </th>
                            <th>
                              {t(
                                "Admin.AdminDashBoardWithdrawComponent.Withdrawal_Amount"
                              )}
                            </th>
                            <th>
                              {t(
                                "Admin.AdminDashBoardWithdrawComponent.Action"
                              )}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {withdrawList.length > 0 ? (
                            withdrawList.map((data, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                  <Link
                                    className="patientName"
                                    to={`/patient-detail-view/${data.patientGuid}`}
                                  >
                                    {data.patientFirstName}{" "}
                                    {data.patientLastName}
                                  </Link>
                                </td>
                                <td className="profileVerificationStatus">
                                  € {data.withdrawAmount}
                                </td>
                                <td style={{ maxWidth: "70px" }}>
                                  <div className="d-flex justify-content-center booking-btn">
                                    <button
                                      className="btn joinCall mr-2"
                                      onClick={() => {
                                        setApproveModal(!approveModal);
                                        setApproveId(data.withdrawGuid);
                                      }}
                                    >
                                      {t(
                                        "Admin.AdminDashBoardWithdrawComponent.Approve"
                                      )}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="empty-list">
                                {" "}
                                Withdrawal requests are not available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {withdrawList.length > 0 && (
                        <div className="my-4 d-flex justify-content-center">
                          <ReactPaginate
                            previousClassName={"arrow"}
                            nextClassName={"arrow"}
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            breakLabel={"..."}
                            pageLinkClassName={"pages"}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            activeLinkClassName={"active"}
                          />
                        </div>
                      )}
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
        show={approveModal}
        setShow={setApproveModal}
        title={t(
          "Admin.AdminDashBoardWithdrawComponent.Approve_Withdraw_Request"
        )}
        warning={t(
          "Admin.AdminDashBoardWithdrawComponent.Are_You_Sure_To_Approve_Withdraw_Request"
        )}
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
  return {};
}

function mapDispatchToProps(dispatch) {
  const adminactions = bindActionCreators(exadoAdminActions, dispatch);
  return { adminactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(AdminUnprocessedWithdrawList);
