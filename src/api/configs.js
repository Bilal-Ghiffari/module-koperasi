import { AUTH_KEY } from "@/constants/api.constant";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import https from "https";
import { getCookie } from "@/utils/storageBroworser";

const createApiClient = (baseURL, contentType = "application/json") => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": contentType,
    },
    // httpsAgent: new (require("https").Agent)({
    //   rejectUnauthorized: false,
    // }),
  });

  instance.interceptors.request.use(
    (config) => {
      //   const jwt = JSON.parse(localStorage.getItem("resUser"));
      //   const auth = secureLocalStorage.getItem(AUTH_KEY);
      const token = getCookie("userSession");
      // const tokenParse =
      console.log("TOKEN", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token ?? ""}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (!error.response) {
        console.log("error", error);
        return Promise.reject({
          message: "Network Error: Tidak dapat terhubung ke server",
          status: null,
          code: "NETWORK_ERROR",
        });
      }

      const { status, data } = error.response;
      let errorMessage = "Terjadi kesalahan";
      let errorCode = "UNKNOWN_ERROR";

      switch (status) {
        case 400:
          errorMessage = data.message || "Permintaan tidak valid";
          errorCode = "BAD_REQUEST";
          // Handle validation errors jika ada
          if (data.errors) {
            errorMessage = Object.values(data.errors).join(", ");
          }
          break;

        case 401:
          errorMessage = data.message || "Anda tidak terautentikasi";
          errorCode = "UNAUTHORIZED";
          // Auto logout jika token tidak valid
          console.log("Auto logout");
          //   logout();
          break;

        case 403:
          errorMessage = data.message || "Akses ditolak";
          errorCode = "FORBIDDEN";
          // Redirect ke halaman unauthorized jika perlu
          // history.push('/unauthorized');
          break;

        case 404:
          errorMessage = data.message || "Resource tidak ditemukan";
          errorCode = "NOT_FOUND";
          break;

        case 422:
          errorMessage = data.message || "Validasi gagal";
          errorCode = "VALIDATION_ERROR";
          // Format validation errors untuk ditampilkan di form
          if (data.errors) {
            return Promise.reject({
              message: errorMessage,
              status,
              code: errorCode,
              errors: data.errors, // Format: { field: ['error1', 'error2'] }
            });
          }
          break;

        case 429:
          errorMessage = data.message || "Terlalu banyak permintaan";
          errorCode = "TOO_MANY_REQUESTS";
          // Bisa tambahkan logic untuk menunggu sebelum retry
          break;

        case 500:
          errorMessage = data.message || "Kesalahan server internal";
          errorCode = "INTERNAL_SERVER_ERROR";
          // Log error ke service seperti Sentry
          // logErrorToService(error);
          break;

        default:
          errorMessage = data.message || `Error ${status}`;
          errorCode = `HTTP_${status}`;
      }

      return Promise.reject({
        message: errorMessage,
        status,
        code: errorCode,
        data: data, // Sertakan seluruh response data untuk debugging
        ...(data.errors && { errors: data.errors }), // Sertakan errors jika ada
      });
    }
  );

  return instance;
};

export const AhuAppClientV1 = createApiClient(
  import.meta.env.VITE_APP_AHU_BASEURL_FE_V1
);

export const AhuAppClientV2 = createApiClient(
  import.meta.env.VITE_APP_AHU_BASEURL_FE_V2
);
