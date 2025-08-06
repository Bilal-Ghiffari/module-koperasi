export const getUserDetail = () => {
    return JSON.parse(localStorage.getItem('resUser'))?.user_detail || '';
  };