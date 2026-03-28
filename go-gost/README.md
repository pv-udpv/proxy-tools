# go-gost

[gost](https://github.com/go-gost/gost) (Go Simple Tunnel) is a security tunnel written in Go that supports SOCKS4/5, HTTP, HTTPS, HTTP/2, TCP/UDP forwarding, SSH, WebSocket, TLS, KCP, QUIC, and many other protocols.

## Quick Start

### Docker

```bash
docker compose up -d
```

### Binary

Download the latest release from https://github.com/go-gost/gost/releases, then:

```bash
# Run with a config file
gost -C config.yaml

# Run inline (SOCKS5 proxy on port 1080)
gost -L socks5://:1080
```

## Configuration

The main configuration file is `config.yaml`. Copy it and modify as needed.

### Key concepts

| Concept   | Description                                                   |
|-----------|---------------------------------------------------------------|
| Service   | A listener that accepts incoming connections                  |
| Chain     | A sequence of proxy nodes to route traffic through            |
| Node      | A single proxy endpoint in a chain                            |
| Handler   | Protocol handler (socks5, http, tcp, etc.)                    |
| Listener  | Transport listener (tcp, udp, ws, tls, quic, etc.)            |

## Examples

| File | Description |
|------|-------------|
| `examples/socks5-proxy.yaml` | Simple SOCKS5 proxy server |
| `examples/http-proxy.yaml` | HTTP/HTTPS CONNECT proxy |
| `examples/ssh-tunnel.yaml` | SSH port forwarding tunnel |
| `examples/chain-proxy.yaml` | Chained proxy (proxy-over-proxy) |
| `examples/port-forward.yaml` | TCP/UDP port forwarding |
| `examples/tls-proxy.yaml` | TLS-encrypted proxy |
| `examples/dns-over-tls.yaml` | DNS-over-TLS resolver |

## Common Use Cases

### Simple SOCKS5 proxy

```bash
gost -L socks5://:1080
```

### HTTP + SOCKS5 on same port

```bash
gost -L "http+socks5://:8080"
```

### Forward local port to remote

```bash
gost -L tcp://:8080 -F socks5://remote-proxy:1080
```

### Chain two proxies

```bash
gost -L :8080 -F http://proxy1:8080 -F socks5://proxy2:1080
```

## References

- [gost v3 documentation](https://gost.run/en/)
- [GitHub repository](https://github.com/go-gost/gost)
