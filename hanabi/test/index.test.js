const expect = require('chai').expect;
const nock = require('nock');

const google = require('./../google');

require('dotenv').config();

const address = {
    street: 'street',
    city: 'city',
    uf: 'uf',
    neighborhood: 'neighborhood'
}

const urlPath = '/maps/api/geocode/json?address=street+city+uf+neighborhood&key=' + process.env.GOOGLE_KEY;

const responseOk = JSON.stringify({
    status: 'OK',
    results: [
        {
            geometry: {
                location: {
                    lat: 100,
                    lng: 150,
                }
            }
        }
    ]
});

describe('Test when google response not Ok', () => {
    beforeEach(() => {
        nock(process.env.GOOGLE_API_URL)
            .get(urlPath)
            .reply(200, {});
    });

    it('Should assert response to equal null', () => {
        google.getLocation(address, (response) => {
            expect(response.lat).to.equal(null)
            expect(response.lng).to.equal(null)
        })
    });
}); 

describe('Test when google response Ok', () => {
    beforeEach(() => {
        nock(process.env.GOOGLE_API_URL)
            .get(urlPath)
            .reply(200, responseOk);
    });

    it('Should assert response to equal lat and lng', () => {
        google.getLocation(address, (response) => {
            expect(response.lat).to.equal(100)
            expect(response.lng).to.equal(150)
        })
    });
}); 