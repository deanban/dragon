const Session = require('../../account/session');
const AccountTable = require('../../account/table');

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionStr;

        if (sessionId) {
            sessionStr = Session.sessionString({ username, id: sessionId });
            console.log('sessionId');
            setSessionCookie({ sessionStr, res });
            resolve({ message: 'Session restored' });
        } else {
            session = new Session({ username });
            sessionStr = session.toString();

            AccountTable.updateSessionId({ sessionId: session.id, username })
                .then(() => {
                    console.log('No sessionId');
                    setSessionCookie({ sessionStr, res });
                    resolve({ message: 'Session created' });
                })
                .catch(err => {
                    // console.log(err);
                    reject(err);
                });
        }
    });
};

const setSessionCookie = ({ sessionStr, res }) => {
    res.cookie('sessionStr', sessionStr, {
        expire: 600000 + Date.now()
        // httpOnly: true
        // secure: true //will only be sent over https
    });
};

const authenticatedAccount = ({ sessionStr }) => {
    return new Promise((resolve, reject) => {
        if (!sessionStr || !Session.verify(sessionStr)) {
            const error = new Error('Invalid Session');
            error.statusCode = 400;
            return reject(error);
        } else {
            const { username, id } = Session.parse(sessionStr);

            AccountTable.getAccount({ username })
                .then(({ account }) => {
                    const authenticated = account.sessionId === id;
                    resolve({ account, authenticated, username });
                })
                .catch(err => reject(err));
        }
    });
};

module.exports = { setSession, authenticatedAccount };
