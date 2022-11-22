import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoAdminActions from "../../../redux/exadoAdmin/action";
import { promiseWrapper } from "../../../utility/common";
import AdminHeader from "../adminHeader";
import AdminLeftPanel from "../../../commonComponent/LeftPanel/leftPanel";
import AdminFooter from "../../patient/footer";
import { toast } from "react-toastify";
import Switch from "react-switch";
import { Modal } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

class Languages extends Component {
  constructor() {
    super();
    this.state = {
      languages: [],
      editLangModal: false,
      title: "",
      idToUpdate: null,
      modalLangName: "",
      modalLangAbbreviation: "",
    };
  }

  componentDidMount() {
    this.getLanguages();
  }

  setStates = (e, bool = false) =>
    this.setState({ [e.target.name]: e.target.value });

  getLanguages = () =>
    promiseWrapper(this.props.adminactions.getAllLanguageDetail).then((data) =>{
         this.setState({ languages: data.data.result })
    }
    
   
    );

  setEditLangModal = (
    bool,
    newtitle = null,
    id = null,
    name = "",
    abbreviation = ""
  ) => {
    this.setState({
      editLangModal: bool,
      modalLangName: name,
      modalLangAbbreviation: abbreviation,
    });
    if (newtitle) this.setState({ title: newtitle });
    if (id) this.setState({ idToUpdate: id });
  };

  changeWebsiteLang = (e, id) => {
    console.log(typeof e, id, "toggle", this);

    promiseWrapper(this.props.adminactions.saveWebsiteLanguageId, {
      query: { LanguageId: id, isWebsiteLanguage: e },
    })
      .then((data) => {
        console.log(data)
        if (data.data.success) {
          toast.success(data.data.message);
          this.getLanguages();
          const newArr = this.state.languages.map((language) => {
            if (language.languageId === id) {
              return {
                ...language,
                isWebsiteLanguage: e,
              };
            } else return language;
          });
          this.setState({ languages: newArr });
        } else toast.error(data.data.errorMessage);
        this.setEditLangModal(false);
      })
      .catch((err) => console.log(err));
  };

  saveLanguageData = (e, input) => {
    e.preventDefault();
    const data = {
      languageName: input.languageName,
      languageAbbreviation: input.languageAbbreviation,
      languageId: this.state.idToUpdate,
      isWebsiteLanguage: false,
    };
    console.log("api", data);
    promiseWrapper(this.props.adminactions.saveLanguage, { data })
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          this.getLanguages();
        } else toast.error(data.data.errorMessage);
        this.setEditLangModal(false);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { t } = this.props;
    const {
      languages,
      editLangModal,
      title,
      modalLangAbbreviation,
      modalLangName,
    } = this.state;

    return (
      <div>
        <AdminHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <AdminLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                <div className="row search-bar d-flex align-items-center  bg-light">
                  <div className="py-4 search-bar-text w-75">Languages</div>
                  <button
                    className="btn doctor-report-edit-btn w-25"
                    onClick={() => {
                      this.setEditLangModal(
                        true,
                        "Add New Language",
                        languages.length + 1
                      );
                    }}
                    style={{ backgroundColor: "#0dcaf0", color: "white" }}
                  >
                    Add +
                  </button>
                </div>
                <div className="row mt-3 d-flex justify-content-center">
                  <div className="col-md-12">
                    <div className="tableContainer table-responsive">
                      <table className="table table-bordered appointmentTable">
                        <thead>
                          <tr className="new-patient-table-title">
                            <th>Language Name</th>
                            <th>Language Abbreviation</th>
                            <th>Website Language</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {languages.length ? (
                            languages.map((language, i) => (
                              <tr key={language.languageId}>
                                <td>{language.languageName}</td>
                                <td>{language.languageAbbreviation}</td>
                                <td>
                                  <Switch
                                    className=""
                                    checked={language.isWebsiteLanguage}
                                    onChange={(e) =>
                                      this.changeWebsiteLang(
                                        e,
                                        language.languageId
                                      )
                                    }
                                    offColor="#bdc1c2"
                                    onColor="#20CAD6"
                                    handleDiameter={20}
                                    width={50}
                                    height={20}
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn doctor-report-edit-btn"
                                    style={{
                                      backgroundColor: "#0dcaf0",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      this.setEditLangModal(
                                        true,
                                        "Edit Language",
                                        language.languageId,
                                        language.languageName,
                                        language.languageAbbreviation
                                      )
                                    }
                                  >
                                    <span>
                                      <i className="fas fa-pen"></i>{" "}
                                    </span>
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="empty-list">
                              {t("EmptyListMessages.languages_list")}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row mt-3 d-flex justify-content-center">
                  <AdminFooter />
                </div>
              </div>
            </div>
          </div>
        </div>
        {editLangModal && (
          <EditLanguageModal
            setEditLangModal={this.setEditLangModal}
            editLangModal={editLangModal}
            title={title}
            saveLanguageData={this.saveLanguageData}
            modalLangName={modalLangName}
            modalLangAbbreviation={modalLangAbbreviation}
          />
        )}
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

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(Languages));

class EditLanguageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageName: this.props.modalLangName,
      languageAbbreviation: this.props.modalLangAbbreviation,
    };
  }

  setStates = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate() {
    if (!this.props.editLangModal && this.state.languageName)
      this.setState({
        languageName: "",
        languageAbbreviation: "",
      });
  }

  render() {
    const { languageName, languageAbbreviation } = this.state;
    const {
      editLangModal,
      setEditLangModal,
      title,
      // modalLangName, modalLangAbbreviation
    } = this.props;

    return (
      <Modal
        show={editLangModal}
        onHide={() => setEditLangModal(false)}
        style={{ zIndex: "100" }}
        centered
      >
        <div
          className="modify-modal"
          id="withdraw-modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog mt-0 mb-0">
            <div className="modal-content">
              <div className="modal-header modify-modal-header">
                <h5
                  className="modal-title modify-modal-title"
                  id="exampleModalLabel"
                >
                  {title}
                </h5>
                <button
                  type="button"
                  className="close modify-modal-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditLangModal(false)}
                >
                  <img
                    src="assets/images/close-line.png"
                    alt="close-line.png"
                    className="img-fluid"
                  />
                </button>
              </div>
              <div className="modal-body modify-modal-body">
                <form
                  className="appointment-details"
                  onSubmit={(e) => this.props.saveLanguageData(e, this.state)}
                >
                  <div className="form-group my-2">
                    <label className="mb-2">Language Name</label>
                    <input
                      type="text"
                      className="form-control appointment-details-form-inputs"
                      value={languageName}
                      name="languageName"
                      onChange={(e) => this.setStates(e)}
                      required
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className="mb-2">Language Abbreviation</label>
                    <input
                      type="text"
                      className="form-control appointment-details-form-inputs"
                      value={languageAbbreviation}
                      name="languageAbbreviation"
                      onChange={(e) => this.setStates(e)}
                      required
                    />
                  </div>
                  <div className="my-2 d-flex justify-content-around">
                    <button
                      type="submit"
                      data-toggle="modal"
                      data-dismiss="modal"
                      data-target="#withdraw-submit"
                      className="btn appointment-accept-btn"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
