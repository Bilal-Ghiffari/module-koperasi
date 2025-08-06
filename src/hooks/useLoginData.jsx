import ahuLoginService from "@/servicesV2/ahuLoginService";
import React from "react";

const useLoginData = () => {
  const [loginData, setLoginData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchLoginData = async () => {
      try {
        setLoading(true);
        const data = await ahuLoginService.getLoginData();
        setLoginData(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Gagal mengambil data login");
        setLoginData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginData();
  }, []);

  return { loginData, loading, error };
};

export default useLoginData;
