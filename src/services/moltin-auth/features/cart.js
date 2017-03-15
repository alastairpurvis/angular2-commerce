// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Cart {
    static initClass() {
  
      // @if TARGET=='nodejs'
      
      // @endif
      
    }

    constructor(m) {

      this.m = m;
      this.cartId = this.Identifier();
    }

    Identifier(reset, id) {

      if (reset == null) { reset = false; }
      if (id == null) { id = false; }
      if (!reset && !id && (this.m.Storage.get('mcart') !== null)) {
        return this.m.Storage.get('mcart');
      }

      if (!id) {
        id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, c => ( (Math.random()*16)|0 ).toString(16));
      }

      this.m.Storage.set('mcart', id);

      this.cartId = id;

      return id;
    }

    Contents(callback, error) {

      return this.m.Request(`carts/${this.cartId}`, 'GET', null, callback, error);
    }

    Insert(id, qty, mods, callback, error) {

      if (qty == null) { qty = 1; }
      if (mods == null) { mods = null; }
      return this.m.Request(`carts/${this.cartId}`, 'POST', {id, quantity: qty, modifier: mods}, callback, error);
    }

    Update(id, data, callback, error) {

      return this.m.Request(`carts/${this.cartId}/item/${id}`, 'PUT', data, callback, error);
    }

    Delete(callback, error) {

      return this.m.Request(`carts/${this.cartId}`, 'DELETE', null, callback, error);
    }

    Remove(id, callback, error) {

      return this.m.Request(`carts/${this.cartId}/item/${id}`, 'DELETE', null, callback, error);
    }

    Item(id, callback, error) {

      return this.m.Request(`carts/${this.cartId}/item/${id}`, 'GET', null, callback, error);
    }

    InCart(id, callback, error) {

      return this.m.Request(`carts/${this.cartId}/has/${id}`, 'GET', null, callback, error);
    }

    Checkout(callback, error) {

      return this.m.Request(`carts/${this.cartId}/checkout`, 'GET', null, callback, error);
    }

    Complete(data, callback, error) {

      return this.m.Request(`carts/${this.cartId}/checkout`, 'POST', data, callback, error);
    }
    
    Discount(code, callback, error) {

      if ( (code === null) || (code === false) ) {
        return this.m.Request(`carts/${this.cartId}/discount`, 'DELETE', null, callback, error);
      }

      return this.m.Request(`carts/${this.cartId}/discount`, 'POST', {code}, callback, error);
    }
    List(terms, callback, error) {

      return this.m.Request('carts', 'GET', terms, callback, error);
    }
  }
  Cart.initClass();
