const SetToLocalStorage = (key, value) => {
  if (value === '' || value?.length === 0) {
    localStorage.setItem(key, '[]');
  } else {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }
};

export default SetToLocalStorage;
