import { call, all, takeEvery, put } from "redux-saga/effects";

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
  SAVE_ADDITIONAL_INFO,
  UPLOAD_DOCTOR_PROFILE_CERTIFICATES,
  UPLOAD_PROFILE_IMAGE,
  GET_WEBSITE_LANGUAGES,
  GET_TIMEZONES,
  DEACTIVATE_ACCOUNT,
  GET_DOCTOR_DEFAULT_TIMING,
  GET_DOCTOR_DEFAULT_TIMING_BY_ID,
  SAVE_DOCTOR_DEFAULT_TIMING,
  DELETE_DOCTOR_DEFAULT_TIMING_BY_ID,
  GET_DOCTOR_CUSTOM_TIMING,
  GET_DOCTOR_CUSTOM_TIMING_BY_ID,
  SAVE_DOCTOR_CUSTOM_TIMING,
  DELETE_DOCTOR_CUSTOM_TIMING_BY_ID,
  MARK_APPOINTMENT_AS_COMPLETE,
  GET_DIAGNOSTIC_BY_ID,
  SAVE_DIAGNOSTIC_REPORT,
  GET_ALL_APPOINTMENT_DETAIL,
  GET_DOCTOR_FAQ_BY_ID,
  GET_DOCTORS_FAQS,
  SAVE_FAQ,
  DELETE_FAQ,
  GET_DOCTOR_FINANCE_DATA,
  GET_DOCTORS_PATIENT,
  GET_BOOKED_APPOINTMENTS,
  BOOK_OFFLINE_APPOINTMENT,
  GET_ALL_DOCTOR_ADDITIONAL_SERVICE,
  SAVE_DOCTOR_ADDITIONAL_SERVICE,
  DELETE_DOCTOR_SERVICE_BY_ID,
  SAVE_ADDITIONAL_SERVICES,
  GET_INVOICE_DETAILS,
  GET_ADDITIONAL_SERVICE_INFO,
} from "./constants";

import {
  getCurrency,
  getCountry,
  getDoctorFees,
  saveDoctorFees,
  getProfileInfo,
  getLanguages,
  sendTextOTP,
  saveProfileInfo,
  getPhysicianService,
  getAdditionalInfo,
  saveAdditionalInfo,
  uploadDoctorProfileCertificates,
  uploadProfileImage,
  getWebsiteLanguages,
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
  getAdditionalServiceInfo,
} from "./apiCalls";

export function* GetCurrency(actions) {
  try {
    const response = yield call(getCurrency);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetCountry(actions) {
  try {
    const response = yield call(getCountry);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetLanguages(actions) {
  try {
    const response = yield call(getLanguages);
    if (response) {
      actions.promise.resolve(response.data.result);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetWebsiteLanguages(actions) {
  try {
    const response = yield call(getWebsiteLanguages);
    if (response) {
      actions.promise.resolve(response.data.result);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPhysicianService(actions) {
  try {
    const response = yield call(getPhysicianService);
    if (response) {
      actions.promise.resolve(response.data.result);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorFees(actions) {
  try {
    const response = yield call(getDoctorFees, actions.userGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveDoctorFees(actions) {
  try {
    const response = yield call(saveDoctorFees, actions.doctorFeesInfoModel);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetProfileInfo(actions) {
  try {
    const response = yield call(getProfileInfo, actions.userGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAdditionalInfo(actions) {
  try {
    const response = yield call(getAdditionalInfo, actions.userGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SendTextOTP(actions) {
  try {
    const response = yield call(sendTextOTP, actions.userGuid, actions.mobile);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveProfileInfo(actions) {
  try {
    const response = yield call(saveProfileInfo, actions.userModel);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveAdditionalInfo(actions) {
  try {
    const response = yield call(
      saveAdditionalInfo,
      actions.additionalInfoModel
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* UploadDoctorProfileCertificates(actions) {
  try {
    const response = yield call(
      uploadDoctorProfileCertificates,
      actions.fileType,
      actions.doctorGuid,
      actions.file
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* UploadProfileImage(actions) {
  try {
    const response = yield call(uploadProfileImage, actions.model);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetTimezones(actions) {
  try {
    const response = yield call(getTimezones);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* DeactivateAccount(actions) {
  try {
    const response = yield call(deactivateAccount, actions.doctorGuid);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorDefaultTiming(actions) {
  try {
    const response = yield call(getDoctorDefaultTiming, actions.doctorGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorDefaultTimingById(actions) {
  try {
    const response = yield call(
      getDoctorDefaultTimingById,
      actions.defaultGuid
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveDoctorDefaultTiming(actions) {
  try {
    const response = yield call(
      saveDoctorDefaultTiming,
      actions.doctorDefaultTimingModel
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* DeleteDoctorDefaultTimingById(actions) {
  try {
    const response = yield call(
      deleteDoctorDefaultTimingById,
      actions.defaultGuid
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorCustomTiming(actions) {
  try {
    const response = yield call(getDoctorCustomTiming, actions.doctorGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorCustomTimingById(actions) {
  try {
    const response = yield call(getDoctorCustomTimingById, actions.defaultGuid);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveDoctorCustomTiming(actions) {
  try {
    const response = yield call(
      saveDoctorCustomTiming,
      actions.doctorCustomTimingModel
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* DeleteDoctorCustomTimingById(actions) {
  try {
    const response = yield call(
      deleteDoctorCustomTimingById,
      actions.defaultGuid
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* MarkAppointmentAsComplete(actions) {
  try {
    const response = yield call(
      markAppointmentAsComplete,
      actions.appointmentGuid
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDiagnosticById(actions) {
  try {
    const response = yield call(getDiagnosticById, actions.appointmentGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveDiagnosticReport(actions) {
  try {
    const response = yield call(saveDiagnosticReport, actions.model);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllAppointmentDetail(actions) {
  try {
    const response = yield call(
      getAllAppointmentDetail,
      actions.appointmentGuid
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorFAQById(actions) {
  try {
    const response = yield call(getDoctorFAQById, actions.faqGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorsFAQs(actions) {
  try {
    const response = yield call(getDoctorsFAQs, actions.doctorGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveFAQ(actions) {
  try {
    const response = yield call(saveFAQ, actions.model);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* DeleteFAQ(actions) {
  try {
    const response = yield call(deleteFAQ, actions.faqGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorFinanceData(actions) {
  try {
    const response = yield call(getDoctorFinanceData, actions.doctorGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorsPatient(actions) {
  try {
    const response = yield call(getDoctorsPatient, actions.modal);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetBookedAppointments(actions) {
  try {
    const response = yield call(getBookedAppointments, actions.params);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* BookOfflineAppointment(actions) {
  try {
    const response = yield call(bookOfflineAppointment, actions.modal);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllDoctorAdditionalService(actions) {
  try {
    const response = yield call(getAllDoctorAdditionalService, actions.params);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveDoctorAdditionalService(actions) {
  try {
    const response = yield call(saveDoctorAdditionalService, actions.modal);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* DeleteDoctorServiceById(actions) {
  try {
    const response = yield call(deleteDoctorServiceById, actions.params);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveAdditionalServices(actions) {
  try {
    const response = yield call(saveAdditionalServices, actions.modal);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetInvoiceDetails(actions) {
  try {
    const response = yield call(getInvoiceDetails, actions.params);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAdditionalServiceInfo(actions) {
  try {
    const response = yield call(getAdditionalServiceInfo, actions.params);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_CURRENCY, GetCurrency),
    takeEvery(GET_COUNTRY, GetCountry),
    takeEvery(GET_DOCTOR_FEES, GetDoctorFees),
    takeEvery(SAVE_DOCTOR_FEES, SaveDoctorFees),
    takeEvery(GET_PROFILE_INFO, GetProfileInfo),
    takeEvery(GET_LANGUAGES, GetLanguages),
    takeEvery(GET_WEBSITE_LANGUAGES, GetWebsiteLanguages),
    takeEvery(SEND_TEXT_OTP, SendTextOTP),
    takeEvery(SAVE_PROFILE_INFO, SaveProfileInfo),
    takeEvery(GET_PHYSICIAN_SERVICE, GetPhysicianService),
    takeEvery(GET_ADDITIONAL_INFO, GetAdditionalInfo),
    takeEvery(SAVE_ADDITIONAL_INFO, SaveAdditionalInfo),
    takeEvery(
      UPLOAD_DOCTOR_PROFILE_CERTIFICATES,
      UploadDoctorProfileCertificates
    ),
    takeEvery(UPLOAD_PROFILE_IMAGE, UploadProfileImage),
    takeEvery(GET_TIMEZONES, GetTimezones),
    takeEvery(DEACTIVATE_ACCOUNT, DeactivateAccount),
    takeEvery(GET_DOCTOR_DEFAULT_TIMING, GetDoctorDefaultTiming),
    takeEvery(GET_DOCTOR_DEFAULT_TIMING_BY_ID, GetDoctorDefaultTimingById),
    takeEvery(SAVE_DOCTOR_DEFAULT_TIMING, SaveDoctorDefaultTiming),
    takeEvery(
      DELETE_DOCTOR_DEFAULT_TIMING_BY_ID,
      DeleteDoctorDefaultTimingById
    ),
    takeEvery(GET_DOCTOR_CUSTOM_TIMING, GetDoctorCustomTiming),
    takeEvery(GET_DOCTOR_CUSTOM_TIMING_BY_ID, GetDoctorCustomTimingById),
    takeEvery(SAVE_DOCTOR_CUSTOM_TIMING, SaveDoctorCustomTiming),
    takeEvery(DELETE_DOCTOR_CUSTOM_TIMING_BY_ID, DeleteDoctorCustomTimingById),
    takeEvery(MARK_APPOINTMENT_AS_COMPLETE, MarkAppointmentAsComplete),
    takeEvery(GET_DIAGNOSTIC_BY_ID, GetDiagnosticById),
    takeEvery(SAVE_DIAGNOSTIC_REPORT, SaveDiagnosticReport),
    takeEvery(GET_ALL_APPOINTMENT_DETAIL, GetAllAppointmentDetail),
    takeEvery(GET_DOCTOR_FAQ_BY_ID, GetDoctorFAQById),
    takeEvery(GET_DOCTORS_FAQS, GetDoctorsFAQs),
    takeEvery(SAVE_FAQ, SaveFAQ),
    takeEvery(DELETE_FAQ, DeleteFAQ),
    takeEvery(GET_DOCTOR_FINANCE_DATA, GetDoctorFinanceData),
    takeEvery(GET_DOCTORS_PATIENT, GetDoctorsPatient),
    takeEvery(GET_BOOKED_APPOINTMENTS, GetBookedAppointments),
    takeEvery(BOOK_OFFLINE_APPOINTMENT, BookOfflineAppointment),
    takeEvery(GET_ALL_DOCTOR_ADDITIONAL_SERVICE, GetAllDoctorAdditionalService),
    takeEvery(SAVE_DOCTOR_ADDITIONAL_SERVICE, SaveDoctorAdditionalService),
    takeEvery(DELETE_DOCTOR_SERVICE_BY_ID, DeleteDoctorServiceById),
    takeEvery(SAVE_ADDITIONAL_SERVICES, SaveAdditionalServices),
    takeEvery(GET_INVOICE_DETAILS, GetInvoiceDetails),
    takeEvery(GET_ADDITIONAL_SERVICE_INFO, GetAdditionalServiceInfo),
  ]);
}
