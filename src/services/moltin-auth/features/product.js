// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Product extends Abstract {
    static initClass() {
  
      this.prototype.endpoint = 'products';
    }

    Search(terms, callback, error) {

      return this.m.Request(this.endpoint+'/search', 'GET', terms, callback, error);
    }

    Modifiers(id, callback, error) {

      return this.m.Request(this.endpoint+'/'+id+'/modifiers', 'GET', null, callback, error);
    }

    Variations(id, callback, error) {

      return this.m.Request(this.endpoint+'/'+id+'/variations', 'GET', null, callback, error);
    }
  }
  Product.initClass();
