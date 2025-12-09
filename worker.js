// worker.js
import { serveStatic } from 'worktop/serve-static';
import { Router } from 'worktop';

const API = new Router();

// Serve static files from the Pages build output:
API.add('GET', "/*", serveStatic("webapps"));

export default {
  async fetch(request, env, ctx) {
    return API.run(request, env, ctx);
  }
};
