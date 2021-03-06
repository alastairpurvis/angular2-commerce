import 'fetch-everywhere';
import 'es6-promise';

import Config from './config';
import RequestFactory from './factories/request';
import StorageFactory from './factories/storage';
import ProductsEndpoint from './endpoints/products';
import CurrenciesEndpoint from './endpoints/currencies';
import BrandsEndpoint from './endpoints/brands';
import CartEndpoint from './endpoints/cart';
import CategoriesEndpoint from './endpoints/categories';
import CollectionsEndpoint from './endpoints/collections';
import OrdersEndpoint from './endpoints/orders';
import GatewaysEndpoint from './endpoints/gateways';
import FilesEndpoint from './endpoints/files';

class Moltin {
  constructor(config) {
    this.config = config;
    this.request = new RequestFactory(config);
    this.storage = new StorageFactory();

    this.Product = new ProductsEndpoint(config);
    this.Currency = new CurrenciesEndpoint(config);
    this.Brand = new BrandsEndpoint(config);
    this.Cart = new CartEndpoint(config);
    this.Category = new CategoriesEndpoint(config);
    this.Collection = new CollectionsEndpoint(config);
    this.Order = new OrdersEndpoint(config);
    this.Gateway = new GatewaysEndpoint(config);
    this.Files = new FilesEndpoint(config);

  }

  // Expose `authenticate` function on the Moltin class
  Authenticate() {
    return this.request.authenticate();
  }
}

// Export a function to instantiate the Moltin class
const gateway = config => new Moltin(new Config(config));

export { gateway };
