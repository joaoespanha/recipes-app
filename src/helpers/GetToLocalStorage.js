const GetToLocalStorage = (key) => {
  const stringifiedValue = localStorage.getItem(key);
  return JSON.parse(stringifiedValue);
};

export default GetToLocalStorage;
