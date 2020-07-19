const amqp = require('amqplib/callback_api');
const order = require('./../order');
const google = require('./../google');
require('dotenv').config();

const byakugan = process.env.BYAKUGAN_URL;

serverChannel = (error, channel) => {
    if (error) {
        throw error;
    }

    let queue = 'order';
    channel.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages in queue %s.", queue);
    channel.consume(queue, function(msg) {
        messageJson = JSON.parse(msg.content.toString());
        google.getLocation(messageJson.address_attributes, (responseBody) => {
            order.update(messageJson.id, responseBody);
        })
    }, {
        noAck: true
    });
}

connection = (error, connection) => {
    if (error) {
        throw error;
    }

    connection.createChannel(serverChannel);
}

message = {}

message.consume = () => {
    setTimeout(() => {
        amqp.connect(byakugan, connection);
    }, 20000);
}

module.exports = message;