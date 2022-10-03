const User = require("../models/user.model");

exports.getUser  = async (request, response, next) => {
    const user_data = request.oidc.user;
    const user_session = user_data.sid;
    response.render('error.ejs', user_data);
    console.log(user_data)
    console.log(user_session)
}