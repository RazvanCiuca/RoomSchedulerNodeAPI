var _ = require('lodash');
var url = require('url');

//initialize users
var users = [{
    "id": '1',
    "firstName": "Razvan",
    "lastName": "Ciuca",
    "type": "admin",
    "email": "razvan.ciuca@arnia.ro"
}, {
    "id": '2',
    "firstName": "Bogdan",
    "lastName": "Nechita",
    "type": "standard",
    "email": "bogdan.nechita@arnia.ro"
}];

exports.getUsers = function (req, res) {

    res.format({
        json: function () {
            res.status(200).json(users);
        }
    });
};

exports.createUser = function (req, res) {

    var lastId = users[users.length - 1].id;
    users.push(req.body);
    users[users.length - 1].id = lastId + 1;

    res.format({
        json: function () {
            res.status(200).json(users[users.length - 1]);
        }
    });
};

exports.getUser = function (req, res) {

    var user = _.find(users, { 'id' :req.params.id });

    if(user) {
        res.format({
            json: function () {
                res.status(200).json(user);
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that user does not exist");
            }
        });
    };
};

exports.editUser = function (req, res) {
    var toBeUpdated = _.findIndex(users, { 'id' :req.params.id });

    if(toBeUpdated !== -1) {
        users[toBeUpdated] = req.body;

        res.format({
            json: function () {
                res.status(200).json(users[toBeUpdated]);
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that user does not exist");
            }
        });
    };
}

exports.deleteUser = function (req, res) {
    var toBeDeleted = _.findIndex(users, { 'id' : req.params.id });

    if(toBeDeleted !== -1) {
        users.splice(toBeDeleted,1);

        res.format({
            json: function () {
                res.status(200).json("successfully deleted");
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that user does not exist");
            }
        });
    };
};
