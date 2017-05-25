const serviceApi = (url, options = {}) => {
  return fetch(url, {
    ...options,
    mode: 'cors'
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    return Promise.reject(error);
  });
}

export {serviceApi};
