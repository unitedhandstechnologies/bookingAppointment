import {
    GET_CURRENCY,
    GET_COUNTRY,
    GET_DOCTOR_FEES,
    SAVE_DOCTOR_FEES,
    GET_PROFILE_INFO,
    GET_LANGUAGES,
    SEND_TEXT_OTP,
    SAVE_PROFILE_INFO,
    GET_PHYSICIAN_SERVICE,
    GET_ADDITIONAL_INFO,
    SAVE_ADDITIONAL_INFO, UPLOAD_DOCTOR_PROFILE_CERTIFICATES,
    UPLOAD_PROFILE_IMAGE, GET_WEBSITE_LANGUAGES, GET_TIMEZONES,
    DEACTIVATE_ACCOUNT,
    GET_DOCTOR_DEFAULT_TIMING, GET_DOCTOR_DEFAULT_TIMING_BY_ID, SAVE_DOCTOR_DEFAULT_TIMING, DELETE_DOCTOR_DEFAULT_TIMING_BY_ID,
    GET_DOCTOR_CUSTOM_TIMING, GET_DOCTOR_CUSTOM_TIMING_BY_ID, SAVE_DOCTOR_CUSTOM_TIMING, DELETE_DOCTOR_CUSTOM_TIMING_BY_ID,
    MARK_APPOINTMENT_AS_COMPLETE, GET_DIAGNOSTIC_BY_ID, SAVE_DIAGNOSTIC_REPORT, GET_ALL_APPOINTMENT_DETAIL, GET_DOCTOR_FAQ_BY_ID, GET_DOCTORS_FAQS, SAVE_FAQ, DELETE_FAQ, GET_DOCTOR_FINANCE_DATA, GET_DOCTORS_PATIENT, GET_BOOKED_APPOINTMENTS, BOOK_OFFLINE_APPOINTMENT, GET_ALL_DOCTOR_ADDITIONAL_SERVICE, SAVE_DOCTOR_ADDITIONAL_SERVICE, DELETE_DOCTOR_SERVICE_BY_ID, SAVE_ADDITIONAL_SERVICES, GET_INVOICE_DETAILS, GET_ADDITIONAL_SERVICE_INFO,
} from './constants';

const getCurrency = ({ promise }) => (
    {
        type: GET_CURRENCY,
        promise
    });

const getCountry = ({ promise }) => (
    {
        type: GET_COUNTRY,
        promise
    });

const getLanguages = ({ promise }) => (
    {
        type: GET_LANGUAGES,
        promise
    });

const getWebsiteLanguages = ({ promise }) => (
    {
        type: GET_WEBSITE_LANGUAGES,
        promise
    });

const getPhysicianService = ({ promise }) => (
    {
        type: GET_PHYSICIAN_SERVICE,
        promise
    });

const getDoctorFees = ({ userGuid, promise }) => (
    {
        type: GET_DOCTOR_FEES,
        userGuid,
        promise
    });

const saveDoctorFees = ({ doctorFeesInfoModel, promise }) => (
    {
        type: SAVE_DOCTOR_FEES,
        doctorFeesInfoModel,
        promise
    });

const getProfileInfo = ({ userGuid, promise }) => (
    {
        type: GET_PROFILE_INFO,
        userGuid,
        promise
    });

const getAdditionalInfo = ({ userGuid, promise }) => (
    {
        type: GET_ADDITIONAL_INFO,
        userGuid,
        promise
    });

const sendTextOTP = ({ userGuid, mobile, promise }) => (
    {
        type: SEND_TEXT_OTP,
        userGuid,
        mobile,
        promise
    });

const saveProfileInfo = ({ userModel, promise }) => (
    {
        type: SAVE_PROFILE_INFO,
        userModel,
        promise
    });

const saveAdditionalInfo = ({ additionalInfoModel, promise }) => (
    {
        type: SAVE_ADDITIONAL_INFO,
        additionalInfoModel,
        promise
    });

const uploadDoctorProfileCertificates = ({ fileType, doctorGuid, file, promise }) => (
    {
        type: UPLOAD_DOCTOR_PROFILE_CERTIFICATES,
        fileType,
        doctorGuid,
        file,
        promise
    });

const uploadProfileImage = ({ model, promise }) => (
    {
        type: UPLOAD_PROFILE_IMAGE,
        model,
        promise
    });

const getTimezones = ({ promise }) => (
    {
        type: GET_TIMEZONES,
        promise
    });

const deactivateAccount = ({ doctorGuid, promise }) => (
    {
        type: DEACTIVATE_ACCOUNT,
        doctorGuid,
        promise
    });

const getDoctorDefaultTiming = ({ doctorGuid, promise }) => (
    {
        type: GET_DOCTOR_DEFAULT_TIMING,
        doctorGuid,
        promise
    });

const getDoctorDefaultTimingById = ({ defaultGuid, promise }) => (
    {
        type: GET_DOCTOR_DEFAULT_TIMING_BY_ID,
        defaultGuid,
        promise
    });

const saveDoctorDefaultTiming = ({ doctorDefaultTimingModel, promise }) => (
    {
        type: SAVE_DOCTOR_DEFAULT_TIMING,
        doctorDefaultTimingModel,
        promise
    });

const deleteDoctorDefaultTimingById = ({ defaultGuid, promise }) => (
    {
        type: DELETE_DOCTOR_DEFAULT_TIMING_BY_ID,
        defaultGuid,
        promise
    });

const getDoctorCustomTiming = ({ doctorGuid, promise }) => (
    {
        type: GET_DOCTOR_CUSTOM_TIMING,
        doctorGuid,
        promise
    });

const getDoctorCustomTimingById = ({ defaultGuid, promise }) => (
    {
        type: GET_DOCTOR_CUSTOM_TIMING_BY_ID,
        defaultGuid,
        promise
    });

const saveDoctorCustomTiming = ({ doctorCustomTimingModel, promise }) => (
    {
        type: SAVE_DOCTOR_CUSTOM_TIMING,
        doctorCustomTimingModel,
        promise
    });

const deleteDoctorCustomTimingById = ({ defaultGuid, promise }) => (
    {
        type: DELETE_DOCTOR_CUSTOM_TIMING_BY_ID,
        defaultGuid,
        promise
    });

const markAppointmentAsComplete = ({ appointmentGuid, promise }) => (
    {
        type: MARK_APPOINTMENT_AS_COMPLETE,
        appointmentGuid,
        promise
    });

const getDiagnosticById = ({ appointmentGuid, promise }) => (
    {
        type: GET_DIAGNOSTIC_BY_ID,
        appointmentGuid,
        promise
    });

const saveDiagnosticReport = ({ model, promise }) => (
    {
        type: SAVE_DIAGNOSTIC_REPORT,
        model,
        promise
    });

const getAllAppointmentDetail = ({ appointmentGuid, promise }) => (
    {
        type: GET_ALL_APPOINTMENT_DETAIL,
        appointmentGuid,
        promise
    });

const getDoctorFAQById = ({ faqGuid, promise }) => (
    {
        type: GET_DOCTOR_FAQ_BY_ID,
        faqGuid,
        promise
    });

const getDoctorsFAQs = ({ doctorGuid, promise }) => (
    {
        type: GET_DOCTORS_FAQS,
        doctorGuid,
        promise
    });

const saveFAQ = ({ model, promise }) => (
    {
        type: SAVE_FAQ,
        model,
        promise
    });

const deleteFAQ = ({ faqGuid, promise }) => (
    {
        type: DELETE_FAQ,
        faqGuid,
        promise
    });

const getDoctorFinanceData = ({ doctorGuid, promise }) => (
    {
        type: GET_DOCTOR_FINANCE_DATA,
        doctorGuid,
        promise
    });

const getDoctorsPatient = ({ modal, promise }) => (
    {
        type: GET_DOCTORS_PATIENT,
        modal,
        promise
    });

const getBookedAppointments = ({ params, promise }) => (
    {
        type: GET_BOOKED_APPOINTMENTS,
        params,
        promise
    });

const bookOfflineAppointment = ({ modal, promise }) => (
    {
        type: BOOK_OFFLINE_APPOINTMENT,
        modal,
        promise
    });

const getAllDoctorAdditionalService = ({ params, promise }) => (
    {
        type: GET_ALL_DOCTOR_ADDITIONAL_SERVICE,
        params,
        promise
    });

const saveDoctorAdditionalService = ({ modal, promise }) => (
    {
        type: SAVE_DOCTOR_ADDITIONAL_SERVICE,
        modal,
        promise
    });

const deleteDoctorServiceById = ({ params, promise }) => (
    {
        type: DELETE_DOCTOR_SERVICE_BY_ID,
        params,
        promise
    });

const saveAdditionalServices = ({ modal, promise }) => (
    {
        type: SAVE_ADDITIONAL_SERVICES,
        modal,
        promise
    });

const getInvoiceDetails = ({ params, promise }) => (
    {
        type: GET_INVOICE_DETAILS,
        params,
        promise
    });

const getAdditionalServiceInfo = ({ params, promise }) => (
    {
        type: GET_ADDITIONAL_SERVICE_INFO,
        params,
        promise
    });

const exadoDocActions = {
    getCurrency,
    getCountry,
    getDoctorFees,
    saveDoctorFees,
    getProfileInfo,
    getLanguages,
    getWebsiteLanguages,
    sendTextOTP,
    saveProfileInfo,
    getPhysicianService,
    getAdditionalInfo,
    saveAdditionalInfo,
    uploadDoctorProfileCertificates,
    uploadProfileImage,
    getTimezones,
    deactivateAccount,
    getDoctorDefaultTiming,
    getDoctorDefaultTimingById,
    saveDoctorDefaultTiming,
    deleteDoctorDefaultTimingById,
    getDoctorCustomTiming,
    getDoctorCustomTimingById,
    saveDoctorCustomTiming,
    deleteDoctorCustomTimingById,
    markAppointmentAsComplete,
    getDiagnosticById,
    saveDiagnosticReport,
    getAllAppointmentDetail,
    getDoctorFAQById,
    getDoctorsFAQs,
    saveFAQ,
    deleteFAQ,
    getDoctorFinanceData,
    getDoctorsPatient,
    getBookedAppointments,
    bookOfflineAppointment,
    getAllDoctorAdditionalService,
    saveDoctorAdditionalService,
    deleteDoctorServiceById,
    saveAdditionalServices,
    getInvoiceDetails,
    getAdditionalServiceInfo
};

export default exadoDocActions;