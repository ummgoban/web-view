export const getStorage = (key: string) => {
  const storage = localStorage.getItem(key);
  return storage ? JSON.parse(storage) : null;
};

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
