// src/api/loaderHandler.js
let setLoaderVisible;

export const loaderHandler = {
  init: (setVisible) => {
    setLoaderVisible = setVisible;
  },
  show: () => {
    if (setLoaderVisible) setLoaderVisible(true);
  },
  hide: () => {
    if (setLoaderVisible) setLoaderVisible(false);
  }
};