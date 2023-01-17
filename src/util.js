export const addDataToLocalStorage = (data) => {
  localStorage.setItem("wallData", JSON.stringify(data));
};

export const getDeepclone = (data) => {
  return JSON.parse(JSON.stringify(data));
};
