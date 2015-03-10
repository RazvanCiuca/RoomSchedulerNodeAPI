var _ = require('lodash');
var url = require('url');

//initialize users
var meetings = [{
    "id": 1,
    "date": "11.05.25",
    "startTime": "11:00",
    "endTime": "12",
    "roomId": "1",
    "creator": "Razvan"
}];

exports.getMeetings = function (req, res) {

    res.format({
        json: function () {
            res.status(200).json(meetings);
        }
    });
};

exports.createMeeting = function (req, res) {

    var lastId = meetings[meetings.length - 1].id;
    meetings.push(req.body);
    meetings[meetings.length - 1].id = lastId + 1;

    res.format({
        json: function () {
            res.status(200).json(meetings[meetings.length - 1]);
        }
    });
};

exports.getMeeting = function (req, res) {

    var meeting = _.find(meetings, { 'id' : parseInt(req.params.id) });

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
    var toBeUpdated = _.findIndex(meetings, { 'id' : parseInt(req.params.id) });

    if(toBeUpdated !== -1) {
        meetings[toBeUpdated] = req.body;

        res.format({
            json: function () {
                res.status(200).json(meetings[toBeUpdated]);
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
    var toBeDeleted = _.findIndex(meetings, { 'id' : parseInt(req.params.id) });

    if(toBeDeleted !== -1) {
        meetings.splice(toBeDeleted,1);

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
