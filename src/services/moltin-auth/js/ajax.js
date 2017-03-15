// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
  ({
    Ajax(options) {

      let request;
      let args = {
        method:   'GET',
        async:    false,
        data:     null,
        timeout:  60000,
        headers:  {},
        host:     this.options.url,
        port:     443,
        path:     '/',
        success(response, status, request) {},
        error(response, status, request) {}
      };

      args = this.Merge(args, options);
      args.method = args.method.toUpperCase();

      try {
        request = new XMLHttpRequest();
      } catch (e) {
        try {
          request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (error) {
          e = error;
          return false;
        }
      }

      args.url = ( args.port === 443 ? 'https://' : 'http://' ) + args.host +
             ( args.path.substr(0, 1) !== '/' ? `/${this.options.version}/${args.path}` : args.path );

      if (args.method === 'GET') {
        args.url += `?${this.Serialize(args.data)}`;
        args.data = null;
      } else {
        args.data = this.Serialize(args.data);
      }

      request.open(args.method, args.url, args.async);

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
  });
