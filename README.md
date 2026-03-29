# proxy-tools

A comprehensive collection of configurations, examples, agent skills, and cookbook notebooks for the most popular proxy tools.

[![Powered by Awesome Copilot](https://img.shields.io/badge/Powered_by-Awesome_Copilot-blue?logo=githubcopilot)](https://github.com/github/awesome-copilot)

## Tools

| Tool | Layer | Protocols | Best for | Directory |
|------|-------|-----------|----------|-----------|
| [go-gost](https://github.com/go-gost/gost) | L4/L7 | SOCKS5, HTTP, TCP, UDP, SSH, TLS | Flexible proxy chaining | [`go-gost/`](go-gost/) |
| [Envoy](https://www.envoyproxy.io/) | L4/L7 | HTTP/1–2, gRPC, TCP, TLS | Service mesh, advanced routing | [`envoy/`](envoy/) |
| [nginx](https://nginx.org/) | L4/L7 | HTTP, HTTPS, TCP, UDP | Reverse proxy, load balancing | [`nginx/`](nginx/) |
| [ligolo-ng](https://github.com/nicocha30/ligolo-ng) | L3 | TUN tunnel over TLS | Red-team network pivoting | [`ligolo-ng/`](ligolo-ng/) |
| [frp](https://github.com/fatedier/frp) | L4/L7 | TCP, UDP, HTTP, HTTPS | Expose services behind NAT | [`frp/`](frp/) |
| [chisel](https://github.com/jpillora/chisel) | L4 | TCP over HTTP/SSH | Quick HTTP tunnel | [`chisel/`](chisel/) |
| [v2ray / Xray](https://github.com/XTLS/Xray-core) | L4/L7 | VMess, VLESS, SS, SOCKS5 | Protocol obfuscation | [`v2ray/`](v2ray/) |
| [HAProxy](https://www.haproxy.org/) | L4/L7 | TCP, HTTP | High-performance load balancing | [`haproxy/`](haproxy/) |
| [Traefik](https://traefik.io/traefik/) | L7 | HTTP, HTTPS, TCP | Docker/K8s ingress, auto-TLS | [`traefik/`](traefik/) |
| [Proxyman](https://proxyman.io/) | L7 | HTTP/HTTPS intercept | macOS/iOS debugging & scripting | [`proxyman/`](proxyman/) |

## Repository Layout

```
proxy-tools/
├── go-gost/            YAML configs (SOCKS5, HTTP, chain, SSH, TLS, DNS-over-TLS)
├── envoy/              Envoy bootstrap YAML (HTTP, TCP, TLS, gRPC)
├── nginx/              nginx.conf + stream, reverse-proxy, SSL, load-balancer examples
├── ligolo-ng/          Pivot tunnel setup guides (proxy + agent + multi-hop)
├── frp/                frps/frpc TOML configs + examples
├── chisel/             Forward/reverse tunnel and SOCKS5 examples
├── v2ray/              VMess, VLESS, Shadowsocks JSON configs
├── haproxy/            HAProxy CFG (TCP, HTTP, SSL, ACL routing)
├── proxyman/           JS addon scripts (headers, mock, block, cache/dedup)
├── traefik/            Static + dynamic YAML, middlewares, TCP routing
├── cookbook/
│   ├── README.md       Cookbook overview
│   ├── cookbook.yml    Machine-readable recipe manifest
│   └── notebooks/      11 Jupyter notebooks (01–11)
└── .github/
    ├── copilot-instructions.md   Project-wide Copilot guidance
    ├── workflows/
    │   └── copilot-setup-steps.yml   Copilot agent environment setup
    └── skills/         12 agent skills in v2.0 SKILL.md format
```

## Copilot Agent Skills

Skills are in `.github/skills/` following the [v2.0 SKILL.md format](https://agentskills.io/specification). Each skill teaches GitHub Copilot how to work with a specific proxy tool.

| Skill | Description |
|-------|-------------|
| `configure-go-gost` | SOCKS5/HTTP proxy, port forwarding, chaining with go-gost |
| `configure-nginx-proxy` | nginx reverse proxy, stream, SSL, load balancing |
| `configure-envoy-proxy` | Envoy HTTP/TCP routing, TLS, gRPC |
| `setup-ligolo-ng` | TUN-based pivoting, listeners, multi-hop |
| `configure-frp` | frps/frpc setup, TCP/HTTP/SSH tunnels |
| `setup-chisel-tunnel` | Forward/reverse HTTP tunnels, reverse SOCKS5 |
| `configure-v2ray` | VMess, VLESS, Shadowsocks, SOCKS5 protocols |
| `configure-haproxy` | TCP/HTTP load balancing, SSL, ACL routing |
| `configure-traefik` | Docker ingress, Let's Encrypt, middlewares |
| `configure-proxyman` | macOS intercept scripts, request count reduction |
| `proxy-chain-setup` | Multi-hop chains via go-gost, proxychains, SSH |
| `debug-proxy-connection` | Systematic debugging of proxy issues |

## Cookbook Notebooks

Interactive Jupyter notebooks in [`cookbook/notebooks/`](cookbook/notebooks/):

| Notebook | Topic |
|----------|-------|
| `01-getting-started` | Tool comparison and prerequisites check |
| `02-go-gost` | SOCKS5/HTTP proxy and chain config generation |
| `03-nginx-proxy` | nginx config generation and validation |
| `04-envoy-proxy` | Envoy YAML generation and admin API |
| `05-ligolo-ng-pivoting` | Pivot setup scripts and port redirect helpers |
| `06-frp-tunnel` | frps/frpc config generation |
| `07-chisel-tunnel` | Tunnel mode reference and command builder |
| `08-v2ray-xray` | UUID generation, VMess/VLESS config builders |
| `09-haproxy` | Load balancer and ACL config generation |
| `10-traefik` | traefik.yml and Docker label generation |
| `11-proxy-chaining` | Multi-hop chain config and proxychains |

```bash
pip install jupyter pyyaml
jupyter notebook cookbook/notebooks/01-getting-started.ipynb
```

## Copilot Setup

The repository includes `.github/workflows/copilot-setup-steps.yml` (based on the [awesome-copilot](https://github.com/github/awesome-copilot) pattern) which pre-installs Go, Python/Jupyter, yamllint, the gh-aw MCP extension, and the go-gost/frp/chisel binaries before the Copilot coding agent starts.
