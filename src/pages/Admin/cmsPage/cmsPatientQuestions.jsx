import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoAdminActions from '../../../redux/exadoAdmin/action';
import { promiseWrapper } from '../../../utility/common';
import { toast } from "react-toastify"

class CmsPatientQuestions extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isAdmin: true,
         langId: this.props.langId,
         cmsData: []
      }
   }

   componentDidMount() {
      this.getCMSPatientQuestions()
   }

   componentDidUpdate() {
      if (this.props.langId !== this.state.langId) {
         this.setState({ langId: this.props.langId }, () => {
            this.getCMSPatientQuestions()
         })
      }
   }

   setStates(e, id, placeholder = false) {
      const newData = this.state.cmsData.map((question, i) => {
         if (i === id) {
            if (placeholder) question.placeholder = e.target.value
            else question.question = e.target.value;
            return question;
         } else return question
      })
      this.setState({ cmsData: newData })
   }

   getCMSPatientQuestions = () => {
      promiseWrapper(this.props.adminactions.getPatientQuestionnaireLanguage, { query: { languageId: this.props.langId } })
         .then(data => {
            this.setState({ cmsData: data.data })
         })
         .catch(err => console.log(err))
   }

   submitCMSData = () => {
      if (this.state.langId === 1) {
         let isEmpty = false;
         this.state.cmsData.forEach(input => {
            if (!input.question) isEmpty = true
            else if (input.englishPlaceholder && !input.placeholder) isEmpty = true
         });
         if (!isEmpty)
            promiseWrapper(this.props.adminactions.savePatientQuestionnaireLanguage, { data: { questionnaireData: this.state.cmsData } })
               .then(data => {
                  if (data.data.isSuccess) toast.success(data.data.message)
                  else toast.error(data.data.errorMessage)
               })
               .catch(err => console.log(err))
         else toast.warning("Please fill up all field")
      }
      else
         promiseWrapper(this.props.adminactions.savePatientQuestionnaireLanguage, { data: { questionnaireData: this.state.cmsData } })
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
               {cmsData.map((question, i) =>
                  // <>
                  <div className="form-group my-4" key={i}>
                     <label>{question.englishQuestion}</label>
                     <input type="text" className="form-control appointment-details-form-inputs"
                        value={question.question ? question.question : ""}
                        name='headerMainTitle'
                        onChange={(e) => this.setStates(e, i)}
                     />
                     <div className="row mt-2">
                        {/* <div className="col-4">
                           <div className="input-group">
                              <div className="input-group-prepend">
                                 <span className="input-group-text">Page No.</span>
                              </div>
                              <input type="text" className="form-control"
                                 value={question.pagenum ? question.pagenum : ""}
                              // onChange={(e) => this.setStates(e, question.questionOrder)}
                              />
                           </div>
                        </div>
                        <div className="col-4">
                           <div className="input-group">
                              <span className="input-group-text">Type</span>
                              <select className="form-select">
                                 <option value="1">One</option>
                                 <option value="2">Two</option>
                                 <option value="3">Three</option>
                              </select>
                           </div>
                        </div> */}
                        {question.englishPlaceholder &&
                           <div className="col-6">
                              <div className="input-group">
                                 <div className="input-group-prepend">
                                    <span className="input-group-text">{question.englishPlaceholder}</span>
                                 </div>
                                 <input type="text" className="form-control"
                                    value={question.placeholder ? question.placeholder : ""}
                                    onChange={(e) => this.setStates(e, i, true)}
                                 />
                              </div>
                           </div>
                        }
                     </div>
                  </div>
                  // </>
                  // <div className="input-group mb-3" key={question.questionOrder}>
                  //    <div className="input-group-prepend">
                  //       <span className="input-group-text">{question.englishQuestion}</span>
                  //    </div>
                  //    <input type="text" className="form-control"
                  //       value={question.question ? question.question : ""}
                  //       onChange={(e) => this.setStates(e, question.questionOrder)}
                  //    />
                  // </div>
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

export default connect(mapStoreToProps, mapDispatchToProps)(CmsPatientQuestions);
