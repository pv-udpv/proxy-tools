# HAProxy

[HAProxy](https://www.haproxy.org/) is a high-performance TCP/HTTP load balancer and proxy. It is widely used for front-end load balancing, SSL termination, and TCP proxying.

## Quick Start

### Docker

```bash
docker compose up -d
```

### System HAProxy

```bash
sudo cp haproxy.cfg /etc/haproxy/haproxy.cfg
sudo haproxy -c -f /etc/haproxy/haproxy.cfg  # validate
sudo systemctl reload haproxy
```

## Configuration Layout

```
haproxy/
├── haproxy.cfg             # Main config
├── docker-compose.yml
└── examples/
    ├── tcp-proxy.cfg       # Raw TCP load balancing
    ├── http-proxy.cfg      # HTTP load balancing with health checks
    ├── ssl-termination.cfg # TLS termination
    └── acl-routing.cfg     # ACL-based request routing
```

## Key Sections

| Section   | Purpose                                         |
|-----------|-------------------------------------------------|
| `global`  | Process-level settings (logging, tuning, TLS)   |
| `defaults`| Default parameters for frontends and backends   |
| `frontend`| Accepts incoming connections                    |
| `backend`  | Pool of servers to forward requests to          |
| `listen`  | Shorthand combining frontend + backend          |

## Stats Page

Access the HAProxy stats page at `http://localhost:8404/stats`.

## References

- [HAProxy documentation](https://docs.haproxy.org/)
- [HAProxy configuration manual](https://www.haproxy.org/download/2.9/doc/configuration.txt)
