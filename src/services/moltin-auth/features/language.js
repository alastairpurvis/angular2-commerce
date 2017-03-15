// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Language {

    constructor(m) {
      this.m = m;
    }

    Set(code, callback, error) {

      this.m.Storage.set('mlanguage', code);
      this.m.options.language = code;

      if (typeof callback === 'function') {
        return callback(code);
      }
    }
  }
