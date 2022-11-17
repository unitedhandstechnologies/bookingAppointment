import { call, all, takeEvery, put } from "redux-saga/effects";

import {
  SOCIAL_MEDIA_LOGIN,
  REGISTER_USER,
  LOGIN_USER,
  VERIFY_EMAIL_OTP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SEND_OTP_CODE,
  CHANGE_PASSWORD,
  GET_CMS_PAGE,
  GET_AUTH_TOKEN,
  SAVE_CARD_INFO,
} from "./constants";

import {
  socialMediaLogin,
  registerUser,
  loginUser,
  verifyEmailOTP,
  forgotPassword,
  resetPassword,
  sendOTPCode,
  changePassword,
  getCMSPage,
  getAuthToken,
  saveCardInfo,
} from "./apiCalls";

export function* PostSocialMediaLogin(actions) {
  try {
    const response = yield call(socialMediaLogin, actions.userModel);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* PostRegisterUser(actions) {
  try {
    const response = yield call(registerUser, actions.userModel);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* PostLoginUser(actions) {
  try {
    const response = yield call(
      loginUser,
      actions.email,
      actions.password,
      actions.userType
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* PostVerifyEmailOTP(actions) {
  try {
    const response = yield call(verifyEmailOTP, actions.userId, actions.otp);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* PostForgotPassword(actions) {
  try {
    const response = yield call(
      forgotPassword,
      actions.email,
      actions.userType
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* PostResetPassword(actions) {
  try {
    const response = yield call(
      resetPassword,
      actions.userId,
      actions.password
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* PostSendOTPCode(actions) {
  try {
    const response = yield call(sendOTPCode, actions.userId);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* ChangePassword(actions) {
  try {
    const response = yield call(
      changePassword,
      actions.userId,
      actions.oldPassword,
      actions.newPassword
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetCMSPage(actions) {
  try {
    const response = yield call(getCMSPage, actions.query);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAuthToken(actions) {
  try {
    const response = yield call(getAuthToken, actions.modal);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveCardInfo(actions) {
  try {
    const response = yield call(saveCardInfo, actions.modal);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(SOCIAL_MEDIA_LOGIN, PostSocialMediaLogin),
    takeEvery(REGISTER_USER, PostRegisterUser),
    takeEvery(LOGIN_USER, PostLoginUser),
    takeEvery(VERIFY_EMAIL_OTP, PostVerifyEmailOTP),
    takeEvery(FORGOT_PASSWORD, PostForgotPassword),
    takeEvery(RESET_PASSWORD, PostResetPassword),
    takeEvery(SEND_OTP_CODE, PostSendOTPCode),
    takeEvery(CHANGE_PASSWORD, ChangePassword),
    takeEvery(GET_CMS_PAGE, GetCMSPage),
    takeEvery(GET_AUTH_TOKEN, GetAuthToken),
    takeEvery(SAVE_CARD_INFO, SaveCardInfo),
  ]);
}
