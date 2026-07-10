# Changelog

## Unreleased

## v0.1.9 - 2026-07-10

- Publishes the corrected Fluent 2.0 package as a new immutable ClawHub version after the existing `v0.1.8` listing retained the previous `v0.1.7` README and contract metadata.
- Keeps the package floor and reference contract at `2026-07-09.fluent-core-v2.0`: 26 tools, 3 resources, 14 explicit writes, and 3 optional render adapters.
- Includes `style:write`, scoped self-serve early-access language, current Meals/Style/Budgets boundaries, reserved Health/Wellbeing language, and removal of retired Home and Visual Sync guidance.

## v0.1.8 - 2026-07-09

- Aligns the package floor and reference contract to `2026-07-09.fluent-core-v2.0`: 26 tools, 3 resources, 14 explicit writes, and 3 optional render adapters.
- Adds the missing `style:write` scope to plugin-managed hosted OAuth so OpenClaw can use the current approved Style write surface.
- Replaces invite-only and internal redesign-generation language with the current scoped self-serve early-access story.
- Keeps Meals and Style as active public domains, Budgets as narrow envelope/spend context, and Health/Wellbeing as reserved.
- Removes stale public references to retired Home, recipe-card, pantry-dashboard, setup, and purchase-analysis surfaces.
- Removes the retired standalone visual-sync skill.

## v0.1.7 - 2026-07-05

- Bumps the published `fluent-openclaw` package line to `0.1.7` for a fresh ClawHub release instead of republishing `0.1.6`.
- Aligns the package with Fluent contract `2026-06-01.fluent-core-v1.85` for both the minimum compatible and current reference contract versions.
- Refreshes the packaged OpenClaw skills from `fluent-mcp/openclaw-plugin/fluent`, including the current Meals planning, Style closet, Budgets, and visual-boundary guidance.
- Updates hosted auth token exchange to request the canonical `/mcp` resource, keeps the hosted MCP URL at `https://mcp.meetfluent.app/mcp`, and narrows hosted scopes to the current public profile.
- Replaces package-facing personal contact metadata with Fluent org-owned general, support, and security addresses in the public package manifest, README, and release notes.
- Aligns the OpenClaw package relationship story with `fluent-mcp`: `fluent-openclaw` is the canonical published package, while the `fluent-oss` embedded bundle is a distinct helper exported from `fluent-mcp`.

## v0.1.6 - 2026-04-21

- Publishes a fresh public beta artifact after the `0.1.5` ClawHub entry was created with the wrong private-beta bundle contents.
- Keeps the package versioning in sync with the public ClawHub line while preserving the `0.1.5` repo changes.

## v0.1.5 - 2026-04-21

- Bumps the public `fluent-openclaw` package line to `0.1.5` so the repo and public package numbering can catch up with the previously published private-beta sequence.
- Keeps the package positioned as a public beta release with the same Fluent MCP contract floor and release docs introduced for launch prep.
- Carries forward the OpenClaw CLI fixes for `mcp cloud`, `mcp oss`, and the deeper `doctor` compatibility check.

## v0.1.0 - 2026-04-21

- Promotes `fluent-openclaw` from private beta packaging to a public beta `0.1.0` launch release.
- Publishes the OpenClaw package as the public source for Fluent skills, hosted auth helpers, and MCP setup commands.
- Aligns package metadata with the canonical Fluent MCP contract at `2026-04-20.fluent-core-v1.37`.
- Adds public-release docs for known limitations, OpenClaw support compared with ChatGPT and Claude, and the GitHub release checklist.
- Documents that browser and retailer execution helpers are intentionally omitted from the public OpenClaw package.
- Expands `openclaw fluent doctor` into a deeper compatibility check and adds `openclaw fluent deep-check` as an explicit alias.
