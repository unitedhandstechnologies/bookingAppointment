import ApiService from "../../apiService";
import { getConfig } from "../../utility/apiConfig";

export async function socialMediaLogin(userModel) {
  const config = getConfig("exado.socialmedialogin");
  config.data = userModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function registerUser(userModel) {
  const config = getConfig("exado.RegisterUser");
  config.data = userModel;
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function loginUser(email, password, userType) {
  const config = getConfig("exado.LogInUser");
  config.data = { email, password, userType };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function verifyEmailOTP(userId, otp) {
  const config = getConfig("exado.VerifyEmailOTP");
  // config.urlParams = { userId, otp };
  config.data = { userId, otp };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function forgotPassword(email, userType) {
  const config = getConfig("exado.ForgotPassword");
  config.urlParams = { email, userType };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function resetPassword(userId, password) {
  const config = getConfig("exado.ResetPassword");
  config.urlParams = { userId, password };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function sendOTPCode(userId) {
  const config = getConfig("exado.SendOTPCode");
  config.urlParams = { userId };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function changePassword(userId, oldPassword, newPassword) {
  const config = getConfig("exado.ChangePassword");
  config.urlParams = { userId, oldPassword, newPassword };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getCMSPage(query) {
  const config = getConfig("exado.GetCMSPage");
  config.urlParams = { ...query };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function getAuthToken(modal) {
  const config = getConfig("exado.GetAuthToken");
  config.data = { ...modal };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}

export async function saveCardInfo(modal) {
  const config = getConfig("exado.SaveCardInfo");
  config.data = { ...modal };
  const apiInstance = new ApiService(config);
  return apiInstance.call();
}
