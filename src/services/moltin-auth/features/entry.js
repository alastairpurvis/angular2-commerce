// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Entry {
    static initClass() {
  
      // @if TARGET=='nodejs'
      
  
      // @endif
      
    }

    constructor(m) {
      this.m = m;
    }

    Get(flow, id, callback, error) {

      return this.m.Request(`flows/${flow}/entries/${id}`, 'GET', null, callback, error);
    }

    Find(flow, terms, callback, error) {

      return this.m.Request(`flows/${flow}/entries/search`, 'GET', terms, callback, error);
    }

    List(flow, terms, callback, error) {

      return this.m.Request(`flows/${flow}/entries`, 'GET', terms, callback, error);
    }
    Fields(flow, id, callback, error) {

      if (id == null) { id = 0; }
      let uri  = `flows/${flow}/entries/${id !== 0 ? id+'/fields' : 'fields'}`;
      
      return this.m.Request(uri, 'GET', null, callback, error);
    }

    Create(flow, data, callback, error) {

      return this.m.Request(`flows/${flow}/entries/`, 'POST', data, callback, error);
    }

    Update(flow, id, data, callback, error) {

      return this.m.Request(`flows/${flow}/entries/${id}`, 'PUT', data, callback, error);
    }

    Delete(flow, id, callback, error) {

      return this.m.Request(`flows/${flow}/entries/${id}`, 'DELETE', null, callback, error);
    }
  }
  Entry.initClass();