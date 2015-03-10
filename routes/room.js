var _ = require('lodash');
var url = require('url');

//initialize rooms
var rooms = [{
    "id": 1,
    "name": "The Big Room",
    "location": "The East Wing",
    "maxOccupancy": "128",
    "hasProjector": "true",
    "hasVideoEquipment": "true"

}, {
    "id": 2,
    "name": "The Small Room",
    "location": "The East Wing",
    "maxOccupancy": "16",
    "hasProjector": "false",
    "hasVideoEquipment": "true"
}];

exports.search = function (req, res) {
    var potentialRooms = _.where(rooms, {
        "hasProjector": req.query.hasProjector,
        "hasVideoEquipment": req.query.hasVideoEquipment
    });

    res.format({
        json: function () {
            res.status(200).json(potentialRooms);
        }
    });

};

exports.getRooms = function (req, res) {

    res.format({
        json: function () {
            res.status(200).json(rooms);
        }
    });
};

exports.createRoom = function (req, res) {

    var lastId = rooms[rooms.length - 1].id;
    rooms.push(req.body);
    rooms[rooms.length - 1].id = lastId + 1;

    res.format({
        json: function () {
            res.status(200).json(rooms[rooms.length - 1]);
        }
    });
};

exports.getRoom = function (req, res) {

    var room = _.find(rooms, { 'id' : parseInt(req.params.id) });

    if(room) {
        res.format({
            json: function () {
                res.status(200).json(room);
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that room does not exist");
            }
        });
    };
};

exports.editRoom = function (req, res) {

    var toBeUpdated = _.findIndex(rooms, { 'id' : parseInt(req.params.id) });

    if(toBeUpdated !== -1) {
        rooms[toBeUpdated] = req.body;

        res.format({
            json: function () {
                res.status(200).json(rooms[toBeUpdated]);
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that room does not exist");
            }
        });
    };
}

exports.deleteRoom = function (req, res) {
    var toBeDeleted = _.findIndex(rooms, { 'id' : parseInt(req.params.id) });

    if(toBeDeleted !== -1) {
        rooms.splice(toBeDeleted,1);

        res.format({
            json: function () {
                res.status(200).json("successfully deleted");
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that room does not exist");
            }
        });
    };
};
