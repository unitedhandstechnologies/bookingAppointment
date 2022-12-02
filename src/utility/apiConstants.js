const ApiConstants = {
  exado: {
    socialmedialogin: {
      apiConfig: {
        url: "api/SocialMediaLogin",
        method: "POST",
      },
      attachPrefix: true,
    },

    RegisterUser: {
      apiConfig: {
        url: "auth/signup",
        method: "POST",
      },
      attachPrefix: true,
    },

    LogInUser: {
      apiConfig: {
        url: "auth/signin",
        method: "POST",
      },
      attachPrefix: true,
    },

    VerifyEmailOTP: {
      apiConfig: {
        url: "auth/verifyotp",
        method: "POST",
      },
      attachPrefix: true,
    },

    ForgotPassword: {
      apiConfig: {
        url: "api/ForgotPassword",
        method: "POST",
      },
      attachPrefix: true,
    },

    ResetPassword: {
      apiConfig: {
        url: "api/ResetPassword",
        method: "POST",
      },
      attachPrefix: true,
    },

    SendOTPCode: {
      apiConfig: {
        url: "api/SendOTPCode",
        method: "POST",
      },
      attachPrefix: true,
    },

    ChangePassword: {
      apiConfig: {
        url: "api/ChangePassword",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetCMSPage: {
      apiConfig: {
        url: "admin/cmspage",
        method: "Get",
      },
      attachPrefix: true,
    },
    GetAuthToken: {
      apiConfig: {
        url: "api/GetAuthToken",
        method: "POST",
      },
      attachPrefix: true,
    },
    SaveCardInfo: {
      apiConfig: {
        url: "api/SaveCardInfo",
        method: "POST",
      },
      attachPrefix: true,
    },
  },

  exadoDoc: {
    GetCurrency: {
      apiConfig: {
        url: "api/getcurrency",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetCountry: {
      apiConfig: {
        url: "api/GetCountry",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetLanguages: {
      apiConfig: {
        url: "api/languages",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetWebsiteLanguages: {
      apiConfig: {
        url: "api/websiteLanguages",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetPhysicianService: {
      apiConfig: {
        url: "doctor/physicianService",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetDoctorFees: {
      apiConfig: {
        url: "doctor/getfees",
        method: "Get",
      },
      attachPrefix: true,
    },

    SaveDoctorFees: {
      apiConfig: {
        url: "doctor/savefees",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetProfileInfo: {
      apiConfig: {
        url: "doctor/getprofileinfo",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetAdditionalInfo: {
      apiConfig: {
        url: "doctor/getadditionalinfo",
        method: "Get",
      },
      attachPrefix: true,
    },

    SendTextOTP: {
      apiConfig: {
        url: "api/SendTextOTP",
        method: "POST",
      },
      attachPrefix: true,
    },

    SaveProfileInfo: {
      apiConfig: {
        url: "doctor/saveprofileinfo",
        method: "POST",
      },
      attachPrefix: true,
    },

    SaveAdditionalInfo: {
      apiConfig: {
        url: "doctor/saveadditionalinfo",
        method: "POST",
      },
      attachPrefix: true,
    },

    UploadDoctorProfileCertificates: {
      apiConfig: {
        url: "doctor/profilecertificates",
        method: "POST",
      },
      attachPrefix: true,
    },

    UploadProfileImage: {
      apiConfig: {
        url: "api/UploadProfileImage",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetTimezones: {
      apiConfig: {
        url: "api/gettimezones",
        method: "Get",
      },
      attachPrefix: true,
    },

    DeactivateAccount: {
      apiConfig: {
        url: "doctor/deactivateaccount",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetDoctorDefaultTiming: {
      apiConfig: {
        url: "doctor/getdefaulttiming",
        method: "GET",
      },
      attachPrefix: true,
    },

    GetDoctorDefaultTimingById: {
      apiConfig: {
        url: "doctor/getdefaulttimingbyid",
        method: "GET",
      },
      attachPrefix: true,
    },

    SaveDoctorDefaultTiming: {
      apiConfig: {
        url: "doctor/savedefaulttiming",
        method: "POST",
      },
      attachPrefix: true,
    },

    DeleteDoctorDefaultTimingById: {
      apiConfig: {
        url: "doctor/deletedefaulttimingbyid",
        method: "DELETE",
      },
      attachPrefix: true,
    },

    GetDoctorCustomTiming: {
      apiConfig: {
        url: "doctor/getcustomtiming",
        method: "GET",
      },
      attachPrefix: true,
    },

    GetDoctorCustomTimingById: {
      apiConfig: {
        url: "doctor/getcustomtimingbyid",
        method: "GET",
      },
      attachPrefix: true,
    },

    SaveDoctorCustomTiming: {
      apiConfig: {
        url: "api/SaveDoctorCustomTiming",
        method: "POST",
      },
      attachPrefix: true,
    },

    DeleteDoctorCustomTimingById: {
      apiConfig: {
        url: "doctor/deletecustomtimingbyid",
        method: "DELETE",
      },
      attachPrefix: true,
    },

    MarkAppointmentAsComplete: {
      apiConfig: {
        url: "api/MarkAppointmentAsComplete",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetDiagnosticById: {
      apiConfig: {
        url: "api/GetDiagnosticById",
        method: "Get",
      },
      attachPrefix: true,
    },

    SaveDiagnosticReport: {
      apiConfig: {
        url: "api/SaveDiagnosticReport",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetAllAppointmentDetail: {
      apiConfig: {
        url: "api/GetAllAppointmentDetail",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetDoctorFAQById: {
      apiConfig: {
        url: "doctor/getfaqbyid",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetDoctorsFAQs: {
      apiConfig: {
        url: "doctor/getfaq",
        method: "Get",
      },
      attachPrefix: true,
    },

    SaveFAQ: {
      apiConfig: {
        url: "doctor/savefaq",
        method: "POST",
      },
      attachPrefix: true,
    },

    DeleteFAQ: {
      apiConfig: {
        url: "doctor/deletefaq",
        method: "DELETE",
      },
      attachPrefix: true,
    },
    GetDoctorFinanceData: {
      apiConfig: {
        url: "doctor/financedata",
        method: "Get",
      },
      attachPrefix: true,
    },
    GetDoctorsPatient: {
      apiConfig: {
        url: "api/GetDoctorsPatient",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetBookedAppointments: {
      apiConfig: {
        url: "api/GetBookedAppointments",
        method: "Get",
      },
      attachPrefix: true,
    },
    BookOfflineAppointment: {
      apiConfig: {
        url: "api/BookOfflineAppointment",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetAllDoctorAdditionalService: {
      apiConfig: {
        url: "doctor/alladditionalservice",
        method: "Get",
      },
      attachPrefix: true,
    },
    SaveDoctorAdditionalService: {
      apiConfig: {
        url: "doctor/saveadditionalserviceinfo",
        method: "POST",
      },
      attachPrefix: true,
    },
    DeleteDoctorServiceById: {
      apiConfig: {
        url: "doctor/deleteservicebyid",
        method: "DELETE",
      },
      attachPrefix: true,
    },
    SaveAdditionalServices: {
      apiConfig: {
        url: "api/SaveAdditionalServices",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetInvoiceDetails: {
      apiConfig: {
        url: "doctor/invoice",
        method: "Get",
      },
      attachPrefix: true,
    },
    GetAdditionalServiceInfo: {
      apiConfig: {
        url: "doctor/additionalservice",
        method: "Get",
      },
      attachPrefix: true,
    },
  },

  exadoAdmin: {
    GetUnVerifiedDoctorsList: {
      apiConfig: {
        url: "admin/unverifieddoctorslist",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetDoctorViewDetails: {
      apiConfig: {
        url: "admin/doctorviewdetails",
        method: "Get",
      },
      attachPrefix: true,
    },

    VerifyDoctorProfile: {
      apiConfig: {
        url: "admin/verifydoctorprofile",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetPagedPatientsList: {
      apiConfig: {
        url: "admin/pagedpatientslist",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetPagedDoctorsList: {
      apiConfig: {
        url: "admin/pageddoctorslist",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetPatientViewDetails: {
      apiConfig: {
        url: "admin/patientviewdetails",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetAllRefundData: {
      apiConfig: {
        url: "admin/allrefund",
        method: "Get",
      },
      attachPrefix: true,
    },

    ApproveRefund: {
      apiConfig: {
        url: "api/ApproveRefund",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetAllUnprocessedWithdraw: {
      apiConfig: {
        url: "admin/allunprocessedwthdraw",
        method: "POST",
      },
      attachPrefix: true,
    },
    ApproveWithdraw: {
      apiConfig: {
        url: "api/ApproveWithdraw",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetAllReviews: {
      apiConfig: {
        url: "api/getAllReviews",
        method: "POST",
      },
      attachPrefix: true,
    },
    DeleteReviewById: {
      apiConfig: {
        url: "api/DeleteReviewById",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetAllCommission: {
      apiConfig: {
        url: "admin/allcommission",
        method: "Get",
      },
      attachPrefix: true,
    },
    SaveDoctorCommission: {
      apiConfig: {
        url: "admin/commission",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetFinanceData: {
      apiConfig: {
        url: "admin/financedata",
        method: "Get",
      },
      attachPrefix: true,
    },
    MarkAsPaid: {
      apiConfig: {
        url: "api/MarkAsPaid",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetDoctorPayment: {
      apiConfig: {
        url: "admin/exportdoctorpayment",
        method: "POST",
      },
      attachPrefix: true,
    },
    SaveCMSPage: {
      apiConfig: {
        url: "admin/CMSPage",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetLanguageAllMessages: {
      apiConfig: {
        url: "admin/languageallmessages",
        method: "Get",
      },
      attachPrefix: true,
    },
    SaveLanguageLabelData: {
      apiConfig: {
        url: "admin/languagelabel",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetPatientQuestionnaireLanguage: {
      apiConfig: {
        url: "admin/patientquestionnairelanguage",
        method: "Get",
      },
      attachPrefix: true,
    },
    SavePatientQuestionnaireLanguage: {
      apiConfig: {
        url: "admin/patientquestionnairelanguage",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetAllPhysicianServiceDetail: {
      apiConfig: {
        url: "admin/allphysicianservice",
        method: "Get",
      },
      attachPrefix: true,
    },
    SavePhysicianService: {
      apiConfig: {
        url: "admin/physicianservice",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetAllLanguageDetail: {
      apiConfig: {
        url: "admin/allLanguage",
        method: "Get",
      },
      attachPrefix: true,
    },
    SaveLanguage: {
      apiConfig: {
        url: "admin/savelanguage",
        method: "POST",
      },
      attachPrefix: true,
    },
    SaveWebsiteLanguageId: {
      apiConfig: {
        url: "admin/websitelanguageid",
        method: "POST",
      },
      attachPrefix: true,
    },
  },

  exadoPatient: {
    GetPatientProfileInfo: {
      apiConfig: {
        url: "patient/getprofile",
        method: "Get",
      },
      attachPrefix: true,
    },

    SavePatientProfileInfo: {
      apiConfig: {
        url: "patient/saveprofile",
        method: "PUT",
      },
      attachPrefix: true,
    },

    DeletePatient: {
      apiConfig: {
        url: "patient/deletepatientbyid",
        method: "DELETE",
      },
      attachPrefix: true,
    },

    ChangeStatus: {
      apiConfig: {
        url: "api/ChangeStatus",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetPatientQuestionnaire: {
      apiConfig: {
        url: "patient/question",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetPatientAnswers: {
      apiConfig: {
        url: "patient/answers",
        method: "Get",
      },
      attachPrefix: true,
    },

    SaveAnswers: {
      apiConfig: {
        url: "api/SaveAnswers",
        method: "POST",
      },
      attachPrefix: true,
    },

    SearchDoctorAppointment: {
      apiConfig: {
        url: "patient/searchdoctorappointment",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetLocation: {
      apiConfig: {
        url: "patient/location",
        method: "Get",
      },
      attachPrefix: true,
    },

    SearchAppointment: {
      apiConfig: {
        url: "patient/searchappointment",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetMoreReviews: {
      apiConfig: {
        url: "patient/getreviews",
        method: "Get",
      },
      attachPrefix: true,
    },

    ViewAllAvailability: {
      apiConfig: {
        url: "api/ViewAllAvailability",
        method: "POST",
      },
      attachPrefix: true,
    },

    FetchNextAppointments: {
      apiConfig: {
        url: "api/FetchNextAppointments",
        method: "POST",
      },
      attachPrefix: true,
    },

    BookAppointment: {
      apiConfig: {
        url: "api/BookAppointment",
        method: "POST",
      },
      attachPrefix: true,
    },

    PatientAppointments: {
      apiConfig: {
        url: "api/PatientAppointments",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetBookedAppointment: {
      apiConfig: {
        url: "api/GetBookedAppointment",
        method: "Get",
      },
      attachPrefix: true,
    },

    UpdatePatientAttachment: {
      apiConfig: {
        url: "patient/attachment",
        method: "Post",
      },
      attachPrefix: true,
    },

    GetAppointments: {
      apiConfig: {
        url: "patient/appointments",
        method: "POST",
      },
      attachPrefix: true,
    },

    ChangeAppointmentStatus: {
      apiConfig: {
        url: "api/ChangeAppointmentStatus",
        method: "POST",
      },
      attachPrefix: true,
    },

    CancelAppointment: {
      apiConfig: {
        url: "api/CancelAppointment",
        method: "POST",
      },
      attachPrefix: true,
    },

    UploadDocument: {
      apiConfig: {
        url: "api/UploadDocument",
        method: "POST",
      },
      attachPrefix: true,
    },

    RemoveDocument: {
      apiConfig: {
        url: "api/RemoveDocument",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetDoctorReviewById: {
      apiConfig: {
        url: "api/GetDoctorReviewById",
        method: "Get",
      },
      attachPrefix: true,
    },

    GetDoctorReviewByAppointmentId: {
      apiConfig: {
        url: "api/GetDoctorReviewByAppointmentId",
        method: "Get",
      },
      attachPrefix: true,
    },

    SaveReview: {
      apiConfig: {
        url: "api/SaveReview",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetWalletBalance: {
      apiConfig: {
        url: "patient/walletbalance",
        method: "Get",
      },
      attachPrefix: true,
    },

    SavePayment: {
      apiConfig: {
        url: "api/SavePayment",
        method: "POST",
      },
      attachPrefix: true,
    },

    ShowDiagnosisToOthers: {
      apiConfig: {
        url: "api/ShowDiagnosisToOthers",
        method: "POST",
      },
      attachPrefix: true,
    },

    AddRefund: {
      apiConfig: {
        url: "api/AddRefund",
        method: "POST",
      },
      attachPrefix: true,
    },

    GetRefundById: {
      apiConfig: {
        url: "api/GetRefundById",
        method: "Get",
      },
      attachPrefix: true,
    },
    WithdrawMoney: {
      apiConfig: {
        url: "patient/withdraw",
        method: "POST",
      },
      attachPrefix: true,
    },
    GetPatientFinanceData: {
      apiConfig: {
        url: "patient/financedata",
        method: "Get",
      },
      attachPrefix: true,
    },
  },
};

export default ApiConstants;
