import React, { useState } from "react";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandingPageHeader from "./landingPageHeader";
import LandingPageFooter from "./landingPageFooter";
import { cmsPageNum, promiseWrapper } from "../../utility/common";
import { withTranslation } from "react-i18next";
import { useEffect } from "react";

const AboutUs = (props) => {
  const [cmsData, setCmsData] = useState({});
  const [languageCode, setLanguagecode] = useState("");

  const { t } = props;

  useEffect(() => {
    if (props.languageObj?.languageAbbreviation) {
      const { languageAbbreviation, languageId } = props.languageObj;
      setLanguagecode(languageAbbreviation);
      getCMSPageData(cmsPageNum.AboutUs, languageId, false);
    }

    const langCode = props.languageObj?.languageAbbreviation;
    if (langCode && languageCode !== langCode) {
      setLanguagecode(langCode, () => {
        getCMSPageData(cmsPageNum.AboutUs, props.languageObj.languageId, false);
      });
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
        <div className="top-banner">
          <div className="emergency py-4">
            <div className="py-4 heading heading-background">
              <div>
                <span className="anyEmergency">
                  {t("Public.AboutUs.About_Exado")}
                </span>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-center">
                <span className="howIt">{t("Public.AboutUs.Home")}</span>
                <span className="any">&nbsp;{t("Public.AboutUs.About")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="container">
            <div className="about-container my-5">
              <div className="row">
                <div className="col-md-6">
                  <h2>{t("Public.AboutUs.About_Exado")}</h2>
                  <p className="about-text">{cmsData.headerMainTitle}</p>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/images/AbooutUsBanner.png"
                    alt="AbooutUsBanner.png"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="row about-us-row">
                <div className="col-md-6">
                  <h2>{t("Public.AboutUs.Our_Mission_&_Vision")}</h2>
                  <p className="about-text">{cmsData.headerSubTitle}</p>
                </div>
                <div className="col-md-6">
                  <img
                    src="assets/images/Group6753.png"
                    alt="Group6753.png"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="notice my-5">
            <div className="">
              <span>{cmsData.midSectionTitle}</span>
            </div>
          </div>
          <div className="container any-emergency">
            <div className="d-flex">
              <div className="row mb-5 mx-2">
                <div className="col-md-12 p-0">
                  <div className="emergency2">
                    <div className="py-4">
                      <h1>{t("Public.AboutUs.Our_Values")}</h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 emergencyCardContainer2">
                  <div className="card emergencyCard2">
                    <div className="emergency-card-top">
                      <div className="emergency-card-image1">
                        <img
                          src="assets/images/Group10674.png"
                          alt="Group10674.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="emergency-card-title">
                        <h5 className="card-title">
                          {t("Public.AboutUs.Honesty")}
                        </h5>
                        <hr className="my-1" />
                      </div>
                    </div>
                    <div className="card-body emergencyCardBody">
                      <p className="card-text emergencyCardText">
                        {cmsData.offlineConsultation}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 emergencyCardContainer2">
                  <div className="card emergencyCard2">
                    <div className="emergency-card-top">
                      <div className="emergency-card-image1">
                        <img
                          src="assets/images/Group10673.png"
                          alt="Group10673.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="emergency-card-title">
                        <h5 className="card-title">
                          {t("Public.AboutUs.Trustworthiness")}
                        </h5>
                        <hr className="my-1" />
                      </div>
                    </div>
                    <div className="card-body emergencyCardBody">
                      <p className="card-text emergencyCardText">
                        {cmsData.onlineConsultation}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 emergencyCardContainer2">
                  <div className="card emergencyCard2">
                    <div className="emergency-card-top">
                      <div className="emergency-card-image1">
                        <img
                          src="assets/images/Group10672.png"
                          alt="Group10672.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="emergency-card-title">
                        <h5 className="card-title">
                          {t("Public.AboutUs.Result_oriented")}
                        </h5>
                        <hr className="my-1" />
                      </div>
                    </div>
                    <div className="card-body emergencyCardBody">
                      <p className="card-text emergencyCardText">
                        {cmsData.chatWithADoctor}
                      </p>
                    </div>
                  </div>
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

// class AboutUs extends React.Component {
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
//         this.getCMSPageData(cmsPageNum.AboutUs, languageId, false);
//       });
//     }
//   }

//   componentDidUpdate() {
//     const langCode = this.props.languageObj?.languageAbbreviation;
//     if (langCode && this.state.languageCode !== langCode) {
//       this.setState({ languageCode: langCode }, () => {
//         this.getCMSPageData(
//           cmsPageNum.AboutUs,
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
//           <div className="top-banner">
//             <div className="emergency py-4">
//               <div className="py-4 heading heading-background">
//                 <div>
//                   <span className="anyEmergency">
//                     {t("Public.AboutUs.About_Exado")}
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <div className="d-flex justify-content-center">
//                   <span className="howIt">{t("Public.AboutUs.Home")}</span>
//                   <span className="any">&nbsp;{t("Public.AboutUs.About")}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="">
//             <div className="container">
//               <div className="about-container my-5">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <h2>{t("Public.AboutUs.About_Exado")}</h2>
//                     <p className="about-text">{cmsData.headerMainTitle}</p>
//                   </div>
//                   <div className="col-md-6">
//                     <img
//                       src="assets/images/AbooutUsBanner.png"
//                       alt="AbooutUsBanner.png"
//                       className="img-fluid"
//                     />
//                   </div>
//                 </div>
//                 <div className="row about-us-row">
//                   <div className="col-md-6">
//                     <h2>{t("Public.AboutUs.Our_Mission_&_Vision")}</h2>
//                     <p className="about-text">{cmsData.headerSubTitle}</p>
//                   </div>
//                   <div className="col-md-6">
//                     <img
//                       src="assets/images/Group6753.png"
//                       alt="Group6753.png"
//                       className="img-fluid"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="notice my-5">
//               <div className="">
//                 <span>{cmsData.midSectionTitle}</span>
//               </div>
//             </div>
//             <div className="container any-emergency">
//               <div className="d-flex">
//                 <div className="row mb-5 mx-2">
//                   <div className="col-md-12 p-0">
//                     <div className="emergency2">
//                       <div className="py-4">
//                         <h1>{t("Public.AboutUs.Our_Values")}</h1>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4 emergencyCardContainer2">
//                     <div className="card emergencyCard2">
//                       <div className="emergency-card-top">
//                         <div className="emergency-card-image1">
//                           <img
//                             src="assets/images/Group10674.png"
//                             alt="Group10674.png"
//                             className="img-fluid"
//                           />
//                         </div>
//                         <div className="emergency-card-title">
//                           <h5 className="card-title">
//                             {t("Public.AboutUs.Honesty")}
//                           </h5>
//                           <hr className="my-1" />
//                         </div>
//                       </div>
//                       <div className="card-body emergencyCardBody">
//                         <p className="card-text emergencyCardText">
//                           {cmsData.offlineConsultation}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4 emergencyCardContainer2">
//                     <div className="card emergencyCard2">
//                       <div className="emergency-card-top">
//                         <div className="emergency-card-image1">
//                           <img
//                             src="assets/images/Group10673.png"
//                             alt="Group10673.png"
//                             className="img-fluid"
//                           />
//                         </div>
//                         <div className="emergency-card-title">
//                           <h5 className="card-title">
//                             {t("Public.AboutUs.Trustworthiness")}
//                           </h5>
//                           <hr className="my-1" />
//                         </div>
//                       </div>
//                       <div className="card-body emergencyCardBody">
//                         <p className="card-text emergencyCardText">
//                           {cmsData.onlineConsultation}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4 emergencyCardContainer2">
//                     <div className="card emergencyCard2">
//                       <div className="emergency-card-top">
//                         <div className="emergency-card-image1">
//                           <img
//                             src="assets/images/Group10672.png"
//                             alt="Group10672.png"
//                             className="img-fluid"
//                           />
//                         </div>
//                         <div className="emergency-card-title">
//                           <h5 className="card-title">
//                             {t("Public.AboutUs.Result_oriented")}
//                           </h5>
//                           <hr className="my-1" />
//                         </div>
//                       </div>
//                       <div className="card-body emergencyCardBody">
//                         <p className="card-text emergencyCardText">
//                           {cmsData.chatWithADoctor}
//                         </p>
//                       </div>
//                     </div>
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
)(withTranslation()(AboutUs));
