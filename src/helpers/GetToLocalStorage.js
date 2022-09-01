const GetToLocalStorage = (key) => {
  const stringifiedValue = localStorage.getItem(key);
  if (stringifiedValue === '[]') return [];
  return JSON.parse(stringifiedValue);
};

export default GetToLocalStorage;
