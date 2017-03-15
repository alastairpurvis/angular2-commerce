// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Promotion extends Abstract {
    static initClass() {
  
      this.prototype.endpoint = 'promotions/cart';
    }

    Search(terms, callback, error) {

      return this.m.Request(this.endpoint+'/search', 'GET', terms, callback, error);
    }
  }
  Promotion.initClass();

  // @endif
  
