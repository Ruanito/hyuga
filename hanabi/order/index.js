const fetch = require('node-fetch');
require('dotenv').config();

let order = {};
const url = process.env.NEJI_URL;

order.update = (id, orderData) => {
    body = {
        address_attributes: orderData
    }

    fetch(`${url}/orders/${id}`, {
        method: 'PUT',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .catch(err => console.error(err));
}

module.exports = order;