
// Import modules
var express = require("express");
const bodyParse = require("body-parser")
var moment = require('moment')
let mongo = require("mongodb").MongoClient;
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;
var app = express();

//database uri
const uri = "mongodb+srv://phuong01:12345@fptclus-vezuu.gcp.mongodb.net/unipj?retryWrites=true&w=majority";
let mongoose = require("mongoose");

app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

var server = require("http").createServer(app);
//Connect to database
mongoose.connect(uri)
var db = mongoose.connection;

db.on("connected", function(){
    console.log('connected')
})
db.on('error',function(err){
 console.log('error',err)
})
//Data Schema
var accelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    accel:Number,
    dateCreated: {
       type: Date,
       default: Date.now()
    }
}, {versionKey: false});

var accelModel = mongoose.model('sensordatas', accelSchema);

io.on('connection', function(socket){
    console.log("Spotted connection")
    socket.on('response',function(msg){
       console.log(msg);
    })
    socket.on('error',function(er){
      console.log(er);
    });
    socket.on("sensordata",function(data){
        console.log("Communicating through event named \"sensordatas\"")
        console.log(data);
        var accelData = new accelModel({
          _id: new mongoose.Types.ObjectId(),
          accel: data.accel,
        })
        accelData.save(function(err){
            if (err) throw err;
            console.log("Data added");
        })
        io.emit('datareceive', data)
    });
});

server.listen(port);
