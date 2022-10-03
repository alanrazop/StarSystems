const { auth, requiresAuth, claimEquals,claimIncludes,claimCheck } = require('express-openid-connect');

module.exports = class User {
    constructor(thing) {
        this.nickname = thing.nickname,
        this.name = thing.name,
        this.picture = thing.picture,
        this.updated_at = thing.updated_at,
        this.email = thing.email,
        this.email_verified = thing.email_verified
        this.sub = thing.sub,
        this.sid = thing.sid
    }

    static fetchSession() {
        return this.sid;
    }
}
