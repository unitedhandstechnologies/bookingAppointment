import {
    GET_CURRENCY
} from './constants';

const initStateObj =
{
    userId: "sample-exado",
    userFullName: "sample exado",
    userType: 0,
    userEmail:"sample@exado.com"
};

export default function ExadoReducer(state = initStateObj, action) {
    switch (action.type) {
        case GET_CURRENCY:
            {
                return {
                    ...state, userId: action.value, userFullName: action.value, userType: action.value, userEmail: action.value
                }
            }
        default:
            return state;
    }
}