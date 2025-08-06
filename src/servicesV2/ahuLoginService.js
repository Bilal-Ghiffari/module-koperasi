import { AhuAppClientV2 } from "@/api/configs";
import { getCookie } from "@/utils/storageBroworser";

const ahuLoginService = {
  getLoginData: async () => {
    const token = getCookie("userSession");

    try {
      if (!token) {
        return;
      }

      const response = await AhuAppClientV2.get("/auth/data", {
        params: {
          token: token,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ response:", response?.data);

      return response.data;
    } catch (error) {
      console.error("Gagal mendapatkan data login AHU:", error);
      throw error;
    }
  },
};

export default ahuLoginService;
