# frp (Fast Reverse Proxy)

[frp](https://github.com/fatedier/frp) is a fast reverse proxy that allows you to expose a local server behind a NAT or firewall to the internet. It supports TCP, UDP, HTTP, HTTPS, and STCP protocols with a server/client model.

## Architecture

```
[Internet] ----> [frps (server, public IP)] <---- [frpc (client, behind NAT)]
                        |
                        +-----> local service
```

## Quick Start

### Docker

```bash
# Start server and client together
docker compose up -d
```

### Binary

```bash
# Download from https://github.com/fatedier/frp/releases
# Run server
./frps -c frps.toml

# Run client
./frpc -c frpc.toml
```

## Configuration

| File | Role |
|------|------|
| `frps.toml` | Server configuration (runs on public host) |
| `frpc.toml` | Client configuration (runs behind NAT/firewall) |

## Examples

| File | Description |
|------|-------------|
| `examples/http-tunnel.toml` | Expose a local HTTP service via frp |
| `examples/tcp-forward.toml` | Forward a raw TCP port |
| `examples/socks5.toml` | SOCKS5 proxy via frp |
| `examples/ssh-access.toml` | Expose local SSH through frp |

## Security

- Always set `auth.token` in both frps and frpc configs
- Use TLS (`transport.tls.enable = true`) in production
- Restrict `allowPorts` on the server to limit exposed ports

## References

- [frp GitHub](https://github.com/fatedier/frp)
- [frp documentation](https://gofrp.org/en/docs/)
