import React from 'react';
import exadoActions from '../../redux/exado/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

class PatientFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { t } = this.props
        return (
            <div className="divFooter doctorDivFooter bg-light">
                <div className="row bg-white">
                    <div className="py-3 bg-light"></div>
                    <div className="col-lg-12 div-footer-text py-3">
                        <span>{t('Patient.PatientFooter_Text')}</span>
                        <div className="footer-social-icons">
                            <i className="fab mx-2 fa-facebook-f"></i>
                            <i className="fab mx-2 fa-twitter"></i>
                            <i className="fab mx-2 fa-linkedin-in"></i>
                            <i className="fab mx-2 fa-youtube"></i>
                        </div>
                    </div>
                </div>
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

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(PatientFooter));