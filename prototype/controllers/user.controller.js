const User = require("../models/user.model");

exports.getUser  = async (request, response, next) => {
    const user_data = new User(request.oidc.user);
    await response.render('error.ejs', user_data);
    console.log(user_data)
}