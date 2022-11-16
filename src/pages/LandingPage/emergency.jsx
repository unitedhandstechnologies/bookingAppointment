import React, { useState } from "react";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandingPageHeader from "./landingPageHeader";
import LandingPageFooter from "./landingPageFooter";
import { withTranslation } from "react-i18next";
import { cmsPageNum, promiseWrapper } from "../../utility/common";
import { useEffect } from "react";

const Emergency = (props) => {
  const [cmsData, setCmsData] = useState({});
  const [languageCode, setLanguageCode] = useState("");
  const { t } = props;

  useEffect(() => {
    if (props.languageObj?.languageAbbreviation) {
      const { languageAbbreviation, languageId } = props.languageObj;
      setLanguageCode(languageAbbreviation);
      getCMSPageData(cmsPageNum.Emergency, languageId, false);
    }

    const langCode = props.languageObj?.languageAbbreviation;
    if (langCode && languageCode !== langCode) {
      setLanguageCode(langCode);
      getCMSPageData(
        cmsPageNum.Emergency,
        props.languageObj.languageId,
        false
      );
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
      <div>
        <LandingPageHeader />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="top-banner">
                  <div className="emergency py-5">
                    <div className="py-4 heading heading-background">
                      <div>
                        <span className="anyEmergency">
                          {t("Public.Emergency.Emergency_Consultation")}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-center">
                        <span className="howIt">
                          {t("Public.Emergency.Home")}
                        </span>
                        <span className="any">
                          &nbsp;{t("Public.Emergency.Emergency_Consultation")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container performance-cards">
              <div className="performance-card mt-2">
                <div className="card-image">
                  <img
                    src="assets/images/Group7206.png"
                    className="img-fluid"
                    alt="Responsive img"
                  />
                </div>
                <div className="performance-card-text">
                  <div className="card-count">150+</div>
                  <div className="card-text mt-2">
                    {t("Public.Emergency.Experts")}
                  </div>
                </div>
              </div>
              <div className="performance-card mt-2">
                <div className="card-image">
                  <img
                    src="assets/images/Group7207.png"
                    className="img-fluid"
                    alt="Responsive img"
                  />
                </div>
                <div className="performance-card-text">
                  <div className="card-count">15</div>
                  <div className="card-text mt-2">
                    {t("Public.Emergency.Countries")}
                  </div>
                </div>
              </div>
              <div className="performance-card mt-2">
                <div className="card-image">
                  <img
                    src="assets/images/Group7208.png"
                    className="img-fluid"
                    alt="Responsive img"
                  />
                </div>
                <div className="performance-card-text">
                  <div className="card-count">950+</div>
                  <div className="card-text mt-2">
                    {t("Public.Emergency.Live_Patients")}
                  </div>
                </div>
              </div>
            </div>
            <div className="container got-emergency-cards">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="card helpRight">
                    <div className="mb-2 heading d-flex justify-content-center">
                      <span className="howIt">
                        {t("Public.Emergency.How_it")}&nbsp;
                      </span>
                      <span className="works">
                        {" "}
                        {t("Public.Emergency.works")}
                      </span>
                    </div>
                    <div className="helpRightContainer">
                      <div className="helpRightText mb-3 d-flex align-items-center">
                        <div className="count mr-3">1</div>
                        <div className="text">{cmsData.howItWorksStep1}</div>
                      </div>
                      <div className="helpRightText mb-3 d-flex align-items-center">
                        <div className="count mr-3">2</div>
                        <div className="text">{cmsData.howItWorksStep2}</div>
                      </div>
                      <div className="helpRightText mb-3 d-flex align-items-center">
                        <div className="count mr-3">3</div>
                        <div className="text">{cmsData.howItWorksStep3}</div>
                      </div>
                      <div className="helpRightText mb-3 d-flex align-items-center">
                        <div className="count mr-3">4</div>
                        <div className="text">{cmsData.howItWorksStep4}</div>
                      </div>
                      <div className="helpRightText mb-3 d-flex align-items-center">
                        <div className="count mr-3">5</div>
                        <div className="text">{cmsData.howItWorksStep5}</div>
                      </div>
                      <div className=" helpRight-image">
                        <img
                          src="assets/images/Group7201.png"
                          className="img-fluid"
                          alt="Responsive img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="form-container">
                    <form className="got-emergency-form">
                      <label className="mb-2">
                        {t("Public.Emergency.Select_medical_speciality")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Dentist"
                        />
                      </div>
                      <label className="mb-2">
                        {t("Public.Emergency.Describe_problem_or_symptoms")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <textarea
                          className="form-control "
                          id=""
                          rows="7"
                          placeholder="Describe problem or symptoms (Up to 100 Words)"
                        ></textarea>
                      </div>
                      <label className="mb-2">
                        {t("Public.Emergency.Since_when")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Since..."
                        />
                      </div>
                      <label className="mb-2">
                        {t("Public.Emergency.Is_any_medication")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Any medication or treatment..."
                        />
                      </div>
                      <label className="mb-2">
                        {t("Public.Emergency.has_already_diagnosis")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="If any"
                        />
                      </div>
                      <div>
                        <label className="btn form-file-upload-btn btn-default w-100">
                          {t("Public.Emergency.Attach_Documents")}
                          <input type="file" hidden />
                        </label>
                      </div>
                    </form>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="form-text-left">
                        <div className="charge">€20</div>
                        <div className="per-consultation">
                          {t("Public.Emergency.Per_Consultation")}
                        </div>
                      </div>
                      <div className="form-text-right mt-3">
                        <div>{t("Public.Emergency.Wallet_Balance")}</div>
                        <div className="balance">€ 100.00</div>
                        <div className="add-balance">
                          {t("Public.Emergency.Add_Balance")}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn my-4 form-call-btn">
                        {t("Public.Emergency.Call")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LandingPageFooter />
      </div>
    </>
  );
};

// class Emergency extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         cmsData: {},
//         languageCode: "",
//       };
//     }
  
//     componentDidMount() {
//       if (this.props.languageObj?.languageAbbreviation) {
//         const { languageAbbreviation, languageId } = this.props.languageObj;
//         this.setState({ languageCode: languageAbbreviation }, () => {
//           this.getCMSPageData(cmsPageNum.Emergency, languageId, false);
//         });
//       }
//     }
  
//     componentDidUpdate() {
//       const langCode = this.props.languageObj?.languageAbbreviation;
//       if (langCode && this.state.languageCode !== langCode) {
//         this.setState({ languageCode: langCode }, () => {
//           this.getCMSPageData(
//             cmsPageNum.Emergency,
//             this.props.languageObj.languageId,
//             false
//           );
//         });
//       }
//     }
  
//     getCMSPageData = (pageNum, langId, isAdmin) => {
//       const queryParam = {
//         cMSPagenumber: pageNum,
//         languageId: langId,
//         isAdmin: isAdmin,
//       };
//       promiseWrapper(this.props.comactions.getCMSPage, {
//         query: { ...queryParam },
//       }).then((data) => this.setState({ cmsData: data.data }));
//     };
  
//     render() {
//       const { cmsData } = this.state;
//       const { t } = this.props;
//       return (
//         <div>
//           <LandingPageHeader />
//           <div className="main">
//             <div className="container-fluid">
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="top-banner">
//                     <div className="emergency py-5">
//                       <div className="py-4 heading heading-background">
//                         <div>
//                           <span className="anyEmergency">
//                             {t("Public.Emergency.Emergency_Consultation")}
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="d-flex justify-content-center">
//                           <span className="howIt">
//                             {t("Public.Emergency.Home")}
//                           </span>
//                           <span className="any">
//                             &nbsp;{t("Public.Emergency.Emergency_Consultation")}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="container performance-cards">
//                 <div className="performance-card mt-2">
//                   <div className="card-image">
//                     <img
//                       src="assets/images/Group7206.png"
//                       className="img-fluid"
//                       alt="Responsive img"
//                     />
//                   </div>
//                   <div className="performance-card-text">
//                     <div className="card-count">150+</div>
//                     <div className="card-text mt-2">
//                       {t("Public.Emergency.Experts")}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="performance-card mt-2">
//                   <div className="card-image">
//                     <img
//                       src="assets/images/Group7207.png"
//                       className="img-fluid"
//                       alt="Responsive img"
//                     />
//                   </div>
//                   <div className="performance-card-text">
//                     <div className="card-count">15</div>
//                     <div className="card-text mt-2">
//                       {t("Public.Emergency.Countries")}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="performance-card mt-2">
//                   <div className="card-image">
//                     <img
//                       src="assets/images/Group7208.png"
//                       className="img-fluid"
//                       alt="Responsive img"
//                     />
//                   </div>
//                   <div className="performance-card-text">
//                     <div className="card-count">950+</div>
//                     <div className="card-text mt-2">
//                       {t("Public.Emergency.Live_Patients")}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="container got-emergency-cards">
//                 <div className="row">
//                   <div className="col-md-6 col-12">
//                     <div className="card helpRight">
//                       <div className="mb-2 heading d-flex justify-content-center">
//                         <span className="howIt">
//                           {t("Public.Emergency.How_it")}&nbsp;
//                         </span>
//                         <span className="works">
//                           {" "}
//                           {t("Public.Emergency.works")}
//                         </span>
//                       </div>
//                       <div className="helpRightContainer">
//                         <div className="helpRightText mb-3 d-flex align-items-center">
//                           <div className="count mr-3">1</div>
//                           <div className="text">{cmsData.howItWorksStep1}</div>
//                         </div>
//                         <div className="helpRightText mb-3 d-flex align-items-center">
//                           <div className="count mr-3">2</div>
//                           <div className="text">{cmsData.howItWorksStep2}</div>
//                         </div>
//                         <div className="helpRightText mb-3 d-flex align-items-center">
//                           <div className="count mr-3">3</div>
//                           <div className="text">{cmsData.howItWorksStep3}</div>
//                         </div>
//                         <div className="helpRightText mb-3 d-flex align-items-center">
//                           <div className="count mr-3">4</div>
//                           <div className="text">{cmsData.howItWorksStep4}</div>
//                         </div>
//                         <div className="helpRightText mb-3 d-flex align-items-center">
//                           <div className="count mr-3">5</div>
//                           <div className="text">{cmsData.howItWorksStep5}</div>
//                         </div>
//                         <div className=" helpRight-image">
//                           <img
//                             src="assets/images/Group7201.png"
//                             className="img-fluid"
//                             alt="Responsive img"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 col-12">
//                     <div className="form-container">
//                       <form className="got-emergency-form">
//                         <label className="mb-2">
//                           {t("Public.Emergency.Select_medical_speciality")}
//                         </label>
//                         <div className="search-bar-text-input mb-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Dentist"
//                           />
//                         </div>
//                         <label className="mb-2">
//                           {t("Public.Emergency.Describe_problem_or_symptoms")}
//                         </label>
//                         <div className="search-bar-text-input mb-3">
//                           <textarea
//                             className="form-control "
//                             id=""
//                             rows="7"
//                             placeholder="Describe problem or symptoms (Up to 100 Words)"
//                           ></textarea>
//                         </div>
//                         <label className="mb-2">
//                           {t("Public.Emergency.Since_when")}
//                         </label>
//                         <div className="search-bar-text-input mb-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Since..."
//                           />
//                         </div>
//                         <label className="mb-2">
//                           {t("Public.Emergency.Is_any_medication")}
//                         </label>
//                         <div className="search-bar-text-input mb-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Any medication or treatment..."
//                           />
//                         </div>
//                         <label className="mb-2">
//                           {t("Public.Emergency.has_already_diagnosis")}
//                         </label>
//                         <div className="search-bar-text-input mb-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="If any"
//                           />
//                         </div>
//                         <div>
//                           <label className="btn form-file-upload-btn btn-default w-100">
//                             {t("Public.Emergency.Attach_Documents")}
//                             <input type="file" hidden />
//                           </label>
//                         </div>
//                       </form>
//                       <div className="d-flex justify-content-between mt-3">
//                         <div className="form-text-left">
//                           <div className="charge">€20</div>
//                           <div className="per-consultation">
//                             {t("Public.Emergency.Per_Consultation")}
//                           </div>
//                         </div>
//                         <div className="form-text-right mt-3">
//                           <div>{t("Public.Emergency.Wallet_Balance")}</div>
//                           <div className="balance">€ 100.00</div>
//                           <div className="add-balance">
//                             {t("Public.Emergency.Add_Balance")}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="d-flex justify-content-center">
//                         <button type="submit" className="btn my-4 form-call-btn">
//                           {t("Public.Emergency.Call")}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <LandingPageFooter />
//         </div>
//       );
//     }
//   }
  


const mapStoreToprops=(state, props)=> {
  return { languageObj: state.Exado.language };
}

const mapDispatchToProps=(dispatch)=> {
  const comactions = bindActionCreators(exadoActions, dispatch);
  return { comactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(Emergency));
