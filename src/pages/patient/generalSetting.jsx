import React from 'react';
import exadoActions from '../../redux/exado/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PatientHeader from "./header";
import PatientFooter from "./footer";
import PatientLeftPanel from './../../commonComponent/LeftPanel/leftPanel';
import { withTranslation } from 'react-i18next';

class PatientGeneralSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { t } = this.props
        return (
            <div>
                <PatientHeader />
                <div className="main">
                    <div className="container-fluid">
                        <div className="row">
                            <PatientLeftPanel />
                            <div className="col-md-12 col-lg-10 mainRightPanel mainRightPanel-background ">
                                <div className="row mt-3 d-flex justify-content-center">
                                    <div className="col-md-12">
                                        <div className="tableHeading mb-2">
                                            <div className="headingLeft p-0">
                                                <div>{t('Patient.PatientGeneralSetting.General_Settings')}</div>
                                            </div>
                                        </div>
                                        <div className="password-change-container p-4">
                                            <div className="row">
                                                <div className="col-lg-3 col-md-12 d-flex align-items-center">{t('Patient.PatientGeneralSetting.Password')}</div>
                                                <div className="col-lg-6 col-md-12">
                                                    <div className="password-value">••••••••••••</div>
                                                    <div className="password-change-date">Last changed Dec 20, 2020</div>
                                                </div>
                                                <div className="col-lg-3 col-md-12 d-flex justify-content-end">
                                                    <a className="btn MyButton w-50" data-toggle="modal" data-target=".patient-general-setting-change-password">{t('Patient.PatientGeneralSetting.Change')}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="delete-account-section mt-3 d-flex justify-content-end">
                                            <a className="btn" data-toggle="modal" data-target=".delete-your-account">{t('Patient.PatientGeneralSetting.Delete_Acoount')}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PatientFooter />
            </div>
        )
    }
}

function mapStoreToprops(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators(exadoActions, dispatch);
    return { actions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(PatientGeneralSetting));