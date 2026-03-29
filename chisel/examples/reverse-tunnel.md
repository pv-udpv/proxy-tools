# chisel Reverse Tunnel

A reverse tunnel lets the **client** (behind NAT/firewall) instruct the **server** to open a port that forwards to a service reachable by the client.

## Usage

```bash
# 1. Start chisel server with --reverse flag
chisel server --port 8080 --auth user:changeme --reverse

# 2. Start chisel client
#    Syntax: R:<server-port>:<remote-host>:<remote-port>
chisel client --auth user:changeme http://server.example.com:8080 \
  R:2222:localhost:22

# Result: SSH to server.example.com:2222 reaches localhost:22 on the client.
```

## Expose an Internal Service

```bash
# From behind a corporate firewall, expose an internal Jenkins at 192.168.1.50:8080
chisel client --auth user:changeme http://server.example.com:8080 \
  R:9090:192.168.1.50:8080
```

## Keep-Alive & Reconnect

```bash
chisel client \
  --keepalive 30s \
  --max-retry-count 10 \
  --max-retry-interval 2m \
  --auth user:changeme \
  http://server.example.com:8080 \
  R:2222:localhost:22
```
