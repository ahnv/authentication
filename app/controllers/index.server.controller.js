exports.render = function (req, res) {
    res.render('index', {
        title: 'Authentication',
        user: req.user ? req.user.username : '',
        branch: req.user ? req.user.branch : '',
        college: req.user ? req.user.college : ''
    });
};