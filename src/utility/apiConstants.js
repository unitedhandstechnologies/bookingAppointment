const ApiConstants = {
  exado: {
    socialmedialogin: {
      apiConfig: {
        url: 'api/SocialMediaLogin',
        method: 'POST',
      },
      attachPrefix: true,
    },

    RegisterUser: {
      apiConfig: {
        url: 'api/RegisterUser',
        method: 'POST',
      },
      attachPrefix: true,
    },

    LogInUser: {
      apiConfig: {
        url: 'api/ValidateUser',
        method: 'POST',
      },
      attachPrefix: true,
    },

    VerifyEmailOTP: {
      apiConfig: {
        url: 'api/VerifyEmailOTP',
        method: 'POST',
      },
      attachPrefix: true,
    },

    ForgotPassword: {
      apiConfig: {
        url: 'api/ForgotPassword',
        method: 'POST',
      },
      attachPrefix: true,
    },

    ResetPassword: {
      apiConfig: {
        url: 'api/ResetPassword',
        method: 'POST',
      },
      attachPrefix: true,
    },

    SendOTPCode: {
      apiConfig: {
        url: 'api/SendOTPCode',
        method: 'POST',
      },
      attachPrefix: true,
    },

    ChangePassword: {
      apiConfig: {
        url: 'api/ChangePassword',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetCMSPage: {
      apiConfig: {
        url: 'GetCMSPage',
        method: 'Get',
      },
      attachPrefix: true,
    },
    GetAuthToken: {
      apiConfig: {
        url: 'api/GetAuthToken',
        method: 'POST',
      },
      attachPrefix: true,
    },
    SaveCardInfo: {
      apiConfig: {
        url: 'api/SaveCardInfo',
        method: 'POST',
      },
      attachPrefix: true,
    },
  },

  exadoDoc: {
    GetCurrency: {
      apiConfig: {
        url: 'api/GetCurrency',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetCountry: {
      apiConfig: {
        url: 'api/GetCountry',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetLanguages: {
      apiConfig: {
        url: 'api/GetLanguages',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetWebsiteLanguages: {
      apiConfig: {
        url: 'api/GetWebsiteLanguages',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetPhysicianService: {
      apiConfig: {
        url: 'api/GetPhysicianService',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetDoctorFees: {
      apiConfig: {
        url: 'api/GetDoctorFees',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SaveDoctorFees: {
      apiConfig: {
        url: 'api/SaveDoctorFees',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetProfileInfo: {
      apiConfig: {
        url: 'api/GetProfileInfo',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetAdditionalInfo: {
      apiConfig: {
        url: 'api/GetAdditionalInfo',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SendTextOTP: {
      apiConfig: {
        url: 'api/SendTextOTP',
        method: 'POST',
      },
      attachPrefix: true,
    },

    SaveProfileInfo: {
      apiConfig: {
        url: 'api/SaveProfileInfo',
        method: 'POST',
      },
      attachPrefix: true,
    },

    SaveAdditionalInfo: {
      apiConfig: {
        url: 'api/SaveAdditionalInfo',
        method: 'POST',
      },
      attachPrefix: true,
    },

    UploadDoctorProfileCertificates: {
      apiConfig: {
        url: 'api/UploadDoctorProfileCertificates',
        method: 'POST',
      },
      attachPrefix: true,
    },

    UploadProfileImage: {
      apiConfig: {
        url: 'api/UploadProfileImage',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetTimezones: {
      apiConfig: {
        url: 'api/GetTimezones',
        method: 'Get',
      },
      attachPrefix: true,
    },

    DeactivateAccount: {
      apiConfig: {
        url: 'api/DeactivateAccount',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetDoctorDefaultTiming: {
      apiConfig: {
        url: 'api/GetDoctorDefaultTiming',
        method: 'GET',
      },
      attachPrefix: true,
    },

    GetDoctorDefaultTimingById: {
      apiConfig: {
        url: 'api/GetDoctorDefaultTimingById',
        method: 'GET',
      },
      attachPrefix: true,
    },

    SaveDoctorDefaultTiming: {
      apiConfig: {
        url: 'api/SaveDoctorDefaultTiming',
        method: 'POST',
      },
      attachPrefix: true,
    },

    DeleteDoctorDefaultTimingById: {
      apiConfig: {
        url: 'api/DeleteDoctorDefaultTimingById',
        method: 'DELETE',
      },
      attachPrefix: true,
    },

    GetDoctorCustomTiming: {
      apiConfig: {
        url: 'api/GetDoctorCustomTiming',
        method: 'GET',
      },
      attachPrefix: true,
    },

    GetDoctorCustomTimingById: {
      apiConfig: {
        url: 'api/GetDoctorCustomTimingById',
        method: 'GET',
      },
      attachPrefix: true,
    },

    SaveDoctorCustomTiming: {
      apiConfig: {
        url: 'api/SaveDoctorCustomTiming',
        method: 'POST',
      },
      attachPrefix: true,
    },

    DeleteDoctorCustomTimingById: {
      apiConfig: {
        url: 'api/DeleteDoctorCustomTimingById',
        method: 'DELETE',
      },
      attachPrefix: true,
    },

    MarkAppointmentAsComplete: {
      apiConfig: {
        url: 'api/MarkAppointmentAsComplete',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetDiagnosticById: {
      apiConfig: {
        url: 'api/GetDiagnosticById',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SaveDiagnosticReport: {
      apiConfig: {
        url: 'api/SaveDiagnosticReport',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetAllAppointmentDetail: {
      apiConfig: {
        url: 'api/GetAllAppointmentDetail',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetDoctorFAQById: {
      apiConfig: {
        url: 'api/GetDoctorFAQById',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetDoctorsFAQs: {
      apiConfig: {
        url: 'api/GetDoctorsFAQs',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SaveFAQ: {
      apiConfig: {
        url: 'api/SaveFAQ',
        method: 'POST',
      },
      attachPrefix: true,
    },

    DeleteFAQ: {
      apiConfig: {
        url: 'api/DeleteFAQ',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetDoctorFinanceData: {
      apiConfig: {
        url: 'api/GetDoctorFinanceData',
        method: 'Get',
      },
      attachPrefix: true,
    },
    GetDoctorsPatient: {
      apiConfig: {
        url: 'api/GetDoctorsPatient',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetBookedAppointments: {
      apiConfig: {
        url: 'api/GetBookedAppointments',
        method: 'Get',
      },
      attachPrefix: true,
    },
    BookOfflineAppointment: {
      apiConfig: {
        url: 'api/BookOfflineAppointment',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetAllDoctorAdditionalService: {
      apiConfig: {
        url: 'api/GetAllDoctorAdditionalService',
        method: 'Get',
      },
      attachPrefix: true,
    },
    SaveDoctorAdditionalService: {
      apiConfig: {
        url: 'api/SaveDoctorAdditionalService',
        method: 'POST',
      },
      attachPrefix: true,
    },
    DeleteDoctorServiceById: {
      apiConfig: {
        url: 'api/DeleteDoctorServiceById',
        method: 'DELETE',
      },
      attachPrefix: true,
    },
    SaveAdditionalServices: {
      apiConfig: {
        url: 'api/SaveAdditionalServices',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetInvoiceDetails: {
      apiConfig: {
        url: 'api/GetInvoiceDetails',
        method: 'Get',
      },
      attachPrefix: true,
    },
    GetAdditionalServiceInfo: {
      apiConfig: {
        url: 'api/GetAdditionalServiceInfo',
        method: 'Get',
      },
      attachPrefix: true,
    }
  },

  exadoAdmin: {
    GetUnVerifiedDoctorsList: {
      apiConfig: {
        url: 'api/GetUnVerifiedDoctorsList',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetDoctorViewDetails: {
      apiConfig: {
        url: 'api/GetDoctorViewDetails',
        method: 'Get',
      },
      attachPrefix: true,
    },

    VerifyDoctorProfile: {
      apiConfig: {
        url: 'api/VerifyDoctorProfile',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetPagedPatientsList: {
      apiConfig: {
        url: 'api/GetPagedPatientsList',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetPagedDoctorsList: {
      apiConfig: {
        url: 'api/GetPagedDoctorsList',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetPatientViewDetails: {
      apiConfig: {
        url: 'api/GetPatientViewDetails',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetAllRefundData: {
      apiConfig: {
        url: 'api/GetAllRefundData',
        method: 'Get',
      },
      attachPrefix: true,
    },

    ApproveRefund: {
      apiConfig: {
        url: 'api/ApproveRefund',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetAllUnprocessedWithdraw: {
      apiConfig: {
        url: 'api/GetAllUnprocessedWithdraw',
        method: 'POST'
      },
      attachPrefix: true,
    },
    ApproveWithdraw: {
      apiConfig: {
        url: 'api/ApproveWithdraw',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetAllReviews: {
      apiConfig: {
        url: 'api/getAllReviews',
        method: 'POST',
      },
      attachPrefix: true,
    },
    DeleteReviewById: {
      apiConfig: {
        url: 'api/DeleteReviewById',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetAllCommission: {
      apiConfig: {
        url: 'api/GetAllCommission',
        method: 'Get',
      },
      attachPrefix: true,
    },
    SaveDoctorCommission: {
      apiConfig: {
        url: 'api/SaveDoctorCommission',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetFinanceData: {
      apiConfig: {
        url: 'api/GetFinanceData',
        method: 'Get',
      },
      attachPrefix: true,
    },
    MarkAsPaid: {
      apiConfig: {
        url: 'api/MarkAsPaid',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetDoctorPayment: {
      apiConfig: {
        url: 'api/GetDoctorPayment',
        method: 'Get',
      },
      attachPrefix: true,
    },
    SaveCMSPage: {
      apiConfig: {
        url: 'SaveCMSPage',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetLanguageAllMessages: {
      apiConfig: {
        url: 'GetLanguageAllMessages',
        method: 'Get',
      },
      attachPrefix: true,
    },
    SaveLanguageLabelData: {
      apiConfig: {
        url: 'SaveLanguageLabelData',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetPatientQuestionnaireLanguage: {
      apiConfig: {
        url: 'GetPatientQuestionnaireLanguage',
        method: 'Get',
      },
      attachPrefix: true,
    },
    SavePatientQuestionnaireLanguage: {
      apiConfig: {
        url: 'SavePatientQuestionnaireLanguage',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetAllPhysicianServiceDetail: {
      apiConfig: {
        url: 'GetAllPhysicianServiceDetail',
        method: 'Get',
      },
      attachPrefix: true,
    },
    SavePhysicianService: {
      apiConfig: {
        url: 'SavePhysicianService',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetAllLanguageDetail: {
      apiConfig: {
        url: 'GetAllLanguageDetail',
        method: 'Get',
      },
      attachPrefix: true,
    },
    SaveLanguage: {
      apiConfig: {
        url: 'SaveLanguage',
        method: 'POST',
      },
      attachPrefix: true,
    },
    SaveWebsiteLanguageId: {
      apiConfig: {
        url: 'SaveWebsiteLanguageId',
        method: 'POST',
      },
      attachPrefix: true,
    }
  },

  exadoPatient: {
    GetPatientProfileInfo: {
      apiConfig: {
        url: 'api/GetPatientProfileInfo',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SavePatientProfileInfo: {
      apiConfig: {
        url: 'api/SavePatientProfileInfo',
        method: 'POST',
      },
      attachPrefix: true,
    },

    DeletePatient: {
      apiConfig: {
        url: 'api/DeletePatient',
        method: 'POST',
      },
      attachPrefix: true,
    },

    ChangeStatus: {
      apiConfig: {
        url: 'api/ChangeStatus',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetPatientQuestionnaire: {
      apiConfig: {
        url: 'api/GetPatientQuestionnaire',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetPatientAnswers: {
      apiConfig: {
        url: 'api/GetPatientAnswers',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SaveAnswers: {
      apiConfig: {
        url: 'api/SaveAnswers',
        method: 'POST',
      },
      attachPrefix: true,
    },

    SearchDoctorAppointment: {
      apiConfig: {
        url: 'api/SearchDoctorAppointment',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetLocation: {
      apiConfig: {
        url: 'api/GetLocation',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SearchAppointment: {
      apiConfig: {
        url: 'api/SearchAppointment',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetMoreReviews: {
      apiConfig: {
        url: 'api/GetMoreReviews',
        method: 'Get',
      },
      attachPrefix: true,
    },

    ViewAllAvailability: {
      apiConfig: {
        url: 'api/ViewAllAvailability',
        method: 'POST',
      },
      attachPrefix: true,
    },

    FetchNextAppointments: {
      apiConfig: {
        url: 'api/FetchNextAppointments',
        method: 'POST',
      },
      attachPrefix: true,
    },

    BookAppointment: {
      apiConfig: {
        url: 'api/BookAppointment',
        method: 'POST',
      },
      attachPrefix: true,
    },

    PatientAppointments: {
      apiConfig: {
        url: 'api/PatientAppointments',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetBookedAppointment: {
      apiConfig: {
        url: 'api/GetBookedAppointment',
        method: 'Get',
      },
      attachPrefix: true,
    },

    UpdatePatientAttachment: {
      apiConfig: {
        url: 'api/UpdatePatientAttachment',
        method: 'Post',
      },
      attachPrefix: true,
    },

    GetAppointments: {
      apiConfig: {
        url: 'api/GetAppointments',
        method: 'POST',
      },
      attachPrefix: true,
    },

    ChangeAppointmentStatus: {
      apiConfig: {
        url: 'api/ChangeAppointmentStatus',
        method: 'POST',
      },
      attachPrefix: true,
    },

    CancelAppointment: {
      apiConfig: {
        url: 'api/CancelAppointment',
        method: 'POST',
      },
      attachPrefix: true,
    },

    UploadDocument: {
      apiConfig: {
        url: 'api/UploadDocument',
        method: 'POST',
      },
      attachPrefix: true,
    },

    RemoveDocument: {
      apiConfig: {
        url: 'api/RemoveDocument',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetDoctorReviewById: {
      apiConfig: {
        url: 'api/GetDoctorReviewById',
        method: 'Get',
      },
      attachPrefix: true,
    },

    GetDoctorReviewByAppointmentId: {
      apiConfig: {
        url: 'api/GetDoctorReviewByAppointmentId',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SaveReview: {
      apiConfig: {
        url: 'api/SaveReview',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetWalletBalance: {
      apiConfig: {
        url: 'api/GetWalletBalance',
        method: 'Get',
      },
      attachPrefix: true,
    },

    SavePayment: {
      apiConfig: {
        url: 'api/SavePayment',
        method: 'POST',
      },
      attachPrefix: true,
    },

    ShowDiagnosisToOthers: {
      apiConfig: {
        url: 'api/ShowDiagnosisToOthers',
        method: 'POST',
      },
      attachPrefix: true,
    },

    AddRefund: {
      apiConfig: {
        url: 'api/AddRefund',
        method: 'POST',
      },
      attachPrefix: true,
    },

    GetRefundById: {
      apiConfig: {
        url: 'api/GetRefundById',
        method: 'Get',
      },
      attachPrefix: true,
    },
    WithdrawMoney: {
      apiConfig: {
        url: 'api/AddWithdraw',
        method: 'POST',
      },
      attachPrefix: true,
    },
    GetPatientFinanceData: {
      apiConfig: {
        url: 'api/GetPatientFinanceData',
        method: 'Get',
      },
      attachPrefix: true,
    }
  }
};

export default ApiConstants;