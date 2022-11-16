import React from 'react';
import { Redirect, Link, NavLink } from "react-router-dom";
import exadoActions from '../../redux/exado/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LanguageHandler from "../../commonComponent/LanguageSelect/LanguageHandler";
import LanguageHandlerMobile from "../../commonComponent/LanguageSelect/LanguageHandlerMobile";
import { withTranslation } from 'react-i18next';
import UserDropDown from '../../commonComponent/UserDropDown/userDropDown';
import { Modal } from 'react-bootstrap';

class LandingPageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            IsUserLogedIn: false,
            mobileNavModal: false
            //language: 'en'
        };
    }

    componentDidMount() {
        this.setState({ IsUserLogedIn: (localStorage.getItem("user-fullname") == null ? false : true) });
    }

    UpdateLoginType(type) {
        localStorage.setItem("login-Type", type);
        this.setState({ redirect: "/login" });
    }

    mobileNavModalShow = (show) => {
        this.setState({ mobileNavModal: show })
    }

    logOutAction = () => {
        this.setState({ IsUserLogedIn: false });
    }

    render() {
        const { t } = this.props;
        const { mobileNavModal } = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <>
                <div className="divLogo1 mobile-logo">
                    <Link to="/"><img src="assets/images/Group9488.png" className="img-fluid logo" alt='site logo' /></Link>
                </div>
                <div className="mobile-nav justify-content-between align-items-center">
                    <div className="mobile-nav w-100 justify-content-between">
                        <div className="menu-icon"
                            onClick={() => this.mobileNavModalShow(true)}
                        >
                            <img src="assets/images/01aligncenter(icon).png" alt="01aligncenter(icon).png" data-toggle="modal" data-target="#mobilemodalmenu" className="mobile-menu-item-menu img-fluid" />
                        </div>
                        <div className="menu-collapse">
                            <span data-toggle="modal" data-target="#mobilemodallanguage" className="mobile-menu-item-language">{t('Language')}
                                <img src="assets/images/Iconionic-md-arrow-dropdown.png" alt="Iconionic-md-arrow-dropdown.png" className="mx-2" /></span>
                        </div>
                    </div>
                </div>
                <div className="divHeader divNavMenu">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg bg-white">
                            <div className="divLogo1"><Link to="/"><img src="assets/images/Group9488.png" className="img-fluid logo" alt='link img' /></Link></div>
                            <button className="navbar-toggler toggle-btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto nav-top-menu d-flex align-items-center">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/book-an-appoinment" activeStyle={{ fontWeight: "bold", color: "#436B95" }}>{t('Book_an_Appoinment')}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/chat-with-doctor" activeStyle={{ fontWeight: "bold", color: "#436B95" }}>{t('Chat_with_Doctor')}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/emergency" activeStyle={{ fontWeight: "bold", color: "#436B95" }}>{t('Emergency')}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">{t('Help_Support')}</NavLink>
                                    </li>
                                    <LanguageHandler />
                                    {this.state.IsUserLogedIn == true &&
                                        <UserDropDown logOutAction={() => this.logOutAction()} />
                                    }
                                    {this.state.IsUserLogedIn == false &&
                                        <li className="nav-item profile">
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <div className="nav-item dropdown dropdown-menu-third position-static w-100">
                                                        <a className="nav-link dropdown-toggle landing-dropdown-toggle" id="navbarDropdown=3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            {t('LoginSignup')}
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-third" aria-labelledby="navbarDropdown3">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <a onClick={this.UpdateLoginType.bind(this, 'Doctor')} className="dropdown-item">{t('DoctorLogin')}</a>
                                                                    <a onClick={this.UpdateLoginType.bind(this, 'Patient')} className="dropdown-item">{t('UserLogin')}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <Modal className='' show={mobileNavModal} onHide={() => this.mobileNavModalShow(false)} style={{ zIndex: "2" }}>
                    <div className="modify-modal mobile-nav-modal-menu" id="withdraw-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <Link to="/">
                                        <img src="assets/images/Group9488.png" width="150" className="img-fluid logo" alt='site logo' />
                                    </Link>
                                    <button type="button" className="close language-close" data-dismiss="modal" aria-label="Close" onClick={() => this.mobileNavModalShow(false)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body menu-container">
                                    <div className="row">
                                        <div className="col-12">
                                            <NavLink className="nav-link dropdown-item" to="/book-an-appoinment">{t('Book_an_Appoinment')}</NavLink>
                                            <NavLink className="nav-link dropdown-item" to="/chat-with-doctor" >{t('Chat_with_Doctor')}</NavLink>
                                            <NavLink className="nav-link dropdown-item" to="/emergency" >{t('Emergency')}</NavLink>
                                            <NavLink className="nav-link dropdown-item" to="/">{t('Help_Support')}</NavLink>
                                            <a onClick={this.UpdateLoginType.bind(this, 'Doctor')} className="dropdown-item dropdown-item-signup">{t("Doctor-Login")}</a>
                                            <a onClick={this.UpdateLoginType.bind(this, 'Patient')} className="dropdown-item dropdown-item-signup">{t("User_Login")}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <LanguageHandlerMobile />
            </>
        )
    }
}

function mapStoreToprops(state, props) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators(exadoActions, dispatch);
    return { actions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(LandingPageHeader));