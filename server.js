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
connections = []
io.on('connection', function(socket){
    console.log("Spotted connection")
    socket.on('response',function(msg){
      //  console.log(msg);
    })
    socket.on('error',function(er){
      console.log(er);
    });
    socket.on("sensordata",function(data){
        console.log("Communicating through event named \"sensordata\"")
        console.log(data);
        // Save data to database 
       /*const client = new mongo(uri, { useNewUrlParser: true });
        client.connect(err => {
        console.log("Saved to the mongoDB");
        const collection = client.db("unipj").collection("sensordata"); 
        collection.insertOne(data, function(err, res) {
            if (err) throw err;
          });
        client.close();
        })*/
        io.emit('datareceive', data)
    });
    
});

server.listen(port);


/*

  /*setInterval(
    () => ws.send(`${new Date()}`),
    1000
  )
*/

