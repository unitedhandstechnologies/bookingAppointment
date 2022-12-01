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
  FaUser,
  FaCog,
  FaEnvelopeOpenText,
} from "react-icons/fa";

class AdminLeftPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LeftMenuToggled: true,
    };
  }

  render() {
    const { t } = this.props;
    return (
      <div className="col-md-12 col-lg-2 col-sm-12 mainLeftPanel p-0">
        <ProSidebar toggled={this.state.LeftMenuToggled} breakPoint="md">
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem icon={<FaColumns />} active={true}>
                <Link to="/admin/dashboard" />
                My Dashboard
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu title="Appointments" icon={<FaCog />}>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/admin/appointment-requests" />
                  Requests
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/admin/appointment-upcoming" />
                  Upcoming
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/admin/appointment-completed" />
                  Completed
                </MenuItem>
                <MenuItem icon={<FaCalendar />} active={false}>
                  <Link to="/admin/appointment-cancelled" />
                  Cancelled
                </MenuItem>
              </SubMenu>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaUser />} active={false}>
                <Link to="/admin/doctor-list" />
                Doctors
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/admin/patient-list" />
                Patients
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/admin/dashboard" />
                Emergency calls
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/admin/dashboard" />
                Billing
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/admin/dashboard" />
                Reports & Analytics
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/admin/dashboard" />
                Support
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/admin/dashboard" />
                CMS
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem icon={<FaEnvelopeOpenText />} active={false}>
                <Link to="/admin/dashboard" />
                My Settings
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
      // <div className="col-md-12 col-lg-2 col-sm-12 mainLeftPanel">
      //     <div className="row mt-4">
      //         <ul>
      //             <li className="w-100 sidebar-menu-li">
      //                 <NavLink className="sidebar-menu-a w-100" to="/admin/physician-servicesdashboard" activeClassName="sidebar-menu-li-active" activeStyle={{ fontWeight: "bold", color: "#000" }}>
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-columns"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">{t('Doctor.LeftPanel.MyDashboard')}</div>
      //                     </div>
      //                 </NavLink>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <a className="sidebar-menu-a w-100">
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="far fa-calendar"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">Appointments</div>
      //                     </div>
      //                 </a>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <NavLink className="sidebar-menu-a w-100" to="/admin/doctor-list" activeClassName="sidebar-menu-li-active" activeStyle={{ fontWeight: "bold", color: "#000" }}>
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-user-md"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">Doctors</div>
      //                     </div>
      //                 </NavLink>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <NavLink className="sidebar-menu-a w-100" to="/admin/patient-list" activeClassName="sidebar-menu-li-active" activeStyle={{ fontWeight: "bold", color: "#000" }}>
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-hospital-user"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">Patients</div>
      //                     </div>
      //                 </NavLink>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <a className="sidebar-menu-a w-100">
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-ambulance"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">Emergency calls</div>
      //                     </div>
      //                 </a>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <a className="sidebar-menu-a w-100">
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-money-bill"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">Billing</div>
      //                     </div>
      //                 </a>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <a className="sidebar-menu-a w-100">
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="far fa-chart-bar"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">Reports & Analytics</div>
      //                     </div>
      //                 </a>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <a className="sidebar-menu-a w-100">
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-comment-dots"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">Support</div>
      //                     </div>
      //                 </a>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <a className="sidebar-menu-a w-100">
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-folder"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">CMS</div>
      //                     </div>
      //                 </a>
      //             </li>
      //             <li className="w-100 sidebar-menu-li">
      //                 <a className="sidebar-menu-a w-100">
      //                     <div className="d-flex align-items-center">
      //                         <div className="sidebar-menu-img">
      //                             <span className="mainLeftPanelFontSize25">
      //                                 <i className="fas fa-cog"></i>
      //                             </span>
      //                         </div>
      //                         <div className="sidebar-menu-name">My Settings</div>
      //                     </div>
      //                 </a>
      //             </li>
      //         </ul>
      //     </div>
      // </div>
    );
  }
}
export default withTranslation()(AdminLeftPanel);
