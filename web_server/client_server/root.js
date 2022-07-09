const express = require('express')
const app = express()
var fileSystem = require("fs")
const path = require('path')
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const get_item = require('./utils/get_item');
const {get_latest_rover, get_latest_battery} = require('./utils/get_latest_item');
const  server  = require('http').createServer(app);
const io = require('socket.io')(server) 
app.use(express.static('public'));


app.set('views', __dirname + '/views');
app.set('view engine','ejs');


app.get('/' ,(req, res) => {
    res.render('home')
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})



io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id)

    async function EmitBattery() {
        const battery = (await get_latest_battery()).Items[0].BATTERY_PERCENTAGE.N;
        socket.emit('battery_message', battery )
    
        }
    setInterval(EmitBattery, 5000);
    
    EmitBattery();

    async function EmitPosition() {
        const position = (await get_latest_rover()).Items[0];
        
        socket.emit('position_message', position)
        }
    setInterval(EmitPosition, 1250);
        
     EmitPosition();
    

    }

)






