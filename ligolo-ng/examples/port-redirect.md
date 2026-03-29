# ligolo-ng Port Redirection (Listeners)

Ligolo-ng supports **listener redirects** — exposing a port on the **operator machine** that forwards to a service inside the **target network**, bypassing the need for kernel routing.

## Interactive Listener Commands

```
# In the ligolo-ng proxy shell, after selecting a session:
ligolo-ng » listener_add --addr 0.0.0.0:8080 --to 192.168.1.100:80 --tcp
# Local :8080 -> internal 192.168.1.100:80

ligolo-ng » listener_add --addr 0.0.0.0:2222 --to 192.168.1.50:22 --tcp
# Local :2222 -> internal SSH at 192.168.1.50

ligolo-ng » listener_list   # Show all listeners
ligolo-ng » listener_stop 0 # Stop listener by ID
```

## Example: Access Internal Web App

```bash
# On operator machine, add listener
listener_add --addr 0.0.0.0:8888 --to 10.10.10.5:8080 --tcp

# Now browse to: http://localhost:8888
```

## Example: Dynamic SOCKS5 Proxy (via gost over ligolo)

After the ligolo tunnel is up and routes are added, run gost locally:

```bash
gost -L socks5://:1080 -F direct://192.168.1.1:1080
```

Or use the kernel route and point any SOCKS-capable tool at the internal host directly.
