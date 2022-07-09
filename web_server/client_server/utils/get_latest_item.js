var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});



const get_latest_rover = async() => {
    
	var first_item_params = {
		TableName: 'POSITION_HISTORY',
		ExpressionAttributeValues: {
			':OBJECT_TYPE': {S: 'ROVER'},
		  },
		KeyConditionExpression: 'OBJECT_TYPE = :OBJECT_TYPE',  
		ProjectionExpression: 'X_POSITION , Y_POSITION',
		ScanIndexForward: false,
		Limit : 1
	};

	return await ddb.query(first_item_params).promise();
}

const get_latest_battery = async() => {
    
	var first_item_params = {
		TableName: 'BATTERY_LEVEL',
		ExpressionAttributeValues: {
			':BATTERY_TYPE': {S: 'Li-ion_BATTERY'},
		  },
		KeyConditionExpression: 'BATTERY_TYPE = :BATTERY_TYPE',  
		ProjectionExpression: 'BATTERY_PERCENTAGE',
		ScanIndexForward: false,
		Limit : 1
	};

	return await ddb.query(first_item_params).promise();
}



module.exports = {get_latest_rover, get_latest_battery}