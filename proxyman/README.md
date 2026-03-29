# proxyman

[Proxyman](https://proxyman.io/) is a modern, native macOS/iOS/Windows app for intercepting, inspecting, and rewriting HTTP/HTTPS network traffic. It is primarily a development and debugging tool.

## Platforms

| Platform | Notes |
|----------|-------|
| macOS    | Full-featured native app |
| iOS      | Companion app with certificate provisioning |
| Windows  | Available via Windows app |

## Quick Start (macOS)

1. Download from [proxyman.io](https://proxyman.io/) or via Homebrew:
   ```bash
   brew install --cask proxyman
   ```
2. Launch Proxyman.
3. Install the root certificate: **Certificate → Install Certificate on this Mac**.
4. Set your system proxy (Proxyman does this automatically on start).

## SSL Interception

To intercept HTTPS traffic, install the Proxyman CA certificate:

- **macOS**: Proxyman → Certificate → Install Certificate on this Mac
- **iOS Simulator**: Proxyman → Certificate → Install Certificate to iOS Simulator
- **Physical iOS device**: Follow the wizard at Proxyman → Certificate → iOS Device

## Scripting (Addon Scripts)

Proxyman supports JavaScript/TypeScript scripting to manipulate requests and responses:

```javascript
// examples/rewrite-header.js
async function onRequest(context, url, request) {
  request.headers["X-Custom-Header"] = "proxyman-injected";
  return request;
}

async function onResponse(context, url, request, response) {
  return response;
}
```

See `examples/` for scripting patterns.

## Examples

| File | Description |
|------|-------------|
| `examples/rewrite-header.js` | Inject/modify request headers |
| `examples/mock-response.js` | Return a mocked response |
| `examples/block-request.js` | Block requests matching a pattern |
| `examples/map-local.js` | Map remote URL to a local file |
| `examples/reduce-request-count.js` | Cache GET responses in `ShareState` to deduplicate repeated requests and reduce origin hit count |

## Reducing Request Count

`examples/reduce-request-count.js` is a compact script that uses Proxyman's `ShareState` to cache successful `200 OK` GET responses for a configurable TTL (default 30 s). Any subsequent identical GET to the same URL within the TTL is served directly from the cache — no round-trip to the origin.

```javascript
const TTL = 30_000; // adjust cache lifetime in ms

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

**Counters** (visible in Proxyman's scripting console):
- `ShareState.hits` — requests served from cache (origin not called)
- `ShareState.misses` — requests forwarded to origin

## References

- [Proxyman documentation](https://docs.proxyman.io/)
- [Proxyman scripting](https://docs.proxyman.io/scripting/script)
