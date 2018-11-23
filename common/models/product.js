'use strict';
var stripe = require('stripe')('sk_test_B0bVzDvGYbPc0iCKIkhpsnbz');

module.exports = function (Product) {

  // PROCESS PAYMENT FOR STRIPE TOKEN GENERATED ON FRONT END CHECKOUT
  Product.processPayment = function (data, cb) {
    if (data.amount && data.name && data.email && data.source) {
      stripe.customers.create({
        email: data.email,
        source: data.source
      })
        .then(customer =>
          stripe.charges.create({
            amount: data.amount,
            description: "Payment made against products",
            currency: "usd",
            receipt_email: data.email,
            customer: customer.id
          }))
        .then(charge => {
          // SEND RESPOND BACK TO CLIENT
          var response = {
            statusCode: 200,
            code: 'OK',
            message: 'PAYMENT_SUCCESS'
          };
          cb(null, response);
        });
    } else if (!data.amount) {
      var error = {
        statusCode: 402,
        code: 'AMOUNT_REQUIRED',
        message: 'Amount not provided by client'
      };
      cb(null, error);
    } else if (!data.email) {
      var error = {
        statusCode: 402,
        code: 'EMAIL_REQUIRED',
        message: 'Email id not provided by client'
      };
      cb(null, error);
    } else if (!data.source) {
      var error = {
        statusCode: 402,
        code: 'TOKEN_REQUIRED',
        message: 'Token not provided by client'
      };
      cb(null, error);
    }
  }


  Product.remoteMethod('processPayment', {
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'response', type: 'object', root: true, http: { source: 'body' } },
  });

};
