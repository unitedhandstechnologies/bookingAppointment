import ApiService from "../../apiService";
import { getConfig } from "../../utility/apiConfig";

export async function getCurrency() {
  const config = getConfig("exadoDoc.GetCurrency");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getCountry() {
  const config = getConfig("exadoDoc.GetCountry");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getLanguages() {
  const config = getConfig("exadoDoc.GetLanguages");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getWebsiteLanguages() {
  const config = getConfig("exadoDoc.GetWebsiteLanguages");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPhysicianService() {
  const config = getConfig("exadoDoc.GetPhysicianService");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorFees(userGuid) {
  const config = getConfig("exadoDoc.GetDoctorFees");
  config.urlParams = { userGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveDoctorFees(doctorFeesInfoModel) {
  const config = getConfig("exadoDoc.SaveDoctorFees");
  config.data = doctorFeesInfoModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getProfileInfo(userGuid) {
  const config = getConfig("exadoDoc.GetProfileInfo");
  config.urlParams = { userGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAdditionalInfo(userGuid) {
  const config = getConfig("exadoDoc.GetAdditionalInfo");
  config.urlParams = { userGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function sendTextOTP(userGuid, mobile) {
  const config = getConfig("exadoDoc.SendTextOTP");
  config.urlParams = { userGuid, mobile };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveProfileInfo(userModel) {
  const config = getConfig("exadoDoc.SaveProfileInfo");
  config.urlParams = userModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveAdditionalInfo(additionalInfoModel) {
  const config = getConfig("exadoDoc.SaveAdditionalInfo");
  config.urlParams = additionalInfoModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function uploadDoctorProfileCertificates(
  fileType,
  doctorGuid,
  file
) {
  const config = getConfig("exadoDoc.UploadDoctorProfileCertificates");
  config.urlParams = { fileType, doctorGuid };
  config.fileUpload = file;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function uploadProfileImage(model) {
  const config = getConfig("exadoDoc.UploadProfileImage");
  config.data = model;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getTimezones() {
  const config = getConfig("exadoDoc.GetTimezones");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function deactivateAccount(doctorGuid) {
  const config = getConfig("exadoDoc.DeactivateAccount");
  config.urlParams = { doctorGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorDefaultTiming(doctorGuid) {
  const config = getConfig("exadoDoc.GetDoctorDefaultTiming");
  config.urlParams = { doctorGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorDefaultTimingById(defaultGuid) {
  const config = getConfig("exadoDoc.GetDoctorDefaultTimingById");
  config.urlParams = { defaultGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveDoctorDefaultTiming(doctorDefaultTimingModel) {
  const config = getConfig("exadoDoc.SaveDoctorDefaultTiming");
  config.urlParams = doctorDefaultTimingModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function deleteDoctorDefaultTimingById(defaultGuid) {
  const config = getConfig("exadoDoc.DeleteDoctorDefaultTimingById");
  config.urlParams = { defaultGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorCustomTiming(doctorGuid) {
  const config = getConfig("exadoDoc.GetDoctorCustomTiming");
  config.urlParams = { doctorGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorCustomTimingById(defaultGuid) {
  const config = getConfig("exadoDoc.GetDoctorCustomTimingById");
  config.urlParams = { defaultGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveDoctorCustomTiming(doctorCustomTimingModel) {
  const config = getConfig("exadoDoc.SaveDoctorCustomTiming");
  config.data = doctorCustomTimingModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function deleteDoctorCustomTimingById(defaultGuid) {
  const config = getConfig("exadoDoc.DeleteDoctorCustomTimingById");
  config.urlParams = { defaultGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function markAppointmentAsComplete(appointmentGuid) {
  const config = getConfig("exadoDoc.MarkAppointmentAsComplete");
  config.urlParams = { appointmentGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDiagnosticById(appointmentGuid) {
  const config = getConfig("exadoDoc.GetDiagnosticById");
  config.urlParams = { appointmentGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveDiagnosticReport(model) {
  const config = getConfig("exadoDoc.SaveDiagnosticReport");
  config.data = model;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllAppointmentDetail(appointmentGuid) {
  const config = getConfig("exadoDoc.GetAllAppointmentDetail");
  config.urlParams = { appointmentGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorFAQById(faqGuid) {
  const config = getConfig("exadoDoc.GetDoctorFAQById");
  config.urlParams = { faqGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorsFAQs(doctorGuid) {
  const config = getConfig("exadoDoc.GetDoctorsFAQs");
  config.urlParams = { doctorGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveFAQ(model) {
  const config = getConfig("exadoDoc.SaveFAQ");
  config.urlParams = model;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function deleteFAQ(faqGuid) {
  const config = getConfig("exadoDoc.DeleteFAQ");
  config.urlParams = { faqGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorFinanceData(doctorGuid) {
  const config = getConfig("exadoDoc.GetDoctorFinanceData");
  config.urlParams = { doctorGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorsPatient(modal) {
  const config = getConfig("exadoDoc.GetDoctorsPatient");
  config.data = modal;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getBookedAppointments(params) {
  const config = getConfig("exadoDoc.GetBookedAppointments");
  config.urlParams = params;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function bookOfflineAppointment(modal) {
  const config = getConfig("exadoDoc.BookOfflineAppointment");
  config.data = modal;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllDoctorAdditionalService(params) {
  const config = getConfig("exadoDoc.GetAllDoctorAdditionalService");
  config.urlParams = params;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveDoctorAdditionalService(modal) {
  const config = getConfig("exadoDoc.SaveDoctorAdditionalService");
  config.data = modal;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function deleteDoctorServiceById(params) {
  const config = getConfig("exadoDoc.DeleteDoctorServiceById");
  config.urlParams = params;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveAdditionalServices(modal) {
  const config = getConfig("exadoDoc.SaveAdditionalServices");
  config.data = modal;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getInvoiceDetails(params) {
  const config = getConfig("exadoDoc.GetInvoiceDetails");
  config.urlParams = params;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAdditionalServiceInfo(params) {
  const config = getConfig("exadoDoc.GetAdditionalServiceInfo");
  config.urlParams = params;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}
