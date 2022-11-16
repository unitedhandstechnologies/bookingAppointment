import React from 'react';
import { Redirect, Link } from "react-router-dom";
import exadoDocActions from '../../redux/exadoDoc/action';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { promiseWrapper } from '../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactStars from "react-rating-stars-component";
import PatientHeader from "./header2";
import PatientFooter from "./footer";
import PatientLeftPanel from './../../commonComponent/LeftPanel/leftPanel';
import AppointmentFeedBack from './../../commonComponent/AppoitmentCalendar/appointmentFeedback';
import { withTranslation } from 'react-i18next';
import AskRefundPopup from './askRefundPopup';

class PatientViewDignosticReport extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         redirect: null,
         LoadedData: false,
         DiagnosticDetails: {},
         Age: 0,
         UserGender: "",
         viewAppointmentFeedBackPopup: false,
         viewRefundPopup: false,
      };
   }

   componentDidMount() {
      promiseWrapper(this.props.docactions.getAllAppointmentDetail, { appointmentGuid: this.props.match.params.appointmentGuid }).then((data) => {
         this.setState({ DiagnosticDetails: data }, () => {
            if (data.patientData.doB && data.patientData.doB !== '') {
               let ad = this.calculate_age(data.patientData.doB)
               this.setState({ Age: ad });
            }
            if (data.patientData.gender) {
               if (data.patientData.gender.toString() === "1") { this.setState({ UserGender: "Male" }); }
               else if (data.patientData.gender.toString() === "2") { this.setState({ UserGender: "Female" }); }
               else { this.setState({ UserGender: "Other" }); }
            }
            this.setState({ LoadedData: true });
         });
      });
   }

   ShowRefundPopUp = () => {
      this.setState({ viewRefundPopup: !this.state.viewRefundPopup });
   }

   calculate_age = (dob1) => {
      var today = new Date();
      var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age_now--;
      }
      return age_now;
   }

   toggleAppointmentFeedBackPopUp = (rv) => {
      this.setState({
         viewAppointmentFeedBackPopup: !this.state.viewAppointmentFeedBackPopup
      });
      if (rv === "true") {
         promiseWrapper(this.props.docactions.getAllAppointmentDetail, { appointmentGuid: this.props.match.params.appointmentGuid }).then((data) => {
            this.setState({ DiagnosticDetails: data }, () => {
               if (data.patientData.doB && data.patientData.doB !== '') {
                  let ad = this.calculate_age(data.patientData.doB)
                  this.setState({ Age: ad });
               }
               if (data.patientData.gender) {
                  if (data.patientData.gender.toString() === "1") { this.setState({ UserGender: "Male" }); }
                  else if (data.patientData.gender.toString() === "2") { this.setState({ UserGender: "Female" }); }
                  else { this.setState({ UserGender: "Other" }); }
               }
               this.setState({ LoadedData: true });
            });
         });
      }
   };

   render() {
      const { t } = this.props
      if (this.state.redirect) {
         return <Redirect to={this.state.redirect} />
      }
      return (
         <div>
            <PatientHeader />
            <div className="main">
               <div className="container-fluid">
                  <div className="row">
                     <PatientLeftPanel />
                     <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel bg-light">
                        {this.state.LoadedData === true &&
                           <div className="row">
                              <div className="search-bar my-4">
                                 <div className="d-flex justify-content-between">
                                    <div className="search-bar-text search-bar-text2">
                                       {'Patients >>'}  <span className="tab-breadcumb">{this.state.DiagnosticDetails.patientData.firstName} {this.state.DiagnosticDetails.patientData.lastName}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="my-profile-form">
                                 <div className="divForm">
                                    <div className="row">
                                       <div className="col-md-12 p-0">
                                          <ul className="nav nav-pills nav-fill" id="myprofiletab" role="tablist">
                                             <li className="nav-item">
                                                <a className="nav-link active" id="health-info-tab" data-toggle="tab" href="#patient-symptoms" role="tab" aria-controls="patient-symptoms" aria-selected="false">{t('Patient.ViewDignosticReport.Patient_Symptoms')}</a>
                                             </li>
                                             <li className="nav-item">
                                                <a className="nav-link" id="patient-history-tab" data-toggle="tab" href="#patient-history" role="tab" aria-controls="patient-history" aria-selected="false">{t('Patient.ViewDignosticReport.Appointment_Details')}</a>
                                             </li>
                                          </ul>
                                          <div className="tab-content" id="myTabContent">
                                             <div className="tab-pane fade show active" id="patient-symptoms" role="tabpanel" aria-labelledby="health-info-tab">
                                                <div className="patient-symptoms-container">
                                                   <div className="my-4">
                                                      <div className="patient-symptoms-question">
                                                         {t('Patient.ViewDignosticReport.Q1')}
                                                      </div>
                                                      <div className="patient-symptoms-answer">
                                                         <div className="d-flex">
                                                            <span>A.</span>
                                                            <span>{this.state.DiagnosticDetails.patientAppointmentDetail.sinceWhen === "" || this.state.DiagnosticDetails.patientAppointmentDetail.sinceWhen == null ? "---" : this.state.DiagnosticDetails.patientAppointmentDetail.sinceWhen}</span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="my-2">
                                                      <div className="patient-symptoms-question">
                                                         {t('Patient.ViewDignosticReport.Q2')}
                                                      </div>
                                                      <div className="patient-symptoms-answer">
                                                         <div className="d-flex">
                                                            <span>A.</span>
                                                            <span>{this.state.DiagnosticDetails.patientAppointmentDetail.anyMedication === "" || this.state.DiagnosticDetails.patientAppointmentDetail.anyMedication == null ? "---" : this.state.DiagnosticDetails.patientAppointmentDetail.anyMedication}</span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="my-2">
                                                      <div className="patient-symptoms-question">
                                                         {t('Patient.ViewDignosticReport.Q3')}
                                                      </div>
                                                      <div className="patient-symptoms-answer">
                                                         <div className="d-flex">
                                                            <span>A.</span>
                                                            <span>{this.state.DiagnosticDetails.patientAppointmentDetail.diagnosisGiven === "" || this.state.DiagnosticDetails.patientAppointmentDetail.diagnosisGiven == null ? "---" : this.state.DiagnosticDetails.patientAppointmentDetail.diagnosisGiven}</span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className="my-2">
                                                      <div className="patient-symptoms-question">
                                                         {t('Patient.ViewDignosticReport.Q4')}
                                                      </div>
                                                      <div className="patient-symptoms-answer">
                                                         <div className="d-flex">
                                                            <span>A.</span>
                                                            <span>{this.state.DiagnosticDetails.patientAppointmentDetail.symptoms === "" || this.state.DiagnosticDetails.patientAppointmentDetail.symptoms == null ? "---" : this.state.DiagnosticDetails.patientAppointmentDetail.symptoms}</span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                   {this.state.DiagnosticDetails.patientAppointmentDetail.patientAttachments && this.state.DiagnosticDetails.patientAppointmentDetail.patientAttachments.length > 0 &&
                                                      <div className="my-2">
                                                         <div className="patient-symptoms-question">
                                                            {t('Patient.ViewDignosticReport.Attachments')}
                                                         </div>
                                                         <div className="patient-symptoms-answer">
                                                            {this.state.DiagnosticDetails.patientAppointmentDetail.patientAttachments.map((v, idx) => (
                                                               <span><a href={v.docURL} target="_blank" className="attachment-links">{v.docName}</a></span>
                                                            ))
                                                            }
                                                         </div>
                                                      </div>
                                                   }
                                                </div>
                                             </div>
                                             <div className="tab-pane fade" id="patient-history" role="tabpanel" aria-labelledby="patient-history-tab">
                                                <div className="row">
                                                   <div className="col-md-12 my-profile-column">
                                                      <div className="my-profile-container d-flex align-items-center">
                                                         <div className="my-profile-photo d-flex justify-content-center align-items-center">
                                                            <img src={this.state.DiagnosticDetails.appointmentData.doctorImage} style={{ borderRadius: "50px" }} />
                                                         </div>
                                                         <div className="mx-4 my-profile-details">
                                                            <div className="admin-name">
                                                               <div>{this.state.DiagnosticDetails.appointmentData.doctorName}</div>
                                                            </div>
                                                            {this.state.DiagnosticDetails.appointmentData.physicianServices && this.state.DiagnosticDetails.appointmentData.physicianServices.length > 0 &&
                                                               <div className="my-profile-details-designation">
                                                                  {this.state.DiagnosticDetails.appointmentData.physicianServices.map((v, idx) => {
                                                                     return (`${v}, `)
                                                                  })
                                                                  }
                                                               </div>
                                                            }
                                                            <div className="d-flex align-items-center">
                                                               <ReactStars
                                                                  classNames="star-img img-fluid"
                                                                  count={5}
                                                                  size={20}
                                                                  value={this.state.DiagnosticDetails.appointmentData.averageReview}
                                                                  isHalf={true}
                                                                  edit={false}
                                                                  emptyIcon={<i className="far fa-star" style={{ color: "#20CAD6" }} />}
                                                                  halfIcon={<i className="fa fa-star-half-alt" />}
                                                                  filledIcon={<i className="fa fa-star" />}
                                                                  color="#fff"
                                                                  activeColor="#20CAD6"
                                                               />
                                                               ({this.state.DiagnosticDetails.appointmentData.totalReview})
                                                            </div>
                                                            <div className="my-profile-details-exp">{this.state.DiagnosticDetails.appointmentData.experience} {t('Patient.ViewDignosticReport.Overall_Experience')}</div>
                                                         </div>
                                                      </div>
                                                      {this.state.viewAppointmentFeedBackPopup ? <AppointmentFeedBack CloseAppointmentFeedBack={this.toggleAppointmentFeedBackPopUp} AppointmentData={this.state.DiagnosticDetails.appointmentData} /> : null}
                                                      {this.state.DiagnosticDetails.appointmentData.isFeedbackGiven === false && this.state.DiagnosticDetails.appointmentData.feedbackPendingHours > 0 &&
                                                         <div className="text-center">
                                                            <button className="btn doctor-dignostic-reprot-feedback-btn mt-3" onClick={this.toggleAppointmentFeedBackPopUp.bind(this, "false")}>{t('Patient.ViewDignosticReport.Feedback_Pending')}</button>
                                                            <div>{parseInt(this.state.DiagnosticDetails.appointmentData.feedbackPendingHours)} {t('Patient.ViewDignosticReport.Hours_Pending')}  </div>
                                                         </div>
                                                      }
                                                      {this.state.DiagnosticDetails.appointmentData.isFeedbackGiven === false && this.state.DiagnosticDetails.appointmentData.feedbackPendingHours === 0 &&
                                                         <div>
                                                            <button className="btn btn-secondary mt-3">{t('Patient.ViewDignosticReport.Feedback_Expired')}</button>
                                                         </div>
                                                      }
                                                      {this.state.DiagnosticDetails.appointmentData.isFeedbackGiven === true &&
                                                         <div>
                                                            <button className="btn btn-success mt-3">{t('Patient.ViewDignosticReport.Feedback_Given')}</button>
                                                         </div>
                                                      }
                                                   </div>
                                                </div>
                                                <div className="row mt-4">
                                                   <div className="col-lg-3 col-md-6 col-12">
                                                      <div className="admin-info-title">
                                                         <span>{t('Patient.ViewDignosticReport.Date')}</span>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <div className="admin-desc-dot"></div>
                                                         <span>{new Date(this.state.DiagnosticDetails.appointmentData.appointmentDate).toDateString()}</span>
                                                      </div>
                                                   </div>
                                                   <div className="col-lg-2 col-md-6 col-12">
                                                      <div className="admin-info-title">
                                                         <span>{t('Patient.ViewDignosticReport.Time')}</span>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <div className="admin-desc-dot"></div>
                                                         <span>{new Date(this.state.DiagnosticDetails.appointmentData.appointmentDate).toLocaleTimeString()}</span>
                                                      </div>
                                                   </div>
                                                   <div className="col-lg-2 col-md-6 col-12">
                                                      <div className="admin-info-title">
                                                         <span>{t('Patient.ViewDignosticReport.Patient_Details')}</span>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <div className="admin-desc-dot"></div>
                                                         <span>{this.state.DiagnosticDetails.appointmentData.patientName}</span>
                                                      </div>
                                                   </div>
                                                   <div className="col-lg-3 col-md-6 col-12">
                                                      <div className="admin-info-title">
                                                         <span>{t('Patient.ViewDignosticReport.Booking_Id')}</span>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <div className="admin-desc-dot"></div>
                                                         <span>{this.state.DiagnosticDetails.appointmentData.bookingId}</span>
                                                      </div>
                                                   </div>
                                                   <div className="col-lg-2 col-md-6 col-12">
                                                      <div className="admin-info-title">
                                                         <span>{t('Patient.ViewDignosticReport.Consultation_Fees')}</span>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <div className="admin-desc-dot"></div>
                                                         <span>€ {this.state.DiagnosticDetails.appointmentData.consultFees}</span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <hr />
                                                <div>
                                                   <div className="doctor-report-title">
                                                      <span className="doctor-report-title-text">{t('Patient.ViewDignosticReport.Diagnostic_Report')}</span>
                                                   </div>
                                                   <div className="my-3">
                                                      <div className="admin-info-title d-flex align-items-center">
                                                         <div className="admin-desc-dot"></div>
                                                         <span>{t('Patient.ViewDignosticReport.Describe_Problem')}</span>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <span className="mx-2">{this.state.DiagnosticDetails.diagnosticReport.describeProblem}</span>
                                                      </div>
                                                   </div>
                                                   <div className="mb-3">
                                                      <div className="admin-info-title d-flex align-items-center">
                                                         <div className="admin-desc-dot"></div>
                                                         <span>{t('Patient.ViewDignosticReport.Diagnostic_Conclusion')}</span>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <span className="mx-2">{this.state.DiagnosticDetails.diagnosticReport.diagnosticConclusion}</span>
                                                      </div>
                                                   </div>
                                                   <div className="mb-3">
                                                      <div>
                                                         <div className="admin-info-title d-flex align-items-center">
                                                            <div className="admin-desc-dot"></div>
                                                            <span>{t('Patient.ViewDignosticReport.Prescribe_Medication')}</span>
                                                         </div>
                                                         <div className="admin-info-description mx-4">
                                                            <div className="d-flex align-items-center">
                                                               <div className="admin-desc-dot2"></div>
                                                               <div>{this.state.DiagnosticDetails.diagnosticReport.prescribeMedicine}</div>
                                                            </div>
                                                            <div>
                                                               {this.state.DiagnosticDetails.diagnosticReport.prescribeMedicineDocs && this.state.DiagnosticDetails.diagnosticReport.prescribeMedicineDocs.length > 0 &&
                                                                  <div>
                                                                     {this.state.DiagnosticDetails.diagnosticReport.prescribeMedicineDocs.map((v, idx) => (
                                                                        <div><a href={v.docURL} target="_blank" className="attachment-links">{v.docName}</a></div>
                                                                     ))
                                                                     }
                                                                  </div>
                                                               }
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                   {this.state.DiagnosticDetails.diagnosticReport.additionalDocuments && this.state.DiagnosticDetails.diagnosticReport.additionalDocuments.length > 0 &&
                                                      <div className="mb-3">
                                                         <div>
                                                            <div className="admin-info-title d-flex align-items-center">
                                                               <div className="admin-desc-dot"></div>
                                                               <span>{t('Patient.ViewDignosticReport.Additional_Documents')}</span>
                                                            </div>
                                                            {this.state.DiagnosticDetails.diagnosticReport.additionalDocuments.map((v, idx) => (
                                                               <div className="admin-info-description mx-4">
                                                                  <div className="d-flex align-items-center">
                                                                     <div className="admin-desc-dot2"></div>
                                                                     <div>{v.additionalDocument}</div>
                                                                  </div>
                                                                  <div><a href={v.additionalFile.docURL} target="_blank" className="attachment-links">{v.additionalFile.docName}</a> </div>
                                                               </div>
                                                            ))
                                                            }
                                                         </div>
                                                      </div>
                                                   }
                                                </div>
                                                {this.state.DiagnosticDetails.review !== null &&
                                                   <>
                                                      <hr />
                                                      <div className="doctor-details mt-4">
                                                         <div className="admin-info-title d-flex align-items-center">
                                                            <span className="admin-info-title-text">{t('Patient.ViewDignosticReport.Feedback')}</span>
                                                         </div>
                                                      </div>
                                                      <div className="admin-info-description d-flex align-items-center">
                                                         <span>{this.state.DiagnosticDetails.review.description}</span>
                                                      </div>
                                                      <div className="d-flex align-items-center">
                                                         <ReactStars
                                                            classNames="star-img img-fluid"
                                                            count={5}
                                                            size={20}
                                                            value={this.state.DiagnosticDetails.review.rating}
                                                            isHalf={true}
                                                            edit={false}
                                                            emptyIcon={<i className="far fa-star" style={{ color: "#20CAD6" }} />}
                                                            halfIcon={<i className="fa fa-star-half-alt" />}
                                                            filledIcon={<i className="fa fa-star" />}
                                                            color="#fff"
                                                            activeColor="#20CAD6"
                                                         />
                                                      </div>
                                                   </>
                                                }
                                                <hr className="my-4" />
                                                <div className="d-flex flex-column flex-md-row justify-content-between">

                                                   {this.state.DiagnosticDetails.patientAppointmentDetail.isPaidOnline && this.state.DiagnosticDetails.patientAppointmentDetail.isApplyForRefund === false && this.state.DiagnosticDetails.patientAppointmentDetail.refundPendingHours > 0 &&
                                                      <div className="mb-2 text-left text-md-center">
                                                         <button className=" btn doctor-dignostic-reprot-feedback-btn" onClick={this.ShowRefundPopUp.bind(this)}>{t("Patient.ViewDignosticReport.Ask_for_refund")}</button>
                                                         <div className="mx-2">{parseInt(this.state.DiagnosticDetails.patientAppointmentDetail.refundPendingHours)} {t('Patient.ViewDignosticReport.Hours_Pending')}</div>
                                                      </div>
                                                   }
                                                   {this.state.DiagnosticDetails.patientAppointmentDetail.isPaidOnline && this.state.DiagnosticDetails.patientAppointmentDetail.isApplyForRefund === false && this.state.DiagnosticDetails.patientAppointmentDetail.refundPendingHours === 0 &&
                                                      <div className="mb-2 text-left text-md-center">
                                                         <a className="dropdown-item">{t("Patient.ViewDignosticReport.Refund_time_left")}</a>
                                                      </div>
                                                   }
                                                   {this.state.DiagnosticDetails.patientAppointmentDetail.isPaidOnline && this.state.DiagnosticDetails.patientAppointmentDetail.isApplyForRefund === true && this.state.DiagnosticDetails.patientAppointmentDetail.appointmentStatus === "Completed" &&
                                                      <div className="mb-2 text-left text-md-center">
                                                         <a className="dropdown-item">{t("Patient.ViewDignosticReport.Applyed_for_Refund")}</a>
                                                      </div>
                                                   }
                                                   {this.state.DiagnosticDetails.patientAppointmentDetail.isPaidOnline && this.state.DiagnosticDetails.patientAppointmentDetail.isApplyForRefund === true && this.state.DiagnosticDetails.patientAppointmentDetail.appointmentStatus === "Refunded" &&
                                                      <div className="mb-2 text-left text-md-center">
                                                         <a className="dropdown-item"> {this.state.DiagnosticDetails.patientAppointmentDetail.refundAmount} (€) {t("Patient.ViewDignosticReport.Refunded")} </a>
                                                      </div>
                                                   }
                                                   <div className="mb-2 text-left text-md-center">
                                                      {this.state.DiagnosticDetails.appointmentData.isFeedbackGiven === false && this.state.DiagnosticDetails.appointmentData.feedbackPendingHours > 0 &&
                                                         <>
                                                            <button className="btn doctor-dignostic-reprot-feedback-btn" onClick={this.toggleAppointmentFeedBackPopUp.bind(this, "false")}>{t('Patient.ViewDignosticReport.Feedback_Pending')}</button>
                                                            <div className="mx-2">{parseInt(this.state.DiagnosticDetails.appointmentData.feedbackPendingHours)} {t('Patient.ViewDignosticReport.Hours_Pending')}  </div>
                                                         </>
                                                      }
                                                      {this.state.DiagnosticDetails.appointmentData.isFeedbackGiven === false && this.state.DiagnosticDetails.appointmentData.feedbackPendingHours === 0 &&
                                                         <div>
                                                            <button className="btn btn-secondary mt-3">{t('Patient.ViewDignosticReport.Feedback_Expired')}</button>
                                                         </div>
                                                      }
                                                      {this.state.DiagnosticDetails.appointmentData.isFeedbackGiven === true &&
                                                         <div>
                                                            <button className="btn btn-success mt-3">{t('Patient.ViewDignosticReport.Feedback_Given')}</button>
                                                         </div>
                                                      }
                                                   </div>
                                                   <div className="mb-2">
                                                      <button className=" btn doctor-dignostic-reprot-feedback-btn ">{t("Patient.ViewDignosticReport.Invoice_receipt")}</button>
                                                   </div>
                                                   <div>
                                                      <Link className="btn patient-symptoms-save-btn" to={`/book-an-appoinment-doc-detail/${this.state.DiagnosticDetails.appointmentData.doctorGuid}`}>{t('Patient.ViewDignosticReport.Book_Again')}</Link>
                                                   </div>
                                                </div>
                                                {this.state.viewRefundPopup ? <AskRefundPopup CloseAskRefundPopup={this.ShowRefundPopUp} AppoinmentDetails={this.state.DiagnosticDetails.patientAppointmentDetail} /> : null}
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        }
                        <PatientFooter />
                     </div>
                  </div>
               </div>
            </div>
         </div >
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

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(PatientViewDignosticReport));