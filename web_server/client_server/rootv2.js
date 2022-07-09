const express = require('express')
const app = express()
var fileSystem = require("fs")
const path = require('path')
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const get_item = require('./utils/get_item');
const get_latest_item = require('./utils/get_latest_item');
const add_item = require('./utils/ddb_add_item');
const  server  = require('http').createServer(app);
const io = require('socket.io')(server) 
app.use(express.static('public'));
app.use(express.json());


let position =  [ {  X_POSITION : {N: "Fetching"
}},
{Y_POSITION : {N: "Fetching"}
}
]
let battery = 'Fetching'


app.set('view engine','ejs');


app.get('/' ,(req, res) => {
    res.render(path.join(__dirname, '/public/home.ejs'))
})

app.post('/' , (req, res) => {
    const input_params = req.body
    res.json(input_params)
    add_item(input_params)
    position = input_params.Item
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})



io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id)

    async function EmitBattery() {
        socket.emit('battery_message', battery )
    
        }
    setInterval(EmitBattery, 5000);
    
    EmitBattery();

    async function EmitPosition() { 
        socket.emit('position_message', position )
        }
    setInterval(EmitPosition, 2500);
        
     EmitPosition();
    

    }

)
