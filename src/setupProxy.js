const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const url =process.env.BE_HOST;
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/register", {
      target: url,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/login", {
      target: url,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/subject", {
      target: url,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/subject/main", {
      target: url,
      changeOrigin: true,
    })
  );
  
  app.use(
    createProxyMiddleware("/property", {
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/property/delete", {
      target: url,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/property/update", {
      target: url,
      changeOrigin: true,
    })
  );
};
