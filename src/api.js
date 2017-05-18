import { getBaseUrl } from './helpers/urlHelpers.js';
import superagent from 'superagent';

const api = {
  getData(host, id) {
    const apiUrl = `${getBaseUrl(host).fabUrl}/api/`;
    const headers = { 'api-version': '1.1' };
    return superagent
      .get(apiUrl)
      .set(headers)
      .query({
        id,
      });
  },
};

export default api;
