const onFinished = require('on-finished');

// A function to handle logging after the response is finished
const logRequest = (req, res, startTime) => {
  onFinished(res, (err, res) => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (err) {
      console.error('Error during response handling:', err);
    } else {
      // Log concise info
      console.log({
        timestamp: new Date().toLocaleString(),
        request: {
          method: req.method,
          url: req.originalUrl,
          queryParams: req.query,
          body: req.body,
        },
        response: {
          statusCode: res.statusCode,
          responseTime: `${responseTime}ms`,
        },
        user: req.user ? req.user.id : 'anonymous', // Log user ID if available
      });
    }
  });
};

module.exports = logRequest;
