# chisel

[chisel](https://github.com/jpillora/chisel) is a fast TCP/UDP tunnel over HTTP, secured via SSH. It is single executable including both client and server, and written in Go.

## Architecture

```
[Client machine] ---(HTTP/S + SSH)---> [chisel server] ---> [target host:port]
```

Chisel supports **reverse tunnels** (server exposes a port locally that the client can use) and **forward tunnels** (client exposes a port to the server side).

## Quick Start

### Docker

```bash
docker compose up -d
```

### Binary

```bash
# Download: https://github.com/jpillora/chisel/releases

# Start server
chisel server --port 8080 --auth user:pass

# Forward tunnel: expose local :3000 via server
chisel client --auth user:pass http://server:8080 3000:localhost:3000

# Reverse tunnel (SOCKS5): server creates SOCKS5 on :1080
chisel server --port 8080 --auth user:pass --reverse
chisel client --auth user:pass http://server:8080 R:1080:socks
```

## Examples

| File | Description |
|------|-------------|
| `examples/forward-tunnel.md` | Forward a local port through chisel |
| `examples/reverse-tunnel.md` | Expose a port from behind a NAT via reverse tunnel |
| `examples/socks5-reverse.md` | Reverse SOCKS5 proxy through chisel |

## References

- [chisel GitHub](https://github.com/jpillora/chisel)
