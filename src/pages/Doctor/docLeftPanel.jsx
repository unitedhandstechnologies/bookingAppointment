import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaColumns,
  FaCalendar,
  FaCommentAlt,
  FaUser,
  FaAmbulance,
  FaEuroSign,
  FaQuestionCircle,
  FaCog,
  FaEnvelopeOpenText,
} from "react-icons/fa";

class DoctorLeftPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LeftMenuToggled: true,
    };
  }

  MobileToggleClick() {
    this.setState({ LeftMenuToggled: !this.state.LeftMenuToggled });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="col-md-12 col-lg-2 col-sm-12 mainLeftPanel p-0">
        <div className="menu-icon" onClick={this.MobileToggleClick.bind(this)}>
          <img
            src="assets/images/01aligncenter(icon).png"
            alt="01aligncenter(icon).png"
            className="img-fluid mobile-menu-item-menu"
            data-toggle="modal"
            data-target="#mobilemodalmenu"
          />
        </div>
        <ProSidebar
          className="mobile-sidebar-toggle"
          onToggle={this.MobileToggleClick.bind(this)}
          toggled={this.state.LeftMenuToggled}
          breakPoint="md"
        >
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem icon={<FaColumns />} active={true}>
                {t("Doctor.LeftPanel.MyDashboard")}
                <Link to="/doctor-dashboard" />
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu
                title={t("Doctor.LeftPanel.MyAppointments")}
                icon={<FaCog />}
              >
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/doctor-appointment-requests" />
                  {t("Doctor.LeftPanel.Requests")}
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/doctor-appointment-upcoming" />
                  {t("Doctor.LeftPanel.Upcoming")}
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/doctor-appointment-completed" />
                  {t("Doctor.LeftPanel.Completed")}
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/doctor-appointment-cancelled" />
                  {t("Doctor.LeftPanel.Cancelled")}
                </MenuItem>
              </SubMenu>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaCommentAlt />} active={false}>
                {t("Doctor.LeftPanel.MyChats")}
                <Link to="/doctor-dashboard" />
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaUser />} active={false}>
                {t("Doctor.LeftPanel.MyPatients")}
                <Link to="/doctor-dashboard" />
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaAmbulance />} active={false}>
                {t("Doctor.LeftPanel.MyEmergencyCalls")}
                <Link to="/doctor-dashboard" />
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEuroSign />} active={false}>
                {t("Doctor.LeftPanel.MyFinance")}
                <Link to="/doctor-dashboard" />
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaQuestionCircle />} active={false}>
                {t("Doctor.LeftPanel.MyFAQs")}
                <Link to="/doctor-faq" />
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu
                title={t("Doctor.LeftPanel.MySettings")}
                icon={<FaCog />}
              >
                <MenuItem icon={<FaColumns />} active={false}>
                  {t("Doctor.LeftPanel.MyProfile")}
                  <Link to="/doctor-profile" />
                </MenuItem>
                <MenuItem icon={<FaColumns />} active={false}>
                  {t("Doctor.LeftPanel.MyTiming")}
                  <Link to="/doctor-my-timing" />
                </MenuItem>
                <MenuItem icon={<FaColumns />} active={false}>
                  {t("Doctor.LeftPanel.MyFees")}
                  <Link to="/doctor-my-fees" />
                </MenuItem>
              </SubMenu>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                {t("Doctor.LeftPanel.MassMessages")}
                <Link to="/doctor-profile" />
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    );
  }
}
export default withTranslation()(DoctorLeftPanel);

/* <div className="col-md-12 col-lg-2 col-sm-12 mainLeftPanel">
                  <div className="row mt-4">
                   <ul>
                      <li className="w-100 sidebar-menu-li">
                          <NavLink className="sidebar-menu-a w-100" to="/doctor-dashboard" activeClassName="sidebar-menu-li-active" activeStyle={{ fontWeight: "bold", color: "#000" }}>
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="fas fa-columns"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyDashboard')}</div>
                              </div>
                          </NavLink>
                      </li>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="far fa-calendar"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyAppointments')}</div>
                              </div>
                          </a>
                      </li>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="fas fa-comment-alt"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyChats')}</div>
                              </div>
                          </a>
                      </li>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="fas fa-hospital-user"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyPatients')}</div>
                              </div>
                          </a>
                      </li>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="fas fa-ambulance"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyEmergencyCalls')}</div>
                              </div>
                          </a>
                      </li>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="fas fa-euro-sign"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyFinance')}</div>
                              </div>
                          </a>
                      </li>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="far fa-question-circle"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyFAQs')}</div>
                              </div>
                          </a>
                      </li>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="fas fa-cog"></i>
                                      </span>
                                  </div>
                                  <div className="menuName my-setting sidebar-menu-name">{t('Doctor.LeftPanel.MySettings')}</div>
                              </div>
                          </a>
                      </li>
                      <ul className="sub-menu-setting">
                          <li className="w-100 sidebar-menu-li">
                              <NavLink className="sidebar-menu-a w-100" to="/doctor-profile" activeClassName="sidebar-menu-li-active" activeStyle={{ fontWeight: "bold", color: "#000" }}>
                                  <div className="d-flex align-items-center">
                                      <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyProfile')}</div>
                                  </div>
                              </NavLink>
                          </li>
                          <li className="w-100 sidebar-menu-li">
                              <NavLink className="sidebar-menu-a w-100" to="/doctor-my-timing" activeClassName="sidebar-menu-li-active" activeStyle={{ fontWeight: "bold", color: "#000" }}>
                                  <div className="d-flex align-items-center">
                                      <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyTiming')}</div>
                                  </div>
                              </NavLink>
                          </li>
                          <li className="w-100 sidebar-menu-li">
                              <NavLink className="sidebar-menu-a w-100" to="/doctor-my-fees" activeClassName="sidebar-menu-li-active" activeStyle={{ fontWeight: "bold", color: "#000" }}>
                                  <div className="d-flex align-items-center">
                                      <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyFees')}</div>
                                  </div>
                              </NavLink>
                          </li>
                      </ul>
                      <li className="w-100 sidebar-menu-li">
                          <a className="sidebar-menu-a w-100">
                              <div className="d-flex align-items-center">
                                  <div className="sidebar-menu-img">
                                      <span className="mainLeftPanelFontSize25">
                                          <i className="fas fa-envelope-open-text"></i>
                                      </span>
                                  </div>
                                  <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MassMessages')}</div>
                              </div>
                          </a>
                      </li>
                  </ul>
                  </div>
              </div>*/
