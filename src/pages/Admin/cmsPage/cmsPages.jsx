import React, { Component } from 'react';
import AdminHeader from '../adminHeader';
import AdminLeftPanel from '../../../commonComponent/LeftPanel/leftPanel';
import AdminFooter from '../../patient/footer';
import { Route, withRouter } from 'react-router';
import CmsHome from './cmsHome';
import CmsTandC from './cmsTandC';
import { Link } from 'react-router-dom';
import { promiseWrapper } from '../../../utility/common';
import { bindActionCreators } from 'redux';
import exadoDocActions from '../../../redux/exadoDoc/action';
import { connect } from 'react-redux';
import CmsBreadcrumb from './cmsBreadcrumb';
import CmsChatWithDoctors from './cmsChatWithDoctors';
import CmsEmergency from './cmsEmergency';
import CmsContactUs from './cmsContactUs';
import CmsAboutUs from './cmsAboutUs';
import CmsPrivacyPolicy from './cmsPrivacyPolicy';
import CmsFAQs from './cmsFAQs';
import CmsApiMessages from './cmsApiMessages';
import CmsPatientQuestions from './cmsPatientQuestions';
import CmsTandCDoc from './cmsTandCDoc';

const cmsPageName = {
   homepage: "Home",
   chatwithdoctors: "Chat With doctors",
   emergency: "Emergency",
   contactus: "Contact Us",
   aboutus: "About Us",
   termsncondition: "Terms And Condition - Patient",
   termsnconditiondoctor: "Terms And Condition - Doctor",
   privacypolicy: "Privacy Policy",
   faqs: "FAQs",
   apimessages: "Api Messages",
   patientquestions: "Patient Questionnaire",
   "cms": "cms"
}

class CmsPages extends Component {
   constructor(props) {
      super(props);
      this.state = {
         languageId: 1,
         WebSiteLanguageData: {},
         pageName: "cms"
      };
   }

   componentDidMount() {
      this.getWebsiteLanguages();
   }

   componentDidUpdate() {
      let path = this.props.location.pathname
      let pageName = path.length > 11 ? path.slice(11) : "cms"
      if (this.state.pageName !== cmsPageName[pageName]) {
         this.setState({ pageName: cmsPageName[pageName] })
      }
   }

   getWebsiteLanguages = () => {
      promiseWrapper(this.props.docactions.getWebsiteLanguages).then((languageData) => {
         this.setState({ WebSiteLanguageData: languageData });
      });
   }


   render() {
      const cmsPage = [
         { name: "Home Page", path: "/admin-cms/homepage" },
         { name: "Chat With Doctors", path: "/admin-cms/chatwithdoctors" },
         { name: "Emergency", path: "/admin-cms/emergency" },
         { name: "Contact Us", path: "/admin-cms/contactus" },
         { name: "About Us", path: "/admin-cms/aboutus" },
         { name: "Terms and Condition (Patient)", path: "/admin-cms/termsncondition" },
         { name: "Terms and Condition (Doctor)", path: "/admin-cms/termsnconditiondoctor" },
         { name: "Privacy Policy", path: "/admin-cms/privacypolicy" },
         { name: "FAQs", path: "/admin-cms/faqs" },
         { name: "Api Messages", path: "/admin-cms/apimessages" },
         { name: "Patient Questionnaire", path: "/admin-cms/patientquestions" }
      ]
      const { languageId, WebSiteLanguageData, pageName } = this.state;

      return (
         <div>
            <AdminHeader />
            <div className="main">
               <div className="container-fluid">
                  <div className="row">
                     <AdminLeftPanel />
                     <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                        <div className="d-flex justify-content-between align-items-center bg-light">
                           <CmsBreadcrumb pageName={pageName} />
                           {(pageName !== "cms") &&
                              <select className='form-control w-25'
                                 defaultValue={languageId}
                                 onChange={(e) => { this.setState({ languageId: Number(e.target.value) }) }}>
                                 {WebSiteLanguageData.length > 0 &&
                                    WebSiteLanguageData.map((lang, i) =>
                                       <option value={lang.languageId} key={i}
                                       // selected={(languageId === lang.languageId) ? true : false}
                                       >
                                          {lang.languageName}
                                       </option>
                                    )
                                 }
                              </select>
                           }
                        </div>
                        {this.props.match.isExact ?
                           <>
                              <div className="row mt-3 d-flex justify-content-center">
                                 <div className="col-md-12 table-min-height">
                                    <div className="tableContainer table-responsive">
                                       <table className="table table-bordered appointmentTable">
                                          <thead>
                                             <tr className="new-patient-table-title">
                                                <th className='text-start'>Pages Name</th>
                                                <th>Action</th>
                                             </tr>
                                          </thead>
                                          {
                                             <tbody>
                                                {cmsPage.map((page, i) => (
                                                   <tr key={i}>
                                                      <td className='text-start'>{page.name}</td>
                                                      <td>
                                                         <Link
                                                            className="btn doctor-report-edit-btn"
                                                            to={page.path}
                                                            onClick={() => this.setState({ languageId: 1 })}
                                                            style={{ backgroundColor: "#0dcaf0", color: "white" }}
                                                         >
                                                            <span><i className="fas fa-pen"></i> </span>
                                                            Edit
                                                         </Link>
                                                      </td>
                                                   </tr>
                                                ))
                                                }
                                             </tbody>
                                          }
                                       </table>
                                    </div>
                                 </div>
                              </div>
                           </> :
                           <>
                              <Route path={"/admin-cms/homepage"}>
                                 <CmsHome langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/chatwithdoctors"}>
                                 <CmsChatWithDoctors langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/termsncondition"}>
                                 <CmsTandC langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/termsnconditiondoctor"}>
                                 <CmsTandCDoc langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/emergency"}>
                                 <CmsEmergency langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/contactus"}>
                                 <CmsContactUs langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/aboutus"}>
                                 <CmsAboutUs langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/privacypolicy"}>
                                 <CmsPrivacyPolicy langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/faqs"}>
                                 <CmsFAQs langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/apimessages"}>
                                 <CmsApiMessages langId={languageId} />
                              </Route>
                              <Route path={"/admin-cms/patientquestions"}>
                                 <CmsPatientQuestions langId={languageId} />
                              </Route>
                           </>
                        }
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


function mapStoreToProps(state, props) {
   return {}
}

function mapDispatchToProps(dispatch) {
   const docactions = bindActionCreators(exadoDocActions, dispatch)
   return { docactions }
}

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(CmsPages));
