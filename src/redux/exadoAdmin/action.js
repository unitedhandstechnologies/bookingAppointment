import {
  GET_UNVERIFIED_DOCTORS_LIST,
  GET_DOCTOR_VIEW_DETAILS,
  VERIFY_DOCTOR_PROFILE,
  GET_PAGED_PATIENTS_LIST,
  GET_PAGED_DOCTORS_LIST,
  GET_PATIENT_VIEW_DETAILS,
  GET_ALL_REFUND_DATA,
  APPROVE_REFUND,
  GET_ALL_UNPROCESSED_WITHDRAW,
  APPROVE_WITHDRAW,
  GET_ALL_REVIEWS,
  DELETE_REVIEW_BY_ID,
  GET_ALL_COMMISSION,
  SAVE_DOCTOR_COMMISSION,
  GET_FINANCE_DATA,
  MARK_AS_PAID,
  GET_DOCTOR_PAYMENT,
  SAVE_CMS_PAGE,
  GET_LANGUAGE_ALL_MESSAGES,
  SAVE_LANGUAGE_LABEL_DATA,
  GET_PATIENT_QUESTIONNAIRE_LANGUAGE,
  SAVE_PATIENT_QUESTIONNAIRE_LANGUAGE,
  GET_ALL_PHYSICIAN_SERVICE_DETAIL,
  SAVE_PHYSICIAN_SERVICE,
  GET_ALL_LANGUAGE_DETAIL,
  SAVE_LANGUAGE,
  SAVE_WEBSITE_LANGUAGE_ID,
} from "./constants";

const getUnVerifiedDoctorsList = ({ promise }) => ({
  type: GET_UNVERIFIED_DOCTORS_LIST,
  promise,
});

const getDoctorViewDetails = ({ userGuid, promise }) => ({
  type: GET_DOCTOR_VIEW_DETAILS,
  userGuid,
  promise,
});

const verifyDoctorProfile = ({
  userGuid,
  verificationType,
  cancelReason,
  promise,
}) => ({
  type: VERIFY_DOCTOR_PROFILE,
  userGuid,
  verificationType,
  cancelReason,
  promise,
});

const getPagedPatientsList = ({ paging, promise }) => ({
  type: GET_PAGED_PATIENTS_LIST,
  paging,
  promise,
});

const getPagedDoctorsList = ({ paging, promise }) => ({
  type: GET_PAGED_DOCTORS_LIST,
  paging,
  promise,
});

const getPatientViewDetails = ({ patientGuid, promise }) => ({
  type: GET_PATIENT_VIEW_DETAILS,
  patientGuid,
  promise,
});

const getAllRefundData = ({ promise }) => ({
  type: GET_ALL_REFUND_DATA,
  promise,
});

const approveRefund = ({ model, promise }) => ({
  type: APPROVE_REFUND,
  model,
  promise,
});

const getAllUnprocessedWithdraw = ({ paging, promise }) => ({
  type: GET_ALL_UNPROCESSED_WITHDRAW,
  paging,
  promise,
});

const approveWithdraw = ({ withdrawGuid, promise }) => ({
  type: APPROVE_WITHDRAW,
  withdrawGuid,
  promise,
});

const getAllReviews = ({ paging, promise }) => ({
  type: GET_ALL_REVIEWS,
  paging,
  promise,
});

const deleteReviewById = ({ reviewGuid, promise }) => ({
  type: DELETE_REVIEW_BY_ID,
  reviewGuid,
  promise,
});

const getAllCommission = ({ promise }) => ({
  type: GET_ALL_COMMISSION,
  promise,
});

const saveDoctorCommission = ({ list, promise }) => ({
  type: SAVE_DOCTOR_COMMISSION,
  list,
  promise,
});

const getFinanceData = ({ promise }) => ({
  type: GET_FINANCE_DATA,
  promise,
});

const markAsPaid = ({ data, promise }) => ({
  type: MARK_AS_PAID,
  data,
  promise,
});

const getDoctorPayment = ({ query, promise }) => ({
  type: GET_DOCTOR_PAYMENT,
  query,
  promise,
});

const saveCMSPage = ({ data, promise }) => ({
  type: SAVE_CMS_PAGE,
  data,
  promise,
});

const getLanguageAllMessages = ({ query, promise }) => ({
  type: GET_LANGUAGE_ALL_MESSAGES,
  query,
  promise,
});

const saveLanguageLabelData = ({ data, promise }) => ({
  type: SAVE_LANGUAGE_LABEL_DATA,
  data,
  promise,
});

const getPatientQuestionnaireLanguage = ({ query, promise }) => ({
  type: GET_PATIENT_QUESTIONNAIRE_LANGUAGE,
  query,
  promise,
});

const savePatientQuestionnaireLanguage = ({ data, promise }) => ({
  type: SAVE_PATIENT_QUESTIONNAIRE_LANGUAGE,
  data,
  promise,
});

const getAllPhysicianServiceDetail = ({ promise }) => ({
  type: GET_ALL_PHYSICIAN_SERVICE_DETAIL,
  promise,
});

const savePhysicianService = ({ data, promise }) => ({
  type: SAVE_PHYSICIAN_SERVICE,
  data,
  promise,
});

const getAllLanguageDetail = ({ promise }) => ({
  type: GET_ALL_LANGUAGE_DETAIL,
  promise,
});

const saveLanguage = ({ data, promise }) => ({
  type: SAVE_LANGUAGE,
  data,
  promise,
});

const saveWebsiteLanguageId = ({ query, promise }) => ({
  type: SAVE_WEBSITE_LANGUAGE_ID,
  query,
  promise,
});

const exadoAdminActions = {
  getUnVerifiedDoctorsList,
  getDoctorViewDetails,
  verifyDoctorProfile,
  getPagedPatientsList,
  getPagedDoctorsList,
  getPatientViewDetails,
  getAllRefundData,
  approveRefund,
  getAllUnprocessedWithdraw,
  approveWithdraw,
  getAllReviews,
  deleteReviewById,
  getAllCommission,
  saveDoctorCommission,
  getFinanceData,
  markAsPaid,
  getDoctorPayment,
  saveCMSPage,
  getLanguageAllMessages,
  saveLanguageLabelData,
  getPatientQuestionnaireLanguage,
  savePatientQuestionnaireLanguage,
  getAllPhysicianServiceDetail,
  savePhysicianService,
  getAllLanguageDetail,
  saveLanguage,
  saveWebsiteLanguageId,
};

export default exadoAdminActions;
