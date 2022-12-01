import {
  GET_PATIENT_PROFILE_INFO,
  SAVE_PATIENT_PROFILE_INFO,
  CHANGE_STATUS,
  DELETE_PATIENT,
  GET_PATIENT_QUESTIONNAIRE,
  GET_PATIENT_ANSWERS,
  SAVE_ANSWERS,
  SEARCH_DOCTOR_APPOINTMENT,
  GET_LOCATION,
  SEARCH_APPOINTMENT,
  GET_MORE_REVIEWS,
  VIEW_ALLAVAILABILITY,
  FETCH_NEXT_APPOINTMENTS,
  BOOK_APPOINTMENT,
  UPDATE_APPOINTMENT_MODEL,
  UPDATE_DOCTOR_APPOINTMENT_DETAILS,
  PATIENT_APPOINTMENTS,
  GET_BOOKED_APPOINTMENT,
  UPDATE_PATIENT_ATTACHMENT,
  GET_APPOINTMENTS,
  CHANGE_APPOINTMENT_STATUS,
  CANCEL_APPOINTMENT,
  UPLOAD_DOCUMENT,
  REMOVE_DOCUMENT,
  GET_DOCTOR_REVIEW_BY_ID,
  GET_DOCTOR_REVIEW_BY_APPOINTMENT_ID,
  SAVE_REVIEW,
  GET_WALLET_BALANCE,
  SAVE_PAYMENT,
  SHOW_DIAGNOSIS_TO_OTHERS,
  ADD_REFUND,
  GET_REFUND_BY_ID,
  WITHDRAW_MONEY,
  GET_PATIENT_FINANCE_DATA,
} from "./constants";

const getPatientProfileInfo = ({ userGuid, promise }) => ({
  type: GET_PATIENT_PROFILE_INFO,
  userGuid,
  promise,
});

const savePatientProfileInfo = ({ userModel, promise }) => ({
  type: SAVE_PATIENT_PROFILE_INFO,
  userModel,
  promise,
});

const deletePatient = ({ patientGuid, promise }) => ({
  type: DELETE_PATIENT,
  patientGuid,
  promise,
});

const changeStatus = ({ userGuid, promise }) => ({
  type: CHANGE_STATUS,
  userGuid,
  promise,
});

const getPatientQuestionnaire = ({ languageId, promise }) => ({
  type: GET_PATIENT_QUESTIONNAIRE,
  languageId,
  promise,
});

const getPatientAnswers = ({ patientGuid, pageNo, promise }) => ({
  type: GET_PATIENT_ANSWERS,
  patientGuid,
  pageNo,
  promise,
});

const saveAnswers = ({ answers, promise }) => ({
  type: SAVE_ANSWERS,
  answers,
  promise,
});

const searchDoctorAppointment = ({
  appointmentModel,
  doctorGuid,
  promise,
}) => ({
  type: SEARCH_DOCTOR_APPOINTMENT,
  appointmentModel,
  doctorGuid,
  promise,
});

const getLocation = ({ promise }) => ({
  type: GET_LOCATION,
  promise,
});

const searchAppointment = ({ appointmentModel, promise }) => ({
  type: SEARCH_APPOINTMENT,
  appointmentModel,
  promise,
});

const getMoreReviews = ({ doctorGuid, pageNo, promise }) => ({
  type: GET_MORE_REVIEWS,
  doctorGuid,
  pageNo,
  promise,
});

const viewAllAvailability = ({ appointmentModel, doctorGuid, promise }) => ({
  type: VIEW_ALLAVAILABILITY,
  appointmentModel,
  doctorGuid,
  promise,
});

const fetchNextAppointments = ({
  appointmentModel,
  doctorGuid,
  isViewAllAvailability,
  promise,
}) => ({
  type: FETCH_NEXT_APPOINTMENTS,
  appointmentModel,
  doctorGuid,
  isViewAllAvailability,
  promise,
});

const bookAppointment = ({ appointment, promise }) => ({
  type: BOOK_APPOINTMENT,
  appointment,
  promise,
});

const patientAppointments = ({ filter, promise }) => ({
  type: PATIENT_APPOINTMENTS,
  filter,
  promise,
});

const getBookedAppointment = ({ appointmentGuid, promise }) => ({
  type: GET_BOOKED_APPOINTMENT,
  appointmentGuid,
  promise,
});

const updatePatientAttachment = ({ patientGuid, file, promise }) => ({
  type: UPDATE_PATIENT_ATTACHMENT,
  patientGuid,
  file,
  promise,
});

const getAppointments = ({ filter, promise }) => ({
  type: GET_APPOINTMENTS,
  filter,
  promise,
});

const changeAppointmentStatus = ({ appointmentGuid, isConfirm, promise }) => ({
  type: CHANGE_APPOINTMENT_STATUS,
  appointmentGuid,
  isConfirm,
  promise,
});

const cancelAppointment = ({
  appointmentGuid,
  cancelReason,
  canceledBy,
  promise,
  suggestedDateTime,
}) => ({
  type: CANCEL_APPOINTMENT,
  appointmentGuid,
  cancelReason,
  canceledBy,
  promise,
  suggestedDateTime,
});

//For Reducers
const updateAppoimentModel = (appoitmentData) => ({
  type: UPDATE_APPOINTMENT_MODEL,
  appoitmentData,
});

const updateDoctorAppointmentDetails = (docAppoinmentDetails) => ({
  type: UPDATE_DOCTOR_APPOINTMENT_DETAILS,
  docAppoinmentDetails,
});

const uploadDocument = ({ documentType, referenceGuid, file, promise }) => ({
  type: UPLOAD_DOCUMENT,
  documentType,
  referenceGuid,
  file,
  promise,
});

const removeDocument = ({ documentURI, documentName, promise }) => ({
  type: REMOVE_DOCUMENT,
  documentURI,
  documentName,
  promise,
});

const getDoctorReviewById = ({ reviewGuid, promise }) => ({
  type: GET_DOCTOR_REVIEW_BY_ID,
  reviewGuid,
  promise,
});

const getDoctorReviewByAppointmentId = ({ appointmentGuid, promise }) => ({
  type: GET_DOCTOR_REVIEW_BY_APPOINTMENT_ID,
  appointmentGuid,
  promise,
});

const saveReview = ({ model, promise }) => ({
  type: SAVE_REVIEW,
  model,
  promise,
});

const getWalletBalance = ({ patientGuid, promise }) => ({
  type: GET_WALLET_BALANCE,
  patientGuid,
  promise,
});

const savePayment = ({ model, promise }) => ({
  type: SAVE_PAYMENT,
  model,
  promise,
});

const showDiagnosisToOthers = ({ appointmentGuid, bValue, promise }) => ({
  type: SHOW_DIAGNOSIS_TO_OTHERS,
  appointmentGuid,
  bValue,
  promise,
});

const addRefund = ({ refundModel, promise }) => ({
  type: ADD_REFUND,
  refundModel,
  promise,
});

const getRefundById = ({ refundGuid, promise }) => ({
  type: GET_REFUND_BY_ID,
  refundGuid,
  promise,
});

const withdrawMoney = ({ withdrawData, promise }) => ({
  type: WITHDRAW_MONEY,
  withdrawData,
  promise,
});

const getPatientFinanceData = ({ patientGuid, promise }) => ({
  type: GET_PATIENT_FINANCE_DATA,
  patientGuid,
  promise,
});

const exadoPatientActions = {
  getPatientProfileInfo,
  savePatientProfileInfo,
  deletePatient,
  changeStatus,
  getPatientQuestionnaire,
  getPatientAnswers,
  saveAnswers,
  searchDoctorAppointment,
  getLocation,
  searchAppointment,
  getMoreReviews,
  viewAllAvailability,
  fetchNextAppointments,
  bookAppointment,
  updateAppoimentModel,
  updateDoctorAppointmentDetails,
  patientAppointments,
  getBookedAppointment,
  updatePatientAttachment,
  getAppointments,
  changeAppointmentStatus,
  cancelAppointment,
  uploadDocument,
  removeDocument,
  getDoctorReviewById,
  getDoctorReviewByAppointmentId,
  saveReview,
  getWalletBalance,
  savePayment,
  showDiagnosisToOthers,
  addRefund,
  getRefundById,
  withdrawMoney,
  getPatientFinanceData,
};

export default exadoPatientActions;
