import { Suspense } from "react";
import Loader from "../commonComponent/LeftPanel/loader";

export const checkIfEqualObject = (value1, value2) =>
  Object.keys(value1).reduce((flag, item) => {
    const tmpFlag = flag && !!value2[item] && value1[item] === value2[item];
    return tmpFlag;
  }, true);

export const checkIfObject = (value) =>
  value && value.constructor === {}.constructor;

export const promiseWrapper = (funcDef, argumentsObj, context) =>
  new Promise((resolve, reject) => {
    if (typeof funcDef === "function") {
      const argumentsObjPromise = checkIfObject(argumentsObj)
        ? {
            ...argumentsObj,
            promise: { resolve, reject },
          }
        : { promise: { resolve, reject } };
      funcDef.call(context, argumentsObjPromise);
    }
  });

export const sumOfObjectKeys = (obj) =>
  Math.ceil(
    Object.values(obj).reduce(
      (sum, i) => parseFloat(sum, 0) + parseFloat(i, 0) || 0,
      0
    )
  );

export const getMonthsRoundOff = (startDate, endDate) => {
  const yearsDiff =
    parseInt(endDate.split("/")[2], 0) - parseInt(startDate.split("/")[2], 0);
  const monthDiff =
    parseInt(endDate.split("/")[1], 0) - parseInt(startDate.split("/")[1], 0);
  const totalMonth = yearsDiff >= 1 ? monthDiff + yearsDiff * 12 : monthDiff;
  return totalMonth;
};

// eslint-disable-next-line max-len
export const isNaturalNumber = (value) =>
  Number.isInteger(parseFloat(value, 0)) && parseInt(value, 0) > 0;

export const isValidCurrency = (value) => {
  if (parseInt(value.trim().replace(/[€$,]/g, ""), 0) > 0) {
    return true;
  }
  return false;
};

export const isEmpty = (data) => {
  return data === undefined || data === null || data.length <= 0 || data === 0
    ? true
    : false;
};

export const isFinitenumber = (value) =>
  Number.isFinite(value) ||
  (Number.isFinite(Number(value)) && typeof value === "string");

export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

export const isEqual = (min, max) => {
  return min === max;
};

export const GetQueryStringValue = (name) => {
  let url = window.location.href;
  name = name.replace(/\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  let results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const htmlDecode = (input) => {
  var e = document.createElement("div");
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

export const stringToBoolean = (string) => {
  switch (string.toLowerCase().trim()) {
    case "True":
    case "true":
    case "yes":
    case "1":
      return true;
    case "False":
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

export const isPasswordValid = (data) => {
  if (data === undefined || data === null || data.length <= 0 || data === 0) {
    return false;
  } else {
    let strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(data);
  }
};

export const isPhoneValid = (data) => {
  if (data === undefined || data === null || data.length <= 0 || data === 0) {
    return false;
  } else {
    let strongRegex = new RegExp("^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$");
    return strongRegex.test(data);
  }
};

export const isNumberValid = (data) => {
  if (data === undefined || data === null || data.length <= 0 || data === 0) {
    return false;
  } else {
    let strongRegex = new RegExp("^[0-9]+$");
    return strongRegex.test(data);
  }
};

export const weekArray = (data) => {
  return [
    { dayId: 1, dayName: "Monday", sortName: "Mon" },
    { dayId: 2, dayName: "Tuesday", sortName: "Tue" },
    { dayId: 3, dayName: "Wednesday", sortName: "Wed" },
    { dayId: 4, dayName: "Thursday", sortName: "Thu" },
    { dayId: 5, dayName: "Friday", sortName: "Fri" },
    { dayId: 6, dayName: "Saturday", sortName: "Sat" },
    { dayId: 7, dayName: "Sunday", sortName: "Sun" },
  ];
};

export const getMonthNameByDate = (date) => {
  if (date === undefined || date === null || date.length <= 0 || date === 0) {
    return false;
  } else {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  }
};

export const getDayNameByDate = (date) => {
  if (date === undefined || date === null || date.length <= 0 || date === 0) {
    return false;
  } else {
    var days = [
      { dayId: 0, dayName: "Sunday", sortName: "Sun" },
      { dayId: 1, dayName: "Monday", sortName: "Mon" },
      { dayId: 2, dayName: "Tuesday", sortName: "Tue" },
      { dayId: 3, dayName: "Wednesday", sortName: "Wed" },
      { dayId: 4, dayName: "Thursday", sortName: "Thu" },
      { dayId: 5, dayName: "Friday", sortName: "Fri" },
      { dayId: 6, dayName: "Saturday", sortName: "Sat" },
    ];
    return days.filter((a) => a.dayId === date.getDay())[0];
  }
};

export const cmsPageNum = {
  HomePage: 1,
  ChatWithDoctors: 2,
  Emergency: 3,
  ContactUs: 4,
  AboutUs: 5,
  TermsNCondition: 6,
  PrivacyPolicy: 7,
  FAQs: 8,
  TermsNConditionDoctor: 9,
};

export const appointmentType = {
  InClinic: 2,
  OnLine: 1,
  IN_CLINIC: "InClinic",
  ON_LINE: "Online",
};

export const userType = {
  admin: 3,
  doctor: 1,
  patient: 2,
  login_patient: "Patient",
  login_doctor: "Doctor",
};

export const localStorageKeys = {
  saveAppointmentData: "save-appointment-data",
  loginType: "login-Type",
  userType: "user-type",
  userId: "user-id",
  accessToken: "access-token",
  fullName: "user-fullname",
  profileImage: "profile-image",
  websiteLanguageData: "website-language-data",
  email: "email",
};

export const appointmentStatus = {
  Requested: "Requested",
  Approved: "Approved",
  Completed: "Completed",
};

export const COOKIES_KEY = {
  LANGUAGE_CODE: "current-language",
};

export const isAppointmentNew = (date, hour = null) => {
  const currentDate = new Date();
  let appDate = new Date(date);
  if (hour) appDate = new Date(appDate.getTime() + hour * 60 * 60 * 1000);
  return appDate.getTime() > currentDate.getTime();
};

export const componentWithLazyLoad = (Component, props = {}) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);
