module.exports = {
    'GET /': async (ctx, next) => {
        let user = ctx.state.user;
        if (user) {
            ctx.render('index.html', {
                user: user
            });
        } else {
            ctx.response.redirect('/signin');
        }
    }
};