// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Webhook {

    constructor(m) {
      this.m = m;
    }

    Get(id, callback, error) {

      return this.m.Request(`webhooks/${id}`, 'GET', null, callback, error);
    }

    List(terms, callback, error) {

      return this.m.Request(`webhooks/${id}`, 'GET', terms, callback, error);
    }

    Create(data, callback, error) {

      return this.m.Request('webhooks', 'POST', data, callback, error);
    }

    Update(id, data, callback, error) {

      return this.m.Request(`webhooks/${id}`, 'PUT', data, callback, error);
    }

    Delete(id, callback, error) {

      return this.m.Request(`webhooks/${id}`, 'DELETE', null, callback, error);
    }

    Fields(id, callback, error) {

      if (id == null) { id = 0; }
      let uri = `webhooks/${id !== 0 ? id+'/fields' : 'fields'}`;

      return this.m.Request(uri, 'GET', null, callback, error);
    }
  }

  // @endif
  
