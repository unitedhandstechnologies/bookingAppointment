import ApiService from "../../apiService";
import { getConfig } from "../../utility/apiConfig";

export async function getPatientProfileInfo(userGuid) {
  const config = getConfig("exadoPatient.GetPatientProfileInfo");
  config.urlParams = { userGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function savePatientProfileInfo(userModel) {
  const config = getConfig("exadoPatient.SavePatientProfileInfo");
  config.data = userModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function deletePatient(patientGuid) {
  const config = getConfig("exadoPatient.DeletePatient");
  config.urlParams = { patientGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function changeStatus(userGuid) {
  const config = getConfig("exadoPatient.ChangeStatus");
  config.urlParams = { userGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPatientQuestionnaire(pageNo) {
  const config = getConfig("exadoPatient.GetPatientQuestionnaire");
  config.urlParams = { pageNo };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPatientAnswers(patientGuid, pageNo) {
  const config = getConfig("exadoPatient.GetPatientAnswers");
  config.urlParams = { patientGuid, pageNo };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveAnswers(answers) {
  const config = getConfig("exadoPatient.SaveAnswers");
  config.data = answers;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function searchDoctorAppointment(appointmentModel, doctorGuid) {
  const config = getConfig("exadoPatient.SearchDoctorAppointment");
  config.data = appointmentModel;
  config.urlParams = { doctorGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getLocation() {
  const config = getConfig("exadoPatient.GetLocation");
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function searchAppointment(appointmentModel) {
  const config = getConfig("exadoPatient.SearchAppointment");
  config.data = appointmentModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getMoreReviews(doctorGuid, pageNo) {
  const config = getConfig("exadoPatient.GetMoreReviews");
  config.urlParams = { doctorGuid, pageNo };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function viewAllAvailability(appointmentModel, doctorGuid) {
  const config = getConfig("exadoPatient.ViewAllAvailability");
  config.data = appointmentModel;
  config.urlParams = { doctorGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function fetchNextAppointments(
  appointmentModel,
  doctorGuid,
  isViewAllAvailability
) {
  const config = getConfig("exadoPatient.FetchNextAppointments");
  config.data = appointmentModel;
  config.urlParams = { doctorGuid, isViewAllAvailability };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function bookAppointment(appointment) {
  const config = getConfig("exadoPatient.BookAppointment");
  config.data = appointment;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function patientAppointments(filter) {
  const config = getConfig("exadoPatient.PatientAppointments");
  config.data = filter;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getBookedAppointment(appointmentGuid) {
  const config = getConfig("exadoPatient.GetBookedAppointment");
  config.urlParams = { appointmentGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function updatePatientAttachment(patientGuid, file) {
  const config = getConfig("exadoPatient.UpdatePatientAttachment");
  config.urlParams = { patientGuid };
  config.fileUpload = file;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAppointments(filter) {
  const config = getConfig("exadoPatient.GetAppointments");
  config.data = filter;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function changeAppointmentStatus(appointmentGuid, isConfirm) {
  const config = getConfig("exadoPatient.ChangeAppointmentStatus");
  config.urlParams = { appointmentGuid, isConfirm };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function cancelAppointment(
  appointmentGuid,
  cancelReason,
  canceledBy,
  suggestedDateTime
) {
  const config = getConfig("exadoPatient.CancelAppointment");
  config.urlParams = {
    appointmentGuid,
    cancelReason,
    canceledBy,
    suggestedDateTime,
  };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function uploadDocument(documentType, referenceGuid, file) {
  const config = getConfig("exadoPatient.UploadDocument");
  config.urlParams = { documentType, referenceGuid };
  config.fileUpload = file;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function removeDocument(documentURI, documentName) {
  const config = getConfig("exadoPatient.RemoveDocument");
  config.urlParams = { documentURI, documentName };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorReviewById(reviewGuid) {
  const config = getConfig("exadoPatient.GetDoctorReviewById");
  config.urlParams = { reviewGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getDoctorReviewByAppointmentId(appointmentGuid) {
  const config = getConfig("exadoPatient.GetDoctorReviewByAppointmentId");
  config.urlParams = { appointmentGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveReview(model) {
  const config = getConfig("exadoPatient.SaveReview");
  config.data = model;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getWalletBalance(patientGuid) {
  const config = getConfig("exadoPatient.GetWalletBalance");
  config.urlParams = { patientGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function savePayment(model) {
  const config = getConfig("exadoPatient.SavePayment");
  config.data = model;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function showDiagnosisToOthers(appointmentGuid, bValue) {
  const config = getConfig("exadoPatient.ShowDiagnosisToOthers");
  config.urlParams = { appointmentGuid, bValue };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function addRefund(refundModel) {
  const config = getConfig("exadoPatient.AddRefund");
  config.data = refundModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getRefundById(refundGuid) {
  const config = getConfig("exadoPatient.GetRefundById");
  config.urlParams = { refundGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function withdrawMoney(withdrawData) {
  const config = getConfig("exadoPatient.WithdrawMoney");
  config.data = withdrawData;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getPatientFinanceData(patientGuid) {
  const config = getConfig("exadoPatient.GetPatientFinanceData");
  config.urlParams = { patientGuid };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}
