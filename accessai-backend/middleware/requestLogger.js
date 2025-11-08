/**
 * Request logger middleware
 * Logs all incoming requests with method, URL, status, and response time
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] --> ${req.method} ${req.url}`);
  
  // Capture original end function
  const originalEnd = res.end;
  
  // Override end function to log response
  res.end = function(...args) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    
    // Log response
    console.log(
      `[${new Date().toISOString()}] <-- ${req.method} ${req.url} | ` +
      `Status: ${statusCode} | Time: ${duration}ms`
    );
    
    // Call original end function
    originalEnd.apply(res, args);
  };
  
  next();
}

module.exports = requestLogger;
