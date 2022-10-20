module.exports = (request, response, next) => {
    if(request.session.roles !== 1){
        return response.redirect('/home')
    }
    next();
}