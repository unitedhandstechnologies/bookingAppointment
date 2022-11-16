import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class AdditionalServiceModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         serviceName: this.props.modalServiceName,
         amount: this.props.modalAmount,
         description: this.props.modalDescription
      }
   }

   setStates = (e) =>
      this.setState({ [e.target.name]: e.target.value })

   render() {
      const { serviceName, amount, description } = this.state;
      const { additionalServiceModal, t, setAdditionalServiceModal, title, saveAdditionalService
      } = this.props;

      return (
         <Modal show={additionalServiceModal} onHide={() => setAdditionalServiceModal(false)} style={{ zIndex: "2" }} centered>
            <div className="modify-modal" id="withdraw-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog mt-0 mb-0">
                  <div className="modal-content">
                     <div className="modal-header modify-modal-header">
                        <h5 className="modal-title modify-modal-title" id="exampleModalLabel">{t(title)}</h5>
                        <button type="button" className="close modify-modal-close" data-dismiss="modal" aria-label="Close"
                           onClick={() => setAdditionalServiceModal(false)}
                        >
                           <img src="assets/images/close-line.png" alt="close-line.png" className="img-fluid" />
                        </button>
                     </div>
                     <div className="modal-body modify-modal-body">
                        <form className="appointment-details" onSubmit={(e) => saveAdditionalService(e, this.state)}>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.MyFees.AdditionalServiceModal.Service_Name")}</label>
                              <input type="text" className="form-control appointment-details-form-inputs"
                                 value={serviceName ? serviceName : ""}
                                 name='serviceName'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.MyFees.AdditionalServiceModal.Description")}</label>
                              <input type="text" className="form-control appointment-details-form-inputs"
                                 value={description ? description : ""}
                                 name='description'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <div className="form-group my-2">
                              <label className="mb-2">{t("Doctor.MyFees.AdditionalServiceModal.Amount")}</label>
                              <input type="number" className="form-control appointment-details-form-inputs"
                                 value={amount ? amount : ""}
                                 name='amount'
                                 onChange={(e) => this.setStates(e)}
                                 required
                              />
                           </div>
                           <div className="my-2 d-flex justify-content-center mt-4">
                              <button
                                 type="submit"
                                 data-toggle="modal"
                                 data-dismiss="modal"
                                 data-target="#withdraw-submit"
                                 className="btn appointment-accept-btn"
                              >
                                 {t("Doctor.MyFees.AdditionalServiceModal.Submit")}
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

export default withTranslation()(AdditionalServiceModal);