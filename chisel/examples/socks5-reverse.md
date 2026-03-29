# chisel Reverse SOCKS5 Proxy

Using chisel's reverse SOCKS5 mode, you can create a dynamic SOCKS5 proxy on the **server** side that routes traffic through the **client** (and thus through the client's network).

## Usage

```bash
# 1. Start chisel server with --reverse flag
chisel server --port 8080 --auth user:changeme --reverse

# 2. Start chisel client with reverse SOCKS5
#    R:1080:socks  ->  server opens SOCKS5 on port 1080
chisel client --auth user:changeme http://server.example.com:8080 \
  R:1080:socks
```

## Configure Tools to Use the Proxy

```bash
# curl
curl --proxy socks5h://server.example.com:1080 https://example.com

# ssh via SOCKS5
ssh -o ProxyCommand="nc -x server.example.com:1080 %h %p" user@internal-host

# git
git config --global http.proxy socks5://server.example.com:1080

# proxychains (Linux)
echo 'socks5 server.example.com 1080' >> /etc/proxychains.conf
proxychains nmap -sT internal-host
```

## Combine with Forward Tunnel

```bash
# SOCKS5 reverse + expose local web app
chisel client --auth user:changeme http://server.example.com:8080 \
  R:1080:socks \
  R:8888:localhost:3000
```
