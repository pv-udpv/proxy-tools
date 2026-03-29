---
name: configure-v2ray
description: 'Configure v2ray or Xray-core proxies with VMess, VLESS, Shadowsocks, or SOCKS5 protocols. Use when creating or editing v2ray/Xray JSON config files with inbounds, outbounds, and routing rules.'
license: Apache-2.0
compatibility: Requires v2ray-core v5+ or Xray-core v1.8+. Download from https://github.com/XTLS/Xray-core/releases
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Configure v2ray / Xray

v2ray and Xray use a **JSON** configuration with three core sections: `inbounds`, `outbounds`, and `routing`.

## Config Skeleton

```json
{
  "log": { "loglevel": "info" },
  "inbounds": [
    {
      "port": 1080,
      "protocol": "socks",
      "settings": { "auth": "noauth", "udp": true },
      "tag": "socks-in"
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "tag": "blocked"
    }
  ],
  "routing": {
    "rules": [
      {
        "type": "field",
        "ip": ["geoip:private"],
        "outboundTag": "blocked"
      }
    ]
  }
}
```

## Protocol Quick Reference

| Protocol | Use case | Supported by |
|----------|----------|--------------|
| `vmess` | VMess proxy | v2ray, Xray |
| `vless` | Lightweight VMess | Xray |
| `shadowsocks` | SS proxy | v2ray, Xray |
| `socks` | SOCKS4/5 | v2ray, Xray |
| `trojan` | Trojan protocol | Xray |

## Transport Options (`streamSettings.network`)

`tcp` | `kcp` | `ws` (WebSocket) | `http` | `grpc` | `quic`

## Workflow

1. **Choose example** from `v2ray/examples/`:
   - `vmess-server.json` / `vmess-client.json` — VMess over WebSocket
   - `vless-xtls.json` — VLESS with TLS (Xray)
   - `shadowsocks.json` — Shadowsocks inbound
2. **Update UUIDs** (`id` field) — generate with: `cat /proc/sys/kernel/random/uuid`
3. **Update** server addresses and ports.
4. **Run**:
   ```bash
   docker compose -f v2ray/docker-compose.yml up -d
   # or: xray run -c v2ray/config.json
   ```

## References

- Xray docs: https://xtls.github.io/en_US/
- Repository: `v2ray/`
