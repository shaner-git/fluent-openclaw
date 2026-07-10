# Fluent OpenClaw Known Limitations

These limits are part of the supported `v0.1.9` public beta release.

## Release Scope

- `fluent-openclaw` is public beta, not GA.
- Fluent is scoped self-serve early access and currently free. Account creation can pause when launch controls or the current cohort cap require it, and plugin-managed hosted auth remains beta.
- The open-source runtime remains available without managed early-access eligibility if you want to run Fluent yourself.

## OpenClaw Surface

- OpenClaw can use Fluent's canonical public tools and promoted MCP resources for Meals and Style context, but Health/Wellbeing is reserved and not an active public product surface.
- OpenClaw should use Fluent's saved memory, currentness, evidence, and media context through text-first answers rather than expecting Fluent-owned visual cards.
- The package ships Fluent skills and setup helpers, not a separate first-party Fluent UI.

## Auth And Setup

- Open-source runtime setup still requires a bearer token for `/mcp`.
- Plugin-managed hosted auth depends on Fluent managed early-access eligibility and the active OAuth grant carrying the required Fluent scopes.
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
