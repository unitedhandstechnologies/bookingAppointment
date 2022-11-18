import { useTranslation } from "react-i18next";
import DoctorHeader from "./docHeader";
import DoctorFooter from "./docFooter";
import DoctorLeftPanel from "./../../commonComponent/LeftPanel/leftPanel";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { promiseWrapper } from "../../utility/common";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import exadoDocActions from "../../redux/exadoDoc/action";
import { FaEye } from "react-icons/fa";

const DocMyPatients = (props) => {
  const { t } = useTranslation();

  const [patientsList, setPatientsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPatientList();
  }, [currentPage]);

  const getPatientList = () => {
    promiseWrapper(props.docactions.getDoctorsPatient, {
      modal: {
        pageSize: 10,
        currentPage: currentPage,
        search: "",
        sortExp: "",
        sortDir: "",
        patientGuid: null,
        doctorGuid: localStorage.getItem("user-id"),
      },
    }).then((data) => {
      setPatientsList(data.data.patientList);
      setTotalPages(data.data.totalPages);
    });
  };

  const handlePageClick = (data) => setCurrentPage(data.selected + 1);

  return (
    <div>
      <DoctorHeader />
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <DoctorLeftPanel />
            <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
              <div className="my-finance-section">
                <div className="row search-bar my-3">
                  <div className="col-md-5 search-bar-text">
                    {t("Doctor.DocMyPatients.My_Patients")}
                  </div>
                  <div className="row my-4">
                    {/* <div className="search-bar-text-input col-md-7 top-search"> */}
                    <div className="col-lg-4 float-start">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t(
                          "Doctor.AppointmentCompleted.Search_Appointment_Doctor_Name"
                        )}
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                        // onKeyPress={this.handleKeyPress}
                      />
                    </div>
                    {/* </div> */}
                    <div className="search-bar-text-input col-md-2">
                      <button
                        type="button"
                        // onClick={this.GetAppointmentRequestList.bind(this)}
                        className="btn filter-btn w-100"
                      >
                        {t("Doctor.AppointmentCompleted.Search")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tableContainer table-responsive mb-5">
                  <table className="table table-bordered appointmentTable">
                    <thead>
                      <tr>
                        <th>{t("Doctor.DocMyPatients.No.")}</th>
                        <th>{t("Doctor.DocMyPatients.Patient_Name")}</th>
                        <th>{t("Doctor.DocMyPatients.Mobile_Number")}</th>
                        <th>{t("Doctor.DocMyPatients.Email_ID")}</th>
                        <th>{t("Doctor.DocMyPatients.Nationality")}</th>
                        <th>{t("Doctor.DocMyPatients.Gender")}</th>
                        <th>{t("Doctor.DocMyPatients.View_Details")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientsList.length > 0 ? (
                        patientsList.map((list, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <Link
                                className="patientName"
                                to={
                                  "/patient-detail-view/" //+ list.patientGuid
                                }
                                // onClick={e => e.preventDefault()}
                              >
                                {list.firstName} {list.lastName}
                              </Link>
                            </td>
                            <td>{list.phone}</td>
                            <td>{list.email}</td>
                            <td>{list.nationality}</td>
                            <td>{list.gender}</td>
                            <td>
                              <Link
                                to={
                                  "/patient-detail-view/" //+ list.patientGuid
                                }
                                onClick={(e) => e.preventDefault()}
                              >
                                <FaEye />
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="empty-list">
                            {t("EmptyListMessages.patient_list")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="my-4 d-flex justify-content-center">
                    {patientsList.length > 0 && (
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
                    )}
                  </div>
                </div>
              </div>
              <DoctorFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  return { docactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(DocMyPatients);
