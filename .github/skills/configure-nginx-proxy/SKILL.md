---
name: configure-nginx-proxy
description: 'Configure nginx as a reverse proxy, load balancer, stream (TCP/UDP) proxy, SSL termination frontend, or HTTP forward proxy. Use when working with nginx.conf or nginx stream module configs.'
license: Apache-2.0
compatibility: Requires nginx with --with-stream for TCP/UDP. For HTTP CONNECT proxy, requires ngx_http_proxy_connect_module patch.
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Configure nginx as a Proxy

nginx operates in two main modes for proxying: **http** (L7) and **stream** (L4 TCP/UDP).

## HTTP Reverse Proxy (Layer 7)

```nginx
# In http {} block
upstream backend_pool {
    least_conn;
    server backend1.internal:8080;
    server backend2.internal:8080;
    keepalive 32;
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass         http://backend_pool;
        proxy_http_version 1.1;
        proxy_set_header   Connection        "";
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

## TCP/UDP Stream Proxy (Layer 4)

```nginx
# Top-level stream {} block (not inside http {})
stream {
    upstream db_pool {
        server db1.internal:5432;
        server db2.internal:5432;
    }
    server {
        listen 5432;
        proxy_pass db_pool;
    }
}
```

## SSL Termination

```nginx
server {
    listen 443 ssl;
    ssl_certificate     /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    location / { proxy_pass http://backend.internal:8080; }
}
```

## Workflow

1. **Choose the scenario** from `nginx/examples/`:
   - `reverse-proxy.conf` — HTTP virtual-host reverse proxy
   - `stream-proxy.conf` — TCP/UDP forwarding
   - `ssl-termination.conf` — HTTPS termination
   - `load-balancer.conf` — Multi-server load balancing
   - `forward-proxy.conf` — HTTP CONNECT forward proxy
2. **Copy** the relevant snippet into `nginx/nginx.conf`.
3. **Validate**: `nginx -t -c nginx/nginx.conf`
4. **Run**:
   ```bash
   docker compose -f nginx/docker-compose.yml up -d
   ```

## References

- nginx docs: https://nginx.org/en/docs/
- Repository: `nginx/`
