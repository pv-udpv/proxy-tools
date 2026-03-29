---
name: proxy-chain-setup
description: 'Set up a proxy chain (proxy-over-proxy) to route traffic through multiple sequential hops. Use when routing traffic through two or more proxies for anonymity, segmentation, or reaching isolated networks.'
license: Apache-2.0
compatibility: Requires at least two proxy endpoints. Supported by go-gost (chains), proxychains-ng, and SSH ProxyJump.
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: bash
---

# Proxy Chain Setup

A proxy chain routes traffic through multiple sequential proxy nodes before reaching the destination. This is useful for bypassing network segmentation or layering trust boundaries.

## Option 1 — go-gost Chains (recommended)

go-gost natively supports multi-hop chains via `chains` in `config.yaml`:

```yaml
services:
  - name: entry
    addr: ":8080"
    handler:
      type: http+socks5
    listener:
      type: tcp
    chain: two-hop-chain

chains:
  - name: two-hop-chain
    hops:
      - name: hop1
        nodes:
          - name: proxy1
            addr: proxy1.example.com:1080
            connector:
              type: socks5
              auth: { username: u1, password: p1 }
      - name: hop2
        nodes:
          - name: proxy2
            addr: proxy2.example.com:8080
            connector:
              type: http
              auth: { username: u2, password: p2 }
```

See `go-gost/examples/chain-proxy.yaml`.

## Option 2 — proxychains-ng

```ini
# /etc/proxychains.conf
strict_chain          # enforce exact order
proxy_dns

[ProxyList]
socks5  proxy1.example.com  1080  user1  pass1
socks5  proxy2.example.com  1080  user2  pass2
```

```bash
proxychains curl https://example.com
proxychains nmap -sT target-host
```

## Option 3 — SSH ProxyJump

```bash
# Jump through bastion1 to reach target
ssh -J user@bastion1.example.com user@target.internal

# Three hops
ssh -J user@hop1,user@hop2 user@target.internal
```

SSH config equivalent:
```
Host target.internal
    ProxyJump bastion1.example.com
    User deploy
```

## Verification

```bash
# Check your exit IP through the chain
curl --proxy socks5h://localhost:8080 https://api.ipify.org
```

## References

- go-gost chain docs: https://gost.run/en/concepts/chain/
- proxychains-ng: https://github.com/haad/proxychains
- Repository: `go-gost/examples/chain-proxy.yaml`
