# ligolo-ng Proxy Setup (Operator Machine)

## Prerequisites

- Linux with TUN/TAP support
- `ligolo-ng proxy` binary

## Setup Steps

### 1. Create TUN interface

```bash
sudo ip tuntap add user $USER mode tun ligolo
sudo ip link set ligolo up
```

### 2. Generate or use self-signed certificate

```bash
# Self-signed (for testing):
./proxy -selfcert -laddr 0.0.0.0:11601

# Custom certificate:
./proxy -certfile server.crt -keyfile server.key -laddr 0.0.0.0:11601
```

### 3. Using the interactive shell

Once a session is established, the proxy presents an interactive shell:

```
ligolo-ng » help         # List commands
ligolo-ng » session      # List/select active agent sessions
ligolo-ng » start        # Start tunnel on selected session
ligolo-ng » stop         # Stop active tunnel
ligolo-ng » listener_add --addr 0.0.0.0:1234 --to 192.168.1.10:22 --tcp
                         # Port redirect: :1234 -> internal 192.168.1.10:22
```

### 4. Route traffic to the internal network

After `start`, add kernel routes for the target network:

```bash
sudo ip route add 192.168.1.0/24 dev ligolo
sudo ip route add 10.10.0.0/16   dev ligolo
```

### 5. Verify connectivity

```bash
ping 192.168.1.1
nmap -sV 192.168.1.0/24
```
