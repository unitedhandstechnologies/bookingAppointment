import React from "react";
import cookie from "react-cookies";
import { withTranslation } from "react-i18next";
import exadoDocActions from "../../redux/exadoDoc/action";
import {
  COOKIES_KEY,
  localStorageKeys,
  promiseWrapper,
} from "../../utility/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import exadoActions from "../../redux/exado/action";

class LanguageHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      WebSiteLanguageData: [],
      LoadedData: true,
      languageName: "English",
    };
  }

  componentDidMount() {
    let cl = cookie.load(COOKIES_KEY.LANGUAGE_CODE);
    if (!cl || cl === "undefined") cl = "en";
    cookie.save(COOKIES_KEY.LANGUAGE_CODE, cl, { path: "/" });
    this.getWebsiteLanguages(cl);
  }

  componentDidUpdate() {
    if (this.props.languageObj?.languageAbbreviation) {
      const { languageAbbreviation, languageName } = this.props.languageObj;
      if (languageAbbreviation !== this.state.language) {
        this.changeLanguage(languageAbbreviation, languageName);
      }
    }
  }

  getWebsiteLanguages = (langCode) => {
    promiseWrapper(this.props.docactions.getWebsiteLanguages).then(
      (languageData) => {
        this.setState({ WebSiteLanguageData: languageData }, () => {
          this.setState({ LoadedData: true });
          if (langCode !== "en") {
            const langObj = this.getLanguageObject(languageData, langCode);
            this.changeStateLanguage(langObj);
          }
          localStorage.setItem(
            localStorageKeys.websiteLanguageData,
            JSON.stringify(languageData)
          );
        });
      }
    );
  };

  changeStateLanguage = (langObj) =>
    promiseWrapper(this.props.comactions.changeLanguage, { language: langObj });

  getLanguageObject = (languageData, langCode) => {
    let langObj = languageData.filter((language) => {
      return language.languageAbbreviation === langCode;
    });
    return langObj[0];
  };

  /**
   * To change website language and save it in coockies
   * @param {*} langCode language code
   * @param {*} languageName language Name
   */
  changeLanguage = (langCode, languageName) => {
    this.setState({ language: langCode, languageName: languageName }, () => {
      cookie.save(COOKIES_KEY.LANGUAGE_CODE, langCode, { path: "/" });
      this.props.i18n.changeLanguage(langCode);
    });
  };

  render() {
    const { languageName } = this.state;
    return (
      <li className="nav-item dropdown position-static d-flex align-items-center">
        {this.state && this.state.LoadedData && (
          <div>
            <div
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {languageName}
            </div>
            <div
              className="dropdown-menu dropdown-menu-first"
              aria-labelledby="navbarDropdown"
            >
              <div className="row">
                {this.state.WebSiteLanguageData.map((languageData, idx) => (
                  <div className="col-md-6" key={idx}>
                    <button
                      className="dropdown-item"
                      onClick={() => this.changeStateLanguage(languageData)}
                    >
                      {languageData.languageName}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </li>
    );
  }
}

function mapStoreToprops(state, props) {
  return { languageObj: state.Exado.language };
}

function mapDispatchToProps(dispatch) {
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  const comactions = bindActionCreators(exadoActions, dispatch);
  return { docactions, comactions };
}

export default connect(
  mapStoreToprops,
  mapDispatchToProps
)(withTranslation()(LanguageHandler));
