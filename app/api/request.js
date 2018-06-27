/**
 * Обёртка на Promise для XMLHttpRequest
 *
 * @param options
 * @returns {Promise<any>}
 */
const request = options => new Promise((resolve, reject) => {
  if (!options || !options.url) reject(new Error('Не указан url для запроса'));

  const xhr = new XMLHttpRequest();
  xhr.open(options.method || 'GET', options.url);

  if (options.headers) {
    Object.keys(options.headers).forEach(key => xhr.setRequestHeader(key, options.headers[key]));
  }

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      resolve(xhr.response);
    } else {
      reject(xhr.statusText);
    }
  };

  xhr.onerror = () => reject(new Error(xhr.statusText));
  xhr.send(options.body);
});

export default request;
