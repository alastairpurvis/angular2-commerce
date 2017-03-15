// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Checkout {

    constructor(m) {
      this.m = m;
    }

    Payment(method, order, data, callback, error) {

      return this.m.Request(`checkout/payment/${method}/${order}`, 'POST', data, callback, error);
    }
  }
