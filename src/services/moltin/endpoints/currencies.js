import BaseExtend from '../extends/base';
import StorageFactory from '../factories/storage';

class CurrenciesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'currencies';
    this.storage = new StorageFactory();
  }

  List() {
    return this.request.send(`${this.endpoint}`, 'GET');
  }

  Create(body) {
    return this.request.send(`${this.endpoint}`, 'POST', body);
  }

  Delete(id) {
    return this.request.send(`${this.endpoint}/${id}`, 'DELETE');
  }

  Update(id, body) {
    return this.request.send(`${this.endpoint}/${id}`, 'PUT', body);
  }

  Set(currency) {
    const storage = this.storage;
    const config = this.config;

    storage.set('mcurrency', currency);
    config.currency = currency;

    const promise = new Promise((resolve, reject) => {
      const request = storage.get('mcurrency');

      try {
        resolve(request);
      } catch(err) {
        reject(new Error(err));
      }
    });

    return promise;
  }

  Active() {
    const storage = this.storage;

    const promise = new Promise((resolve, reject) => {
      const request = storage.get('mcurrency');

      try {
        resolve(request);
      } catch(err) {
        reject(new Error(err));
      }
    });

    return promise;
  }
}

export default CurrenciesEndpoint;
