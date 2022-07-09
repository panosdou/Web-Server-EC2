const express = require('express')
const app = express()
var fileSystem = require("fs")
const path = require('path')
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const add_item = require('./utils/ddb_add_item');
app.use(express.json());

app.post('/' , (req, res) => {
    const input_params = req.body
    res.json(input_params)
    add_item(input_params)
})


app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
})
