module.exports.render = function (req, res) {
    return res.render('home_view', {
        title: "Home"
    });
}