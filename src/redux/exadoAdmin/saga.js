import {
  call, all, takeEvery, put
} from 'redux-saga/effects';

import {
  GET_UNVERIFIED_DOCTORS_LIST, GET_DOCTOR_VIEW_DETAILS, VERIFY_DOCTOR_PROFILE, GET_PAGED_PATIENTS_LIST, GET_PAGED_DOCTORS_LIST, GET_PATIENT_VIEW_DETAILS,
  GET_ALL_REFUND_DATA, APPROVE_REFUND, GET_ALL_UNPROCESSED_WITHDRAW, APPROVE_WITHDRAW, GET_ALL_REVIEWS, DELETE_REVIEW_BY_ID, GET_ALL_COMMISSION, SAVE_DOCTOR_COMMISSION, GET_FINANCE_DATA, MARK_AS_PAID, GET_DOCTOR_PAYMENT, SAVE_CMS_PAGE, GET_LANGUAGE_ALL_MESSAGES, SAVE_LANGUAGE_LABEL_DATA, GET_PATIENT_QUESTIONNAIRE_LANGUAGE, SAVE_PATIENT_QUESTIONNAIRE_LANGUAGE, GET_ALL_PHYSICIAN_SERVICE_DETAIL, SAVE_PHYSICIAN_SERVICE, GET_ALL_LANGUAGE_DETAIL, SAVE_LANGUAGE, SAVE_WEBSITE_LANGUAGE_ID
} from './constants';

import {
  getUnVerifiedDoctorsList, getDoctorViewDetails, verifyDoctorProfile, getPagedPatientsList, getPagedDoctorsList, getPatientViewDetails,
  getAllRefundData, approveRefund, getAllUnprocessedWithdraw, approveWithdraw, getAllReviews, deleteReviewById, getAllCommission, saveDoctorCommission, getFinanceData, markAsPaid, getDoctorPayment, saveCMSPage, getLanguageAllMessages, saveLanguageLabelData, savePatientQuestionnaireLanguage, getPatientQuestionnaireLanguage, getAllPhysicianServiceDetail, savePhysicianService, getAllLanguageDetail, saveLanguage, saveWebsiteLanguageId
} from './apiCalls';

export function* GetUnVerifiedDoctorsList(actions) {
  try {
    const response = yield call(getUnVerifiedDoctorsList);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorViewDetails(actions) {
  try {
    const response = yield call(getDoctorViewDetails, actions.userGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* VerifyDoctorProfile(actions) {
  try {
    const response = yield call(verifyDoctorProfile, actions.userGuid, actions.verificationType, actions.cancelReason);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPagedPatientsList(actions) {
  try {
    const response = yield call(getPagedPatientsList, actions.paging);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPagedDoctorsList(actions) {
  try {
    const response = yield call(getPagedDoctorsList, actions.paging);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPatientViewDetails(actions) {
  try {
    const response = yield call(getPatientViewDetails, actions.patientGuid);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllRefundData(actions) {
  try {
    const response = yield call(getAllRefundData);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* ApproveRefund(actions) {
  try {
    const response = yield call(approveRefund, actions.model);
    if (response) {
      actions.promise.resolve(response.data);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllUnprocessedWithdraw(actions) {
  try {
    const response = yield call(getAllUnprocessedWithdraw, actions.paging);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* ApproveWithdraw(actions) {
  try {
    const response = yield call(approveWithdraw, actions.withdrawGuid);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllReviews(actions) {
  try {
    const response = yield call(getAllReviews, actions.paging);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* DeleteReviewById(actions) {
  try {
    const response = yield call(deleteReviewById, actions.reviewGuid);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllCommission(actions) {
  try {
    const response = yield call(getAllCommission);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveDoctorCommission(actions) {
  try {
    const response = yield call(saveDoctorCommission, actions.list);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetFinanceData(actions) {
  try {
    const response = yield call(getFinanceData);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* MarkAsPaid(actions) {
  try {
    const response = yield call(markAsPaid, actions.data);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetDoctorPayment(actions) {
  try {
    const response = yield call(getDoctorPayment, actions.query);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveCMSPage(actions) {
  try {
    const response = yield call(saveCMSPage, actions.data);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetLanguageAllMessages(actions) {
  try {
    const response = yield call(getLanguageAllMessages, actions.query);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveLanguageLabelData(actions) {
  try {
    const response = yield call(saveLanguageLabelData, actions.data);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetPatientQuestionnaireLanguage(actions) {
  try {
    const response = yield call(getPatientQuestionnaireLanguage, actions.query);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SavePatientQuestionnaireLanguage(actions) {
  try {
    const response = yield call(savePatientQuestionnaireLanguage, actions.data);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllPhysicianServiceDetail(actions) {
  try {
    const response = yield call(getAllPhysicianServiceDetail);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SavePhysicianService(actions) {
  try {
    const response = yield call(savePhysicianService, actions.data);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* GetAllLanguageDetail(actions) {
  try {
    const response = yield call(getAllLanguageDetail);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveLanguage(actions) {
  try {
    const response = yield call(saveLanguage, actions.data);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export function* SaveWebsiteLanguageId(actions) {
  try {
    const response = yield call(saveWebsiteLanguageId, actions.query);
    if (response) {
      actions.promise.resolve(response);
    }
  } catch (error) {
    actions.promise.reject();
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_UNVERIFIED_DOCTORS_LIST, GetUnVerifiedDoctorsList),
    takeEvery(GET_DOCTOR_VIEW_DETAILS, GetDoctorViewDetails),
    takeEvery(VERIFY_DOCTOR_PROFILE, VerifyDoctorProfile),
    takeEvery(GET_PAGED_PATIENTS_LIST, GetPagedPatientsList),
    takeEvery(GET_PAGED_DOCTORS_LIST, GetPagedDoctorsList),
    takeEvery(GET_PATIENT_VIEW_DETAILS, GetPatientViewDetails),
    takeEvery(GET_ALL_REFUND_DATA, GetAllRefundData),
    takeEvery(APPROVE_REFUND, ApproveRefund),
    takeEvery(GET_ALL_UNPROCESSED_WITHDRAW, GetAllUnprocessedWithdraw),
    takeEvery(APPROVE_WITHDRAW, ApproveWithdraw),
    takeEvery(GET_ALL_REVIEWS, GetAllReviews),
    takeEvery(DELETE_REVIEW_BY_ID, DeleteReviewById),
    takeEvery(GET_ALL_COMMISSION, GetAllCommission),
    takeEvery(SAVE_DOCTOR_COMMISSION, SaveDoctorCommission),
    takeEvery(GET_FINANCE_DATA, GetFinanceData),
    takeEvery(MARK_AS_PAID, MarkAsPaid),
    takeEvery(GET_DOCTOR_PAYMENT, GetDoctorPayment),
    takeEvery(SAVE_CMS_PAGE, SaveCMSPage),
    takeEvery(GET_LANGUAGE_ALL_MESSAGES, GetLanguageAllMessages),
    takeEvery(SAVE_LANGUAGE_LABEL_DATA, SaveLanguageLabelData),
    takeEvery(GET_PATIENT_QUESTIONNAIRE_LANGUAGE, GetPatientQuestionnaireLanguage),
    takeEvery(SAVE_PATIENT_QUESTIONNAIRE_LANGUAGE, SavePatientQuestionnaireLanguage),
    takeEvery(GET_ALL_PHYSICIAN_SERVICE_DETAIL, GetAllPhysicianServiceDetail),
    takeEvery(SAVE_PHYSICIAN_SERVICE, SavePhysicianService),
    takeEvery(GET_ALL_LANGUAGE_DETAIL, GetAllLanguageDetail),
    takeEvery(SAVE_LANGUAGE, SaveLanguage),
    takeEvery(SAVE_WEBSITE_LANGUAGE_ID, SaveWebsiteLanguageId)
  ]);
}