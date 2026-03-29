// Proxyman Addon Script — Map a remote URL to a local file response
// Use case: Serve a local JSON fixture instead of hitting the real API

async function onRequest(context, url, request) {
  if (url.includes("/api/v1/users")) {
    // Read a local fixture file (Proxyman supports readFile in scripts)
    const localData = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ];

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localData)
    };
  }

  // Pass through all other requests unchanged
  return request;
}
