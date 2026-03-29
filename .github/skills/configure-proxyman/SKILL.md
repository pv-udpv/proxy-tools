---
name: configure-proxyman
description: 'Configure Proxyman for HTTP/HTTPS traffic interception on macOS/iOS. Use when writing Proxyman addon scripts to rewrite headers, mock responses, block requests, or map URLs to local fixtures.'
license: Apache-2.0
compatibility: Requires Proxyman 5.x on macOS 13+ or Windows 11+. Download from https://proxyman.io/
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: bash
---

# Configure Proxyman

Proxyman is a native macOS/Windows GUI tool that intercepts HTTP/HTTPS traffic via a local proxy. Addon Scripts use JavaScript to modify requests and responses programmatically.

## Certificate Installation

```bash
# macOS via Homebrew
brew install --cask proxyman
```

Then: **Proxyman → Certificate → Install Certificate on this Mac** (requires Trust in Keychain).

For iOS Simulator: **Certificate → Install Certificate to iOS Simulator**.

## Addon Script Structure

Every script exports `onRequest` and/or `onResponse`:

```javascript
// onRequest: modify the request before it is sent upstream
async function onRequest(context, url, request) {
  // Modify headers
  request.headers["X-Custom"] = "value";
  // To return a mock response immediately (bypasses upstream):
  // return { statusCode: 200, headers: {}, body: "mock" };
  return request;
}

// onResponse: modify the response before it reaches the client
async function onResponse(context, url, request, response) {
  response.headers["X-Via-Proxyman"] = "true";
  return response;
}
```

## Common Patterns

| File | What it does |
|------|-------------|
| `proxyman/examples/rewrite-header.js` | Inject/remove request and response headers |
| `proxyman/examples/mock-response.js` | Return a fake response without hitting the server |
| `proxyman/examples/block-request.js` | Block matching URLs with a 403 |
| `proxyman/examples/map-local.js` | Return local fixture data instead of real API |
| `proxyman/examples/reduce-request-count.js` | Cache GET responses in `ShareState`; serve cache hits instead of forwarding — reduces origin request count |

## Reducing Request Count (Compact Cache Script)

`reduce-request-count.js` caches `200 OK` GET responses for a configurable TTL using `ShareState`.  
Repeated requests to the same URL within the TTL return the cached response immediately — the origin server is never called.

```javascript
const TTL = 30_000; // 30 s — adjust as needed

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
```

Check `ShareState.hits` / `ShareState.misses` in the Proxyman console to see the reduction.

## Workflow

1. Open Proxyman → **Tools → Scripting → Add Script**.
2. Set the **URL filter** (e.g. `https://api.example.com/*`).
3. Choose **Request** or **Response** phase (or both).
4. Paste/adapt a script from `proxyman/examples/`.
5. Enable the script and make the relevant network request.

## References

- Proxyman docs: https://docs.proxyman.io/
- Repository: `proxyman/`
