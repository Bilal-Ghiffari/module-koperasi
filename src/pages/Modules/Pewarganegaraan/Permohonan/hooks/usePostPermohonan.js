// hooks/usePostPermohonan.js - Fixed version
import { useState } from "react";
import axios from "axios";
import { pewargaStatictoken } from "../services/api";

export const usePostPermohonan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postPermohonan = async (data) => {
    console.log("🚀 usePostPermohonan - Starting POST request");
    console.log("Data to post:", data);

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiResponse = await axios.post(
        "http://192.168.72.86:3000/pewarganegaraan/permohonan",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pewargaStatictoken}`,
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      console.log("✅ POST API Response:", apiResponse);
      console.log("Response status:", apiResponse.status);
      console.log("Response data:", apiResponse.data);

      // ✅ ROBUST RESPONSE HANDLING
      let processedResponse;

      // Check if response has data
      if (apiResponse.data) {
        processedResponse = apiResponse.data;
        localStorage.setItem(
          "currentPermohonanId",
          JSON.stringify(apiResponse.data.data.id_permohonan)
        );
      } else if (apiResponse.status === 200 || apiResponse.status === 201) {
        // Success status but no data
        processedResponse = {
          message: "Success",
          status: apiResponse.status,
        };
      } else {
        // Unexpected response
        processedResponse = {
          message: "Unknown response",
          status: apiResponse.status,
          data: apiResponse.data,
        };
      }

      console.log("✅ Processed response:", processedResponse);
      setResponse(processedResponse);

      return processedResponse;
    } catch (err) {
      console.error("❌ POST Permohonan Error:", err);

      let errorDetails = {
        message: "Network error",
        status: null,
        data: null,
      };

      if (err.response) {
        // Server responded with error status
        console.error("API Error Response:", err.response);
        errorDetails = {
          message: err.response.data?.message || `HTTP ${err.response.status}`,
          status: err.response.status,
          data: err.response.data,
        };
      } else if (err.request) {
        // Network error
        console.error("Network Error:", err.request);
        errorDetails = {
          message: "Network connection failed",
          status: null,
          data: null,
        };
      } else {
        // Other error
        console.error("Unexpected Error:", err.message);
        errorDetails = {
          message: err.message,
          status: null,
          data: null,
        };
      }

      setError(errorDetails);

      // ✅ THROW ERROR WITH PROPER FORMAT
      const error = new Error(errorDetails.message);
      error.response = err.response;
      error.request = err.request;
      error.status = errorDetails.status;

      throw error;
    } finally {
      setLoading(false);
      console.log("🏁 usePostPermohonan - Request completed");
    }
  };

  return {
    postPermohonan,
    loading,
    error,
    response,
  };
};

// hooks/usePatchPermohonan.js - Fixed version
export const usePatchPermohonan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const patchPermohonan = async (data, id = null) => {
    console.log("🚀 usePatchPermohonan - Starting PATCH request");
    console.log("Data to patch:", data);
    console.log("ID:", id);

    setLoading(true);
    setError(null);
    setResponse(null);

    // Determine URL based on whether ID is provided
    const url = id
      ? `http://192.168.72.86:3000/pewarganegaraan/permohonan/${id}`
      : "http://192.168.72.86:3000/pewarganegaraan/permohonan";

    try {
      const apiResponse = await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pewargaStatictoken}`,
        },
        timeout: 30000, // 30 seconds timeout
      });

      console.log("✅ PATCH API Response:", apiResponse);
      console.log("Response status:", apiResponse.status);
      console.log("Response data:", apiResponse.data);

      // ✅ ROBUST RESPONSE HANDLING
      let processedResponse;

      // Check if response has data
      if (apiResponse.data) {
        processedResponse = apiResponse.data;
      } else if (apiResponse.status === 200 || apiResponse.status === 204) {
        // Success status but no data
        processedResponse = {
          message: "Success",
          status: apiResponse.status,
        };
      } else {
        // Unexpected response
        processedResponse = {
          message: "Unknown response",
          status: apiResponse.status,
          data: apiResponse.data,
        };
      }

      console.log("✅ Processed response:", processedResponse);
      setResponse(processedResponse);

      return processedResponse;
    } catch (err) {
      console.error("❌ PATCH Permohonan Error:", err);

      let errorDetails = {
        message: "Network error",
        status: null,
        data: null,
      };

      if (err.response) {
        // Server responded with error status
        console.error("API Error Response:", err.response);
        errorDetails = {
          message: err.response.data?.message || `HTTP ${err.response.status}`,
          status: err.response.status,
          data: err.response.data,
        };
      } else if (err.request) {
        // Network error
        console.error("Network Error:", err.request);
        errorDetails = {
          message: "Network connection failed",
          status: null,
          data: null,
        };
      } else {
        // Other error
        console.error("Unexpected Error:", err.message);
        errorDetails = {
          message: err.message,
          status: null,
          data: null,
        };
      }

      setError(errorDetails);

      // ✅ THROW ERROR WITH PROPER FORMAT
      const error = new Error(errorDetails.message);
      error.response = err.response;
      error.request = err.request;
      error.status = errorDetails.status;

      throw error;
    } finally {
      setLoading(false);
      console.log("🏁 usePatchPermohonan - Request completed");
    }
  };

  return {
    patchPermohonan,
    loading,
    error,
    response,
  };
};
