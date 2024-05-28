function Auth(req, res, next) {
    if (req.session.user != undefined) {
        next();
    } else {
        req.flash('danger', 'Você precisa estar logado para acessar esta página.');
        res.redirect('/login');
    }
}

export default Auth;
