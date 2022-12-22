const API = require('./api');
const { backboneURL } = require('../../config'); 

const BackboneAPI = new API(backboneURL);

module.exports = {
  async authenticateUserToken  (token) {
    try {
      const userMetadata = await BackboneAPI.makeAuthenticatedRequest(token, {
        method: 'GET',
        url: `/users/auth`,
      });
      return userMetadata;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  },

  authenticateUserRequest (request) {
    try {
      const { authorization } = request.headers;
      if (!authorization?.length) {
        throw Error('Invalid auth header')
      }
      const token = authorization.split(' ')[1];
      return this.authenticateUserToken(token);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
