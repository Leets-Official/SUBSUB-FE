const { createProxyMiddleware } = require("http-proxy-middleware");
const url = "http://ec2-3-39-74-116.ap-northeast-2.compute.amazonaws.com:8080";
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
