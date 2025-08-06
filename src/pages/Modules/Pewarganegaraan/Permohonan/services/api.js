import { patchDataJson, postDataJson, postFormDataFile } from "./apiHelper";
import { URL_FILE, URL_MASTER, URL_PERMOHONAN } from "./apiUrl";
import { getMarinaNew } from "@/helpers/api_helper";

export const pewargaStatictoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWlucyIsInNlc3Npb25faWQiOiI0ZmRlNmRkOS01OWJhLTRkMmUtODE1Zi1hOTQzOGJlYzkxMWIiLCJpbml0aWFsIjoxNzUyNzU2MTY4LCJleHBpcmVkIjoxNzUyNzU5NzY4LCJpYXQiOjE3NTI3NTYxNjh9.ozhBTX1yVC6o96ScllODxu8rfqprjry1EM0XAlxxfdM";

const defaultConfig = {
  headers: {
    Authorization: `Bearer ${pewargaStatictoken}`,
  },
};

const buildQueryString = (params) => {
  if (!params || typeof params !== "object") return "";
  const query = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return query ? `?${query}` : "";
};

export const apiGetCountry = () => {
  return getMarinaNew(URL_MASTER.apiNegara);
};

export const apiGetDropdownProv = () => {
  const queryString = buildQueryString({ tipe: "provinsi" });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`, defaultConfig);
};

export const apiGetDropdownKotakab = (idProvinsi) => {
  const queryString = buildQueryString({ tipe: "kotakab", id: idProvinsi });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`, defaultConfig);
};

export const apiGetDropdownKec = (idKotaKab) => {
  const queryString = buildQueryString({ tipe: "kecamatan", id: idKotaKab });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`, defaultConfig);
};

export const apiGetDropdownDesa = (idKecamatan) => {
  const queryString = buildQueryString({ tipe: "desa", id: idKecamatan });
  return getMarinaNew(`${URL_MASTER.apiWilayah}${queryString}`, defaultConfig);
};

export const apiGetPekerjaan = () => {
  return getMarinaNew(URL_MASTER.apiPekerjaan, defaultConfig);
};

export const apiGetAgama = () => {
  return getMarinaNew(URL_MASTER.apiAgama, defaultConfig);
};

export const apiGetStatusKawin = () => {
  return getMarinaNew(URL_MASTER.apiStatusKawin, defaultConfig);
};

export const apiPostPermohonan = (data) => {
  return postDataJson(URL_PERMOHONAN.postPermohonan, data, defaultConfig);
};

export const apiGetPermohonan = (id) => {
  return getMarinaNew(`${URL_PERMOHONAN.postPermohonan}/${id}`, defaultConfig);
};

export const apiPatchPermohonan = (data) => {
  return patchDataJson(URL_PERMOHONAN.patchPermohonan, data, defaultConfig);
};

export const apiUploadFile = (data) => {
  return postFormDataFile(URL_FILE.uploadFile, data, defaultConfig);
};

export const apiSubmitPermohonan = (data) => {
  return patchDataJson(URL_PERMOHONAN.patchPermohonan, data, defaultConfig);
};
