---
name: configure-traefik
description: 'Configure Traefik reverse proxy with Docker provider, Let\'s Encrypt TLS, middlewares (auth, rate-limit, headers), or TCP routing. Use when creating or editing traefik.yml and dynamic config files.'
license: Apache-2.0
compatibility: Requires Traefik v3.x. Available as traefik:v3.1 Docker image.
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Configure Traefik

Traefik separates **static configuration** (`traefik.yml`) from **dynamic configuration** (Docker labels or file provider).

## Static Config (`traefik.yml`)

```yaml
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    exposedByDefault: false
  file:
    filename: /etc/traefik/dynamic.yml

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@example.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
```

## Dynamic Config (File Provider)

```yaml
http:
  routers:
    my-router:
      rule: "Host(`app.example.com`)"
      entryPoints: [websecure]
      service: my-service
      tls:
        certResolver: letsencrypt

  services:
    my-service:
      loadBalancer:
        servers:
          - url: "http://app.internal:3000"
```

## Docker Labels

```yaml
# docker-compose.yml service labels
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.app.rule=Host(`app.example.com`)"
  - "traefik.http.routers.app.entrypoints=websecure"
  - "traefik.http.routers.app.tls.certresolver=letsencrypt"
  - "traefik.http.services.app.loadbalancer.server.port=3000"
```

## Workflow

1. **Edit `traefik/traefik.yml`** — configure entrypoints and providers.
2. **Add routing** in `traefik/examples/dynamic-config.yml` or via Docker labels.
3. **Add middlewares** from `traefik/examples/middlewares.yml` (auth, rate-limit, headers).
4. **Run**: `docker compose -f traefik/docker-compose.yml up -d`
5. **Dashboard**: `http://localhost:8080`

## Available Examples

- `traefik/examples/dynamic-config.yml` — routers + services + health checks
- `traefik/examples/tls-letsencrypt.yml` — automatic HTTPS
- `traefik/examples/middlewares.yml` — auth, rate-limit, IP allowlist
- `traefik/examples/tcp-proxy.yml` — TCP database routing

## References

- Traefik docs: https://doc.traefik.io/traefik/
- Repository: `traefik/`
