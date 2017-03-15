// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Abstract {
    static initClass() {
  
      // @if TARGET=='nodejs'
      
  
      // @endif
      
    }

    constructor(m) {
      this.m = m;
    }

    Get(id, callback, error) {

      return this.m.Request(this.endpoint+'/'+id, 'GET', null, callback, error);
    }

    Find(terms, callback, error) {

      return this.m.Request(this.endpoint, 'GET', terms, callback, error);
    }

    List(terms, callback, error) {

      return this.m.Request(this.endpoint, 'GET', terms, callback, error);
    }

    Fields(id, callback, error) {

      if (id == null) { id = 0; }
      let uri  = this.endpoint+'/'+ (id !== 0 ? id+'/fields' : 'fields');
      
      return this.m.Request(uri, 'GET', null, callback, error);
    }
    Create(data, callback, error) {

      return this.m.Request(this.endpoint, 'POST', data, callback, error);
    }

    Update(id, data, callback, error) {

      return this.m.Request(this.endpoint+'/'+id, 'PUT', data, callback, error);
    }

    Delete(id, callback, error) {

      return this.m.Request(this.endpoint+'/'+id, 'DELETE', null, callback, error);
    }
  }
  Abstract.initClass();