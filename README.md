# Fluent for OpenClaw

Fluent adds meal planning, grocery workflows, health routines, and closet-aware style help to OpenClaw.

This repository is the public source for the published `fluent-openclaw` package.

## Release Status

`fluent-openclaw` is now a public beta release.

- package version: `0.1.6`
- install surface: public
- hosted auth and plugin-managed setup: still beta
- supported deployment tracks: `cloud` and `oss`
- minimum Fluent MCP contract version: `2026-04-20.fluent-core-v1.37`

## Install

Public install:

```bash
openclaw plugins install fluent-openclaw
```

Local checkout install:

```bash
openclaw plugins install .
```

The package targets Node.js `22+` and OpenClaw plugin API `2026.3.24-beta.2` or newer.

## Hosted Setup

1. Install `fluent-openclaw`.
2. Run `openclaw fluent auth login`.
3. Open the printed URL in your browser and finish sign-in.
4. Bind Fluent Cloud into OpenClaw with `openclaw fluent mcp cloud`.
5. Confirm the connection with `openclaw fluent doctor`.

## Self-Hosted Setup

1. Start Fluent OSS by following the public docs in [shaner-git/fluent-oss](https://github.com/shaner-git/fluent-oss).
2. Bind Fluent OSS into OpenClaw:

```bash
openclaw fluent mcp oss --base-url http://127.0.0.1:8788 --token <oss-token>
```

3. Confirm the connection with:

```bash
openclaw fluent doctor oss --base-url http://127.0.0.1:8788 --token <oss-token>
```

4. Start a fresh OpenClaw session so it reloads the updated MCP registry.

## Commands

- `openclaw fluent auth login`
- `openclaw fluent auth refresh`
- `openclaw fluent auth status`
- `openclaw fluent auth logout`
- `openclaw fluent mcp cloud`
- `openclaw fluent mcp oss --base-url http://127.0.0.1:8788 --token <oss-token>`
- `openclaw fluent doctor`
- `openclaw fluent deep-check`

`openclaw fluent doctor` verifies local auth state, `mcp.servers.fluent` binding, and the live Fluent compatibility probe. `openclaw fluent deep-check` is an explicit alias for the same full check.

## OpenClaw Compared With ChatGPT And Claude

| Capability | OpenClaw | ChatGPT | Claude |
|---|---|---|---|
| Core Fluent MCP tools and resources | Yes | Yes | Yes |
| Native packaged Fluent client plugin | Yes | No | No |
| Bundled Fluent skills and routing hints | Yes | No | No |
| Plugin-managed hosted auth helper in this package | Yes | No | No |
| OSS MCP binding helper in this package | Yes | No | No |
| Rich Fluent MCP widgets and output templates | No | Yes | No |
| Canonical text-first Fluent workflows | Yes | Yes | Yes |
| Fluent-specific recipe, pantry, grocery, and purchase widgets | No | Yes | No |

Practical guidance:

- OpenClaw supports the same canonical Fluent contract as the other clients, plus a native plugin package with Fluent skills, auth helpers, and MCP setup commands.
- ChatGPT is the strongest Fluent host for rich widget surfaces such as recipe cards, grocery lists, pantry dashboards, and purchase-analysis views.
- Claude is a strong text-first Fluent client for the canonical tools and resources, but it does not use the Fluent widget surfaces.
- OpenClaw should be treated like Claude for Fluent UI expectations: use the canonical tools and let the host render the results conversationally.

## Known Limitations

- This package is public beta, not GA.
- Hosted Fluent access is still in rollout, and plugin-managed hosted auth remains beta.
- OpenClaw does not render Fluent MCP widgets or output templates today.
- OSS setup still requires an explicit bearer token.
- Browser and retailer execution helpers are intentionally omitted from the OpenClaw package.
- Unsafe local browser automation and retailer checkout scripts are not part of this plugin and are not required for standard installs.

## Docs

- OpenClaw setup: [guides/connecting-to-openclaw.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/connecting-to-openclaw.md)
- Client configuration: [guides/client-configuration.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/client-configuration.md)
- Troubleshooting: [guides/troubleshooting.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/troubleshooting.md)
- Package known limitations: [docs/known-limitations.md](docs/known-limitations.md)
- Package support matrix: [docs/support-matrix.md](docs/support-matrix.md)
- GitHub release checklist: [docs/github-release-checklist.md](docs/github-release-checklist.md)
- Public docs repo: [shaner-git/fluent-docs](https://github.com/shaner-git/fluent-docs)

## Notes

- Fluent Cloud is the default track; Fluent OSS is the supported self-hosted track.
- The plugin manages hosted auth and rewrites `mcp.servers.fluent` for OpenClaw.
- Browser and retailer execution helpers are intentionally excluded so normal installs do not require unsafe-install overrides.
