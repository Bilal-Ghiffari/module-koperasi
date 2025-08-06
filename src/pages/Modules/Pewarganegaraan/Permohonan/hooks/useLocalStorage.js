export const getCurrentPermohonanId = () => {
  try {
    const currentPermohonanId = localStorage.getItem("currentPermohonanId");
    if (currentPermohonanId) {
      return JSON.parse(currentPermohonanId);
    }
    return null;
  } catch (error) {
    console.error(
      "Error retrieving currentPermohonanId from localStorage:",
      error
    );
    return null;
  }
};
