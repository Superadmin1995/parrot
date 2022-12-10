const axios = require('axios');
const { merge } = require('lodash'); 

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async makeRequest(request) {
    request.baseURL = this.baseURL
    const response = await axios.request(request);
    return response.data;
  }

  makeAuthenticatedRequest(token, request) {
    if (!token) {
      throw new Error('makeAuthenticatedRequest called with empty token');
    }
    request.headers = merge(request.headers, { authorization: `Bearer ${token}` });
    return this.makeRequest(request);
  }
}

module.exports = API;
