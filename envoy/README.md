# Envoy Proxy

[Envoy](https://www.envoyproxy.io/) is a high-performance C++ L4/L7 proxy and communication bus designed for large modern service-oriented architectures. It is the data-plane component of many service meshes (Istio, Consul Connect).

## Quick Start

### Docker

```bash
docker compose up -d
```

### Binary / Local

```bash
envoy -c envoy.yaml --log-level info
```

## Key Concepts

| Concept      | Description                                                               |
|--------------|---------------------------------------------------------------------------|
| Listener     | Network location (IP:port) where Envoy accepts connections                |
| Filter chain | Set of network/HTTP filters applied to a listener                         |
| Cluster      | Group of upstream hosts that Envoy load-balances across                   |
| Route        | Maps incoming requests to an upstream cluster                             |
| Admin API    | REST API on port 9901 for stats, config dumps, health checks              |

## Configuration Layout

```
envoy/
├── envoy.yaml              # Main static bootstrap config
├── docker-compose.yml
└── examples/
    ├── http-proxy.yaml     # Forward HTTP traffic to upstream
    ├── tcp-proxy.yaml      # Raw TCP forwarding
    ├── tls-termination.yaml# TLS termination + HTTP routing
    └── grpc-proxy.yaml     # gRPC traffic with transcoding
```

## Examples

| File | Description |
|------|-------------|
| `examples/http-proxy.yaml` | HTTP reverse-proxy with header manipulation |
| `examples/tcp-proxy.yaml` | Raw TCP port forwarding |
| `examples/tls-termination.yaml` | TLS termination to plaintext upstream |
| `examples/grpc-proxy.yaml` | gRPC proxy with load balancing |

## Admin Interface

Access the Envoy admin interface at `http://localhost:9901`:

```bash
# Check cluster health
curl http://localhost:9901/clusters

# View runtime configuration
curl http://localhost:9901/config_dump

# View live stats
curl http://localhost:9901/stats
```

## References

- [Envoy documentation](https://www.envoyproxy.io/docs/envoy/latest/)
- [Envoy examples](https://github.com/envoyproxy/envoy/tree/main/examples)
- [Dynamic configuration (xDS)](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/operations/dynamic_configuration)
