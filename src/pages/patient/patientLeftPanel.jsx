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
  FaEuroSign,
  FaCog,
  FaEnvelopeOpenText,
} from "react-icons/fa";

class PatientLeftPanel extends React.Component {
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
                <Link to="/patient/dashboard" />
                {t("Patient.LeftPanel.My_Overview")}
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu title="My Appointment" icon={<FaCog />}>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/patient/appointment-requests" />
                  {t("Patient.LeftPanel.Requests")}
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/patient/appointment-upcoming" />
                  {t("Patient.LeftPanel.Upcoming")}
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/patient/appointment-completed" />
                  {t("Patient.LeftPanel.Completed")}
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/patient/appointment-cancelled" />
                  {t("Patient.LeftPanel.Cancelled")}
                </MenuItem>
              </SubMenu>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEuroSign />} active={false}>
                <Link to="/patient/dashboard" />
                {t("Patient.LeftPanel.My_Finance")}
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu title="My Settings" icon={<FaCog />}>
                <MenuItem icon={<FaColumns />} active={false}>
                  <Link to="/patient/profile" />
                  {t("Patient.LeftPanel.My_Profile")}
                </MenuItem>
                {/* <MenuItem icon={<FaColumns />} active={false}><Link to="/patient/profile" />General Settings</MenuItem> */}
              </SubMenu>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/doctor/profile" />
                {t("Patient.LeftPanel.My_Notification")}
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    );
  }
}

export default withTranslation()(PatientLeftPanel);
