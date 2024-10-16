const allowedCors = [
  // 'https://aelia.website',
  // 'http://aelia.website',
  'http://localhost:3000',
];

module.exports.cors = (req, res, next) => {
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  return next();
};
