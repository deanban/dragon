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
        // const hash = Session.hash(accountData);
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
        console.log(sessionHash.split('').length);
        const accountData = Session.accountData({ username, id });

        return bcrypt.compareSync(accountData, sessionHash);
    }

    // Simple but unreliable function to create string hash by Sergey.Shuchkin [t] gmail.com
    // alert( strhash('http://www.w3schools.com/js/default.asp') ); // 6mn6tf7st333r2q4o134o58888888888
    static hash(str) {
        if (str.length % 32 > 0) str += Array(33 - (str.length % 32)).join('z');
        let hash = '',
            bytes = [],
            i = 0,
            j = 0,
            k = 0,
            a = 0,
            dict = [
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9'
            ];
        for (i = 0; i < str.length; i++) {
            const ch = str.charCodeAt(i);
            bytes[j++] = ch < 127 ? ch & 0xff : 127;
        }
        var chunk_len = Math.ceil(bytes.length / 32);
        for (i = 0; i < bytes.length; i++) {
            j += bytes[i];
            k++;
            if (k == chunk_len || i == bytes.length - 1) {
                a = Math.floor(j / k);
                if (a < 32) hash += '0';
                else if (a > 126) hash += 'z';
                else hash += dict[Math.floor((a - 32) / 2.76)];
                j = k = 0;
            }
        }
        return hash;
    }
}

// const dean = new Session({ username: 'dean', id: 123456 });
// const deanStr = dean.toString();
// const fakeStr = `adimin_${deanStr}`;

// console.log(Session.parse(deanStr));
// console.log(Session.verify(deanStr));
// console.log(Session.verify(fakeStr));

module.exports = Session;
