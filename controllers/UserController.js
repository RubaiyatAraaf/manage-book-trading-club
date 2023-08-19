var UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
    showProfile: function (req, res) {
      var id = req.params.id;
      UserModel.findOne({_id: id}, function (err, User) {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting User.',
            error: err
          });
        }
        if (!User) {
          return res.status(404).json({
            message: 'No such User'
          });
        }
        return res.render('user/profile', {title: "welcome", user : User, loggedUser: req.user});
      });
    },
    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            return res.json(Users);
        });
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(User);
        });
    },

    /**
     * UserController.create()
     */
    create: function (req, res) {
        var User = new UserModel({
        });

        User.save(function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating User',
                    error: err
                });
            }
            return res.status(201).json(User);
        });
    },
    /**
    * Check if meail is already used
    */
    checkLocalMailController: function (req, res, next){
      var email = req.body.email;
      var user = {name: null, img: null};

      UserModel.findOne({$or: [{'local.email': email}, {'facebook.email': email}, {'local.email': email}]}, function(err, User){
        if (err) {
          return res.status(500).json(user);
        }

        user = User ? {name: User.profile.name,img: User.profile.pictureUrl} : null;
        return res.status(200).json(user);

      });
    },
    /**
      * Edit profile, change name and picture and city/state
      */
    editProfile: function(req, res){
      res.render('user/edit', {
                                title: "Edit "+ req.user.profile.name+"'s profile",
                                user: req.user
                              });
    },
    applyProfileEdition: function(req, res){
      var id = req.user._id;
      var name = req.body.name || req.user.profile.name;
      var city = req.body.city || req.user.profile.city;
      var state = req.body.state || req.user.profile.state;
      var pictureUrl = req.body.pictureUrl || req.user.profile.pictureUrl;

      UserModel.findOne({_id: id}, function (err, User) {
        if (err || !User) {
          return res.status(500).json({
              message: 'Error when creating User',
              error: err
          });
        }

        User.profile.name = name;
        User.profile.pictureUrl = pictureUrl;
        User.profile.city = city;
        User.profile.state = state;

        User.save(function(err, User){
          if (err || !User) {
            return res.status(500).json({
                message: 'Error when creating User',
                error: err
            });
          }
          res.redirect('/users/profile/' + User.id);
        });
      });
    },
};
