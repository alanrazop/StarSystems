exports.getUser  = async (request, response, next) => {
    response.render('error.ejs', request.oidc.user);
    console.log(request.oidc.user);
}