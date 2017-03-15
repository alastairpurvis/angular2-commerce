// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Payment {

    constructor(m) {
      this.m = m;
    }

    Authorize(order, data) {

      return this.Process('authorize', order, data);
    }

    CompleteAuthorize(order, data) {

      return this.Process('complete_authorize', order, data);
    }

    Capture(order, data) {

      return this.Process('capture', order, data);
    }

    Purchase(order, data) {

      return this.Process('purchase', order, data);
    }

    CompletePurchase(order, data) {

      return this.Process('complete_purchase', order, data);
    }

    Refund(order, data) {

      return this.Process('refund', order, data);
    }

    Void(order, data) {

      return this.Process('void', order, data);
    }

    Process(method, order, data, callback, error) {

      return this.m.Request(`checkout/payment/${method}/${order}`, 'POST', data, callback, error);
    }
  }

  // @endif
  
