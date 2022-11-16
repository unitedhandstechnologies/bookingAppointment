import React, { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { cmsPageNum, promiseWrapper } from '../../../utility/common';
import { bindActionCreators } from 'redux';
import exadoActions from '../../../redux/exado/action';
import exadoAdminActions from '../../../redux/exadoAdmin/action';
import { connect } from 'react-redux';
import JodItTextEditore from './jodItTextEditore';
import { toast } from 'react-toastify';

class CmsTandC extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isAdmin: true,
         langId: this.props.langId,
         content: "",
         cmsData: ""
      }
      this.editor = React.createRef();
   }

   componentDidMount() {
      this.getCMSPageData(
         cmsPageNum.TermsNCondition,
         this.props.langId ? this.props.langId : 1,
         this.state.isAdmin
      )
   }

   componentDidUpdate() {
      if (this.props.langId !== this.state.langId) {
         this.setState({
            langId: this.props.langId,
            cmsData: { ...this.state.cmsData, languageId: this.props.langId }
         }, () => {
            this.getCMSPageData(cmsPageNum.TermsNCondition, this.props.langId, this.state.isAdmin)
         })
      }
   }

   componentWillUnmount() {
      unmountComponentAtNode(this.editor.current)
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
               pageNumber: cmsPageNum.TermsNCondition,
               languageId: this.props.langId
            }
            this.setState({ cmsData: receivedData, content: receivedData.htmlDescription })
         })
         .catch(err => console.log(err))
   }

   setContent(data) {
      this.setState({ content: data })
   }

   submitCMSData = () => {
      promiseWrapper(this.props.adminactions.saveCMSPage, { data: { ...this.state.cmsData, htmlDescription: this.state.content } })
         .then(data => {
            if (data.data.isSuccess) toast.success(data.data.message)
            else toast.error(data.data.errorMessage)
         })
         .catch(err => console.log(err))
   }

   render() {

      return (
         <div ref={this.editor}>
            <JodItTextEditore
               content={this.state.content}
               setContent={(data) => this.setContent(data)}
               submitContent={() => this.submitCMSData()}
            />
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

export default connect(mapStoreToProps, mapDispatchToProps)(CmsTandC);