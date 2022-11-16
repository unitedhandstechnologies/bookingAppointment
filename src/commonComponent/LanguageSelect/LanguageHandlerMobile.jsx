import React from 'react';
import cookie from 'react-cookies';
import { withTranslation } from 'react-i18next';
import exadoDocActions from '../../redux/exadoDoc/action';
import { localStorageKeys, promiseWrapper } from '../../utility/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import exadoActions from '../../redux/exado/action';

class LanguageHandlerMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en',
            WebSiteLanguageData: [],
            LoadedData: true,
        }
    }

    componentDidMount() {
        let cl = (cookie.load('current-language-name') === undefined) ? "English" : cookie.load('current-language-name');
        cookie.save('current-language-name', cl, { path: '/' });
        this.getWebsiteLanguages(cl);
    }
    componentDidUpdate() {
        if (this.props.languageObj) {
            const { languageAbbreviation, languageName, languageId } = this.props.languageObj
            if (languageAbbreviation !== this.state.language) {
                this.changeLanguage(languageAbbreviation, languageName, languageId)
            }
        }
    }

    getWebsiteLanguages = (langName) => {
        promiseWrapper(this.props.docactions.getWebsiteLanguages).then((languageData) => {
            this.setState({ WebSiteLanguageData: languageData }, () => {
                this.setState({ LoadedData: true });
                localStorage.setItem(localStorageKeys.websiteLanguageData, JSON.stringify(languageData))
                const langObj = this.getLanguageObject(languageData, langName)
                this.changeStateLanguage(langObj);
            });
        });
    }

    changeStateLanguage = (langObj) =>
        promiseWrapper(this.props.comactions.changeLanguage, { language: langObj })

    getLanguageObject = (languageData, langName) => {
        let langObj = languageData.filter(language => {
            return (language.languageName === langName)
        });
        return langObj[0];
    }

    changeLanguage = (lan, lanName) => {
        this.setState({ language: lan });
        cookie.save('current-language', lan, { path: '/' });
        cookie.save('current-language-name', lanName, { path: '/' });
        this.props.i18n.changeLanguage(lan);
        const langObj = this.getLanguageObject(this.state.WebSiteLanguageData, lanName)
        this.changeStateLanguage(langObj);
    }

    render() {
        return (
            <div className="modal fade mobile-nav-modal-language" id="mobilemodallanguage" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="mobilemodallanguageLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <img src="assets/images/Group9488.png" width="150" className="img-fluid logo" alt='fluid logo' />
                            <button type="button" className="close language-close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body languages-container">
                            {this.state && this.state.LoadedData &&
                                <div className="row">
                                    {this.state.WebSiteLanguageData.map((d, idx) => (
                                        <div className="col-6 mb-3" key={idx}>
                                            <a className="dropdown-item" onClick={this.changeLanguage.bind(this, d.languageAbbreviation, d.languageName)}>{d.languageName}</a>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStoreToprops(state, props) {
    return { languageObj: state.Exado.language }
}

function mapDispatchToProps(dispatch) {
    const docactions = bindActionCreators(exadoDocActions, dispatch);
    const comactions = bindActionCreators(exadoActions, dispatch);
    return { docactions, comactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(withTranslation()(LanguageHandlerMobile));