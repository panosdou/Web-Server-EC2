const express = require('express')
const app = express()
var fileSystem = require("fs")
const path = require('path')
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
let get_item = require('./utils/get_item');
const  server  = require('http').createServer(app);
const io = require('socket.io')(server) 

//const EmitBattery = require('./utils/socket_io')





app.set('view engine','ejs');


app.post('/' ,(req, res) => {
    res.sendFile(path.join(__dirname, '/html/home_page.html'))
})

app.get('/Battery' ,(req, res) => {

    res.render(path.join(__dirname, '/html/battery_level.ejs'))
    //const battery = await get_item(params);
    //res.json(battery)


})
app.get('/Position' ,(req, res) => {

    res.sendFile(path.join(__dirname, '/html/rover_position.html'))
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id)

    let count = 0
    async function EmitBattery() {
    const battery = (await get_item(params)).Item.CUSTOMER_NAME.S;
    socket.emit('message', battery )
    console.log(battery)
    count = count + 1
    }
    setInterval(EmitBattery, 5000);
    
    EmitBattery(count);

    }

)






