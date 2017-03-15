// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Cache {

    constructor(m) {
      this.m = m;
    }

    List(data, callback, error) {

      return this.m.Request('cache', 'GET', data, callback, error);
    }

    Clear(resource, callback, error) {

      return this.m.Request(`cache/${resource}`, 'DELETE', null, callback, error);
    }

    Purge(data, callback, error) {

      return this.m.Request('cache/all', 'DELETE', null, callback, error);
    }
  }

  // @endif
  
