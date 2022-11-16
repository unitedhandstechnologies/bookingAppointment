import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoActions from '../../../redux/exado/action';
import exadoAdminActions from '../../../redux/exadoAdmin/action';
import { cmsPageNum, promiseWrapper } from '../../../utility/common';
import { toast } from "react-toastify"

class CmsContactUs extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isAdmin: true,
         langId: this.props.langId,
         cmsData: {
            pageNumber: cmsPageNum.ContactUs,
            languageId: this.props.langId,
            headerMainTitle: "",
            headerSubTitle: "",
            email: "",
            phone: "",
            contactUs: ""
         }
      }
   }

   componentDidMount() {
      this.getCMSPageData(cmsPageNum.ContactUs, this.props.langId ? this.props.langId : 1, this.state.isAdmin)
   }

   componentDidUpdate() {
      if (this.props.langId !== this.state.langId) {
         this.setState({ langId: this.props.langId, cmsData: { ...this.state.cmsData, languageId: this.props.langId } }, () => {
            this.getCMSPageData(cmsPageNum.ContactUs, this.props.langId, this.state.isAdmin)
         })
      }
   }

   setStates(e) {
      const newData = { ...this.state.cmsData, [e.target.name]: (e.target.value) ? e.target.value : null }
      this.setState({ cmsData: newData })
   }

   getCMSPageData = (pageNum, langId, isAdmin) => {
      const queryParam = {
         cMSPagenumber: pageNum,
         languageId: langId,
         isAdmin: isAdmin
      }
      promiseWrapper(this.props.comactions.getCMSPage, { query: { ...queryParam } })
         .then(data => {
            const receivedData = {
               ...data.data,
               pageNumber: this.state.cmsData.pageNumber,
               languageId: this.state.cmsData.languageId
            }
            this.setState({ cmsData: receivedData })
         })
         .catch(err => console.log(err))
   }

   submitCMSData = () => {
      promiseWrapper(this.props.adminactions.saveCMSPage, { data: { ...this.state.cmsData } })
         .then(data => {
            if (data.data.isSuccess) toast.success(data.data.message)
            else toast.error(data.data.errorMessage)
         })
         .catch(err => console.log(err))
   }

   render() {

      const { headerMainTitle, headerSubTitle, phone, email, contactUs } = this.state.cmsData;

      return (
         <div className='appointment-details-container'>
            <form className="appointment-details-form" onSubmit={(e) => { e.preventDefault(); this.submitCMSData() }}>
               <div className="form-group my-4">
                  <label>We're here for you</label>
                  <input type="text" className="form-control appointment-details-form-inputs"
                     value={headerMainTitle ? headerMainTitle : ""}
                     name='headerMainTitle'
                     onChange={(e) => this.setStates(e)}
                  />
               </div>
               <div className="form-group my-4">
                  <label>Questions about the company ?</label>
                  <input type="text" className="form-control appointment-details-form-inputs"
                     value={headerSubTitle ? headerSubTitle : ""}
                     name='headerSubTitle'
                     onChange={(e) => this.setStates(e)}
                  />
               </div>
               <div className="form-group my-4">
                  <label for="contactUs">Contact form</label>
                  <textarea
                     className="form-control appointment-details-form-inputs"
                     onChange={(e) => this.setStates(e)}
                     rows="3"
                     name='contactUs'
                     value={contactUs ? contactUs : ""}
                  ></textarea>
               </div>
               <div className="form-group my-4">
                  <label>Email</label>
                  <input type="email" className="form-control appointment-details-form-inputs"
                     value={email ? email : ""}
                     name='email'
                     onChange={(e) => this.setStates(e)}
                  />
               </div>
               <div className="form-group my-4">
                  <label>Phone</label>
                  <input type="text" className="form-control appointment-details-form-inputs"
                     value={phone ? phone : ""}
                     name='phone'
                     onChange={(e) => this.setStates(e)}
                  />
               </div>
               <div className="my-5 d-flex justify-content-around">
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
   const comactions = bindActionCreators(exadoActions, dispatch)
   const adminactions = bindActionCreators(exadoAdminActions, dispatch)
   return { comactions, adminactions }
}

export default connect(mapStoreToProps, mapDispatchToProps)(CmsContactUs);
