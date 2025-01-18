const User = require("../../models/User");

module.exports = {
  async getUserBySocialId(social_id) {
    return User.findOne({
      social_id: social_id,
    });
  },
  async getUserById(id) {
    return User.findById(id);
  },
  async createUser({ social_id, nickname, email }) {
    return User.create({
      social_id,
      nickname,
      email,
      gold: 100, //게임 내 통화
      character: [0,0,0,0,0],
      items:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    });
  },
  async updateUser({ social_id, nickname, email }) {
    return User.updateOne({ social_id }, { nickname, email });
  },
};
