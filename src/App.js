import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import React, { lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/login/loginpage";
import ResetPassword from "./pages/ResetPassword/resetPassword";
import PatientDashboard from "./pages/patient/patientDashboard";
import DoctorDashboard from "./pages/Doctor/docDashboard";
import DoctorMyFees from "./pages/Doctor/docMyFees/docMyFees";
import DoctorProfilePage from "./pages/Doctor/docProfilePage/docProfilePage";
import landingPage from "./pages/LandingPage/landingPage";
import Emergency from "./pages/LandingPage/emergency";
import ChatWithDoctor from "./pages/LandingPage/chatWithDoctor";
import AdminLoginPage from "./pages/Admin/login";
import AdminDashboard from "./pages/Admin/adminDashboard";
import VerificationRequest from "./pages/Admin/verificationRequest";
import PatientProfile from "./pages/patient/patientProfile/patientProfile";
import PatientGeneralSetting from "./pages/patient/generalSetting";
import PatientListView from "./pages/Admin/patientListView";
import DoctorListView from "./pages/Admin/doctorListView";
import PatientDetailView from "./pages/Admin/patientDetailView";
import DoctorDetailView from "./pages/Admin/doctorDetailView/doctorDetailView";
import DoctorMyTiming from "./pages/Doctor/docMyTiming";
import ContactUs from "./pages/LandingPage/contactUs";
import TermsAndConditions from "./pages/LandingPage/termsAndConditions";
import AboutUs from "./pages/LandingPage/aboutUs";
import BookAnAppoinment from "./pages/LandingPage/bookAnAppointment";
import BookAnAppoinmentDocView from "./pages/LandingPage/bookAnAppoinmentDocView";
import BookAnAppoinmentSave from "./pages/LandingPage/bookAnAppoinmentSave";
import PatientAppointmentRequests from "./pages/patient/patientAppointmentRequest";
import PatientAppointmentUpComing from "./pages/patient/patientAppointmentUpComing";
import PatientAppointmentCompleted from "./pages/patient/patientAppointmentCompleted";
import PatientAppointmentCancelled from "./pages/patient/patientAppointmentCancelled";
import DoctorAppointmentRequests from "./pages/Doctor/doctorAppointmentRequest";
import DoctorAppointmentUpComing from "./pages/Doctor/doctorAppointmentUpComing/doctorAppointmentUpComing";
import DoctorAppointmentCompleted from "./pages/Doctor/doctorAppointmentCompleted/doctorAppointmentCompleted";
import DoctorAppointmentCancelled from "./pages/Doctor/doctorAppointmentCancelled";
import AdminAppointmentRequests from "./pages/Admin/adminAppointmentRequest";
import AdminAppointmentUpComing from "./pages/Admin/adminAppointmentUpComing";
import AdminAppointmentCompleted from "./pages/Admin/adminAppointmentCompleted";
import AdminAppointmentCancelled from "./pages/Admin/adminAppointmentCancelled";
import SaveDiagnostic from "./pages/Doctor/saveDiagnostic/saveDiagnostic";
import DoctorViewDignosticReport from "./pages/Doctor/doctorViewDignosticReport";
import PatientViewDignosticReport from "./pages/patient/patientViewDignosticReport";
import DoctorFAQ from "./pages/Doctor/doctorFAQ";
import PatientMyFinance from "./pages/patient/myFinance/myFinance";
import DoctorMyFinance from "./pages/Doctor/myFinance";
import AdminAppointmentRefund from "./pages/Admin/adminAppointmentRefund";
import AdminUnprocessedWithdrawList from "./pages/Admin/adminUnprocessedWithdrawList";
import DocMyPatients from "./pages/Doctor/docMyPatients";
import AdminFeedback from "./pages/Admin/adminFeedback";
import AdminCommission from "./pages/Admin/adminCommission";
import AdminFinance from "./pages/Admin/adminFinance";
import Languages from "./pages/Admin/masterPages/languages";
import { componentWithLazyLoad } from "./utility/common";
import AddFunds from "./pages/patient/addFunds";
import healthInformation from "./pages/patient/patientProfile/healthInformation";

const CmsPages = lazy(() => import("./pages/Admin/cmsPage/cmsPages"));
const PhysicianServices = lazy(() =>
  import("./pages/Admin/masterPages/physicianServices")
);
const AgoraRTC = lazy(() => import("./commonComponent/AgoraRTC/agoraRTC"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={landingPage} />
          <Route exact path="/language" component={landingPage} />
          <Route exact path="/language/:lan" component={landingPage} />
          <Route exact path="/home" component={landingPage} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route
            exact
            path="/book-an-appoinment"
            component={BookAnAppoinment}
          />
          <Route
            exact
            path="/book-an-appoinment/:phservices"
            component={BookAnAppoinment}
          />
          <Route
            exact
            path="/terms-and-conditions"
            component={TermsAndConditions}
          />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/emergency" component={Emergency} />
          <Route exact path="/chat-with-doctor" component={ChatWithDoctor} />

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register-doctor" component={LoginPage} />
          <Route exact path="/admin-login" component={AdminLoginPage} />
          <Route
            exact
            path="/reset-password/:userId"
            component={ResetPassword}
          />

          <Route exact path="/patient-dashboard" component={PatientDashboard} />
          <Route exact path="/patient-profile" component={PatientProfile} />
          <Route
            exact
            path="/patient-general-setting"
            component={PatientGeneralSetting}
          />
          <Route
            exact
            path="/book-an-appoinment-save"
            component={BookAnAppoinmentSave}
          />
          <Route
            exact
            path="/patient-appointment-requests"
            component={PatientAppointmentRequests}
          />
          <Route
            exact
            path="/patient-appointment-upcoming"
            component={PatientAppointmentUpComing}
          />
          <Route
            exact
            path="/patient-appointment-completed"
            component={PatientAppointmentCompleted}
          />
          <Route
            exact
            path="/patient-appointment-cancelled"
            component={PatientAppointmentCancelled}
          />
          <Route
            exact
            path="/patient-view-diagnostic/:appointmentGuid"
            component={PatientViewDignosticReport}
          />
          <Route exact path="/patient-myfinance" component={PatientMyFinance} />
          <Route exact path="/patient-addfunds" component={AddFunds} />

          <Route exact path="/doctor-dashboard" component={DoctorDashboard} />
          <Route exact path="/doctor-my-patients" component={DocMyPatients} />
          <Route exact path="/doctor-profile" component={DoctorProfilePage} />
          <Route exact path="/doctor-my-fees" component={DoctorMyFees} />
          <Route exact path="/doctor-my-timing" component={DoctorMyTiming} />
          <Route
            exact
            path="/book-an-appoinment-doc-detail/:docGuid"
            component={BookAnAppoinmentDocView}
          />
          <Route
            exact
            path="/doctor-appointment-requests"
            component={DoctorAppointmentRequests}
          />
          <Route
            exact
            path="/doctor-appointment-upcoming"
            component={DoctorAppointmentUpComing}
          />
          <Route
            exact
            path="/doctor-appointment-completed"
            component={DoctorAppointmentCompleted}
          />
          <Route
            exact
            path="/doctor-appointment-cancelled"
            component={DoctorAppointmentCancelled}
          />
          <Route
            exact
            path="/save-diagnostic/:appointmentGuid"
            component={SaveDiagnostic}
          />
          <Route
            exact
            path="/doc-view-diagnostic/:appointmentGuid"
            component={DoctorViewDignosticReport}
          />
          <Route exact path="/doctor-faq" component={DoctorFAQ} />
          <Route exact path="/doctor-myfinance" component={DoctorMyFinance} />

          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route
            exact
            path="/withdraw-list"
            component={AdminUnprocessedWithdrawList}
          />
          <Route
            exact
            path="/admin-verification-request/:userGuid"
            component={VerificationRequest}
          />
          <Route
            exact
            path="/admin-appointment-requests"
            component={AdminAppointmentRequests}
          />
          <Route
            exact
            path="/admin-appointment-upcoming"
            component={AdminAppointmentUpComing}
          />
          <Route
            exact
            path="/admin-appointment-completed"
            component={AdminAppointmentCompleted}
          />
          <Route
            exact
            path="/admin-appointment-cancelled"
            component={AdminAppointmentCancelled}
          />
          <Route exact path="/admin-feedback" component={AdminFeedback} />
          <Route exact path="/admin-commission" component={AdminCommission} />
          <Route exact path="/admin-finance" component={AdminFinance} />
          <Route
            exact
            path="/admin-appointment-refund"
            component={AdminAppointmentRefund}
          />
          <Route
            path="/admin-cms"
            component={() => componentWithLazyLoad(CmsPages)}
          />
          <Route
            path="/admin-physician-services"
            component={() => componentWithLazyLoad(PhysicianServices)}
          />
          <Route exact path="/admin-languages" component={Languages} />

          <Route exact path="/patient-list" component={PatientListView} />
          <Route exact path="/doctor-list" component={DoctorListView} />
          <Route
            exact
            path="/patient-detail-view/:userGuid"
            component={PatientDetailView}
          />
          <Route
            exact
            path="/doctor-detail-view/:userGuid"
            component={DoctorDetailView}
          />
          <Route
            exact
            path="/video-call/:appointmentGuid"
            component={() => componentWithLazyLoad(AgoraRTC)}
          />

          <Route component={() => <h1>Page Not Found</h1>} />
        </Switch>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
