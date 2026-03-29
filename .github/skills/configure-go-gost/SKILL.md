---
name: configure-go-gost
description: 'Configure go-gost (Go Simple Tunnel) proxy. Use when setting up SOCKS5/HTTP proxies, port forwarding, proxy chaining, SSH tunnels, TLS-encrypted proxies, or DNS-over-TLS with go-gost v3.'
license: Apache-2.0
compatibility: Requires go-gost v3 binary or Docker. Download from https://github.com/go-gost/gost/releases
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Configure go-gost

go-gost v3 uses a YAML configuration file (`config.yaml`) with three main sections: **services**, **chains**, and **resolvers**.

## Configuration Structure

```yaml
log:
  level: info   # debug | info | warn | error

services:
  - name: <service-name>
    addr: ":PORT"
    handler:
      type: <handler>   # socks5 | http | tcp | udp | dns | sshd
      auth:             # optional
        username: user
        password: pass
    listener:
      type: <listener>  # tcp | udp | tls | ws | wss | quic | ssh
    chain: <chain-name> # optional: route through a chain
    forwarder:          # for tcp/udp handlers: explicit destination
      nodes:
        - name: target
          addr: host:port

chains:
  - name: <chain-name>
    hops:
      - name: <hop-name>
        nodes:
          - name: <node-name>
            addr: proxy-host:port
            connector:
              type: <connector>  # socks5 | http | ssh | direct
              auth:
                username: user
                password: pass
            dialer:
              type: <dialer>     # tcp | tls | ws | ssh
```

## Common Handler/Listener Combinations

| Use case | handler | listener |
|----------|---------|----------|
| SOCKS5 proxy | `socks5` | `tcp` |
| HTTP proxy | `http` | `tcp` |
| HTTP+SOCKS5 auto-detect | `http+socks5` | `tcp` |
| TCP port forward | `tcp` | `tcp` |
| UDP port forward | `udp` | `udp` |
| SSH tunnel | `sshd` | `tcp` |
| TLS-encrypted proxy | `socks5` | `tls` |

## Workflow

1. **Identify the scenario** (SOCKS5, HTTP, TCP forward, chain, SSH, TLS, DNS).
2. **Select the right example** from `go-gost/examples/`.
3. **Copy and adapt** `go-gost/config.yaml` — replace placeholder addresses and credentials.
4. **Start the service**:
   ```bash
   # Binary
   gost -C go-gost/config.yaml

   # Docker
   docker compose -f go-gost/docker-compose.yml up -d
   ```
5. **Verify** using `curl`, `nc`, or a SOCKS5-capable tool:
   ```bash
   curl --proxy socks5://localhost:1080 https://example.com
   ```

## Available Examples

- `go-gost/examples/socks5-proxy.yaml` — SOCKS5 (with/without auth)
- `go-gost/examples/http-proxy.yaml` — HTTP/HTTPS CONNECT proxy
- `go-gost/examples/ssh-tunnel.yaml` — SSH port forwarding
- `go-gost/examples/chain-proxy.yaml` — Chained proxy (two hops)
- `go-gost/examples/port-forward.yaml` — TCP/UDP port forwarding
- `go-gost/examples/tls-proxy.yaml` — TLS-encrypted SOCKS5
- `go-gost/examples/dns-over-tls.yaml` — DNS-over-TLS / DNS-over-HTTPS

## References

- [go-gost v3 docs](https://gost.run/en/)
- Repository: `go-gost/`
