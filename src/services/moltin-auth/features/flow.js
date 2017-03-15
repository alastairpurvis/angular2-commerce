// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Flow {

    constructor(m) {
      this.m = m;
    }

    Get(slug, callback, error) {

      return this.m.Request(`flows/${slug}`, 'GET', null, callback, error);
    }

    List(terms, callback, error) {

      return this.m.Request('flows', 'GET', terms, callback, error);
    }

    Create(data, callback, error) {

      return this.m.Request('flows', 'POST', data, callback, error);
    }

    Update(slug, data, callback, error) {

      return this.m.Request(`flows/${slug}`, 'PUT', data, callback, error);
    }

    Fields(slug, callback, error) {

      if (slug == null) { slug = 0; }
      let uri  = `flows/${slug !== 0 ? slug+'/fields' : 'fields'}`;
      
      return this.m.Request(uri, 'GET', null, callback, error);
    }

    Entries(slug, terms, callback, error) {

      return this.m.Request(`flows/${slug}/entries`, 'GET', terms, callback, error);
    }

    Types(callback, error) {

      return this.m.Request('flows/types', 'GET', null, callback, error);
    }

    Delete(slug, callback, error) {

      return this.m.Request(`flows/${slug}`, 'DELETE', null, callback, error);
    }
  }

  // @endif
  
