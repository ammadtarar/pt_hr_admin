import axios from "axios";

// const baseURL = "https://dev.api.pushtalents.sawatechnologies.org/";
// const baseURL = "http://localhost:3001/";
// const baseURL = "https://api.2021.pushtalents.com/";
const baseURL = "https://stage.api.pushtalents.com/";
axios.defaults.baseURL = baseURL;

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API,
  responseType: "json",
});

HTTP.interceptors.request.use(
  function (config) {
    config.headers["Accept-Language"] = "fr";
    config.headers["client-name"] = "hr_admin";
    const utilisateur = localStorage.getItem("utilisateur");
    if (utilisateur) {
      let user = JSON.parse(utilisateur);
      if (user && user.token) {
        config.headers["Authorization"] = user.token;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

HTTP.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(JSON.parse(JSON.stringify(error)));
    console.log("error.response");
    console.log(error.response);
    if (error.response.status === 406 || error.response.status === 409) {
      localStorage.removeItem("utilisateur");
      window.location.reload();
      alert(error.response.data.message);
    }
    throw error;
  }
);

const URLS = {
  baseURL: baseURL,
  SUPER_ADMIN: {
    LOGIN: "super_admin/login",
  },
  COMPANY: {
    LSIT_ALL: "company/list/all",
    CREATE: "company/create",
    UPDATE: "company/:id/update",
    BY_ID: "company/:id",
  },
  USER: {
    SEND_OTP: "company/user/send/otp",
    LOGIN: "company/user/login",
    CREATE: "company/user/create",
    LIST_ALL: "company/user/list/all",
    UPDATE_STATUS: "company/user/:id/update/status",
  },
  JOBS: {
    CREATE: "company/job/create",
    LIST_ALL: "company/job/list/all",
    REFERRALS_LIST_ALL: "company/job/referral/list/all",
    ARCHIVE_BY_ID: "company/job/referral/:id/archive",
    BY_ID: "company/job/:id",
    UPDATE_REFERRAL_STATUS: "company/job/referral/:id/update/status",
  },
  ARTICLE: {
    CREATE: "company/article/create",
    BY_ID: "company/article/:id/update/status",
    LIST_ALL: "company/article/list/all",
    UPDATE_STATUS: "company/article/:id/update/status",
  },
  QUIZ: {
    CREATE: "company/quiz/create",
    LIST_ALL: "company/quiz/list/all",
    BY_ID: "company/quiz/:id",
    ADD_QUESTIONS: "company/quiz/:id/add/questions",
  },
  REWARD: {
    CREATE: "company/reward/create",
    LIST_ALL: "company/reward/list/all",
    BY_ID: "company/reward/:id",
    REDEEM_LIST: "company/reward/redeem/requests/list/all",
    APPROVE_REDEEM_REQUEST: "company/reward/redeem/:id/approve",
  },
  DASHBOARD: "dashbaord",
};

export { HTTP, URLS };
