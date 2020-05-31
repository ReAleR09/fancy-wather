const get = (key: string):any => localStorage.getItem(key);

const set = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

const LocalStorage = {
  get,
  set,
};

export default LocalStorage;
