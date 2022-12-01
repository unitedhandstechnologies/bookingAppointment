import React, { Component } from "react";
import { Link } from "react-router-dom";

class CmsBreadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pageName } = this.props;

    return (
      <div className="row search-bar">
        <div className="py-4 search-bar-text w-100 bg-light">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link
                to={"/admin/cms"}
                className="doctorName"
                style={{ color: "#436B95" }}
              >
                CMS
              </Link>
            </li>
            {pageName !== "cms" && (
              <li className="breadcrumb-item">{pageName}</li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default CmsBreadcrumb;
