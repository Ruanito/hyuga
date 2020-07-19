let amqp = require('amqplib/callback_api');

serverChannel = function(error, channel) {
    if (error) {
        throw error;
    }

    let queue = 'order';
    channel.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
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

message.receive = function() {
    amqp.connect('amqp://guest:guest@byakugan:5672', connection);
}

module.exports = message;