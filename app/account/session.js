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

    static parse(sessionString) {
        const sessionData = sessionString.split('|');
        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        };
    }

    static verify(sessionString) {
        const { username, id, sessionHash } = Session.parse(sessionString);

        const accountData = Session.accountData({ username, id });

        return bcrypt.compareSync(accountData, sessionHash);
    }
}

// const dean = new Session({ username: 'dean', id: 123456 });
// const deanStr = dean.toString();
// const fakeStr = `adimin_${deanStr}`;

// console.log(Session.parse(deanStr));
// console.log(Session.verify(deanStr));
// console.log(Session.verify(fakeStr));

module.exports = Session;
