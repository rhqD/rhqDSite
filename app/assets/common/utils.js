const serviceApi = (urls, options = {}) => {
  const isBuild = process.env.NODE_ENV === 'build';
  let url;
  if (_.isArray(urls)){
    url = isBuild ? urls[1] : urls[0];
  } else {
    url = urls;
  }
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
