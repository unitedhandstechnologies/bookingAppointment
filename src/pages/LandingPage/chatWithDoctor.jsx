import React from "react";
import exadoActions from "../../redux/exado/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandingPageHeader from "./landingPageHeader";
import LandingPageFooter from "./landingPageFooter";
import { cmsPageNum, promiseWrapper } from "../../utility/common";
import { withTranslation } from "react-i18next";

class ChatWithDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmsData: {},
      languageCode: "",
    };
  }

  componentDidMount() {
    if (this.props.languageObj?.languageAbbreviation) {
      const { languageAbbreviation, languageId } = this.props.languageObj;
      this.setState({ languageCode: languageAbbreviation }, () => {
        this.getCMSPageData(cmsPageNum.ChatWithDoctors, languageId, false);
      });
    }
  }

  componentDidUpdate() {
    const langCode = this.props.languageObj?.languageAbbreviation;
    if (langCode && this.state.languageCode !== langCode) {
      this.setState({ languageCode: langCode }, () => {
        this.getCMSPageData(
          cmsPageNum.ChatWithDoctors,
          this.props.languageObj.languageId,
          false
        );
      });
    }
  }

  getCMSPageData = (pageNum, langId, isAdmin) => {
    const queryParam = {
      cMSPagenumber: pageNum,
      languageId: langId,
      isAdmin: isAdmin,
    };
    promiseWrapper(this.props.comactions.getCMSPage, {
      query: { ...queryParam },
    }).then((data) => this.setState({ cmsData: data.data }));
  };

  render() {
    const { cmsData } = this.state;
    const { t } = this.props;
    return (
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
                          {t("Public.ChatWithDoctor.Chat_with_Doctor")}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-center">
                        <span className="howIt">
                          {t("Public.ChatWithDoctor.Home")}
                        </span>
                        <span className="any">
                          &nbsp;{t("Public.ChatWithDoctor.Chat_with_Doctor")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
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
                      {t("Public.ChatWithDoctor.Experts")}
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
                      {t("Public.ChatWithDoctor.Countries")}
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
                      {t("Public.ChatWithDoctor.Live_Patients")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container got-emergency-cards">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="card helpRight">
                    <div className="mb-2 heading d-flex justify-content-center">
                      <span className="howIt">
                        {t("Public.ChatWithDoctor.How_it")}&nbsp;
                      </span>
                      <span className="works">
                        {" "}
                        {t("Public.ChatWithDoctor.works")}
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
                          src="assets/images/Group6976.png"
                          className="img-fluid"
                          alt="Responsive img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-container">
                    <form className="got-emergency-form">
                      <label className="mb-2">
                        {t("Public.ChatWithDoctor.Select_medical_speciality")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Dentist"
                        />
                      </div>
                      <label className="mb-2">
                        {t("Public.ChatWithDoctor.Describe_symptoms")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <textarea
                          className="form-control "
                          id=""
                          rows="4"
                          placeholder="Describe problem or symptoms (Up to 100 Words)"
                        ></textarea>
                      </div>
                      <label className="mb-2">
                        <div>{t("Public.ChatWithDoctor.Since_when")}</div>
                        <div>
                          {t("Public.ChatWithDoctor.for_example_hours")}
                        </div>
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Since..."
                        />
                      </div>
                      <label className="mb-2">
                        {t("Public.ChatWithDoctor.medication_or_treatment")}
                      </label>
                      <div className="search-bar-text-input mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Any medication or treatment..."
                        />
                      </div>
                      <label className="mb-2">
                        {t("Public.ChatWithDoctor.already_given_diagnosis")}
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
                          {t("Public.ChatWithDoctor.Attach_Documents")}
                          <input type="file" hidden />
                        </label>
                      </div>
                    </form>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="form-text-left">
                        <div>
                          {t(
                            "Public.ChatWithDoctor.Chat_anonymously_for_sensitive_topics"
                          )}
                        </div>
                        <div className="text-muted">
                          {t(
                            "Public.ChatWithDoctor.Dr_can_see_Profile_and_diagnosis_history"
                          )}
                        </div>
                      </div>
                      <div className="form-text-right mt-3">
                        <div>
                          <input type="checkbox" id="form-toggle" />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <div className="form-text-left">
                        <div className="charge">€20</div>
                        <div className="per-consultation">
                          {t("Public.ChatWithDoctor.Per_Consultation")}
                        </div>
                      </div>
                      <div className="form-text-right mt-3">
                        <div>{t("Public.ChatWithDoctor.Wallet_Balance")}</div>
                        <div className="balance">€ 100.00</div>
                        <div className="add-balance">
                          {t("Public.ChatWithDoctor.Add_funds")}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn my-4 form-call-btn">
                        {t("Public.ChatWithDoctor.Book_Chat")}
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
    );
  }
}

function mapStoreToprops(state, props) {
  return { languageObj: state.Exado.language };
}

function mapDispatchToProps(dispatch) {
  const comactions = bindActionCreators(exadoActions, dispatch);
  return { comactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(ChatWithDoctor));
