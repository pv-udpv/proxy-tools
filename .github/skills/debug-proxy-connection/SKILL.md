---
name: debug-proxy-connection
description: 'Debug proxy connection issues including connectivity, authentication, TLS errors, and DNS resolution. Use when a proxy is not forwarding traffic, returning errors, or timing out.'
license: Apache-2.0
compatibility: Requires curl, nc (netcat), openssl, and the relevant proxy tool.
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: bash
---

# Debug Proxy Connection Issues

## Step 1 — Verify the proxy port is listening

```bash
nc -zv <proxy-host> <proxy-port>
# or
ss -tlnp | grep <proxy-port>
```

## Step 2 — Test HTTP proxy connectivity

```bash
# HTTP proxy
curl -v --proxy http://<proxy-host>:<port> http://httpbin.org/ip

# HTTP proxy with authentication
curl -v --proxy http://user:pass@<proxy-host>:<port> http://httpbin.org/ip

# HTTPS through HTTP proxy (CONNECT tunnel)
curl -v --proxy http://<proxy-host>:<port> https://httpbin.org/ip
```

## Step 3 — Test SOCKS5 proxy

```bash
# SOCKS5 (hostname resolution on proxy side)
curl -v --proxy socks5h://<proxy-host>:<port> https://httpbin.org/ip

# SOCKS5 with auth
curl -v --proxy socks5h://user:pass@<proxy-host>:<port> https://httpbin.org/ip
```

## Step 4 — Check TLS certificate issues

```bash
# Inspect the TLS certificate presented by the proxy
openssl s_client -connect <proxy-host>:<port>

# Check if the CA cert is trusted
curl --cacert /path/to/ca.crt --proxy https://<proxy-host>:<port> https://example.com
```

## Step 5 — Test DNS resolution through proxy

```bash
# SOCKS5h resolves DNS on the proxy side — if this fails, DNS is broken on proxy
curl -v --proxy socks5h://<proxy-host>:<port> http://google.com
```

## Step 6 — Enable verbose logging per tool

| Tool | How to enable debug logs |
|------|--------------------------|
| go-gost | `log.level: debug` in `config.yaml` |
| Envoy | `--log-level debug` or `admin: /logging?level=debug` |
| nginx | `error_log /var/log/nginx/error.log debug;` |
| HAProxy | `log stdout format raw local0 debug` in `global` |
| Traefik | `log.level: DEBUG` in `traefik.yml` |
| frp | `log.level = "debug"` in `frps.toml` / `frpc.toml` |
| chisel | Add `--verbose` flag |

## Step 7 — Common errors and fixes

| Error | Likely cause | Fix |
|-------|-------------|-----|
| `Connection refused` | Service not running / wrong port | Check `docker ps`, verify port |
| `407 Proxy Auth Required` | Missing credentials | Add `--proxy-user user:pass` |
| `SSL_ERROR` / cert mismatch | Wrong CA or SNI | Use `--insecure` for testing; fix certs for prod |
| `Connection timed out` | Firewall blocking | Check `iptables`/security groups |
| `SOCKS5 handshake failed` | Wrong SOCKS version | Try `socks4://` vs `socks5://` |

## References

- curl proxy docs: https://curl.se/docs/manpage.html#-x
- Repository: all tool `examples/` directories
