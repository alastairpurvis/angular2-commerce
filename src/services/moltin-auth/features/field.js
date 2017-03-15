// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Field {

    constructor(m) {
      this.m = m;
    }

    Get(slug, callback, error) {

      return this.m.Request(`flows/${slug}`, 'GET', null, callback, error);
    }

    Create(flow, data, callback, error) {

      return this.m.Request(`flows/${flow}/fields`, 'POST', data, callback, error);
    }

    Update(flow, slug, data, callback, error) {

      return this.m.Request(`flows/${flow}/fields/${slug}`, 'PUT', data, callback, error);
    }

    Fields(slug, callback, error) {

      if (slug == null) { slug = 0; }
      let uri  = `flows/${slug !== 0 ? slug+'/fields' : 'fields'}`;
      
      return this.m.Request(uri, 'GET', null, callback, error);
    }

    Types(callback, error) {

      return this.m.Request('flows/types', 'GET', null, callback, error);
    }

    Type(flow, type, callback, error) {

      return this.m.Request(`flows/${flow}/types/${type}/options`, 'GET', null, callback, error);
    }

    Options(flow, slug, callback, error) {

      return this.m.Request(`flows/${flow}/fields/${slug}/options`, 'GET', null, callback, error);
    }

    Delete(flow, slug, callback, error) {

      return this.m.Request(`flows/${flow}/fields/${slug}`, 'DELETE', null, callback, error);
    }
  }

  // @endif
  
