# nginx

[nginx](https://nginx.org/) is a high-performance HTTP server, reverse proxy, and load balancer. It can also act as a TCP/UDP proxy via its `stream` module, and as an HTTP CONNECT proxy with the `ngx_http_proxy_connect_module`.

## Quick Start

### Docker

```bash
docker compose up -d
```

### System nginx

```bash
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo nginx -t && sudo nginx -s reload
```

## Configuration Layout

```
nginx/
├── nginx.conf              # Main config (HTTP reverse-proxy)
├── docker-compose.yml
└── examples/
    ├── reverse-proxy.conf  # Virtual-host reverse proxy
    ├── stream-proxy.conf   # TCP/UDP stream proxy
    ├── ssl-termination.conf# HTTPS termination
    ├── load-balancer.conf  # Upstream load balancing
    └── forward-proxy.conf  # HTTP forward proxy (CONNECT)
```

## Common Directives

| Directive              | Purpose                                       |
|------------------------|-----------------------------------------------|
| `proxy_pass`           | Forward request to upstream                   |
| `upstream`             | Define a pool of backend servers              |
| `proxy_set_header`     | Modify request headers before forwarding      |
| `ssl_certificate`      | Path to TLS certificate                       |
| `stream {}`            | TCP/UDP proxy block (requires stream module)  |

## Testing

```bash
# Test configuration syntax
nginx -t

# Reload without downtime
nginx -s reload

# Tail access log
tail -f /var/log/nginx/access.log
```

## References

- [nginx documentation](https://nginx.org/en/docs/)
- [nginx stream module](https://nginx.org/en/docs/stream/ngx_stream_proxy_module.html)
- [nginx as HTTP forward proxy](https://github.com/chobits/ngx_http_proxy_connect_module)
