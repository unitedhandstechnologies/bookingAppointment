import { currentApiUrlPrefix } from "./environmentConfig";
import ApiConstants from "./apiConstants";
import cookie from "react-cookies";
import { COOKIES_KEY } from "./common";

// Pure Config to be used by AXIOS

const getAxiosApiConfig = (apiKey) => {
  // eslint-disable-next-line no-bitwise
  if (apiKey && ~apiKey.indexOf(".")) {
    const apiKeyParams = apiKey.split(".");
    if (
      apiKey &&
      ApiConstants[apiKeyParams[0]] &&
      ApiConstants[apiKeyParams[0]][apiKeyParams[1]]
    ) {
      const currentApi = ApiConstants[apiKeyParams[0]][apiKeyParams[1]];
      const apiConfig = { ...currentApi.apiConfig };
      if (currentApi.attachPrefix) {
        apiConfig.url = currentApiUrlPrefix + apiConfig.url;
      }
      //apiConfig.headers = { 'Content-Type': 'application/json' }
      return apiConfig;
    }
  }
  return null;
};

const getConfig = (apiKey) => {
  let token = window.localStorage.getItem("access-token");
  let config = {};
  let cl = cookie.load(COOKIES_KEY.LANGUAGE_CODE) || "en";
  // eslint-disable-next-line no-bitwise
  if (apiKey && ~apiKey.indexOf(".")) {
    const apiKeyParams = apiKey.split(".");
    if (
      apiKeyParams.length &&
      ApiConstants[apiKeyParams[0]] &&
      ApiConstants[apiKeyParams[0]][apiKeyParams[1]]
    ) {
      const currentApi = ApiConstants[apiKeyParams[0]][apiKeyParams[1]];
      config = { ...currentApi.config };
      config = config || {};
      config.headers = {
        Authorization: `Bearer ${token}`,
        currentLanguage: cl,
      };
      config.apiKey = apiKey;
    }
  }
  return config;
};

export { getAxiosApiConfig, getConfig };
