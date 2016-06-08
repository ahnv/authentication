exports.render = function (req, res) {
    res.render('index', {
        title: 'Authentication',
        user: req.user ? req.user.username : ''
    });
};