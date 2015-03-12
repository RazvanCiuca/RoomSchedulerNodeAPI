var _ = require('lodash');
var url = require('url');

//initialize users
exports.meetings = [{
    "id": 1,
    "date": "12.03.2015",
    "startTime": "08:00",
    "endTime": "09:00",
    "roomId": "1",
    "roomName": "The Big Room",
    "creator": "1",
    "creatorName": "Razvan"
},{
    "id": 2,
    "date": "12.03.2015",
    "startTime": "13:00",
    "endTime": "14:00",
    "roomId": "1",
    "roomName": "The Big Room",
    "creator": "1",
    "creatorName": "Razvan"
},{
    "id": 3,
    "date": "12.03.2015",
    "startTime": "16:00",
    "endTime": "18:30",
    "roomId": "1",
    "roomName": "The Big Room",
    "creator": "1",
    "creatorName": "Razvan"
},{
    "id": 4,
    "date": "12.03.2015",
    "startTime": "11:00",
    "endTime": "12:00",
    "roomId": "2",
    "roomName": "The Small Room",
    "creator": "2",
    "creatorName": "Bogdan"
}];

exports.getMeetingsOfUser = function (req, res) {
    var userMeetings = _.where(exports.meetings, {"creator" : req.params.id});

    res.format({
        json: function () {
            res.status(200).json(userMeetings);
        }
    });
};

exports.getMeetings = function (req, res) {

    res.format({
        json: function () {
            res.status(200).json(exports.meetings);
        }
    });
};

exports.createMeeting = function (req, res) {

    var lastId = exports.meetings[exports.meetings.length - 1].id;
    exports.meetings.push(req.body);
    exports.meetings[exports.meetings.length - 1].id = lastId + 1;

    res.format({
        json: function () {
            res.status(200).json(exports.meetings[exports.meetings.length - 1]);
        }
    });
};

exports.getMeeting = function (req, res) {

    var meeting = _.find(exports.meetings, { 'id' : parseInt(req.params.id) });

    if(meeting) {
        res.format({
            json: function () {
                res.status(200).json(meeting);
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that meeting does not exist");
            }
        });
    };
};

exports.editMeeting = function (req, res) {
    var toBeUpdated = _.findIndex(exports.meetings, { 'id' : parseInt(req.params.id) });

    if(toBeUpdated !== -1) {
        meetings[toBeUpdated] = req.body;

        res.format({
            json: function () {
                res.status(200).json(exports.meetings[toBeUpdated]);
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that meeting does not exist");
            }
        });
    };
}

exports.deleteMeeting = function (req, res) {
    var toBeDeleted = _.findIndex(exports.meetings, { 'id' : parseInt(req.params.id) });

    if(toBeDeleted !== -1) {
        exports.meetings.splice(toBeDeleted,1);

        res.format({
            json: function () {
                res.status(200).json("successfully deleted");
            }
        });
    } else {
        res.format({
            json: function () {
                res.status(404).json("that meeting does not exist");
            }
        });
    };
};
