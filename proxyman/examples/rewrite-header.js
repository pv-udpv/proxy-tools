// Proxyman Addon Script — Inject/modify request headers
// Apply to: Tools > Scripting > Add Script > Request/Response

async function onRequest(context, url, request) {
  // Add a custom header to all matching requests
  request.headers["X-Debug-Source"] = "proxyman";
  request.headers["X-Forwarded-For"] = "127.0.0.1";

  // Remove a sensitive header
  delete request.headers["Authorization"];

  return request;
}

async function onResponse(context, url, request, response) {
  // Add CORS headers to all responses
  response.headers["Access-Control-Allow-Origin"] = "*";
  response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
  return response;
}
