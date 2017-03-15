// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Email {

    constructor(m) {
      this.m = m;
    }

    Get(slug, callback, error) {

      return this.m.Request(`emails/${slug}`, 'GET', null, callback, error);
    }

    List(terms, callback, error) {

      return this.m.Request('emails', 'GET', terms, callback, error);
    }

    Create(data, callback, error) {

      return this.m.Request('emails', 'POST', data, callback, error);
    }

    Update(slug, data, callback, error) {

      return this.m.Request(`emails/${slug}`, 'PUT', data, callback, error);
    }

    Delete(slug) {

      return this.m.Request(`emails/${slug}`, 'DELETE', null, callback, error);
    }
  }

  // @endif
  
