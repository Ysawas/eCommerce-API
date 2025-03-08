function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
  
  module.exports = errorHandler;