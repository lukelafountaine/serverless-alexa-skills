'use strict';

const AlexaApi = require('./AlexaApi');
const BbPromise = require('bluebird');

module.exports = {
  getVendorId() {
    if (this.serverless.service.custom.alexa.vendorId) {
      return BbPromise.resolve(this.serverless.service.custom.alexa.vendorId);
    }
    const alexaApi = new AlexaApi(this.getToken());
    return alexaApi.getVendors().then(function (vendors) {
      if (!vendors || vendors.length < 1) {
        throw new Error('No vendors found in account.');
      }
      if (vendors.length > 1) {
        throw new Error('Multiple vendors available, please specify which vendorId you want to use in the custom.alexa.venderId property.');
      }
      return vendors[0].id;
    });
  },
};
