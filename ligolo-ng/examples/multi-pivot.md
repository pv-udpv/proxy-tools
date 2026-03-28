# Multi-hop Pivoting with ligolo-ng

This guide shows how to chain two ligolo-ng tunnels for multi-hop pivoting:

```
Operator ──(TLS)──► Pivot1 ──(TLS)──► Pivot2 ──► Internal Network
```

## Step 1 – Tunnel to Pivot1

On operator machine:

```bash
# Interface & proxy for Pivot1
sudo ip tuntap add user $USER mode tun ligolo0
sudo ip link set ligolo0 up
./proxy -selfcert -laddr 0.0.0.0:11601

# In proxy shell after Pivot1 connects:
session           # select Pivot1
start
sudo ip route add 192.168.2.0/24 dev ligolo0
```

## Step 2 – Deploy Second Proxy on Pivot1

Transfer the `proxy` binary to Pivot1 and start it, listening for Pivot2:

```bash
# On Pivot1 (reachable via ligolo0 route)
./proxy -selfcert -laddr 0.0.0.0:11602
```

## Step 3 – Tunnel from Pivot2 to Pivot1

```bash
# On Pivot2
./agent -connect 192.168.2.10:11602 -ignore-cert
```

## Step 4 – Route Pivot2's Network from Operator

```bash
# On operator, add a second tun for Pivot2's network
sudo ip tuntap add user $USER mode tun ligolo1
sudo ip link set ligolo1 up

# Connect to Pivot1's proxy shell (second instance or via a new listener)
# Add route for Pivot2's internal subnet
sudo ip route add 10.20.0.0/24 dev ligolo1
```

## Notes

- Each hop needs its own `proxy` listening on a distinct port
- Use `listener_add` to expose Pivot1's proxy port through the first tunnel if Pivot1 has no direct internet access
