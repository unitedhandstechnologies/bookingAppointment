import React from 'react';
import $ from 'jquery';
import { Redirect, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import exadoDocActions from '../../../redux/exadoDoc/action';
import exadoPatientActions from '../../../redux/exadoPatient/action';
import { promiseWrapper } from '../../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DoctorHeader from "../docHeader";
import DoctorFooter from "../docFooter";
import DoctorLeftPanel from '../../../commonComponent/LeftPanel/leftPanel';
import { withTranslation } from 'react-i18next';
import AddAdditionalServices from './addAdditionalServices';

class SaveDiagnostic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      LoadedData: false,
      DiagnosticDetails: {},
      addedAdditionalServices: [],
      additionalFees: 0
    };
  }

  componentDidMount() {
    promiseWrapper(this.props.docactions.getDiagnosticById, { appointmentGuid: this.props.match.params.appointmentGuid }).then((data) => {
      this.setState({ DiagnosticDetails: data }, () => {
        if (data.additionalDocuments != null && data.additionalDocuments.length === 0) {
          this.onAddAdditionalDocuments();
        }
        this.setState(prevState => ({
          DiagnosticDetails: {
            ...prevState.DiagnosticDetails,
            ["appointmentGuid"]: this.props.match.params.appointmentGuid
          }
        }));
        this.setState({ LoadedData: true });
      });
    });
  }

  UpdateSymptomsText = (e) => {
    this.setState(prevState => ({
      DiagnosticDetails: {
        ...prevState.DiagnosticDetails,
        ["describeProblem"]: e.target.value
      }
    }));
  }

  UpdateConclusionText = (e) => {
    this.setState(prevState => ({
      DiagnosticDetails: {
        ...prevState.DiagnosticDetails,
        ["diagnosticConclusion"]: e.target.value
      }
    }));
  }

  UpdateMedicationText = (e) => {
    this.setState(prevState => ({
      DiagnosticDetails: {
        ...prevState.DiagnosticDetails,
        ["prescribeMedicine"]: e.target.value
      }
    }));
  }

  onUploadPrescribeMedicineDocs = (e) => {
    promiseWrapper(this.props.patientactions.uploadDocument, { documentType: 5, referenceGuid: this.props.match.params.appointmentGuid, file: e.target.files[0] }).then((data) => {
      if (data.data.isSuccess == true) {
        let curState = this.state.DiagnosticDetails.prescribeMedicineDocs;
        let newFile = {
          "fileGuid": null,
          "docName": data.data.data.docName,
          "docURL": data.data.data.docURL,
          "isDeleted": false
        };
        curState.push(newFile);

        this.setState(prevState => ({
          DiagnosticDetails: {
            ...prevState.DiagnosticDetails,
            ["prescribeMedicineDocs"]: curState
          }
        }));
      }
      else {
        toast.error("there is some issue with file upload");
      }
    });
  }

  onAddAdditionalDocuments = (e) => {
    let curState = this.state.DiagnosticDetails.additionalDocuments;
    let addNew = {
      "diagnosticAdditionalDocumentGuid": null,
      "diagnosticReportGuid": null,
      "additionalDocument": "",
      "additionalFile": {
        "fileGuid": null,
        "docName": "",
        "docURL": "",
        "isDeleted": false
      }
    };
    curState.push(addNew);

    this.setState(prevState => ({
      DiagnosticDetails: {
        ...prevState.DiagnosticDetails,
        ["additionalDocuments"]: curState
      }
    }));
  }

  UpdateAdditionalDocumentText = (idx, e) => {
    let curState = this.state.DiagnosticDetails.additionalDocuments;
    var newState = curState.map(function (d, id) {
      if (id === idx) {
        d.additionalDocument = e.target.value;
      }
      return d;
    });

    this.setState(prevState => ({
      DiagnosticDetails: {
        ...prevState.DiagnosticDetails,
        ["additionalDocuments"]: newState
      }
    }));
  }

  onDeleteAdditionalDocumentText = (idx, e) => {
    let curState = this.state.DiagnosticDetails.additionalDocuments;
    curState.splice(idx, 1);
    if (curState.length === 0) {
      let addNew = {
        "diagnosticAdditionalDocumentGuid": null,
        "diagnosticReportGuid": null,
        "additionalDocument": "",
        "additionalFile": {
          "fileGuid": null,
          "docName": "",
          "docURL": "",
          "isDeleted": false
        }
      };
      curState.push(addNew);
      $('#0addDoc').prop('disabled', false);
    }
    this.setState(prevState => ({
      DiagnosticDetails: {
        ...prevState.DiagnosticDetails,
        ["additionalDocuments"]: curState
      }
    }));
    $('#' + this.state.DiagnosticDetails.additionalDocuments.length - 1 + 'addDoc').prop('disabled', false);
  }

  onUploadAdditionalDocument = (idx, e) => {
    promiseWrapper(this.props.patientactions.uploadDocument, { documentType: 6, referenceGuid: this.props.match.params.appointmentGuid, file: e.target.files[0] }).then((data) => {
      if (data.data.isSuccess == true) {
        let curState = this.state.DiagnosticDetails.additionalDocuments;
        var newState = curState.map(function (d, id) {
          if (id === idx) {
            let newFile = {
              "fileGuid": null,
              "docName": data.data.data.docName,
              "docURL": data.data.data.docURL,
              "isDeleted": false
            };
            d.additionalFile = newFile;
          }
          return d;
        });

        this.setState(prevState => ({
          DiagnosticDetails: {
            ...prevState.DiagnosticDetails,
            ["additionalDocuments"]: newState
          }
        }));

        $('#' + idx + 'addDoc').prop('disabled', true);
      }
      else {
        toast.error("there is some issue with file upload");
      }
    });
  }

  onSubmit = (e) => {
    let errorMessage = '';
    if (this.state.DiagnosticDetails.describeProblem === "" || this.state.DiagnosticDetails.describeProblem === null) {
      errorMessage += `Please Describe problem or symptoms. \n`;
    }

    if (this.state.DiagnosticDetails.diagnosticConclusion === "" || this.state.DiagnosticDetails.diagnosticConclusion === null) {
      errorMessage += `Please Enter Diagnostic Conclusion. \n`;
    }

    if (this.state.DiagnosticDetails.prescribeMedicine === "" || this.state.DiagnosticDetails.prescribeMedicine === null) {
      errorMessage += `Please Enter Prescribe Medication. \n`;
    }

    if (errorMessage != '') {
      toast.error(errorMessage);
      return;
    }

    const additionalServiceData = this.state.addedAdditionalServices.length ?
      this.state.addedAdditionalServices
        .map(service => { return { serviceGuid: service.serviceGuid, appointmentGuid: this.props.match.params.appointmentGuid } }) : null

    /**
     * @todo have to add additional services in model
     */
    promiseWrapper(this.props.docactions.saveDiagnosticReport, {
      model: {
        ...this.state.DiagnosticDetails,
        totalConsultAmount: this.state.DiagnosticDetails.appDetail.consultFees + this.state.additionalFees
      }
    })
      .then((data) => {
        if (data.isSuccess === true) {
          if (additionalServiceData) {
            promiseWrapper(this.props.docactions.saveAdditionalServices, { modal: { additionalServiceData } })
              .then((data2) => {
                if (data2.data.isSuccess === true) {
                  toast.success(data2.data.message);
                  this.setState({ redirect: "/doctor-appointment-upcoming" });
                }
                else toast.error(data2.data.errorMessage);
              }).catch(err => console.log(err))
          }
          if (data.isSuccess === true) {
            toast.success(data.message);
            this.setState({ redirect: "/doctor-appointment-upcoming" });
          }
          else toast.error(data.errorMessage);
        }
        else toast.error(data.errorMessage)
      }).catch(err => console.log(err));
  }

  onDeleteprescribeMedicineDocs = (dUrl, dName, idx, e) => {
    promiseWrapper(this.props.patientactions.removeDocument, { documentURI: dUrl, documentName: dName }).then((data) => {
      if (data.isSuccess == true) {
        let curState = this.state.DiagnosticDetails.prescribeMedicineDocs;
        curState.splice(idx, 1);
        this.setState(prevState => ({
          DiagnosticDetails: {
            ...prevState.DiagnosticDetails,
            ["prescribeMedicineDocs"]: curState
          }
        }));
        toast.success("Attachment removed");
      }
      else {
        toast.error("there is some issue with file remove");
      }
    });
  }

  addAdditionalServiceData = (servicesArray, totalFee) => this.setState({ addedAdditionalServices: servicesArray, additionalFees: totalFee }, () => console.log(servicesArray, totalFee, "new data"))

  // submitAdditionalServices = () =>

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <DoctorHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <DoctorLeftPanel />
              <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel bg-light">
                {this.state.LoadedData === true &&
                  <div className="row appointment-details-container">
                    <div className="col-md-10 col-lg-6 col-sm-12 col-12 m-auto">
                      <div className="appointment-details-form py-4">
                        <div className="appointment-details-form-title">
                          <h3>{t('Doctor.SaveDiagnostic.Upload_diagnostic_report')}</h3>
                        </div>
                        <div className="appointment-details-form-info my-4">
                          <div className="row">
                            <div className="col-md-8 col-sm-8 col-8">
                              <div className="appointment-details-form-info-title">
                                {t('Doctor.SaveDiagnostic.Date')}
                              </div>
                              <div className="appointment-details-form-info-value">
                                {new Date(this.state.DiagnosticDetails.appDetail.appointmentDate).toDateString()}
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-4">
                              <div className="appointment-details-form-info-title">
                                {t('Doctor.SaveDiagnostic.Time')}
                              </div>
                              <div className="appointment-details-form-info-value">
                                {new Date(this.state.DiagnosticDetails.appDetail.appointmentDate).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-4 col-sm-4 col-4">
                              <div className="appointment-details-form-info-title">
                                {t('Doctor.SaveDiagnostic.Patients_Details')}
                              </div>
                              <div className="appointment-details-form-info-value">
                                {this.state.DiagnosticDetails.appDetail.patientName}
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-4">
                              <div className="appointment-details-form-info-title">
                                {t('Doctor.SaveDiagnostic.Booking_Id')}
                              </div>
                              <div className="appointment-details-form-info-value">
                                {this.state.DiagnosticDetails.appDetail.bookingId}
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-4">
                              <div className="appointment-details-form-info-title">
                                {t('Doctor.SaveDiagnostic.Consultation_Fees')}
                              </div>
                              <div className="appointment-details-form-info-value">
                                € {this.state.DiagnosticDetails.appDetail.consultFees + this.state.additionalFees}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="describe-problem-textarea">{t('Doctor.SaveDiagnostic.Describe_problem_or_symptoms.')}</label>
                          <textarea className="form-control appointment-details-form-inputs" id="describe-problem-textarea"
                            onChange={this.UpdateSymptomsText.bind(this)} rows="3" placeholder={t('Doctor.SaveDiagnostic.Describe_problem_or_symptoms.')} value={this.state.DiagnosticDetails.describeProblem || ""}></textarea>
                        </div>
                        <div className="form-group my-4">
                          <label htmlFor="describe-problem-textarea">{t('Doctor.SaveDiagnostic.Diagnostic_Conclusion')}</label>
                          <textarea className="form-control appointment-details-form-inputs" id="describe-problem-textarea"
                            onChange={this.UpdateConclusionText.bind(this)} rows="3" placeholder={t('Doctor.SaveDiagnostic.Describe')} value={this.state.DiagnosticDetails.diagnosticConclusion || ""}></textarea>
                        </div>
                        <div className="form-group my-4">
                          <label htmlFor="symptoms-active">{t('Doctor.SaveDiagnostic.Prescribe_Medication')}</label>
                          <div className="d-flex">
                            <input type="text" onChange={this.UpdateMedicationText.bind(this)} className="form-control appointment-details-form-inputs" value={this.state.DiagnosticDetails.prescribeMedicine || ""} id="symptoms-active" placeholder={t('Doctor.SaveDiagnostic.Describe')} />
                            <label className="btn form-file-upload-btn btn-default mb-0 mx-1">
                              {t('Doctor.SaveDiagnostic.Upload')}<input type="file" hidden onChange={this.onUploadPrescribeMedicineDocs.bind(this)} />
                            </label>
                          </div>
                          {this.state.DiagnosticDetails.prescribeMedicineDocs !== null &&
                            this.state.DiagnosticDetails.prescribeMedicineDocs.length > 0 &&
                            this.state.DiagnosticDetails.prescribeMedicineDocs.map((v, idx) => (
                              <div className="col-md-12 col-6" key={idx}>
                                <a href={v.docURL} target="_blank" className="attachment-links">{v.docName}</a>
                                <a className="text-danger" onClick={this.onDeleteprescribeMedicineDocs.bind(this, v.docURL, v.docName, idx)} style={{ cursor: "pointer" }}><i className="fas fa-times"></i></a>
                              </div>
                            ))
                          }
                        </div>
                        <div className="form-group my-4">
                          <label htmlFor="symptoms-active">{t('Doctor.SaveDiagnostic.Additional_Documents')}</label>
                          {this.state.DiagnosticDetails.additionalDocuments.map((d, idx) => (
                            <div key={idx}>
                              <div className="d-flex mt-3">
                                <input type="text" onChange={this.UpdateAdditionalDocumentText.bind(this, idx)} className="form-control appointment-details-form-inputs" id="symptoms-active" placeholder={t('Doctor.SaveDiagnostic.Describe')} />
                                <label className="btn form-file-upload-btn btn-default mb-0 mx-1">
                                  {t('Doctor.SaveDiagnostic.Upload')}
                                  {d.additionalFile.docURL !== null &&
                                    <input type="file" id={idx + "addDoc"} hidden onChange={this.onUploadAdditionalDocument.bind(this, idx)} />
                                  }
                                </label>
                                <div className="col-md-1 mt-2 d-flex justify-content-center align-items-start">
                                  <a className="mt-25 text-danger" style={{ cursor: "pointer" }} onClick={this.onDeleteAdditionalDocumentText.bind(this, idx)}>
                                    <i className="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                              {d.additionalFile.docURL !== null &&
                                <div className="col-md-12 col-6">
                                  <a href={d.additionalFile.docURL} target="_blank" className="attachment-links">{d.additionalFile.docName}</a>
                                </div>
                              }
                            </div>
                          ))}
                          <div className="d-flex justify-content-end add-new">
                            <a onClick={this.onAddAdditionalDocuments.bind(this)}>{t('Doctor.SaveDiagnostic.+_Add_New')}  </a>
                          </div>
                        </div>
                        <AddAdditionalServices
                          addAdditionalServiceData={(servicesArray, totalFee) => this.addAdditionalServiceData(servicesArray, totalFee)}
                          docactions={this.props.docactions}
                          appointmentGuid={this.props.match.params.appointmentGuid}
                          t={t}
                        />
                        <div className="book-appointment-btn my-4 d-flex justify-content-around">
                          <Link to="/doctor-dashboard" className='btn px-5'>Cancel</Link>
                          <a className="btn px-5" onClick={this.onSubmit.bind(this)} role="button">{t('Doctor.SaveDiagnostic.Submit')}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <DoctorFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStoreToprops(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, patientactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(SaveDiagnostic));