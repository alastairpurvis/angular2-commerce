// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Gateway {
    static initClass() {
  
      // @if TARGET=='nodejs'
      
  
      // @endif
      
    }

    constructor(m) {
      this.m = m;
    }

    Get(slug, callback, error) {

      return this.m.Request(`gateways/${slug}`, 'GET', null, callback, error);
    }

    List(terms, callback, error) {

      return this.m.Request('gateways', 'GET', terms, callback, error);
    }
    Fields(slug, callback, error) {

      if (slug == null) { slug = 0; }
      let uri  = `gateways/${slug !== 0 ? slug+'/fields' : 'fields'}`;
      
      return this.m.Request(uri, 'GET', null, callback, error);
    }

    Update(slug, data, callback, error) {

      return this.m.Request(`gateways/${slug}`, 'PUT', data, callback, error);
    }

    Enable(slug, callback, error) {

      return this.m.Request(`gateways/${slug}/enable`, 'GET', null, callback, error);
    }

    Disable(slug, callback, error) {

      return this.m.Request(`gateways/${slug}/disable`, 'GET', null, callback, error);
    }
  }
  Gateway.initClass();