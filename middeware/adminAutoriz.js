function adminAut(req, res, next) {
    if (req.session.usuario != undefined) {
        next();
    } else {
        res.redirect("/")
    }
}

module.exports = adminAut;