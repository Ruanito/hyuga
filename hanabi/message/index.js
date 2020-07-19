const amqp = require('amqplib/callback_api');
const fetch = require('node-fetch');
const google = require('./../google');

updateOrder = (id, order) => {
    body = {
        address_attributes: order
    }

    console.log(id, body);
    fetch(`http://neji:3000/orders/${id}`, {
        method: 'PUT',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.text())
    .then(body => console.log(body));
}

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
            updateOrder(messageJson.id, responseBody);
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
        amqp.connect('amqp://guest:guest@byakugan:5672', connection);
    }, 20000);
}

module.exports = message;