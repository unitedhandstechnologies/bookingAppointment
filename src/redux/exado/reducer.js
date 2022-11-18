import { LOGIN_USER, CHANGE_LANGUAGE } from "./constants";

const initStateObj = {
  userId: "sample-exado",
  userFullName: "sample exado",
  userType: 0,
  userEmail: "sample@exado.com",
  language: {},
};

export default function ExadoReducer(state = initStateObj, action) {
  switch (action.type) {
    /* case SOCIAL_MEDIA_LOGIN:
            {
                return {
                    ...state, userId: action.value, userFullName: action.value, userType: action.value, userEmail: action.value
                }
            }
        case REGISTER_USER:
            {
                return {
                    ...state, userId: action.value, userFullName: action.value, userType: action.value, userEmail: action.value
                }
            } */
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.language,
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        userId: action.value,
        userFullName: action.value,
        userType: action.value,
        userEmail: action.value,
      };
    }
    default:
      return state;
  }
}
