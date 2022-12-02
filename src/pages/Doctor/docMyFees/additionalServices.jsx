import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import ConfirmPopup from "../../../commonComponent/Elements/confirmPopup";
import exadoDocActions from "../../../redux/exadoDoc/action";
import { promiseWrapper } from "../../../utility/common";
// import Group8169 from '../../../assets/images/Group8169.png';
import AdditionalServiceModal from "./additionalServiceModal";
import { withTranslation } from "react-i18next";

class AdditionalServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalServices: [],
      additionalServiceModal: false,
      serviceGuid: null,
      modalServiceName: "",
      modalDescription: "",
      modalAmount: null,
      approveModal: false,
    };
  }

  componentDidMount() {
    this.getDoctorAdditionalService();
  }

  getDoctorAdditionalService = () => {
    promiseWrapper(this.props.docactions.getAllDoctorAdditionalService, {
      params: { doctorGuid: localStorage.getItem("user-id") },
    })
      .then((data) => this.setState({ additionalServices: data.data.result }))
      .catch((err) => console.log(err));
  };

  saveAdditionalService = (e, data) => {
    e.preventDefault();
    this.setAdditionalServiceModal();
    promiseWrapper(this.props.docactions.saveDoctorAdditionalService, {
      modal: {
        serviceGuid: this.state.serviceGuid,
        doctorGuid: localStorage.getItem("user-id"),
        serviceName: data.serviceName,
        amount: Number(data.amount),
        description: data.description,
      },
    })
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          this.getDoctorAdditionalService();
        } else toast.error(data.data.errorMessage);
      })
      .catch((err) => console.log(err));
  };

  setAdditionalServiceModal = (
    show,
    newtitle = null,
    id = null,
    modalServiceName = "",
    modalDescription = "",
    modalAmount = null
  ) => {
    this.setState({
      additionalServiceModal: show,
    });
    if (show)
      this.setState({
        title: newtitle,
        serviceGuid: id,
        modalServiceName: modalServiceName,
        modalDescription: modalDescription,
        modalAmount: modalAmount,
      });
  };

  deleteAdditionalService = () => {
    this.setApproveModal(false);
    promiseWrapper(this.props.docactions.deleteDoctorServiceById, {
      params: { ServiceGuid: this.state.serviceGuid },
    })
      .then((data) => {
        if (data.data.isSuccess) {
          toast.success(data.data.message);
          this.getDoctorAdditionalService();
        } else toast.error(data.data.errorMessage);
        /**
         * @todo have to delete below if condition after api messages added in api
         */
        if (data.status === 200) {
          toast.success("Service Deleted");
          this.getDoctorAdditionalService();
        }
      })
      .catch((err) => console.log(err));
  };

  setApproveModal = (show) => this.setState({ approveModal: show });

  render() {
    const {
      additionalServices,
      additionalServiceModal,
      title,
      serviceGuid,
      modalServiceName,
      modalDescription,
      modalAmount,
      approveModal,
    } = this.state;
    const { t } = this.props;
    return (
      <>
        <div className="row search-bar d-flex align-items-center  bg-light">
          <div className="pt-4 search-bar-text w-75">
            {t("Doctor.MyFees.AdditionalServices.Additional_Services")}
          </div>
          <button
            className="btn doctor-report-edit-btn w-25"
            onClick={() => {
              this.setState({ serviceGuid: null });
              this.setAdditionalServiceModal(
                true,
                "Doctor.MyFees.AdditionalServices.Add_New_Services"
              );
            }}
            style={{ backgroundColor: "#0dcaf0", color: "white" }}
          >
            {t("Doctor.MyFees.AdditionalServices.Add+")}
          </button>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 table-min-height">
            <div className="tableContainer table-responsive">
              <table className="table table-bordered appointmentTable">
                <thead>
                  <tr className="new-patient-table-title">
                    <th>
                      {t(
                        "Doctor.MyFees.AdditionalServices.Additional_Services"
                      )}
                    </th>
                    <th>{t("Doctor.MyFees.AdditionalServices.Description")}</th>
                    <th>{t("Doctor.MyFees.AdditionalServices.Amount")}</th>
                    <th>{t("Doctor.MyFees.AdditionalServices.Action")}</th>
                  </tr>
                </thead>
                {additionalServices.length > 0 && (
                  <tbody>
                    {additionalServices.map((addService) => (
                      <tr key={addService.serviceGuid}>
                        <td>{addService.serviceName}</td>
                        <td>{addService.description}</td>
                        <td>{addService.amount}</td>
                        <td>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn doctor-report-edit-btn"
                              style={{
                                backgroundColor: "#0dcaf0",
                                color: "white",
                              }}
                              onClick={() =>
                                this.setAdditionalServiceModal(
                                  true,
                                  "Edit Additional Service",
                                  addService.serviceGuid,
                                  addService.serviceName,
                                  addService.description,
                                  addService.amount
                                )
                              }
                            >
                              <span>
                                <i className="fas fa-pen"></i>{" "}
                              </span>
                              {t("Doctor.MyFees.AdditionalServices.Edit")}
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                this.setApproveModal(true);
                                this.setState({
                                  serviceGuid: addService.serviceGuid,
                                });
                              }}
                            >
                              <span>
                                <i className="fas fa-trash"></i>{" "}
                              </span>
                              {t("Doctor.MyFees.AdditionalServices.Delete")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        {additionalServiceModal && (
          <AdditionalServiceModal
            additionalServiceModal={additionalServiceModal}
            setAdditionalServiceModal={this.setAdditionalServiceModal}
            saveAdditionalService={this.saveAdditionalService}
            title={title}
            serviceGuid={serviceGuid}
            modalServiceName={modalServiceName}
            modalDescription={modalDescription}
            modalAmount={modalAmount}
          />
        )}
        <ConfirmPopup
          show={approveModal}
          setShow={this.setApproveModal}
          title={"Delete Additional Service"}
          warning={"Are you sure you want to delete additional service"}
          okBtnText={"Delete"}
          cancleBtnText={"Cancel"}
          // Image={Group8169}
          ImagePath="assets/images/Group8169.png"
          setClick={() => this.deleteAdditionalService()}
        />
      </>
    );
  }
}

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  return { docactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(AdditionalServices));
