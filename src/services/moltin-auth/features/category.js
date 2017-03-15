// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Category extends Abstract {
    static initClass() {
  
      this.prototype.endpoint = 'categories';
  
      // @if TARGET=='nodejs'
      
      // @endif
      
    }

    Tree(terms, callback, error) {

      return this.m.Request(this.endpoint+'/tree', 'GET', terms, callback, error);
    }
    Order(data, callback, error) {

      return this.m.Request(this.endpoint+'/order', 'PUT', data, callback, error);
    }
  }
  Category.initClass();
