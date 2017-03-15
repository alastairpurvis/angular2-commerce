// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Variation {

    constructor(m) {
      this.m = m;
    }

    Get(product, modifier, id, callback, error) {

      return this.m.Request(`products/${product}/modifiers/${modifier}/variations/${id}`, 'GET', null, callback, error);
    }

    Create(product, modifier, data, callback, error) {

      return this.m.Request(`products/${product}/modifiers/${modifier}/variations/`, 'POST', data, callback, error);
    }

    Update(product, modifier, id, data, callback, error) {

      return this.m.Request(`products/${product}/modifiers/${modifier}/variations/${id}`, 'PUT', data, callback, error);
    }

    Fields(product, modifier, id, callback, error) {

      if (id == null) { id = 0; }
      let uri = `products/${product}/modifiers/${modifier}/variations/${id !== 0 ? id+'/fields' : 'fields'}`;

      return this.m.Request(uri, 'GET', null, callback, error);
    }

    Delete(product, modifier, id, callback, error) {

      return this.m.Request(`products/${product}/modifiers/${modifier}/variations/${id}`, 'DELETE', null, callback, error);
    }
  }

  // @endif
  
