import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoDocActions from '../../../redux/exadoDoc/action';
import { promiseWrapper } from '../../../utility/common';
import { AddAdditionalServices } from '../saveDiagnostic/addAdditionalServices';

export class GenerateInvoiceForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         invoiceData: {},
         patientTitle: "",
         patientFirstName: "",
         patientLastName: "",
         patientAddress: "",
         socialSecurityNumber: "",
         addedAdditionalServices: [],
         additionalFees: 0
      }
   }

   componentDidMount() { this.getInvoiceDetails() }

   getInvoiceDetails = () => {
      promiseWrapper(this.props.docactions.getInvoiceDetails, { params: { AppointmentGuid: this.props.appointmentGuid } })
         .then(data => this.setState({
            invoiceData: data.data,
            patientTitle: data.data.patientTitle,
            patientFirstName: data.data.patientFirstName,
            patientLastName: data.data.patientLastName,
            patientAddress: data.data.patientAddress,
            socialSecurityNumber: data.data.socialSecurityNumber || "Not Provided"
         }))
         .catch(err => console.log(err))
   }
   addAdditionalServiceData = (servicesArray, totalFee) => this.setState({ addedAdditionalServices: servicesArray, additionalFees: totalFee })

   setStates = (e) =>
      this.setState({ [e.target.name]: e.target.value })

   render() {
      const { patientTitle, patientFirstName, patientLastName, patientAddress, socialSecurityNumber } = this.state;
      const { generateInvoiceModal, t, setGenerateInvoiceModal
      } = this.props;

      return (
         <Modal show={generateInvoiceModal} onHide={() => setGenerateInvoiceModal(false)} style={{ zIndex: 2 }} centered>
            <div className="modify-modal" id="withdraw-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog mt-0 mb-0">
                  <div className="modal-content">
                     <div className="modal-header modify-modal-header">
                        <h5 className="modal-title modify-modal-title" id="exampleModalLabel">{t("Doctor.AppointmentCompleted.GenerateInvoiceForm.Generate_Invoice")}</h5>
                        <button type="button" className="close modify-modal-close" data-dismiss="modal" aria-label="Close"
                           onClick={() => setGenerateInvoiceModal(false)}
                        >
                           <img src="assets/images/close-line.png" alt="close-line.png" className="img-fluid" />
                        </button>
                     </div>
                     <div className="modal-body modify-modal-body">
                        <form className="appointment-details" onSubmit={(e) => { console.log(e, this.state); e.preventDefault() }}>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.AppointmentCompleted.GenerateInvoiceForm.Patient_Title")}</label>
                              <input type="text" className="form-control appointment-details-form-inputs"
                                 value={patientTitle ? patientTitle : ""}
                                 name='patientTitle'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.AppointmentCompleted.GenerateInvoiceForm.Patient_First_Name")}</label>
                              <input type="text" className="form-control appointment-details-form-inputs"
                                 value={patientFirstName ? patientFirstName : ""}
                                 name='patientFirstName'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.AppointmentCompleted.GenerateInvoiceForm.Patient_Last_Name")}</label>
                              <input type="text" className="form-control appointment-details-form-inputs"
                                 value={patientLastName ? patientLastName : ""}
                                 name='patientLastName'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.AppointmentCompleted.GenerateInvoiceForm.Patient_Address")}</label>
                              <input type="text" className="form-control appointment-details-form-inputs"
                                 value={patientAddress ? patientAddress : ""}
                                 name='patientAddress'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.AppointmentCompleted.GenerateInvoiceForm.Social_Security_Number")}</label>
                              <input type="text" className="form-control appointment-details-form-inputs"
                                 value={socialSecurityNumber ? socialSecurityNumber : ""}
                                 name='socialSecurityNumber'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <AddAdditionalServices
                              addAdditionalServiceData={this.addAdditionalServiceData}
                              docactions={this.props.docactions}
                              t={t}
                              appointmentGuid={ this.props.appointmentGuid}
                           />
                           <div className="my-2 d-flex justify-content-center mt-4">
                              <button
                                 type="submit"
                                 className="btn appointment-accept-btn"
                              >
                                 {t("Doctor.AppointmentCompleted.GenerateInvoiceForm.Submit")}
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </Modal>
      )
   }
}

function mapStoreToprops(state, props) {
   return {}
}

function mapDispatchToProps(dispatch) {
   const docactions = bindActionCreators(exadoDocActions, dispatch);
   return { docactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(GenerateInvoiceForm)