# Fluent OpenClaw Known Limitations

These limits are part of the supported `v0.1.5` public beta release.

## Release Scope

- `fluent-openclaw` is public beta, not GA.
- Hosted Fluent access and plugin-managed hosted auth remain beta.
- Fluent Cloud is the default package track, but public hosted availability may still be gated by rollout.

## OpenClaw Surface

- OpenClaw uses the canonical Fluent MCP tools and resources, but it does not render the Fluent widget surfaces used by ChatGPT-compatible MCP Apps hosts.
- OpenClaw should use canonical Fluent results for recipes, grocery plans, pantry state, and purchase analysis rather than expecting Fluent-owned visual cards.
- The package ships Fluent skills and setup helpers, not a separate first-party Fluent UI.

## Auth And Setup

- OSS setup still requires a bearer token for `/mcp`.
- Hosted auth depends on the Fluent hosted rollout and the active OAuth grant carrying the required Fluent scopes.
- `openclaw fluent doctor` verifies local binding and the live compatibility probe, but it does not replace a full end-to-end interactive prompt check inside OpenClaw.

## Intentional Omissions

- Browser execution helpers are intentionally omitted from the package.
- Retailer automation helpers are intentionally omitted from the package.
- Unsafe local browser scripts and retailer checkout runners are not required for normal OpenClaw installs and are not shipped here.

## Packaging Limits

- The package targets Node.js `22+`.
- The package expects OpenClaw plugin API `2026.3.24-beta.2` or newer.
- The minimum supported Fluent MCP contract version is `2026-04-20.fluent-core-v1.37`.
