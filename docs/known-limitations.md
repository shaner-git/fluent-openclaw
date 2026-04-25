# Fluent OpenClaw Known Limitations

These limits are part of the supported `v0.1.6` public beta release.

## Release Scope

- `fluent-openclaw` is public beta, not GA.
- Fluent is invite-based early access, and plugin-managed hosted auth remains beta.
- Fluent early access is the early-access package track, and public hosted availability is still gated by invite or waitlist.

## OpenClaw Surface

- OpenClaw uses the canonical Fluent MCP tools and resources, but it does not render the Fluent widget surfaces used by ChatGPT-compatible MCP Apps hosts.
- OpenClaw should use canonical Fluent results for recipes, grocery plans, pantry state, and purchase analysis rather than expecting Fluent-owned visual cards.
- The package ships Fluent skills and setup helpers, not a separate first-party Fluent UI.

## Auth And Setup

- OSS setup still requires a bearer token for `/mcp`.
- Plugin-managed hosted auth depends on Fluent early access early-access eligibility and the active OAuth grant carrying the required Fluent scopes.
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
- The minimum supported Fluent MCP contract version is `2026-04-20.fluent-core-v1.37`.
