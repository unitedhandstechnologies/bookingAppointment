import {
  UPDATE_APPOINTMENT_MODEL,
  UPDATE_DOCTOR_APPOINTMENT_DETAILS,
} from "./constants";

const anAppoinmentModel = {
  appDate: new Date().toISOString().split("T")[0],
  location: "",
  physicianService: [0],
  isMale: 1,
  languageId: [0],
  appointmentType: 1,
};

const docAppoinmentDetails = {
  acceptOnlinePayment: "",
  doctorImage: "",
  firstName: "",
  lastName: "",
  doctorCurrency: "",
  physicianServices: [],
  totalReview: 0,
  averageReview: 0,
  onlineAppointmentFees: 0,
  inclinicAppointmentFees: 0,
  refundPercentage: 0,
  refundInClinicPercentage: 0,
  isChatFree: null,
  chatFees: 0,
  experience: 0,
  timeslot: "",
  docGuid: "",
};

const initStateObj = {
  appoinmentModel: anAppoinmentModel,
  docAppoinmentDetails: docAppoinmentDetails,
};

export default function ExadoReducer(state = initStateObj, action) {
  switch (action.type) {
    case UPDATE_APPOINTMENT_MODEL: {
      return {
        ...state,
        appoinmentModel: action.appoitmentData,
      };
    }
    case UPDATE_DOCTOR_APPOINTMENT_DETAILS: {
      return {
        ...state,
        docAppoinmentDetails: action.docAppoinmentDetails,
      };
    }
    default:
      return state;
  }
}
