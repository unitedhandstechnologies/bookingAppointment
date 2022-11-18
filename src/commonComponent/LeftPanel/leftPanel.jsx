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
  FaMoneyBill,
} from "react-icons/fa";
import { localStorageKeys, userType } from "../../utility/common";

class LeftPanel extends React.Component {
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
      <>
        {parseInt(localStorage.getItem(localStorageKeys.userType)) ===
          userType.patient && (
          <div className="col-md-12 col-lg-2 col-sm-12 mainLeftPanel p-0">
            <div
              className="menu-icon"
              onClick={this.MobileToggleClick.bind(this)}
            >
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
                    <Link to="/patient-dashboard" />
                    {t("Patient.LeftPanel.My_Overview")}
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <SubMenu
                    title={t("Patient.LeftPanel.My_Appointment")}
                    icon={<FaCog />}
                  >
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/patient-appointment-requests" />
                      {t("Patient.LeftPanel.Requests")}
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/patient-appointment-upcoming" />
                      {t("Patient.LeftPanel.Upcoming")}
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/patient-appointment-completed" />
                      {t("Patient.LeftPanel.Completed")}
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/patient-appointment-cancelled" />
                      {t("Patient.LeftPanel.Cancelled")}
                    </MenuItem>
                  </SubMenu>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEuroSign />} active={false}>
                    <Link to="/patient-myfinance" />
                    {t("Patient.LeftPanel.My_Finance")}
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <SubMenu
                    title={t("Patient.LeftPanel.My_Settings")}
                    icon={<FaCog />}
                  >
                    <MenuItem icon={<FaColumns />} active={false}>
                      <Link to="/patient-profile" />
                      {t("Patient.LeftPanel.My_Profile")}
                    </MenuItem>
                    {/* <MenuItem icon={<FaColumns />} active={false}><Link to="/patient-profile" />General Settings</MenuItem> */}
                  </SubMenu>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/patient-profile" />
                    {t("Patient.LeftPanel.My_Notification")}
                  </MenuItem>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
        )}
        {parseInt(localStorage.getItem(localStorageKeys.userType)) ===
          userType.doctor && (
          <div className="col-md-12 col-lg-2 col-sm-12 mainLeftPanel p-0">
            <div
              className="menu-icon"
              onClick={this.MobileToggleClick.bind(this)}
            >
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
                    <Link to="/doctor-my-patients" />
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
                    <Link to="/doctor-myfinance" />
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
        )}
        {parseInt(localStorage.getItem(localStorageKeys.userType)) ===
          userType.admin && (
          <div className="col-md-12 col-lg-2 col-sm-12 mainLeftPanel p-0">
            <ProSidebar toggled={this.state.LeftMenuToggled} breakPoint="md">
              <SidebarContent>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaColumns />} active={true}>
                    <Link to="/admin-dashboard" />
                    My Dashboard
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <SubMenu title="Appointments" icon={<FaCog />}>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/admin-appointment-requests" />
                      Requests
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/admin-appointment-upcoming" />
                      Upcoming
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/admin-appointment-completed" />
                      Completed
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/admin-appointment-cancelled" />
                      Cancelled
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/admin-appointment-refund" />
                      Refund
                    </MenuItem>
                  </SubMenu>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaUser />} active={false}>
                    <Link to="/doctor-list" />
                    Doctors
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/patient-list" />
                    Patients
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaMoneyBill />} active={false}>
                    <Link to="/withdraw-list" />
                    Withdraw
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-dashboard" />
                    Emergency calls
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-dashboard" />
                    Billing
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-commission" />
                    Commission
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaMoneyBill />} active={false}>
                    <Link to="/admin-finance" />
                    Finance
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-dashboard" />
                    Reports & Analytics
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-feedback" />
                    Feedback
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-dashboard" />
                    Support
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-cms" />
                    CMS Pages
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                    <Link to="/admin-dashboard" />
                    My Settings
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <SubMenu title="Master Pages" icon={<FaCog />}>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/admin-physician-services" />
                      Physician Services
                    </MenuItem>
                    <MenuItem icon={<FaCalendar />} active={false}>
                      <Link to="/admin-languages" />
                      Languages
                    </MenuItem>
                  </SubMenu>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
        )}
      </>
    );
  }
}

export default withTranslation()(LeftPanel);
