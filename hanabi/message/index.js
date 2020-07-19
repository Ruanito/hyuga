const amqp = require('amqplib/callback_api');
const google = require('./../google');

serverChannel = function(error, channel) {
    if (error) {
        throw error;
    }

    let queue = 'order';
    channel.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
        messageJson = JSON.parse(msg.content.toString());
        console.log(" [x] Received %s", msg.content.toString());
        google.getLocation(messageJson.address_attributes, (responseBody) => {
            console.log(responseBody);
        })
    }, {
        noAck: true
    });
}

connection = function(error, connection) {
    if (error) {
        throw error;
    }

    connection.createChannel(serverChannel);
}

message = {}

message.consume = function() {
    setTimeout(() => {
        amqp.connect('amqp://guest:guest@byakugan:5672', connection);
    }, 20000);
}

module.exports = message;