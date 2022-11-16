import React from 'react';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import exadoDocActions from '../../redux/exadoDoc/action';
import exadoPatientActions from '../../redux/exadoPatient/action';
import { promiseWrapper } from '../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DoctorHeader from "./docHeader";
import DoctorFooter from "./docFooter";
import DoctorLeftPanel from './../../commonComponent/LeftPanel/leftPanel';
import { withTranslation } from 'react-i18next';

class DoctorFAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            LoadedData: false,
            FAQList: [],
            AddFAQ: false,
            DoctorFAQGuid: null,
            FAQAnswer: "",
            FAQQuestion: ""
        };
    }

    componentDidMount() {
        promiseWrapper(this.props.docactions.getDoctorsFAQs, { doctorGuid: localStorage.getItem("user-id") }).then((data) => {
            this.setState({ FAQList: data }, () => {
                this.setState({ LoadedData: true });
            });
        });
    }

    toggleAddFAQPopUp = () => {
        this.setState({
            AddFAQ: !this.state.AddFAQ
        });
    };

    UpdateFAQAns = (e) => {
        this.setState({ FAQAnswer: e.target.value });
    }

    UpdateFAQQue = (e) => {
        this.setState({ FAQQuestion: e.target.value });
    }

    EditFAQ(id) {
        promiseWrapper(this.props.docactions.getDoctorFAQById, { faqGuid: id }).then((data) => {
            this.setState({ FAQQuestion: data.question });
            this.setState({ FAQAnswer: data.answer });
            this.setState({ DoctorFAQGuid: data.doctorFAQGuid });
            this.toggleAddFAQPopUp();
        });
    }

    DeleteFAQ(id) {
        promiseWrapper(this.props.docactions.deleteFAQ, { faqGuid: id }).then((data) => {
            if (data.isSuccess == true) {
                toast.success("FAQ deleted successfully.");
                promiseWrapper(this.props.docactions.getDoctorsFAQs, { doctorGuid: localStorage.getItem("user-id") }).then((data) => {
                    this.setState({ FAQList: data }, () => {
                        this.setState({ LoadedData: true });
                        this.setState({ FAQQuestion: "" });
                        this.setState({ FAQAnswer: "" });
                        this.setState({ DoctorFAQGuid: null });
                    });
                });
            }
            else {
                toast.error("there is some issue with delete FAQ.");
            }
        });
    }

    SaveFAQ() {
        let data = {
            "doctorFAQGuid": this.state.DoctorFAQGuid,
            "doctorGuid": localStorage.getItem("user-id"),
            "question": this.state.FAQQuestion,
            "answer": this.state.FAQAnswer
        }
        if (this.state.FAQQuestion !== "" && this.state.FAQAnswer !== "") {
            promiseWrapper(this.props.docactions.saveFAQ, { model: data }).then((data) => {
                if (data.isSuccess == true) {
                    this.toggleAddFAQPopUp();
                    promiseWrapper(this.props.docactions.getDoctorsFAQs, { doctorGuid: localStorage.getItem("user-id") }).then((data) => {
                        this.setState({ FAQList: data }, () => {
                            this.setState({ LoadedData: true });
                            this.setState({ FAQQuestion: "" });
                            this.setState({ FAQAnswer: "" });
                            this.setState({ DoctorFAQGuid: null });
                        });
                    });
                }
                else {
                    toast.error("there is some issue with save FAQ.");
                    this.toggleAddFAQPopUp();
                    this.setState({ FAQQuestion: "" });
                    this.setState({ FAQAnswer: "" });
                }
            });
        }
        else {
            toast.error("please add question and answer.");
        }
    }

    render() {
        const { t } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <DoctorHeader />
                <div className="main">
                    <div className="container-fluid">
                        <div className="row">
                            <DoctorLeftPanel />
                            <div className="col-md-12 col-sm-12 col-lg-10 mainRightPanel">
                                <div className="mb-5">
                                    <div className="row search-bar my-2">
                                        <div className="col-md-5 search-bar-text w-100">
                                            {t('Doctor.MyFAQ.My_FAQ')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="search-bar-text-input col-lg-10 col-md-9 top-search">
                                            <input type="text" className="form-control" placeholder={t('Doctor.MyFAQ.Search')} />
                                        </div>
                                        <div className="search-bar-text-input col-lg-2 col-md-3">
                                            <button type="button" onClick={this.toggleAddFAQPopUp.bind(this)} className="btn myfaqs-question-btn w-100">{t('Doctor.MyFAQ.Add_Question')}</button>
                                        </div>
                                    </div>
                                    {this.state.FAQList && this.state.FAQList.length > 0 &&
                                        <>
                                            {this.state.FAQList.map((v, idx) => (
                                                <div className="row my-4" key={idx}>
                                                    <div className="col-md-12">
                                                        <div className="doctor-faqs-container">
                                                            <div className="doctor-faqs-header">
                                                                <div className="doctor-faqs-question">{v.question}</div>
                                                                <div className="d-flex">
                                                                    <div className="doctor-faqs-delete-btn">
                                                                        <button type="button" onClick={this.EditFAQ.bind(this, v.doctorFAQGuid)} className="btn doctor-faqs-delete-btn">{t('Doctor.MyFAQ.Edit')}</button>
                                                                    </div>
                                                                    <div className="doctor-faqs-delete-btn">
                                                                        <button type="button" onClick={this.DeleteFAQ.bind(this, v.doctorFAQGuid)} className="btn doctor-faqs-delete-btn">{t('Doctor.MyFAQ.Delete')}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="doctor-faqs-body">
                                                                <div className="doctor-faqs-answer">
                                                                    <p>{v.answer}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            }
                                        </>
                                    }

                                    {this.state.AddFAQ === true &&
                                        <div className="modal pending-feedback" style={{ display: "block" }}>
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <div className="divForm my-4">
                                                            <div className="d-flex flex-column text-center">
                                                                <div className="patient-forget-password-text">
                                                                    <p>{t('Doctor.MyFAQ.Add_FAQ')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="search-bar-text-input delete-account-textarea mb-3">
                                                                <input type="text" className="form-control" value={this.state.FAQQuestion} onChange={this.UpdateFAQQue.bind(this)} placeholder={t('Doctor.MyFAQ.Your_Question')} />
                                                            </div>
                                                            <div className="search-bar-text-input delete-account-textarea">
                                                                <textarea className="form-control" value={this.state.FAQAnswer} onChange={this.UpdateFAQAns.bind(this)} rows="4" placeholder={t('Doctor.MyFAQ.Your_Answer')}></textarea>
                                                            </div>

                                                            <div className="mt-3 text-center">
                                                                <button type="button" className="btn pending-feedback-cancel w-25 mx-2" onClick={this.toggleAddFAQPopUp.bind(this)}>{t('Doctor.MyFAQ.Cancel')}</button>
                                                                <a className="btn MyButton reset-password-button w-25 mx-2" onClick={this.SaveFAQ.bind(this)}>{t('Doctor.MyFAQ.Done')}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <DoctorFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

function mapStoreToprops(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const docactions = bindActionCreators(exadoDocActions, dispatch);
    const patientactions = bindActionCreators(exadoPatientActions, dispatch);
    return { docactions, patientactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(DoctorFAQ));