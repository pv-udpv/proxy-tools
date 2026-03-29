// Proxyman Addon Script — Block requests matching a pattern

async function onRequest(context, url, request) {
  const blockedDomains = [
    "analytics.example.com",
    "tracking.ad-network.com",
    "telemetry.app.com"
  ];

  const urlObj = new URL(url);
  if (blockedDomains.some(d => urlObj.hostname.endsWith(d))) {
    // Return a 403 to block the request
    return {
      statusCode: 403,
      headers: { "Content-Type": "text/plain" },
      body: "Blocked by Proxyman script"
    };
  }

  return request;
}
