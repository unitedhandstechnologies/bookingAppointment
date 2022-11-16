import React from "react";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandingPageHeader from "./landingPageHeader";
import LandingPageFooter from "./landingPageFooter";
import {
  cmsPageNum,
  localStorageKeys,
  promiseWrapper,
  userType,
} from "../../utility/common";
import { withTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";

// const ParentTermandCondition = (props) => {
//   const { t } = props;

//   const [state, setState] = useState([
//     {
//       languageCode: "",
//       TermsNConditionHtml: null,
//       PrivacyPolicyHtml: null,
//       FAQsHtml: null,
//     },
//   ]);

//   useEffect(() => {
//     if (props.languageObj?.languageAbbreviation) {
//       const { languageAbbreviation, languageId } = props.languageObj;
//       setState([...state, { languageCode: languageAbbreviation }]);
//       getCMSPageData(
//         getTnCPageNumber(),
//         languageId,
//         false,
//         "TermsNConditionHtml"
//       );
//       getCMSPageData(
//         cmsPageNum.PrivacyPolicy,
//         languageId,
//         false,
//         "PrivacyPolicyHtml"
//       );
//       getCMSPageData(cmsPageNum.FAQs, languageId, false, "FAQsHtml");
//     }
//     const langCode = props.languageObj?.languageAbbreviation;
//     if (langCode && state.languageCode !== langCode) {
//       setState([...state, { languageCode: langCode }]);
//       getCMSPageData(
//         getTnCPageNumber(),
//         props.languageObj.languageId,
//         false,
//         "TermsNConditionHtml"
//       );
//       getCMSPageData(
//         cmsPageNum.PrivacyPolicy,
//         props.languageObj.languageId,
//         false,
//         "PrivacyPolicyHtml"
//       );
//       getCMSPageData(
//         cmsPageNum.FAQs,
//         props.languageObj.languageId,
//         false,
//         "FAQsHtml"
//       );
//     }
//   }, []);

//   const getCMSPageData = (pageNum, langId, isAdmin,state) => {
//     const queryParam = {
//       cMSPagenumber: pageNum,
//       languageId: langId,
//       isAdmin: isAdmin,
//     };
//     promiseWrapper(props.comactions.getCMSPage, {
//       query: { ...queryParam },
//     }).then(
//       (data) => setState([{ [state]: data.data.htmlDescription }]))
      

//   };

//   const getTnCPageNumber = () => {
//     const user_type = parseInt(localStorage.getItem(localStorageKeys.userType));
//     const login_type = localStorage.getItem(localStorageKeys.loginType);
//     if (user_type === userType.doctor || login_type === userType.login_doctor)
//       return cmsPageNum.TermsNConditionDoctor;
//     else return cmsPageNum.TermsNCondition;
//   };

//   return (
//     <>
//       <LandingPageHeader />
//       <div className="main">
//         <div>
//           <div className="top-banner">
//             <div className="emergency py-4">
//               <div className="py-4 heading heading-background">
//                 <div>
//                   <span className="anyEmergency">
//                     {t("Public.TermsAndConditions.About_Exado")}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="container">
//             <ul
//               className="nav nav-pills nav-justified mb-3"
//               id="pills-tab"
//               role="tablist"
//             >
//               <li className="nav-item" role="presentation">
//                 <a
//                   className="nav-link active"
//                   id="pills-terms-tab"
//                   data-toggle="pill"
//                   href="#pills-terms"
//                   role="tab"
//                   aria-controls="pills-terms"
//                   aria-selected="true"
//                 >
//                   {t("Public.TermsAndConditions.Terms_&_Conditions")}{" "}
//                   {getTnCPageNumber() === cmsPageNum.TermsNConditionDoctor
//                     ? `(${t("Doctor.Doctor")})`
//                     : `(${t("Patient.Patient")})`}
//                 </a>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <a
//                   className="nav-link"
//                   id="pills-privacy-policy-tab"
//                   data-toggle="pill"
//                   href="#pills-privacy-policy"
//                   role="tab"
//                   aria-controls="pills-privacy-policy"
//                   aria-selected="false"
//                 >
//                   {t("Public.TermsAndConditions.Privacy_Policy")}
//                 </a>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <a
//                   className="nav-link"
//                   id="faqs-tab"
//                   data-toggle="pill"
//                   href="#faqs"
//                   role="tab"
//                   aria-controls="faqs"
//                   aria-selected="false"
//                 >
//                   {t("Public.TermsAndConditions.FAQs")}
//                 </a>
//               </li>
//             </ul>
//             <div className="tab-content" id="pills-tabContent">
//               <div
//                 className="tab-pane fade show active"
//                 id="pills-terms"
//                 role="tabpanel"
//                 aria-labelledby="pills-terms-tab"
//                 dangerouslySetInnerHTML={{
//                   __html: state.TermsNConditionHtml,
//                 }}
//               ></div>
//               <div
//                 className="tab-pane fade"
//                 id="pills-privacy-policy"
//                 role="tabpanel"
//                 aria-labelledby="pills-privacy-policy-tab"
//                 dangerouslySetInnerHTML={{
//                   __html: state.PrivacyPolicyHtml,
//                 }}
//               ></div>
//               <div
//                 className="tab-pane fade"
//                 id="faqs"
//                 role="tabpanel"
//                 aria-labelledby="faqs-tab"
//                 dangerouslySetInnerHTML={{ __html: state.FAQsHtml }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <LandingPageFooter />
//     </>
//   );
// };
class ParentTermandCondition extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        languageCode: "",
        TermsNConditionHtml: null,
        PrivacyPolicyHtml: null,
        FAQsHtml: null,
      };
    }

    componentDidMount() {
      if (this.props.languageObj?.languageAbbreviation) {
        const { languageAbbreviation, languageId } = this.props.languageObj;
        this.setState({ languageCode: languageAbbreviation }, () => {
          this.getCMSPageData(
            this.getTnCPageNumber(),
            languageId,
            false,
            "TermsNConditionHtml"
          );
          this.getCMSPageData(
            cmsPageNum.PrivacyPolicy,
            languageId,
            false,
            "PrivacyPolicyHtml"
          );
          this.getCMSPageData(cmsPageNum.FAQs, languageId, false, "FAQsHtml");
        });
      }
    }

    componentDidUpdate() {
      const langCode = this.props.languageObj?.languageAbbreviation;
      if (langCode && this.state.languageCode !== langCode) {
        this.setState({ languageCode: langCode }, () => {
          this.getCMSPageData(
            this.getTnCPageNumber(),
            this.props.languageObj.languageId,
            false,
            "TermsNConditionHtml"
          );
          this.getCMSPageData(
            cmsPageNum.PrivacyPolicy,
            this.props.languageObj.languageId,
            false,
            "PrivacyPolicyHtml"
          );
          this.getCMSPageData(
            cmsPageNum.FAQs,
            this.props.languageObj.languageId,
            false,
            "FAQsHtml"
          );
        });
      }
    }

    getCMSPageData = (pageNum, langId, isAdmin, state) => {
      const queryParam = {
        cMSPagenumber: pageNum,
        languageId: langId,
        isAdmin: isAdmin,
      };
      promiseWrapper(this.props.comactions.getCMSPage, {
        query: { ...queryParam },
      }).then((data) => this.setState({ [state]: data.data.htmlDescription }));
    };

    getTnCPageNumber = () => {
      const user_type = parseInt(localStorage.getItem(localStorageKeys.userType));
      const login_type = localStorage.getItem(localStorageKeys.loginType);
      if (user_type === userType.doctor || login_type === userType.login_doctor)
        return cmsPageNum.TermsNConditionDoctor;
      else return cmsPageNum.TermsNCondition;
    };

    render() {
      const { t } = this.props;

      return (
        <>
          <LandingPageHeader />
          <div className="main">
            <div>
              <div className="top-banner">
                <div className="emergency py-4">
                  <div className="py-4 heading heading-background">
                    <div>
                      <span className="anyEmergency">
                        {t("Public.TermsAndConditions.About_Exado")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <ul
                  className="nav nav-pills nav-justified mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="pills-terms-tab"
                      data-toggle="pill"
                      href="#pills-terms"
                      role="tab"
                      aria-controls="pills-terms"
                      aria-selected="true"
                    >
                      {t("Public.TermsAndConditions.Terms_&_Conditions")}{" "}
                      {this.getTnCPageNumber() ===
                      cmsPageNum.TermsNConditionDoctor
                        ? `(${t("Doctor.Doctor")})`
                        : `(${t("Patient.Patient")})`}
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="pills-privacy-policy-tab"
                      data-toggle="pill"
                      href="#pills-privacy-policy"
                      role="tab"
                      aria-controls="pills-privacy-policy"
                      aria-selected="false"
                    >
                      {t("Public.TermsAndConditions.Privacy_Policy")}
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="faqs-tab"
                      data-toggle="pill"
                      href="#faqs"
                      role="tab"
                      aria-controls="faqs"
                      aria-selected="false"
                    >
                      {t("Public.TermsAndConditions.FAQs")}
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-terms"
                    role="tabpanel"
                    aria-labelledby="pills-terms-tab"
                    dangerouslySetInnerHTML={{
                      __html: this.state.TermsNConditionHtml,
                    }}
                  ></div>
                  <div
                    className="tab-pane fade"
                    id="pills-privacy-policy"
                    role="tabpanel"
                    aria-labelledby="pills-privacy-policy-tab"
                    dangerouslySetInnerHTML={{
                      __html: this.state.PrivacyPolicyHtml,
                    }}
                  ></div>
                  <div
                    className="tab-pane fade"
                    id="faqs"
                    role="tabpanel"
                    aria-labelledby="faqs-tab"
                    dangerouslySetInnerHTML={{ __html: this.state.FAQsHtml }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <LandingPageFooter />
        </>
      );
    }
  }

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
)(withTranslation()(ParentTermandCondition));
