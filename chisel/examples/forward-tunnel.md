# chisel Forward Tunnel

A forward tunnel lets the **client machine** expose a **local port** so it is reachable through the chisel **server**.

## Usage

```bash
# 1. Start chisel server (on a public host)
chisel server --port 8080 --auth user:changeme

# 2. Start chisel client (on local machine behind NAT)
#    Syntax: <local-port>:<remote-host>:<remote-port>
chisel client --auth user:changeme http://server.example.com:8080 \
  8888:localhost:8888

# Result: traffic to server.example.com:8888 is forwarded to
#         localhost:8888 on the client machine.
```

## Multiple Forwards

```bash
chisel client --auth user:changeme http://server.example.com:8080 \
  3000:localhost:3000 \
  5432:db.internal:5432
```

## TLS

```bash
# Server with TLS
chisel server --port 443 --tls-cert server.crt --tls-key server.key

# Client connecting over TLS
chisel client --auth user:changeme https://server.example.com:443 \
  3000:localhost:3000
```
