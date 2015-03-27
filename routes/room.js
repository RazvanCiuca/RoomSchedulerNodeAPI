var _ = require('lodash');
var m = require('./meeting.js');
var url = require('url');

//initialize rooms
var rooms = [{
    "id": 1,
    "name": "The Big Room",
    "location": "The East Wing",
    "maxOccupancy": "128",
    "hasProjector": true,
    "hasVideoEquipment": true,
    "hasFlipCharts": true

}, {
    "id": 2,
    "name": "The Small Room",
    "location": "The East Wing",
    "maxOccupancy": "16",
    "hasProjector": false,
    "hasVideoEquipment": true,
    "hasFlipCharts": true
}];

exports.test = function(req, res) {
    res.format({
        json: function () {
            res.status(200).json(req.query);
        }
    });
};

exports.search = function(req, res) {
    //console.log(req.query);
    var conditions = {
        date: req.query.date,
        maxOccupancy: (req.query.maxOccupancy || 0),
        hasProjector: req.query.hasProjector,
        hasVideoEquipment: req.query.hasVideoEquipment,
        hasFlipCharts: req.query.hasFlipCharts,
        roomId: req.query.roomId,
        startAfter: (req.query.startAfter || '08:00'),
        endBefore: (req.query.endBefore || '23:59')
    };

    var potentialRooms = _.filter(rooms, function(room) {

        return (
        (room.hasProjector == 'true' || (conditions.hasProjector == 'false')) &&
        (room.hasFlipCharts == 'true' || (conditions.hasFlipCharts == 'false')) &&
        (room.hasVideoEquipment == 'true'|| (conditions.hasVideoEquipment == 'false')) &&
        (conditions.roomId == 0 || conditions.roomId == room.id) &&
        parseInt(room.maxOccupancy) >= parseInt(conditions.maxOccupancy)
        );
    });

    var meetingsForEachRoom = [];



    _.forEach(potentialRooms, function(room) {
        var meetingsInRoom = _.filter(m.meetings, function(meeting){
            return (
            meeting.date == conditions.date &&
            meeting.date == conditions.date &&
            room.id == meeting.roomId &&
            meeting.endTime > conditions.startAfter &&
            meeting.startTime < conditions.endBefore
            );
        });
        //sort meetingsInRoom
        meetingsInRoom = _.sortByAll(meetingsInRoom, 'startTime');

        room.meetings = meetingsInRoom;
        meetingsForEachRoom.push(room);
    });



    res.format({
        json: function () {
            res.status(200).json(meetingsForEachRoom);
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
    //console.log(req.body);
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
