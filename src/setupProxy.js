const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/login/kakao',
    createProxyMiddleware({
      target: process.env.REACT_APP_DOMAIN,
      changeOrigin: true,
    })
  );
};