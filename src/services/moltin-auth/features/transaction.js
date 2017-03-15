// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Transaction {

    constructor(m) {
      this.m = m;
    }

    Get(slug, callback, error) {

      return this.m.Request(`transactions/${slug}`, 'GET', null, callback, error);
    }

    Listing(terms, callback, error) {

      return this.m.Request('transactions', 'GET', terms, callback, error);
    }
  }
    
  // @endif
  
