# Changelog

## Unreleased

- No unreleased changes yet.

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
