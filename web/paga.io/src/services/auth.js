import axios from "axios";
// eslint-disable-next-line no-undef
const API_BASE = process.env.REACT_APP_APIBASE;

export const userLogin = (params) => {
  return axios
    .post(`${API_BASE}`, params)
    .then((e) => e)
    .catch((e) => e);
};
