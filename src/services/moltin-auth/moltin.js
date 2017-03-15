import 'fetch-everywhere';
import 'es6-promise';

class Moltin {
  static initClass() {

    "use strict";

    this.prototype.options = {
      publicId:  '',
      secretKey: '',
      auth:      {},
      url:       'api.molt.in',
      version:   'v1',
      debug:     false,
      currency:  false,
      language:  false,
      methods:   ['GET', 'POST', 'PUT', 'DELETE'],
      notice(type, msg) {

        return console.log(type + ": " + msg);
      }
    };
  }

  constructor(overrides) {

    this.options = this.Merge(this.options, overrides);
    this.Storage = new Storage;

    this.Address       = new Address(this);
    this.Brand         = new Brand(this);
    this.Cart          = new Cart(this);
    this.Category      = new Category(this);
    this.Checkout      = new Checkout(this);
    this.Collection    = new Collection(this);
    this.Currency      = new Currency(this);
    this.Entry         = new Entry(this);
    this.Gateway       = new Gateway(this);
    this.Language      = new Language(this);
    this.Order         = new Order(this);
    this.Product       = new Product(this);
    this.Shipping      = new Shipping(this);
    this.Tax           = new Tax(this);
    // @if TARGET=='nodejs'

    this.Cache         = new Cache(this);
    this.Customer      = new Customer(this);
    this.CustomerGroup = new CustomerGroup(this);
    this.Email         = new Email(this);
    this.Field         = new Field(this);
    this.Flow          = new Flow(this);
    this.Payment       = new Payment(this);
    this.Promotion     = new Promotion(this);
    this.Stats         = new Stats(this);
    this.Transaction   = new Transaction(this);
    this.Variation     = new Variation(this);
    this.Modifier      = new Modifier(this);
    this.Webhook       = new Webhook(this);
    // @endif


    if (this.Storage.get('mcurrency')) {
      this.options.currency = this.Storage.get('mcurrency');
    }

    if (this.Storage.get('mlanguage')) {
      this.options.language = this.Storage.get('mlanguage');
    }
  }

  Merge(o1, o2) {

    let v;
    let o3 = {};
    for (var k in o1) { v = o1[k]; o3[k] = v; }
    for (k in o2) { v = o2[k]; o3[k] = v; }
    return o3;
  }

  InArray(key, arr) {

    if (!arr || !Array.from(arr).includes(key)) { return false; }
    return true;
  }

  Serialize(obj, prefix) {

    if (prefix == null) { prefix = null; }
    let str = [];

    for (let k in obj) {
      let v = obj[k];
      k = prefix !== null ? prefix+'['+k+']' : k;
      str.push(typeof v === 'object' ? this.Serialize(v, k) : encodeURIComponent(k)+'='+encodeURIComponent(v));
    }

    return str.join('&');
  }

  Error(response) {

    let msg = '';

    if (typeof response.errors !== 'undefind') {
      for (let k in response.errors) { let v = response.errors[k]; msg += v+'<br />'; }
    } else {
      msg = response.error;
    }

    return this.options.notice('Error', msg);
  }

  Authenticate(callback, error){

    let _e;
    if (this.options.publicId.length <= 0) {
      if (typeof error === 'function') {
        error('error', 'Public ID must be set', 401);
      }
    }

    // @if TARGET=='nodejs'

    if (this.options.secretKey.length <= 0) {
      if (typeof error === 'function') {
        error('error', 'Secret Key must be set', 401);
      }
    }
    // @endif


    if ((this.Storage.get('mtoken') !== null) && (parseInt(this.Storage.get('mexpires')) > Date.now())) {

      this.options.auth = {
        expires: parseInt(this.Storage.get('mexpires')) * 1000,
        token:   this.Storage.get('mtoken')
      };

      if (typeof callback === 'function') {
        callback(this.options.auth);
      }

      // @if TARGET=='js'

      _e = document.createEvent('CustomEvent');
      _e.initCustomEvent('MoltinReady', false, false, this);
      window.dispatchEvent(_e);
      // @endif


      return this;
    }

    // @if TARGET!='nodejs'

    let data = {
      grant_type: 'implicit',
      client_id:  this.options.publicId
    };
    // @endif


    // @if TARGET=='nodejs'

    data = {
      grant_type:   'client_credentials',
      client_id:     this.options.publicId,
      client_secret: this.options.secretKey
    };
    // @endif


    this.Ajax({
  method: 'POST',
  path: '/oauth/access_token',
  data,
  async: typeof callback === 'function' ? true : false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  success: (r, c, e) => {

    this.Storage.set('mexpires', r.expires);
    this.Storage.set('mtoken', r.token_type+' '+r.access_token);

    this.options.auth = {
      expires: parseInt(this.Storage.get('mexpires')) * 1000,
      token:   this.Storage.get('mtoken')
    };

    if (typeof callback === 'function') {
      callback(r);
    }

    // @if TARGET=='js'

    let _e = document.createEvent('CustomEvent');
    _e.initCustomEvent('MoltinReady', false, false, this);
    window.dispatchEvent(_e);
    return // @endif
    ;
  },

  error: (e, c, r) => {
    if (typeof error === 'function') {
      return error('error', 'Authorization failed', 401);
    }
  }
});

return this;
  }

  Request(uri, method, data, callback, error) {

    if (method == null) { method = 'GET'; }
    if (data == null) { data = null; }
    let _data    = {};
    let _headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.options.auth.token
    };

    if (this.options.auth.token === null) {
      if (typeof error === 'function') {
        error('error', 'You much authenticate first', 401);
      }
    }

    if (Date.now() >= this.options.auth.expires) {
      this.Authenticate(null, error);
    }

    if (!this.InArray(method, this.options.methods)) {
      if (typeof error === 'function') {
        error('error', `Invalid request method (${method})`, 400);
      }
    }

    if (this.options.currency) {
      _headers['X-Currency'] = this.options.currency;
    }

    if (this.options.language) {
      _headers['X-Language'] = this.options.language;
    }

    this.Ajax({
      method,
      path: uri,
      data,
      async: typeof callback === 'function' ? true : false,
      headers: _headers,
      success: (r, c, e) => {
        if (typeof callback === 'function') {
          return callback(r.result, typeof r.pagination !== 'undefined' ? r.pagination : null);
        } else {
          return _data = r;
        }
      },
      error: (r, c, e) => {
        if (r.status === false) {
          if (typeof error === 'function') {
            error('error', ( typeof r.errors !== 'undefined' ? r.errors : r.error ), c);
          } else {
            this.Error(( typeof r.errors !== 'undefined' ? r.errors : r.error ));
          }
        }
        return _data = r;
      }
    });

    if (typeof callback === 'undefined') {
      return _data.result;
    }
  }
}

export default Moltin ;
