# Proxy Tools Cookbook

A collection of Jupyter notebooks and copy-paste-ready recipes for configuring, testing, and operating the proxy tools in this repository.

## What's in the Cookbook

```
cookbook/
├── README.md           This file
├── cookbook.yml        Machine-readable recipe manifest
└── notebooks/
    ├── 01-getting-started.ipynb        Orientation and tool comparison
    ├── 02-go-gost.ipynb                go-gost SOCKS5/HTTP proxy setup
    ├── 03-nginx-proxy.ipynb            nginx reverse proxy and stream config
    ├── 04-envoy-proxy.ipynb            Envoy HTTP and TCP proxy
    ├── 05-ligolo-ng-pivoting.ipynb     Network pivoting with ligolo-ng
    ├── 06-frp-tunnel.ipynb             Fast reverse proxy (frp) setup
    ├── 07-chisel-tunnel.ipynb          chisel HTTP tunnel
    ├── 08-v2ray-xray.ipynb             v2ray / Xray proxy protocols
    ├── 09-haproxy.ipynb                HAProxy load balancing
    ├── 10-traefik.ipynb                Traefik with Docker + Let's Encrypt
    └── 11-proxy-chaining.ipynb         Multi-hop proxy chains
```

## Getting Started

### Prerequisites

```bash
pip install jupyter pyyaml requests
jupyter notebook
```

Or use [JupyterLab](https://jupyterlab.readthedocs.io/en/latest/):

```bash
pip install jupyterlab
jupyter lab
```

### Running a Notebook

```bash
cd cookbook/notebooks
jupyter notebook 01-getting-started.ipynb
```

## Structure of Each Notebook

Each notebook follows the same structure:

1. **Introduction** — What the tool does and when to use it
2. **Prerequisites** — Required binaries or Docker images
3. **Configuration** — Step-by-step config generation via Python
4. **Validation** — Config validation commands
5. **Quick Test** — Verify the proxy works end-to-end
6. **Common Patterns** — Copy-paste snippets for real scenarios

## Resources

- [GitHub Copilot Cookbook](https://github.com/github/awesome-copilot/tree/main/cookbook)
- [Jupyter documentation](https://jupyter.org/documentation)
