// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  // @if TARGET=='nodejs'
  
  class Stats {
    static initClass() {
  
      this.prototype.available = ['24hours', '7days', '30days'];
    }

    constructor(m) {
      this.m = m;
    }

    Store(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return this.Stats('store', timeframe, to, callback, error);
    }

    Revenue(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return this.Stats('revenue', timeframe, to, callback, error);
    }

    Orders(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return this.Stats('orders', timeframe, to, callback, error);
    }

    Customers(timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      return this.Stats('customers', timeframe, to, callback, error);
    }

    Stats(type, timeframe, to, callback, error) {

      if (timeframe == null) { timeframe = null; }
      if (to == null) { to = null; }
      let data = {};

      if (this.m.InArray(timeframe, this.available)) {
        data['timeframe'] = timeframe;

      } else if (timeframe !== null) {
        data['from'] = timeframe;
      }

      if (to !== null) {
        data['to'] = to;
      }

      return this.m.Request(`statistics/${type}`, 'GET', data, callback, error);
    }
  }
  Stats.initClass();

  // @endif
  
