import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import exadoDocActions from "../../redux/exadoDoc/action";
import {
  appointmentType,
  cmsPageNum,
  promiseWrapper,
} from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LandingPageHeader from "./landingPageHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import LandingPageFooter from "./landingPageFooter";
import exadoPatientActions from "../../redux/exadoPatient/action";
import exadoActions from "../../redux/exado/action";

//Owl Carousel Settings
const optionsTest = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  loop: true,
  autoplay: false,
  navText: [
    "<i className='fas fa-chevron-circle-left'></i>",
    "<i className='fas fa-chevron-circle-right'></i>",
  ],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};

const specialist = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  loop: true,
  autoplay: false,
  navText: [
    "<i className='fas fa-chevron-circle-left'></i>",
    "<i className='fas fa-chevron-circle-right'></i>",
  ],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1000: {
      items: 6,
    },
  },
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmsData: {},
      languageCode: "",
      doctorList: [],
    };
  }

  componentDidMount() {
    if (this.props.languageObj?.languageAbbreviation) {
      const { languageAbbreviation, languageId } = this.props.languageObj;
      this.setState({ languageCode: languageAbbreviation }, () => {
        this.getCMSPageData(cmsPageNum.HomePage, languageId, false);
        this.getDoctorData();
      });
    }
  }

  componentDidUpdate() {
    const langCode = this.props.languageObj?.languageAbbreviation;
    if (langCode && this.state.languageCode !== langCode) {
      this.setState({ languageCode: langCode }, () => {
        this.getCMSPageData(
          cmsPageNum.HomePage,
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
    }).then((data) => this.setState({ cmsData: data.data.result }));
  };

  getDoctorData = () => {
    const appointmentModel = {
      appDate: new Date().toISOString().split("T")[0],
      location: "",
      physicianService: [],
      isMale: 0,
      languageId: [],
      appointmentType: appointmentType.InClinic,
    };
    promiseWrapper(this.props.patientactions.searchAppointment, {
      appointmentModel,
    })
      .then((data) => {
        const sortData = data.sort((a, b) =>
          a.averageReview > b.averageReview
            ? -1
            : a.averageReview < b.averageReview
            ? 1
            : 0
        );
        this.setState({ doctorList: sortData });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { cmsData, doctorList } = this.state;
    const { t } = this.props;

    return (
      <div>
        <LandingPageHeader />
        <section className="header-content">
          <div className="container header-content-container">
            <h1>{cmsData.headerMainTitle}</h1>
            <p>{cmsData.headerSubTitle}</p>
            <div className="formcontent">
              <div className="row formcontent-row">
                <div className="col-lg-2 col-md-3 dropdown-col">
                  <div className="dropdown">
                    <button
                      className=" dropdown-toggle header-content-dropdown-button"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-map-marker-alt"></i>Banglore
                    </button>
                    <div
                      className="dropdown-menu city-dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button className="dropdown-item">Action</button>
                      <button className="dropdown-item">Another action</button>
                      <button className="dropdown-item">
                        Something else here
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 search-col">
                  <div className="form-group search-doctor-group">
                    <input
                      type="text"
                      className="form-control search-doctor-input"
                      id="exampleInputPassword1"
                      placeholder={t("Public.LandingPage.Search_Doctors")}
                    />
                  </div>
                  <div className="search-doctor-btn-container text-center">
                    <i className="fas fa-search search-doctor-icon-btn"></i>
                    <span className="search-doctor-icon-text">
                      {t("Public.LandingPage.Find_Doctor")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="type-consultation-section">
          <div className="container">
            <h1>{t("Public.LandingPage.Type_of_consultations")}</h1>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-heading">
                      <div className="consultation-icon">
                        <img
                          src="assets/images/Group9268.png"
                          alt="Group9268.png"
                          className="img-fliud"
                        />
                      </div>
                      <div className="consultation-icon-title">
                        <h5 className="card-title">
                          {t("Public.LandingPage.Offline_Consultation")}
                        </h5>
                        <hr className="my-1" />
                      </div>
                    </div>
                    <p className="card-text">{cmsData.offlineConsultation}</p>
                    <div className="link-container">
                      <Link
                        className="consult-now-link"
                        to="/book-an-appoinment"
                      >
                        {t("Public.LandingPage.Consult_now")}
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-heading">
                      <div className="consultation-icon">
                        <img
                          src="assets/images/Group9287.png"
                          alt="Group9287.png"
                          className="img-fliud"
                        />
                      </div>
                      <div className="consultation-icon-title">
                        <h5 className="card-title">
                          {t("Public.LandingPage.Online_Consultation")}
                        </h5>
                        <hr className="my-1" />
                      </div>
                    </div>
                    <p className="card-text">{cmsData.onlineConsultation}</p>
                    <div className="link-container">
                      <a className="consult-now-link">
                        {t("Public.LandingPage.Consult_now")}
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="card-heading">
                      <div className="consultation-icon">
                        <img
                          src="assets/images/Group9288.png"
                          alt="Group9288.png"
                          className="img-fliud"
                        />
                      </div>
                      <div className="consultation-icon-title">
                        <h5 className="card-title">
                          {t("Public.LandingPage.Chat_with_a_Doctor")}
                        </h5>
                        <hr className="my-1" />
                      </div>
                    </div>
                    <p className="card-text">{cmsData.chatWithADoctor}</p>
                    <div className="link-container">
                      <a className="consult-now-link">
                        {t("Public.LandingPage.Consult_now")}
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="notice">
          <div className="">
            <span>{cmsData.midSectionTitle}</span>
          </div>
        </div>
        <div className="container my-5" id="how-it-works">
          <div className="row">
            <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
              <div className="card helpLeft">
                <img
                  src="assets/images/Group5821.png"
                  className="img-fluid mt-5"
                  alt="Group5821.png"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="card helpRight">
                <div className="mb-3 heading">
                  <span className="howIt">
                    {t("Public.LandingPage.How_it")}
                  </span>
                  <span className="works">
                    &nbsp;{t("Public.LandingPage.works")}
                  </span>
                </div>
                <div className="helpRightContainer">
                  <div className="helpRightText mb-3 d-flex align-items-center">
                    <div className="count mr-3">
                      {t("Public.LandingPage.1")}
                    </div>
                    <div className="text">{cmsData.howItWorksStep1}</div>
                  </div>
                  <div className="helpRightText mb-3 d-flex align-items-center">
                    <div className="count mr-3">
                      {t("Public.LandingPage.2")}
                    </div>
                    <div className="text">{cmsData.howItWorksStep2}</div>
                  </div>
                  <div className="helpRightText mb-3 d-flex align-items-center">
                    <div className="count mr-3">
                      {t("Public.LandingPage.3")}
                    </div>
                    <div className="text">{cmsData.howItWorksStep3}</div>
                  </div>
                  <div className="helpRightText mb-3 d-flex align-items-center">
                    <div className="count mr-3">
                      {t("Public.LandingPage.4")}
                    </div>
                    <div className="text">{cmsData.howItWorksStep4}</div>
                  </div>
                  <div className="helpRightText mb-3 d-flex align-items-center">
                    <div className="count mr-3">
                      {t("Public.LandingPage.5")}
                    </div>
                    <div className="text">{cmsData.howItWorksStep5}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="consult2 mb-5">
            <div className="container">
              <div className="row my-3">
                <div className="py-4 heading">
                  <h1>
                    {t("Public.LandingPage.Consult_Top_Health_Specialist")}
                  </h1>
                </div>
                <OwlCarousel
                  {...specialist}
                  className="consultSlider2 d-flex owl-carousel"
                  id="consult-slide-effect"
                >
                  <div className="box">
                    <div className="card-deck my-4">
                      <img
                        src="assets/images/Pediatrician.png"
                        alt="Pediatrician.png"
                        className="img-fluid"
                      />
                      <span>{t("Public.LandingPage.Pediatrician")}</span>
                    </div>
                  </div>
                  <div className="box">
                    <div className="card-deck my-4">
                      <img
                        src="assets/images/Dentist.png"
                        alt="Dentist.png"
                        className="img-fluid"
                      />
                      <span>{t("Public.LandingPage.Dentist")}</span>
                    </div>
                  </div>
                  <div className="box">
                    <div className="card-deck my-4">
                      <img
                        src="assets/images/ophthalmologist.png"
                        alt="ophthalmologist.png"
                        className="img-fluid"
                      />
                      <span>{t("Public.LandingPage.Ophthalmologist")}</span>
                    </div>
                  </div>
                  <div className="box">
                    <div className="card-deck my-4">
                      <img
                        src="assets/images/Neurosurgeon.png"
                        alt="Neurosurgeon.png"
                        className="img-fluid"
                      />
                      <span>{t("Public.LandingPage.Neurosurgeon")}</span>
                    </div>
                  </div>
                  <div className="box">
                    <div className="card-deck my-4">
                      <img
                        src="assets/images/Group9246.png"
                        alt="Group9246.png"
                        className="img-fluid"
                      />
                      <span>{t("Public.LandingPage.Cardiologist")}</span>
                    </div>
                  </div>
                  <div className="box">
                    <div className="card-deck my-4">
                      <img
                        src="assets/images/neurologist.png"
                        alt="neurologist.png"
                        className="img-fluid"
                      />
                      <span>{t("Public.LandingPage.Neurologist")}</span>
                    </div>
                  </div>
                </OwlCarousel>
                <div className="consult-btn">
                  <Link className="btn" to="/book-an-appoinment">
                    {t("Public.LandingPage.View_All_Docotrs")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container any-emergency">
          <div className="d-flex">
            <div className="row mb-5 mx-2">
              <div className="col-md-12 p-0">
                <div className="emergency2">
                  <div className="py-4">
                    <h1>{t("Public.LandingPage.Any_Emergency_?")}</h1>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 emergencyCardContainer2">
                <div className="card emergencyCard2">
                  <div className="arrow"></div>
                  <div className="emergency-card-top">
                    <div className="emergency-card-image">
                      <img
                        src="assets/images/Click.png"
                        alt="Click.png"
                        className="img-fluid"
                      />
                    </div>
                    <div className="emergency-card-title">
                      <h5 className="card-title">
                        {t("Public.LandingPage.Online_Consultation")}
                      </h5>
                      <hr className="my-1" />
                    </div>
                  </div>
                  <div className="card-body emergencyCardBody">
                    <p className="card-text emergencyCardText">
                      {cmsData.emergencyOnlineConsultation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 emergencyCardContainer2">
                <div className="card emergencyCard2">
                  <div className="arrow"></div>
                  <div className="emergency-card-top">
                    <div className="emergency-card-image">
                      <img
                        src="assets/images/Describe.png"
                        alt="Describe.png"
                        className="img-fluid"
                      />
                    </div>
                    <div className="emergency-card-title">
                      <h5 className="card-title">
                        {t("Public.LandingPage.Describe_in-short")}
                      </h5>
                      <hr className="my-1" />
                    </div>
                  </div>
                  <div className="card-body emergencyCardBody">
                    <p className="card-text emergencyCardText">
                      {cmsData.describeInShort}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 emergencyCardContainer2">
                <div className="card emergencyCard2">
                  <div className="emergency-card-top">
                    <div className="emergency-card-image">
                      <img
                        src="assets/images/Talk.png"
                        alt="Talk.png"
                        className="img-fluid"
                      />
                    </div>
                    <div className="emergency-card-title">
                      <h5 className="card-title">
                        {t("Public.LandingPage.Talk_with_Doctor")}
                      </h5>
                      <hr className="my-1" />
                    </div>
                  </div>
                  <div className="card-body emergencyCardBody">
                    <p className="card-text emergencyCardText">
                      {cmsData.talkwithDoctor}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 p-0">
                <div className="emergency2">
                  <div className="emergency-btn d-flex justify-content-center my-4">
                    <Link className="btn" role="button" to="/emergency">
                      {t("Public.LandingPage.Book_Emergency")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="top-doctors">
          <div className="container top-doctors-container">
            <div className="py-4 heading d-flex justify-content-between align-items-center">
              <h1>{t("Public.LandingPage.Top_Doctors")}</h1>
            </div>
            {doctorList.length > 0 && (
              <OwlCarousel
                {...optionsTest}
                className="top-doctor-boxes d-flex owl-carousel"
                id="top-doctor-slide-effect"
              >
                {
                  doctorList.map((doctorData, i1) => (
                    <div className="box" key={i1}>
                      <div className="card-deck my-4">
                        <div className="dotor-item-container">
                          <div className="doctor-item-left">
                            <img
                              src={doctorData.doctorImage}
                              alt="doctor logo"
                              className="img-fluid top-doctor-image"
                            />
                          </div>
                          <div className="doctor-item-right">
                            <Link
                              to={`/doctor/book-an-appoinment-doc-detail/${doctorData.doctorGuid}`}
                              className="doctor-name-link"
                            >
                              {doctorData.firstName} {doctorData.lastName}
                            </Link>
                            {doctorData.physicianServices.map(
                              (serviceName, i2) => (
                                <span className="doctor-designation" key={i2}>
                                  {serviceName}
                                </span>
                              )
                            )}
                            <div>
                              <span className="doctor-rating">
                                {" "}
                                <img
                                  src="assets/images/Star.png"
                                  alt="Star.png"
                                  className="star-img img-fluid"
                                />
                                {doctorData.averageReview} (
                                {doctorData.totalReview})
                              </span>
                            </div>
                            <div>
                              <span className="doctor-year">
                                {doctorData.experience}{" "}
                                {t("Public.LandingPage.years")}{" "}
                              </span>
                              <span className="doctor-exp">
                                {t("Public.LandingPage.of_experience")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="doctor-boxes-btn mt-4">
                          <button
                            type="button"
                            className="btn doctor-boxes-btn1"
                          >
                            {t("Public.LandingPage.Chat_with_Doctor")}
                          </button>
                          <Link
                            to={`/doctor/book-an-appoinment-doc-detail/${doctorData.doctorGuid}`}
                            className="btn doctor-boxes-btn2"
                          >
                            {t("Public.LandingPage.View_Availability")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                  // <div className="box">
                  //     <div className="card-deck my-4">
                  //         <div className="dotor-item-container">
                  //             <div className="doctor-item-left">
                  //                 <img src={Image} alt="doctor logo" className="img-fluid top-doctor-image" />
                  //             </div>
                  //             <div className="doctor-item-right">
                  //                 <a className="doctor-name-link">Dr. Mona Lisa</a>
                  //                 <span className="doctor-designation">Dentist</span>
                  //                 <div>
                  //                     <span className="doctor-rating"> <img src="assets/images/Star.png" alt="Star.png" className="star-img img-fluid" />4.2 (100)</span>
                  //                 </div>
                  //                 <div>
                  //                     <span className="doctor-year">15 {t("Public.LandingPage.years")} </span>
                  //                     <span className="doctor-exp">{t("Public.LandingPage.of_experience")}</span>
                  //                 </div>
                  //             </div>
                  //         </div>
                  //         <div className="doctor-boxes-btn mt-4">
                  //             <button type="button" className="btn doctor-boxes-btn1">{t("Public.LandingPage.Chat_with_Doctor")}</button>
                  //             <button type="button" className="btn doctor-boxes-btn2">{t("Public.LandingPage.View_Availability")}</button>
                  //         </div>
                  //     </div>
                  // </div>
                }
              </OwlCarousel>
            )}
            <div className="consult-btn d-flex justify-content-center my-4">
              <Link className="btn" to="/book-an-appoinment">
                {t("Public.LandingPage.View_All_Docotrs")}
              </Link>
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
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const comactions = bindActionCreators(exadoActions, dispatch);
  const patientactions = bindActionCreators(exadoPatientActions, dispatch);
  return { docactions, comactions, patientactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(LandingPage));
