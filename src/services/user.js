const API = require('./api');
const { backboneURL } = require('../../config'); 

const BackboneAPI = new API(backboneURL);

module.exports = {
  async authenticateUser (token) {
    try {
      const userMetadata = await BackboneAPI.makeAuthenticatedRequest(token, {
        method: 'GET',
        url: `/users/me`,
      });
      return userMetadata;
    } catch (error) {
      logger.error(error);
    }
  }
}
