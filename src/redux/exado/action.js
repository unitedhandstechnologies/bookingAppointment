import {
    SOCIAL_MEDIA_LOGIN,
    REGISTER_USER,
    LOGIN_USER,
    VERIFY_EMAIL_OTP,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    SEND_OTP_CODE,
    CHANGE_PASSWORD,
    CHANGE_LANGUAGE,
    GET_CMS_PAGE,
    GET_AUTH_TOKEN,
    SAVE_CARD_INFO
} from './constants';

const socialMediaLogin = ({ userModel, promise }) => (
    {
        type: SOCIAL_MEDIA_LOGIN,
        userModel,
        promise
    });

const registerUser = ({ userModel, promise }) => (
    {
        type: REGISTER_USER,
        userModel,
        promise
    });

const loginUser = ({ email, password, userType, promise }) => (
    {
        type: LOGIN_USER,
        email,
        password,
        userType,
        promise
    });

const verifyEmailOTP = ({ userId, emailOTP, promise }) => (
    {
        type: VERIFY_EMAIL_OTP,
        userId,
        emailOTP,
        promise
    });

const forgotPassword = ({ email, userType, promise }) => (
    {
        type: FORGOT_PASSWORD,
        email,
        userType,
        promise
    });

const resetPassword = ({ userId, password, promise }) => (
    {
        type: RESET_PASSWORD,
        userId, password,
        promise
    });

const sendOTPCode = ({ userId, promise }) => (
    {
        type: SEND_OTP_CODE,
        userId,
        promise
    });

const changePassword = ({ userId, oldPassword, newPassword, promise }) => (
    {
        type: CHANGE_PASSWORD,
        userId, oldPassword, newPassword,
        promise
    });

const changeLanguage = ({ language }) => (
    {
        type: CHANGE_LANGUAGE,
        language
    }
)

const getCMSPage = ({ query, promise }) => (
    {
        type: GET_CMS_PAGE,
        query,
        promise
    }
)

const getAuthToken = ({ modal, promise }) => (
    {
        type: GET_AUTH_TOKEN,
        modal,
        promise
    }
)

const saveCardInfo = ({ modal, promise }) => (
    {
        type: SAVE_CARD_INFO,
        modal,
        promise
    }
)

const exadoActions = {
    socialMediaLogin,
    registerUser,
    loginUser,
    verifyEmailOTP,
    forgotPassword,
    resetPassword,
    sendOTPCode,
    changePassword,
    changeLanguage,
    getCMSPage,
    getAuthToken,
    saveCardInfo
};

export default exadoActions;