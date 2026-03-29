---
name: configure-frp
description: 'Configure frp (Fast Reverse Proxy) to expose services behind NAT or firewalls. Use when setting up frps (server) and frpc (client) configs for TCP, UDP, HTTP, HTTPS, or SOCKS5 tunnelling.'
license: Apache-2.0
compatibility: Requires frp v0.52+ binaries or Docker. Download from https://github.com/fatedier/frp/releases
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Configure frp (Fast Reverse Proxy)

frp uses a **server (frps)** running on a public host and a **client (frpc)** running behind NAT. Both must share the same `auth.token`.

## Server Config (`frps.toml`)

```toml
bindPort = 7000

auth.method = "token"
auth.token  = "change-this-secret-token"

# HTTP virtual host (optional)
vhostHTTPPort = 8080
```

## Client Config (`frpc.toml`)

```toml
serverAddr = "your-frps.example.com"
serverPort = 7000

auth.method = "token"
auth.token  = "change-this-secret-token"

[[proxies]]
name      = "my-service"
type      = "tcp"
localIP   = "127.0.0.1"
localPort = 3000
remotePort = 13000   # exposed on frps public IP
```

## Proxy Types

| type | Use case |
|------|----------|
| `tcp` | Any TCP service (SSH, DB, API) |
| `udp` | UDP services (DNS, game servers) |
| `http` | HTTP with virtual-host routing |
| `https` | HTTPS passthrough |
| `stcp` | Secure TCP (peer-to-peer, no public port) |

## Workflow

1. **Deploy frps** on a public server:
   ```bash
   # Binary
   ./frps -c frp/frps.toml

   # Docker
   docker compose -f frp/docker-compose.yml up frps -d
   ```
2. **Configure frpc** with `serverAddr` and desired `[[proxies]]`.
3. **Start frpc** on the machine behind NAT:
   ```bash
   ./frpc -c frp/frpc.toml
   ```
4. **Verify** by connecting to `<public-ip>:<remotePort>`.

## Available Examples

- `frp/examples/http-tunnel.toml` — HTTP virtual host
- `frp/examples/tcp-forward.toml` — TCP port forward
- `frp/examples/socks5.toml` — SOCKS5 via frp
- `frp/examples/ssh-access.toml` — Expose SSH

## References

- frp docs: https://gofrp.org/en/docs/
- Repository: `frp/`
