const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

class Session {
    constructor({ username }) {
        this.username = username;
        this.id = uuid();
    }

    toString() {
        const { username, id } = this;
        return Session.sessionString({ username, id });
    }

    static accountData({ username, id }) {
        return `${username}|${id}`;
    }

    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id });
        const hash = bcrypt.hashSync(accountData, 10);
        return `${accountData}|${hash}`;
    }
}
// console.log(Session.sessionString({ username: 'dean', id: '12455' }));

module.exports = Session;
