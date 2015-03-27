var express = require('express');
var app = express();
var user = require('./routes/user');
var room = require('./routes/room');
var meeting = require('./routes/meeting');
var bodyParser = require('body-parser');



app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
    next();
});
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
    response.send('Hello World!')
});
//USERS
app.get('/api/users', user.getUsers); //get all users
app.get('/api/users/:id([0-9]+)', user.getUser); //get a specific user
app.get('/api/user/:username', user.getUserByUsername); //get a specific user
app.post('/api/users', user.createUser); //create a user
app.put('/api/users/:id', user.editUser); //edit a user
app.delete('/api/users/:id', user.deleteUser); //delete a user
app.get('/api/users/:id/meetings', meeting.getMeetingsOfUser);

//ROOMS
app.get('/api/rooms', room.getRooms); //get all rooms
app.get('/api/rooms/:id([0-9]+)', room.getRoom); //get a specific room
app.get('/api/rooms/search', room.search); //search for a room
app.post('/api/rooms', room.createRoom); //create a room
app.put('/api/rooms/:id', room.editRoom); //edit a room
app.delete('/api/rooms/:id', room.deleteRoom); //delete a room
//MEETINGS
app.get('/api/meetings', meeting.getMeetings); //get all meetings
app.get('/api/meetings/:id', meeting.getMeeting); //get a specific meeting
app.post('/api/meetings/:id([0-9]+)/:name', meeting.addOrganizer);
app.post('/api/meetings', meeting.createMeeting); //create a meeting
app.put('/api/meetings/:id', meeting.editMeeting); //edit a meeting
app.delete('/api/meetings/:id([0-9]+)/:name', meeting.deleteOrganizer); //delete a meeting

app.delete('/api/meetings/:id([0-9]+)', meeting.deleteMeeting); //delete a meeting


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});
