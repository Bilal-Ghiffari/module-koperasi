import {
  deleteMarina,
  getMarina,
  getMarinaNew,
  getMarinaPortal,
  postFormData,
} from "./api_helper";
import * as url from "./url_helper";

export const buildQueryString = (params) => {
  if (!params || typeof params !== "object") {
    // Return an empty string if params is undefined, null, or not an object
    return "";
  }

  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

// MASTER DATA
export const apiGetKBLI = (body) => {
  const queryString = buildQueryString(body || {});
  return getMarinaNew(`${url.GET_KBLI}?${queryString}`);
};

export const apiGetDropdownCountry = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_COUNTRY}?${queryString}`);
};



export const postAuthChngPwd = (params) => {
  return postFormData(`${url.AUTH_CHANGE_PWD}`, params);
};

export const apiPostOauthSSO = (body) => {
  const queryString = buildQueryString(body || {});
  return getMarina(`${url.OAUTHSSO}?${queryString}`);
};
export const GenerateUrlSSO = () => {
  return getMarina(url.GENERATE_URL_SSO);
};
export const getAuthProfile = () => {
  return getMarina(url.GET_PROFILE);
};

// PUBLIK REGIONS

// Wilayah Provinsi
export const apiGetDropdownProv = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_PROVINSI}?${queryString}`);
};

export const apiGetDropdownKotakab = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_ROPDOWN_KOTAKAB}?${queryString}`);
};

export const apiGetDropdownKec = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_ROPDOWN_KECAMATAN}?${queryString}`);
};

export const apiGetDropdownDesa = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaPortal(`${url.GET_PUBLIC_ROPDOWN_DESA}?${queryString}`);
};
export const apiPostAuthReqReset = (body) => {
  return postFormData(url.AUTH_REQ_RESET, body);
};
export const apiPostAuthResetPass = (body) => {
  return postFormData(url.AUTH_RESET_PASS, body);
};

// PERSEROAN PERORANGAN
export const apiGetListPerseroanPerorangan = (params) => {
  const queryString = buildQueryString(params || {});
  return getMarinaNew(`${url.GET_PERSEROAN_PERORANGAN}?${queryString}`);
};
export const apiGetListByIdPerseroanPerorangan = (id) => {
  return getMarinaNew(`${url.GET_PERSEROAN_PERORANGAN}/${id}`);
};
export const apiGetSertifikatPerseroanPerorangan = (id) => {
  return getMarinaNew(`${url.GET_SERTIFIKAT_PERSEROAN_PERORANGAN}/${id}`);
};


export const apiDeletePerseroanPerorangan = (id) => {
  return deleteMarina(`${url.GET_PERSEROAN_PERORANGAN}/${id}`);
};