# Copilot Instructions for proxy-tools

This repository contains configurations, examples, and agent skills for popular proxy tools: **go-gost**, **envoy**, **nginx**, **ligolo-ng**, **frp**, **chisel**, **v2ray/Xray**, **haproxy**, **proxyman**, and **traefik**.

## Repository Layout

```
proxy-tools/
├── go-gost/        YAML configs for go-gost v3
├── envoy/          Envoy proxy YAML (static bootstrap)
├── nginx/          nginx.conf and stream/http examples
├── ligolo-ng/      ligolo-ng pivot tunnel setup guides
├── frp/            frps/frpc TOML configs (fast reverse proxy)
├── chisel/         chisel HTTP tunnel examples
├── v2ray/          v2ray/Xray JSON configs
├── haproxy/        HAProxy CFG files
├── proxyman/       Proxyman JS addon scripts
├── traefik/        Traefik YAML static + dynamic configs
├── cookbook/       Jupyter notebooks and recipe index
└── .github/
    ├── skills/     Copilot agent skills (v2.0 SKILL.md format)
    └── workflows/  GitHub Actions (including copilot-setup-steps.yml)
```

## Conventions

- **YAML indentation**: 2 spaces
- **Config comments**: explain the *purpose* of each non-obvious setting
- **Secrets**: never commit real credentials — use placeholder values like `change-this-secret-token`
- **Ports**: document all exposed ports in the README table and docker-compose
- **Examples**: each tool has an `examples/` subdirectory with ready-to-use configs for common scenarios

## When Adding a New Proxy Tool

1. Create a folder `<tool-name>/` with:
   - `README.md` — quick-start, architecture, config layout, and references
   - `docker-compose.yml` — runnable Docker setup
   - A primary config file (`config.yaml`, `config.json`, `*.cfg`, or `*.toml`)
   - `examples/` — at least 3 scenario configs
2. Add a corresponding skill in `.github/skills/<configure-tool-name>/SKILL.md`
3. Add a Jupyter notebook in `cookbook/notebooks/`
4. Update the root `README.md` tool table

## When Modifying Configs

- Validate YAML: `yamllint <file>`
- Validate nginx: `nginx -t -c <file>`
- Validate HAProxy: `haproxy -c -f <file>`
- Validate Envoy: `envoy --mode validate -c <file>`

## Skills

The `.github/skills/` directory contains agent skills in the [v2.0 SKILL.md format](https://agentskills.io/specification). Each skill teaches Copilot how to work with a specific proxy tool. Load a skill by referencing it in your Copilot chat session.
