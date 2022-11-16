import React, { useState } from "react";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandingPageHeader from "./landingPageHeader";
import LandingPageFooter from "./landingPageFooter";
import { withTranslation } from "react-i18next";
import { cmsPageNum, promiseWrapper } from "../../utility/common";
import { useEffect } from "react";

const ContactUs = (props) => {
  const [cmsData, setCmsData] = useState({});
  const [languageCode, setLanguageCode] = useState("");
  const { t } = props;

  useEffect(() => {
    if (props.languageObj?.languageAbbreviation) {
      const { languageAbbreviation, languageId } = props.languageObj;
      setLanguageCode(languageAbbreviation);
      getCMSPageData(cmsPageNum.ContactUs, languageId, false);
    }
    const langCode = props.languageObj?.languageAbbreviation;
    if (langCode && languageCode !== langCode) {
      setLanguageCode(langCode);
      getCMSPageData(cmsPageNum.ContactUs, props.languageObj.languageId, false);
    }
  }, []);

  const getCMSPageData = (pageNum, langId, isAdmin) => {
    const queryParam = {
      cMSPagenumber: pageNum,
      languageId: langId,
      isAdmin: isAdmin,
    };
    promiseWrapper(props.comactions.getCMSPage, {
      query: { ...queryParam },
    }).then((data) => setCmsData(data.data));
  };
  return (
    <>
      <LandingPageHeader />
      <div className="main">
        <div className="top-banner about-banner">
          <div className="emergency py-4">
            <div className="py-4 heading heading-background">
              <div>
                <span className="anyEmergency">
                  {t("Public.ContactUs.We_are_here_for_you")}
                </span>
              </div>
            </div>
            <div className="text-center">
              <span>{cmsData.headerMainTitle}</span>
            </div>
            <div className="py-4 heading heading-background">
              <div>
                <span className="anyEmergency">
                  {t("Public.ContactUs.Questions_about_company")}
                </span>
              </div>
            </div>
            <div className="text-center">
              <span>{cmsData.headerSubTitle}</span>
            </div>
            <div className="d-flex justify-content-center">
              <div className="py-4">
                <div>
                  <span className="mx-2 any">
                    <i className="far fa-envelope"></i>
                  </span>
                  <span className="anyEmergency">{cmsData.email}</span>
                </div>
                <div>
                  <span className="mx-2 any">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                  <span className="anyEmergency">{cmsData.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container got-emergency-cards">
          <div className="row">
            <div className="col-lg-6 col-md-12 ">
              <div className="card-help-right-contaier">
                <div className="card helpRight">
                  <div className="mb-2 heading">
                    <span className="howIt">
                      {t("Public.ContactUs.Contact_form")}
                    </span>
                    <br />
                  </div>
                  <span>{t("Public.ContactUs.Form_Instruction")}</span>
                  <p className="my-5">{cmsData.contactUs}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 ">
              <div className="form-container">
                <form className="divForm">
                  <div className="row">
                    <div className="col-md-8 col-12">
                      <div className="d-flex divForm-radio justify-content-between my-4">
                        <div className="form-check">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="my-profile-radio-check"
                              id="Ms"
                              value="Ms"
                              checked
                            />
                            <label className="form-check-label">
                              {t("Public.ContactUs.Ms")}
                            </label>
                          </div>
                        </div>
                        <div className="form-check">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="my-profile-radio-check"
                              id="Ms."
                              value="Ms."
                            />
                            <label className="form-check-label">
                              {t("Public.ContactUs.Ms_.")}
                            </label>
                          </div>
                        </div>
                        <div className="form-check">
                          <div>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="my-profile-radio-check"
                              id="Mr."
                              value="Mr."
                            />
                            <label className="form-check-label">
                              {t("Public.ContactUs.Mr.")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="search-bar-text-input mb-4">
                        <label className="form-label">
                          {t("Public.ContactUs.First_Name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="search-bar-text-input mb-4">
                        <label className="form-label">
                          {t("Public.ContactUs.Last_Name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-12">
                      <div className="search-bar-text-input mb-4">
                        <label className="form-label">
                          {t("Public.ContactUs.Mobile_Number")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-12">
                      <div className="search-bar-text-input mb-4">
                        <label className="form-label">
                          {t("Public.ContactUs.Email_Address")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-12">
                      <div className="search-bar-text-input mb-4">
                        <label className="form-label">
                          {t("Public.ContactUs.Message")}
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          rows="3"
                          placeholder="Your Message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn my-4 form-call-btn">
                    {t("Public.ContactUs.Submit")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandingPageFooter />
    </>
  );
};

// class ContactUs extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cmsData: {},
//       languageCode: "",
//     };
//   }

//   componentDidMount() {
//     if (this.props.languageObj?.languageAbbreviation) {
//       const { languageAbbreviation, languageId } = this.props.languageObj;
//       this.setState({ languageCode: languageAbbreviation }, () => {
//         this.getCMSPageData(cmsPageNum.ContactUs, languageId, false);
//       });
//     }
//   }

//   componentDidUpdate() {
//     const langCode = this.props.languageObj?.languageAbbreviation;
//     if (langCode && this.state.languageCode !== langCode) {
//       this.setState({ languageCode: langCode }, () => {
//         this.getCMSPageData(
//           cmsPageNum.ContactUs,
//           this.props.languageObj.languageId,
//           false
//         );
//       });
//     }
//   }

//   getCMSPageData = (pageNum, langId, isAdmin) => {
//     const queryParam = {
//       cMSPagenumber: pageNum,
//       languageId: langId,
//       isAdmin: isAdmin,
//     };
//     promiseWrapper(this.props.comactions.getCMSPage, {
//       query: { ...queryParam },
//     }).then((data) => this.setState({ cmsData: data.data }));
//   };

//   render() {
//     const { cmsData } = this.state;
//     const { t } = this.props;
//     return (
//       <>
//         <LandingPageHeader />
//         <div className="main">
//           <div className="top-banner about-banner">
//             <div className="emergency py-4">
//               <div className="py-4 heading heading-background">
//                 <div>
//                   <span className="anyEmergency">
//                     {t("Public.ContactUs.We_are_here_for_you")}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <span>{cmsData.headerMainTitle}</span>
//               </div>
//               <div className="py-4 heading heading-background">
//                 <div>
//                   <span className="anyEmergency">
//                     {t("Public.ContactUs.Questions_about_company")}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <span>{cmsData.headerSubTitle}</span>
//               </div>
//               <div className="d-flex justify-content-center">
//                 <div className="py-4">
//                   <div>
//                     <span className="mx-2 any">
//                       <i className="far fa-envelope"></i>
//                     </span>
//                     <span className="anyEmergency">{cmsData.email}</span>
//                   </div>
//                   <div>
//                     <span className="mx-2 any">
//                       <i className="fas fa-phone-alt"></i>
//                     </span>
//                     <span className="anyEmergency">{cmsData.phone}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="container got-emergency-cards">
//             <div className="row">
//               <div className="col-lg-6 col-md-12 ">
//                 <div className="card-help-right-contaier">
//                   <div className="card helpRight">
//                     <div className="mb-2 heading">
//                       <span className="howIt">
//                         {t("Public.ContactUs.Contact_form")}
//                       </span>
//                       <br />
//                     </div>
//                     <span>{t("Public.ContactUs.Form_Instruction")}</span>
//                     <p className="my-5">{cmsData.contactUs}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-12 ">
//                 <div className="form-container">
//                   <form className="divForm">
//                     <div className="row">
//                       <div className="col-md-8 col-12">
//                         <div className="d-flex divForm-radio justify-content-between my-4">
//                           <div className="form-check">
//                             <div>
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="my-profile-radio-check"
//                                 id="Ms"
//                                 value="Ms"
//                                 checked
//                               />
//                               <label className="form-check-label">
//                                 {t("Public.ContactUs.Ms")}
//                               </label>
//                             </div>
//                           </div>
//                           <div className="form-check">
//                             <div>
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="my-profile-radio-check"
//                                 id="Ms."
//                                 value="Ms."
//                               />
//                               <label className="form-check-label">
//                                 {t("Public.ContactUs.Ms_.")}
//                               </label>
//                             </div>
//                           </div>
//                           <div className="form-check">
//                             <div>
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="my-profile-radio-check"
//                                 id="Mr."
//                                 value="Mr."
//                               />
//                               <label className="form-check-label">
//                                 {t("Public.ContactUs.Mr.")}
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-6 col-12">
//                         <div className="search-bar-text-input mb-4">
//                           <label className="form-label">
//                             {t("Public.ContactUs.First_Name")}
//                           </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="First Name"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-12">
//                         <div className="search-bar-text-input mb-4">
//                           <label className="form-label">
//                             {t("Public.ContactUs.Last_Name")}
//                           </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Last Name"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-12 col-12">
//                         <div className="search-bar-text-input mb-4">
//                           <label className="form-label">
//                             {t("Public.ContactUs.Mobile_Number")}
//                           </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Mobile Number"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-12 col-12">
//                         <div className="search-bar-text-input mb-4">
//                           <label className="form-label">
//                             {t("Public.ContactUs.Email_Address")}
//                           </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Email Address"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-12 col-12">
//                         <div className="search-bar-text-input mb-4">
//                           <label className="form-label">
//                             {t("Public.ContactUs.Message")}
//                           </label>
//                           <textarea
//                             className="form-control"
//                             id="message"
//                             rows="3"
//                             placeholder="Your Message"
//                           ></textarea>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                   <div className="d-flex justify-content-center">
//                     <button type="submit" className="btn my-4 form-call-btn">
//                       {t("Public.ContactUs.Submit")}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <LandingPageFooter />
//       </>
//     );
//   }
// }

const mapStoreToprops = (state, props) => {
  return { languageObj: state.Exado.language };
};

const mapDispatchToProps = (dispatch) => {
  const comactions = bindActionCreators(exadoActions, dispatch);
  return { comactions };
};

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(ContactUs));
