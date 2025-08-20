export const getStorage = (key: string, type: "session" | "local" = "local") => {
  const storage = type === "session" ? sessionStorage : localStorage;
  const value = storage.getItem(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting storage:", error);
    return null;
  }
};

export const setStorage = (key: string, value: any, type: "session" | "local" = "local") => {
  const storage = type === "session" ? sessionStorage : localStorage;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting storage:", error);
  }
};

export const removeStorage = (key: string, type: "session" | "local" = "local") => {
  const storage = type === "session" ? sessionStorage : localStorage;
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error("Error removing storage:", error);
  }
};

export const resetStorage = (type: "session" | "local" = "local") => {
  const storage = type === "session" ? sessionStorage : localStorage;
  try {
    storage.clear();
  } catch (error) {
    console.error("Error resetting storage:", error);
  }
};
