// worker.js
import { serveStatic } from 'worktop/serve-static';
import { Router } from 'worktop';

const API = new Router();

// 1. Serve a config.json (Element REQUIRESSS this)
API.add("GET", "/config.json", async () => {
  const config = {
    "default_server_config": {
      "m.homeserver": {
        // CHANGE THIS if you ever host your own HS
        "base_url": "https://matrix-client.matrix.org",
        "server_name": "matrix.org"
      }
    },
    "disable_custom_urls": true,
    "disable_guests": true
  };

  return new Response(JSON.stringify(config), {
    headers: {
      "Content-Type": "application/json"
    }
  });
});

// 2. Serve static files from the Pages build output (YOUR existing behavior)
API.add("GET", "/*", serveStatic("webapp"));

export default {
  async fetch(request, env, ctx) {
    return API.run(request, env, ctx);
  }
};
