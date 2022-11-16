import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoAdminActions from '../../../redux/exadoAdmin/action';
import { promiseWrapper } from '../../../utility/common';
import { toast } from "react-toastify"

class CmsApiMessages extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isAdmin: true,
         langId: this.props.langId,
         cmsData: []
      }
   }

   componentDidMount() {
      this.getCMSMessages()
   }

   componentDidUpdate() {
      if (this.props.langId !== this.state.langId) {
         this.setState({ langId: this.props.langId }, () => {
            this.getCMSMessages()
         })
      }
   }

   setStates(e, id) {
      const newData = this.state.cmsData.map(message => {
         if (message.languageLabelId === id) {
            message.languageMessage = e.target.value;
            return message;
         } else return message
      })
      this.setState({ cmsData: newData })
   }

   getCMSMessages = () => {
      promiseWrapper(this.props.adminactions.getLanguageAllMessages, { query: { languageId: this.props.langId } })
         .then(data => {
            this.setState({ cmsData: data.data })
         })
         .catch(err => console.log(err))
   }

   submitCMSData = () => {
      let isEmpty = false;
      if (this.state.langId === 1) {
         this.state.cmsData.forEach(input => { if (!input.languageMessage) isEmpty = true });
         if (!isEmpty)
            promiseWrapper(this.props.adminactions.saveLanguageLabelData, { data: { languageLabelData: this.state.cmsData } })
               .then(data => {
                  if (data.data.isSuccess) toast.success(data.data.message)
                  else toast.error(data.data.errorMessage)
               })
               .catch(err => console.log(err))
         else toast.warning("Please fill up all field")
      }
      else
         promiseWrapper(this.props.adminactions.saveLanguageLabelData, { data: { languageLabelData: this.state.cmsData } })
            .then(data => {
               if (data.data.isSuccess) toast.success(data.data.message)
               else toast.error(data.data.errorMessage)
            })
            .catch(err => console.log(err))
   }

   render() {

      const { cmsData } = this.state;

      return (
         <div className='appointment-details-container mt-3'>
            <form className="appointment-details-form" onSubmit={(e) => {
               e.preventDefault();
               this.submitCMSData()
            }}>
               {cmsData.map(message =>
                  <div className="input-group mb-3" key={message.languageLabelId}>
                     <div className="input-group-prepend">
                        <span className="input-group-text">{message.languageLabel}</span>
                     </div>
                     <input type="text" className="form-control"
                        value={message.languageMessage ? message.languageMessage : ""}
                        onChange={(e) => this.setStates(e, message.languageLabelId)}
                     />
                  </div>
               )}
               <div className="my-5 d-flex justify-content-end">
                  <button
                     type="submit"
                     className="btn btn-success"
                  >
                     Submit
                  </button>
               </div>
            </form>
         </div>
      );
   }
}

function mapStoreToProps(state, props) {
   return {}
}

function mapDispatchToProps(dispatch) {
   const adminactions = bindActionCreators(exadoAdminActions, dispatch)
   return { adminactions }
}

export default connect(mapStoreToProps, mapDispatchToProps)(CmsApiMessages);
