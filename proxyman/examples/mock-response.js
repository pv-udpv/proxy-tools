// Proxyman Addon Script — Return a mock response
// Use case: Mock an API endpoint during development

async function onRequest(context, url, request) {
  // Intercept and return a mock response immediately
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Mocked-By": "proxyman"
    },
    body: JSON.stringify({
      status: "ok",
      data: {
        id: 1,
        name: "Mock User",
        email: "mock@example.com"
      }
    })
  };
}
