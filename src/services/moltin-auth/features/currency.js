// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Currency extends Abstract {
    static initClass() {
  
      this.prototype.endpoint = 'currencies';
    }

    Set(code, callback, error) {

      this.m.Storage.set('mcurrency', code);
      this.m.options.currency = code;

      if (typeof callback === 'function') {
        return callback(code);
      }
    }
  }
  Currency.initClass();
