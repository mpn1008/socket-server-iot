var express = require("express");
let mongo = require("mongodb").MongoClient;
var app = express();
const uri = "mongodb+srv://phuong01:12345@fptclus-vezuu.gcp.mongodb.net/test?retryWrites=true&w=majority";
const bodyParse = require("body-parser")

app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;
users = [321,232,121,23321,2121];
connections = []
io.on('connection', function(socket){
    console.log("Spotted connection")
    socket.emit('important message', users)
    socket.on('response',function(msg){
        const client = new mongo(uri, { useNewUrlParser: true });
        client.connect(err => {
        const collection = client.db("unipj").collection("accels");
        console.log('mongoDB connected'); 
        var obj = JSON.parse("{\"axisx\":"+String(msg)+"}")
        collection.insertOne(obj, function(err, res) {
            if (err) throw err;
          });
        client.close();
        });
        console.log(msg);
    })
  });
server.listen(port);


/*var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({port: 3000})

  wss.on('connection', function (ws) {
    console.log("Connected")
    ws.on('open', function open() {
        ws.send('something');
    });
      
    ws.on('message', function incoming(data) {
        console.log(data);
    });
    const array = new Float32Array(5);
 
    for (var i = 0; i < array.length; ++i) {
    array[i] = i / 2;
    }
    ws.send(array)
  
})

  /*setInterval(
    () => ws.send(`${new Date()}`),
    1000
  )
*/

