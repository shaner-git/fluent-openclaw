# Fluent for OpenClaw

Fluent adds meal planning, grocery workflows, health routines, and closet-aware style help to OpenClaw.

This repository is the public source for the published `fluent-openclaw` package.

## Install

```bash
openclaw plugins install fluent-openclaw
```

For local development, you can also install from a checked-out package directory.

## Hosted setup

1. Install `fluent-openclaw`.
2. Run `openclaw fluent auth login`.
3. Open the printed URL in your browser and finish sign-in.
4. Confirm the connection with `openclaw fluent auth status`.

If tools stop appearing or auth looks stale, run `openclaw fluent doctor`.

## Self-hosted setup

1. Start Fluent OSS by following the public docs in [shaner-git/fluent-oss](https://github.com/shaner-git/fluent-oss).
2. Run:

```bash
openclaw fluent mcp --track oss --base-url http://127.0.0.1:8788 --token <oss-token>
```

3. Start a fresh OpenClaw session so it reloads the updated MCP registry.

## Commands

- `openclaw fluent auth login`
- `openclaw fluent auth refresh`
- `openclaw fluent auth status`
- `openclaw fluent auth logout`
- `openclaw fluent mcp --track cloud`
- `openclaw fluent mcp --track oss --base-url http://127.0.0.1:8788 --token <oss-token>`
- `openclaw fluent doctor`

## Docs

- OpenClaw setup: [guides/connecting-to-openclaw.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/connecting-to-openclaw.md)
- Client configuration: [guides/client-configuration.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/client-configuration.md)
- Troubleshooting: [guides/troubleshooting.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/troubleshooting.md)
- Public docs repo: [shaner-git/fluent-docs](https://github.com/shaner-git/fluent-docs)

## Notes

- This is a native OpenClaw plugin built with `openclaw.plugin.json` and `package.json`.
- Fluent Cloud is the default track; Fluent OSS is the supported self-hosted track.
- The plugin manages hosted auth and rewrites `mcp.servers.fluent` for OpenClaw.
- The OpenClaw package intentionally omits the local Meals browser and retailer scripts so standard installs do not require the unsafe-install override.
