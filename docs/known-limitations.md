# Fluent OpenClaw Known Limitations

These limits are part of the supported `v0.1.9` public beta release.

## Release Scope

- `fluent-openclaw` is public beta, not GA.
- There's no charge right now. The hosted auth helper remains beta.
- The open-source version is available to anyone who wants to run Fluent themselves.

## OpenClaw Surface

- OpenClaw can use the current Fluent experience for Meals and Style, with manual grocery and clothing budget envelopes.
- OpenClaw should use the relevant Fluent information, evidence, and media through text-first answers rather than expecting Fluent-owned visual cards.
- The package ships Fluent skills and setup helpers, not a separate first-party Fluent UI.

## Auth And Setup

- Open-source runtime setup still requires a bearer token for `/mcp`.
- Hosted authentication requires a Fluent account and an active OAuth grant with the required permissions.
- `openclaw fluent doctor` verifies local binding and the live compatibility probe, but it does not replace a full end-to-end interactive prompt check inside OpenClaw.

## Intentional Omissions

- Browser execution helpers are intentionally omitted from the package.
- Retailer automation helpers are intentionally omitted from the package.
- Unsafe local browser scripts and retailer checkout runners are not required for normal OpenClaw installs and are not shipped here.

## Packaging Limits

- `fluent-openclaw` is the published standalone OpenClaw package line.
- The embedded `fluent-oss/openclaw-plugin/fluent` bundle is a separate OSS helper package exported from `fluent-mcp/openclaw-plugin/fluent` and should not be treated as the same release artifact.
- The package targets Node.js `22+`.
- The package expects OpenClaw plugin API `2026.3.24-beta.2` or newer.
- The minimum compatible Fluent MCP contract version is `2026-07-09.fluent-core-v2.0`.
- The current reference Fluent MCP contract version is `2026-07-09.fluent-core-v2.0`.
- The public profile contains 26 tools, 3 resources, 14 explicit writes, and 3 optional render adapters.
