# Fluent for OpenClaw

Fluent helps OpenClaw remember what fits your life across Meals and Style without turning Fluent into the planner, stylist, browser, or checkout agent.

This repository is the canonical public source for the published `fluent-openclaw` package.

The embedded `openclaw-plugin/fluent` bundle shipped inside `fluent-oss` is not the same artifact. It is a separate bundled OSS helper package exported from `fluent-mcp/openclaw-plugin/fluent`, with its own metadata and versioning. Neither package line is generated from the other.

## Release Status

`fluent-openclaw` is now a public beta release.

- package version: `0.1.7`
- install surface: public
- Fluent early access: invite-based and currently free
- plugin-managed hosted auth: beta
- setup command labels: `cloud` and `oss`
- minimum compatible Fluent MCP contract version: `2026-06-01.fluent-core-v1.85`
- current reference Fluent MCP contract version: `2026-06-01.fluent-core-v1.85`
- packaging decision: standalone `fluent-openclaw` is the canonical published package; the `fluent-oss` embedded bundle is a separate OSS helper

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

For both managed early access and self-hosted use, the supported public OpenClaw install surface is still `fluent-openclaw`. Do not treat `fluent-oss/openclaw-plugin/fluent` as the same package release line.

## Early-Access Setup

1. Install `fluent-openclaw`.
2. Run `openclaw fluent auth login`.
3. Open the printed URL in your browser and finish sign-in.
4. Bind Fluent early access into OpenClaw with `openclaw fluent mcp --track cloud`.
5. Confirm the connection with `openclaw fluent doctor`.

## Run Fluent Yourself

1. Start Fluent open-source runtime by following the public docs in [shaner-git/fluent-oss](https://github.com/shaner-git/fluent-oss).
2. Bind Fluent open-source runtime into OpenClaw:

```bash
openclaw fluent mcp --track oss --base-url http://127.0.0.1:8788 --token <oss-token>
```

3. Confirm the connection with:

```bash
openclaw fluent doctor --track oss --base-url http://127.0.0.1:8788 --token <oss-token>
```

4. Start a fresh OpenClaw session so it reloads the updated MCP registry.

## Commands

- `openclaw fluent auth login`
- `openclaw fluent auth refresh`
- `openclaw fluent auth status`
- `openclaw fluent auth logout`
- `openclaw fluent mcp --track cloud`
- `openclaw fluent mcp --track oss --base-url http://127.0.0.1:8788 --token <oss-token>`
- `openclaw fluent doctor`
- `openclaw fluent deep-check`

`openclaw fluent doctor` verifies local auth state, `mcp.servers.fluent` binding, and the live Fluent compatibility probe. `openclaw fluent deep-check` is an explicit alias for the same full check.

## OpenClaw Compared With ChatGPT, Claude, Codex, And Generic MCP

| Capability | OpenClaw | ChatGPT | Claude | Codex | generic MCP clients |
|---|---|---|---|---|---|
| Fluent MCP public tools | Yes | Yes | Yes | Yes | Yes |
| Fluent MCP public resources | Yes | Yes | Yes | Yes | Yes |
| Native packaged Fluent client plugin | Yes | No | No | Yes | No |
| Bundled Fluent skills and routing hints | Yes | No | No | Yes | No |
| Plugin-managed hosted auth helper in this package | Yes | No | No | No | No |
| Open-source MCP binding helper in this package | Yes | No | No | Yes | Manual config |
| Rich Fluent app views | Host-dependent for promoted surfaces only | Promoted surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only |
| Text-first Fluent workflows | Yes | Yes | Yes | Yes | Yes |
| Current Fluent app widgets | Host-dependent for promoted surfaces only | Promoted grocery-list, budgets, and Style closet surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only | Host-dependent for promoted surfaces only |

Practical guidance:

- Fluent keeps the same memory and tools across clients. Each assistant may present them differently.
- OpenClaw supports the same canonical public Fluent `/mcp` profile as ChatGPT, Claude, Codex, and generic MCP clients, plus a native plugin package with Fluent skills, auth helpers, and MCP setup commands.
- The package currently keeps `2026-06-01.fluent-core-v1.85` as its minimum compatible and current reference contract.
- The current public profile is text/data first by default: 26 tools, 10 resources, and only the promoted grocery-list, Budgets Envelope Setup, and Style Closet Manager widget families.
- Health/Wellbeing is reserved and not an active public product surface in this package.
- Claude, Codex, OpenClaw, and generic MCP clients should use Fluent's tools and complete text-first answers unless the host explicitly proves MCP Apps-style widget support.
- OpenClaw should be treated like Claude and Codex for Fluent UI expectations: use Fluent's saved memory and let the host present the results conversationally.

## Known Limitations

- This package is public beta, not GA.
- Fluent is invite-based early access and currently free, and plugin-managed hosted auth remains beta.
- OpenClaw does not render Fluent rich app views today.
- Open-source runtime setup still requires an explicit bearer token.
- Browser and retailer execution helpers are intentionally omitted from the OpenClaw package.
- Unsafe local browser automation and retailer checkout scripts are not part of this plugin and are not required for standard installs.

## Docs

- Package versioning: [docs/package-versioning.md](docs/package-versioning.md)
- OpenClaw setup: [guides/connecting-to-openclaw.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/connecting-to-openclaw.md)
- Client configuration: [guides/client-configuration.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/client-configuration.md)
- Troubleshooting: [guides/troubleshooting.md](https://github.com/shaner-git/fluent-docs/blob/main/guides/troubleshooting.md)
- Package known limitations: [docs/known-limitations.md](docs/known-limitations.md)
- Package support matrix: [docs/support-matrix.md](docs/support-matrix.md)
- GitHub release checklist: [docs/github-release-checklist.md](docs/github-release-checklist.md)
- Public docs repo: [shaner-git/fluent-docs](https://github.com/shaner-git/fluent-docs)

## Contact

- General: `hello@meetfluent.app`
- Support: `hello@meetfluent.app`
- Security and privacy: `security@meetfluent.app`

## Notes

- Fluent early access is the managed path; the open-source runtime is available when you want to run Fluent yourself.
- The plugin manages hosted auth and rewrites `mcp.servers.fluent` for OpenClaw.
- The bundled `openclaw-plugin/fluent` copy inside `fluent-oss` is an OSS helper package, not the published `fluent-openclaw` artifact.
- Browser and retailer execution helpers are intentionally excluded so normal installs do not require unsafe-install overrides.
