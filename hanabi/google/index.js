const fetch = require('node-fetch');
require('dotenv').config()

const url = 'https://maps.googleapis.com/maps/api/geocode/json';
const key = process.env.GOOGLE_KEY;

google = {}

google.getLocation = (address, callback) => {
    console.log(address);
    const params = url + '?address=' + address.street + '+' + address.city + '+' + address.uf + '+' + address.neighborhood + '&key=' + key;
    const requestUrl = params;
    console.log(requestUrl);
    fetch(requestUrl)
        .then(res => res.text())
        .then(body => callback(body))
}

module.exports = google;