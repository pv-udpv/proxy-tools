# v2ray / Xray

[v2ray](https://github.com/v2fly/v2ray-core) and its fork [Xray-core](https://github.com/XTLS/Xray-core) are powerful proxy platforms supporting VMess, VLESS, Trojan, Shadowsocks, SOCKS, HTTP, and many other protocols with multiplexing, routing, and transport obfuscation.

## Quick Start

### Docker (Xray)

```bash
docker compose up -d
```

### Binary

```bash
# Download Xray: https://github.com/XTLS/Xray-core/releases
xray run -c config.json
```

## Configuration Layout

```
v2ray/
├── config.json             # Main config (VLESS inbound + outbound)
├── docker-compose.yml
└── examples/
    ├── vmess-server.json   # VMess server
    ├── vmess-client.json   # VMess client
    ├── vless-xtls.json     # VLESS + XTLS (Xray only)
    └── shadowsocks.json    # Shadowsocks inbound
```

## Key Concepts

| Concept   | Description                                              |
|-----------|----------------------------------------------------------|
| Inbound   | How v2ray/Xray accepts connections from clients          |
| Outbound  | How it connects to destinations or upstreams             |
| Routing   | Rules to direct traffic between inbounds and outbounds   |
| Transport | Underlying transport: TCP, WebSocket, gRPC, QUIC, etc.   |

## References

- [v2fly documentation](https://www.v2fly.org/en_US/)
- [Xray documentation](https://xtls.github.io/en_US/)
- [v2ray GitHub](https://github.com/v2fly/v2ray-core)
- [Xray GitHub](https://github.com/XTLS/Xray-core)
