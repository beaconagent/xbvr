import ky from 'ky';

let configLoaded = false;
let initPromise = null;
let apiInstance = ky.create();

const initializeConfig = async () => {
  if (!configLoaded) {
    const config = await ky.get('/api/config', {
      headers: { 'Accept': 'application/json' },
    }).json();

    apiInstance = apiInstance.extend({ timeout: config.requestsTimeout });
    configLoaded = true;
  }
};

const wrapWithJson = (promise) => {
  const wrapped = promise.then(res => res);
  wrapped.json = () => wrapped.then(res => res.json());
  return wrapped;
};

const api = new Proxy({}, {
  get: (_, prop) => {
    if (typeof apiInstance[prop] === 'function') {
      return (...args) => {
        if (!initPromise) {
          initPromise = initializeConfig();
        }
        const kyPromise = (async () => {
          await initPromise;
          return apiInstance[prop](...args);
        })();
        return wrapWithJson(kyPromise);
      };
    }
    return apiInstance[prop];
  }
});

export default api;
