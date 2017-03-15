import { Injectable } from '@angular/core';
import { Config }  from './config';

export class Moltin {
  static initClass() {

    "use strict";

    (<any>this).prototype.options = {
      publicId:  '',
      secretKey: '',
      auth:      {},
      url:       'api.moltin.com',
      version:   'v2',
      debug:     true,
      currency:  false,
      language:  false,
      methods:   ['GET', 'POST', 'PUT', 'DELETE'],
      notice(type, msg) {

        return console.log(type + ": " + msg);
      }
    };
  }

  constructor(overrides) {


    (<any>this).options = (<any>this).Merge((<any>this).options, overrides);
    (<any>this).Storage = new Storage;

    (<any>this).Address       = new Address((<any>this));
    (<any>this).Brand         = new Brand((<any>this));
    (<any>this).Cart          = new Cart((<any>this));
    (<any>this).Category      = new Category((<any>this));
    (<any>this).Checkout      = new Checkout((<any>this));
    (<any>this).Collection    = new Collection((<any>this));
    (<any>this).Currency      = new Currency((<any>this));
    (<any>this).Entry         = new Entry((<any>this));
    (<any>this).Gateway       = new Gateway((<any>this));
    (<any>this).Language      = new Language((<any>this));
    (<any>this).Order         = new Order((<any>this));
    (<any>this).Product       = new Product((<any>this));
    (<any>this).Shipping      = new Shipping((<any>this));
    (<any>this).Tax           = new Tax((<any>this));


    if ((<any>this).Storage.get('mcurrency')) {
      (<any>this).options.currency = (<any>this).Storage.get('mcurrency');
    }

    if ((<any>this).Storage.get('mlanguage')) {
      (<any>this).options.language = (<any>this).Storage.get('mlanguage');
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
      str.push(typeof v === 'object' ? (<any>this).Serialize(v, k) : encodeURIComponent(k)+'='+encodeURIComponent(v));
    }

    return str.join('&');
  }

  Error(response) {

    let msg = '';

    if (typeof response.errors !== 'undefined') {
      for (let k in response.errors) { let v = response.errors[k]; msg += v+'<br />'; }
    } else {
      msg = response.error;
    }

    return (<any>this).options.notice('Error', msg);
  }

  Authenticate(callback, error){

    let _e;
    if ((<any>this).options.publicId.length <= 0) {
      if (typeof error === 'function') {
        error('error', 'Public ID must be set', 401);
      }
    }


    if (((<any>this).Storage.get('mtoken') !== null) && (parseInt((<any>this).Storage.get('mexpires')) > Date.now())) {

      (<any>this).options.auth = {
        expires: parseInt((<any>this).Storage.get('mexpires')) * 1000,
        token:   (<any>this).Storage.get('mtoken')
      };

      if (typeof callback === 'function') {
        callback((<any>this).options.auth);
      }


      _e = document.createEvent('CustomEvent');
      _e.initCustomEvent('MoltinReady', false, false, (<any>this));
      window.dispatchEvent(_e);


      return (<any>this);
    }

    // @if TARGET!='nodejs'

    let data = {
      grant_type: 'implicit',
      client_id:  (<any>this).options.publicId
    };
    // @endif



    (<any>this).Ajax({
  method: 'POST',
  path: '/oauth/access_token',
  data,
  async: typeof callback === 'function' ? true : false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  success: (r, c, e) => {

    (<any>this).Storage.set('mexpires', r.expires);
    (<any>this).Storage.set('mtoken', r.token_type+' '+r.access_token);

    (<any>this).options.auth = {
      expires: parseInt((<any>this).Storage.get('mexpires')) * 1000,
      token:   (<any>this).Storage.get('mtoken')
    };

    if (typeof callback === 'function') {
      callback(r);
    }

    // @if TARGET=='js'

    let _e = document.createEvent('CustomEvent');
    _e.initCustomEvent('MoltinReady', false, false, (<any>this));
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

return (<any>this);
  }

  Request(uri, method, data, callback, error) {

    if (method == null) { method = 'GET'; }
    if (data == null) { data = null; }
    let _data    = {};
    let _headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': (<any>this).options.auth.token
    };

    if ((<any>this).options.auth.token === null) {
      if (typeof error === 'function') {
        error('error', 'You much authenticate first', 401);
      }
    }

    if (Date.now() >= (<any>this).options.auth.expires) {
      (<any>this).Authenticate(null, error);
    }

    if (!(<any>this).InArray(method, (<any>this).options.methods)) {
      if (typeof error === 'function') {
        error('error', `Invalid request method (${method})`, 400);
      }
    }

    if ((<any>this).options.currency) {
      _headers['X-Currency'] = (<any>this).options.currency;
    }

    if ((<any>this).options.language) {
      _headers['X-Language'] = (<any>this).options.language;
    }

    (<any>this).Ajax({
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
            (<any>this).Error(( typeof r.errors !== 'undefined' ? r.errors : r.error ));
          }
        }
        return _data = r;
      }
    });

    if (typeof callback === 'undefined') {
      return (<any>_data).result;
    }
  }

  Ajax (options) {

        let request;
        let args = {
          method:   'GET',
          async:    false,
          data:     null,
          timeout:  60000,
          headers:  {},
          host:     (<any>this).options.url,
          port:     443,
          path:     '/',
          success(response, status, request) {},
          error(response, status, request) {}
        };

        args = (<any>this).Merge(args, options);
        args.method = args.method.toUpperCase();

        try {
          request = new XMLHttpRequest();
        } catch (e) {
            return false;
        }

        (<any>args).url = ( args.port === 443 ? 'https://' : 'http://' ) + args.host +
               ( args.path.substr(0, 1) !== '/' ? `/${(<any>this).options.version}/${args.path}` : args.path );

        if (args.method === 'GET') {
          (<any>args).url += `?${(<any>this).Serialize(args.data)}`;
          (<any>args).data = null;
        } else {
          (<any>args).data = (<any>this).Serialize(args.data);
        }

        request.open(args.method, (<any>args).url, args.async);

        let timeout = setTimeout(() => {
          request.abort();
          return args.error(request, 408, 'Your request timed out');
        }
        , args.timeout);

        for (let k in args.headers) { let v = args.headers[k]; request.setRequestHeader(k, v); }

        request.onreadystatechange = function() {

          if (request.readyState !== 4) {
            return null;
          }

          clearTimeout(timeout);

          let response = JSON.parse(request.responseText);

          if (request.status.toString().charAt(0) !== '2') {
            return args.error(response, request.status, request);
          } else {
            return args.success(response, request.status, request);
          }
        };

        return request.send(args.data);
    }

}
Moltin.initClass();

  export class Storage {

    constructor() {}

    set(key, value, days) {

      let expires = "";

      if (days) {
        let date = new Date;
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = `; expires=${(<any>date).toGMTString()}`;
      }

      return document.cookie = key + "=" + value + expires + "; path=/";
    }

    get(key) {

      key = key + "=";

      for (let c of Array.from(document.cookie.split(';'))) {
        while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
        if (c.indexOf(key) === 0) { return c.substring(key.length, c.length); }
      }

      return null;
    }

    remove(key) {

      return (<any>this).set(key, '', -1);
    }
  }

  export class Abstract {
    static initClass() {

      // @if TARGET=='nodejs'


      // @endif

    }

    constructor(m) {
      (<any>this).m = m;
    }

    Get(id, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id, 'GET', null, callback, error);
    }

    Find(terms, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint, 'GET', terms, callback, error);
    }

    List(terms, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint, 'GET', terms, callback, error);
    }

    Fields(id, callback, error) {

      if (id == null) { id = 0; }
      let uri  = (<any>this).endpoint+'/'+ (id !== 0 ? id+'/fields' : 'fields');

      return (<any>this).m.Request(uri, 'GET', null, callback, error);
    }
    Create(data, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint, 'POST', data, callback, error);
    }

    Update(id, data, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id, 'PUT', data, callback, error);
    }

    Delete(id, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id, 'DELETE', null, callback, error);
    }
  }
  Abstract.initClass();

  export class Address {
    static initClass() {

      // @if TARGET=='nodejs'


      // @endif

    }

    constructor(m) {
      (<any>this).m = m;
    }

    Get(customer, id, callback, error) {

      return (<any>this).m.Request(`customers/${customer}/addresses/${id}`, 'GET', null, callback, error);
    }

    Find(customer, terms, callback, error) {

      return (<any>this).m.Request(`customers/${customer}/addresses`, 'GET', terms, callback, error);
    }

    List(customer, terms, callback, error) {

      return (<any>this).m.Request(`customers/${customer}/addresses`, 'GET', terms, callback, error);
    }

    Create(customer, data, callback, error) {

      return (<any>this).m.Request(`customers/${customer}/addresses`, 'POST', data, callback, error);
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

      return (<any>this).m.Request(uri, 'GET', null, callback, error);
    }
    Update(customer, id, data, callback, error) {

      return (<any>this).m.Request(`customers/${customer}/addresses/${id}`, 'PUT', data, callback, error);
    }
  }
  Address.initClass();

  export class Brand extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'brands';
    }
  }
  Brand.initClass();

  export class Cart {
    static initClass() {

      // @if TARGET=='nodejs'

      // @endif

    }

    constructor(m) {

      (<any>this).m = m;
      (<any>this).cartId = (<any>this).Identifier();
    }

    Identifier(reset, id) {

      if (reset == null) { reset = false; }
      if (id == null) { id = false; }
      if (!reset && !id && ((<any>this).m.Storage.get('mcart') !== null)) {
        return (<any>this).m.Storage.get('mcart');
      }

      if (!id) {
        id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, c => ( (Math.random()*16)|0 ).toString(16));
      }

      (<any>this).m.Storage.set('mcart', id);

      (<any>this).cartId = id;

      return id;
    }

    Contents(callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}`, 'GET', null, callback, error);
    }

    Insert(id, qty, mods, callback, error) {

      if (qty == null) { qty = 1; }
      if (mods == null) { mods = null; }
      return (<any>this).m.Request(`carts/${(<any>this).cartId}`, 'POST', {id, quantity: qty, modifier: mods}, callback, error);
    }

    Update(id, data, callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}/item/${id}`, 'PUT', data, callback, error);
    }

    Delete(callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}`, 'DELETE', null, callback, error);
    }

    Remove(id, callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}/item/${id}`, 'DELETE', null, callback, error);
    }

    Item(id, callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}/item/${id}`, 'GET', null, callback, error);
    }

    InCart(id, callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}/has/${id}`, 'GET', null, callback, error);
    }

    Checkout(callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}/checkout`, 'GET', null, callback, error);
    }

    Complete(data, callback, error) {

      return (<any>this).m.Request(`carts/${(<any>this).cartId}/checkout`, 'POST', data, callback, error);
    }

    Discount(code, callback, error) {

      if ( (code === null) || (code === false) ) {
        return (<any>this).m.Request(`carts/${(<any>this).cartId}/discount`, 'DELETE', null, callback, error);
      }

      return (<any>this).m.Request(`carts/${(<any>this).cartId}/discount`, 'POST', {code}, callback, error);
    }
    List(terms, callback, error) {

      return (<any>this).m.Request('carts', 'GET', terms, callback, error);
    }
  }
  Cart.initClass();

  export class Category extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'categories';

      // @if TARGET=='nodejs'

      // @endif

    }

    Tree(terms, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/tree', 'GET', terms, callback, error);
    }
    Order(data, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/order', 'PUT', data, callback, error);
    }
  }
  Category.initClass();

  export class Checkout {

    constructor(m) {
      (<any>this).m = m;
    }

    Payment(method, order, data, callback, error) {

      return (<any>this).m.Request(`checkout/payment/${method}/${order}`, 'POST', data, callback, error);
    }
  }

  export class Collection extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'collections';
    }
  }
  Collection.initClass();

  export class Currency extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'currencies';
    }

    Set(code, callback, error) {

      (<any>this).m.Storage.set('mcurrency', code);
      (<any>this).m.options.currency = code;

      if (typeof callback === 'function') {
        return callback(code);
      }
    }
  }
  Currency.initClass();

// Sanity-check the conversion and remove (<any>this) comment.
  export class Entry {
    static initClass() {

      // @if TARGET=='nodejs'


      // @endif

    }

    constructor(m) {
      (<any>this).m = m;
    }

    Get(flow, id, callback, error) {

      return (<any>this).m.Request(`flows/${flow}/entries/${id}`, 'GET', null, callback, error);
    }

    Find(flow, terms, callback, error) {

      return (<any>this).m.Request(`flows/${flow}/entries/search`, 'GET', terms, callback, error);
    }

    List(flow, terms, callback, error) {

      return (<any>this).m.Request(`flows/${flow}/entries`, 'GET', terms, callback, error);
    }
    Fields(flow, id, callback, error) {

      if (id == null) { id = 0; }
      let uri  = `flows/${flow}/entries/${id !== 0 ? id+'/fields' : 'fields'}`;

      return (<any>this).m.Request(uri, 'GET', null, callback, error);
    }

    Create(flow, data, callback, error) {

      return (<any>this).m.Request(`flows/${flow}/entries/`, 'POST', data, callback, error);
    }

    Update(flow, id, data, callback, error) {

      return (<any>this).m.Request(`flows/${flow}/entries/${id}`, 'PUT', data, callback, error);
    }

    Delete(flow, id, callback, error) {

      return (<any>this).m.Request(`flows/${flow}/entries/${id}`, 'DELETE', null, callback, error);
    }
  }

// Sanity-check the conversion and remove (<any>this) comment.
  export class Gateway {
    static initClass() {

      // @if TARGET=='nodejs'


      // @endif

    }

    constructor(m) {
      (<any>this).m = m;
    }

    Get(slug, callback, error) {

      return (<any>this).m.Request(`gateways/${slug}`, 'GET', null, callback, error);
    }

    List(terms, callback, error) {

      return (<any>this).m.Request('gateways', 'GET', terms, callback, error);
    }
    Fields(slug, callback, error) {

      if (slug == null) { slug = 0; }
      let uri  = `gateways/${slug !== 0 ? slug+'/fields' : 'fields'}`;

      return (<any>this).m.Request(uri, 'GET', null, callback, error);
    }

    Update(slug, data, callback, error) {

      return (<any>this).m.Request(`gateways/${slug}`, 'PUT', data, callback, error);
    }

    Enable(slug, callback, error) {

      return (<any>this).m.Request(`gateways/${slug}/enable`, 'GET', null, callback, error);
    }

    Disable(slug, callback, error) {

      return (<any>this).m.Request(`gateways/${slug}/disable`, 'GET', null, callback, error);
    }
  }
  Gateway.initClass();

export class Order extends Abstract{
    static initClass() {

      (<any>this).prototype.endpoint = 'orders';

      // @if TARGET=='nodejs'


      // @endif

    }

    constructor(m) {
      super(m);
    }

    Items(id, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id+'/items', 'GET', null, callback, error);
    }

    AddItem(id, data, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id+'/items', 'POST', data, callback, error);
    }

    UpdateItem(id, data, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id+'/items', 'PUT', data, callback, error);
    }

    RemoveItem(order, id, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+order+'/items/'+id, 'DELETE', null, callback, error);
    }
  }

  export class Language {

    constructor(m) {
      (<any>this).m = m;
    }

    Set(code, callback, error) {

      (<any>this).m.Storage.set('mlanguage', code);
      (<any>this).m.options.language = code;

      if (typeof callback === 'function') {
        return callback(code);
      }
    }
  }

// TODO: (<any>this) file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove (<any>this) comment.

// Sanity-check the conversion and remove (<any>this) comment.

// Sanity-check the conversion and remove (<any>this) comment.
  export class Product extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'products';
    }

    Search(terms, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/search', 'GET', terms, callback, error);
    }

    Modifiers(id, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id+'/modifiers', 'GET', null, callback, error);
    }

    Variations(id, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/'+id+'/variations', 'GET', null, callback, error);
    }
  }
  Product.initClass();

// TODO: (<any>this) file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove (<any>this) comment.
  // @if TARGET=='nodejs'

  export class Promotion extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'promotions/cart';
    }

    Search(terms, callback, error) {

      return (<any>this).m.Request((<any>this).endpoint+'/search', 'GET', terms, callback, error);
    }
  }
  Promotion.initClass();

  // @endif// TODO: (<any>this) file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove (<any>this) comment.
  export class Shipping extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'shipping';
    }
  }
  Shipping.initClass();
;

  export class Stats {
    static initClass() {

      (<any>this).prototype.available = ['24hours', '7days', '30days'];
    }

    constructor(m) {
      (<any>this).m = m;
    }

    Store(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return (<any>this).Stats('store', timeframe, to, callback, error);
    }

    Revenue(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return (<any>this).Stats('revenue', timeframe, to, callback, error);
    }

    Orders(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return (<any>this).Stats('orders', timeframe, to, callback, error);
    }

    Customers(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return (<any>this).Stats('customers', timeframe, to, callback, error);
    }

    Stats(type, timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      let data = {};

      if ((<any>this).m.InArray(timeframe, (<any>this).available)) {
        data['timeframe'] = timeframe;

      } else if (timeframe !== null) {
        data['from'] = timeframe;
      }

      if (to !== null) {
        data['to'] = to;
      }

      return (<any>this).m.Request(`statistics/${type}`, 'GET', data, callback, error);
    }
  }
  Stats.initClass();

  // @endif// TODO: (<any>this) file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove (<any>this) comment.
  export class Tax extends Abstract {
    static initClass() {

      (<any>this).prototype.endpoint = 'taxes';
    }
  }
  Tax.initClass();


  // @endif// TODO: (<any>this) file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove (<any>this) comment.
