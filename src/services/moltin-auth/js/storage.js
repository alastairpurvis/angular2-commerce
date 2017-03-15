// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  class Storage {

    constructor() {}

    set(key, value, days) {

      let expires = "";

      if (days) {
        let date = new Date;
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = `; expires=${date.toGMTString()}`;
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

      return this.set(key, '', -1);
    }
  }
