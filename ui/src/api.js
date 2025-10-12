import ky from 'ky';

const api = ky.create({ timeout: 10000 });

export default api;
