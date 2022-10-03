const { auth, requiresAuth, claimEquals,claimIncludes,claimCheck } = require('express-openid-connect');

module.exports = class User {
    constructor(u_nickname, u_name, u_picture, u_updated_at, u_email, u_email_verified, u_sub, u_sid) {
        this.nickname = u_nickname,
        this.name = u_name,
        this.picture = u_picture,
        this.updated_at = u_updated_at,
        this.email = u_email,
        this.email_verified = u_email_verified
        this.sub = u_sub,
        this.sid = u_sid
    }

    static fetchUserData() {
        return request.oidc.user;
    }
}
