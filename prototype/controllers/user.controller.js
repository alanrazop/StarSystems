const User = require("../models/user.model");

exports.getUserProfile = async (request, response, next) => {
    const user_data = new User(request.oidc.user);
    response.render('error.ejs', user_data);
}

exports.getUserInfo = async (request, response, next) => {
    const user_data = new User(request.oidc.user);
    return user_data;
}