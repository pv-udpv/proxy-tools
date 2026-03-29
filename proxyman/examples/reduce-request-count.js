// reduce-request-count.js
// Compact response cache that deduplicates identical GET requests.
// Repeated calls to the same URL within TTL are served from ShareState
// instead of forwarding to the origin — reducing actual request count.
//
// ShareState.hits  → number of requests served from cache this session
// ShareState.misses → number of requests forwarded to origin this session

const TTL = 30_000; // cache lifetime in ms (30 s); adjust as needed

async function onRequest(context, url, request) {
  if (request.method !== "GET") return request;

  const entry = (ShareState.cache ??= {})[url];
  if (entry && Date.now() - entry.ts < TTL) {
    ShareState.hits = (ShareState.hits ?? 0) + 1;
    return { statusCode: entry.code, headers: entry.headers, body: entry.body };
  }

  ShareState.misses = (ShareState.misses ?? 0) + 1;
  return request;
}

async function onResponse(context, url, request, response) {
  if (request.method === "GET" && response.statusCode === 200)
    (ShareState.cache ??= {})[url] = { ts: Date.now(), code: response.statusCode, headers: response.headers, body: response.body };
  return response;
}
