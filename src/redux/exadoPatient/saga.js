import { call, all, takeEvery } from "redux-saga/effects";

import {
  GET_PATIENT_PROFILE_INFO,
  SAVE_PATIENT_PROFILE_INFO,
  DELETE_PATIENT,
  CHANGE_STATUS,
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

import {
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
} from "./apiCalls";

export function* GetPatientProfileInfo(actions) {
  try {
    const response = yield call(getPatientProfileInfo, actions.userGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SavePatientProfileInfo(actions) {
  try {
    const response = yield call(savePatientProfileInfo, actions.userModel);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* DeletePatient(actions) {
  try {
    const response = yield call(deletePatient, actions.patientGuid);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* ChangeStatus(actions) {
  try {
    const response = yield call(changeStatus, actions.userGuid);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPatientQuestionnaire(actions) {
  try {
    const response = yield call(getPatientQuestionnaire, actions.languageId);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPatientAnswers(actions) {
  try {
    const response = yield call(
      getPatientAnswers,
      actions.patientGuid,
      actions.pageNo
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveAnswers(actions) {
  try {
    const response = yield call(saveAnswers, actions.answers);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SearchDoctorAppointment(actions) {
  try {
    const response = yield call(
      searchDoctorAppointment,
      actions.appointmentModel,
      actions.doctorGuid
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetLocation(actions) {
  try {
    const response = yield call(getLocation);
    if (response) {
      actions.promise.resolve(response.data.result);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SearchAppointment(actions) {
  try {
    const response = yield call(searchAppointment, actions.appointmentModel);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetMoreReviews(actions) {
  try {
    const response = yield call(
      getMoreReviews,
      actions.doctorGuid,
      actions.pageNo
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* ViewAllAvailability(actions) {
  try {
    const response = yield call(
      viewAllAvailability,
      actions.appointmentModel,
      actions.doctorGuid
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* FetchNextAppointments(actions) {
  try {
    const response = yield call(
      fetchNextAppointments,
      actions.appointmentModel,
      actions.doctorGuid,
      actions.isViewAllAvailability
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* BookAppointment(actions) {
  try {
    const response = yield call(bookAppointment, actions.appointment);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* PatientAppointments(actions) {
  try {
    const response = yield call(patientAppointments, actions.filter);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetBookedAppointment(actions) {
  try {
    const response = yield call(getBookedAppointment, actions.appointmentGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* UpdatePatientAttachment(actions) {
  try {
    const response = yield call(
      updatePatientAttachment,
      actions.patientGuid,
      actions.file
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAppointments(actions) {
  try {
    const response = yield call(getAppointments, actions.filter);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* ChangeAppointmentStatus(actions) {
  try {
    const response = yield call(
      changeAppointmentStatus,
      actions.appointmentGuid,
      actions.isConfirm
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* CancelAppointment(actions) {
  try {
    const response = yield call(
      cancelAppointment,
      actions.appointmentGuid,
      actions.cancelReason,
      actions.canceledBy,
      actions.suggestedDateTime
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* UploadDocument(actions) {
  try {
    const response = yield call(
      uploadDocument,
      actions.documentType,
      actions.referenceGuid,
      actions.file
    );
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* RemoveDocument(actions) {
  try {
    const response = yield call(
      removeDocument,
      actions.documentURI,
      actions.documentName
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorReviewById(actions) {
  try {
    const response = yield call(getDoctorReviewById, actions.reviewGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorReviewByAppointmentId(actions) {
  try {
    const response = yield call(
      getDoctorReviewByAppointmentId,
      actions.appointmentGuid
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveReview(actions) {
  try {
    const response = yield call(saveReview, actions.model);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetWalletBalance(actions) {
  try {
    const response = yield call(getWalletBalance, actions.patientGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SavePayment(actions) {
  try {
    const response = yield call(savePayment, actions.model);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* ShowDiagnosisToOthers(actions) {
  try {
    const response = yield call(
      showDiagnosisToOthers,
      actions.appointmentGuid,
      actions.bValue
    );
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* AddRefund(actions) {
  try {
    const response = yield call(addRefund, actions.refundModel);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetRefundById(actions) {
  try {
    const response = yield call(getRefundById, actions.refundGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* WithdrawMoney(actions) {
  try {
    const response = yield call(withdrawMoney, actions.withdrawData);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPatientFinanceData(actions) {
  try {
    const response = yield call(getPatientFinanceData, actions.patientGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_PATIENT_PROFILE_INFO, GetPatientProfileInfo),
    takeEvery(SAVE_PATIENT_PROFILE_INFO, SavePatientProfileInfo),
    takeEvery(DELETE_PATIENT, DeletePatient),
    takeEvery(CHANGE_STATUS, ChangeStatus),
    takeEvery(GET_PATIENT_QUESTIONNAIRE, GetPatientQuestionnaire),
    takeEvery(GET_PATIENT_ANSWERS, GetPatientAnswers),
    takeEvery(SAVE_ANSWERS, SaveAnswers),
    takeEvery(SEARCH_DOCTOR_APPOINTMENT, SearchDoctorAppointment),
    takeEvery(GET_LOCATION, GetLocation),
    takeEvery(SEARCH_APPOINTMENT, SearchAppointment),
    takeEvery(GET_MORE_REVIEWS, GetMoreReviews),
    takeEvery(VIEW_ALLAVAILABILITY, ViewAllAvailability),
    takeEvery(FETCH_NEXT_APPOINTMENTS, FetchNextAppointments),
    takeEvery(BOOK_APPOINTMENT, BookAppointment),
    takeEvery(PATIENT_APPOINTMENTS, PatientAppointments),
    takeEvery(GET_BOOKED_APPOINTMENT, GetBookedAppointment),
    takeEvery(UPDATE_PATIENT_ATTACHMENT, UpdatePatientAttachment),
    takeEvery(GET_APPOINTMENTS, GetAppointments),
    takeEvery(CHANGE_APPOINTMENT_STATUS, ChangeAppointmentStatus),
    takeEvery(CANCEL_APPOINTMENT, CancelAppointment),
    takeEvery(UPLOAD_DOCUMENT, UploadDocument),
    takeEvery(REMOVE_DOCUMENT, RemoveDocument),
    takeEvery(GET_DOCTOR_REVIEW_BY_ID, GetDoctorReviewById),
    takeEvery(
      GET_DOCTOR_REVIEW_BY_APPOINTMENT_ID,
      GetDoctorReviewByAppointmentId
    ),
    takeEvery(SAVE_REVIEW, SaveReview),
    takeEvery(GET_WALLET_BALANCE, GetWalletBalance),
    takeEvery(SAVE_PAYMENT, SavePayment),
    takeEvery(SHOW_DIAGNOSIS_TO_OTHERS, ShowDiagnosisToOthers),
    takeEvery(ADD_REFUND, AddRefund),
    takeEvery(GET_REFUND_BY_ID, GetRefundById),
    takeEvery(WITHDRAW_MONEY, WithdrawMoney),
    takeEvery(GET_PATIENT_FINANCE_DATA, GetPatientFinanceData),
  ]);
}
