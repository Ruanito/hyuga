const fetch = require('node-fetch');

let order = {};

order.update = (id, orderData) => {
    body = {
        address_attributes: orderData
    }

    fetch(`http://neji:3000/orders/${id}`, {
        method: 'PUT',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .catch(err => console.error(err));
}

module.exports = order;