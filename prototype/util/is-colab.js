module.exports = (request, response, next) => {
    if(request.session.roles === 3){
        return response.redirect('/home')
    }
    next();
}