const BaseService = require('./base');
const InviteModel = require('../models/invite');
const  nanoid = require('nanoid');
const moment = require('moment');
const { INVITE_TYPE } = require('../utils/constants');

class InviteService extends BaseService {
  constructor () {
    super(InviteModel);
  }

  async createCircle (createdBy) {
    const inviteMeta = {
      type: INVITE_TYPE.CREATE_CIRCLE,
      code: nanoid(10),
      expiryDate: moment().add(30, 'days'),
      createdBy
    };
    const invite = await this.post(inviteMeta);
    invite.url = `https://app.halogram.in/invite/${invite.code}`;
    return invite;
  }
}

module.exports = new InviteService();
