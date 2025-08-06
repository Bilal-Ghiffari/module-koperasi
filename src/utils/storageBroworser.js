import Cookie from "js-cookie";

// localStorage
export const getLocalStorageItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error("LocalStorage access error:", error);
    return null;
  }
};

export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("LocalStorage access error:", error);
  }
};

export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("LocalStorage access error:", error);
  }
};

// cookie
export const getCookie = (name) => {
  try {
    return JSON.parse(Cookie.get(name));
  } catch (error) {
    console.error("Cookie access error:", error);
    return null;
  }
};

export const setCookie = (name, value) => {
  try {
    Cookie.set(name, value);
  } catch (error) {
    console.error("Cookie access error:", error);
  }
};

export const removeCookie = (name) => {
  try {
    Cookie.remove(name);
  } catch (error) {
    console.error("Cookie access error:", error);
  }
};
