var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 1 } } };
mongoose.connect("mongodb://localhost/drawboard", options);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

var DrawBoardSchema = {
    User: User
};

exports.schema = DrawBoardSchema;