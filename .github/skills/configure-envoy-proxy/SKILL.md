---
name: configure-envoy-proxy
description: 'Configure Envoy proxy for HTTP reverse proxying, TCP forwarding, TLS termination, gRPC proxying, or traffic management. Use when creating or editing Envoy bootstrap YAML configs.'
license: Apache-2.0
compatibility: Requires Envoy v1.28+ or Docker image envoyproxy/envoy:v1.29-latest
metadata:
  author: proxy-tools
  version: "1.0"
allowed-tools: docker bash
---

# Configure Envoy Proxy

Envoy uses a **static bootstrap** YAML (or xDS dynamic config). The key sections are `static_resources` → `listeners` and `clusters`, plus an `admin` block.

## Config Skeleton

```yaml
static_resources:
  listeners:
    - name: my_listener
      address:
        socket_address: { address: 0.0.0.0, port_value: 10000 }
      filter_chains:
        - filters:
            - name: envoy.filters.network.http_connection_manager
              typed_config:
                "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
                stat_prefix: ingress
                http_filters:
                  - name: envoy.filters.http.router
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains: ["*"]
                      routes:
                        - match: { prefix: "/" }
                          route: { cluster: my_cluster }

  clusters:
    - name: my_cluster
      type: STRICT_DNS
      connect_timeout: 5s
      load_assignment:
        cluster_name: my_cluster
        endpoints:
          - lb_endpoints:
              - endpoint:
                  address:
                    socket_address: { address: backend.internal, port_value: 8080 }

admin:
  address:
    socket_address: { address: 0.0.0.0, port_value: 9901 }
```

## TCP Proxy (Layer 4)

Replace the filter with `envoy.filters.network.tcp_proxy`:
```yaml
- name: envoy.filters.network.tcp_proxy
  typed_config:
    "@type": type.googleapis.com/envoy.extensions.filters.network.tcp_proxy.v3.TcpProxy
    stat_prefix: tcp
    cluster: my_cluster
```

## Workflow

1. **Choose example** from `envoy/examples/`:
   - `http-proxy.yaml` — HTTP reverse proxy with routing
   - `tcp-proxy.yaml` — Raw TCP port forwarding
   - `tls-termination.yaml` — TLS termination
   - `grpc-proxy.yaml` — gRPC load balancing
2. **Edit addresses** and cluster hostnames.
3. **Validate**:
   ```bash
   docker run --rm -v $(pwd)/envoy/envoy.yaml:/etc/envoy/envoy.yaml \
     envoyproxy/envoy:v1.29-latest --mode validate -c /etc/envoy/envoy.yaml
   ```
4. **Run**: `docker compose -f envoy/docker-compose.yml up -d`
5. **Check admin**: `curl http://localhost:9901/clusters`

## References

- Envoy docs: https://www.envoyproxy.io/docs/envoy/latest/
- Repository: `envoy/`
