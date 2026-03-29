---
name: setup-chisel-tunnel
description: 'Set up chisel HTTP tunnels (forward and reverse). Use when creating TCP tunnels over HTTP/S with SSH transport, exposing local ports, or creating a reverse SOCKS5 proxy via chisel.'
license: Apache-2.0
compatibility: Requires chisel v1.9+ binary or Docker. Download from https://github.com/jpillora/chisel/releases
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Set Up chisel Tunnel

chisel tunnels TCP traffic over HTTP secured with SSH. No config file required — everything is passed as CLI flags.

## Server

```bash
# Start server (on a public host)
chisel server --port 8080 --auth user:changeme --reverse
# --reverse allows clients to open ports on the server (reverse tunnels)
```

## Forward Tunnel

Forward traffic from server → client (expose client-side service):

```bash
chisel client --auth user:changeme http://server:8080 \
  <server-port>:<local-host>:<local-port>

# Example: traffic to server:9000 reaches localhost:3000 on client
chisel client --auth user:changeme http://server:8080 9000:localhost:3000
```

## Reverse Tunnel

Have the server open a port that reaches the client's network:

```bash
chisel client --auth user:changeme http://server:8080 \
  R:<server-port>:<target-host>:<target-port>

# Example: server:2222 → localhost:22 on client machine
chisel client --auth user:changeme http://server:8080 R:2222:localhost:22
```

## Reverse SOCKS5

```bash
# server with --reverse
# client with R:1080:socks
chisel client --auth user:changeme http://server:8080 R:1080:socks
# server now has SOCKS5 on :1080 routing through client's network
```

## Resilience Options

```bash
chisel client \
  --keepalive 30s \
  --max-retry-count 10 \
  --max-retry-interval 2m \
  ...
```

## Available Examples

- `chisel/examples/forward-tunnel.md`
- `chisel/examples/reverse-tunnel.md`
- `chisel/examples/socks5-reverse.md`

## References

- chisel GitHub: https://github.com/jpillora/chisel
- Repository: `chisel/`
