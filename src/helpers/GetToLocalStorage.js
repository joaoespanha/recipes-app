const GetToLocalStorage = (key) => {
  const stringifiedValue = localStorage.getItem(key);
  if (stringifiedValue === '' || stringifiedValue?.length === 0) return stringifiedValue;
  return JSON.parse(stringifiedValue);
};

export default GetToLocalStorage;
