// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Modifier {

    constructor(m) {
      this.m = m;
    }

    Get(product, modifier, callback, error) {

      return this.m.Request(`products/${product}/modifiers/${modifier}`, 'GET', null, callback, error);
    }

    Create(product, data, callback, error) {

      return this.m.Request(`products/${product}/modifiers`, 'POST', data, callback, error);
    }

    Update(product, modifier, data, callback, error) {

      return this.m.Request(`products/${product}/modifiers/${modifier}`, 'PUT', data, callback, error);
    }

    Fields(product, modifier, callback, error) {

      if (modifier == null) { modifier = 0; }
      let uri  = `products/${product}/modifiers/${modifier !== 0 ? modifier+'/fields' : 'fields'}`;
      
      return this.m.Request(uri, 'GET', null, callback, error);
    }

    Delete(product, modifier, callback, error) {

      return this.m.Request(`products/${product}/modifiers/${modifier}`, 'DELETE', null, callback, error);
    }
  }

  // @endif
  
