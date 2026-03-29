---
name: configure-haproxy
description: 'Configure HAProxy for TCP or HTTP load balancing, SSL/TLS termination, and ACL-based routing. Use when creating or editing haproxy.cfg files for frontends, backends, and listen sections.'
license: Apache-2.0
compatibility: Requires HAProxy 2.8+ (LTS). Available as haproxy:lts-alpine Docker image.
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Configure HAProxy

HAProxy configuration has four main sections: `global`, `defaults`, `frontend`, and `backend`.

## Config Skeleton

```
global
    log stdout format raw local0 info
    maxconn 50000

defaults
    log    global
    mode   http          # or tcp for L4
    option httplog
    timeout connect 5s
    timeout client  30s
    timeout server  30s

frontend http_front
    bind *:80
    default_backend app_back

backend app_back
    balance roundrobin
    option httpchk GET /healthz
    server web1 web1.internal:8080 check
    server web2 web2.internal:8080 check
```

## Modes

| Mode | Use case |
|------|----------|
| `http` | HTTP/1.1 and HTTP/2 (L7) — inspect/route by URL, headers |
| `tcp` | Raw TCP proxy (L4) — databases, SMTP, Redis |

## Load Balancing Algorithms

`roundrobin` | `leastconn` | `source` (IP hash) | `uri` | `random`

## Workflow

1. **Choose example** from `haproxy/examples/`:
   - `http-proxy.cfg` — HTTP load balancing with health checks
   - `tcp-proxy.cfg` — TCP (MySQL, Redis)
   - `ssl-termination.cfg` — HTTPS termination
   - `acl-routing.cfg` — Route by host/path/IP
2. **Validate**:
   ```bash
   haproxy -c -f haproxy/haproxy.cfg
   # or via Docker:
   docker run --rm -v $(pwd)/haproxy/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro \
     haproxy:lts-alpine haproxy -c -f /usr/local/etc/haproxy/haproxy.cfg
   ```
3. **Run**: `docker compose -f haproxy/docker-compose.yml up -d`
4. **Stats**: visit `http://localhost:8404/stats`

## TLS Certificate Format

HAProxy expects a single PEM file: `cat fullchain.pem privkey.pem > server.pem`

## References

- HAProxy docs: https://docs.haproxy.org/
- Repository: `haproxy/`
