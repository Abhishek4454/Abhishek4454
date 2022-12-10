const User = require('../models/user');
module.exports.profile = function (req, res) {
     res.end('<h1>User Profile .. </h1>')
}

//render sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title:"Codeil|user_sign_in"
    })
}

//render sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeil|user_sign_up"
    })
}

//get the sign up data
/*module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in find user during signUp'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in creating user while signUp'); return; }

                return req.redirect('user/user-signIn');
            });
        } else {
            return req.redirect('back');
        }
    });*/
// get the sign up data
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

     User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/user/user-signIn');
            })
        } else {
            return res.redirect('back');
        }

    });

}




