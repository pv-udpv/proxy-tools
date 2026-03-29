# Traefik

[Traefik](https://traefik.io/traefik/) is a modern HTTP reverse proxy and load balancer that integrates natively with Docker, Kubernetes, and other orchestration systems. It supports automatic TLS via Let's Encrypt and dynamic configuration discovery.

## Quick Start

### Docker

```bash
docker compose up -d
```

### Binary

```bash
traefik --configFile=traefik.yml
```

## Configuration Layout

```
traefik/
├── traefik.yml             # Static configuration (entrypoints, providers)
├── docker-compose.yml
└── examples/
    ├── dynamic-config.yml  # Dynamic routing rules (file provider)
    ├── tls-letsencrypt.yml # Automatic TLS with Let's Encrypt
    ├── middlewares.yml     # Auth, rate-limiting, headers middlewares
    └── tcp-proxy.yml       # TCP routing
```

## Key Concepts

| Concept      | Description                                             |
|--------------|---------------------------------------------------------|
| Entrypoint   | Network entry points (ports 80, 443, etc.)              |
| Router       | Matches incoming requests and dispatches to a service   |
| Middleware   | Transforms requests (auth, redirect, headers, etc.)     |
| Service      | The actual upstream backend                             |
| Provider     | Configuration source (Docker, Kubernetes, files, etc.)  |

## Dashboard

Access the Traefik dashboard at `http://localhost:8080`.

## References

- [Traefik documentation](https://doc.traefik.io/traefik/)
- [Traefik Docker provider](https://doc.traefik.io/traefik/providers/docker/)
- [Let's Encrypt integration](https://doc.traefik.io/traefik/https/acme/)
