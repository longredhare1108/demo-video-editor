const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    // eslint-disable-next-line no-unused-expressions
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:2022',
            changeOrigin: true,
        })
    );
};
