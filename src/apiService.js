import axios from "axios";
import MessageFormat from "messageformat";
import { toast } from "react-toastify";
import { getAxiosApiConfig } from "./utility/apiConfig";
import { checkIfObject } from "./utility/common";
axios.defaults.withCredentials = true;

const messageFormatter = new MessageFormat("en");

class ApiService {
  constructor(config) {
    const { apiKey } = config;
    this.config = config || {};
    if (apiKey) {
      this.apiConfig = getAxiosApiConfig(apiKey);
      // Header Config
      if (checkIfObject(this.config.headers)) {
        this.apiConfig.headers = {
          ...this.apiConfig.headers,
          ...this.config.headers,
        };
      }

      // JSON Request Body
      if (checkIfObject(this.config.data)) {
        //this.apiConfig.data = { ...this.apiConfig.headers, ...this.config.data };
        this.apiConfig.data = { ...this.config.data };
      }

      if (
        this.config.fileUpload !== null &&
        this.config.fileUpload !== undefined
      ) {
        const formData = new FormData();
        formData.append(
          "file",
          this.config.fileUpload,
          this.config.fileUpload.name
        );
        this.apiConfig.data = formData;
      }

      // URL Path Variables
      if (checkIfObject(this.config.pathVariables)) {
        const rawUrl = this.apiConfig.url;
        const mfUrl = messageFormatter.compile(rawUrl);
        this.apiConfig.url = mfUrl(this.config.pathVariables);
        console.log(rawUrl, this.apiConfig.url, "check url");
      }
      // URL Params
      if (checkIfObject(this.config.urlParams)) {
        const url = new URL(this.apiConfig.url, window.location.origin);
        const params = this.config.urlParams;
        if (params) {
          Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
          );
          this.apiConfig.url = url;
        }
      }
      // Url Manipulating
      if (checkIfObject(this.config.urlValue)) {
        const url = new URL(this.apiConfig.url, window.location.origin);
        const params = this.config.urlValue;
        if (params) {
          Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
          );
          this.apiConfig.url = url;
        }
      }
      if (!this.apiConfig) {
        console.log(`No Api-config present for apiKey - ${apiKey}`);
      }
    }
  }

  getApiConfig() {
    return this.apiConfig;
  }

  handleSessionTimout(error) {
    if (typeof this.config.handleSessionTimout === "function") {
      this.config.handleSessionTimout(error);
    }
  }

  beforeSendCallBack() {
    if (typeof this.config.beforeSendCallBack === "function") {
      this.config.beforeSendCallBack();
    }
  }

  completeCallBack(response) {
    if (typeof this.config.completeCallBack === "function") {
      this.config.completeCallBack(response);
    }
  }

  //#Service
  call() {
    document.getElementById("ExadoLoader").style.display = "block";
    this.beforeSendCallBack();
    return new Promise((resolve, reject) => {
      axios(this.apiConfig)
        .then((response) => {
          this.completeCallBack(response);
          resolve(response);
          document.getElementById("ExadoLoader").style.display = "none";
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          document.getElementById("ExadoLoader").style.display = "none";
        });
    });
  }
}

axios.interceptors.request.use(
  (config) => {
    // console.log('interceptors request ===================');
    return config;
  },
  (error) => {
    // console.log('interceptors request ===================');
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default ApiService;
