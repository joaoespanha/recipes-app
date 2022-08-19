const SetToLocalStorage = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

export default SetToLocalStorage;
