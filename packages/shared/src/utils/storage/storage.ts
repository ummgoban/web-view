export const getStorage = (key: string, type: "session" | "local" = "local") => {
  const storage = type === "session" ? sessionStorage : localStorage;
  const value = storage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const setStorage = (key: string, value: any, type: "session" | "local" = "local") => {
  const storage = type === "session" ? sessionStorage : localStorage;
  storage.setItem(key, JSON.stringify(value));
};

export const removeStorage = (key: string, type: "session" | "local" = "local") => {
  const storage = type === "session" ? sessionStorage : localStorage;
  storage.removeItem(key);
};
