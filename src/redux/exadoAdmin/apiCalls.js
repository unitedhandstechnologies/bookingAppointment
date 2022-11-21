import ApiService from "../../apiService";
import { getConfig } from "../../utility/apiConfig";

export async function getUnVerifiedDoctorsList() {
  const config = getConfig("exadoAdmin.GetUnVerifiedDoctorsList");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorViewDetails(userGuid) {
  const config = getConfig("exadoAdmin.GetDoctorViewDetails");
  config.urlParams = { userGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function verifyDoctorProfile(
  userGuid,
  verificationType,
  cancelReason
) {
  const config = getConfig("exadoAdmin.VerifyDoctorProfile");
  config.urlParams = { userGuid, verificationType, cancelReason };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPagedPatientsList(paging) {
  const config = getConfig("exadoAdmin.GetPagedPatientsList");
  config.urlParams = paging;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPagedDoctorsList(paging) {
  const config = getConfig("exadoAdmin.GetPagedDoctorsList");
  config.urlParams = paging;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPatientViewDetails(patientGuid) {
  const config = getConfig("exadoAdmin.GetPatientViewDetails");
  config.urlParams = { patientGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllRefundData() {
  const config = getConfig("exadoAdmin.GetAllRefundData");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function approveRefund(model) {
  const config = getConfig("exadoAdmin.ApproveRefund");
  config.data = model;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllUnprocessedWithdraw(paging) {
  const config = getConfig("exadoAdmin.GetAllUnprocessedWithdraw");
  config.urlParams = paging;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function approveWithdraw(withdrawGuid) {
  const config = getConfig("exadoAdmin.ApproveWithdraw");
  config.urlParams = withdrawGuid;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllReviews(paging) {
  const config = getConfig("exadoAdmin.GetAllReviews");
  config.data = paging;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function deleteReviewById(reviewGuid) {
  const config = getConfig("exadoAdmin.DeleteReviewById");
  config.urlParams = reviewGuid;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllCommission() {
  const config = getConfig("exadoAdmin.GetAllCommission");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveDoctorCommission(list) {
  const config = getConfig("exadoAdmin.SaveDoctorCommission");
  config.data = { ...list };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getFinanceData() {
  const config = getConfig("exadoAdmin.GetFinanceData");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function markAsPaid(data) {
  const config = getConfig("exadoAdmin.MarkAsPaid");
  config.data = data;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorPayment(query) {
  const config = getConfig("exadoAdmin.GetDoctorPayment");
  config.urlParams = query;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveCMSPage(data) {
  const config = getConfig("exadoAdmin.SaveCMSPage");
  config.data = data;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getLanguageAllMessages(query) {
  const config = getConfig("exadoAdmin.GetLanguageAllMessages");
  config.urlParams = query;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveLanguageLabelData(data) {
  const config = getConfig("exadoAdmin.SaveLanguageLabelData");
  config.data = data;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPatientQuestionnaireLanguage(query) {
  const config = getConfig("exadoAdmin.GetPatientQuestionnaireLanguage");
  config.urlParams = query;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function savePatientQuestionnaireLanguage(data) {
  const config = getConfig("exadoAdmin.SavePatientQuestionnaireLanguage");
  config.data = data;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllPhysicianServiceDetail() {
  const config = getConfig("exadoAdmin.GetAllPhysicianServiceDetail");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function savePhysicianService(data) {
  const config = getConfig("exadoAdmin.SavePhysicianService");
  config.data = data;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAllLanguageDetail() {
  const config = getConfig("exadoAdmin.GetAllLanguageDetail");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveLanguage(data) {
  const config = getConfig("exadoAdmin.SaveLanguage");
  config.data = data;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveWebsiteLanguageId(query) {
  const config = getConfig("exadoAdmin.SaveWebsiteLanguageId");
  config.urlParams = query;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}
