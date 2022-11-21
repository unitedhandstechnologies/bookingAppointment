import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoAdminActions from "../../../redux/exadoAdmin/action";
import { promiseWrapper } from "../../../utility/common";
import AdminHeader from "../adminHeader";
import AdminLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import AdminFooter from "../../patient/footer";
import { toast } from "react-toastify";
import EdiText from "react-editext";
import { withTranslation } from "react-i18next";

class PhysicianServices extends Component {
  constructor() {
    super();
    this.state = {
      physicianServices: [],
      newService: "",
    };
  }

  componentDidMount() {
    this.getPhysicianServices();
  }

  getPhysicianServices = () =>
    promiseWrapper(this.props.adminactions.getAllPhysicianServiceDetail).then(
      (data) => this.setState({ physicianServices: data.data.result })
    );

  savePhysicianService = (service = null, id = null) => {
    if (this.state.newService || id) {
      const data = {
        physicianServiceId: id ? id : this.state.physicianServices.length + 1,
        physicianServiceName: service ? service : this.state.newService,
      };
      promiseWrapper(this.props.adminactions.savePhysicianService, {
        data: data,
      }).then((data) => {
        if (data.data.result.success) {
          this.getPhysicianServices();
          toast.success(data.data.result.message);
          this.setState({ newService: "" });
        } else toast.error(data.data.errorMessage);
      });
    } else toast.warning("Please fill up input.");
  };

  render() {
    const { t } = this.props;
    const { physicianServices, newService } = this.state;

    return (
      <div>
        <AdminHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <AdminLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div className="row search-bar">
                  <div className="py-4 search-bar-text w-100 bg-light">
                    Add Physician Services
                  </div>
                </div>
                <div className="appointment-details-container">
                  <form
                    className="appointment-details-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      this.savePhysicianService();
                    }}
                  >
                    <div className="row">
                      <div className="form-group col-lg-9">
                        <input
                          type="text"
                          className="form-control appointment-details-form-inputs "
                          placeholder="Add new Service"
                          value={newService}
                          name="Add new Service"
                          onChange={(e) =>
                            this.setState({ newService: e.target.value })
                          }
                        />
                      </div>
                      <div className="d-flex justify-content-end col-lg-3">
                        <button
                          type="submit"
                          className="btn doctor-report-edit-btn"
                          style={{ backgroundColor: "#0dcaf0", color: "white" }}
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="row search-bar">
                  <div className="py-4 search-bar-text w-100 bg-light">
                    All Listed Physician Services
                  </div>
                </div>
                <div className="row">
                  {physicianServices.length > 0 ? (
                    physicianServices.map((service, i) => (
                      <div
                        className="form-group col-lg-3 my-2 px-2"
                        key={service.physicianServiceId}
                      >
                        <div
                          className="d-flex justify-content-between btn doctor-report-edit-btn"
                          style={{ backgroundColor: "#0dcaf0", color: "white" }}
                        >
                          <EdiText
                            value={service.physicianServiceName}
                            mainContainerClassName="w-100"
                            // viewContainerClassName="d-flex justify-content-between align-content-center"
                            editButtonClassName="btn doctor-report-edit-btn"
                            editButtonContent={
                              <i
                                className="fas fa-pen"
                                style={{ color: "white" }}
                              ></i>
                            }
                            showButtonsOnHover={true}
                            cancelOnUnfocus={true}
                            submitOnEnter={true}
                            onSave={(name) =>
                              this.savePhysicianService(
                                name,
                                service.physicianServiceId
                              )
                            }
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-lg-3 my-2 px-2 empty-list">
                      {t("EmptyListMessages.physician_list")}
                    </div>
                  )}
                </div>
                <div className="row mt-3 d-flex justify-content-center">
                  <AdminFooter />
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
  return {};
}

function mapDispatchToProps(dispatch) {
  const adminactions = bindActionCreators(exadoAdminActions, dispatch);
  return { adminactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(PhysicianServices));
