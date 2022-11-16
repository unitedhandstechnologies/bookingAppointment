import React from 'react';
import exadoDocActions from '../../redux/exadoDoc/action';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactStars from "react-rating-stars-component";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import CommonCalender from './../../commonComponent/AppoitmentCalendar/commonCalendar';
import { promiseWrapper, localStorageKeys } from '../../utility/common';
import LandingPageHeader from './landingPageHeader';
import LandingPageFooter from './landingPageFooter';
import ViewAllAvailability from './viewAllAvailability';
import { withTranslation } from 'react-i18next';

class BookAnAppoinment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoadData: false,
            docGuid: "",
            anAppoinmentModel: {
                "appDate": new Date().toISOString().split('T')[0],
                "location": "",
                "physicianService": [],
                "isMale": 0,
                "languageId": [],
                "appointmentType": 2,
                userType: localStorage.getItem(localStorageKeys.userType) ? parseInt(localStorage.getItem(localStorageKeys.userType)) : null
            },
            docDetailList: [],
            viewAllAvailabilityPopup: false,
            LocationList: [],
            LanguageData: [],
            PhysicianServiceList: [],
            PhysicianServiceLable: "",
            LanguageLable: ""
        };
    }

    componentDidMount() {
        promiseWrapper(this.props.docactions.getLanguages).then((data) => {
            this.setState({ LanguageData: data }, () => {
                promiseWrapper(this.props.docactions.getPhysicianService).then((jsdata) => {
                    this.setState({ PhysicianServiceList: jsdata }, () => {
                        if (window.location.pathname !== "/book-an-appoinment") {
                            this.state.PhysicianServiceList.map((v, idx) => {
                                if (v.physicianServiceName === window.location.pathname.split('/').pop()) {
                                    let ttt = [];
                                    ttt.push(v.physicianServiceId);
                                    this.setState(prevState => ({
                                        anAppoinmentModel: { ...prevState.anAppoinmentModel, ["physicianService"]: ttt }
                                    }), () => {
                                        this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
                                        if (this.state.anAppoinmentModel.physicianService !== undefined && this.state.anAppoinmentModel.physicianService.length > 0) {
                                            this.setState({ PhysicianServiceLable: `${this.state.PhysicianServiceList.filter(t => t.physicianServiceId === Number(this.state.anAppoinmentModel.physicianService[0]))[0].physicianServiceName} + (${this.state.anAppoinmentModel.physicianService.length - 1})` });
                                        }
                                        else {
                                            this.setState({ PhysicianServiceLable: "" });
                                        }
                                    });
                                }
                            });
                        }
                        promiseWrapper(this.props.patientactions.getLocation).then((ldata) => {
                            this.setState({ LocationList: ldata }, () => {
                                promiseWrapper(this.props.patientactions.searchAppointment, { appointmentModel: this.state.anAppoinmentModel }).then((jsdata) => {
                                    this.setState({ docDetailList: jsdata });
                                    this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
                                    this.setState(prevState => ({
                                        anAppoinmentModel: {
                                            ...prevState.anAppoinmentModel,
                                            ["physicianService"]: this.state.anAppoinmentModel.physicianService.map(v => v.toString())
                                        }
                                    }));
                                    this.setState({ LoadData: true });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    ChangeAppoinmentType = (data) => {
        this.setState(prevState => ({
            anAppoinmentModel: {
                ...prevState.anAppoinmentModel,
                ["appointmentType"]: data
            }
        }), () => {
            this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
            this.UpdateDocSearch();
        });
    }

    UpdateDocSearch() {
        promiseWrapper(this.props.patientactions.searchAppointment, { appointmentModel: this.state.anAppoinmentModel }).then((jsdata) => {
            this.setState({ docDetailList: jsdata });
        });
    }

    toggleViewAllAvailability = (data) => {
        this.setState({ docGuid: data }, () => {
            this.setState({
                viewAllAvailabilityPopup: !this.state.viewAllAvailabilityPopup
            });
        });
    };

    UpdateSearchDate = (e) => {
        this.setState(prevState => ({
            anAppoinmentModel: { ...prevState.anAppoinmentModel, ["appDate"]: e.target.value }
        }), () => {
            this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
        });
    }

    UpdatePreferredLanguage = (e) => {
        this.setState(prevState => ({
            anAppoinmentModel: { ...prevState.anAppoinmentModel, ["languageId"]: e.map(v => parseInt(v, 10)) }
        }), () => {
            this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
            if (this.state.anAppoinmentModel.languageId !== undefined && this.state.anAppoinmentModel.languageId.length > 0) {
                this.setState({ LanguageLable: `${this.state.LanguageData.filter(t => t.languageId === Number(this.state.anAppoinmentModel.languageId[0]))[0].languageName} + (${this.state.anAppoinmentModel.languageId.length - 1})` });
            }
            else {
                this.setState({ LanguageLable: "" });
            }
        });
    }

    UpdatephysicianService = (e) => {
        this.setState(prevState => ({
            anAppoinmentModel: { ...prevState.anAppoinmentModel, ["physicianService"]: e.map(v => parseInt(v, 10)) }
        }), () => {
            this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
            if (this.state.anAppoinmentModel.physicianService !== undefined && this.state.anAppoinmentModel.physicianService.length > 0) {
                this.setState({ PhysicianServiceLable: `${this.state.PhysicianServiceList.filter(t => t.physicianServiceId === Number(this.state.anAppoinmentModel.physicianService[0]))[0].physicianServiceName} + (${this.state.anAppoinmentModel.physicianService.length - 1})` });
            }
            else {
                this.setState({ PhysicianServiceLable: "" });
            }
        });
    }

    UpdateLocation = (e) => {
        this.setState(prevState => ({
            anAppoinmentModel: {
                ...prevState.anAppoinmentModel,
                ["location"]: e.target.value
            }
        }), () => {
            this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
        });
    }

    UpdateGender = (e) => {
        this.setState(prevState => ({
            anAppoinmentModel: {
                ...prevState.anAppoinmentModel,
                ["isMale"]: Number(e.target.value)
            }
        }), () => {
            this.props.patientactions.updateAppoimentModel(this.state.anAppoinmentModel);
        });
    }

    CallBackAppointmentSave(doctorGuid, timesloat, e) {
        let docDetails = this.state.docDetailList.filter(obj => {
            return obj.doctorGuid === doctorGuid
        });

        let docAppoinmentDetails = {
            "acceptOnlinePayment": docDetails[0].acceptOnlinePayment,
            "doctorImage": docDetails[0].doctorImage,
            "firstName": docDetails[0].firstName,
            "lastName": docDetails[0].lastName,
            "doctorCurrency": docDetails[0].doctorCurrency,
            "physicianServices": docDetails[0].physicianServices,
            "totalReview": docDetails[0].totalReview,
            "averageReview": docDetails[0].averageReview,
            "onlineAppointmentFees": docDetails[0].onlineAppointmentFees,
            "inclinicAppointmentFees": docDetails[0].inclinicAppointmentFees,
            "refundPercentage": docDetails[0].refundPercentage,
            "refundInClinicPercentage": docDetails[0].refundInClinicPercentage,
            "isChatFree": docDetails[0].isChatFree,
            "chatFees": docDetails[0].chatFees,
            "experience": docDetails[0].experience,
            "timeslot": timesloat,
            "docGuid": doctorGuid,
            "appointmentType": this.state.anAppoinmentModel.appointmentType
        };
        this.props.patientactions.updateDoctorAppointmentDetails(docAppoinmentDetails);
        sessionStorage.setItem(localStorageKeys.saveAppointmentData, JSON.stringify(docAppoinmentDetails));
        this.props.history.push("/book-an-appoinment-save")
    }

    render() {

        const { t } = this.props;

        return (
            <div>
                <LandingPageHeader />
                <section>
                    <div className="container">
                        <div className="doctor-list">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <nav>
                                        <div className="nav nav-tabs " id="nav-tab-views" role="tablist">
                                            <a className="nav-link active" id="nav-list-view-tab" data-toggle="tab" href="#nav-list-view" role="tab" aria-controls="nav-list-view" aria-selected="true"><i className="fas fa-list-ul mx-2"></i>List View</a>
                                            {/* <a className="nav-link" id="nav-calendar-tab" data-toggle="tab" href="#nav-calendar" role="tab" aria-controls="nav-calendar" aria-selected="false"><i className="fas fa-calendar-alt mx-2"></i>Calendar View</a> */}
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active all-content-slider" id="nav-list-view" role="tabpanel" aria-labelledby="nav-list-view-tab">
                                            <div className="col-lg-12 col-md-12">
                                                <nav>
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                        <a className="nav-link active" id="nav-inclinic-tab" data-toggle="tab" href="#nav-inclinic" role="tab" aria-controls="nav-inclinic" aria-selected="false" onClick={this.ChangeAppoinmentType.bind(this, 2)}>{t('Public.Appointment.InClinic')}</a>
                                                        <a className="nav-link" id="nav-videovisit-tab" data-toggle="tab" href="#nav-videovisit" role="tab" aria-controls="nav-videovisit" aria-selected="false" onClick={this.ChangeAppoinmentType.bind(this, 1)}>{t('Public.Appointment.VideoVisit')}</a>
                                                        {/* <a className="nav-link" id="nav-chat-tab" data-toggle="tab" href="#nav-chat" role="tab" aria-controls="nav-chat" aria-selected="false">{t('Public.Appointment.Chat')}</a> */}
                                                    </div>
                                                </nav>
                                                <div className="tab-content all-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-inclinic" role="tabpanel" aria-labelledby="nav-inclinic-tab">
                                                        <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                                                            {this.state.LoadData === true &&
                                                                <div className="tab-pills d-flex">
                                                                    <input type="date" max="2100-12-31"
                                                                        className="tab-pills-div"
                                                                        onChange={this.UpdateSearchDate.bind(this)}
                                                                        value={this.state.anAppoinmentModel["appDate"]} />
                                                                    <select value={this.state.anAppoinmentModel["location"]}
                                                                        onChange={this.UpdateLocation.bind(this)}
                                                                        className="form-control tab-pills-div">
                                                                        <option value="0">{t('Public.SearchAppointment.Location')}</option>
                                                                        {this.state.LocationList.map((h, i) => (<option key={i} value={h}>{h}</option>))}
                                                                    </select>
                                                                    <DropdownMultiselect
                                                                        selected={this.state.anAppoinmentModel["physicianService"]}
                                                                        buttonClass="selectpicker tab-pills-div"
                                                                        placeholder={t('Public.SearchAppointment.Specialities')}
                                                                        placeholderMultipleChecked={this.state.PhysicianServiceLable}
                                                                        handleOnChange={this.UpdatephysicianService.bind(this)}
                                                                        options={this.state.PhysicianServiceList}
                                                                        optionKey="physicianServiceId"
                                                                        optionLabel="physicianServiceName" />
                                                                    <select value={this.state.anAppoinmentModel["isMale"]}
                                                                        onChange={this.UpdateGender.bind(this)}
                                                                        className="form-control tab-pills-div">
                                                                        <option value="0">{t('Public.SearchAppointment.Gender')}</option>
                                                                        <option value="1">{t("Public.Appointment.Male")}</option>
                                                                        <option value="2">{t("Public.Appointment.Female")}</option>
                                                                        <option value="3">{t("Public.Appointment.Other")}</option>
                                                                    </select>
                                                                    <DropdownMultiselect
                                                                        selected={this.state.anAppoinmentModel["languageId"]}
                                                                        buttonClass="selectpicker tab-pills-div"
                                                                        placeholder={t('Public.SearchAppointment.Language')}
                                                                        placeholderMultipleChecked={this.state.LanguageLable}
                                                                        handleOnChange={this.UpdatePreferredLanguage.bind(this)}
                                                                        options={this.state.LanguageData}
                                                                        optionKey="languageId"
                                                                        optionLabel="languageName" />
                                                                    <button className="btn tab-pills-div tab-pills-div-search" onClick={this.UpdateDocSearch.bind(this)}>{t('Public.Appointment.Search')}</button>
                                                                </div>
                                                            }
                                                            {this.state.docDetailList.length > 0 ? this.state.docDetailList.map((v, idx) => (
                                                                <>
                                                                    <div className="row doctor-list-row" key={idx}>
                                                                        <div className="col-lg-6 col-md-12">
                                                                            <div className="dotor-item-container">
                                                                                <div className="doctor-item-left">
                                                                                    <img src={v.doctorImage} alt="" className="img-fluid top-doctor-image" />
                                                                                </div>
                                                                                <div className="doctor-item-right w-100 mx-2">
                                                                                    <Link className="doctor-name-link" to={`/book-an-appoinment-doc-detail/${v.doctorGuid}`}>
                                                                                        {v.firstName === "" || v.firstName == null ? "---" : v.firstName}&nbsp;
                                                                                        {v.lastName === "" || v.lastName == null ? "---" : v.lastName}
                                                                                    </Link>
                                                                                    <span className="doctor-designation">
                                                                                        {v.physicianServices.map((d) => {
                                                                                            return (<>{d}, </>)
                                                                                        })
                                                                                        }
                                                                                    </span>
                                                                                    <div>
                                                                                        <span className="doctor-rating d-flex align-items-center">
                                                                                            <ReactStars
                                                                                                classNames="star-img img-fluid"
                                                                                                count={5}
                                                                                                size={20}
                                                                                                value={v.averageReview}
                                                                                                isHalf={true}
                                                                                                edit={false}
                                                                                                emptyIcon={<i className="far fa-star" style={{ color: "#20CAD6" }} />}
                                                                                                halfIcon={<i className="fa fa-star-half-alt" />}
                                                                                                filledIcon={<i className="fa fa-star" />}
                                                                                                color="#fff"
                                                                                                activeColor="#20CAD6"
                                                                                            />
                                                                                            ({v.totalReview})
                                                                                        </span>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="doctor-year">{v.experience} {t('Public.Appointment.Years')} </span>
                                                                                        <span className="doctor-exp"> {t('Public.Appointment.OfExperience')} </span>
                                                                                    </div>
                                                                                    <div className="comment more">
                                                                                        {v.description}
                                                                                    </div>
                                                                                    <div className="doctor-charges mt-2">
                                                                                        <div className="d-flex">
                                                                                            <div className="question-rate2">
                                                                                                <div className="question-rate21">{v.doctorCurrency} {v.chatFees}</div>
                                                                                                <div className="question-status">{t('Public.Appointment.Per3Question')}</div>
                                                                                            </div>
                                                                                            <div className="question-rate2">
                                                                                                <div className="question-rate22">{v.doctorCurrency} {v.onlineAppointmentFees}</div>
                                                                                                <div className="question-status">{t('Public.Appointment.Online')}</div>
                                                                                            </div>
                                                                                            <div className="question-rate2">
                                                                                                <div className="question-rate23">{v.doctorCurrency} {v.inclinicAppointmentFees}</div>
                                                                                                <div className="question-status">{t('Public.Appointment.InClinic')}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-12 doctor-timing-list">
                                                                            <CommonCalender key={v.availableSlots} CalData={v.availableSlots} DocGuid={v.doctorGuid} CallBackAppointmentSave={this.CallBackAppointmentSave.bind(this, v.doctorGuid)} />
                                                                        </div>
                                                                        <div className="check-availability doctor-list-check-availability">
                                                                            <a style={{ cursor: "pointer" }} onClick={this.toggleViewAllAvailability.bind(this, v.doctorGuid)}>{t('Public.Appointment.ViewAllAvailability')}</a>
                                                                        </div>
                                                                        <div className="book-appointment-btn my-4 doctor-list-book-appointment-btn">
                                                                            <a style={{ cursor: "pointer" }} onClick={this.toggleViewAllAvailability.bind(this, v.doctorGuid)} className="btn w-100" role="button">{t('Public.Appointment.ViewAllAvailability')}</a>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                </>)) :
                                                                <div>
                                                                    <p>{t('Public.SearchAppointment.NoDoctorsFoundMessage')}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-videovisit" role="tabpanel" aria-labelledby="nav-videovisit-tab">
                                                        <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                                                            {this.state.LoadData === true &&
                                                                <div className="tab-pills d-flex">
                                                                    <input type="date" max="2100-12-31"
                                                                        className="tab-pills-div"
                                                                        onChange={this.UpdateSearchDate.bind(this)}
                                                                        value={this.state.anAppoinmentModel["appDate"]} />
                                                                    <select value={this.state.anAppoinmentModel["location"]}
                                                                        onChange={this.UpdateLocation.bind(this)}
                                                                        className="form-control tab-pills-div">
                                                                        <option value="0">{t('Public.SearchAppointment.Location')}</option>
                                                                        {this.state.LocationList.map((h, i) => (<option key={i} value={h}>{h}</option>))}
                                                                    </select>
                                                                    <DropdownMultiselect
                                                                        selected={this.state.anAppoinmentModel["physicianService"]}
                                                                        buttonClass="selectpicker tab-pills-div"
                                                                        placeholder={t('Public.SearchAppointment.Specialities')}
                                                                        placeholderMultipleChecked={this.state.PhysicianServiceLable}
                                                                        handleOnChange={this.UpdatephysicianService.bind(this)}
                                                                        options={this.state.PhysicianServiceList}
                                                                        optionKey="physicianServiceId"
                                                                        optionLabel="physicianServiceName" />
                                                                    <select value={this.state.anAppoinmentModel["isMale"]}
                                                                        onChange={this.UpdateGender.bind(this)}
                                                                        className="form-control tab-pills-div">
                                                                        <option value="0">{t('Public.SearchAppointment.Gender')}</option>
                                                                        <option value="1">Male</option>
                                                                        <option value="2">Female</option>
                                                                        <option value="3">Other</option>
                                                                    </select>
                                                                    <DropdownMultiselect
                                                                        selected={this.state.anAppoinmentModel["languageId"]}
                                                                        buttonClass="selectpicker tab-pills-div"
                                                                        placeholder={t('Public.SearchAppointment.Language')}
                                                                        placeholderMultipleChecked={this.state.LanguageLable}
                                                                        handleOnChange={this.UpdatePreferredLanguage.bind(this)}
                                                                        options={this.state.LanguageData}
                                                                        optionKey="languageId"
                                                                        optionLabel="languageName" />
                                                                    <button className="btn tab-pills-div tab-pills-div-search" onClick={this.UpdateDocSearch.bind(this)}>{t('Public.Appointment.Search')}</button>
                                                                </div>
                                                            }
                                                            {this.state.docDetailList.length > 0 ? this.state.docDetailList.map((v, idx) => (
                                                                <>
                                                                    <div className="row doctor-list-row" key={idx}>
                                                                        <div className="col-lg-6 col-md-12">
                                                                            <div className="dotor-item-container">
                                                                                <div className="doctor-item-left">
                                                                                    <img src={v.doctorImage} alt="" className="img-fluid top-doctor-image" />
                                                                                </div>
                                                                                <div className="doctor-item-right w-100 mx-2">
                                                                                    <Link className="doctor-name-link" to={`/book-an-appoinment-doc-detail/${v.doctorGuid}`}>
                                                                                        {v.firstName === "" || v.firstName == null ? "---" : v.firstName}&nbsp;
                                                                                        {v.lastName === "" || v.lastName == null ? "---" : v.lastName}
                                                                                    </Link>
                                                                                    <span className="doctor-designation">
                                                                                        {v.physicianServices.map((d) => {
                                                                                            return (<>${d}, </>)
                                                                                        })
                                                                                        }
                                                                                    </span>
                                                                                    <div>
                                                                                        <span className="doctor-rating d-flex align-items-center">
                                                                                            <ReactStars
                                                                                                classNames="star-img img-fluid"
                                                                                                count={5}
                                                                                                size={20}
                                                                                                value={v.averageReview}
                                                                                                isHalf={true}
                                                                                                edit={false}
                                                                                                emptyIcon={<i className="far fa-star" style={{ color: "#20CAD6" }} />}
                                                                                                halfIcon={<i className="fa fa-star-half-alt" />}
                                                                                                filledIcon={<i className="fa fa-star" />}
                                                                                                color="#fff"
                                                                                                activeColor="#20CAD6"
                                                                                            />
                                                                                            ({v.totalReview})
                                                                                        </span>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="doctor-year">{v.experience} {t('Public.Appointment.Years')} </span>
                                                                                        <span className="doctor-exp"> {t('Public.Appointment.OfExperience')} </span>
                                                                                    </div>
                                                                                    <div className="comment more">
                                                                                        {v.description}
                                                                                    </div>
                                                                                    <div className="doctor-charges mt-2">
                                                                                        <div className="d-flex">
                                                                                            <div className="question-rate2">
                                                                                                <div className="question-rate21">{v.doctorCurrency} {v.chatFees}</div>
                                                                                                <div className="question-status">{t('Public.Appointment.Per3Question')}</div>
                                                                                            </div>
                                                                                            <div className="question-rate2">
                                                                                                <div className="question-rate22">{v.doctorCurrency} {v.onlineAppointmentFees}</div>
                                                                                                <div className="question-status">{t('Public.Appointment.Online')}</div>
                                                                                            </div>
                                                                                            <div className="question-rate2">
                                                                                                <div className="question-rate23">{v.doctorCurrency} {v.inclinicAppointmentFees}</div>
                                                                                                <div className="question-status">{t('Public.Appointment.InClinic')}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-12 doctor-timing-list">
                                                                            <CommonCalender
                                                                                // key={v.availableSlots} 
                                                                                CalData={v.availableSlots}
                                                                                DocGuid={v.doctorGuid}
                                                                                CallBackAppointmentSave={this.CallBackAppointmentSave.bind(this, v.doctorGuid)}
                                                                            />
                                                                        </div>
                                                                        <div className="check-availability doctor-list-check-availability">
                                                                            <a style={{ cursor: "pointer" }} onClick={this.toggleViewAllAvailability.bind(this, v.doctorGuid)}>{t('Public.Appointment.ViewAllAvailability')}</a>
                                                                        </div>
                                                                        <div className="book-appointment-btn my-4 doctor-list-book-appointment-btn">
                                                                            <a style={{ cursor: "pointer" }} onClick={this.toggleViewAllAvailability.bind(this, v.doctorGuid)} className="btn w-100" role="button">{t('Public.Appointment.ViewAllAvailability')}</a>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                </>)) :
                                                                <div>
                                                                    <p>{t('Public.SearchAppointment.NoDoctorsFoundMessage')}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-chat" role="tabpanel" aria-labelledby="nav-chat-tab">{t("Public.Appointment.Chat")}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.viewAllAvailabilityPopup ? <ViewAllAvailability CallBackAppointmentSave={this.CallBackAppointmentSave.bind(this, this.state.docGuid)} ViewAvailability={this.toggleViewAllAvailability} DocGuid={this.state.docGuid} /> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <LandingPageFooter />
            </div>
        )
    }
}

function mapStoreToprops(state, props) {
    return {
        appoinmentModel: state.ExadoPatient.appoinmentModel,
        docAppoinmentDetails: state.ExadoPatient.docAppoinmentDetails,
    }
}

function mapDispatchToProps(dispatch) {
    const docactions = bindActionCreators(exadoDocActions, dispatch);
    const patientactions = bindActionCreators(exadoPatientActions, dispatch);
    return { docactions, patientactions };
}


export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(withRouter(BookAnAppoinment)));