// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Address {
    static initClass() {
  
      // @if TARGET=='nodejs'
      
  
      // @endif
      
    }

    constructor(m) {
      this.m = m;
    }

    Get(customer, id, callback, error) {

      return this.m.Request(`customers/${customer}/addresses/${id}`, 'GET', null, callback, error);
    }

    Find(customer, terms, callback, error) {

      return this.m.Request(`customers/${customer}/addresses`, 'GET', terms, callback, error);
    }

    List(customer, terms, callback, error) {

      return this.m.Request(`customers/${customer}/addresses`, 'GET', terms, callback, error);
    }

    Create(customer, data, callback, error) {

      return this.m.Request(`customers/${customer}/addresses`, 'POST', data, callback, error);
    }

    Fields(customer, id, callback, error) {

      let uri;
      if (customer == null) { customer = 0; }
      if (id == null) { id = 0; }
      if ((customer > 0) && (id <= 0)) {
        uri = `customers/${customer}/addresses/fields`;
      } else if ((customer > 0) && (id > 0)) {
        uri = `customers/${customer}/addresses/${id}/fields`;
      } else {
        uri = 'addresses/fields';
      }
      
      return this.m.Request(uri, 'GET', null, callback, error);
    }
    Update(customer, id, data, callback, error) {

      return this.m.Request(`customers/${customer}/addresses/${id}`, 'PUT', data, callback, error);
    }
  }
  Address.initClass();