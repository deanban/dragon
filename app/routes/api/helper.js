const Session = require('../../account/session');
const AccountTable = require('../../account/table');

const setSession = ({ username, res }) => {
    return new Promise((resolve, reject) => {
        const session = new Session({ username });
        const sessionStr = session.toString();

        AccountTable.updateSessionId({ sessionId: session.id, username })
            .then(() => {
                //set a cookie
                res.cookie('sessionStr', sessionStr, {
                    expire: Date.now() + 3600000,
                    httpOnly: true
                    // secure: true //will only be sent over https
                });
                resolve({ message: 'Session created' });
            })
            .catch(err => {
                // console.log(err);
                reject(err);
            });
    });
};

module.exports = { setSession };
