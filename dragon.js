const dragonObjDefaults = { nickname: 'unnamed' };

Object.defineProperty(dragonObjDefaults, 'birthday', {
  get: () => new Date().toLocaleString()
});

class Dragon {
  constructor({ birthday, nickname } = {}) {
    this.birthday = birthday || dragonObjDefaults.birthday;
    this.nickname = nickname || dragonObjDefaults.nickname;
  }
}

module.exports = Dragon;
